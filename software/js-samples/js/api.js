/**
 *  @version 2014-07-21
 *  @description The Geotab JS API library.
 *  Used to login and make any API calls to a Geotab server.
 *
 *  Automatically prompts the user to login if the password is changed or if the
 *  database is moved to another server.
 *
 *  If credentials are required (for example, the first time you've visited the page, the
 *  database has moved or the user's password has changed, etc.), the "getCredentialsCallback" is executed
 *  with a callback function that can be used on your end to pass credentials into the system. When
 *  you call this function, any pending calls will also be completed automatically.

 *  @example
 *  var api = GeotabApi(function(authenticateCallback) {
 *      // We need credentials; we either never had them, or lost them (the server was moved, password
 *      // changed, etc.)
 *
 *      someLoginDialog.style.display = "block"; // Show a login dialog
 *      someLoginButton.addEventListener("click", function () {
 *          // Call to authenticate
 *          authenticateCallback(serverField.value, databaseField.value, emailField.value, passwordField.value, function(errorString) {
 *              alert(errorString);
 *          });
 *      });
 *  })
 *  @function
 *  @param {Function} getCredentialsCallback This function is called when this class can't login or is
 *                                      fetching credentials for the first time
 *  @param {Object} [newOptions] Can be used to override default values in the "options" variable
 *  @param {Object} [customCredentialStore] Override the default localStorage-based credential storage
 with a custom storage implementation
 */
