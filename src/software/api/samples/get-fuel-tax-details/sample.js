var deviceId = "b1";

// Set the beginning of the time interval.
// It will be extended to the nearest hour.
// For example, 4:20:00 will become 4:00:00.
var fromDate = "2018-05-01T00:00:00Z";

// Set the end of the time interval.
// It will be extended to the nearest hour.
// For example, 3:45:00 will become 4:00:00.
var toDate = "2018-06-01T00:00:00Z";

// Omit deviceSearch for fleet-wide report.
// Not recommended for fleets larger than a few dozen vehicles.
// includeBoundaries = false will truncate the boundary details to the time interval.
// includeHourlyData = true will return the detail parameters, such as odometer,
// latitude, longitude, at every hour within the detail interval. This option will
// significantly increase the size of the API call result.
api.call("Get", {
    "typeName": "FuelTaxDetail",
    search: {
        deviceSearch: {
          id: deviceId  
        },
        fromDate: fromDate,
        toDate: toDate,
        includeBoundaries: false,
        includeHourlyData: false
    }
}, function(details) {
    console.log(details);
}, function(e) {
    console.error("Error:", e);
});
/*opt nomin*/