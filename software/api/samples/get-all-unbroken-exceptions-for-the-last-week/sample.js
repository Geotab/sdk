var getRules = function () {
        api.call("Get", {
            typeName: "Rule"
        }, function (results) {
            getExceptions(results);
        }, console.error);
    },
    getExceptions = function (rules) {
        var endDate = new Date(),
            startDate = new Date();

        startDate.setDate(startDate.getDate() - 7);

        api.call("Get", {
            typeName: "ExceptionEvent",
            fromDate: startDate,
            toDate: endDate
        }, function (exceptionEvents) {
            var brokenRulesHash = {}, i;

            for (i = 0; i < exceptionEvents.length; i++) {
                brokenRulesHash[exceptionEvents[i].rule.id] = true;
            }
            for (i = 0; i < rules.length; i++) {
                if (!brokenRulesHash[rules[i].id]) {
                    console.log("Rule \"" + rules[i].name + "\" did not occur in the last week");
                }
            }
        }, function (errorString) {
            console.log("AddTest", errorString, false);
        });
    };

getRules();
/*opt nomin*/