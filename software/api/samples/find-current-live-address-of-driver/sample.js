var fromName = function (driverId) {
        api.call("Get", {
            typeName : "DeviceStatusInfo",
            search : {
                userSearch : {
                    id : driverId
                }
            }
        }, function (result) {
            // Returns a list, get the first item
            result = result[0];
            if (result) {
                getAddress(result.latitude, result.longitude);
            } else {
                console.log("Location is not found");
            }
        }, console.error);
    },
    getIdFromName = function (driverName) {
        api.call("Get", {
            typeName : "User",
            search : {
                name : "%" + driverName + "%"
            }
        }, function (result) {
            // Returns a list, get the first item
            result = result[0];
            if (result) {
                console.log("Driver: " + result.name);
                fromName(result.id);
            } else {
                console.log("Driver not found!");
            }
        }, console.error);
    },

    getAddress = function (latitude, longitude) {
        api.call("GetAddresses", {
            coordinates : [{
                x : longitude,
                y : latitude
            }
            ]
        }, function (result) {
            // Returns a list, get the first item
            result = result[0];
            console.log("Location: ", result.formattedAddress);
        }, console.error);
    },
    driverNameInput = document.getElementById("driverName"),
    findButton = document.getElementById("find");

findButton.addEventListener("click", function() {
    getIdFromName(driverNameInput.value);
}, false);
/*opt nomin*/