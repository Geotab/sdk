var GithubApi = function(userName, repoName) {
    var github = new Github({}),
        repo = github.getRepo(userName, repoName),

        getSamples = function(successCallback, errorCallback) {
            window.setTimeout(function() {
                var samples = document.querySelectorAll(".sample-sample");
                successCallback([].map.call(samples, function(sample) {
                    var sampleId = sample.id,
                        sampleName = sampleId;

                    sampleName = sampleName.replace(/\-/g, " ");
                    sampleName = sampleName[0].toUpperCase() + sampleName.substr(1);
                    return {
                        id: sampleId,
                        name: sampleName
                    };
                }));
            }, 500);
            /*repo.contents("master", ".", function(err, topFiles) {
                if (err) {
                    errorCallback(err);
                } else {
                    successCallback(topFiles.filter(function(file) {
                        return file.type === "dir";
                    }).map(function (file) {
                        return file.name;
                    }));
                }
            });*/
        },
        getSample = function(sampleName, successCallback, errorCallback) {
            window.setTimeout(function() {
                var sampleContainer = document.getElementById(sampleName),
                    options, temp;

                sampleContainer = sampleContainer || document.getElementById("device-location");
                options = sampleContainer.querySelector(".sample-options").innerHTML;
                try {
                    eval("temp = " + options);
                    options = temp;
                } catch (e) {
                    options = {};
                }
                successCallback({
                    js: sampleContainer.querySelector(".sample-js").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
                    css: sampleContainer.querySelector(".sample-css").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
                    html: sampleContainer.querySelector(".sample-html").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
                    options: options
                });
            }, 500);
        };

    return {
        getSamples: getSamples,
        getSample: getSample
    };
};


var SamplesApi = function() {
    var samples = [
            "new",
            "api-call",
            "device-location",
            "current-location-and-driving-status",
            "move-vehicle-to-group-and-enable-speed-buzzing",
            "get-odometer-and-vin-for-vehicles-in-a-group",
            "add-driver",
            "replace-existing-vehicle-with-new-go-device",
            "find-current-live-address-of-driver",
            "add-driver-with-nothing-clearance",
            "manipulate-user",
            "get-zone-stop-exceptions",
            "get-device-speeds-and-road-speeds",
            "get-count-of-stops-at-client-zone",
            "create-10-groups-and-add-devices",
            "dvir-unrepaired-defects-last-month",
            "hos-availability-search",
            "find-month-with-the-longest-distance-driven",
            "get-all-unbroken-exceptions-for-the-last-week",
            "filter-out-non-valid-position-log-records",
            "calculate-fuel-usage",
            "import-usa-states-as-zones",
            "get-fuel-tax-details",
            "generate-addin-guid",
            "get-lightweight-device-response"
        ],
        createXHR = ((typeof (window) !== 'undefined' && window.XMLHttpRequest) ?
                function () {
                    return new XMLHttpRequest();
                } :
                function () {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
        ),
        load = function (url, successCallback, errorCallback) {
            var xhr = createXHR(),
                isGet = true;

            xhr.open("get", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status === 200){
                        successCallback(xhr.responseText);
                    } else {
                        errorCallback(url, xhr);
                    }
                    xhr.onreadystatechange = null
                }
            };
            xhr.timeout = 30000;
            xhr.ontimeout = function () {
                errorCallback(url, xhr);
            };
            xhr.send(!isGet && params ? params : null);
            return xhr;
        },

        getSamples = function(successCallback, errorCallback) {

            window.setTimeout(function() {
                successCallback(samples.map(function(sampleId) {
                    var sampleName = sampleId;

                    sampleName = sampleName.replace(/\-/g, " ");
                    sampleName = sampleName[0].toUpperCase() + sampleName.substr(1);

                    return {
                        id: sampleId,
                        name: sampleName
                    };
                }));
            }, 1);
        },
        getSample = function(sampleName, successCallback, errorCallback) {
            var result = {},
                isAllLoaded = function() {
                    var options = ["js", "css", "html", "options"],
                        isOptionLoaded = function(option) {
                            return typeof(result[option]) !== "undefined";
                        };

                    if (options.every(isOptionLoaded)) {
                        successCallback(result);
                    }
                },
                getSuccessCallback = function(language) {
                    return function(content) {
                        if (language === "js") {
                            content = content.replace(/(\r?\n)?\/\*opt nomin\*\/\s*\n\s*self\.geotab \&\& geotab\.declare\(\".+\"\);\s*$/, "");
                        }
                        result[language] = content;
                        isAllLoaded();
                    };
                },
                isErrorHandlerCalled = false,
                errorHandler = function(url) {
                    if (!isErrorHandlerCalled) {
                        isErrorHandlerCalled = true;
                        errorCallback("Can't load sample file: " + url);
                        requests.forEach(function (xhr) {
                            xhr.abort && xhr.abort();
                        });
                        requests = [];
                    }
                },
                requests = [];

            requests.push(load("samples/" + sampleName + "/sample.js", getSuccessCallback("js"), errorHandler));
            requests.push(load("samples/" + sampleName + "/sample.css", getSuccessCallback("css"), errorHandler));
            requests.push(load("samples/" + sampleName + "/sample.html", getSuccessCallback("html"), errorHandler));
            requests.push(load("samples/" + sampleName + "/config.json", function(options) {
                try {
                    options = JSON.parse(options);
                } catch (e) {
                    options = {};
                }
                result.options = options;
                isAllLoaded();
            }, errorHandler));
        };

    return {
        getSamples: getSamples,
        getSample: getSample
    };
};
