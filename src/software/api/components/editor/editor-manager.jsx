import React from 'react'

export default function EditorManager() {
    return (
        <div className="content">
            <div id="pane-left" className="pane noborder">
                <div className="source">
                    <div id="pane-js" className="editor">
                        <small className="pane-header">JavaScript</small>
                        <div className="pane-content" id="js" />
                    </div>
                    <div id="pane-css" className="editor">
                        <small className="pane-header">CSS</small>
                        <div className="pane-content" id="css" />
                    </div>
                    <div id="pane-html" className="editor last-visible">
                        <small className="pane-header">HTML</small>
                        <div className="pane-content" id="html" />
                    </div>
                </div>
            </div>
            <div className="pane" id="pane-console">
                <small className="pane-header">Console</small>
                <div id="console" className="console" />
            </div>
            <div className="pane" id="pane-output">
                <small className="pane-header">Output</small>
                <div className="source" id="output" />
            </div>
        </div>

    )
};