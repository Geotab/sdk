import {
    editorModeKey, getJsOnlyEditorMode, getSaveNameFromHash, isJsOnlyModeActive,
    localStorageUtils,
    selectedEditorIdKey,
    toggleButtonStatesJsOnlyKey,
    toggleButtonStatesKey, unsavedEditorChangesKey
} from './utils';

let shouldAutoLoginDemo = false;
let demoCredentials = null;
let loginFormHasBeenShown = false;

export default function ApiRunnerCore() {

    const htmlEscape = str => String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    const EditorManager = (container, language, urlState) => {
        var editor,
            ignoreChanges = false,
            supportedLanguages = {
                "javascript": true,
                "html": true,
                "css": true
            },
            saveTimeout = 1000,
            silentMode = false,
            render = () => {
                language = !supportedLanguages[language] ? "javascript" : language;
                editor = ace.edit(container);
                editor.setTheme(appState.darkMode ? "ace/theme/dracula" : "ace/theme/chrome");
                if (!window.Worker) {
                    editor.getSession().setOption("useWorker", false);
                }
                editor.session.on('changeMode', function(e, session) {
                    if ("ace/mode/javascript" === session.getMode().$id) {
                        if (!!session.$worker) {
                            session.$worker.send("setOptions", [{
                                "esversion": 9,
                                "esnext": false,
                            }]);
                        }
                    }
                });
                editor.getSession().setMode("ace/mode/" + language);
                editor.$blockScrolling = Infinity;
                editor.on("change", debounce(() => {
                        if (!silentMode) {
                            if (ignoreChanges) {
                                ignoreChanges = false;
                                return;
                            }
                            appState.setUnsavedEditorChanges(true);
                            if (window.location.hash.startsWith('#save:')) {
                                localStorageUtils.setObject(unsavedEditorChangesKey, true);
                            }
                            urlState.saveState();
                        }
                    }, saveTimeout)
                );
                appState.setEditors(language, editor);
                urlState.addEditor(language, self);
            },
            process = value => {
                appState = window.appState;
                if (appState.paneToggleButtonStates.jsOnly) {
                    const editorId = window.appState.selectedEditorId.replace('pane-', '');
                    if (language === 'javascript') {
                        switch (editorId) {
                            case 'js':
                                value[language] = appState.editors.javascript.getValue();
                                break;
                            case 'css':
                                value[language] = appState.editors.css.getValue();
                                break;
                            case 'html':
                                value[language] = appState.editors.html.getValue();
                                break;
                        }
                    } else {
                        value[language] = '';
                    }
                } else {
                    value[language] = editor.getValue();
                }
                return value;
            },
            setValue = value => {
                ignoreNextChange();
                editor?.getSession().setValue(value);
            },
            setMode = language => {
                ignoreNextChange();
                editor?.getSession().setMode(`ace/mode/${language}`);
            },
            getMode = () => {
                return editor?.getSession().getMode().replace('ace/mode/', '');
            },
            getValue = () => editor?.getSession().getValue(),
            ignoreNextChange = () => ignoreChanges = true,
            resize = () => editor.resize(),
            self = {
                render: render,
                process: process,
                setValue: setValue,
                getValue: getValue,
                editor: editor,
                setMode: setMode,
                getMode: getMode,
                ignoreNextChange,
                resize: resize
            };

        return self;
    };
    const ExecuteManager = (containerId, apiManager, api, postMessages, consoleManager) => {
        let iframe;
        const container = document.getElementById(containerId);
        const render = () => {
        };
        const createIframe = () => {
            const iframe = document.createElement("iframe");
            iframe.src = "codebase/iframe.html";
            iframe.className = "output";
            iframe.setAttribute("sandbox", "allow-scripts");
            container.appendChild(iframe);
            return iframe;
        };
        const getSendResponse = (type, uid) => data => {
            iframe.contentWindow.postMessage(JSON.stringify({
                uid: uid,
                type: type,
                data: data
            }), "*");
        };
        const process = value => {

            clear();
            iframe = createIframe();


            // listen to post messages from iframe
            postMessages.on("ready", data => {
                getSendResponse("success", data.uid)({
                    javascript: value.javascript,
                    html: value.html,
                    css: value.css
                });
            });
            postMessages.on("call", data => {
                api.call(data.method, data.params, getSendResponse("success", data.uid), getSendResponse("error", data.uid));
            });
            postMessages.on("multiCall", data => {
                api.multiCall(data.calls, getSendResponse("success", data.uid), getSendResponse("error", data.uid));
            });
            postMessages.on("log", data => {
                consoleManager.log.apply(consoleManager.log, data.data);
            });
            postMessages.on("error", data => {
                consoleManager.error.apply(consoleManager.log, data.data);
            });

            value.iframe = iframe;
            return value;
        };
        var clear = () => {
            postMessages.clear();
            api.abort();
            if (iframe) {
                iframe.parentNode.removeChild(iframe);
                iframe = null;
            }
        };

        return {
            render: render,
            process: process,
            clear: clear
        };
    };
    const PostMessagesManager = () => {
        let handlers = {};
        const on = (type, callback) => {
                if (!handlers[type]) {
                    handlers[type] = [];
                }
                handlers[type].push(callback);
            },
            clear = () => {
                handlers = {};
            };

        window.addEventListener("message", e => {
            e.preventDefault();
            try {
                if (!e.data || typeof e.data === 'object')
                    return;
                const data = JSON.retrocycle(JSON.parse(e.data));
                let type;

                if (data) {
                    type = data.type;
                    if (handlers[type]) {
                        handlers[type].forEach(handler => {
                            handler(data);
                        });
                    }
                }
            } catch (e) {
                console.error(e);
            }
        });
        return {
            render: () => {
            },
            process: value => value,
            on: on,
            clear: clear
        };
    };
    const SecurityManager = () => {
        const securityDialog = document.getElementById("securityDialog"),
            securityOkButton = document.getElementById("securityOk"),
            showWarning = () => {
                securityDialog.style.display = "block";
            },
            render = () => {
                securityOkButton.addEventListener("click", e => {
                    e.preventDefault();
                    securityDialog.style.display = "none";
                }, false);
            },
            process = value => {
                value.iframe.setAttribute("sandbox", "allow-scripts");
                return value;
            };
        return {
            render: render,
            process: process,
            showWarning: showWarning
        };
    };
    const SelectWithLabel = (container, template) => {
        var select = container.querySelector("select"),
            label = container.querySelector("label"),
            waitingValue = null,
            updateLabel = () => {
                label.innerHTML = template.replace("{option}", select.options[select.selectedIndex].text);
            },
            setOptions = options => {
                options.forEach((sample, index) => {
                    const option = document.createElement("option");
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
            getValue = () => select.value,
            setValue = value => {
                if (select.options.length === 0) {
                    waitingValue = value;
                } else {
                    select.value = value;
                    updateLabel();
                }
            },
            addEventListener = (eventName, handler) => {
                select.addEventListener(eventName, handler, false);
            };

        select.addEventListener("change", updateLabel, false);

        return {
            setOptions: setOptions,
            getValue: getValue,
            setValue: setValue,
            addEventListener: addEventListener
        };
    };
    let session = null;
    const uiManager = (github, geotabAPI, urlState, APIRunner) => {
        var samplesSelect = null,
            initSamples = () => {
                const select = document.getElementById("samplesControl");
                select.querySelector('i').addEventListener('click', () => {
                    select.querySelector('select')?.click();
                });
                samplesSelect = SelectWithLabel(document.getElementById("samplesControl"), "Sample: {option}");
                github.getSamples(samples => {
                    // TODO: sort samples to place "New" to the top
                    samplesSelect.setOptions(samples);
                    samplesSelect.addEventListener("change", e => {
                        e.preventDefault();
                        window.setTimeout(() => {
                            urlState.saveState(samplesSelect.getValue());
                        }, 1);
                    });
                }, APIRunner.errorHandler);
            },
            selectSample = sample => {
                samplesSelect && samplesSelect.setValue(sample);
            },
            logout = () => {
            },
            initUserLabel = () => {
                const getUserLabel = session => htmlEscape(session.userName) + " (" + htmlEscape(session.database) + ")",
                    showUserInfo = session => {
                        appState.setUserLabel(getUserLabel(session));
                    },
                    getSessionCallback = currentSession => {
                        if (currentSession && !shouldAutoLoginDemo) {
                            session = currentSession;
                            showUserInfo(session);
                        } else {
                            // Log out of an existing session so that we can log into geotabdemo.
                            // If currentSession isn't null, then shouldAutoLoginDemo must be true. Which means
                            // that geo-cli has launched the runner and is going to log into geotabdemo.
                            if (currentSession) {
                                logout();
                            }
                            session = null;
                            appState.setUserLabel('');
                        }
                    },
                    renderUserLabel = () => {
                        geotabAPI.getSession(getSessionCallback);
                    },
                    confirmUser = successCallback => {
                        if (session) {
                            const dialog = document.getElementById("loggedUser"),
                                dialogUserName = document.getElementById("loggedUserName"),
                                confirmButton = document.getElementById("confirm"),
                                cancelButton = document.getElementById("cancel");

                            dialogUserName.innerHTML = getUserLabel(session);
                            dialog.style.display = "block";

                            confirmButton.addEventListener("click", debounce(() => {
                                successCallback && successCallback();
                                dialog.style.display = "none";
                            }, false));
                            cancelButton.addEventListener("click", debounce(() => {
                                logout();
                                dialog.style.display = "none";
                            }, false));
                        }
                    };
                logout = () => {
                    geotabAPI.forget(getSessionCallback);
                    appState.setUserLabel('');
                    if (demoCredentials && !shouldAutoLoginDemo) {
                        // Clearing window.location.search will reload the page, so save the demo credentials in
                        // localStorage so that we can populate the login dialog with them afterwords. We are
                        // clearing the search string because users may want to log out of geotabdemo and into
                        // a db on a real server using this page. If the search string remains, then their session
                        // to another server will be logged out of (and then logged back into geotabdemo) if the
                        // page reloads.
                        localStorage.setItem('prevLoginInfo', JSON.stringify(demoCredentials));
                        demoCredentials = null;
                        appState.setDemoCredentials(null);
                        window.location.search = '';
                    }
                };
                appState.setLogoutCallback(() => logout);
                renderUserLabel();
                return confirmUser;
            },
            render = () => {
                initSamples();
                self.confirmUser = initUserLabel();
            },
            process = value => value,
            getValue = () => appState.paneToggleButtonStates,
            setValue = options => appState.setPaneToggleButtonStates({ ...options }),
            self = {
                render,
                process,
                getValue,
                setValue,
                selectSample,
                logout
            };
        return self;
    };
    const APIRunner = () => {
        let processors = (() => {
                var processors = [],
                    add = (name, processor) => {
                        self[name] = processor;
                        processors.push(processor);
                    },
                    self = {
                        add: add,
                        forEach: callback => {
                            processors.forEach(callback);
                        },
                        reduce: (callback, value) => {
                            processors.reduce(callback, value);
                        }
                    };

                return self;
            })(),
            urlState = (() => {
                const jsOnlyEditorStateKey = 'api-runner-state-js-only';
                const editorModeKey = 'api-runner-editor-mode';
                const darkModeKey = 'api-runner-dark-mode';
                const editors = {};
                var sampleNameRegexp = /sample:[\w\d-]+/i,
                    localStorageSampleName = "geotabAPIRunner_sample",
                    isSandboxSupported = "sandbox" in document.createElement("iframe"),
                    getSampleNameFromURL = () => {
                        const hash = window.location.hash.substr(1);
                        if (hash.match(sampleNameRegexp))
                            return hash.replace("sample:", "");
                        else if (hash === 'js-only')
                            return hash;
                        return null;
                    },
                    restoreState = (editorMode) => {
                        appState.setUnsavedEditorChanges(false);
                        if (typeof editorMode !== "string") {
                            editorMode = localStorage.getItem(editorModeKey);
                        }
                        let state = window.location.hash.substr(1),
                            parsedState = null;

                        const sampleName = getSampleNameFromURL(),
                            parseState = stateText => {
                                try {
                                    state = decodeURIComponent(atob(stateText));
                                    state = JSON.parse(state);
                                } catch (e) {
                                    state = null;
                                }
                                return state;
                            };

                        // Loads a saved editor config. This is triggered in SaveControls.
                        if (state?.startsWith('load-save:')) {
                            const configs = localStorageUtils.getSavedConfigs();
                            const name = decodeURI(state.replace('load-save:', ''));
                            appState.setCurrentConfigName(name);
                            const filteredConfigs = configs.filter(c => c.name === name);
                            if (filteredConfigs.length === 1) {
                                const [ config ] = filteredConfigs;
                                appState.setPaneToggleButtonStates(config.toggleStates);
                                appState.jsOnlyRef.current = config.jsOnly;
                                appState.setJsOnly(config.jsOnly);

                                parsedState = config.editorState;
                                Object.keys(editors).forEach(name => {
                                    if (typeof (parsedState[name]) !== "undefined") {
                                        editors[name].setValue(parsedState[name]);
                                        if (editors[name].getValue() !== parsedState[name]) {
                                            editors[name].setValue(parsedState[name]);
                                        }

                                        if (config.jsOnly) {
                                            editors[name].setMode('javascript');
                                        } else {
                                            editors[name].setMode(name);
                                        }
                                    }

                                });
                                document.location.hash = state.replace('load-', '');
                                saveState();
                                return;
                            } else if (configs.length > 1) {
                                console.error('restoreState: More that one config for name: ', name);
                                window.location.hash = '';
                            } else if (configs.length < 1) {
                                console.error('restoreState: No matching config for name: ', name);
                                window.location.hash = '';
                            }

                        }

                        // Restore unsaved editor changes state if a save is active (in the hash).
                        if (window.location.hash.startsWith('#save:')) {
                            const configName = getSaveNameFromHash();
                            appState.setCurrentConfigName(configName);
                            const unsavedChanges = localStorageUtils.getObject(unsavedEditorChangesKey);
                            appState.setUnsavedEditorChanges(!!unsavedChanges);
                        } else {
                            localStorageUtils.setObject(unsavedEditorChangesKey, false);
                            appState.setUnsavedEditorChanges(false);
                            appState.setCurrentConfigName('');
                        }
                        if (sampleName && sampleName !== 'js-only') {
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

                            editorMode = editorMode || localStorage.getItem(editorModeKey);
                            const jsOnlyMode = editorMode === 'js-only';
                            if (jsOnlyMode) {
                                appState.setJsOnly(jsOnlyMode);
                                appState.jsOnlyRef.current = jsOnlyMode;
                                parsedState = localStorage.getItem(jsOnlyEditorStateKey);
                                parsedState = parseState(parsedState);
                            }

                            // Try to get the state from localStorage if we didn't find it in the hash.
                            if (!parsedState) {
                                parsedState = localStorage.getItem(localStorageSampleName);
                                parsedState = parseState(parsedState);
                            }
                            if (!window.location.hash.includes('save:')) {
                                window.location.hash = "";
                            }
                            if (parsedState) {
                                Object.keys(editors).forEach(name => {
                                    if (typeof (parsedState[name]) !== "undefined") {
                                        editors[name].setValue(parsedState[name]);
                                        if (editors[name].getValue() !== parsedState[name]) {
                                            editors[name].setValue(parsedState[name]);
                                        }

                                        if (jsOnlyMode) {
                                            editors[name].setMode('javascript');
                                        } else {
                                            editors[name].setMode(name);
                                        }
                                    }
                                });

                                const curToggleStateKey = jsOnlyMode ? toggleButtonStatesJsOnlyKey : toggleButtonStatesKey;
                                let paneToggleButtonStates = localStorageUtils.getObject(curToggleStateKey);
                                if (paneToggleButtonStates) {
                                    appState.setPaneToggleButtonStates(paneToggleButtonStates);
                                }
                                if (jsOnlyMode) {
                                    const selectedEditorId = localStorage.getItem(selectedEditorIdKey);
                                    if (jsOnlyMode && selectedEditorId) {
                                        appState.setSelectedEditorId(selectedEditorId);
                                    }
                                }
                                appState.jsOnlyRef.current = jsOnlyMode;
                            }
                        }
                    },
                    addEditor = (name, editor) => {
                        editors[name] = editor;
                    },
                    encodeState = state => btoa(encodeURIComponent(JSON.stringify(state))),
                    getState = (sampleName, ignoreURLSampleName, toggleStates) => {
                        let state;
                        const sampleNameFromURL = getSampleNameFromURL();
                        if (sampleName) {
                            state = "sample:" + sampleName;
                        } else if (!ignoreURLSampleName && sampleNameFromURL) {
                            state = "sample:" + sampleNameFromURL;
                        } else {
                            state = Object.keys(editors).reduce((state, name) => {
                                state[name] = editors[name].getValue();
                                return state;
                            }, {});

                            window.appState?.selectedEditorId && (state.selectedEditorId = window.appState.selectedEditorId);
                            state = encodeState(state);
                        }

                        return state;
                    },
                    saveState = (sampleName, toggleStates) => {
                        const state = getState(sampleName, true, toggleStates);
                        localStorageUtils.setObject(darkModeKey, appState.darkMode);
                        if (sampleName) {
                            window.location.hash = state;
                        } else {
                            if (appState.jsOnlyRef.current) {
                                localStorage.setItem(editorModeKey, 'js-only');
                                localStorage.setItem(jsOnlyEditorStateKey, state);
                            } else {
                                localStorage.setItem(editorModeKey, 'normal');
                                localStorage.setItem(localStorageSampleName, state);
                            }
                            if (!window.location.hash.includes('save:')) {
                                window.location.hash = "";
                            }
                        }
                    };

                window.addEventListener("hashchange", restoreState, false);

                return {
                    addEditor: addEditor,
                    restoreState: restoreState,
                    saveState: saveState,
                    getState: getState,
                    editors: editors
                };
            })(),

            render = () => {
                processors.forEach(processor => {
                    processor.render();
                });
                urlState.restoreState();
            },
            errorHandler = error => {
                processors.console.error(error);
            },
            load = sampleName => {
                github.getSample(sampleName, sources => {
                    processors.css.setValue(sources.css);
                    processors.html.setValue(sources.html);
                    processors.js.setValue(sources.js);
                    processors.ui.setValue(sources.options);
                }, errorHandler);
            },
            run = e => {
                e.preventDefault();
                const iterateProcessors = () => {
                    processors.reduce((value, processor) => processor.process(value), {});
                };

                if (!loginFormHasBeenShown) {
                    processors.ui.confirmUser(iterateProcessors);
                    loginFormHasBeenShown = true;
                    appState.setLoginFormHasBeenShown(true);
                } else {
                    iterateProcessors();
                }
            },
            api,
            github = SamplesApi(),
            loginFormHasBeenShown = false,
            self = {
                run: run,
                load: load,
                errorHandler: errorHandler
            };

        // Set up login form handlers.
        const loginForm = document.getElementById("login"),
            loginDialog = document.getElementById("loginDialog"),
            loginError = document.getElementById("loginError"),
            loginButton = document.getElementById("loginButton"),
            serverInput = document.getElementById("server"),
            databaseInput = document.getElementById("database"),
            userInput = document.getElementById("user"),
            passwordInput = document.getElementById("password"),
            loginSpinner = document.getElementById("loginSpinner");

        const setLoginForm = (server = '', database = '', user = '', password = '') => {
                serverInput.value = server;
                databaseInput.value = database;
                userInput.value = user;
                passwordInput.value = password;
            },
            showLoginForm = () => {
                loginForm.style.display = "block";
                loginError.style.display = "none";
                loginButton.removeAttribute("disabled");
                loginSpinner.style.display = "none";
            },
            hideLoginForm = () => loginForm.style.display = "none";

        loginDialog.addEventListener("submit", e => e.preventDefault(), false);

        // Set up keypress handlers for login inputs. Pressing enter when an input is focused will set the focus
        // to the next input. However, when the last input (password) is focused, pressing enter will submit the
        // login form.
        const defaultAction = elem => elem.focus();
        // Creates an event handler that runs when the enter key is pressed.
        const onEnter = (elem, action) =>
            event => {
                action = action || defaultAction;
                if (event.key === "Enter") {
                    event.preventDefault();
                    action(elem);
                }
            };

        serverInput.addEventListener("keypress", onEnter(databaseInput));
        databaseInput.addEventListener("keypress", onEnter(userInput));
        userInput.addEventListener("keypress", onEnter(passwordInput));
        passwordInput.addEventListener("keypress", onEnter(null, () => loginButton.click()));

        // This callback is updated everytime the authenticateManager function is called by the GeotabApi instance
        // when there isn't an active session (when logging in for the first time or after logging out).
        let authenticateCallback;
        let loginClickHandler = e => {
            e.preventDefault();
            const server = serverInput.value,
                database = databaseInput.value,
                user = userInput.value,
                password = passwordInput.value;
            loginSpinner.style.display = 'inline';
            loginButton.setAttribute('disabled', 'true');
            const authSuccessCallback = () => {
                hideLoginForm();
                loginFormHasBeenShown = true;
                appState.setLoginFormHasBeenShown(true);
                loginSpinner.style.display = 'none';
                shouldAutoLoginDemo = false;
                appState.setShouldAutoLoginDemo(false);
                loginButton.removeAttribute('disabled');
            };
            const authErrorCallback = error => {
                loginError.innerHTML = error;
                loginError.style.display = "block";
                passwordInput.select();
                passwordInput.focus();
                loginSpinner.style.display = 'none';
                shouldAutoLoginDemo = false;
                appState.setShouldAutoLoginDemo(false);
                loginButton.removeAttribute('disabled');
            };
            // Store previous login info for next time.
            localStorage.setItem('prevLoginInfo', JSON.stringify({ server, database, user }));
            // Make the api auth call.
            authenticateCallback(server, database, user, password, authSuccessCallback, authErrorCallback);
        };
        loginClickHandler = debounce(loginClickHandler);
        loginButton.addEventListener("click", loginClickHandler, false);

        let authenticateManager = authCallback => {
            authenticateCallback = authCallback;
            if (demoCredentials && shouldAutoLoginDemo) {
                setLoginForm(...Object.values(demoCredentials));
                shouldAutoLoginDemo = false;

                appState.setShouldAutoLoginDemo(false);
                // Add small delay so that user can see that they are being logged in.
                setTimeout(() => loginButton.click(), 500);
            } else if (!serverInput.value) {
                const prevLoginInfoStr = localStorage.getItem('prevLoginInfo');
                if (prevLoginInfoStr) {
                    try {
                        const prevLoginInfo = JSON.parse(prevLoginInfoStr);
                        setLoginForm(...Object.values(prevLoginInfo));
                    } catch (e) {
                        console.error(`authenticateManager: Error parsing prevLoginInfoStr: ${prevLoginInfoStr}`);
                    }

                } else {
                    serverInput.value = "my.geotab.com";
                    serverInput.focus();
                }

            }

            showLoginForm();
        };
        const jsEditor = EditorManager("js", "javascript", urlState);
        const cssEditor = EditorManager("css", "css", urlState);
        const htmlEditor = EditorManager("html", "html", urlState);
        appState.editorRef.current['js'] = jsEditor;
        appState.editorRef.current['css'] = cssEditor;
        appState.editorRef.current['html'] = htmlEditor;
        processors.add("js", jsEditor);
        processors.add("css", cssEditor);
        processors.add("html", htmlEditor);

        // Process a search string if there is one. The only use for the search string is to automatically log in a user
        // to a local geotabdemo db. This feature is used by geo-cli so that users can easily open up an api runner
        // for their local geo-cli-managed dbs. It is for internal development uses only and will only work with local dbs.
        let searchString = window.location.search;
        if (searchString) {
            try {
                if (searchString?.startsWith('?')) {
                    searchString = searchString.replaceAll('?', '').replaceAll('\n', '').replaceAll('\\n', '');

                    // Decode the query string if it is base64 encoded.
                    const decodedSearchString = searchString.includes('=') ? searchString : atob(searchString);
                    // The decoded search string should look like this:
                    // server=localhost:10001&database=geotabdemo&username=dawsonmyers@geotab.com&password=passwordpassword
                    console.log(`decodedSearchString: ${decodedSearchString}`);

                    const urlParams = new URLSearchParams(decodedSearchString);

                    const requiredParams = [ 'database', 'username', 'server', 'password' ];
                    const hasRequiredKeys = requiredParams.reduce((result, param) => result && urlParams.has(param));

                    console.log('hasRequiredKeys ' + hasRequiredKeys);

                    if (hasRequiredKeys) {
                        const server = urlParams.get('server');
                        const database = urlParams.get('database');
                        const username = urlParams.get('username');
                        const password = urlParams.get('password').replaceAll('\n', '').replaceAll('\\n', '');

                        // Only use the credentials if they are for local dbs.
                        if (server.includes('localhost') || server.includes('127.0.0.1')) {
                            demoCredentials = { server, database, username, password };
                            appState.setDemoCredentials(demoCredentials);
                            shouldAutoLoginDemo = true;
                            appState.setShouldAutoLoginDemo(true);
                            console.log(demoCredentials);
                        } else {
                            console.error('Auto-login only works for dbs on the local machine.');
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
        processors.add("ui", uiManager(github, api, urlState, self));
        appState.setUrlState(urlState);
        api.setDefaultHandlers(processors.console.log, processors.console.error);
        render();

        document.getElementById("run").addEventListener("click", run, false);
        document.getElementById("clear").addEventListener("click", () => {
            processors.console.clear();
            processors.output.clear();
        }, false);
    };

    function debounce(func, timeout = 100) {
        let timeoutId = -1;
        return args => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(args), timeout);
        };
    }

    APIRunner();
};