var GeotabApi = function (getCredentialsCallback, newOptions, customCredentialStore) {
    "use strict";
    var
        JSONP_REQUESTS_PROPERTY_STR = "geotabJSONP",
        credentials,
        server,
        pendingCalls = [],
        options = {
            // Use localStorage to store credentials automatically
            rememberMe: true,
            // Show debugging information (in Chrome dev tools, Firebug, etc.)
            debug: false,
            // Use JSONP for all calls (for using the API without running a server)
            jsonp: false,
            // How long to wait for a response from the server (in seconds); 0 (or null) means no timeout.
            timeout: 0
        },
        credentialsStore,
        /**
         *  Logs some debug information to the browser console, if options.debug is true
         *  @private
         */
        debugLog = function () {
            if (options.debug) {
                var logs = [new Date()];
                logs.push.apply(logs, arguments);
                console.log.apply(console, logs);
            }
        },
        /**
         *  Normalizes and handles errors
         *  @private
         *  @param {Object} [error] The error object
         *  @callback {failureCallback} [errorCallback] The function to call once the error has been normalize.
         *                                                  It passes back a string for a known error, and the raw error
         *                                                  object if some custom handling is required.
         */
        handleError = function (error, errorCallback) {
            var errorString;
            if (error && error.name && error.message) {
                errorString = error.name + ": " + error.message;
            }
            else if (error.target || (error instanceof XMLHttpRequest && error.status === 0)) {
                errorString = "Network Error: Couldn't connect to the server. Please check your network connection and try again.";
            }
            if (options.debug) {
                console.error(errorString, error);
            }
            if (errorCallback) {
                errorCallback(errorString || "Error", error);
            }
        },
        /**
         * Gets the method call URL
         * @private
         * @param {String} [method] The method to call on the server
         * @return {String} The method call URL string
         */
        getCallUrl = function (method) {
            var thisServer = server.replace(/\S*:\/\//, "").replace(/\/$/, "");
            return "https://" + thisServer + "/apiv1" + (method ? "/" + method : "");
        },
        /**
         *  Cleans up the call with the given unique ID
         *  @private
         *  @param {String} uid The unique ID of the response callback
         */
        cleanupCall = function (uid) {
            // Remove this function once we're done with it
            var script = document.getElementById(uid);
            if (script) {
                script.parentNode.removeChild(script);
                // Manually garbage-collect the script
                for (var prop in script) {
                    if (script.hasOwnProperty(prop)) {
                        delete script[prop];
                    }
                }
            }
            delete window[JSONP_REQUESTS_PROPERTY_STR][uid];
        },
        /**
         *  Construct a JSONP request for a Geotab API call
         *  @private
         *  @param {String} method The name of the API method
         *  @param {Object} params The method parameters
         *  @param {successCallback} callbackSuccess The function that is called if the method call was successful
         *  @param {failureCallback} [callbackError] The function that is called if the method call failed
         *  @return {Object} An object with operations for the call. Supported operation(s): abort()
         */
        callJSONP = function (method, params, callbackSuccess, callbackError) {
            var uid = "json" + (Math.random() * 100).toString().replace(/\./g, ""),
                buildParamString = function () {
                    params = params || {};
                    var query = [];
                    for (var key in params) {
                        if (params.hasOwnProperty(key)) {
                            query.push.apply(query, ["&", encodeURIComponent(key), "=", encodeURIComponent(JSON.stringify(params[key]))]);
                        }
                    }
                    return query.join("");
                },
                timeoutTimer;

            window[JSONP_REQUESTS_PROPERTY_STR][uid] = function JSONPResponse(data) {
                // Clear timeout timer first
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                    timeoutTimer = null;
                }

                // Try to handle the response from the server
                try {
                    if (data && data.error) {
                        debugLog(method, "ERROR", data.error);
                        handleError(data.error, callbackError);
                    }
                    else {
                        var result = data.result;
                        debugLog(method, "SUCCESS", { result: result });
                        if (callbackSuccess) {
                            callbackSuccess(result);
                        }
                    }
                }
                finally {
                    cleanupCall(uid);
                }
            };
            document.getElementsByTagName("body")[0].appendChild((function () {
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.id = uid;
                s.async = "async";
                s.src = getCallUrl(method) + "?JSONP=" + JSONP_REQUESTS_PROPERTY_STR + "." + uid + buildParamString();
                s.onerror = function JSONPError(error) {
                    try {
                        debugLog("CallJSONP", method, "ERROR", error);
                        handleError(error, callbackError);
                    }
                    finally {
                        cleanupCall(uid);
                    }
                };
                return s;
            })());

            if (timeoutTimer) {
                clearTimeout(timeoutTimer);
            }
            if (options.timeout && method !== "Authenticate") {
                timeoutTimer = setTimeout(function () {
                    if (window[JSONP_REQUESTS_PROPERTY_STR].hasOwnProperty(uid)) {
                        window[JSONP_REQUESTS_PROPERTY_STR][uid]({
                            error: {
                                name: "JSONPTimeout",
                                message: "Could not complete the JSONP request in a timely manner (" + options.timeout + "s)",
                                target: document.getElementById(uid)
                            }
                        });
                        window[JSONP_REQUESTS_PROPERTY_STR][uid] = function () {
                            cleanupCall(uid);
                        };
                    }
                }, options.timeout * 1000);
            }
            return {
                abort: function () {
                    cleanupCall(uid);
                    if (errorCallback) {
                        errorCallback("Cancelled", {});
                    }
                }
            }
        },
        /**
         *  Construct an XMLHttpRequest POST request for a Geotab API call
         *  @private
         *  @param {String} method The name of the API method
         *  @param {Object} params The method parameters
         *  @param {successCallback} callbackSuccess The function that is called if the method call was successful
         *  @param {failureCallback} [callbackError] The function that is called if the method call failed
         *  @return {Object} An object with operations for the call. Supported operation(s): abort()
         */
        callXHR = function (method, params, callbackSuccess, callbackError) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", getCallUrl(), true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.addEventListener("abort", function (e) {
                if (callbackError) {
                    callbackError("Cancelled", e);
                }
            });
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data,
                            error,
                            result;
                        try {
                            data = JSON.parse(xhr.responseText);
                            if (data && data.error) {
                                error = data.error;
                                debugLog(method, "ERROR", error);
                                handleError(error, callbackError);
                            }
                            else {
                                result = data.result;
                                debugLog(method, "SUCCESS", { result: result });
                                callbackSuccess(result);
                            }
                        }
                        catch (e) {
                            handleError(e, callbackError);
                        }
                    } else {
                        debugLog(method, "ERROR", xhr);
                        handleError(xhr, callbackError);
                    }
                }
            };
            var rpcString;
            try {
                rpcString = JSON.stringify({
                    method: method || "",
                    params: params
                });
            }
            catch (e) {
                handleError(e, callbackError);
                return;
            }
            if (options.timeout) {
                xhr.timeout = options.timeout * 1000;
            }
            xhr.send("JSON-RPC=" + encodeURIComponent(rpcString));
            return {
                abort: function () {
                    xhr.abort();
                }
            }
        },
        /**
         *  Construct a request for a Geotab API call
         *  @private
         *  @param {String} method The name of the API method
         *  @param {Object} params The method parameters
         *  @param {successCallback} callbackSuccess The function that is called if the method call was successful
         *  @param {failureCallback} [callbackError] The function that is called if the method call failed
         *  @return {Object} An object with operations for the call. Supported operation(s): abort()
         */
        callBase = function (method, params, callbackSuccess, callbackError) {
            if (options.jsonp) {
                return callJSONP(method, params, callbackSuccess, callbackError);
            }
            return callXHR(method, params, callbackSuccess, callbackError);
        },
        /**
         *  Authenticates a Geotab user
         *  @private
         *  @param {String} newServer The federation server name string
         *  @param {String} database The database name
         *  @param {String} username The user name/email to authenticate with
         *  @param {String} password The password to authenticate with
         *  @param {successCallback} callbackSuccess The function that is called on the successful authentication
         *  @param {failureCallback} [callbackError] The function that is called when there is an
         *                                            authentication failure with the error string and the
         *                                            error objects as parameters
         *  @return {Object} An object with operations for the call. Supported operation(s): abort()
         */
        authenticateWithServer = function (newServer, database, username, password, callbackSuccess, callbackError) {
            server = newServer;
            // Authenticate the user
            return callBase("Authenticate", {
                database: database,
                userName: username,
                password: password
            }, function (data) {
                if (data.path && data.path !== "ThisServer") {
                    server = "https://" + data.path + "/";
                }
                credentials = data.credentials;
                if (options.rememberMe) {
                    credentialsStore.set(credentials, server);
                }
                if (callbackSuccess) {
                    callbackSuccess();
                }
            }, callbackError);
        },
        /**
         *  Populates the authenticate callback with a function
         *  @private
         *  @param {successCallback} [callbackSuccess] Called when we have successfully authenticated
         */
        populateAuthenticationCallback = function (callbackSuccess) {
            getCredentialsCallback(function (newServer, database, username, password, error) {
                return authenticateWithServer(newServer, database, username, password, function () {
                    if (callbackSuccess) {
                        callbackSuccess();
                    }
                    // Try again
                    pendingCalls.forEach(function (p) {
                        call.apply(this, p);
                    });
                    pendingCalls = [];
                }, error);
            });
        },
        /**
         *  Calls a Geotab method. Handles cases where the credentials have expired or are invalid.
         *  @public
         *  @param {String} method The name of the API method
         *  @param {Object} params The method parameters object.
         *  @param {successCallback} callbackSuccess The function that is called if the method call was successful
         *  @param {failureCallback} [callbackError] The function that is called if the method call failed
         *  @return {Object} An object with operations for the call. Supported operation(s): abort()
         */
        call = function (method, params, callbackSuccess, callbackError) {
            var
                needsLoginAndCall = function () {
                    pendingCalls.push([method, params, callbackSuccess, callbackError]);
                    var storedCredentials = credentialsStore.get();
                    if (storedCredentials && options.rememberMe) {
                        credentials = storedCredentials.credentials;
                        server = storedCredentials.server;
                        // Try again
                        pendingCalls.forEach(function (p) {
                            call.apply(this, p);
                        });
                        pendingCalls = [];
                    }
                    else {
                        populateAuthenticationCallback();
                    }
                };
            if (!credentials) {
                needsLoginAndCall();
                return { abort: function () {} };
            }
            params.credentials = credentials;
            return callBase(method, params, callbackSuccess, function (errorString, errorObject) {
                var errors = errorObject.errors;
                if (errors && errors[0] && errors[0].name === "InvalidUserException" && method !== "Authenticate") {
                    // We do have a credentials token, but it's no longer valid
                    // Let's clear it
                    credentialsStore.clear();
                    needsLoginAndCall();
                }
                else {
                    if (callbackError) {
                        callbackError(errorString, errorObject);
                    }
                }
            });
        },
        /**
         *  Calls multiple Geotab methods at the same time. Returns an array of results corresponding to the order the calls are passed in
         *  @public
         *  @param {Array} calls The calls array. For each entity in this array, we expect a 1 or 2 item array: the first
         *                                               item is the method name, and (optionally) the second is an object of the method parameters
         *                                               eg. [
         *                                                      ["GetVersion"],
         *                                                      ["Get", { typeName: "Device", search: { serialNumber: "GTA1234556678" } }],
         *                                                      ["Add", { typeName: "Device", entity: { name: "New Device", serialNumber: "GTA0000000000" }]
         *                                                   ]
         *  @param {successCallback} callbackSuccess The function that is called if the method calls were all successful
         *  @param {failureCallback} [callbackError] The function that is called if any method call failed
         *  @return {Object} An object with operations for the call. Supported operation(s): abort()
         */
        multiCall = function (calls, callbackSuccess, callbackError) {
            var formattedCalls = calls.map(function (call) {
                var params = call[1];
                return {
                    method: call[0],
                    params: params
                };
            });
            return call("ExecuteMultiCall", {
                calls: formattedCalls
            }, callbackSuccess, callbackError);
        },
        /**
         *  Retrieves a session. Useful for single sign-on or other cases where you require the credentials
         *  @param {successCallback} callbackSuccess The function that is called if the retrieval of sessionId was successful
         *  @param {Boolean} [newSession] If true, always retrieve a new session from the server. Otherwise, return the current session (if active) or
         *                              retrieve a new one from the server if there are no active sessions
         */
        getSession = function (callbackSuccess, newSession) {
            var storedCredentials = credentialsStore.get();
            if (!newSession && storedCredentials && options.rememberMe) {
                if (callbackSuccess) {
                    callbackSuccess(storedCredentials.credentials, storedCredentials.server);
                }
                return;
            }
            populateAuthenticationCallback(function () {
                if (callbackSuccess) {
                    // At this point, "credentials" and "server" have been set within populateAuthenticationCallback()
                    callbackSuccess(credentials, server);
                }
            });
        },
        /**
         *  Clears credentials and the credential store.
         *  @public
         */
        forget = function () {
            credentials = null;
            credentialsStore.clear();
            populateAuthenticationCallback();
        };

    // Overrides default options with passed in ones, if there are any
    if (newOptions) {
        for (var prop in newOptions) {
            if (newOptions.hasOwnProperty(prop)) {
                options[prop] = newOptions[prop];
            }
        }
    }

    // Creates a property for managing open requests
    window[JSONP_REQUESTS_PROPERTY_STR] = {};

    /**
     *  The default credentials store. Uses localStorage to save and retrieve
     *  credentials to save a user's session.
     */
    var defaultCredentialsStore = {
        CREDENTIALS_KEY: "geotabAPI_credentials",
        SERVER_KEY: "geotabAPI_server",
        /**
         *  Gets the credentials from localStorage
         *  @returns {*} An object with two properties: "server", a server name
         *                      string, and "credentials", a credentials object
         */
        get: function () {
            var storedCredentials = localStorage.getItem(this.CREDENTIALS_KEY),
                storedServer = localStorage.getItem(this.SERVER_KEY),
                thisCredentials = false;
            if (storedCredentials && storedServer) {
                try {
                    thisCredentials = {
                        credentials: JSON.parse(storedCredentials),
                        server: storedServer
                    };
                }
                catch (e) {
                    // Malformed JSON
                    return false;
                }
            }
            return thisCredentials;
        },
        /**
         *  Saves the credentials into localStorage
         *  @param {Object} credentials The credentials object
         *  @param {String} server The server string
         */
        set: function (credentials, server) {
            localStorage.setItem(this.CREDENTIALS_KEY, JSON.stringify(credentials));
            localStorage.setItem(this.SERVER_KEY, server);
        },
        /**
         *  Clears the credentials from localStorage
         */
        clear: function () {
            localStorage.removeItem(this.CREDENTIALS_KEY);
            localStorage.removeItem(this.SERVER_KEY);
        }
    };

    // If applicable, overrides default credentials storage implementation with a
    // custom one that was passed into the constructor
    credentialsStore = customCredentialStore || defaultCredentialsStore;

    // Public methods
    return {
        call: call,
        multiCall: multiCall,
        forget: forget,
        getSession: getSession
    };
};

if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function () {
        'use strict';
        return GeotabApi;
    });
}

// JSDoc Addenda
/**
 * This callback is called when a web request is successful
 * @callback successCallback
 * @param {*} [response] The response array or object
 */
/**
 * This callback is called when a web request is successful
 * @callback failureCallback
 * @param {String} errorString The human-readable error string
 * @param {Object} errorObject The error object (could be a JS Error object, JS Event object, XMLHttpRequest object, or MyGeotab error object)
 */