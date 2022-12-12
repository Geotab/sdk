import React, { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { actions } from './SaveControls';

const SaveAsDialog = ({ open, onClose, isRenaming, defaultValue }) => {
    const [ inputErrorState, setInputErrorState ] = useState(false);
    const [ helperTextState, setHelperTextState ] = useState('');
    const [ value, setValue ] = useState('');
    const configNameInputRef = useRef();
    const textFieldRef = useRef();
    const createRef = useRef();
    const createConfigTitleText = 'Create Configuration';
    const createConfigText = 'Save the current editor code as a named configuration. Once saved, you can restore a configuration later by through the Load Configuration menu (accessible via the Load button).';
    const renameConfigTitleText = 'Rename Configuration';
    const renameConfigText = 'Enter the new name for the configuration.';

    useEffect(() => {
        setValue(defaultValue);
    }, [ defaultValue ]);

    const handleClose = ok => debounce((e, reason) => {
        const name = configNameInputRef.current.value;
        setValue('')
        configNameInputRef.current.value = '';
        if (ok && isRenaming) {
            onClose(name, actions.RENAME);
        }
        if (!ok || reason) {
            onClose();
            return;
        }
        if (inputErrorState) {
            return;
        }
        if (!name) {
            setInputErrorState(true);
            setHelperTextState('Name cannot be empty');
            configNameInputRef.current?.focus();
            return;
        } else {
            setHelperTextState('');
        }

        ok && onClose(name) || onClose();
        configNameInputRef.current.value = '';
    });
    return (
        <div>
            <Dialog open={open} onClose={handleClose(false)}>
                <DialogTitle>{isRenaming ? renameConfigTitleText : createConfigTitleText}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {isRenaming ? renameConfigText : createConfigText}
                    </DialogContentText>
                    <TextField
                        ref={textFieldRef}
                        inputRef={configNameInputRef}
                        autoFocus
                        required
                        margin="dense"
                        id="new-config-name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        helperText={helperTextState}
                        error={inputErrorState}
                        onKeyDown={debounce(onKeyDown)}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose(false)}>Cancel</Button>
                    <Button ref={createRef} onClick={handleClose(true)} disabled={inputErrorState}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    function onKeyDown(e) {
        const value = configNameInputRef.current.value;
        if (value.match(/[^a-zA-Z0-9_.\-\/+&%#= ]/)) {
            setHelperTextState('Names can only contain letters, numbers, spaces, or .-_+&%#=');
            setInputErrorState(true);
            return;
        }
        if (appState.savedConfigs.find(c => c.name === value)) {
            setHelperTextState('Name already used');
            setInputErrorState(true);
            return;
        }
        if (inputErrorState && value) {
            setHelperTextState('');
            setInputErrorState(false);
        }
        if (e.key === 'Enter') {
            createRef.current?.click();
        }
    }
};

export default SaveAsDialog;
