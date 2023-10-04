var filterLogRecords = function(deviceId, fromDate, toDate) {
        var calls = [
            ["Get", {
                typeName: "LogRecord",
                search: {
                    fromDate: fromDate,
                    toDate: toDate,
                    deviceSearch: {
                        id: deviceId
                    }
                }
            }
            ], ["Get", {
                typeName: "StatusData",
                search: {
                    fromDate: fromDate,
                    toDate: toDate,
                    deviceSearch: {
                        id: deviceId
                    },
                    diagnosticSearch: {
                        id: "DiagnosticPositionValidId"
                    }
                }
            }
            ]
        ];
        api.multiCall(calls, function (results) {
            var logs,
                validLogs,
                positionValidRecords,
                positionValidRecord,
                nextPositionValidRecord,
                getNextPositionValid = function (records) {
                    var record = records.shift();
                    if (record === undefined) {
                        record = {
                            data: 1,
                            dateTime: new Date(Date.UTC(2050, 0, 1))
                        };
                    }
                    record.dateTime = new Date(record.dateTime);
                    return record;
                };

            if (results) {
                logs = results[0] || [];
                positionValidRecords = results[1] || [];
                positionValidRecord = getNextPositionValid(positionValidRecords);
                nextPositionValidRecord = getNextPositionValid(positionValidRecords);
                validLogs = logs.filter(function (log) {
                    while (new Date(log.dateTime) > nextPositionValidRecord.dateTime && positionValidRecords.length) {
                        positionValidRecord = nextPositionValidRecord;
                        nextPositionValidRecord = getNextPositionValid(positionValidRecords);
                    }
                    if (positionValidRecord.data) {
                        return log;
                    }
                });
                console.log("Found " + (logs.length - validLogs.length) + " logs with invalid position");
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
        var fromDate = new Date(),
            toDate = new Date();

        fromDate.setDate(fromDate.getDate() - 1);

        if (devices[0]) {
            filterLogRecords(devices[0].id, fromDate, toDate);
        } else {
            console.log("Device not found!");
        }
    }, console.error);
}, false);
/*opt nomin*/