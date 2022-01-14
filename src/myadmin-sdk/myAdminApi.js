var myAdminApi = function () {
    var serverUrl = "https://myadminapi.geotab.com/v2/MyAdminApi.ashx";
    var call = function (method, params, callbackSuccess, callbackError) {
                var apiMethod = {
                    "id": -1,
                    "method": method,
                    "params": params
                };
                var request = new XMLHttpRequest();
                request.open("POST", serverUrl, true);
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        if (request.status === 200) {
                            var data,
                                    error,
                                    result;
                            try {
                                data = JSON.parse(request.responseText);
                                if (data && data.error) {
                                    error = data.error;
                                    handleError(error, callbackError);
                                }
                                else {
                                    result = data.result;
                                    callbackSuccess(result);
                                }
                            }
                            catch (e) {
                                handleError(e, callbackError);
                            }
                        } else {
                            handleError(request, callbackError);
                        }
                    }
                };
                request.send("JSON-RPC=" + encodeURIComponent(JSON.stringify(apiMethod)));
            },
            handleError = function (error, errorCallback) {
                var errorString;
                if (error && error.name && error.message) {
                    errorString = error.name + ": " + error.message;
                }
                else if (error.target || (error instanceof XMLHttpRequest && error.status === 0)) {
                    errorString = "Network Error: Couldn't connect to the server. Please check your network connection and try again.";
                }
                if (errorCallback) {
                    errorCallback(errorString || error, error);
                }
            };

    return {
        call: call
    }
};