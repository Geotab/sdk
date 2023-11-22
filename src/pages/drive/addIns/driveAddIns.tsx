import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Page } from "./../../../components";
import { PageTitleProps } from "./../../../components/PageTitle/PageTitle";
import { HeaderSections } from "./../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "./../../../components/TableOfContents/TableOfContents";
import Accordion from "../../../components/Accordion/Accordion";
import CodeSample from "../../../components/CodeSamplesContainer/CodeSample";
import InformationalBox from "../../../components/InformationalBox/InformationalBox";
import driveAddInImage from "./../../../assets/images/driveAddIns/drive-addins_0.png";


const overview: ReactNode =
    <div className="paragraph" id="drive-overview">
        <p>The MyGeotab Add-In structure can be applied to the Geotab Drive application as well, providing you the ability to extend the functionality for drivers in an environment with sensors (e.g. geolocation and acceleration) and actuators (e.g. voice alerts and notifications). This environment must also be completely operable in an offline state — so your Add-In must be able to handle having no internet connection, or sleeping in the background of the mobile device.</p>
        <p>Please read the <Link to="/myGeotab/addIns/developingAddIns">Developing Add-Ins</Link> guide first before attempting a Geotab Drive Add-In.</p>
        <p>All Add-Ins that have been designed to work with MyGeotab will work on the Geotab Drive app as well. Your Add-In will be completely downloaded for all referenced links, images, and scripts upon user login. This way, as the user is authenticated over the internet — they will have your Add-In with them as they travel or disconnect from the network. If your Add-In requires dynamic loading of CSS, images, or JavaScript — these requests will fail if the user does not have a network connection. As such you should either: include all dependencies on creation of the Add-In, explicitly link to them, or provide a fallback if <strong>state.online</strong> returns False. Geotab Drive Add-Ins will also display differently, on both the dashboard and the menu.</p>
        <img src={driveAddInImage} alt="Drive dashboard" />
        <p>To make an Add-In on the Geotab Drive app, the <strong>item</strong> in your configuration file must have a <strong>path</strong> that equals "<strong>DriveAppLink/</strong>" (including a trailing forward slash). The menuName, url, and version will remain unchanged. For example:</p>
        <h2>Listing 1 — Geotab Drive "Item" Configuration</h2>
        <CodeSample
            language="json"
            code={`"items": [{
    "version": "1.0",
    "url": "addinFile.html",
    "path": "DriveAppLink/",
    "menuName": {
        "en": "English Label",
        "fr": "French Label"
    }
}]`} />
        <InformationalBox>
            <p>The array of <strong>items</strong> also allows you to have one link item in MyGeotab, and another link item to Geotab Drive</p>
        </InformationalBox>
        <p>There are also 2 additional properties that are optional for the configuration file that control the availability to additional page lifecycle methods, <em>onStartup</em> and <em>onShutdown</em>. These configuration properties are boolean, they can be set to <em>true</em> if they are to be used and <em>false</em> when not in use. By default these 2 properties will be set to false if not included in the configuration file.</p>
        <ol>
            <li><p><strong>onStartup:</strong> Startup Add-Ins are executed when a driver logs in to the Drive App for the first time.</p></li>
            <li><p><strong>onShutdown:</strong> The onShutdown property must be set to true to execute an Add-In when logging out of Geotab Drive.</p></li>
        </ol>
        <InformationalBox>
            <p>More information about these 2 methods can be found in this {" "}
                <a href="https://docs.google.com/document/d/1-r9o9epj61WMmGxRveA9SXR86lQGHcxgMh8lsVXGL54/edit?usp=sharing" target="_blank"
                    rel="noopener noreferrer"
                    aria-label="">document</a>
                .</p>
        </InformationalBox>
        <p>e.g.</p>
        <CodeSample
            language="json"
            code={`{
    "name": "addin-name",
    "supportEmail": "mysupport@support.com",
    "version": "1.0.0",
    "items": [{
        "url": "index.html",
        "path": "DriveAppLink/",
        "menuName": {
            "en": "Add-in"
        },
        "icon": "images/icon.svg"
    }, {
        "url": "myGeotabConfigurationPage.html",
        "path": "AdministrationLink/",
        "menuName": {
            "en": "Add-in Configurations"
        },
        "icon": "images/icon.svg"
    }],
    "onStartup": true,
    "onShutdown": true
}`} />
    </div >;


