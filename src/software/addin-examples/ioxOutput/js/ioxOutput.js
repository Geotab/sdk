geotab.addin.ioxOutput = function() {
	var vehicleSelect, api, sendButton, sendHistory,
		errorHandler = function(message) {
		    document.getElementById("ioxoutput-error").innerHTML = message;
		},
		appendAndPoll = function(textMessageId) {
		    var divId = textMessageId + "-" + Date.now(),
		        headerElement = document.createElement("h4"),
		        textElement = document.createTextNode("Sent: " + new Date());
		    headerElement.setAttribute("id", divId);
		    headerElement.appendChild(textElement);
		    sendHistory.appendChild(headerElement);
			pollForResult(divId);
		},
		pollForResult = function(divId) {
			setTimeout(function() {
				api.call("Get", {
					typeName: "TextMessage",
					search: {
						id: divId.split("-")[0]
					}
				}).then(function(result) {
					if (result[0].delivered) {
					    var element = document.getElementById(divId);
						element.innerHTML += ", Delivered: " + new Date(result[0].delivered);
					} else {
						pollForResult(divId);
					}
				}, errorHandler);
			}, 1000);
		},
		sendTextMessage = function() {
		    var stateSelect = document.getElementById("ioxoutput-state"),
				deviceId = vehicleSelect.options[vehicleSelect.selectedIndex].getAttribute("data-deviceid"),
				state = stateSelect.options[stateSelect.selectedIndex].text;
			api.call("Add", {
				typeName: "TextMessage",
				entity: {
					device: {
						id: deviceId
					},
					messageContent: {
						isRelayOn: state === "On",
						contentType: "IoxOutput"
					},
					isDirectionToVehicle: true
				}
			}).then(appendAndPoll, errorHandler);
		};
    return {
		initialize: function(geotabApi, pageState, initializeCallback) {
			api = geotabApi;
			vehicleSelect = document.getElementById("ioxoutput-vehicles");
			sendButton = document.getElementById("ioxoutput-send");
			sendHistory = document.getElementById("ioxoutput-history");
            vehicleSelect.addEventListener("change", function (event) {
            	sendButton.disabled = false;
            });
            document.getElementById("ioxoutput-send").addEventListener("click", sendTextMessage);
            initializeCallback();
	    },
		
		focus: function() {
	        api.call("Get", {
	            typeName: "Device"
	        }).then(function (result) {
	            if (result && result.length > 0) {
					result.sort(function (a, b) {
						a = a.name.toLowerCase();
						b = b.name.toLowerCase();
						if (a === b) {
							return 0;
						} else if (a > b) {
							return 1;
						} else {
							return -1;
						}
					});
	                var now = new Date();
					vehicleSelect.innerHTML = "";
	                for (var i = 0; i < result.length; i++) {
	                    if (new Date(result[i].activeTo) > now) {
	                        var option = new Option();
	                        option.text = result[i].name;
	                        option.setAttribute("data-deviceid", result[i].id);
	                        vehicleSelect.add(option);
	                    }
	                }

					sendButton.disabled = false;
	            }
	        }, errorHandler);
		},
		
		blur: function() {
		}
	};
};
