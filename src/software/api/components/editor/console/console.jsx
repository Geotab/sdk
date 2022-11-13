import React from 'react';

export default function Console(props) {
    return (
        <div className="pane" id="pane-console">
            <small className="pane-header">Console</small>
            <div id="console" className="console" />
        </div>
    );
}
