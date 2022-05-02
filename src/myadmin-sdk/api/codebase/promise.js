geotab.require([], function(){
    "use strict";
    geotab.declare("geotab");

    if (window.Promise && !geotab.isPromiseTest) {
        geotab.promise = function(fn) {
            return new Promise(fn);
        };
        geotab.promise.all = function(promises) {
            return Promise.all(promises);
        };
        geotab.promise.race = function(promises) {
            return Promise.race(promises);
        };
        geotab.promise.resolve = function(value) {
            return Promise.resolve(value);
        };
        geotab.promise.reject = function(reason) {
            return Promise.reject(reason);
        };
    } else {
        // ES6 Promise polyfill
        geotab.promise = function (fn) {
            var PENDING = "pending",
                FULFULLED = "fulfilled",
                REJECTED = "rejected",
                state = PENDING,
                value,
                deferred = [],

                getFinalizer = function (methodState) {
                    return function (newValue) {
                        var i;
                        if (state === PENDING) {
                            value = newValue;
                            state = methodState;

                            if (deferred) {
                                for (i = 0; i < deferred.length; i++) {
                                    handle(deferred[i]);
                                }
                            }
                        }
                    };
                },
                resolve = getFinalizer(FULFULLED),
                reject = getFinalizer(REJECTED),

                isPromise = function (candidate) {
                    return candidate && typeof(candidate.then) === "function";
                },
                handle = function (handler) {
                    if (state === PENDING) {
                        deferred.push(handler);
                    } else {
                        var handlerCallback,
                            returnValue,
                            isFulfilled = state === FULFULLED,
                            callRejected = false;

                        if (isFulfilled) {
                            handlerCallback = handler.onResolved;
                        } else {
                            handlerCallback = handler.onRejected;
                            callRejected = !handlerCallback;
                        }

                        try {
                            returnValue = handlerCallback ? handlerCallback(value) : value;
                        } catch (e) {
                            returnValue = e;
                            callRejected = true;
                        }
                        if (isPromise(returnValue)) {
                            returnValue.then(function (promiseValue) {
                                handler.resolve(promiseValue);
                                return promiseValue;
                            }, function (promiseError) {
                                handler.reject(promiseError);
                                return promiseError;
                            });
                        } else {
                            if (callRejected) {
                                handler.reject(returnValue);
                            } else {
                                handler.resolve(returnValue);
                            }
                        }
                    }
                },
                thenHandler = function (onResolved, onRejected) {
                    return geotab.promise(function (resolve, reject) {
                        window.setTimeout(function () {
                            handle({
                                onResolved: onResolved || null,
                                onRejected: onRejected || null,
                                resolve: resolve,
                                reject: reject
                            });
                        }, 1);
                    });
                },
                catchHandler = function (onRejected) {
                    return thenHandler(null, onRejected);
                };

            if (typeof fn === "function"){
                try {
                    fn(resolve, reject);
                } catch (e) {
                    reject(e);
                }
            } else {
                throw new TypeError("Promise resolver " + fn + " is not a function");
            }

            return {
                "catch": catchHandler,
                then: thenHandler
            };
        };

        geotab.promise.all = function(iterable) {
            return geotab.promise(function(resolve, reject) {
                var completeCount = 0,
                    results = [],
                    hasErrors = false,
                    promisesCount = iterable.length;

                iterable.forEach(function(p, index) {
                    results[index] = undefined;
                    p.then(function(value) {
                        if (!hasErrors) {
                            completeCount++;
                            results[index] = value;
                            if (completeCount === promisesCount) {
                                resolve(results);
                            }
                        }
                    }, function(error) {
                        completeCount++;
                        reject(error);
                        hasErrors = true;
                    });
                });
            });
        };
        geotab.promise.race = function(iterable) {
            return geotab.promise(function(resolve, reject) {
                iterable.forEach(function(p) {
                    p.then(function(value) {
                        resolve(value);
                    }, function(error) {
                        reject(error);
                    });
                });
            });
        };

        geotab.promise.resolve = function(value) {
            return geotab.promise(function(resolve) {
                resolve(value);
            });
        };
        geotab.promise.reject = function(reason) {
            return geotab.promise(function(resolve, reject) {
                reject(reason);
            });
        };
    }

    //prevent further modifications
    Object.freeze(geotab.promise);
});