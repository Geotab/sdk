api.call("Get", {
    "typeName": "Device",
    "resultsLimit": 10
}, function(result) {
    console.log("Done: ", result);
}, function(e) {
    console.error("Failed:", e);
});
/*opt nomin*/