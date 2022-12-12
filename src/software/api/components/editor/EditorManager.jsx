import React, { useEffect, useRef, useState } from 'react';
import Console from './console/Console';
import EditorOutput from "./output/EditorOutput";
import Split from "react-split";
import { debounce, selectedEditorIdKey } from '../../utils';

export default function EditorManager({ appState }) {
    const togState = appState.paneToggleButtonStates;
    const jsRef = useRef();
    const cssRef = useRef();
    const htmlRef = useRef();
    const consoleRef = useRef();
    const jsHeaderRef = useRef();
    const cssHeaderRef = useRef();
    const htmlHeaderRef = useRef();
    const paneHolderRef = useRef();
    const [ prevContentSizes, setPrevContentSizes ] = useState(getPreviousPanelSizes('content'));
    const [ prevLeftPanelSizes, setPrevLeftPanel ] = useState(getPreviousPanelSizes('pane-left'));
    const [ prevRightPanelSizes, setPrevRightPanelSizes ] = useState(getPreviousPanelSizes('pane-right'));

    // This useEffect is used to conditionally hide the pane drag handle gutters based on which panes are visible.
    useEffect(() => {
        if (!jsRef.current) return;
        if (togState.js) {
            if (togState.css) {
                showGutter(jsRef.current?.nextElementSibling);
            } else {
                if (togState.html)
                    showGutter(jsRef.current?.nextElementSibling);
                else
                    hideGutter(jsRef.current?.nextElementSibling);
            }
        } else {
            hideGutter(jsRef.current?.nextElementSibling);
        }

        if (togState.css) {
            if (togState.html) {
                showGutter(cssRef.current?.nextElementSibling);
            } else {
                hideGutter(cssRef.current?.nextElementSibling);
            }
        } else {
            hideGutter(cssRef.current?.nextElementSibling);
        }

        if (togState.output && togState.console)
            showGutter(consoleRef.current.nextElementSibling);
        else
            hideGutter(consoleRef.current.nextElementSibling);
    }, [ togState ]);

    function boolToNumber(val) {
        return val ? 1 : 0;
    }

    useEffect(() => {
        if (appState.paneToggleButtonStates.jsOnly)
            localStorage.setItem('selectedEditorId', appState.selectedEditorId);
    }, [ appState.selectedEditorId ]);

    function updateVisiblePane(enabled, id, parentId = 'pane-left') {
        if (!id) return;
        const parent = document.getElementById(parentId);
        const pane = document.getElementById(id);
        if (enabled) {
            if (pane.parentElement.id === parentId) {
                return;
            }
            if (id === 'pane-js') {
                paneHolderRef.current.prependChild(pane);
            }
            if (id === 'pane-css') {
                if (togState.js) {
                    jsRef.current.insertAdjacentElement('afterend', pane);
                } else
                    parent.prependChild(pane);
            }
            if (id === 'pane-html') {
                parent.appendChild(pane);
            }
        } else {
            if (pane.parentElement.id === paneHolderRef.current.id) {
                return;
            }
            parent.removeChild(pane);
            paneHolderRef.current.appendChild(pane);
        }
    }

    return (
        <div className="content">
            <Split
                className="resize-container-row"
                sizes={prevContentSizes}
                minSize={20}
                expandToMin={false}
                gutterSize={10}
                gutterAlign="center"
                snapOffset={20}
                dragInterval={1}
                direction="horizontal"
                cursor="col-resize"
                onDragEnd={onDragEndHandler('content')}
            >
                <Split
                    id="pane-left"
                    className="resize-container-col pane noborder"
                    sizes={prevLeftPanelSizes}
                    hidden={!togState.js && !togState.css && !togState.html}
                    minSize={20}
                    expandToMin={false}
                    gutterSize={10}
                    gutterAlign="center"
                    // gutterStyle={() => ({display: 'flex'})}
                    snapOffset={20}
                    dragInterval={1}
                    direction="vertical"
                    cursor="row-resize"
                    onDragEnd={onDragEndHandler('pane-left')}
                >
                    <div id="pane-js"
                         ref={jsRef}
                         className={`editor pane-item${togState.js ? '' : ' hidden'}`}
                         onFocus={onFocusIn('pane-js')}
                    >
                        <small ref={jsHeaderRef}
                               className={`pane-header${appState.jsOnly && appState.selectedEditorId === 'pane-js' ? ' selected' : ''}`}
                        >
                            {appState.jsOnly ? 'JS 1' : 'JS'}
                        </small>
                        <div className="pane-content" id="js"/>
                    </div>
                    <div id="pane-css"
                         ref={cssRef}
                         className={`editor pane-item${togState.css ? '' : ' hidden'}`}
                         onFocus={onFocusIn('pane-css')}
                    >
                        <small
                            ref={cssHeaderRef}
                            className={`pane-header${appState.jsOnly && appState.selectedEditorId === 'pane-css' ? ' selected' : ''}`}
                        >
                            {appState.jsOnly ? 'JS 2' : 'CSS'}
                        </small>
                        <div className="pane-content" id="css"/>
                    </div>
                    <div id="pane-html"
                         ref={htmlRef}
                         className={`editor pane-item${togState.html ? '' : ' hidden'}`}
                         onFocus={onFocusIn('pane-html')}
                    >
                        <small
                            ref={htmlHeaderRef}
                            className={`pane-header${appState.jsOnly && appState.selectedEditorId === 'pane-html' ? ' selected' : ''}`}
                        >
                            {appState.jsOnly ? 'JS 3' : 'HTML'}
                        </small>
                        <div className="pane-content" id="html"/>
                    </div>
                </Split>
                <Split
                    id="pane-right"
                    className="pane noborder resize-container-row"
                    sizes={prevRightPanelSizes}
                    hidden={!togState.console && !togState.output}
                    minSize={20}
                    gutterSize={10}
                    gutterAlign="center"
                    snapOffset={20}
                    dragInterval={1}
                    direction="horizontal"
                    cursor="col-resize"
                    onDragEnd={onDragEndHandler('pane-right')}
                >
                    <Console innerRef={consoleRef} appState={appState}/>
                    <EditorOutput appState={appState}/>
                </Split>
            </Split>
        </div>
    );

    function onFocusIn(id) {
        return debounce((e) => {
            if (appState.jsOnlyRef.current && id) {
                localStorage.setItem(selectedEditorIdKey, id);
                appState.setSelectedEditorId(id);
            }
        });
    }

    function getResizeId(id) {
        let sampleId = location.hash ? ('-' + location.hash.substring(1)) : '';
        return `api-runner-pane-sizes-${id}${sampleId}${appState.jsOnlyRef.current ? '-js-only' : ''}`;
    }

    function onDragEndHandler(containerId, sizes) {
        const key = getResizeId(containerId);
        return (sizes) => {
            areSizesValid(sizes) && localStorage.setItem(key, JSON.stringify(sizes));
        };
    }

    function getPreviousPanelSizes(containerId) {
        const key = getResizeId(containerId);
        let sizes;
        try {
            sizes = JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error(`getPreviousPanelSizes: Invalid panel sizes in localStorage: ${sizes}`);
        }
        sizes = areSizesValid(sizes) ? sizes : null;
        return sizes;
    }

    function areSizesValid(sizes) {
        return !(!sizes || !sizes.length || sizes?.filter(n => typeof n !== 'number' || n < 0).length);
    }

    function hideGutter(elem) {
        elem.style.display = 'none';
        elem.classList.add('hide-before-and-after');
    }

    function showGutter(elem) {
        elem.style.display = 'flex';
        elem.classList.remove('hide-before-and-after');
    }
}
;

