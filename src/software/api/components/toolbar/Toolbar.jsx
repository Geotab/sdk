import React from 'react';
import { Tooltip } from "@mui/material";
import SessionControlBar from "./SessionControlBar";
import PanelToggleControls from "./PanelToggleControls";
import SaveControls from "./SaveControls";

export default function Toolbar({ appState }) {
    return (
        <div className="toolbar" id="toolbar">
            <div className="form-inline d-flex">
                <div className="mr-sm-2 my-2" id="samplesControl">
                    <i className="select-caret bi bi-caret-down-fill"></i>
                    <label htmlFor="samples" className="sr-only">Samples</label>
                    <select itemType="text" className="custom-select dropdown-menu-dark" id="samples"></select>
                </div>
                <div className="btn-group mr-2 my-2">
                    <Tooltip title="Ctrl + Enter">
                        <button id="run" className="btn btn-primary btn-large">Run</button>
                    </Tooltip>
                    <Tooltip title="Create link to share your code with others">
                        <button id="share" onClick={shareButtonClicked} className="btn btn-secondary">Share</button>
                    </Tooltip>
                    <Tooltip title="Switch between light and dark mode">
                        <button id="darkMode" onClick={darkModeClicked} className="btn btn-secondary">{appState.darkMode ? 'Light' : 'Dark'}</button>
                    </Tooltip>
                    <Tooltip title="Clear the content in the output and console panels">
                        <button id="clear" className="btn btn-secondary">Clear output</button>
                    </Tooltip>
                </div>
            </div>
            <PanelToggleControls appState={appState}/>
            <SaveControls appState={appState}></SaveControls>
            <SessionControlBar appState={appState}/>
        </div>
    );

    function shareButtonClicked() {
        const shareDialog = document.getElementById("shareDialog"),
            shareTextarea = document.getElementById("shareTextarea");
        const url = window.location.href.split("#")[0];
        shareTextarea.value = url + "#" + appState.urlState.getState();
        shareDialog.style.display = "block";
        shareTextarea.focus();
        shareTextarea.select();
    }
    function darkModeClicked() {
        appState.setDarkMode(!appState.darkMode);
        //TODO: Not sure how to trigger editor re-render when React appState changes
        setTimeout(() => {
            appState.editorRef.current.js.render();
        }, 0);
    }
};

