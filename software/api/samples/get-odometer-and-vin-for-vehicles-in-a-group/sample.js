var group = {
        id: "GroupCompanyId" // Populated with the desired group id.
    },
    results = [];

api.call("Get", {
    typeName : "Device",
    search : {
        "groups" : [group]
    },
    resultsLimit: 10
}, function (devices) {
    var now = new Date().toISOString(),
        calls = [],
        diagnostic = {
            id: "DiagnosticOdometerAdjustmentId"
        };

    devices.forEach(function (device) {
        results.push({
            name : device.name,
            vehicleIdentificationNumber : device.vehicleIdentificationNumber
        });
        calls.push({
            method : "Get",
            params : {
                typeName : "StatusData",
                search : {
                    fromDate : now,
                    toDate : now,
                    diagnosticSearch : diagnostic,
                    deviceSearch : device
                }
            }
        });
    });
    api.call("ExecuteMultiCall", {
        calls : calls
    }, function (callResults) {
        var statusData, i;
        for (i = 0; i < callResults.length; i++) {
            statusData = callResults[i][0];
            if (statusData) {
                results[i].odometer = statusData.data;
            }
        }
        console.log(results);
    });
});
/*opt nomin*/