geotab.addin.stopStart = function(api, state) {

    var times, idling, fuel,
       volumeConversionFactor, volumeLabel,
       promise = geotab.addin.Promise;

    // If the stop/start event is shorter than this - ignore it.
    const minimumStopStartDuration = 2000;

    const litersPerUKGallon = 4.54609;
    const litersPerUSGallon = 3.785411784;

    // If less than this amount of litres of fuel is used, don't use for average idling per minute calculation
    // Cleans up data from very small values that can cause issues.
    const minimumIdleFuelUsed = 0.1;

    var getVehicles = (function(){
        //For preventing race condition. 
        //If some group in global filter is selected and page with Add-In is reloaded.
        //Focus method can be called (with GroupCompanyId) before the state of the global filter will be restored. 
        var successCallback;
        
         return function(finishedCallback) {
            successCallback = finishedCallback;
            api.call("Get", {
                typeName: "Device",
                search : {
                    groups: state.getGroupFilter(),
                    fromDate : new Date().toISOString()
                }
            }, function (results) {
                var vehicles = results.map(function (vehicle) {
                    return {
                        name: vehicle.name,
                        id: vehicle.id
                    };
                });
                
                if (successCallback === finishedCallback){
                    successCallback(vehicles);    
                }
            }, function (errorString) {
                alert(errorString);
            });
        };
    })() 

    function getTrips (deviceId, fromDate, toDate) {
        return api.call("Get", {
            "typeName" : "Trip",
            "search" : {
                "deviceSearch" : {
                    "id" : deviceId
                },
                "fromDate" : fromDate,
                "toDate" : toDate
            }
        }, function () {},
        function (error) {
            alert(error);
        });
    }

    function populateVehicles (callback) {

        var vehicleSelect = document.getElementById("stopStart-vehicleSelect");
        vehicleSelect.options.length = 0;
        vehicleSelect.removeEventListener("change", vehicleSelectionChange);

        vehicleSelect.appendChild((function () {
            var defaultOption = document.createElement("option");
            defaultOption.default = true;
            defaultOption.selected = true;
            defaultOption.value = "";
            defaultOption.textContent = state.translate("Select a vehicle...");
            return defaultOption;
        })());

        getVehicles(function(vehicles) {
            vehicles.forEach(function (vehicle) {
                var opt = document.createElement("option");
                opt.value = vehicle.id;
                opt.textContent = vehicle.name;
                vehicleSelect.appendChild(opt);
            });
            vehicleSelect.addEventListener("change", vehicleSelectionChange);
        });
    };

    function getUserConfiguration(callback) {

        // The api object exposes a method we can call to get the current user identity. This is useful for
        // determining user context, such as regional settings, language preference and name. Use the api
        // to retrieve the currently logged on user object.
        api.getSession(function (session) {
            var currentUser = session.userName;
            api.call("Get", {
                "typeName" : "User",
                "search" : {
                    "name" : currentUser
                }
            }, function (result) {
                if (result.length === 0) {
                    throw "Unable to find currently logged on user."
                }

                var user = result[0];

                // Setup our regional settings

                switch(user.fuelEconomyUnit) {
                    case "LitersPer100Km" :
                        volumeConversionFactor = 1;
                        volumeLabel = state.translate("Liters");
                        break;
                    case "KmPerLiter" :
                        volumeConversionFactor = 1;
                        volumeLabel = state.translate("Liters");
                        break;
                    case "MPGUS" :
                        volumeConversionFactor = 1 / litersPerUSGallon;
                        volumeLabel = state.translate("Gallons (US)");
                        break;
                    case "MPGImperial" :
                        volumeConversionFactor = 1 / litersPerUKGallon;
                        volumeLabel = state.translate("Gallons (UK)");
                        break;
                    default:
                        volumeConversionFactor = 1;
                        volumeLabel = state.translate("Liters");
                        break;
                }

                console.log(user.isMetric); // true/false (used for miles or kilometers)
                console.log(user.fuelEconomyUnit); // "LitersPer100Km", "KmPerLiter", "MPGUS","MPGImperial"
                console.log(user.language);   // "en", "fr", "es", "de", "ja"...
                console.log(user.dateFormat); //  d/MMM/y HH:mm:ss
                console.log(user.timeZoneId); // "America/Toronto"

                // TODO: Get the user language preference

                callback();


            }, function (error) {
                throw "Error while trying to load currently logged on user. " + error;
            });
        });
    }

    function updateDashboardRegionalUnits() {
        document.getElementById("stopStart-volume-label").innerHTML = volumeLabel;
        document.getElementById("stopStart-volume-label-annual").innerHTML = volumeLabel;
    }

    function vehicleSelectionChange(e) {
        updateDashboard(-1);
        updateAnnualDashboard(-1);
        if(this.value != "") {
            analyzeStopStartEvents(this.value);
        }
    }

    function getStopStartEvents(deviceId, fromDate, toDate) {
        return promise.all([api.call("Get", {
                "typeName":"StatusData",
                "search":{
                    "deviceSearch": {
                        "id" : deviceId
                    },
                    "fromDate" : fromDate.toISOString(),
                    "toDate" : toDate.toISOString()
                }
            }), api.call("Get", {
                "typeName" : "LogRecord",
                "search" : {
                    "deviceSearch" : {
                        "id" : deviceId
                    },
                    "fromDate" : fromDate,
                    "toDate" : toDate
                }
            })]).then(function(result){
                var statusDataResults = result[0],
                    gpsDataResults = result[1],
                    isActive = false,
                    isEngineRunning = false,
                    isMoving = false,
                    stopStartBegin = null,
                    stopStartEnd = null,
                    idlingBegin = null,
                    totalIdlingTime = 0,
                    totalTripIdleFuelUsed = 0,
                    fuelUsedPerMinuteIdling = 0,
                    dataRecord,
                    i,
                    isInStopStart,
                    stopStarts = [];

                var filteredResults = statusDataResults.filter(function (statusData) {
                    switch(statusData.diagnostic.id) {
                        case "aDD1bu5XaYUiSdhyYEni8OA" :
                        case "DiagnosticEngineSpeedId" :
                        case "DiagnosticTotalTripIdleFuelUsedId":
                            return true;
                            break;
                        default:
                            return false;
                    }
                });

                // Combine GPS and Engine data. We need to sort them together and then walk through it oldest to newest
                filteredResults = filteredResults.concat(gpsDataResults);

                // Convert all dates from ISO string values to actual date objects
                filteredResults = filteredResults.map(function (dataRecord) {
                    dataRecord.dateTime = new Date(dataRecord.dateTime);
                    return dataRecord;
                });

                // Sort oldest to newest
                filteredResults.sort(function (a, b) {
                    return a.dateTime - b.dateTime;
                });

                for (i = 0; i < filteredResults.length; i++) {
                    dataRecord = filteredResults[i];

                    if (dataRecord.diagnostic) {
                        // Engine record
                        switch (dataRecord.diagnostic.id) {
                            // Active flag
                            case "aDD1bu5XaYUiSdhyYEni8OA" :
                                if (dataRecord.data === 1) {
                                    isActive = true;
                                } else {
                                    isActive = false;
                                }
                                break;

                            case "DiagnosticEngineSpeedId" :
                                if (dataRecord.data > 0) {
                                    isEngineRunning = true;
                                } else {
                                    isEngineRunning = false;
                                }
                                break;

                            case "DiagnosticTotalTripIdleFuelUsedId" :
                                totalTripIdleFuelUsed = totalTripIdleFuelUsed + dataRecord.data;
                                break;
                        }
                    } else {
                        // GPS record
                        isMoving = dataRecord.speed === 0 ? false : true;
                    }

                    if (!isMoving && isEngineRunning && idlingBegin == null) {
                        // First time we see idling even start
                        idlingBegin = dataRecord.dateTime;
                    }

                    if ((idlingBegin !== null) && (isMoving || !isEngineRunning)) {
                        // Idling stopped. Add to our tally.
                        totalIdlingTime = totalIdlingTime + (dataRecord.dateTime - idlingBegin);
                        idlingBegin = null;
                    }

                    if (isActive && !isEngineRunning && !isInStopStart) {
                        isInStopStart = true;
                        stopStartBegin = dataRecord.dateTime;
                    } else if (isInStopStart && (!isActive || isEngineRunning)) {
                        stopStartEnd = dataRecord.dateTime;
                        var stopStartDuration = stopStartEnd - stopStartBegin;

                        if (stopStartDuration > minimumStopStartDuration) {
                            stopStarts.push({
                                fromDate : stopStartBegin,
                                duration : stopStartEnd - stopStartBegin
                            });
                        }
                        isInStopStart = false;
                    }
                }

                if (totalIdlingTime > 0 && (totalTripIdleFuelUsed > minimumIdleFuelUsed)) {
                    fuelUsedPerMinuteIdling = (totalTripIdleFuelUsed / (totalIdlingTime / 1000 / 60));
                } else {
                    fuelUsedPerMinuteIdling = 0;
                }

                return {
                    fuelUsedPerMinuteIdling: fuelUsedPerMinuteIdling,
                    stopStarts: stopStarts
                }; 
            });
    }

    // http://stackoverflow.com/questions/4288759/asynchronous-for-cycle-in-javascript
    function asyncLoop(iterations, func, callback) {
        var index = 0;
        var done = false;
        var loop = {
            next: function() {
                if (done) {
                    return;
                }

                if (index < iterations) {
                    index++;
                    func(loop);

                } else {
                    done = true;
                    callback();
                }
            },

            iteration: function() {
                return index - 1;
            },

            break: function() {
                done = true;
                callback();
            }
        };
        loop.next();
        return loop;
    }

    function toHHMM (timeSpan) {
        var numberOfSeconds = parseInt(timeSpan, 10);
        var hours   = Math.floor(numberOfSeconds / 3600);
        var minutes = Math.floor((numberOfSeconds - (hours * 3600)) / 60);

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ':' + minutes;
    } 

    function analyzeStopStartEvents(deviceId) {

        document.getElementById("stopStart-vehicleSelect").disabled = true;

        var toDate = new Date();
        var fromDate = new Date();
        fromDate.setDate(toDate.getDate() - 1);

        var totalStopStartTime = 0,
            totalStopStarts = 0,
            averageFuelUsedPerMinute = 0;

        asyncLoop(30, function (loop) {

                getStopStartEvents(deviceId, fromDate, toDate).then(function (result) {
                    var stopStarts = result.stopStarts,
                        fuelUsedPerMinute = result.fuelUsedPerMinuteIdling;
                    
                    totalStopStarts = totalStopStarts + stopStarts.length;

                    if (totalStopStarts > 0) {
                        stopStarts.forEach(function (stopStart) {
                            totalStopStartTime += stopStart.duration;
                        });

                        if (fuelUsedPerMinute > 0) {
                            if (averageFuelUsedPerMinute == 0) {
                                // The first time we see valid fuel used value, set it
                                averageFuelUsedPerMinute = fuelUsedPerMinute;
                            } else {
                                averageFuelUsedPerMinute = (averageFuelUsedPerMinute + fuelUsedPerMinute) / 2;
                            }
                        }
                        updateDashboard(totalStopStarts, totalStopStartTime, averageFuelUsedPerMinute);
                    }

                    fromDate.setDate(fromDate.getDate() - 1);
                    toDate.setDate(toDate.getDate() - 1);
                    loop.next();
                });
            },
            function () {
                // Count how many trips were involved
                fromDate = new Date();
                toDate = new Date();
                fromDate.setDate(fromDate.getDate() - 30);

                getTrips(deviceId, fromDate, toDate).then(function(trips){
                   var totalTripDistance = 0,
                       stopsPerKm, stopStartTimePerKm;

                    trips.forEach(function (trip) {
                       totalTripDistance = totalTripDistance + trip.distance;
                    });

                    if (totalTripDistance > 0) {
                        stopsPerKm = totalStopStarts / totalTripDistance
                        stopStartTimePerKm = totalStopStartTime / totalTripDistance;
                        updateAnnualDashboard(stopsPerKm * totalTripDistance, stopStartTimePerKm * totalTripDistance, averageFuelUsedPerMinute);

                        // Now go back 11 more months or thereabout
                        asyncLoop(11, function (loop) {

                            getTrips(deviceId, fromDate, toDate).then(function (trips) {
                                trips.forEach(function (trip) {
                                    totalTripDistance = totalTripDistance + trip.distance;
                                });

                                updateAnnualDashboard(stopsPerKm * totalTripDistance, stopStartTimePerKm * totalTripDistance, averageFuelUsedPerMinute);

                                fromDate.setDate(fromDate.getDate() - 30);
                                toDate.setDate(toDate.getDate() - 30);
                                loop.next();

                            });

                        }, function () {
                            document.getElementById("stopStart-vehicleSelect").disabled = false;
                        });
                    } else {
                        document.getElementById("stopStart-vehicleSelect").disabled = false;
                    }
                });
            });
    }

    function updateDashboard(timesValue, idlingValue, fuelUsedPerMinute, postFix) {
        var minutes = idlingValue / 1000 / 60,
            fuelValue = minutes * fuelUsedPerMinute;

        postFix = postFix || "";

        times = document.getElementById("stopStart-times" + postFix);
        idling = document.getElementById("stopStart-idling" + postFix);
        fuel = document.getElementById("stopStart-fuel" + postFix);

        if (timesValue === -1) {
            times.innerText = "-";
            idling.innerText = "-:--";
            fuel.innerText = "-";

        } else {
            times.innerText = Math.round(timesValue);
            idling.innerText = toHHMM(idlingValue / 1000);
            fuel.innerText = Math.round(fuelValue * volumeConversionFactor * 100) / 100;
        }
    }

    function updateAnnualDashboard(timesValue, idlingValue, fuelUsedPerMinute) {
        updateDashboard(timesValue, idlingValue, fuelUsedPerMinute, "-annual");
    }

    return {
        initialize: function(api, state, callback) {
            if (state.translate){
                state.translate(document.getElementById("StartStopContent") || "");
            }
            callback();
        },
        focus: function() {
            // User interface is available
            console.log("StopStart focus");

            updateDashboard(-1);
            populateVehicles(getUserConfiguration(updateDashboardRegionalUnits));
        },
        blur: function() {
            // Save any Add-In state
            console.log("StopStart blur");
        }
    };
};