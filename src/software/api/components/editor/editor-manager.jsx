import React from 'react'
import Console from './console/console'
import EditorOutput from "./output/editor-output";

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
            <Console/>
            <EditorOutput/>
        </div>

    )
};