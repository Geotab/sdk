var updateVehicleDevice = function (oldSerialNumber, newSerialNumber) {
        var device;

        api.call("Get", {
            typeName : "Device",
            search : {
                serialNumber : oldSerialNumber
            }
        }, function (foundDevices) {
            if (!(foundDevices && foundDevices.length)) {
                console.log("Device not found!");
                return;
            }

            device = foundDevices[0];
            device.serialNumber = newSerialNumber;
            delete device.deviceType;
            delete device.hardwareId;
            delete device.productId;
            device.parameterVersion++;

            api.call("Set", {
                typeName : "Device",
                entity : device
            }, function () {
                console.log("Go device was replaced. New serial number is: " + newSerialNumber);
            }, console.error);
        }, function () {});
    },
    oldSerialNumberInput = document.getElementById("oldSerialNumber"),
    newSerialNumberInput = document.getElementById("newSerialNumber"),
    replaceButton = document.getElementById("replace");

replaceButton.addEventListener("click", function() {
    updateVehicleDevice(oldSerialNumberInput.value, newSerialNumberInput.value);
}, false);
/*opt nomin*/