var getSpeedRecords = function (deviceId) {
        var startDate = new Date(),
            endDate = new Date();

        startDate.setDate(endDate.getDate() - 1);
        api.call("Get", {
            typeName : "LogRecord",
            resultsLimit : 1000,
            search : {
                deviceSearch : {
                    id : deviceId
                },
                fromDate : startDate,
                toDate : endDate
            }
        }, function (logs) {
            console.log("Device speeds: ", logs);
            api.call("GetRoadMaxSpeeds", {
                deviceSearch : {
                    id : deviceId
                },
                fromDate : startDate,
                toDate : endDate
            }, function (roadSpeeds) {
                //This is where you can use logs and road speed lists
                console.log("Road speeds: ", roadSpeeds);
            }, console.error);
        }, console.error);
    },
    deviceNameInput = document.getElementById("deviceName"),
    getButton = document.getElementById("get");

getButton.addEventListener("click", function() {
    api.call("Get", {
        typeName : "Device",
        resultsLimit : 1,
        search : {
            name: "%" + deviceNameInput.value + "%"
        }
    }, function (devices) {
        if (devices[0]) {
            getSpeedRecords(devices[0].id);
        } else {
            console.log("Vehicle is not found!");
        }
    }, console.error);
}, false);
/*opt nomin*/