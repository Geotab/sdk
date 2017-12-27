var getStopInZoneExceptions = function (zoneName) {
        api.call("Get", {
            typeName : "Exceptions.Rule",
            search : {
                includeZoneStopRules : true,
                category : "ZoneStopExceptionRules",
                name : "%" + zoneName + "%"
            }
        }, function (zoneException) {
            var startDate = new Date(),
                endDate = new Date();

            if (zoneException && zoneException[0]) {
                startDate.setFullYear(endDate.getFullYear() - 1);
                api.call("Get", {
                    typeName: "ExceptionEvent",
                    search: {
                        fromDate: startDate,
                        toDate: endDate
                    }
                }, function (result) {
                    var results = [];
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].rule.id == zoneException[0].id) {
                            results.push(result[i]);
                        }
                    }
                    //Now you can use the results stored in 'results'
                    console.log(results);
                }, console.error);
            } else {
                console.error("Zone not found!");
            }
        }, console.error);
    },
    zoneNameInput = document.getElementById("zoneName"),
    getButton = document.getElementById("get");

getButton.addEventListener("click", function() {
    getStopInZoneExceptions(zoneNameInput.value);
}, false);
/*opt nomin*/