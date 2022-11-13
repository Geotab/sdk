import React from 'react'
import SessionSelector from "../session/session-selector"
export default function Toolbar(props) {
    return (
        <div className="toolbar" id="toolbar">
            <div className="form-inline d-flex">
                <div className="form-group mb-2 mr-sm-2 mb-sm-0" id="samplesControl">
                    <label htmlFor="samples" className="sr-only">Samples</label>
                    <select itemType="text" className="custom-select" id="samples"></select>
                </div>

                <div className="btn-group mr-1">
                    <button id="run" className="btn btn-primary btn-large">Run</button>
                    <button id="share" className="btn btn-secondary">Share</button>
                    <button id="clear" className="btn btn-secondary">Clear output</button>
                </div>
                <div className="btn-group mb-2 mr-sm-2 mb-sm-0" id="toggle">
                    <button type="button" id="toggle-js" className="btn btn-light" data-toggle="button" aria-pressed="false">JS</button>
                    <button type="button" id="toggle-css" className="btn btn-light" data-toggle="button" aria-pressed="false">CSS</button>
                    <button type="button" id="toggle-html" className="btn btn-light" data-toggle="button" aria-pressed="false">HTML</button>
                    <button type="button" id="toggle-console" className="btn btn-light" data-toggle="button" aria-pressed="false">Console</button>
                    <button type="button" id="toggle-output" className="btn btn-light" data-toggle="button" aria-pressed="false">Output</button>
                </div>

                <small id="userLabel" className="ml-auto p-2"></small>

                <SessionSelector/>

                {/*<button id="logoutButton" className="btn btn-secondary ml-auto p-2">Log out</button>*/}
            </div>
        </div>
    )
};