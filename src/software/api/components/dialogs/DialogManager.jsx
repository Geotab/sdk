import React from 'react';

export default function DialogManager({ appState }) {
    return (
        <>
            <div className="login" id="login" style={{ display: 'none' }}>
                <div className="overlay"/>
                <form className="dialog " id="loginDialog" autoComplete="on" style={{ top: 'calc(50% - 264px)' }}>
                    <div className="form-group">
                        <label htmlFor="server">Server</label>
                        <input type="text" className="form-control" id="server" placeholder="Server name" autoComplete="on"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="database">Database</label>
                        <input type="text" className="form-control" id="database" placeholder="The database name" autoComplete="on"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="user">Email</label>
                        <input type="text" className="form-control" id="user" placeholder="Your email address" autoComplete="on"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" autoComplete="off"/>
                    </div>
                    <div className="invalid-feedback" id="loginError" style={{ display: 'none', marginBottom: '0.5rem' }}>
                        Invalid user name or password
                    </div>
                    <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button className="btn btn-primary" id="loginButton">Log in</button>
                        <img id="loginSpinner" src="../../assets/images/pulse2.svg" style={{ display: 'none', border: 'none', width: '2.5rem' }} alt="login spinner"/>
                    </div>
                </form>
            </div>
            <div className="login" id="loggedUser" style={{ display: 'none' }}>
                <div className="overlay"/>
                <div className="dialog">
                    <div className="line">
                            <span className="geotabLabel">You're logged in as <span className="username" id="loggedUserName">dmitry.radyno@gmail.com (geotabdemo)</span>.<br/>
                              Are you sure that you want to run samples using this account?</span>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-secondary mb-2 mr-sm-2 mb-sm-0" id="cancel">No. Log out</button>
                        <button className="btn btn-primary mb-2 mr-sm-2 mb-sm-0" id="confirm">Yes</button>
                    </div>
                </div>
            </div>
            <div className="login" id="shareDialog" style={{ display: 'none' }}>
                <div className="overlay"/>
                <div className="dialog">
                    <div className="line">
                        <span className="geotabLabel">Here is a link to your sample:<br/> <span className="gray">(Internet Explorer may face an issue with opening this link)</span></span>
                    </div>
                    <div className="line">
                        <textarea id="shareTextarea" defaultValue={""}/>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button onClick={shareDoneButtonClicked} className="btn btn-primary" id="shareDone">Done</button>
                    </div>
                </div>
            </div>
            <div className="login" id="securityDialog" style={{ display: 'none' }}>
                <div className="overlay"/>
                <div className="dialog">
                    <div className="line">
                        <span className="geotabLabel">Security warning!</span>
                    </div>
                    <div className="line">
                            <span className="geotabText">
                              External samples are disabled in your browser for security reasons.<br/>
                              Please, try to open the link in another browser.
                            </span>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" id="securityOk">OK</button>
                    </div>
                </div>
            </div>
        </>

    );

    function shareDoneButtonClicked() {
        const shareDialog = document.getElementById("shareDialog"),
            shareTextarea = document.getElementById("shareTextarea");
        shareDialog.style.display = "none";
        shareTextarea.value = "";
    }
}
