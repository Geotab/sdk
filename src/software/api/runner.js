(function () {
    let shouldAutoLoginDemo = true;
    var ResizeObserver = function () {
            var resizeHandlers = [],
                attachEvent = function (handler) {
                    resizeHandlers.push(handler);
                },
                fireEvent = function () {
                    resizeHandlers.forEach(function (resizeHandler) {
                        resizeHandler();
                    });
                };
            window.addEventListener("resize", fireEvent, true);
            return {
                onResize: attachEvent,
                resize: fireEvent
            };
        },
        htmlEscape = function (str) {
            return String(str || "")
                .replace(/&/g, "&amp;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        },
        EditorManager = function (container, language, resizeObserver, urlState) {
            var editor,
                supportedLanguages = {
                    "javascript": true,
                    "html": true,
                    "css": true
                },
                saveTimeout = 1000,
                timeoutId = null,
                silentMode = false,
                render = function () {
                    language = !supportedLanguages[language] ? "javascript" : language;
                    editor = ace.edit(container);
                    editor.setTheme("ace/theme/chrome");
                    if (!window.Worker) {
                        editor.getSession().setOption("useWorker", false);
                    }
                    editor.getSession().setMode("ace/mode/" + language);
                    editor.$blockScrolling = Infinity;
                    editor.resize();
                    editor.on("change", function () {
                        if (!timeoutId && !silentMode) {
                            timeoutId = window.setTimeout(function () {
                                urlState.saveState();
                                timeoutId = null;
                            }, saveTimeout);
                        }
                    });
                    urlState.addEditor(language, self);
                },
                process = function (value) {
                    value[language] = editor.getValue();
                    return value;
                },
                setValue = function (value) {
                    silentMode = true;
                    editor && editor.getSession().setValue(value);
                    silentMode = false;
                },
                getValue = function () {
                    return editor && editor.getSession().getValue();
                },
                self = {
                    render: render,
                    process: process,
                    setValue: setValue,
                    getValue: getValue
                };

            resizeObserver.onResize(function () {
                editor && editor.resize();
            });

            return self;
        },
        ExecuteManager = function (containerId, apiManager, api, postMessages, consoleManager) {
            var iframe,
                container = document.getElementById(containerId),
                render = function () {},
                createIframe = function () {
                    var iframe = document.createElement("iframe");
                    iframe.src = "codebase/iframe.html";
                    iframe.className = "output";
                    iframe.setAttribute("sandbox", "allow-scripts");
                    container.appendChild(iframe);
                    return iframe;
                },
                getSendResponse = function (type, uid) {
                    return function (data) {
                        iframe.contentWindow.postMessage(JSON.stringify({
                            uid: uid,
                            type: type,
                            data: data
                        }), "*");
                    };
                },
                process = function (value) {
                    clear();
                    iframe = createIframe();

                    // listen to post messages from iframe
                    postMessages.on("ready", function (data) {
                        getSendResponse("success", data.uid)({
                            javascript: value.javascript,
                            html: value.html,
                            css: value.css
                        });
                    });
                    postMessages.on("call", function (data) {
                        api.call(data.method, data.params, getSendResponse("success", data.uid), getSendResponse("error", data.uid));
                    });
                    postMessages.on("multiCall", function (data) {
                        api.multiCall(data.calls, getSendResponse("success", data.uid), getSendResponse("error", data.uid));
                    });
                    postMessages.on("log", function (data) {
                        consoleManager.log.apply(consoleManager.log, data.data);
                    });
                    postMessages.on("error", function (data) {
                        consoleManager.error.apply(consoleManager.log, data.data);
                    });

                    value.iframe = iframe;
                    return value;
                },
                clear = function () {
                    postMessages.clear();
                    api.abort();
                    iframe && iframe.parentNode.removeChild(iframe);
                    iframe = null;
                };

            return {
                render: render,
                process: process,
                clear: clear
            };
        },
        PostMessagesManager = function () {
            var handlers = {},
                on = function (type, callback) {
                    if (!handlers[type]) {
                        handlers[type] = [];
                    }
                    handlers[type].push(callback);
                },
                clear = function () {
                    handlers = {};
                };

            window.addEventListener("message", function (e) {
                e.preventDefault();
                try {
                    if (!e.data)
                        return;
                    var data = JSON.retrocycle(JSON.parse(e.data)),
                        type;

                    if (data) {
                        type = data.type;
                        if (handlers[type]) {
                            handlers[type].forEach(function (handler) {
                                handler(data);
                            });
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            });
            return {
                render: function () {
                },
                process: function (value) {
                    return value;
                },
                on: on,
                clear: clear
            };
        },
        SecurityManager = function () {
            var securityDialog = document.getElementById("securityDialog"),
                securityOkButton = document.getElementById("securityOk"),
                showWarning = function () {
                    securityDialog.style.display = "block";
                },
                render = function () {
                    securityOkButton.addEventListener("click", function (e) {
                        e.preventDefault();
                        securityDialog.style.display = "none";
                    }, false);
                },
                process = function (value) {
                    value.iframe.setAttribute("sandbox", "allow-scripts");
                    return value;
                };
            return {
                render: render,
                process: process,
                showWarning: showWarning
            };
        },
        SelectWithLabel = function (container, template) {
            var select = container.querySelector("select"),
                label = container.querySelector("label"),
                waitingValue = null,
                updateLabel = function () {
                    label.innerHTML = template.replace("{option}", select.options[select.selectedIndex].text);
                },
                setOptions = function (options) {
                    options.forEach(function (sample, index) {
                        var option = document.createElement("option");
                        option.value = sample.id;
                        option.text = sample.name;
                        (index === 0) && option.setAttribute("selected", "selected");
                        select.options.add(option);
                    });
                    if (waitingValue !== null) {
                        setValue(waitingValue);
                        waitingValue = null;
                    } else {
                        updateLabel();
                    }
                },
                getValue = function () {
                    return select.value;
                },
                setValue = function (value) {
                    if (select.options.length === 0) {
                        waitingValue = value;
                    } else {
                        select.value = value;
                        updateLabel();
                    }
                },
                addEventListener = function (eventName, handler) {
                    select.addEventListener(eventName, handler, false);
                };

            select.addEventListener("change", updateLabel, false);

            return {
                setOptions: setOptions,
                getValue: getValue,
                setValue: setValue,
                addEventListener: addEventListener
            };
        },
        uiManager = function (github, geotabAPI, layout, urlState, APIRunner) {
            var initToggle = function () {
                    var toggleContainer = document.getElementById("toggle"),
                        buttons = toggleContainer.querySelectorAll(".btn"),
                        paneJS = document.getElementById("pane-js"),
                        paneCSS = document.getElementById("pane-css"),
                        paneHTML = document.getElementById("pane-html"),
                        paneLeft = document.getElementById("pane-left"),
                        addClass = function (element, className) {
                            if (!hasClass(element, className)) {
                                element.className += " " + className;
                            }
                        },
                        removeClass = function (element, className) {
                            var regexp = new RegExp(" " + className, "gi");
                            element.className = element.className.replace(regexp, "");
                        },
                        hasClass = function (element, className) {
                            return element.className.indexOf(className) > -1;
                        },
                        checkLeftPaneState = function () {
                            if (hasClass(paneJS, hiddenClassName) && hasClass(paneCSS, hiddenClassName) && hasClass(paneHTML, hiddenClassName)) {
                                addClass(paneLeft, hiddenClassName);
                            } else {
                                removeClass(paneLeft, hiddenClassName);
                            }
                        },
                        hiddenClassName = "hidden",
                        activeClassName = "active",
                        attribute = "aria-pressed",
                        getToggleState = function () {
                            return [].reduce.call(buttons, function (state, button) {
                                var id = button.id.replace("toggle-", ""),
                                    paneId = "pane-" + button.id.replace("toggle-", ""),
                                    pane = document.getElementById(paneId);

                                if (pane) {
                                    state[id] = !hasClass(pane, hiddenClassName);
                                }
                                return state;
                            }, {});
                        },
                        setToggleState = function (options) {
                            Object.keys(options).forEach(function (id) {
                                var button = document.getElementById("toggle-" + id),
                                    pane = document.getElementById("pane-" + id),
                                    state = options[id];

                                if (pane) {
                                    if (state) {
                                        addClass(button, activeClassName);
                                        button.setAttribute(attribute, true);
                                        removeClass(pane, hiddenClassName);
                                    } else {
                                        removeClass(button, activeClassName);
                                        button.setAttribute(attribute, false);
                                        addClass(pane, hiddenClassName);
                                    }
                                }
                            });
                            checkLeftPaneState();
                            layout.resize();
                        };

                    [].forEach.call(buttons, function (button) {
                        var paneId = "pane-" + button.id.replace("toggle-", ""),
                            pane = document.getElementById(paneId);

                        if (pane) {
                            button.addEventListener("click", function (e) {
                                e.preventDefault();
                                var isOpened = hasClass(button, activeClassName);

                                if (isOpened) {
                                    removeClass(button, activeClassName);
                                    button.setAttribute(attribute, false);
                                    addClass(pane, hiddenClassName);
                                } else {
                                    addClass(button, activeClassName);
                                    button.setAttribute(attribute, true);
                                    removeClass(pane, hiddenClassName);
                                }
                                checkLeftPaneState();
                                layout.resize();
                                urlState.saveState();
                            }, false);
                        }
                    });
                    urlState.addEditor("options", self);

                    return {
                        getToggleState: getToggleState,
                        setToggleState: setToggleState
                    };
                },
                toggleManager = null,
                samplesSelect = null,
                initSamples = function () {
                    samplesSelect = SelectWithLabel(document.getElementById("samplesControl"), "Sample: {option}");
                    github.getSamples(function (samples) {
                        // TODO: sort samples to place "New" to the top
                        samplesSelect.setOptions(samples);
                        samplesSelect.addEventListener("change", function (e) {
                            e.preventDefault();
                            window.setTimeout(function () {
                                urlState.saveState(samplesSelect.getValue());
                            }, 1);
                        });
                    }, APIRunner.errorHandler);
                },
                selectSample = function (sample) {
                    samplesSelect && samplesSelect.setValue(sample);
                },
                initUserLabel = function () {
                    var logoutButton = document.getElementById("logoutButton"),
                        userLabel = document.getElementById("userLabel"),
                        session = null,
                        getUserLabel = function (session) {
                            return htmlEscape(session.userName) + " (" + htmlEscape(session.database) + ")";
                        },
                        showUserInfo = function (session) {
                            userLabel.innerHTML = getUserLabel(session);
                            userLabel.style.display = "block";
                            logoutButton.style.display = "block";
                        },
                        getSessionCallback = function (currentSession) {
                            if (currentSession) {
                                shouldAutoLoginDemo = false;
                                session = currentSession;
                                showUserInfo(session);
                            } else {
                                session = null;
                                userLabel.style.display = "none";
                                logoutButton.style.display = "none";
                            }
                        },
                        renderUserLabel = function () {
                            geotabAPI.getSession(getSessionCallback);
                        },
                        confirmUser = function (successCallback) {
                            if (session) {
                                var dialog = document.getElementById("loggedUser"),
                                    dialogUserName = document.getElementById("loggedUserName"),
                                    confirmButton = document.getElementById("confirm"),
                                    cancelButton = document.getElementById("cancel");

                                dialogUserName.innerHTML = getUserLabel(session);
                                dialog.style.display = "block";

                                confirmButton.addEventListener("click", function () {
                                    successCallback && successCallback();
                                    dialog.style.display = "none";
                                }, false);
                                cancelButton.addEventListener("click", function () {
                                    logout();
                                    dialog.style.display = "none";
                                }, false);
                            }
                        },
                        logout = function () {
                            geotabAPI.forget(getSessionCallback);
                            userLabel.style.display = "none";
                            logoutButton.style.display = "none";
                            shouldAutoLoginDemo = false;
                        };

                    logoutButton.addEventListener("click", logout, false);

                    renderUserLabel();
                    return confirmUser;
                },
                initHotKeys = function () {
                    document.body.addEventListener("keydown", function (e) {
                        var keyCode = e.which,
                            isCtrl = e.ctrlKey || false;

                        // ignore Ctrl + S
                        if (keyCode === 83 && isCtrl) {
                            e.preventDefault();
                        }
                    }, false);
                },
                initShare = function () {
                    var shareButton = document.getElementById("share"),
                        shareDialog = document.getElementById("shareDialog"),
                        shareTextarea = document.getElementById("shareTextarea"),
                        shareDoneButton = document.getElementById("shareDone");

                    shareDoneButton.addEventListener("click", function () {
                        shareDialog.style.display = "none";
                        shareTextarea.value = "";
                    }, false);

                    shareButton.addEventListener("click", function () {
                        var url = window.location.href.split("#")[0];
                        shareTextarea.value = url + "#" + urlState.getState();
                        shareDialog.style.display = "block";
                        shareTextarea.focus();
                        shareTextarea.select();
                    }, false);
                },
                render = function () {
                    initSamples();
                    toggleManager = initToggle();
                    self.confirmUser = initUserLabel();
                    initHotKeys();
                    initShare();
                },
                process = function (value) {
                    return value;
                },
                getValue = function () {
                    return toggleManager ? toggleManager.getToggleState() : {};
                },
                setValue = function (value) {
                    toggleManager && toggleManager.setToggleState(value || {});
                },
                self = {
                    render: render,
                    process: process,
                    getValue: getValue,
                    setValue: setValue,
                    selectSample: selectSample
                };
            return self;
        },
        layoutManager = function (resizeObserver) {
                var jsPane = document.getElementById("pane-js"),
                cssPane = document.getElementById("pane-css"),
                htmlPane = document.getElementById("pane-html"),
                leftPane = document.getElementById("pane-left"),
                consolePane = document.getElementById("pane-console"),
                outputPane = document.getElementById("pane-output"),

                resize = function () {
                    var isJSVisible = (jsPane.className.indexOf("hidden") === -1) ? 1 : 0,
                        isCSSVisible = (cssPane.className.indexOf("hidden") === -1) ? 1 : 0,
                        isHTMLVisible = (htmlPane.className.indexOf("hidden") === -1) ? 1 : 0,
                        isLeftVisible = (isJSVisible || isCSSVisible || isHTMLVisible) ? 1 : 0,
                        isConsoleVisible = (consolePane.className.indexOf("hidden") === -1) ? 1 : 0,
                        isOutputVisible = (outputPane.className.indexOf("hidden") === -1) ? 1 : 0,
                        setIsLastVisible = function (element, isLastVisible) {
                            var lastVisibleClass = " last-visible";
                            if (isLastVisible) {
                                if (element.className.indexOf(lastVisibleClass) === -1) {
                                    element.className += lastVisibleClass;
                                }
                            } else {
                                element.className = element.className.replace(lastVisibleClass, "");
                            }
                        },
                        colWidth = 100 / (isLeftVisible + isConsoleVisible + isOutputVisible),
                        styleWidth = "calc(" + colWidth + "% - 4px)",
                        rowHeight = 100 / (isJSVisible + isCSSVisible + isHTMLVisible),
                        styleHeight = "calc(" + rowHeight + "% - 4px)",
                        lastStyleHeight = rowHeight + "%";

                    jsPane.style.height = isCSSVisible || isHTMLVisible ? styleHeight : lastStyleHeight;
                    cssPane.style.height = isHTMLVisible ? styleHeight : lastStyleHeight;
                    htmlPane.style.height = lastStyleHeight;
                    setIsLastVisible(jsPane, !isCSSVisible && !isHTMLVisible);
                    setIsLastVisible(cssPane, !isHTMLVisible);

                    leftPane.style.width = styleWidth;
                    consolePane.style.width = styleWidth;
                    outputPane.style.width = styleWidth;
                    resizeObserver.resize();
                };

            return {
                resize: resize
            };
        },
        APIRunner = function () {
            let demoCredentials = null;
            let processors = (function () {
                    var processors = [],
                        add = function (name, processor) {
                            self[name] = processor;
                            processors.push(processor);
                        },
                        self = {
                            add: add,
                            forEach: function (callback) {
                                processors.forEach(callback);
                            },
                            reduce: function (callback, value) {
                                processors.reduce(callback, value);
                            }
                        };

                    return self;
                })(),
                urlState = (function () {
                    var sampleNameRegexp = /sample:[\w\d-]+/i,
                        localStorageSampleName = "geotabAPIRunner_sample",
                        isSandboxSupported = "sandbox" in document.createElement("iframe"),
                        getSampleNameFromURL = function () {
                            var hash = window.location.hash.substr(1);
                            if (hash.match(sampleNameRegexp)) {
                                return hash.replace("sample:", "");
                            }
                            return null;
                        },
                        restoreState = function () {
                            console.log('restoreState');
                            var state = window.location.hash.substr(1),
                                parsedState = null,
                                sampleName = getSampleNameFromURL(),
                                parseState = function (stateText) {
                                    try {
                                        state = decodeURIComponent(atob(stateText));
                                        state = JSON.parse(state);
                                    } catch (e) {
                                        state = null;
                                    }
                                    return state;
                                };

                            if (sampleName) {
                                processors.ui.selectSample(sampleName);
                                load(sampleName);
                            } else {
                                parsedState = parseState(state);
                                if (parsedState && !isSandboxSupported) {
                                    processors.security.showWarning();
                                    parsedState = null;
                                } else {
                                    parsedState && localStorage.setItem(localStorageSampleName, encodeState(state));
                                }
                                window.location.hash = "";

                                if (!parsedState) {
                                    parsedState = localStorage.getItem(localStorageSampleName);
                                    parsedState = parseState(parsedState);
                                }
                                if (parsedState) {
                                    Object.keys(editors).forEach(function (name) {
                                        if (typeof (parsedState[name]) !== "undefined" && editors[name].getValue() !== parsedState[name]) {
                                            editors[name].setValue(parsedState[name]);
                                        }
                                    });
                                }
                            }
                        },
                        editors = {},
                        addEditor = function (name, editor) {
                            editors[name] = editor;
                        },
                        encodeState = function (state) {
                            return btoa(encodeURIComponent(JSON.stringify(state)));
                        },
                        getState = function (sampleName, ignoreURLSampleName) {
                            var state,
                                sampleNameFromURL = getSampleNameFromURL();
                            if (sampleName) {
                                state = "sample:" + sampleName;
                            } else if (!ignoreURLSampleName && sampleNameFromURL) {
                                state = "sample:" + sampleNameFromURL;
                            } else {
                                state = Object.keys(editors).reduce(function (state, name) {
                                    state[name] = editors[name].getValue();
                                    return state;
                                }, {});
                                state = encodeState(state);
                            }
                            return state;
                        },
                        saveState = function (sampleName) {
                            var state = getState(sampleName, true);
                            if (sampleName) {
                                window.location.hash = state;
                            } else {
                                localStorage.setItem(localStorageSampleName, state);
                                window.location.hash = "";
                            }
                        };

                    window.addEventListener("hashchange", restoreState, false);

                    return {
                        addEditor: addEditor,
                        restoreState: restoreState,
                        saveState: saveState,
                        getState: getState
                    };
                })(),

                render = function () {
                    processors.forEach(function (processor) {
                        processor.render();
                    });
                    urlState.restoreState();
                },
                errorHandler = function (error) {
                    processors.console.error(error);
                },
                load = function (sampleName) {
                    github.getSample(sampleName, function (sources) {
                        processors.css.setValue(sources.css);
                        processors.html.setValue(sources.html);
                        processors.js.setValue(sources.js);
                        processors.ui.setValue(sources.options);
                    }, errorHandler);
                },
                run = function (e) {
                    e.preventDefault();
                    var iterateProcessors = function () {
                        processors.reduce(function (value, processor) {
                            return processor.process(value);
                        }, {});
                    };

                    if (!loginFormHasBeenShown) {
                        processors.ui.confirmUser(iterateProcessors);
                        loginFormHasBeenShown = true;
                    } else {
                        iterateProcessors();
                    }
                },
                api,
                resizeObserver = ResizeObserver(),
                layout = layoutManager(resizeObserver),
                github = SamplesApi(),
                loginFormHasBeenShown = false,
                self = {
                    run: run,
                    load: load,
                    errorHandler: errorHandler
                },
                authenticateManager = function (authenticateCallback) {
                    console.log('authenticateManager');
                    var loginForm = document.getElementById("login"),
                        loginDialog = document.getElementById("loginDialog"),
                        loginError = document.getElementById("loginError"),
                        loginButton = document.getElementById("loginButton"),
                        serverInput = document.getElementById("server"),
                        databaseInput = document.getElementById("database"),
                        userInput = document.getElementById("user"),
                        passwordInput = document.getElementById("password"),
                        loginSpinner = document.getElementById("loginSpinner"),
                        setForm = function (server, database, user, password) {
                            serverInput.value = server;
                            databaseInput.value = database;
                            userInput.value = user;
                            passwordInput.value = password;
                        },
                        show = function () {
                            loginForm.style.display = "block";
                            loginError.style.display = "none";
                        },
                        hide = () => loginForm.style.display = "none";

                    if (demoCredentials) {
                        if (!serverInput.value || serverInput.value === "my.geotab.com")
                            setForm(...Object.values(demoCredentials));
                        if (shouldAutoLoginDemo) {
                            shouldAutoLoginDemo = false;
                            // Add small delay so that user can see that they are being logged in.
                            setTimeout(() => loginButton.click(), 500);
                        }
                    } else {
                        if (!serverInput.value) {
                            serverInput.value = "my.geotab.com";
                            serverInput.focus();
                        }
                    }

                    show();

                    // This function can be called multiple times, so remove the previous event handler before adding a
                    // new one.
                    loginDialog.removeEventListener("submit", preventDefault, false);
                    loginDialog.addEventListener("submit", preventDefault, false);

                    let loginClickHandler = e => {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        console.log('loginButton clicked');
                        let server = serverInput.value,
                            database = databaseInput.value,
                            user = userInput.value,
                            password = passwordInput.value;
                        loginSpinner.style.display = 'inline'
                        authenticateCallback(server, database, user, password, function () {
                            console.log('authenticateCallback: successful');
                            hide();
                            loginFormHasBeenShown = true;
                            loginSpinner.style.display = 'none';
                            shouldAutoLoginDemo = false;
                        }, function (error) {
                            console.log('authenticateCallback: error');
                            loginError.innerHTML = error;
                            loginError.style.display = "block";
                            userInput.select();
                            userInput.focus();
                            loginSpinner.style.display = 'none';
                            shouldAutoLoginDemo = false;
                        });
                    }

                    loginClickHandler = debounce(loginClickHandler);

                    if (prevLoginClickHandler)
                        loginButton.removeEventListener("click", prevLoginClickHandler, false);

                    prevLoginClickHandler = loginClickHandler;
                    loginButton.addEventListener("click", loginClickHandler, false);
                };

            const preventDefault = e => e.preventDefault();
            let prevLoginClickHandler = null;

            authenticateManager = debounce(authenticateManager);

            processors.add("js", EditorManager("js", "javascript", resizeObserver, urlState));
            processors.add("css", EditorManager("css", "css", resizeObserver, urlState));
            processors.add("html", EditorManager("html", "html", resizeObserver, urlState));

            layout.resize();

            // Process a search string if there is one. The only use for the search string is to automatically login a user
            // to a local geotabdemo db. This feature is used by geo-cli so that users can easily open up an api runner
            // for their local geo-cli-managed dbs. It is for internal development uses only and will only work with local
            // geotabdemo dbs.
            let searchString = window.location.search;
            // console.log(`searchString: ${searchString}`);
            if (searchString) {
                try {
                    if (searchString?.startsWith('?')) {
                        // ?server=localhost:10001&database=geotabdemo&username=dawsonmyers@geotab.com&password=passwordpassword
                        searchString = searchString.replace('?', '').replace('\n', '');
                        // Decode the query string if it is base64 encoded.
                        const decodedSearchString = searchString.includes('=') ? searchString : atob(searchString);
                        // console.log(`decodedSearchString: ${decodedSearchString}`);

                        const urlParams = new URLSearchParams(decodedSearchString);

                        const requiredParams = ['database', 'username', 'server', 'password'];
                        const hasRequiredKeys = requiredParams.reduce((result, param) => result && urlParams.has(param))

                        console.log('hasRequiredKeys ' + hasRequiredKeys);

                        if (hasRequiredKeys) {

                            const server = urlParams.get('server');
                            const database = urlParams.get('database');
                            const username = urlParams.get('username');
                            const password = urlParams.get('password').replace('\n', '');

                            // Only use the credentials if they are for geotabdemo on the local machine.
                            if (database === 'geotabdemo' && (server.includes('localhost') || server.includes('127.0.0.1'))) {
                                demoCredentials = { server, database, username, password };
                                console.log(demoCredentials);
                            } else {
                                console.log('Auto-login only works with geotabdemo on the local machine.')
                            }
                        }
                    }
                } catch (e) {
                    console.error(e.message);
                }
            }

            api = GeotabApi(authenticateManager);

            processors.add("postMessages", PostMessagesManager());
            processors.add("console", ConsoleManager("console"));
            processors.add("output", ExecuteManager("output", self, api, processors.postMessages, processors.console));
            processors.add("security", SecurityManager());
            processors.add("ui", uiManager(github, api, layout, urlState, self));

            api.setDefaultHandlers(processors.console.log, processors.console.error);
            render();

            document.getElementById("run").addEventListener("click", run, false);
            document.getElementById("clear").addEventListener("click", function () {
                processors.console.clear();
                processors.output.clear();
            }, false);
        };

    function debounce(func) {
        let timeoutId = -1;
        let count = 0;
        console.log("debounce created: " + func.name);
        return args => {
            console.log(`debounce: ${func.name} called ${++count} times`);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => { count = 0; func(args); }, 500);
        }
    }

    APIRunner();
})();
