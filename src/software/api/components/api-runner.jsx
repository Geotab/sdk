import {Toolbar} from './toolbar'
import EditorManager from "./editor/editor-manager";
import DialogManager from "./dialogs/dialog-manager";

// export default function ApiRunner(props) {
//     return (
//         <div className="api">
//            
//         </div>
//     )
//    
// }

import React, {Component} from 'react';

class Runner extends Component {
    render() {
        return (
            <div className="api">
                <Toolbar/>
                <EditorManager/>
                <DialogManager/>
            </div>
        );
    }
}

export default Runner;