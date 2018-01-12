geotab.addin.geotabRewind = function (api) {
    "use strict";
    var map,
        baseLayer,
        layerGroup,
        dateTimeInput,
        vehicleSelect,
        automaticallyResizeCheckbox,
        devices = {},
        selected = [],
        UTCFormatPostfix = ":00Z",

        initializeInterface = function () {
			baseLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2VvdGFiIiwiYSI6ImNpd2NlaW02MjAxc28yeW9idTR3dmRxdTMifQ.ZH0koA2g2YMMBOcx6EYbwQ");

            map = new L.Map("rewind-map", {
                center: new L.LatLng(43.434497, -79.709441),
                zoom: 9,
                layers: [baseLayer]
            });

            layerGroup = L.layerGroup().addTo(map);

            vehicleSelect = document.getElementById("rewind-vehicles");
            automaticallyResizeCheckbox = document.getElementById("rewind-resize");
            dateTimeInput = document.getElementById("rewind-time");

            var now = new Date(),
                dd = now.getDate(),
	            mm = now.getMonth() + 1,
	            yy = now.getFullYear();

            if (dd < 10) {
                dd = "0" + dd;
            }

            if (mm < 10) {
                mm = "0" + mm;
            }

            dateTimeInput.value = yy + "-" + mm + "-" + dd + "T" + "09:00";

            document.getElementById("rewind-time").addEventListener("change", function (event) {
                event.preventDefault();

                displayLocations();
            });

            $("#rewind-vehicles").on("change", function (event, parameters) {
                if (parameters.selected) {
                    selected.push(parameters.selected);
                } else {
                    var index = selected.indexOf(parameters.deselected),
                        chosenInput = document.querySelector("#rewind_vehicles_chosen .chosen-choices .search-field input[type=text]");
                    if (index > -1) {
                        selected.splice(index, 1);
                    }
                    chosenInput && chosenInput.focus();
                }
                displayLocations();
            });

            document.getElementById("rewind30").addEventListener("click", function (event) {
                event.preventDefault();

                var current = getCurrentValue(),
                    offset = current.getTimezoneOffset();

                setDateInput(new Date(current.setMinutes(current.getMinutes() - 30 + offset)));
            });

            document.getElementById("rewind5").addEventListener("click", function (event) {
                event.preventDefault();

                var current = getCurrentValue(),
                    offset = current.getTimezoneOffset();

                setDateInput(new Date(current.setMinutes(current.getMinutes() - 5 + offset)));
            });

            document.getElementById("rewind1").addEventListener("click", function (event) {
                event.preventDefault();

                var current = getCurrentValue(),
                    offset = current.getTimezoneOffset();

                setDateInput(new Date(current.setMinutes(current.getMinutes() - 1 + offset)));
            });

            document.getElementById("now").addEventListener("click", function (event) {
                event.preventDefault();

                setDateInput(new Date());
            });

            document.getElementById("forward1").addEventListener("click", function (event) {
                event.preventDefault();

                var current = getCurrentValue(),
                    offset = current.getTimezoneOffset();

                setDateInput(new Date(current.setMinutes(current.getMinutes() + 1 + offset)));
            });

            document.getElementById("forward5").addEventListener("click", function (event) {
                event.preventDefault();

                var current = getCurrentValue(),
                    offset = current.getTimezoneOffset();

                setDateInput(new Date(current.setMinutes(current.getMinutes() + 5 + offset)));
            });

            document.getElementById("forward30").addEventListener("click", function (event) {
                event.preventDefault();

                var current = getCurrentValue(),
                    offset = current.getTimezoneOffset();

                setDateInput(new Date(current.setMinutes(current.getMinutes() + 30 + offset)));
            });

            setTimeout(function () {
                map.invalidateSize();
            }, 600);
        },

        errorHandler = function(message) {
            document.getElementById("rewind-error").innerHTML = message;
        },

        toggleLoading = function(show) {
            if (show) {
                document.getElementById("rewind-loading").style.display = "block";
            } else {
                setTimeout(function() {
                    document.getElementById("rewind-loading").style.display = "none";
                }, 600);
            }
        },

        setDateInput = function (value) {
            var dd = value.getDate(),
                mm = value.getMonth() + 1,
                yy = value.getFullYear(),
                hh = value.getHours(),
                mi = value.getMinutes();

            if (dd < 10) {
                dd = "0" + dd;
            }

            if (mm < 10) {
                mm = "0" + mm;
            }

            if (hh < 10) {
                hh = "0" + hh;
            }

            if (mi < 10) {
                mi = "0" + mi;
            }

            dateTimeInput.value = yy + "-" + mm + "-" + dd + "T" + hh + ":" + mi;
            displayLocations();
        },

		buildMarker = function(name, location) {
			var marker = L.marker(location).bindLabel(name).bindPopup("<img src='http://maps.googleapis.com/maps/api/staticmap?center=" +
				location.lat + "," +
				location.lng + "&zoom=14&size=298x200&sensor=false'>");
			return marker;
		},

        displayLocations = function () {
            toggleLoading(true);

            var calls = [],
                date = getCurrentValue(),
                utcDate = new Date(date.setMinutes(date.getMinutes() + new Date().getTimezoneOffset())).toISOString();

            toggleLoading(false);

            for (var i = 0; i < selected.length; i++) {
                calls.push([
                    "Get", {
                        typeName: "LogRecord",
                        search: {
                            deviceSearch: {
                                id: selected[i]
                            },
                            fromDate: utcDate,
                            toDate: utcDate
                        }
                    }
                ]);
            }

            api.multiCall(calls).then(function (results) {
                var markers = [],
                    bounds = [];

                if (results && results.length > 0) {
                    for (var j = 0; j < results.length; j++) {
                        if (results[j] !== undefined && results[j] !== null) {
							var location, name;
                            if (results[j].length === undefined) {
                                location = new L.LatLng(results[j].latitude, results[j].longitude);
								name = devices[results[j].device.id].name;
							} else {
								location = new L.LatLng(results[j][0].latitude, results[j][0].longitude);
								name = devices[results[j][0].device.id].name;
                            }
							markers.push(buildMarker(name, location));
							bounds.push(location);
                        }
                    }

                    layerGroup.clearLayers();

                    if (automaticallyResizeCheckbox.checked && bounds.length > 0) {
                        map.fitBounds(bounds);
                    }

                    for (var n = 0; n < markers.length; n++) {
                        layerGroup.addLayer(markers[n]);
                    }
                }
                toggleLoading(false);
            }).catch(function(error) {
                errorHandler(error);
                toggleLoading(false);
            });
        },

        getCurrentValue = function() {
            return new Date(dateTimeInput.value + UTCFormatPostfix);
        };
	
	return {
	    initialize: function (api, state, callback) {
	        initializeInterface();
	        callback();
	    },
	    focus: function () {
	        toggleLoading(true);

	        api.call("Get", {
	            typeName: "Device"
	        }).then(function(result) {
	            if (result && result.length > 0) {
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
	            $("#rewind-vehicles").chosen();
	            toggleLoading(false);
	        }).catch(function(error) {
	            errorHandler(error);
	            toggleLoading(false);
	        });
	    },
	    blur: function () {
            if (layerGroup !== null) {
                layerGroup.clearLayers();
            }
            devices = {};
		}
	};
};