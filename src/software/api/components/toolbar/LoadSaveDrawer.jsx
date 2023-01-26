import React, { useRef, useState } from 'react';
import { Avatar, Divider, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import DoneIcon from '@mui/icons-material/Done';
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import Chip from '@mui/material/Chip';
import ConfigurationMenu from './ConfigurationMenu';
import { actions } from './SaveControls';
import { getSaveNameFromHash, timeSince } from '../../utils';

const LoadSaveDrawer = ({ appState, open, onClose }) => {
    const selectedConfigRef = useRef(null);
    const activeConfigRef = useRef(actions.LOAD);
    const [ currentAction, setCurrentAction ] = useState(actions.LOAD);
    const [ confirmationDialogState, setConfirmationDialogState ] = useState(false);
    const [ configMenuAnchorEl, setConfigMenuAnchorEl ] = useState();
    window.setConfigMenuAnchorEl = setConfigMenuAnchorEl;
    const dialogText = {
        load: {
            title: 'Load Configuration',
            content: 'This will replace the current code in the editors.'
        },
        delete: {
            title: 'Delete Configuration',
            content: 'This will permanently delete the selected configuration.'
        }
    };

    function showConfirmationDialog(action, config) {
        selectedConfigRef.current = config;
        setCurrentAction(action);
        setConfirmationDialogState(true);
    }

    function showConfirmationDialogHandler(action, config) {
        return debounce((e) => showConfirmationDialog(action, config));
    }

    function onConfirmationDialogClose(ok, reason) {
        setConfirmationDialogState(false);
        if (ok && !reason) {
            onClose(currentAction, selectedConfigRef.current);
        }
        selectedConfigRef.current = null;
    }

    function getSecondaryText(config) {
        let txt = config.id ? `Created: ${timeSince(config.id)}` : null;
        if (config.jsOnly) {
            return (<span>{txt} <Chip size={'small'} component={'span'} variant={'outlined'} sx={{ fontSize: '0.6rem', height: 20 }} label={'JS Only'}/></span>);
        }
        return txt;
    }

    function onConfigMenuClose() {
        return debounce(action => {
            if (typeof action === 'string') {
                const config = activeConfigRef.current;
                if (typeof action === 'object' || typeof action === 'undefined' || !config) return;
                setConfigMenuAnchorEl(null);
                if (action === actions.DELETE) {
                    showConfirmationDialog(actions.DELETE, config);
                    return;
                } else {
                    activeConfigRef.current = null;
                    onClose(action, config);
                }
            }
            // Ignore close events from list item buttons (since these buttons are what open the menu).
            if (action?.target?.closest(".MuiListItem-root .MuiListItemSecondaryAction-root")) {
                return;
            }
            setConfigMenuAnchorEl(null);
        });
    }

    function onConfigMenuClick(config) {
        return debounce(e => {
            activeConfigRef.current = config;
            setConfigMenuAnchorEl(e.target);
        });
    }

    return (
        <>
            <Drawer
                id="loadSaveDrawer"
                anchor="right"
                open={open}
                onClose={onClose}
                disableEnforceFocus={true}
                onClick={onConfigMenuClose()}
            >
                <Typography
                    fontSize={32}
                    fontWeight={500}
                    sx={{ paddingLeft: 6 }}
                    px={6}
                >
                    Load Configuration
                </Typography>
                <Divider/>
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                >
                    {!appState.savedConfigs?.length
                     ? <ListItem key={0}>There arn't any saved configurations</ListItem>
                     : appState.savedConfigs.sort((a, b) => b.id - a.id).map((config) => (
                            <ListItem
                                key={config.id}
                                alignItems="flex-start"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: appState.currentConfigName === config.name ? '#d1f8cf' :  '#fbfafabf'
                                    },
                                    maxWidth: 700, backgroundColor: appState.currentConfigName === config.name ? '#e9f7e8' : 'white'
                            }}
                                secondaryAction={
                                    <IconButton
                                        id={'btn-' + config.id}
                                        className={'box-shadow'}
                                        onClick={onConfigMenuClick(config)}
                                        edge="end"
                                        aria-label="delete"
                                        sx={{ boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)', marginRight: 0, right: -8 }}
                                    >
                                        <SettingsIcon/>
                                    </IconButton>
                                }
                            >
                                <Tooltip title={'Loads this configuration'}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)', backgroundColor: 'white' }}>
                                            <IconButton
                                                sx={{ marginRight: 0 }}
                                                onClick={showConfirmationDialogHandler(actions.LOAD, config)}
                                                edge="end"
                                                aria-label="load"
                                            >
                                                <DoneIcon/>
                                            </IconButton>
                                        </Avatar>
                                    </ListItemAvatar>
                                </Tooltip>
                                <ListItemText
                                    sx={{ paddingRight: 1 }}
                                    secondaryTypographyProps={{ fontSize: '0.675rem' }}
                                    primary={config.name}
                                    secondary={getSecondaryText(config)}
                                />
                            </ListItem>
                        ))}
                </List>
            </Drawer>
            <ConfigurationMenu
                onClose={onConfigMenuClose()}
                anchorEl={configMenuAnchorEl}
            />
            <ConfirmationDialog
                open={confirmationDialogState}
                onClose={onConfirmationDialogClose}
                title={dialogText[currentAction].title}
                content={dialogText[currentAction].content}
            />
        </>
    );
};

export default LoadSaveDrawer;
