var getAllException = function(ruleId) {
        api.call("Get", {
            typeName: "ExceptionEvent",
            ruleSearch: {
                id: ruleId
            },
            resultsLimit: 1000
        }, function(results){
            console.log(results.length);
        }, console.error);
    },
    zoneNameInput = document.getElementById("zoneName"),
    getButton = document.getElementById("get");

getButton.addEventListener("click", function() {
    api.multiCall([["Get", {
        typeName: "Zone",
        search: {
            name: "%" + zoneNameInput.value + "%"
        },
        resultsLimit: 1
    }], ["Get", {
        typeName: "Rule",
        search: {
            includeZoneStopRules: true,
            baseType: "ZoneStop"
        },
        resultsLimit: 100
    }]], function(results) {
        var zone = results[0] && results[0][0] ? results[0][0] : null,
            rule = zone && results[1] ? results[1].filter(function(rule) {
                return rule.condition && rule.condition.zone && rule.condition.zone.id === zone.id;
            })[0] : null;

        if (rule) {
            getAllException(rule.id);
        } else {
            console.log("Zone not found");
        }
    }, console.error);
}, false);
/*opt nomin*/