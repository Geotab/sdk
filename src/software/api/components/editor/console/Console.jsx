import React from 'react';

export default function Console({appState, innerRef}) {
    return (
        <div id="pane-console" ref={innerRef} className={"pane pane-item " + (appState.paneToggleButtonStates.console ? '' : 'hidden')}>
            <small className="pane-header">Console</small>
            <div id="console" className="console" />
        </div>
    );
}
