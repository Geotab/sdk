var calculateFuelUsage = function(deviceId, fromDate, toDate) {
        // Note: In this example distance is derived from odometer, distance can also be derived from the sum of trip distances. You should evaluate which makes sense for your application.
        api.multiCall([
            ["Get", {
                typeName : "StatusData",
                search : {
                    fromDate : fromDate,
                    toDate : toDate,
                    diagnosticSearch : {
                        id : "DiagnosticOdometerAdjustmentId"
                    },
                    deviceSearch : {
                        id : deviceId
                    }
                }
            }
            ],
            ["Get", {
                typeName : "StatusData",
                search : {
                    fromDate : fromDate,
                    toDate : toDate,
                    diagnosticSearch : {
                        id : "DiagnosticDeviceTotalFuelId"
                    },
                    deviceSearch : {
                        id : deviceId
                    }
                }
            }
            ]
        ], function (results) {
            var odometerData = results[0],
                fuelUsedData = results[1],
                distance,
                fuelUsed,
                efficiency;

            if (fuelUsedData.length === 0) {
                console.log("No fuel used found for device");
                return;
            }

            distance = odometerData[odometerData.length - 1].data - odometerData[0].data;
            fuelUsed = fuelUsedData[fuelUsedData.length - 1].data - fuelUsedData[0].data;

            if (distance === 0) {
                console.log("Device has not traveled in this time period");
                return;
            }

            efficiency = (fuelUsed / (distance / 1000)) * 100;
            console.log(efficiency + " L/100KM");

        }, console.error);
    },
    deviceNameInput = document.getElementById("deviceName"),
    calculateButton = document.getElementById("calculate");

calculateButton.addEventListener("click", function() {
    api.call("Get", {
        typeName: "Device",
        search: {
            name: "%" + deviceNameInput.value + "%"
        },
        resultsLimit: 1
    }, function(devices) {
        var fromDate = new Date(),
            toDate = new Date();

        fromDate.setDate(fromDate.getDate() - 1);

        if (devices[0]) {
            calculateFuelUsage(devices[0].id, fromDate, toDate);
        } else {
            console.log("Device not found!");
        }
    }, console.error);
}, false);
/*opt nomin*/