var setDevice = function (device, group) {
        device.groups = [{
            id : group.id
        }];
        device.isSpeedIndicator = true;
        device.speedingOn = 120;
        device.speedingOff = 110;

        api.call("Set", {
            typeName : "Device",
            entity : device
        }, function () {
            console.log("Device \"" + device.name + "\" is moved to group \"" + group.name + "\"");
        }, console.error);
    },
    deviceNameInput = document.getElementById("deviceName"),
    groupNameInput = document.getElementById("groupName"),
    moveButton = document.getElementById("move");

moveButton.addEventListener("click", function() {
    api.multiCall([["Get", {
        typeName: "Device",
        search: {
            name: "%" + deviceNameInput.value + "%"
        }
    }], ["Get", {
        typeName: "Group",
        search: {
            name: "%" + groupNameInput.value + "%"
        }
    }]], function(results) {
        var device = results[0] && results[0][0] ? results[0][0] : null,
            group = results[1] && results[1][0] ? results[1][0] : null;

        if (device) {
            if (group) {
                setDevice(device, group);
            } else {
                console.log("Group is not found!");
            }
        } else {
            console.log("Device is not found!");
        }
    }, console.error);
}, false);
/*opt nomin*/