const driveLifeCycle: ReactNode =
    <div className="paragraph" id="drive-lifecycle-methods">
        <p>The onStartup and onShutdown properties respectively enable the <strong>startup</strong> and <strong>shutdown</strong> lifecycle methods.</p>
        <h2>Startup</h2>
        <p>When the dashboard page is visible, the startup method is only called once. If the user navigates away from the page then navigates back, the startup method is not called again. If the Add-In requires re-initialization, the user must either log out and log in again, or refresh the application.</p>
        <CodeSample
            language="javascript"
            code={`startup: function (freshApi, freshState, initializeCallback) {
    // Code that needs to be executed on dashboard should go here
    initializeCallback();
}`} />
        <h2>Shutdown</h2>
        <p>Shutdown Add-Ins are executed when the final driver logs out of the Drive App. If there are co-drivers, and one of the co-drivers logs out (while other drivers remain logged in to the Drive App), the shutdown Add-In is not executed.</p>
        <p>Additionally, the Add-In is expected to return a promise since shutdown Add-Ins have a 15-second time limit to perform their function before the Add-Ins time out and the logout process is completed. The time limit prevents the application from freezing in the middle of the logout process as a result of faulty Add-Ins.</p>
        <CodeSample
            language="javascript"
            code={`shutdown: function (api, state, callback) {
    return new Promise(resolve => {
        // Do work, make any api calls etc
        resolve() // eventually need to call this somewhere so the promise resolves
    });
}`} />
    </div>;


