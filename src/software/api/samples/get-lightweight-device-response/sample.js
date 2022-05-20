api.call("Get", {
  "typeName": "Device",
  "propertySelector": 
  {
      fields:["Id", "ActiveTo"],
      isIncluded:true
  },
  "resultsLimit": 10
}, function(result) {
  console.log("Done: ", result);
}, function(e) {
  console.error("Failed:", e);
});
/*opt nomin*/