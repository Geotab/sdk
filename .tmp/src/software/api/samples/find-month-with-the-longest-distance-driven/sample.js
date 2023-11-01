var distanceByMonth,
    longestDistanceCalculator = function (deviceId){
        var endDate = new Date(),
            startDate = new Date(),
            i;

        distanceByMonth = {};

        // 1 January
        startDate.setHours(0, 0, 0, 0);
        startDate.setDate(1);
        startDate.setMonth(0);
        // 1 February
        endDate.setHours(0, 0, 0, 0);
        endDate.setDate(1);
        endDate.setMonth(startDate.getMonth() + 1);

        for (i = 0; i < 12; i++) {
            getTrips(new Date(startDate.valueOf()), new Date(endDate.valueOf()), (startDate.getMonth()+1), deviceId);
            // add month
            startDate.setMonth(startDate.getMonth() + 1);
            endDate.setMonth(startDate.getMonth() + 1);
        }
    },
    getTrips = function (startDate, endDate, month, deviceId) {
        api.call("Get", {
            typeName: "Trip",
            search: {
                deviceSearch: { id: deviceId },
                fromDate: startDate,
                toDate: endDate
            }
        }, function (results) {
            var totalDistance = 0,
                i;

            for (i = 0; i < results.length; i++){
                totalDistance += results[i].distance;
            }

            distanceByMonth[month] = totalDistance;

            if (Object.keys(distanceByMonth).length === 12) {
                console.log(distanceByMonth);
                // resultsArray contains each month with it total distance travelled
            }
        }, console.error);
    },
    deviceNameInput = document.getElementById("deviceName"),
    findButton = document.getElementById("find");

findButton.addEventListener("click", function() {
    api.call("Get", {
        typeName: "Device",
        search: {
            name: "%" + deviceNameInput.value + "%"
        },
        resultsLimit: 1
    }, function(devices) {
        if (devices[0]) {
            longestDistanceCalculator(devices[0].id);
        } else {
            console.log("Device not found!");
        }
    }, console.error);
}, false);
/*opt nomin*/