const apiAndState: ReactNode =
    <div className="paragraph" id="drive-api-and-state">
        <p>Inside the Geotab Drive app, we provide the same <em>api</em> and <em>state</em> properties for your initialize method that we do for our normal Add-Ins. In addition to this, we provide you with properties and methods to allow access to mobile device sensors/actuators. See Table 1 below for a list of the properties and methods provided.</p>
        <h2>Table 1 — Geotab Drive Additional Properties And Methods</h2>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Description</th>
                        <th>Parameters</th>
                        <th>Return Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>api.mobile.exists()</td>
                        <td>Returns <code className="small-code-sample">true</code> if Geotab Drive is running within a native application, and <code className="small-code-sample">false</code> if just as a HTML5 web application</td>
                        <td>None</td>
                        <td>Boolean</td>
                    </tr>
                    <tr>
                        <td>api.mobile.getVersion()</td>
                        <td>If <code className="small-code-sample">api.mobile.exists()</code>, gets the Geotab Drive version from the native application</td>
                        <td>None</td>
                        <td>String</td>
                    </tr>
                    <tr>
                        <td>api.mobile.speak()</td>
                        <td>If <code className="small-code-sample">api.mobile.exists()</code>, uses the text to speech functionality on the mobile device</td>
                        <td>String</td>
                        <td>Void</td>
                    </tr>
                    <tr>
                        <td>api.mobile.notify()</td>
                        <td>If <code className="small-code-sample">api.mobile.exists()</code>, will add a notification to the top bar of a native operating system Example: <code className="small-code-sample">api.mobile.notify("Fill up your vehicle", "Low on gas")</code></td>
                        <td>String[Message], String[Title], String[Id], [String[JsonData]], [Boolean[Permanent]]</td>
                        <td>Void</td>
                    </tr>
                    <tr>
                        <td>api.mobile.notification.hasPermission()</td>
                        <td>Asynchronously checks the notification permission for the Drive App and returns a promise. e.g. <code className="small-code-sample">notification.hasPermission().then(result ={`>`} console.log(result)).catch(error ={`>`} console.error(error))</code></td>
                        <td>None</td>
                        <td>Promise that resolves with a message object. e.g. Response object <code className="small-code-sample">{`{"id":0, "text":"Message", "title":"Title", "icon":"res://ic_stat_notification", "smallIcon":"res://ic_stat_notification", "priority":1 }`}</code> If notification is not successful it can give the following messages:
                            <ol>
                                <li>Notification permission denied</li>
                                <li>Request notification permission is not supported</li>
                            </ol>
                        </td>
                    </tr>
                    <tr>
                        <td>api.mobile.notification.requestPermission()</td>
                        <td>Checks the notification permission for the Drive App and returns a promise. e.g. <code className="small-code-sample">notification.hasPermission().then((result) ={`>`} console.log('Notification permission: ', result)).catch((error) ={`>`} console.error(error));</code></td>
                        <td>None</td>
                        <td>Promise that resolves with one of the following messages:
                            <ol>
                                <li>Notification permission not granted</li>
                                <li>Notification permission granted</li>
                                <li>Request notification permission is not supported</li>
                            </ol>
                        </td>
                    </tr>
                    <tr>
                        <td>api.mobile.notification.notify()</td>
                        <td>Sends a native notification to the user with the provided title and message. If the application does not yet have notification permission, we will requestNotificationPermission() then notify() if the user granted permission; otherwise, the promise is rejected.</td>
                        <td>message: String, title: String e.g. <code className="small-code-sample">notification.notify(message, title).then(result ={`>`} console.log(result)).catch( error ={`>`} console.error(error))</code></td>
                        <td>Promise that resolves with a message object. e.g. Response object <code className="small-code-sample">{`{"id":0, "text":"Message", "title":"Title", "icon":"res://ic_stat_notification", "smallIcon":"res://ic_stat_notification", "priority":1 }`}</code> If notification is not successful it can give the following messages:
                            <ol>
                                <li>Notification permission denied</li>
                                <li>Request notification permission is not supported</li>
                            </ol>
                        </td>
                    </tr>
                    <tr>
                        <td>api.mobile.notification.update()</td>
                        <td>Allows you to update the content of active notifications. To update active notifications that have not yet been acknowledged, the original notification id -- created at the time the notification is sent -- must be provided. e.g. <code className="small-code-sample">notification.update(message, title, id).then(result ={`>`} console.log(result)).catch(error ={`>`} console.error(error))</code></td>
                        <td>message: String, title: String, id: Integer</td>
                        <td>Void</td>
                    </tr>
                    <tr>
                        <td>api.mobile.notification.cancel()</td>
                        <td>e.g. <code className="small-code-sample">notification.cancel(id).then(result ={`>`} console.log(result)).catch(error ={`>`} console.error(error))</code></td>
                        <td>id: Integer</td>
                        <td>Void</td>
                    </tr>
                    <tr>
                        <td>api.mobile.geolocation</td>
                        <td>A navigator object that is similar to HTML5  <code className="small-code-sample">navigator.geolocation</code> Example:  <code className="small-code-sample">api.mobile.geolocation.getCurrentPosition(function (position) { }, function (error) { }, {`{enableHighAccuracy: true }`})</code></td>
                        <td>None</td>
                        <td>None</td>
                    </tr>
                    <tr>
                        <td>api.mobile.camera.takePicture()</td>
                        <td>If <code className="small-code-sample">api.mobile.exists()</code>, will open up a modal with the following options <code className="small-code-sample">New Picture</code> and <code className="small-code-sample">Upload</code>.</td>
                        <td>None</td>
                        <td>Promise&lt;octet-stream&gt;</td>
                    </tr>
                    <tr>
                        <td>api.mobile.dutyStatusLog.getCurrentDrivingLog()</td>
                        <td>Gets the current DutyStatusLog of the driver.</td>
                        <td>None</td>
                        <td>Promise that resolves with a {" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#DutyStatusLog" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">DutyStatusLog</a>{" "}
                            object.</td>
                    </tr>
                    <tr>
                        <td>api.mobile.dutyStatusLog.get()</td>
                        <td>Gets all of the DutyStatusLogs for the current user</td>
                        <td>None</td>
                        <td>Promise that resolves with an array of {" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#DutyStatusLog" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">DutyStatusLog</a>{" "}
                            objects.</td>
                    </tr>
                    <tr>
                        <td>api.mobile.dutyStatusLog.add()</td>
                        <td>Adds a new DutyStatusLog. <strong>Note:</strong> The log will not be immediately added with this method, it will be synced during the next drive sync cycle.</td>
                        <td>DutyStatusLog: Object <strong>Required properties</strong>: dateTime: String, device: Object, driver: Object, status: String, origin: String</td>
                        <td>Promise that resolves with the newly added{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#DutyStatusLog" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">DutyStatusLog</a>{" "}
                            object</td>
                    </tr>
                    <tr>
                        <td>api.mobile.navigate()</td>
                        <td>Navigates to default pages on Geotab Drive.</td>
                        <td>url: String (REQUIRED) String Valid page values: assets, hos, hos/logs, dvir, messaging, inspection, and settings. <em>Note: param will append the string at the end of the URL path with a comma ',' as a delimiter</em></td>
                        <td>Void</td>
                    </tr>
                    <tr>
                        <td>api.mobile.listenTo()</td>
                        <td>Event listener that executes the specified callback function whenever a change on the state is detected</td>
                        <td>Callback Function e.g. <code className="small-code-sample">listenTo((newState) ={`>`} {`{ console.log(JSON.stringify(newState)); }`})</code></td>
                        <td>Void</td>
                    </tr>
                    <tr>
                        <td>api.mobile.shipment.get()</td>
                        <td>Gets the{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#ShipmentLog" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">ShipmentLogs</a>{" "}
                            for the device.</td>
                        <td>None</td>
                        <td>Returns an array of{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#ShipmentLog" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">ShipmentLogs</a>
                            . <em>Note that the method will return all devices that have been added and removed during the current session. The list should be filtered by the activeTo property according to the requirement.</em></td>
                    </tr>
                    <tr>
                        <td>api.mobile.shipment.add()</td>
                        <td>Adds a new{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#ShipmentLog" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">ShipmentLog</a>{" "}
                        </td>
                        <td>ShipmentLog: Object <code className="small-code-sample">{`{driver: {id: '' }, activeFrom: '', dateTime: '', shipperName: '', commodity: ''}`}</code></td>
                        <td>Promise that resolves with the{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#ShipmentLog" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">ShipmentLogs</a>{" "}
                            object that was added.</td>
                    </tr>
                    <tr>
                        <td>api.mobile.shipment.remove()</td>
                        <td>Removes the specified{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#ShipmentLog" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">ShipmentLog</a>{" "}
                            by setting the activeTo datetime string to the current date.</td>
                        <td>shipmentId: String</td>
                        <td>Promise that resolves with the{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#ShipmentLog" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">ShipmentLogs</a>{" "}
                            object that was removed.</td>
                    </tr>
                    <tr>
                        <td>api.mobile.textMessage.add()</td>
                        <td>Adds a new{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#TextMessage" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">TextMessage</a>{" "}
                        </td>
                        <td>TextMessage: Object e.g. <code className="small-code-sample">{`{device: {id: 'b1'}, isDirectionToVehicle: true, messageContent: {message: 'Message', contentType: 'Normal' } }`}</code> <em>Note: isDirectionToVehicle needs to be true when using this function.</em></td>
                        <td>undefined</td>
                    </tr>
                    <tr>
                        <td>api.mobile.textMessage.get()</td>
                        <td>Returns any{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#TextMessage" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">TextMessage</a>{" "}
                            received in the current session.</td>
                        <td>None</td>
                        <td>A promise that resolves with an array of{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#TextMessage" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">TextMessages</a>{" "}
                        </td>
                    </tr>
                    <tr>
                        <td>api.mobile.textMessage.set()</td>
                        <td>Allows to update the properties for an existing{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#TextMessage" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">TextMessage</a>{" "}
                        </td>
                        <td>TextMessage: Object e.g. <code className="small-code-sample">{`{id: 'bd1', device: {id: 'b1'}, isDirectionToVehicle: true, messageContent: {message: 'Message', contentType: 'Normal'} }`}</code> <em>Note: An existing message ID is needed to modify the message.</em></td>
                        <td>Promise that resolves with the modified{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#TextMessage" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">TextMessages</a>{" "}
                        </td>
                    </tr>
                    <tr>
                        <td>api.mobile.user.get()</td>
                        <td>Retrieves driver information</td>
                        <td>includeAllDrivers: boolean Default: true</td>
                        <td>Promise that resolves with an array of{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#Driver" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">Driver</a>{" "}
                            objects</td>
                    </tr>
                    <tr>
                        <td>api.mobile.user.getHosRuleSet()</td>
                        <td>Gets the{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#HosRuleSet" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">HosRuleSet</a>{" "}
                            for the current driver</td>
                        <td>None</td>
                        <td>Promise that resolves with the{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#HosRuleSet" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">HosRuleSet</a>{" "}
                            object</td>
                    </tr>
                    <tr>
                        <td>api.mobile.user.getAvailability()</td>
                        <td>Gets driver availability</td>
                        <td>None</td>
                        <td>Promise that resolves with{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#DutyStatusAvailability" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">DutyStatusAvailability</a>{" "}
                            object</td>
                    </tr>
                    <tr>
                        <td>api.mobile.user.getViolations()</td>
                        <td>Gets driver violations</td>
                        <td>None</td>
                        <td>Promise that resolves with an array of{" "}
                            {/* TODO: update link */}
                            <a href="https://geotab.github.io/sdk/software/api/reference/#DutyStatusViolation" target="_blank"
                                rel="noopener noreferrer"
                                aria-label="">DutyStatusViolation</a>{" "}
                            objects</td>
                    </tr>
                    <tr>
                        <td>api.mobile.vehicle.get()</td>
                        <td>Retrieves current vehicle information</td>
                        <td>None</td>
                        <td>Promise that resolves with an object with vehicle information.</td>
                    </tr>
                    <tr>
                        <td>api.mobile.trailer.get()</td>
                        <td>Retrieves trailer information</td>
                        <td>None</td>
                        <td>Promise that resolves with an array of trailer objects</td>
                    </tr>
                    <tr>
                        <td>api.mobile.trailerAttachment.get()</td>
                        <td>Retrieves trailerAttachment data</td>
                        <td>None</td>
                        <td>Promise that resolves with an array of trailer attachment objects</td>
                    </tr>
                    <tr>
                        <td>state.device</td>
                        <td>Get the current vehicle that is being connected to the mobile device</td>
                        <td>None</td>
                        <td>String</td>
                    </tr>
                    <tr>
                        <td>state.driving</td>
                        <td>Mobile device is detected as driving with the current vehicle</td>
                        <td>None</td>
                        <td>Boolean</td>
                    </tr>
                    <tr>
                        <td>state.charging</td>
                        <td>Mobile device is being powered</td>
                        <td>None</td>
                        <td>Boolean</td>
                    </tr>
                    <tr>
                        <td>state.background</td>
                        <td>Geotab Drive application is running in the background</td>
                        <td>None</td>
                        <td>Boolean</td>
                    </tr>
                    <tr>
                        <td>state.online</td>
                        <td>Mobile device has internet access</td>
                        <td>None</td>
                        <td>Boolean</td>
                    </tr>
                    <tr>
                        <td>state.deviceCommunicating</td>
                        <td>Telematics device is communicating to the server</td>
                        <td>None</td>
                        <td>Boolean</td>
                    </tr>
                    <tr>
                        <td>state.gpsConnected</td>
                        <td>Mobile device has GPS enabled</td>
                        <td>None</td>
                        <td>Boolean</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>;


const thirdPartyFromURISchema: ReactNode =
    <div className="paragraph" id="drive-third-party-uri-schema">
        <InformationalBox>
            <p>Drive app v4.1.0+</p>
        </InformationalBox>
        <p>It's possible to open different applications like prontoforms or native calendar from add-ins. To do so, it's important to construct correct URI schema string and pass it to <code className="small-code-sample">window.open</code>. For example:</p>
        <CodeSample
            language="javascript"
            code={`window.open(uriSchemaString, "_system")`} />
        <p>Make sure to read carefully documentation of the app you're trying to open to use correct schema. For example, to open twitter application from addin you should use:</p>
        <CodeSample
            language="javascript"
            code={`window.open("twitter://messages", "_system")`} />
        <p>You can't use just <code className="small-code-sample">twitter://</code> as it's not correct and app won't open. You need to specify which page you want to open: <code className="small-code-sample">messages</code>, <code className="small-code-sample">account</code> etc.</p>
        <p>To open webpage you need to use the same method, but with this notation:</p>
        <CodeSample
            language="javascript"
            code={`window.open("https://google.com", "_blank")`} />
        <InformationalBox>
            <p><code className="small-code-sample">_blank</code> is important, especially for iOS devices</p>
        </InformationalBox>
    </div>;


const driveFromThirdParty: ReactNode =
    <div className="paragraph" id="drive-from-third-party">
        <p>On Android and iOS devices with the Geotab Drive app installed, a URL handler is registered which can:</p>
        <ul>
            <li>Launch Drive,</li>
            <li>Navigate to a specified page in Drive, and</li>
            <li>Automatically log into Drive with a token (session ID, user name, and database name) retrieved by authenticating against MyGeotab's API in a third-party app</li>
        </ul>
        <p>Deep linking is used to provide a seamless link from a third-party app into the Geotab Drive app.</p>
        <p>On the most basic level, launching Geotab Drive to the main screen, can be executed by creating a link to:</p>
        <CodeSample
            language="javascript"
            code={`geotabdrive://`} />

        <p>From there, it's possible to automatically login and/or link to specific modules or pages of the Geotab Drive app.</p>
        <p>For more information on how to <strong>Automatic Login, Single Sign-on</strong> and <strong>Navigate to Desired Page</strong> on Geotab Drive app, please refer to {" "}
            <a href="https://docs.google.com/document/d/1RwIaVmQ6VEYF9BIMlM4Bp2zWP5ulDX5Xh4NVINPDYzA" target="_blank"
                rel="noopener noreferrer"
                aria-label="">Geotab Drive Single Sign-on and Deep Linking</a>
        </p>
    </div>;


const otherResources: ReactNode =
    <div className="paragraph" id="drive-other-resources">
        <ul>
            <li>
                <a href="https://docs.google.com/document/d/1-r9o9epj61WMmGxRveA9SXR86lQGHcxgMh8lsVXGL54/edit?usp=sharing" target="_blank"
                    rel="noopener noreferrer"
                    aria-label="">Geotab Drive Addin SDK</a>
            </li>
            <li>
                <a href="https://docs.google.com/document/d/19crX8xXYsYNY-NwP6PGc7LFqOk2KV1xzNgwdJ-40kb8/edit?usp=sharing" target="_blank"
                    rel="noopener noreferrer"
                    aria-label="">DriverRegulation (Daily Totals)</a>
            </li>
        </ul>
    </div>;


const pageTitle: PageTitleProps = {
    "title": "Drive Add-Ins",
    "breadCrumbItems": ["MYG", "Add-Ins", "Drive Add-Ins"]
};


const pageSections: TableOfContentsItem[] = [
    {
        "elementId": "drive-overview",
        "summary": "Overview",
        "details": overview
    },
    {
        "elementId": "drive-lifecycle-methods",
        "summary": "GEOTAB Drive Page Lifecycle Methods",
        "details": driveLifeCycle
    },
    {
        "elementId": "drive-api-and-state",
        "summary": "API And State Documentation",
        "details": apiAndState
    },
    {
        "elementId": "drive-third-party-uri-schema",
        "summary": "Opening Third - Party Applications Using URI Schema",
        "details": thirdPartyFromURISchema
    },
    {
        "elementId": "drive-from-third-party",
        "summary": "Opening Geotab Drive From Third - Party Applications",
        "details": driveFromThirdParty
    },
    {
        "elementId": "drive-other-resources",
        "summary": "Other Useful Resources",
        "details": otherResources
    }
];


export default function DriveAddIns() {
    return (
        <Page section={HeaderSections.Drive} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                <InformationalBox>
                    <p>Geotab Drive Add-Ins are in preview release and subject to change</p>
                </InformationalBox>
            </div>
            {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} />)}
        </Page>
    );
};