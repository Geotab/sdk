geotab.addin.geotabProximity = function (api, state) {
    var map,
        baseLayer,
        layerGroup,
        addressInput,
        vehicleSelect,
        dateFromInput,
        dateToInput,
        radiusFactor = 250,
        devices = {},
        selected = [],
        isUserMetric = true,
        selectAll = false,
        pinImageUrl = "/images/pin.png",
        errorHandler = function (message) {
            document.getElementById("proximity-error").innerHTML = message;
        },

        toggleLoading = function (show) {
            if (show) {
                document.getElementById("proximity-loading").style.display = "block";
            } else {
                setTimeout(function () {
                    document.getElementById("proximity-loading").style.display = "none";
                }, 600);
            }
        },

        initializeInterface = function (isMetric) {
            isUserMetric = isMetric;
            baseLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2VvdGFiIiwiYSI6ImNpd2NlaW02MjAxc28yeW9idTR3dmRxdTMifQ.ZH0koA2g2YMMBOcx6EYbwQ');

            map = new L.Map('proximity-map', {
                center: new L.LatLng(43.434497, -79.709441),
                zoom: 9,
                layers: [baseLayer]
            });

            layerGroup = L.layerGroup().addTo(map);

            addressInput = document.getElementById("proximity-address");
            vehicleSelect = document.getElementById("proximity-vehicles");
            dateFromInput = document.getElementById("proximity-from");
            dateToInput = document.getElementById("proximity-to");

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

            dateFromInput.value = yy + "-" + mm + "-" + dd + "T" + "09:00";
            dateToInput.value = yy + "-" + mm + "-" + dd + "T" + "17:00";

            $("#proximity-vehicles").on("change", function (event, parameters) {
                if (parameters.selected) {
                    selected.push(parameters.selected);
                } else {
                    var index = selected.indexOf(parameters.deselected);
                    if (index > -1) {
                        selected.splice(index, 1);
                    }
                }
                displayProximity();
            });

            document.getElementById("proximity-address").addEventListener("keydown", function (event) {
                if (event.keyCode == 13) {
                    displayProximity();
                }
            });

            document.getElementById("proximity-size").addEventListener("change", function(event) {
                sizeChanged(event.target.value);
            });

            document.getElementById("proximity-size").addEventListener("mousemove", function(event) {
                sizeChanged(event.target.value);
            });

            var sizeChanged = function(rawRadius) {
                var localizedRadius = getLocalMetreEquivalent(rawRadius * 5),
                    roundedRadius,
                    unit;

                radiusFactor = rawRadius;
                if (isMetric && localizedRadius >= 1000) {
                    roundedRadius = Number(Math.round((localizedRadius / 1000.0) + "e1") + "e-1");
                    unit = "km";
                } else if (!isMetric && localizedRadius >= 1760) {
                    // http://www.jacklmoore.com/notes/rounding-in-javascript/
                    roundedRadius = Number(Math.round((localizedRadius / 1760.0) + "e1") + "e-1");
                    unit = "mi";
                } else {
                    roundedRadius = Math.round(localizedRadius);
                    unit = isMetric ? " m" : " yd";
                }
                document.getElementById("proximity-size-label").innerHTML = "(" +  roundedRadius + " " + unit + ")";
            };
            sizeChanged(300);

            // Workaround for change event firing on input type range on movement, see: http://html5.org/tools/web-apps-tracker?from=7786&to=7787
            (function (el, timeout) {
                var timer,
                    trigger = function () {
                        displayProximity();
                        el.trigger("changed");
                    };
                el.bind("change", function () {
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(trigger, timeout);
                });
            })($("#proximity-size"), 300);

            document.getElementById("proximity-select-all").addEventListener("change", function (event) {
                event.preventDefault();

                selectAll = !selectAll;

                if (selectAll) {
                    document.getElementById("proximity-div-vehicles").style.display = "none";
                } else {
                    document.getElementById("proximity-div-vehicles").style.display = "block";
                }

                displayProximity();
            });

            document.getElementById("proximity-from").addEventListener("change", function (event) {
                event.preventDefault();

                displayProximity();
            });

            document.getElementById("proximity-to").addEventListener("change", function (event) {
                event.preventDefault();

                displayProximity();
            });
        },

        createCircle = function (longitude, latitude, radius, color, opacity) {
            return new L.circle([latitude, longitude], radius, {
                stroke: false,
                fillColor: color,
                fillOpacity: opacity
            });
        },

        getLocalMetreEquivalent = function(metres) {
            return metres * (isUserMetric ? 1 : 1.09361);
        },

        clearMap = function () {
            layerGroup.clearLayers();
            for (var i in map._layers) {
                if (map._layers[i]._path !== undefined) {
                    try {
                        map.removeLayer(map._layers[i]);
                    } catch (e) {
                        errorHandler("There was a problem displaying the map, please refresh the page.");
                    }
                }
            }
        },

        buildMarker = function (coordinate) {
            return new L.marker(coordinate, {
                icon: new L.icon({
                    iconUrl: pinImageUrl,
                    iconSize: [16, 16]
                })
            });
        },

        buildGetRequest = function (id, fromDate, toDate) {
            return ["Get", {
                typeName: "LogRecord",
                search: {
                    deviceSearch: {
                        id: id
                    },
                    fromDate: fromDate,
                    toDate: toDate
                }
            }];
        },

        flattenArrays = function (arrayOfArrays) {
            return arrayOfArrays.reduce(function (combinedArray, currentArray) {
                return combinedArray.concat(currentArray);
            }, []);
        },

        addMarker = function (logRecord) {
            var marker, d;
            var coordinate = new L.LatLng(logRecord.latitude, logRecord.longitude);
            var distance = logRecord.distance;

            marker = buildMarker(coordinate);
            d = new Date(logRecord.dateTime);
            marker.bindLabel(devices[logRecord.device.id].name + " was " + Math.floor(getLocalMetreEquivalent(distance)) + (isUserMetric ? " m" : " yd") + " away on " + d.toDateString() + " at " + d.toTimeString());
            layerGroup.addLayer(marker);
        },

        /**
         *  Retrieves if the current user is metric or not
         *  @param {Function} callback The function to call when complete
         */
        getUserIsMetric = function (callback) {
            api.getSession(function (token) {
                if (token && token.userName) {
                    api.call("Get", {
                        typeName: "User",
                        search: {
                            name: token.userName
                        }
                    }, function (result) {
                        if (result && result.length > 0) {
                            var user = result[0];
                            callback && callback(!!user.isMetric);
                        }
                        else {
                            callback && callback(true);
                        }
                    }, function (errorString, errorObject) {
                        callback && callback(true);
                    });
                }
            }, false);
        },

        displayProximity = function () {
            errorHandler("");

            if (addressInput.value === "") {
                return;
            }

            if (!selectAll && selected.length == 0) {
                errorHandler("Select at least one vehicle to display");
                return;
            }
            var dateFrom = new Date(dateFromInput.value + ":00Z");
            var utcFrom = new Date(dateFrom.setMinutes(dateFrom.getMinutes() + new Date().getTimezoneOffset())).toISOString();
            var dateTo = new Date(dateToInput.value + ":00Z");
            var utcTo = new Date(dateTo.setMinutes(dateTo.getMinutes() + new Date().getTimezoneOffset())).toISOString();
            clearMap();
            toggleLoading(true);

            api.call("GetCoordinates", {
                addresses: [addressInput.value]
            }, function (result) {
                if (result !== undefined && result !== null && result.length > 0 && result[0] != null) {
                    var devicesToQuery,
                        calls,
                        maxRadius = 5 * radiusFactor,
                        filterLogsByDistance = function (logs) {
                            return logs.filter(function (log) {
                                return log.distance < maxRadius;
                            });
                        },
                        render = function (logs) {
                            logs.forEach(addMarker);
                            if (logs.length > 0) {
                                errorHandler("There were " + logs.length + " locations recorded nearby to " + addressInput.value + ".");
                            } else {
                                errorHandler("There was no one near this area during this time frame.");
                            }
                            toggleLoading(false);
                        };

                    var boundary1 = createCircle(result[0].x, result[0].y, 1 * radiusFactor, '#ff4444', 0.3),
                        boundary2 = createCircle(result[0].x, result[0].y, 2 * radiusFactor, '#ff8800', 0.3),
                        boundary3 = createCircle(result[0].x, result[0].y, 3 * radiusFactor, '#ff8800', 0.3),
                        boundary4 = createCircle(result[0].x, result[0].y, 4 * radiusFactor, '#99cc00', 0.3),
                        boundary5 = createCircle(result[0].x, result[0].y, 5 * radiusFactor, '#33b5e5', 0.3);

                    var center = {latitude: result[0].y, longitude: result[0].x};
                    // hack for ie9, global is missing
                    window.geotabHeatMap = window.geotabHeatMap || {};
                    window.geotabHeatMap.center = center;

                    // setup map
                    map.setView(new L.LatLng(center.latitude, center.longitude), 14);

                    boundary5.addTo(map);
                    boundary4.addTo(map);
                    boundary3.addTo(map);
                    boundary2.addTo(map);
                    boundary1.addTo(map);

                    // compile selected devices devices
                    devicesToQuery = selectAll ? Object.keys(devices).map(function (device) {
                        return devices[device]
                    }) : selected.map(function (id) {
                        return {id: id};
                    });

                    calls = devicesToQuery.map(function (device) {
                        return buildGetRequest(device.id, utcFrom, utcTo);
                    });

                    api.multiCall(calls, function (results) {
                        var parallel = new Parallel(flattenArrays(results), {
                                env: {
                                    center: center
                                }
                            }),
                            getDistance = function (logRecord) {
                                // hack for ie9, global is missing
                                var center = typeof window !== 'undefined' ? window.geotabHeatMap.center : global.env.center;
                                var toRadians = function (d) {
                                    return d * (Math.PI / 180.0);
                                };
                                var dLat = toRadians(center.latitude - logRecord.latitude);
                                var dLon = toRadians(center.longitude - logRecord.longitude);
                                var a = Math.sin(dLat / 2.0) * Math.sin(dLat / 2.0) +
                                    Math.cos(toRadians(logRecord.latitude)) * Math.cos(toRadians(center.latitude)) *
                                    Math.sin(dLon / 2.0) * Math.sin(dLon / 2.0);
                                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                                logRecord.distance = 6371000.0 * c;
                                return logRecord;
                            };

                        parallel
                            .map(getDistance)
                            .then(filterLogsByDistance)
                            .then(render);

                    }, function (error) {
                        errorHandler(error);
                        toggleLoading(false);
                    });
                } else {
                    errorHandler("Could not find that address");
                    toggleLoading(false);
                }
            }, function (error) {
                errorHandler(error);
                toggleLoading(false);
            });
        };

    return {
        initialize: function (api, state, callback) {
            var pinImage = document.getElementById("pinImage");

            if (pinImage) {
                pinImageUrl = pinImage.src
                pinImage.parentNode && pinImage.parentNode.removeChild(pinImage);  
            }

            getUserIsMetric(function (isMetric) {
                initializeInterface(isMetric);
                callback();
            });
        },
        focus: function () {
            toggleLoading(true);

            api.call("Get", {
                typeName: "Device"
            }, function (result) {
                if (result !== undefined && result.length > 0) {
                    var now = new Date();
                    for (var i = 0; i < result.length; i++) {
                        if (new Date(result[i].activeTo) > now) {
                            var option = new Option();
                            option.text = result[i].name;
                            option.value = result[i].id;
                            vehicleSelect.add(option);

                            devices[result[i].id] = result[i];
                        }
                    }
                }
                $("#proximity-vehicles").chosen();
                toggleLoading(false);
            }, function (error) {
                errorHandler(error);
                toggleLoading(false);
            });

            setTimeout(function () {
                map.invalidateSize();
            }, 800);
        },
        blur: function () {
            if (devices != null) {
                delete devices;
            }
        }
    };
};
