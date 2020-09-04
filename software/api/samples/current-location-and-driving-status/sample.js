var results = [];
api.call("Get", {
    typeName: "DeviceStatusInfo",
    resultsLimit: 10
}, function (statusInfos) {
    var coordinates = [];
    statusInfos.forEach(function (statusInfo) {
        coordinates.push({
            x: statusInfo.longitude,
            y: statusInfo.latitude
        });
    });
    api.call("GetAddresses", {
        coordinates: coordinates
    }, function (addressResults) {
        for (var i = 0; i < statusInfos.length; i++) {
            results.push({
                device: statusInfos[i].device,
                isDriving: statusInfos[i].isDriving,
                address: addressResults[i]
            });
        }
        console.log(results);
    });
});
/*opt nomin*/