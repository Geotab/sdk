var ConsoleManager = (function() {
    var consolePreviewer = function(data, container) {
            var renderObject = function(key, data, parent, isChildProperty, isInactive) {
                    var type = typeof(data);
                    if (type === "object") {
                        if (Array.isArray(data)) {
                            type = "array";
                        }
                    }
                    if (data === null) {
                        data = "null";
                        type = "string";
                    }
                    if (data === undefined) {
                        data = "undefined";
                        type = "string";
                    }
                    if (renderers[type]) {
                        renderers[type](key, data, parent, isChildProperty, isInactive);
                    }
                },
                createElement = function(tag, className, innerHTML) {
                    var element = document.createElement(tag);
                    element.className = className;
                    element.innerHTML = htmlEscape(innerHTML);
                    return element;
                },
                renderers = {
                    "string": function(key, data, parent, isChildProperty, isInactive) {
                        var marker = key ? createElement("span", "data-object-marker", "") : null,
                            keyClassName = isInactive ? "data-object-inactive-key" : "data-object-key",
                            keyElement = key ? createElement("span", keyClassName, key + ": ") : null,
                            valueClassName = key ? "data-object-string-value" : "data-string-value",
                            dataWithQuotes = isChildProperty ? "\"" + data + "\"" : data,
                            value = createElement("span", valueClassName, dataWithQuotes);

                        marker && parent.appendChild(marker);
                        keyElement && parent.appendChild(keyElement);
                        parent.appendChild(value);
                    },
                    "function": function(key, data, parent, isChildProperty, isInactive) {
                        var marker = key ? createElement("span", "data-object-marker", "") : null,
                            keyClassName = isInactive ? "data-object-inactive-key" : "data-object-key",
                            keyElement = key ? createElement("span", keyClassName, key + ": ") : null,
                            valueClassName = "data-function-value",
                            dataWithQuotes = "function() { ... }",
                            value = createElement("span", valueClassName, dataWithQuotes);

                        marker && parent.appendChild(marker);
                        keyElement && parent.appendChild(keyElement);
                        parent.appendChild(value);
                    },
                    "boolean": function(key, data, parent, isChildProperty, isInactive) {
                        var marker = key ? createElement("span", "data-object-marker", "") : null,
                            keyClassName = isInactive ? "data-object-inactive-key" : "data-object-key",
                            keyElement = key ? createElement("span", keyClassName, key + ": ") : null,
                            value = createElement("span", "data-boolean-value", data ? "true" : "false");

                        marker && parent.appendChild(marker);
                        keyElement && parent.appendChild(keyElement);
                        parent.appendChild(value);
                    },
                    "number": function(key, data, parent, isChildProperty, isInactive) {
                        var marker = key ? createElement("span", "data-object-marker", "") : null,
                            keyClassName = isInactive ? "data-object-inactive-key" : "data-object-key",
                            keyElement = key ? createElement("span", keyClassName, key + ": ") : null,
                            value = createElement("span", "data-number-value", "" + data);

                        marker && parent.appendChild(marker);
                        keyElement && parent.appendChild(keyElement);
                        parent.appendChild(value);
                    },
                    "object": function(key, data, parent, isChildProperty) {
                        var isEmpty = (function(data) {
                                var i;
                                for (i in data) {
                                    if (data.hasOwnProperty(i)) {
                                        return false;
                                    }
                                }
                                return true;
                            })(data),
                            title = createElement("span", "data-object-title", ""),
                            marker = createElement("span", "data-object-marker", "+"),
                            keyElement = isChildProperty ? createElement("span", "data-object-key", key + ": ") : null,
                            value = createElement("span", "data-object-value", "Object"),
                            preview = !isChildProperty ? createElement("span", "data-object-preview", " { " + (!isEmpty ? "... " : "") + "}") : null,
                            children = createElement("span", "data-object-children-hidden", "");

                        if (isEmpty) {
                            if (isChildProperty) {
                                title.appendChild(marker);
                                title.appendChild(keyElement);
                            }
                            if (preview !== null) {
                                title.appendChild(preview);
                            } else {
                                title.appendChild(value);
                            }
                            parent.appendChild(title);
                            parent.appendChild(children);
                        } else if (!isChildProperty) {
                            title.appendChild(marker);
                            title.appendChild(value);
                            title.appendChild(preview);
                            parent.appendChild(title);
                            parent.appendChild(children);
                        } else {
                            title.appendChild(marker);
                            title.appendChild(keyElement);
                            title.appendChild(value);
                            parent.appendChild(title);
                            parent.appendChild(children);
                        }

                        title.addEventListener("click", function() {
                            var className = children.className,
                                isRendered = children.innerHTML.length > 0,
                                isOpened = className.indexOf("data-object-children-hidden") === -1;

                            if (!isRendered) {
                                natSort(Object.keys(data)).forEach(function (key) {
                                    var line = createElement("span", "data-object-line", "");
                                    renderObject(key, data[key], line, true);
                                    children.appendChild(line);
                                });
                            }
                            children.className = isOpened ? "data-object-children-hidden" : "data-object-children";
                            marker.innerHTML = isOpened ? "+" : "-";
                        }, false);
                    },
                    "array": function(key, data, parent, isChildProperty) {
                        var title = createElement("span", "data-object-title", ""),
                            marker = createElement("span", "data-object-marker", "+"),
                            keyElement = isChildProperty ? createElement("span", "data-object-key", key + ": ") : null,
                            value = createElement("span", "data-object-value", "Array[" + data.length + "]"),
                            preview = !isChildProperty ? createElement("span", "data-object-preview", " [ ... ]") : null,
                            children = createElement("span", "data-object-children-hidden", "");

                        if (!isChildProperty) {
                            title.appendChild(marker);
                            title.appendChild(value);
                            title.appendChild(preview);
                            parent.appendChild(title);
                            parent.appendChild(children);
                        } else {
                            title.appendChild(marker);
                            title.appendChild(keyElement);
                            title.appendChild(value);
                            parent.appendChild(title);
                            parent.appendChild(children);
                        }

                        title.addEventListener("click", function() {
                            var className = children.className,
                                isRendered = children.innerHTML.length > 0,
                                isOpened = className.indexOf("data-object-children-hidden") === -1,
                                line,
                                renderChild = function(key, value, isInactive) {
                                    var line = createElement("span", "data-object-line", "");
                                    renderObject(key, value, line, true, isInactive);
                                    children.appendChild(line);
                                };

                            if (!isRendered) {
                                natSort(Object.keys(data)).concat().forEach(function (key) {
                                    renderChild(key, data[key]);
                                });
                                renderChild("length", data.length, true);
                            }
                            children.className = isOpened ? "data-object-children-hidden" : "data-object-children";
                            marker.innerHTML = isOpened ? "+" : "-";
                        }, false);
                    }
                },
                clear = function() {
                    data = null;
                    container = null;
                };

            renderObject(null, data, container);
            return {
                clear: clear
            };
        },

        natSort = function(array) {
            return array.sort(function(a, b) {
                var aa = parseInt(a),
                    bb = parseInt(b),
                    aIsNum = !isNaN(aa),
                    bIsNum = !isNaN(bb);

                a = aIsNum ? aa : a;
                b = bIsNum ? bb : b;

                if (aIsNum && !bIsNum) {
                    return -1;
                }
                if (!aIsNum && bIsNum) {
                    return 1;
                }
                return a > b ? 1 : -1;
            });
        },

        htmlEscape = function (str) {
            return String(str || "")
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        };

    return function(containerId) {
        var container = document.getElementById(containerId),
            render = function() {},
            getConsoleRecord = function() {
                var record = document.createElement("div");
                record.className = "consoleRecord";
                return record;
            },
            scrollToTheEnd = function() {
                container.scrollTop = container.scrollHeight;
            },
            views = [],
            consoleLog = function() {
                var record = getConsoleRecord();
                [].forEach.call(arguments, function(argument) {
                    var item = document.createElement("span");
                    item.className = "consoleItem";
                    record.appendChild(item);
                    views.push(consolePreviewer(argument, item));
                });
                container.appendChild(record);
                console.log.apply(console, arguments);
                scrollToTheEnd();
            },
            consoleError = function() {
                var record = getConsoleRecord();
                [].forEach.call(arguments, function(argument) {
                    var item = document.createElement("span");
                    item.className = "consoleItem consoleError";
                    if (typeof(argument) === "object" && argument.message) {
                        argument = argument.message + (argument.url ? " (" + argument.url + (argument.position ? ":" + argument.position : "") + ")" : "");
                    }
                    item.innerHTML = htmlEscape(argument);
                    record.appendChild(item);
                });
                container.appendChild(record);
                console.error.apply(console, arguments);
                scrollToTheEnd();
            },
            process = function(value) {
                return value;
            },
            clear = function() {
                views.forEach(function(view) {
                    view.clear();
                });
                views = [];
                container.innerHTML = "";
            };

        return {
            render: render,
            process: process,
            log: consoleLog,
            error: consoleError,
            clear: clear
        };
    };
})();