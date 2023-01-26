import React from 'react';

const EditorOutput = ({appState}) => {
    return (
        <div id="pane-output" className={"pane pane-item " + (appState.paneToggleButtonStates.output ? '' : 'hidden')}>
            <small className="pane-header">Output</small>
            <div className="source" id="output"/>
        </div>
    );
};

export default EditorOutput;