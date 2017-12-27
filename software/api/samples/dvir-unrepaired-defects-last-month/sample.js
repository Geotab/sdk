var now = new Date(),
    monthAgo = new Date();

monthAgo.setMonth(monthAgo.getMonth() - 1);

// Perform an API call to get DVIR logs in the past month that have unrepaired defects
api.call("Get", {
    "typeName": "DVIRLog",
    "search": {
        "fromDate": monthAgo,
        "toDate": now,
        "trailerSearch": null
    },
    "resultsLimit": 50
}, function(result) {
    var defectedDvir = result.filter(function (dvir) {
        return (dvir.defects && dvir.defects.length > 0 && dvir.repairedBy === "NoUserId");
    });

    console.log("Done: ", defectedDvir);
}, function(e) {
    console.error("Failed:", e);
});
/*opt nomin*/