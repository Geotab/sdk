geotab.addin.geotabHeatMap = function (api, state) {
	var map,
		baseLayer,
		heatMapLayer,
		vehicleSelect,
		dateFromInput,
		dateToInput,

		errorHandler = function(message) {
			document.getElementById("heatmap-error").innerHTML = message;
		},

		toggleLoading = function(show) {
			if (show) {
				document.getElementById("heatmap-loading").style.display = "block";
			} else {
				setTimeout(function() {
					document.getElementById("heatmap-loading").style.display = "none";
				}, 600);
			}
		},

        initializeInterface = function () {
            baseLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2VvdGFiIiwiYSI6ImNpd2NlaW02MjAxc28yeW9idTR3dmRxdTMifQ.ZH0koA2g2YMMBOcx6EYbwQ');

            heatMapLayer = L.TileLayer.heatMap({
                radius: {
                    value: 24,
                    absolute: false
                },
                opacity: 0.7,
                gradient: {
                    0.45: "rgb(0,0,255)",
                    0.55: "rgb(0,255,255)",
                    0.65: "rgb(0,255,0)",
                    0.95: "yellow",
                    1.0: "rgb(255,0,0)"
                }
            });

            map = new L.Map('heatmap-map', {
                center: new L.LatLng(43.434497, -79.709441),
                zoom: 9,
                layers: [baseLayer, heatMapLayer]
            });

            vehicleSelect = document.getElementById("heatmap-vehicles");
            dateFromInput = document.getElementById("heatmap-from");
            dateToInput = document.getElementById("heatmap-to");

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

            document.getElementById("heatmap-vehicles").addEventListener("change", function (event) {
                event.preventDefault();
                displayHeatMap();
            });

            document.getElementById("heatmap-from").addEventListener("change", function (event) {
                event.preventDefault();
                displayHeatMap();
            });

            document.getElementById("heatmap-to").addEventListener("change", function (event) {
                event.preventDefault();
                displayHeatMap();
            });
        },

		displayHeatMap = function () {
			var deviceId = vehicleSelect[vehicleSelect.selectedIndex].getAttribute("data-heatmap-deviceid"),
				fromValue = dateFromInput.value,
				toValue = dateToInput.value;
			
			errorHandler("");
			
			if ((deviceId === null) || (fromValue === "") || (toValue === "")) {
				return;
			}
			
			toggleLoading(true);
			
			var dateFrom = new Date(fromValue).toISOString(),
				dateTo = new Date(toValue).toISOString();
			
			api.call("Get", {
				typeName: "LogRecord",
				search: {
					deviceSearch: {
						id: deviceId
					},
					fromDate: dateFrom,
					toDate: dateTo
				}
			}).then(function (result) {
				var coordinates = [];
				var bounds = [];
				
				for (var i = 0; i < result.length; i++) {
					if (result[i].latitude != 0 || result[i].longitude != 0) {
						coordinates.push({
							lat: result[i].latitude,
							lon: result[i].longitude,
							value: 1
						});
						bounds.push(new L.LatLng(result[i].latitude, result[i].longitude));
					}
				}
				
				if (coordinates.length > 0) {
					map.fitBounds(bounds);
					heatMapLayer.setData(coordinates);
				} else {
					errorHandler("Not enough data to display");
				}
				
				toggleLoading(false);
			}, function (error) {
				errorHandler(error);
				toggleLoading(false);
			});
		};
	
	return {
	    initialize: function (api, state, callback) {
	        initializeInterface();
	        callback();
	    },
	    focus: function () {
	        api.call("Get", {
	            typeName: "Device"
			}).then(function (result) {
	            if (result && result.length > 0) {
					result.sort(function (a, b) {
						a = a.name.toLowerCase();
						b = b.name.toLowerCase();
						if (a === b) return 0;
						if (a > b) return 1;
						return -1;
					});
	                var now = new Date();
	                for (var i = 0; i < result.length; i++) {
	                    if (new Date(result[i].activeTo) > now) {
	                        var option = new Option();
	                        option.text = result[i].name;
	                        option.setAttribute("data-heatmap-deviceid", result[i].id);
	                        vehicleSelect.add(option);
	                    }
	                }
	            }
	        }, errorHandler);

	        setTimeout(function () {
	            map.invalidateSize();
	        }, 200);
		},
		blur: function() {
		}
	};
};