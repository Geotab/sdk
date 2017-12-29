var showDevice = function(deviceId) {
        api.call("Get", {
            typeName: "DeviceStatusInfo",
            search: {
                deviceSearch: { id: deviceId }
            }
        }, function(statuses) {
            if (statuses[0]) {
                var status = statuses[0],
                    coords = status.latitude + "," + status.longitude,
                    locationUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" + coords + "&zoom=15&scale=false&size=300x300&maptype=roadmap&format=png&visual_refresh=true&markers=color:red%7C" + coords;

                document.getElementById("deviceLocation").setAttribute("src", locationUrl);
            } else {
                console.log("Device location can't be found!");
            }

        });
    },
    deviceNameInput = document.getElementById("deviceName"),
    findButton = document.getElementById("find");

findButton.addEventListener("click", function() {
    api.call("Get", {
        "typeName": "Device",
        search: {
            name: "%" + deviceNameInput.value + "%"
        }
    }, function(devices) {
        if (devices[0]) {
            showDevice(devices[0].id);
        } else {
            console.log("Device not found!");
        }
    });
}, false);
/*opt nomin*/