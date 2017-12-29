var
    putAllDevicesIntoTenNewGroups = function (parentGroupId) {
        api.call("Get", {
            typeName: "Device",
            resultsLimit: 100
        }, function (results) {
            var groupDevices = [],
                newGroupsCount = 10,
                i, index;

            for (i = 0; i < results.length; i++) {
                index = i % newGroupsCount;
                if (!groupDevices[index]) {
                    groupDevices[index] = [];
                }
                groupDevices[index].push(results[i]);
            }

            for (i = 0; i < newGroupsCount; i++) {
                addGroup(parentGroupId, "testGroup " + i, groupDevices[i]);
            }
        }, console.error);
    },
    addGroup = function (parentId, groupName, devices) {
        api.call("Add", {
            typeName: "Group",
            entity: {
                name: groupName,
                parent: {id: parentId},
                color: {r: 255, g: 69, b: 0, a: 0}
            }
        }, function (newGroupId) {
            var i;
            for (i = 0; i < devices.length; i++){
                editDevice(devices[i].id, newGroupId);
            }
        }, console.error);
    },
    editDevice = function (deviceId, groupId) {
        api.call("Get", {
            typeName: "Device",
            search: { id: deviceId }
        }, function (result) {
            result[0].groups = [{ id: groupId }];
            setDeviceGroup(result[0]);
        }, console.error);
    },
    setDeviceGroup = function (entity) {
        api.call("Set", {
            typeName: "Device",
            entity: entity
        }, function () {
            console.log("added: " + entity.name + " to group: " + entity.groups[0].id);
        }, console.error);
    };

putAllDevicesIntoTenNewGroups("GroupCompanyId");
/*opt nomin*/