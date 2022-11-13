'use strict';
console.log("SESSION_0");
import React from 'react';
import ReactDOM from 'react-dom';
console.log("SESSION");

class SessionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {liked: false};
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }
        return (
            <div className="session-selector dropdown">
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-success">Add</button>
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        dawsonmyers@geotab.com (geotabdemo)
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li className="session-item dropdown-item">Action</li>
                    </ul>
                    {/*<div className="session-item">>*/}
                    {/*    <span className="session-text">Current Session</span>*/}
                    {/*</div>*/}
                    <button type="button" className="btn btn-danger">Remove</button>
                </div>
            </div>
            // <button onClick={() => this.setState({ liked: true })}>
            //     Like
            // </button>
        );
        // return (
        //     <button onClick={() => this.setState({ liked: true })}>
        //         Like
        //     </button>
        // );
    }
}

// const domContainer = document.querySelector('#sessionSelector');
// const root = ReactDOM.createRoot(domContainer);
// root.render(<SessionSelector />);
// window.test = 'tttt';
export default SessionSelector