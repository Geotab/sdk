geotab.addin.historyReportAddin = function () {

    var addin;

    var Interface = function (name, methods) {
        if (arguments.length !== 2) {
            throw new Error("Interface constructor called with " + arguments.length + " arguments, but expected exactly 2.");
        }

        this.name = name;
        this.methods = [];

        for (var i = 0; i < methods.length; i++) {
            if (typeof methods[i] !== "string") {
                throw new Error("Interface constructor expects method names to be passed in as a string.");
            }
            this.methods.push(methods[i]);
        }
    };

    Interface.ensureImplements = function (object) {
        if (arguments.length < 2) {
            throw new Error("Function Interface.ensureImplements called with " + arguments.length + " arguments, but expected exactly 2.");
        }

        for (var i = 1, n = arguments.length; i < n; i++) {
            var classInterface = arguments[i];
            if (classInterface.constructor !== Interface) {
                throw new Error("Function Interface.ensureImplements expects arguments two and above to be instances of Interface.");
            }

            for (var j = 0, m = classInterface.methods.length; j < m; j++) {
                var method = classInterface.methods[j];
                if (!object[method] || typeof object[method] !== "function") {
                    throw new Error("Function Interface.ensureImplements: object does not implement the " + classInterface.name + " interface. Method " + method + " was not found.");
                }
            }
        }
    };

    var IAddin = new Interface("IAddin", ["initialize", "focus", "blur"]);

    var ReportRow = (function () {

        var vehicleId,
			vehicleName,
			timestamp,
            latitude,
            longitude,
            speed;

        return function (logRecord) {

			this.setVehicleId = function (localVehicleId) {
                vehicleId = localVehicleId;
            };
            this.getVehicleId = function () {
                return vehicleId;
            };
			
			this.setVehicleName = function (localVehicleName) {
                vehicleName = localVehicleName;
            };
            this.getVehicleName = function () {
                return vehicleName;
            };
		
            this.setTimestamp = function (localTimestamp) {
                timestamp = new Date(localTimestamp);
            };
            this.getTimestamp = function () {
                return timestamp.toLocaleDateString() + " " + timestamp.toLocaleTimeString().replace(/:\d+ /, ' ');
            };

            this.setLatitude = function (localLatitude) {
                latitude = localLatitude;
            };
            this.getLatitude = function () {
                return latitude;
            };

            this.setLongitude = function (localLongitude) {
                longitude = localLongitude;
            };
            this.getLongitude = function () {
                return longitude;
            };

            this.setSpeed = function (localSpeed) {
                speed = localSpeed;
            };
            this.getSpeed = function () {
                return speed;
            };
            this.getSpeedFormatted = function() {
				if (speed < 2) {
					return "";
				} else if (addin.getIsMetric()) {
					return Math.round(speed) + " km/h";
				} else {
					return Math.round(speed * 0.621371) + " mph";
				}
            };

            this.toTableRow = function () {
                var row = document.createElement("tr"),
                    c1 = document.createElement("td"),
                    c2 = document.createElement("td"),
                    c3 = document.createElement("td"),
                    c4 = document.createElement("td"),
                    c5 = document.createElement("td"),
					c6 = document.createElement("td"),
					t1 = document.createTextNode(this.getVehicleName());
                    t2 = document.createTextNode(this.getTimestamp()),
                    t3 = document.createElement("a"),
                    t4 = document.createTextNode(this.getSpeedFormatted()),
                    t5 = document.createTextNode(this.getLatitude().toFixed(5)),
                    t6 = document.createTextNode(this.getLongitude().toFixed(5)),
                    lookupLogRecord = function(lat, lon, element) {
                        addin.getApi().call("GetAddresses", {
                            coordinates: [{
								x: lon,
								y: lat
							}]
                        }, function(result) {
                            if (result && result.length) {
                                element.textContent = result[0].formattedAddress;
                            }
                        }, function(error) {
                            element.textContent = "Location could not be determined";
                        });
                    };

                t3.appendChild(document.createTextNode("Determining location..."));
                t3.href = "#";
                t3.dataset.lat = this.getLatitude();
                t3.dataset.lng = this.getLongitude();
                t3.dataset.time = this.getTimestamp();
                t3.addEventListener("click", function (event) {
                    event.preventDefault();
                    addin.getMap().setView([this.dataset.lat, this.dataset.lng], 16);
                    L.marker([this.dataset.lat, this.dataset.lng]).addTo(addin.getMap()).bindPopup(this.dataset.time);
                });

                c1.appendChild(t1);
                c2.appendChild(t2);
                c3.appendChild(t3);
                c4.appendChild(t4);
                c5.appendChild(t5);
				c6.appendChild(t6);

                row.appendChild(c1);
                row.appendChild(c2);
                row.appendChild(c3);
                row.appendChild(c4);
                row.appendChild(c5);
				row.appendChild(c6);

                var rowSpeed = this.getSpeed();
                if (rowSpeed > 40 && rowSpeed < 65) {
                    row.className = "info";
                } else if (rowSpeed >= 65 && rowSpeed < 90) {
                    row.className = "warning";
                } else if (rowSpeed >= 90) {
                    row.className = "error";
                }

                lookupLogRecord(this.getLatitude(), this.getLongitude(), t3);

                return row;
            };
			
			this.setVehicleId(logRecord.device.id);
			this.setVehicleName(logRecord.device.name);
            this.setTimestamp(logRecord.dateTime);
			this.setLatitude(logRecord.latitude);
			this.setLongitude(logRecord.longitude);
			this.setSpeed(logRecord.speed);
        };

    })();

    var AddinTemplate = (function () {

        var api,
            state;

        var map,
			devices = {},
			selected = [],
            selectVehicles,
            selectInterval,
			isMetric = false,
            showHistoric = false,
            showStationary = false,
            interval = 2,
            divReport,
            inputDateStart,
            inputDateEnd,
            buttonRunReport,
            buttonRunReportDisplay,
            buttonRunReportPrint,
            buttonRunReportShare,
            divError;

        var createTableCell = function (type, content) {
            var cell = document.createElement(type);
            var textNode = document.createTextNode(content);
            cell.appendChild(textNode);
            return cell;
        };

        return function (newApi, newState) {

            this.setApi = function (localApi) {
                api = localApi;
            };
            this.getApi = function () {
                return api;
            };

            this.setState = function (localState) {
                state = localState;
            };
            this.getState = function () {
                return state;
            };

            this.getMap = function() {
                return map;
            };
			
			this.setDevices = function (localDevices) {
                devices = localDevices;
            };
            this.getDevices = function () {
                return devices;
            };

            this.setSelected = function (localSelected) {
                selected = localSelected;
            };
            this.getSelected = function () {
                return selected;
            };
			
			this.setIsMetric = function (localIsMetric) {
				isMetric = localIsMetric;
			};
			this.getIsMetric = function () {
				return isMetric;
			};

            this.setShowHistoric = function (localShowHistoric) {
                showHistoric = localShowHistoric;
            };
            this.getShowHistoric = function () {
                return showHistoric;
            };

            this.setShowStationary = function(localShowStationary) {
                showStationary = localShowStationary;
            };
            this.getShowStationary = function () {
                return showStationary;
            };

            this.setInterval = function (localInterval) {
                interval = localInterval;
            };
            this.getInterval = function() {
                return interval;
            };

			this.initialize = function () {
			    map = document.getElementById("historyReport-map");
                divReport = document.getElementById("report");
                selectVehicles = document.getElementById("historyReport-select-vehicles");
                selectInterval = document.getElementById("historyReport-select-interval");
                inputDateStart = document.getElementById("input-start-date");
                inputDateEnd = document.getElementById("input-end-date");
                buttonRunReport = buttonRunReportDisplay = document.getElementById("historyReport-run-report-display");
                buttonRunReportPrint = document.getElementById("historyReport-run-report-display");
                buttonRunReportShare = document.getElementById("historyReport-run-report-share");
                divError = document.getElementById("historyReport-error");

                var now = new Date();
                var dd = now.getDate(),
                    mm = now.getMonth() + 1,
                    yy = now.getFullYear();

                if (dd < 10) {
                    dd = "0" + dd;
                }

                if (mm < 10) {
                    mm = "0" + mm;
                }

                inputDateStart.value = yy + "-" + mm + "-" + dd + "T" + "09:00";
                inputDateEnd.value = yy + "-" + mm + "-" + dd + "T" + "17:00";

                $("#historyReport-run-report").click(function (event) {
                    event.preventDefault();
                    addin.runReport();
                });

                $("#historyReport-run-report-display").click(function (event) {
                    event.preventDefault();
                    addin.runReport();
                });

                $("#historyReport-run-report-print").click(function (event) {
                    event.preventDefault();

                    addin.errorHandler("Printing has not yet been implemented");
                });

                $("#historyReport-run-report-share").click(function (event) {
                    event.preventDefault();

                    addin.errorHandler("Exporting has not yet been implemented");
                });
				
				$("#historyReport-select-vehicles").on("change", function (event, parameters) {
                    if (parameters.selected) {
                        addin.getSelected().push(parameters.selected);
                    } else {
                        var index = addin.getSelected().indexOf(parameters.deselected);
                        if (index > -1) {
                            addin.getSelected().splice(index, 1);
                        }
                    }
                });

                $("#historyReport-input-show-historic").on("change", function () {
                    addin.setShowHistoric(!addin.getShowHistoric());
                    addin.focus();
                });

			    $("#historyReport-input-show-stationary").on("change", function() {
			        addin.setShowStationary(!addin.getShowStationary());
			    });

                $("#historyReport-select-interval").on("change", function () {
                    addin.setInterval($(this).find(":selected").data("value"));
                });
				
				$("#historyReport-input-radio-imperial").on("change", function () {
                    addin.setIsMetric(false);
                });

                $("#historyReport-input-radio-metric").on("change", function () {
                    addin.setIsMetric(true);
                });

                map = new L.Map("historyReport-map", {
                    center: new L.LatLng(43.434497, -79.709441),
                    zoom: 9,
                    layers: [L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2VvdGFiIiwiYSI6ImNpd2NlaW02MjAxc28yeW9idTR3dmRxdTMifQ.ZH0koA2g2YMMBOcx6EYbwQ")]
                });
            };

            this.focus = function () {
                $("#historyReport-image-loading").fadeIn();
                $("#historyReport-select-vehicles").empty();
				addin.setDevices({});

                addin.getApi().call("Get", {
                    typeName: "Device"
                }).then(function (result) {
                    if (result && result.length > 0) {
                        var now = new Date();
                        for (var i = 0; i < result.length; i++) {
                            if (new Date(result[i].activeTo) >= now | addin.getShowHistoric()) {
                                var option = new Option();
                                option.text = result[i].name;
                                option.value = result[i].id;
                                selectVehicles.add(option);
								
								addin.getDevices()[result[i].id] = result[i];
                            }
                        }
                    } else {
                        addin.errorHandler("There was a problem retrieving your vehicles, please try again shortly.");
                    }
					
					$("#historyReport-select-vehicles").chosen();
					$("#historyReport-select-vehicles").trigger("chosen:updated");
                    $("#historyReport-image-loading").fadeOut();
                }, function (error) {
                    addin.errorHandler(error);
                });
            };

            this.blur = function (event) {

            };

            this.runReport = function () {
                var i;
                addin.errorHandler("");
				
				if (addin.getSelected().length === 0) {
					addin.errorHandler("Select at least one vehicle to run the report");
					return;
				}

                var dateFrom = new Date(inputDateStart.value),
                    dateTo = new Date(inputDateEnd.value);

                var dateFromUtc = new Date(dateFrom.setMinutes(dateFrom.getMinutes() + new Date().getTimezoneOffset())),
                    dateToUtc = new Date(dateTo.setMinutes(dateTo.getMinutes() + new Date().getTimezoneOffset()));
				
				var timeDeltaMinutes = ((dateToUtc - dateFromUtc) / 1000) / 60;
				
				if (timeDeltaMinutes <= 0) {
					addin.errorHandler("From date must be before to date");
					return;
				} else if (timeDeltaMinutes >= 2880) {
					addin.errorHandler("Time frame is too large, select at most 2 days");
					return;
				}
				
                $("#historyReport-image-loading").fadeIn();
				
				var report = {},
					processed = 0;
				
				for (i = 0; i < addin.getSelected().length; i++) {
					report[addin.getSelected()[i]] = [];
				}
				
				for (i = 0; i < addin.getSelected().length; i++) {
					var calls = [],
						now = new Date().getTime();
					
					for (var j = 0; j <= timeDeltaMinutes; j += addin.getInterval()) {
						var requestDate = new Date(dateFromUtc.getTime() + (j * 60000));

						if (requestDate > now) {
							break;
						}
						
						calls.push(["Get", {
							typeName: "LogRecord",
							search: {
								deviceSearch: {
									id: addin.getSelected()[i]
								},
								fromDate: requestDate,
								toDate: requestDate
							}
						}]);
					}
					
					addin.getApi().multiCall(calls).then(function(results) {
						if (results && results.length > 0) {
							for (var n = 0; n < results.length; n++) {
								if (report.hasOwnProperty(results[n][0].device.id)) {
									report[results[n][0].device.id].push(results[n][0]);
								}
							}
						}
						
						if (++processed === addin.getSelected().length) {
							addin.displayReport(report);
						}
					}, function(error) {
						addin.errorHandler(error);
						$("#historyReport-image-loading").fadeOut();
					});
				}
            };
			
			this.displayReport = function (report) {
				var table = document.createElement("table"),
					thead = document.createElement("thead"),
					tbody = document.createElement("tbody");
				
				table.setAttribute("id", "table-report");
				table.className = "table table-striped table-hover";
				
				thead.appendChild(createTableCell("th", "Vehicle"));
				thead.appendChild(createTableCell("th", "Time"));
				thead.appendChild(createTableCell("th", "Address"));
				thead.appendChild(createTableCell("th", "Speed"));
				thead.appendChild(createTableCell("th", "Latitude"));
				thead.appendChild(createTableCell("th", "Longitude"));
				
				table.appendChild(thead);
				
				var showStationary = addin.getShowStationary();
				
				for(var deviceId in report) {
                    if(report.hasOwnProperty(deviceId)) {
                        var vehicleName = "";
                        for (var key in addin.getDevices()) {
                            if (key === deviceId) {
                                vehicleName = addin.getDevices()[key].name;
                            }
                        }
                        for (var i = 0; i < report[deviceId].length; i++) {
                            var row = report[deviceId][i];
                            row.device.name = vehicleName;
                            if (showStationary || row.speed > 2) {
                                tbody.appendChild(new ReportRow(row).toTableRow());
                            }
                        }
                    }
				}
				
				table.appendChild(tbody);
				
				divReport.innerHTML = "";
				divReport.appendChild(table);
				
				$("#historyReport-placeholder-report").fadeOut(400, function () {
					$("#historyReport-report-container").fadeIn();
				});

				$("#historyReport-image-loading").fadeOut();
			};

            this.shareReport = function () {

            };

            this.errorHandler = function (message) {
                divError.innerHTML = message;
                divError.style.paddingBottom = (message === "") ? "0px" : "20px";
            };

            this.setApi(newApi);
            this.setState(newState);
        };

    })();

    return {
        initialize: function (geotabApi, pageState, initializeCallback) {
            addin = new AddinTemplate(geotabApi, pageState);
            Interface.ensureImplements(addin, IAddin);
            addin.initialize();

            if (initializeCallback) {
                initializeCallback();
            }
        },

        focus: function () {
            addin.focus();
        },

        blur: function () {
            addin.blur();
        }
    };
};
