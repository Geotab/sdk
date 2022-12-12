import React, { useRef, useState } from 'react';
import LoadSaveDrawer from "./LoadSaveDrawer";
import SaveAsDialog from "./SaveAsDialog";
import { localStorageUtils, unsavedEditorChangesKey, getSaveNameFromHash } from "../../utils";
import { Tooltip } from '@mui/material';

export const actions = { LOAD: 'load', DELETE: 'delete', RENAME: 'rename' };

export default function SaveControls({ appState }) {
    const [ drawerState, setDrawerState ] = useState(false);
    const [ saveAsDialogState, setSaveAsDialogState ] = useState(false);
    const [ isRenaming, setIsRenaming ] = useState(false);
    const [ previousConfigName, setPreviousConfigName ] = useState('');
    const currentConfig = useRef();
    const toggleDrawer = open => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerState(open);
    };
    return (
        <>
            <div className="btn-group my-2 mr-sm-2" id="save-controls">
                <Tooltip title={`Save changes to configuration: ${appState.currentConfigName}`}>
                    <button
                        type="button"
                        id="save"
                        onClick={debounce(onSaveClick)}
                        data-toggle="button"
                        aria-pressed="false"
                        className="btn"
                        hidden={!(appState.unsavedEditorChanges && getSaveNameFromHash())}
                    >
                        Save
                    </button>
                </Tooltip>
                <Tooltip title="Create a saved configuration">
                    <button
                        type="button"
                        id="save-as"
                        onClick={onSaveAsClick}
                        data-toggle="button"
                        aria-pressed="false"
                        className={"btn " + (!appState.unsavedEditorChanges || !getSaveNameFromHash() ? ' btn-group-left-radius' : '')}
                    >
                        Save As
                    </button>
                </Tooltip>
                <Tooltip title="Load a saved configuration">
                    <button
                        type="button"
                        id="load"
                        onClick={toggleDrawer(true)}
                        data-toggle="button"
                        aria-pressed="false"
                        className="btn"
                    >
                        Load
                    </button>
                </Tooltip>
                <LoadSaveDrawer
                    appState={appState}
                    open={drawerState}
                    onClose={onCloseDrawer}
                />
            </div>
            <SaveAsDialog
                open={saveAsDialogState}
                onClose={onSaveAsDialogClose}
                isRenaming={isRenaming}
                defaultValue={previousConfigName}
            />
        </>
    );

    function onCloseDrawer(action, config) {
        if (!config) return;
        switch (action) {
            case actions.DELETE:
                deleteConfig(config);
                break;
            case actions.LOAD:
                appState.setUnsavedEditorChanges(false);
                localStorageUtils.setObject(unsavedEditorChangesKey, false);
                loadConfig(config);
                setDrawerState(false);
                break;
            case actions.RENAME:
                setIsRenaming(true);
                setSaveAsDialogState(true);
                setPreviousConfigName(config.name);
                currentConfig.current = config;
                break;
            default:
                setDrawerState(false);
        }
    }

    function onSaveAsDialogClose(name, reason) {
        setPreviousConfigName('');
        setSaveAsDialogState(false);
        if (reason && reason === actions.RENAME && typeof name === 'string' && currentConfig.current?.name) {
            setIsRenaming(false);
            const oldName = currentConfig.current.name;
            currentConfig.current = null;
            renameConfiguration(oldName, name);
            return;
        }
        if (reason || !name || typeof name !== 'string' || drawerState) {
            return;
        }

        createConfiguration(name);
    }

    function loadConfig(config) {
        window.location.hash = `load-save:${encodeURI(config.name)}`;
    }

    function deleteConfig(config) {
        const filteredConfigs = appState.savedConfigs.filter(c => c.name !== config.name);
        localStorageUtils.setSavedConfigs(filteredConfigs);
        appState.setSavedConfigs(filteredConfigs);
        appState.notificationService().add({ message: 'Configuration deleted' });
        getSaveNameFromHash() && (location.hash = '');
    }

    function onSaveClick() {
        appState.setUnsavedEditorChanges(false);
        localStorageUtils.setObject(unsavedEditorChangesKey, false);
        let name = getSaveNameFromHash();

        if (!name) {
            console.error('SaveControls.onSaveClick: can\'t save config');
            appState.notificationService().add({ message: `Configuration ${name} cannot be empty`, severity: 'error' });
            return;
        }
        // name = name.replace('save:', '');
        const configs = appState.savedConfigs;
        if (!configs.find(c => c.name === name)) {
            console.error(`createConfiguration: configuration ${name} does not exist`);
            appState.notificationService().add({ message: `Configuration ${name} does not exist`, severity: 'error' });
            return;
        }
        try {
            saveConfig(name, configs);
        } catch (e) {
            console.error('onSaveClick: Failed to save config: ', name, e);
            appState.notificationService().add({ message: `Failed to save config ${name}`, severity: 'error' });
            return;
        }
        appState.notificationService().add({ message: 'Configuration saved!' });
    }

    function saveConfig(name, configs) {
        // Remove the existing configuration (if it exists).
        const filteredConfigs = configs.filter(c => c.name !== name);
        const editorState = Object.keys(appState.editors).reduce((state, name) => {
            state[name] = appState.editors[name].getValue();
            return state;
        }, {});

        const config = {
            name,
            id: new Date().getTime(),
            jsOnly: appState.jsOnlyRef.current || false,
            toggleStates: appState.paneToggleButtonStates,
            editorState
        };

        filteredConfigs.push(config);
        localStorageUtils.setSavedConfigs(filteredConfigs);
        appState.setSavedConfigs(filteredConfigs);
        appState.urlState.saveState();
    }

    function onSaveAsClick() {
        setPreviousConfigName('');
        setSaveAsDialogState(true);
    }

    function renameConfiguration(oldName, newName) {
        let configs = appState.savedConfigs;
        const oldConfig = configs.find(c => c.name === oldName);
        let index = configs.indexOf(oldConfig);
        configs = configs.filter(c => c.name !== oldName);
        if (!oldConfig) {
            console.error('renameConfiguration: Old config not found: ' + name);
            return;
        }
        const newConfig = {
            ...oldConfig,
            modified: new Date().getTime(),
            name: newName
        };
        if (index > -1) {
            configs.splice(index, 0, newConfig);
        } else {
            configs.push(newConfig);
        }
        localStorageUtils.setSavedConfigs(configs);
        appState.setSavedConfigs(configs);
        const currentSave = getSaveNameFromHash();
        if (currentSave && currentSave === oldName) {
            window.location.hash = `save:${encodeURI(newName)}`;
        }
        appState.notificationService().add({ message: `Configuration renamed!` });
    }

    function createConfiguration(name) {
        const configs = appState.savedConfigs;
        if (configs.find(c => c.name === name)) {
            console.error('createConfiguration: duplicate configuration: ' + name);
            return;
        }
        try {
            saveConfig(name, configs);
        } catch (e) {
            console.error('createConfiguration: Failed to save config: ', name, e);
            appState.notificationService().add({ message: `Failed to save config ${name}`, severity: 'error' });
            return;
        }
        window.location.hash = `load-save:${encodeURI(name)}`;
        appState.notificationService().add({ message: `New configuration saved!` });
    }
};
