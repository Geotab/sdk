import Toolbar from './toolbar';
import EditorManager from "./editor/EditorManager";
import DialogManager from "./dialogs/DialogManager";
import ApiRunnerCore from "../runner";

import React, { useEffect, useRef, useState } from 'react';
import { editorModeKey, localStorageUtils, toggleButtonStatesJsOnlyKey, toggleButtonStatesKey } from "../utils";
import NotificationHost from './alerts/NotificationHost';

export default function Runner() {
    const appState = createAppState();
    window.appState = appState;

    useEffect(() => {
        initHotKeys();
        ApiRunnerCore();
    }, []);

    return (
        <div className="api">
            <Toolbar appState={appState}/>
            <EditorManager appState={appState}/>
            <DialogManager appState={appState}/>
            <NotificationHost appState={appState}/>
        </div>
    );
}

const createAppState = () => {
    const [ userLabel, setUserLabel ] = useState('');
    const [ showLogoutButton, setShowLogoutButton ] = useState(false);
    const [ logoutCallback, setLogoutCallback ] = useState();
    const [ showShareDialog, setShowShareDialog ] = useState(false);
    const [ showLoginDialog, setLoginDialog ] = useState(false);
    const [ showSecurityDialog, setSecurityDialog ] = useState(false);
    const [ demoCredentials, setDemoCredentials ] = useState(null);
    const [ shouldAutoLoginDemo, setShouldAutoLoginDemo ] = useState(false);
    const [ loginFormHasBeenShown, setLoginFormHasBeenShown ] = useState(false);
    const [ paneToggleButtonStates, setPaneToggleButtonStates ] = useState(getPreviousToggleButtonState());
    const [ panelStates, setPanelStates ] = useState({ left: true, right: true, selectedEditorId: '' });
    const [ urlState, setUrlState ] = useState({ saveState: () => {} });
    const [ selectedEditorId, setSelectedEditorId ] = useState('');
    const [ jsOnly, setJsOnly ] = useState('');
    const jsOnlyRef = useRef(false);
    const editorRef = useRef({});
    const paneToggleButtonStatesRef = useRef({});
    const currentNotificationRef = useRef();
    const notificationServiceRef = useRef();
    const [ savedConfigs, setSavedConfigs ] = useState(localStorageUtils.getSavedConfigs());
    const [ unsavedEditorChanges, setUnsavedEditorChanges ] = useState(false);
    const [ showNotification, setShowNotification ] = useState(false);
    const [ editors, setEditors ] = useState({ javascript: {}, css: {}, html: {} });
    const [ currentConfigName, setCurrentConfigName ] = useState('');
    const [ darkMode, setDarkMode ] = useState(localStorageUtils.getObject('api-runner-dark-mode') || false);

    // Shows toast notifications.
    notificationServiceRef.current = {
        add(notification) {
            if (!notification) return;
            currentNotificationRef.current = notification;
            setShowNotification(true);
        }
    };

    return {
        userLabel, setUserLabel,
        showLogoutButton, setShowLogoutButton,
        logoutCallback, setLogoutCallback,
        showShareDialog, setShowShareDialog,
        showLoginDialog, setLoginDialog,
        showSecurityDialog, setSecurityDialog,
        demoCredentials, setDemoCredentials,
        shouldAutoLoginDemo, setShouldAutoLoginDemo,
        loginFormHasBeenShown, setLoginFormHasBeenShown,
        paneToggleButtonStates, setPaneToggleButtonStates,
        panelStates, setPanelStates: setPanelStates,
        urlState, setUrlState,
        editors, setEditors: setHelper(setEditors),
        selectedEditorId, setSelectedEditorId,
        jsOnly, setJsOnly,
        savedConfigs, setSavedConfigs,
        unsavedEditorChanges, setUnsavedEditorChanges,
        showNotification, setShowNotification,
        currentConfigName, setCurrentConfigName,
        currentNotificationRef: refHelper(currentNotificationRef),
        notificationService: refHelper(notificationServiceRef, true),
        paneToggleButtonStatesRef: refHelper(paneToggleButtonStatesRef),
        editorRef,
        jsOnlyRef,
        darkMode, setDarkMode
    };

    function getPreviousToggleButtonState() {
        const mode = localStorage.getItem(editorModeKey);
        const key = mode === 'js-only'
                    ? toggleButtonStatesJsOnlyKey
                    : toggleButtonStatesKey;
        return localStorageUtils.getObject(key) || { js: true, css: false, html: false, console: true, output: false, jsOnly: false };
    }

    function setHelper(setter) {
        return (key, value) => {
            setter((prevState) => {
                if (typeof key === 'string') {
                    const newStateObj = { ...prevState };
                    newStateObj[key] = value;
                    return newStateObj;
                }
                return { ...prevState, ...key };
            });
        };
    }

    function refHelper(ref, readOnly) {
        return (value) => {
            if (value === undefined) {
                return ref.current;
            }
            !readOnly && (ref.current = value);
        };
    }
};

function initHotKeys() {
    const runButton = document.getElementById("run");
    document.body.addEventListener("keydown", e => {
        const keyCode = e.which,
            isCtrl = e.ctrlKey || false;

        // ignore Ctrl + S
        if (keyCode === 83 && isCtrl) {
            e.preventDefault();
        }
        if (e.key === "Enter" && isCtrl) {
            e.preventDefault();
            runButton?.click();
        }
    }, false);
}
