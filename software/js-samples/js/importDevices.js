document.addEventListener("DOMContentLoaded", async function () {
    let allGroupCache;
    let assetTypeCache;
    let nonAssetTypeCache;

    document.getElementById("importDevices").addEventListener("click", async (event) => {
        event.preventDefault();
        // Cache should be updated every time the button is clicked, to ensure that the latest data is retrieved.
        allGroupCache = await getGroup();
        assetTypeCache = getGroupDescendants("GroupAssetTypeId");
        nonAssetTypeCache = allGroupCache.filter(x => !assetTypeCache.some(y => y.id === x.id));
        await importDevices();
    });

    async function importDevices() {
        clearLogs();

        const data = document.getElementById("content").value;
        const createGroupIfNotExist = document.getElementById("createGroups").checked;
        
        if (!isDataValid(data)) {
            return;
        }
        
        const dataRows = data.split("\n");
        
        for (let i = 0; i < dataRows.length; i++) {
            try {
                addLogs(`Row ${i+1}:`);
                const row = dataRows[i];
                if (!isRowValid(row)) {
                    continue;
                }
                
                const deviceData = row.split(",");
                if (!isDeviceDataValid(deviceData)) {
                    continue;
                }
                const deviceSerialNumber = deviceData[0]?.trim();
                const deviceName = deviceData[1]?.trim();
                const deviceGroupName = deviceData[2]?.trim();
                const deviceAssetTypeName = deviceData[3]?.trim();
                const deviceVin = deviceData[4]?.trim();

                let groups = await handleNonAssetType(deviceGroupName, createGroupIfNotExist);
                let assetTypes = await handleAssetType(deviceAssetTypeName);

                groups = groups.concat(assetTypes);

                const device = {
                    serialNumber: deviceSerialNumber,
                    name: deviceName,
                    groups: groups,
                    vehicleIdentificationNumber: deviceVin,
                    comment: "Imported with SDK js samples: importDevices",
                };
                await addDevice(device);
                addLogs(`- New Device Added: ${deviceName}`);
            } catch (error) {
                addLogs(`- ${error}`);
                console.error(error);
            }
        }
        addLogs("Importing finished.");
    }

    function clearLogs() {
        const parentElement = document.getElementById("result");
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
    }

    function addLogs(text) {
        let log = document.createElement("p");
        log.innerText = text;
        document.getElementById("result").appendChild(log);
    }

    // Returns NonAssetType id. Adds a new group if createGroupIfNotExist (checkbox is checked). 
    async function handleNonAssetType(deviceGroupName, createGroupIfNotExist) {
        let groups = [];
        let groupObject = nonAssetTypeCache.find(x => x.name === deviceGroupName);
        if (!groupObject) {
            // If cannot find AssetType and createGroupIfNotExist is false, throw an error
            if (!isNonAssetTypeValid(deviceGroupName, createGroupIfNotExist)) {
                return;
            }
            groupObject = {
                name: deviceGroupName,
                comments: "Imported with SDK js samples: importDevices",
                parent: { id: "GroupCompanyId" }
            }
            groupObject.id = await AddGroup(groupObject);
            groups.push({ id: groupObject.id });
            allGroupCache.push(groupObject);
            nonAssetTypeCache.push(groupObject);
            addLogs(`- New Group Added: ${deviceGroupName}`);
            
        } else {
            groups.push({ id: groupObject.id });
        }
        return groups;
    }
    
    // Returns AssetType id. Default to 'Vehicle' if the given AssetType is not found
    function handleAssetType(deviceAssetTypeName) {
        const assetTypeObject = assetTypeCache.find(x => x.name === deviceAssetTypeName);
        if (deviceAssetTypeName && assetTypeObject) {
            return [{ id: assetTypeObject.id }];
        } else {
            if (!deviceAssetTypeName || deviceAssetTypeName === "") {
                addLogs(`- No Asset Type provided. Defaulting to "Vehicle" Asset Type.`);
            } else {
                addLogs(`- Cannot find Asset Type: "${deviceAssetTypeName}". Defaulting to "Vehicle" Asset Type.`);
            }
            return [{ id: "GroupVehicleId" }];
        };
    }

    function getGroup() {
        return new Promise((resolve, reject) => {
            api.call("Get", {
                typeName: "Group",
                propertySelector: {
                    fields: ["id", "name", "children"]
                }
            }, function (result) {
                resolve(result);
            }, function (error) {
                reject(`Error: Cannot get Group - ${error}`);
            });
        })
    }

    // Use a single call instead of a multi-call to avoid cascading failures, 
    // as a single failure in the multi-call could lead to other calls failing as well.
    function addDevice(entity) {
        return new Promise((resolve, reject) => {
            api.call("Add", {
                typeName: "Device",
                entity: entity
            }, function (result) {
                resolve(result);
            }, function (error) {
                reject(`Error: Cannot add device - ${error}`);
            });
        })
    }

    function AddGroup(entity) {
        return new Promise((resolve, reject) => {
            api.call("Add", {
                typeName: "Group",
                entity: entity
            }, function (result) {
                resolve(result);
            }, function (error) {
                reject(`Error: Cannot add group - ${error}`);
            });
        })
    }


    function isDataValid(data) {
        if (data?.trim() === "") {
            addLogs("- Error: The provided input is empty or contains only whitespace characters. Expected: SerialNumber,Name,GroupName,AssetType(Optional),VIN(Optional)");
            console.error(`Error: The provided input is empty or contains only whitespace characters. Expected: SerialNumber,Name,GroupName,AssetType(Optional),VIN(Optional)`);
            addLogs("Importing finished.");
            return false;
        }
        return true;
    }

    function isRowValid(row) {
        if (row?.trim() === "") { // Trim whitespace before checking if row is empty
            throw new Error(`No device data. Expected: SerialNumber,Name,GroupName,AssetType(Optional),VIN(Optional)`);
        }
        return true;
    }

    function isDeviceDataValid(deviceData) {
        if (deviceData.length < 3) {
            throw new Error("Insufficient number of properties. Expected: SerialNumber,Name,GroupName,AssetType(Optional),VIN(Optional)");
        }
        if (deviceData.length > 5) {
            throw new Error("Too many properties. Expected: SerialNumber,Name,GroupName,AssetType(Optional),VIN(Optional)");
        }
        if (!deviceData[0] || deviceData[0].trim() === "") {
            throw new Error("Serial Number is required.");
        }
        if (!deviceData[1] || deviceData[1].trim() === "") {
            throw new Error("Device Name is required.");
        }
        if (!deviceData[2] || deviceData[2].trim() === "") {
            throw new Error("Group Name is required.");
        }
        if (deviceData[0].length > 255) {
            throw new Error("Serial Number exceeds 255 characters.");
        }
        if (deviceData[1].length > 255) {
            throw new Error("Device Name exceeds 255 characters.");
        }
        if (deviceData[2].length > 255) {
            throw new Error("Group Name exceeds 255 characters.");
        }
        // assetType is optional
        if (deviceData[3]?.length > 255) {
            throw new Error("Asset Type exceeds 255 characters.");
        }
        // vin is optional
        if (deviceData[4]?.length > 255) {
            throw new Error("VIN exceeds 255 characters.");
        }
        return true;
    }

    function isNonAssetTypeValid(deviceGroupName, createGroupIfNotExist) {
        if (assetTypeCache.find(x => x.name === deviceGroupName) ) { 
            throw new Error(`This is a Asset Type: ${deviceGroupName}`);
        }
        if (!createGroupIfNotExist) {
            throw new Error(`This Group Name does not exist: ${deviceGroupName}`);
        }
        return true;
    }

    // Recursive function to retrieve all descendants of a group.
    function getGroupDescendants(groupId) {
        let group = allGroupCache.find(x => x.id === groupId);
        if (group) {
            let list = [group];
            if (group.children.length > 0) {
                for (let i of group.children) {
                    let descendants = getGroupDescendants(i.id);
                    if (descendants !== null) {
                        list = list.concat(descendants);
                    }
                }
            }
            return list;
        }
        return null;
    }

    function isAssetType(group) {
        return assetTypeCache.some(x => x.id === group.id);
    }

    function isNonAssetType(group) {
        return nonAssetTypeCache.some(x => x.id === group.id);
    }
});