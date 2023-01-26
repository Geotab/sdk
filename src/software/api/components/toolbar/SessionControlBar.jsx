import React from 'react';
import Chip from "@mui/material/Chip";
import { Tooltip } from "@mui/material";

const SessionControlBar = ({ appState }) => {
    return (
        <div hidden={!appState.userLabel}>
            <Chip id="userLabel" label={appState.userLabel} color="success" variant="filled" sx={{ margin: '5px', fontSize: '0.75rem' }}/>
            <Tooltip title="Log out of the current session">
                <Chip id="logoutButton" label="Log out" variant="outlined" onClick={appState.logoutCallback} sx={{ boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }}/>
            </Tooltip>
        </div>
    );
};

export default SessionControlBar;
