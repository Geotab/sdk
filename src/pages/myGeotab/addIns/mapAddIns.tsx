import { ReactNode } from "react";
import { IconChevronRightSmall } from "@geotab/react-component-library";
import Accordion from "../../../components/Accordion/Accordion";
import CodeSample from "../../../components/CodeSamplesContainer/CodeSample";
import mapVehicleInfoImage from "./../../../assets/images/mapAddins/map-add-ins-docs-1.jpg";
import mapAddinSizeOnDesktopImage from "./../../../assets/images/mapAddins/map-add-ins-docs-2.jpg";
import mapAddinSizeOnMobileImage from "./../../../assets/images/mapAddins/map-add-ins-docs-3.jpg";
import multipleMapAddinsOnTheMapPageImage from "./../../../assets/images/mapAddins/map-add-ins-docs-4.jpg";
import { Link } from "react-router-dom";

const Installation: ReactNode = <div className="paragraph">
    <p>
        Map Add-ins are installed by uploading an <Link to="/myGeotab/addIns/developingAddIns">Add-in Configuration file</Link> into MyGeotab. Click on Administration -&gt; System... -&gt; System Settings -&gt; Add-Ins -&gt; New Add-In, and upload the Add-in Configuration file. The following is an example of a Map Add-in's Configuration file:
    </p>
    <CodeSample
        language="json"
        code={`{
            "name": "Tooltip",
            "supportEmail": "yourSupportEmail@company.com",
            "version": "1.0",
            "items": [{
                "page": "map",
                "title": "Tooltips",
                "noView": false,
                "mapScript": {
                    "src": "addin.js",
                    "style": "addin.css",
                    "url": "addin.html"
                }
            }]
}`}></CodeSample>
    <p>
        The main properties of the Configuration file are as follows:
    </p>
    <ol>
        <li><strong>page</strong> - This defines which page the Map Add-in will reside within. This could be “<strong>map</strong>” (The Map page) or “<strong>tripsHistory</strong>” (the Trips History page). The default value is “<strong>map</strong>”.</li>
        <li><strong>title</strong> - This is a heading displayed at the top of the panel when there are multiple Map Add-ins installed. If a "title" is not provided, the Add-in defaults to the "name" parameter.</li>
        <li><strong>noView</strong> - If <code className="small-code-sample-two">true</code>, the add-in will not be displayed in the right-side panel. The default value is <code className="small-code-sample-two">false</code>.</li>
        <li><strong>src</strong> - The JavaScript file reference for the Add-in. This can be an externally hosted file or uploaded into MyGeotab by dragging and dropping it into the Configuration file window.</li>
        <li><strong>style</strong> - The CSS file reference for this Add-In. This can be externally hosted or uploaded to MyGeotab.</li>
        <li><strong>url</strong> - The HTML file reference for this Add-In. This option can be used instead of src and style. Links to CSS and JavaScript files can be made within this HTML file. All content within the &lt;body&gt; tags will be added to the Map Add-in UI &#40;&#40;<a target="_blank" rel="noreferrer" href="https://github.com/Geotab/sdk-map-addin-samples/tree/master/html">Example</a>&#41;&#41;.</li>
    </ol>
    <p>You can find example Map Add-ins <a target="_blank" rel="noreferrer" href="https://github.com/Geotab/sdk-map-addin-samples">here</a>.</p>
</div>;
 
const Usage: ReactNode = <div className="paragraph">
    <h3>Iframe Setup</h3>
    <p>In the MyGeotab portal, Map Add-ins are loaded when the user visits the MyGeotab page containing the Add-in. For example, the Add-in in Figure #1 loads when the user visits the Map page.</p>
    <p>Map Add-ins are loaded inside an iframe with its sandbox attribute set to "allow-scripts". This allows the Map Add-in to run custom scripts, such as the JavaScript file from the "<strong>src</strong>" parameter in the Add-in Configuration file.</p>
    <p>Important Notes:</p>
    <ul>
       <li>All Map Add-ins installed in a database are active at the same time, when the user is on the Map or Trips History page. If different Add-ins use the same variable name, it will cause an error and will lead to a non-working Add-in. You should name your variables according to your solution name - e.g. for "ABC Add-in" you should use "abc" as a prefix for all your variables.</li> 
       <li>When the user leaves the page, the content of the iframe is cleared by the browser.</li>
       <li>When the user returns to the page, the scripts inside the iframe are reloaded.</li>
       <li>If necessary, the current Add-In state can be saved in Local Storage, IndexedDB, or elsewhere.</li>
    </ul>
    <p>Do not access elements or APIs outside the iframe panel; they can be changed without notice in future versions of MyGeotab, which might break your Add-In. Use only the services and methods documented here and on the API Reference page when interacting with a page outside the iframe.</p>
    <h3>Panel Size</h3>
    <p>The iframe panel has a fixed width of 450 pixels; the width shrinks to accomodate screens with widths below 600 pixels. The panel height is responsive, always reaching the bottom of the page.</p>
    <p>The figures below display how the panel size changes between a desktop screen and a mobile phone screen.</p>
    <figure>
        <img className="mapAddins__image" src={mapAddinSizeOnDesktopImage} alt="Figure #2 - Map Add-in size on desktop." />
        <figcaption>Figure #2 - Map Add-in size on desktop.</figcaption>
    </figure>
    <figure>
        <img className="mapAddins__image" src={mapAddinSizeOnMobileImage} alt="Figure #3 - Map Add-in size on mobile." />
        <figcaption>Figure #3 - Map Add-in size on mobile.</figcaption>
    </figure>
    <p>If multiple Map Add-ins are installed, each is accessible by selecting the appropriate tab at the top of the panel. In Figure #4, there are 3 add-ins installed on the page, denoted by the 3 tabs at the top of the panel. The add-ins are titled "Live Trip History", "Tooltip", and "Vehicle Info".</p>
    <figure>
        <img className="mapAddins__image" src={multipleMapAddinsOnTheMapPageImage} alt="Figure #4 - Multiple Add-ins on the Map page." />
        <figcaption>Figure #4 - Multiple Add-ins on the Map page.</figcaption>
    </figure>
    <h3>Structure</h3>
    <p>The starting point for the Map Add-in JavaScript code is the function that is added as a method to "window.geotab.addin". For example:</p>
    <CodeSample
        language="javascript"
        code={`geotab.addin.request = (elt, service) => {
            // code for Map Add-In
        }`}></CodeSample>
    <p>This function has two arguments:</p>
    <ol>
        <li><strong>elt</strong> - The HTMLElement of the Add-In. It contains everything that belongs to the Add-In.</li>
        <li><strong><a href="#services-list">service</a></strong>- The JavaScript file reference for the Add-in.</li>
    </ol>
    <p>The Add-in function will be called when a user visits the Add-in by clicking on its tab. After that, the "focus" and "blur" events will be fired when the user opens or leaves the Add-in tab, respectively &#40;See Page Service&#41;.</p>
</div>;

const MapAddinServices: ReactNode = <div id="services-list" className="paragraph">
    <div className="mapAddins__docs-service">
        <div className="mapAddins__docs-service__part">
            <h2>Page Service (<a target="_blank" rel="noreferrer" href="https://github.com/Geotab/sdk-map-addin-samples/tree/master/page">Example</a>)</h2>
            <p>Service for getting/setting page state and moving between MyGeotab page</p>
            <h3>Methods</h3>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Service Methods</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>set &#40;key: string, value: string&#41;: Promise&#60;boolean&#62;</td>
                            <td>Sets new key/value pair to page state</td>

                        </tr>
                        <tr>
                            <td>get &#40;&#41;: Promise&#60;object&#62;</td>
                            <td>Gets page state</td>
                        </tr>
                        <tr>
                            <td>go &#40;page: string, state?: object&#41;: Promise&#60;boolean&#62;</td>
                            <td>Changes current page</td>
                        </tr>
                        <tr>
                            <td>hasAccessToPage &#40;page: string&#41;: Promise&#60;boolean&#62;</td>
                            <td>Checks whether current user has access to MyGeotab page</td>
                        </tr>
                        <tr>
                            <td>getFilterState(): Promise&#60;<a href="#IGroupFilterId_6738371814545805">IGroupFilterId</a>&#91;&#93;&#62;</td>
                            <td>Gets current company filter state</td>
                        </tr>
                        <tr>
                            <td>attach &#40;eventName: string, eventHandler: &#40;serviceData: any&#41; =&#62; void&#41;: void</td>
                            <td>Attaches event handler to service</td>
                        </tr>
                        <tr>
                            <td>detach &#40;eventName: string, eventHandler?: &#40;serviceData: any&#41; =&#62; void&#41;: void</td>
                            <td>Detaches event handler to service</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3>Properties</h3>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Service Methods</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>active</td>
                            <td>boolean</td>
                            <td>Current map add-in state. It's true if current add-in is focused</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3>Events</h3>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Event name</th>
                            <th>Event object</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>focus</td>
                            <td>Empty object</td>
                            <td>Event is fired when user focuses on current map add-in</td>
                        </tr>
                        <tr>
                            <td>blur</td>
                            <td>Empty object</td>
                            <td>Event is fired when user focuses on another map add-in</td>
                        </tr>
                        <tr>
                            <td>stateChange</td>
                            <td>state: (object) - Updated page state</td>
                            <td>Event is fired when the state of the page is changed</td>
                        </tr>
                        <tr>
                            <td>filterChange</td>
                            <td>groups: (<a href="#IGroupFilterId_6738371814545805">IGroupFilterId</a>[]) - Updated array of filter groups</td>
                            <td>Event is fired when the company filter groups is changed</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IGroupFilterId_6738371814545805">Interface IGroupFilterId</h4>
            <p>Group id object that is selected by user in company filter</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>id</td>
                            <td>string</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div className="mapAddins__docs-service">
        <div className="mapAddins__docs-service__part">
            <h2>LocalStorage Service (<a  target="_blank" rel="noreferrer" href="https://github.com/Geotab/sdk-map-addin-samples/tree/master/localStorage">Example</a>)</h2>
            <p>Service to request information stored in browser LocalStorage</p>
            <h3>Methods</h3>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Service Methods</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>set &#40;key: string, value: string&#41;: Promise&#60;boolean&#62;</td>
                            <td>Sets key-value pairs to browser localStorage with key</td>
                        </tr>
                        <tr>
                            <td>remove &#40;key: string&#41;: Promise&#60;boolean&#62;</td>
                            <td>Removes value from browser localStorage by key</td>
                        </tr>
                        <tr>
                            <td>get (key: string): Promise&#60;string&#62;</td>
                            <td>Gets value from browser localStorage by key</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div className="mapAddins__docs-service">
        <div className="mapAddins__docs-service__part">
            <h2>Api Service (<a  target="_blank" rel="noreferrer" href="https://github.com/Geotab/sdk-map-addin-samples/tree/master/request">Example</a>)</h2>
            <p>Service for requesting data from Geotab server</p>
            <h3>Methods</h3>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Service Methods</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>call (method: string, params: object): Promise&#60;any[]&#62;</td>
                            <td>Sends single request to Geotab server</td>
                        </tr>
                        <tr>
                            <td>multiCall (calls: <a href="#TApiCall_9222282930422152">TApiCall</a>[]): Promise&#60;any[][]&#62;</td>
                            <td>Sends multiple requests to Geotab server in one batch</td>
                        </tr>
                        <tr>
                            <td>getSession (): Promise&#60;<a href="#ISessionInfo_21172432221526716">ISessionInfo</a>&#62;</td>
                            <td>Gets current user session information</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ISessionInfo_21172432221526716">Interface ISessionInfo</h4>
            <p>Current user session information</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>database</td>
                            <td>string</td>
                        </tr>
                        <tr>
                            <td>userName</td>
                            <td>string</td>
                        </tr>
                        <tr>
                            <td>sessionId</td>
                            <td>string</td>
                        </tr>
                        <tr>
                            <td>domain</td>
                            <td>string</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="TApiCall_9222282930422152">Type TApiCall</h4>
            <p>
                <code>[string, object]</code>
            </p>
            <p>Tuple for calling server methods where first element is method name and second is an object with parameters.</p>
        </div>
    </div>
    <div className="mapAddins__docs-service">
        <div className="mapAddins__docs-service__part">
            <h2>Events Service (<a  target="_blank" rel="noreferrer" href="https://github.com/Geotab/sdk-map-addin-samples/tree/master/events">Example</a>)</h2>
            <p>Service for catching events that happens when user interact with different entities on the map</p>
            <h3>Methods</h3>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Service Methods</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>attach (eventName: string, eventHandler: (serviceData: any) =&#62; void): void</td>
                            <td>Attaches event handler to service</td>
                        </tr>
                        <tr>
                            <td>detach (eventName: string, eventHandler?: (serviceData: any) =&#62; void): void</td>
                            <td>Detaches event handler to service</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3>Events</h3>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Event name</th>
                            <th>Event object</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>move</td>
                            <td>data: (<a href="#ICoordinate_5317711472027584">ICoordinate</a>) - Position of the pointer on the map</td>
                            <td>Event is fired when user moves pointer over the map</td>
                        </tr>
                        <tr>
                            <td>over</td>
                            <td>data: (<a href="#TEventData_31142352899099124">TEventData</a>) - Main information about entity</td>
                            <td>Event is fired when user moves pointer over an object on the map</td>
                        </tr>
                        <tr>
                            <td>out</td>
                            <td>data: (<a href="#TEventData_31142352899099124">TEventData</a>) - Main information about entity</td>
                            <td>Event is fired when user moves pointer out of an object on the map</td>
                        </tr>
                        <tr>
                            <td>click</td>
                            <td>data: (<a href="#TEventData_31142352899099124">TEventData</a>) - Main information about entity</td>
                            <td>Event is fired when user clicks on an object on the map</td>
                        </tr>
                        <tr>
                            <td>change</td>
                            <td>data: (<a href="#TEntityEventData_22932902969493218">TEntityEventData</a>) - Main information about entity and its state</td>
                            <td>Event is fired when status of the entity on the map is changed</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IZoneEvent_5628074791384126">Interface IZoneEvent</h4>
            <p>Event object that is sent to add-in when user interacts with zone</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>type</td>
                            <td>"zone"</td>
                        </tr>
                        <tr>
                            <td>entity</td>
                            <td><a href="#IZoneEventData_4986307042482321">IZoneEventData</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IZoneEventData_4986307042482321">Interface IZoneEventData</h4>
            <p>Zone object that is sent to add-in when user interacts with zone</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>id</td>
                            <td>string</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IDeviceEvent_2296851980526009">Interface IDeviceEvent</h4>
            <p>Event object that is sent to add-in when user interacts with device</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>type</td>
                            <td>"device"</td>
                        </tr>
                        <tr>
                            <td>entity</td>
                            <td><a href="#IDeviceEventData_46524687032941836">IDeviceEventData</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IDeviceEventData_46524687032941836">Interface IDeviceEventData</h4>
            <p>Device object that is sent to add-in when user interacts with device</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>id</td>
                            <td>string</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IRouteEvent_2514406342647548">Interface IRouteEvent</h4>
            <p>Event object that is sent to add-in when user interacts with route</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>type</td>
                            <td>"route</td>
                        </tr>
                        <tr>
                            <td>entity</td>
                            <td><a href="#IRouteEventData_7416072736483916">IRouteEventData</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IRouteEventData_7416072736483916">Interface IRouteEventData</h4>
            <p>Route object that is sent to add-in when user interacts with route</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>id</td>
                            <td>string</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ITripEvent_45752359167584244">Interface ITripEvent</h4>
            <p>Event object that is sent to add-in when user interacts with trip</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>type</td>
                            <td>"trip"</td>
                        </tr>
                        <tr>
                            <td>entity</td>
                            <td><a href="#ITripEventData_5823825824970319">ITripEventData</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ITripEventData_5823825824970319">Interface ITripEventData</h4>
            <p>Trip object that is sent to add-in when user interacts with trip</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>id</td>
                            <td>string</td>
                            <td>Id of the trip</td>
                        </tr>
                        <tr>
                            <td>device</td>
                            <td>&#123; id: string; &#125;</td>
                            <td>Device id object that drove this trip</td>
                        </tr>
                        <tr>
                            <td>dateTime</td>
                            <td>string</td>
                            <td>Date and time of the trip point</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IExceptionsEvent_5307836172275417">Interface IExceptionsEvent</h4>
            <p>Event object that is sent to add-in when user interacts with device exceptions</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>type</td>
                            <td>"exceptions"</td>
                        </tr>
                        <tr>
                            <td>entity</td>
                            <td><a href="#IExceptionsEventData_5042572438828359">IExceptionsEventData</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4>Interface IExceptionsEventData</h4>
            <p>Exceptions object that is sent to add-in when user interacts with exception icon on the map</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>exceptions</td>
                            <td><a href="#IExceptionEventData_30321984938642355">IExceptionEventData</a>[]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IExceptionEventData_30321984938642355">Interface IExceptionEventData</h4>
            <p>Exception object that is sent to add-in when user interacts with exception icon on the map</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>to</td>
                            <td>string</td>
                            <td>Date and time when this exception ends</td>
                        </tr>
                        <tr>
                            <td>from</td>
                            <td>string</td>
                            <td>Date and time when this exception starts</td>
                        </tr>
                        <tr>
                            <td>id</td>
                            <td>string</td>
                            <td>Id of the exception</td>
                        </tr>
                        <tr>
                            <td>rule</td>
                            <td>&#123; id: string; &#125;</td>
                            <td>Rule id object of this exception</td>
                        </tr>
                        <tr>
                            <td>device</td>
                            <td>&#123; id: string; &#125;</td>
                            <td>Device id object where this exception happen</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IDeviceChangeEvent_12603948382694052">Interface IDeviceChangeEvent</h4>
            <p>Event object that is sent to add-in when vehicle location on the map changes</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>type</td>
                            <td>"device"</td>
                        </tr>
                        <tr>
                            <td>entity</td>
                            <td><a href="#IDeviceEventData_46524687032941836">IDeviceEventData</a></td>
                        </tr>
                        <tr>
                            <td>visible</td>
                            <td>boolean</td>
                        </tr>
                        <tr>
                            <td>location</td>
                            <td><a href="#ILocation_8963072152506912">ILocation</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="TEventData_31142352899099124">Type TEventData</h4>
            <pre><code><a href="#IZoneEvent_5628074791384126">IZoneEvent</a> | <a href="#IDeviceEvent_2296851980526009">IDeviceEvent</a> | <a href="#IRouteEvent_2514406342647548">IRouteEvent</a> | <a href="#ITripEvent_45752359167584244">ITripEvent</a> | <a href="#IExceptionsEvent_5307836172275417">IExceptionsEvent</a></code></pre>
            <p>Event object that is sent to add-in when user interacts with different types of entities on the map</p>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="TEntityEventData_22932902969493218">Type TEntityEventData</h4>
            <pre><code><a href="#IDeviceChangeEvent_12603948382694052">IDeviceChangeEvent</a></code></pre>
            <p>Event object that is sent to add-in when something is happened with different types of entities on the map</p>
        </div>
    </div>
    <div className="mapAddins__docs-service">
        <div className="mapAddins__docs-service__part">
            <h2>Map Service (<a  target="_blank" rel="noreferrer" href="https://github.com/Geotab/sdk-map-addin-samples/tree/master/map">Example</a>)</h2>
            <p>Service for manipulating viewport of the map and getting updates about changed map viewport</p>
            <h3>Methods</h3>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Service Methods</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>setBounds (bounds: <a href="#IMapBounds_6809339450241565">IMapBounds</a>): Promise&lt;boolean&gt;</td>
                            <td>Sets map bounds</td>
                        </tr>
                        <tr>
                            <td>getBounds (): Promise&lt;<a href="#IMapBounds_6809339450241565">IMapBounds</a>&gt;</td>
                            <td>Gets current map bounds</td>
                        </tr>
                        <tr>
                            <td>setZoom (zoom: number): Promise&lt;boolean&gt;</td>  
                            <td>Sets map zoom level</td>
                        </tr>
                        <tr>
                            <td>getZoom (): Promise&lt;number&gt;</td>
                            <td>Gets current map zoom level</td>
                        </tr>
                        <tr>
                            <td>attach (eventName: string, eventHandler: (serviceData: any) =&gt; void): void</td>
                            <td>Attaches event handler to service</td>
                        </tr>
                        <tr>
                            <td>detach (eventName: string, eventHandler?: (serviceData: any) =&gt; void): void</td>
                            <td>Detaches event handler to service</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3>Events</h3>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Event name</th>
                            <th>Event object</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>change</td>
                            <td>Empty object</td>
                            <td>Event is fired when viewport of map is changed. This event fires each time when use drags or zooms map</td>
                        </tr>
                        <tr>
                            <td>changed</td>
                            <td><div>viewport: (<a href="#IChangedViewport_25883856190750576">IChangedViewport</a>) - Current map zoom and bounds</div></td>
                            <td>Event is fired when user finished dragging and zooming map</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IChangedViewport_25883856190750576">Interface IChangedViewport</h4>
            <p>Current map viewport</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>zoom</td>
                            <td>number</td>
                            <td>Current map zoom</td>
                        </tr>
                        <tr>
                            <td>bounds</td>
                            <td><a href="#IMapBounds_6809339450241565">IMapBounds</a></td>
                            <td>Current map bounds</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IMapBounds_6809339450241565">Interface IMapBounds</h4>
            <p>Object that represents a map bounding box.</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>sw</td>
                            <td><a href="#IMapLatLng_21765840131830494">IMapLatLng</a></td>
                            <td>The southwest corner of the bounding box.</td>
                        </tr>
                        <tr>
                            <td>ne</td>
                            <td><a href="#IMapLatLng_21765840131830494">IMapLatLng</a></td>
                            <td>The northeast corner of the bounding box.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IMapLatLng_21765840131830494">Interface IMapLatLng</h4>
            <p>An object that represents longitude and latitude</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>lat</td>
                            <td>number</td>
                            <td>Latitude, measured in degrees.</td>
                        </tr>
                        <tr>
                            <td>lng</td>
                            <td>number</td>
                            <td>Longitude, measured in degrees.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div className="mapAddins__docs-service">
        <div className="mapAddins__docs-service__part">
            <h2>Tooltip Service (<a  target="_blank" rel="noreferrer" href="https://github.com/Geotab/sdk-map-addin-samples/tree/master/tooltip">Example</a>)</h2>
            <p>Service for showing additional information in entities tooltip</p>
            <h3>Methods</h3>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Service Methods</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>showAt (position: <a href="#TPosition_3201977562385554">TPosition</a>, pattern: <a href="#ITooltip_19241812859555196">ITooltip</a>, sequence: number): void</td>
                            <td>Shows custom tooltip at certain position on the map</td>
                        </tr>
                        <tr>
                            <td>show (pattern: <a href="#ITooltip_19241812859555196">ITooltip</a>, sequence: number): void</td>
                            <td>Adds additional information to already shown tooltip on the map</td>
                        </tr>
                        <tr>
                            <td>hide (): void</td>  
                            <td>Hids additional information from already shown and custom tooltip</td>
                        </tr>
                        <tr>
                            <td>setConfig (config: <a href="#ITooltipConfig_005607970137291307">ITooltipConfig</a>): Promise&lt;boolean&gt;</td>
                            <td>Sets configuration for changing current application tooltip</td>
                        </tr>
                        <tr>
                            <td>getConfig (): Promise&lt;<a href="#ITooltipConfig_005607970137291307">ITooltipConfig</a>&gt;</td>
                            <td>Sets configuration for current application tooltip</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ITooltip_19241812859555196">Interface ITooltip</h4>
            <p>Custom map add-in tooltip options. It can be either a text information or an image</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>icon</td>
                            <td>string</td>
                            <td>Icon image for custom tooltip part.</td>
                        </tr>
                        <tr>
                            <td>image</td>
                            <td><a href="#ITooltipImage_12510348054327536">ITooltipImage</a></td>
                            <td>Image options that should be shown instead of text in tooltip</td>
                        </tr>
                        <tr>
                            <td>main</td>  
                            <td>string</td>
                            <td>Main tooltip text</td>
                        </tr>
                        <tr>
                            <td>secondary</td>
                            <td>string[]</td>
                            <td>Secondary information that will be written with smaller font</td>
                        </tr>
                        <tr>
                            <td>additional</td>
                            <td>string[]</td>
                            <td>Some additional tooltip information</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ITooltipImage_12510348054327536">Interface ITooltipImage</h4>
            <p>Custom tooltip image options. It can be either link to external image, base64 image or image stored in ArrayBuffer</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>url</td>
                            <td>string</td>
                            <td>Either link to external image or serialized base64 image or stringified SVG image</td>
                        </tr>
                        <tr>
                            <td>buffer</td>
                            <td>ArrayBuffer</td>
                            <td>Image stored in ArrayBuffer</td>
                        </tr>
                        <tr>
                            <td>width</td>  
                            <td>number</td>
                            <td>Width of the image</td>
                        </tr>
                        <tr>
                            <td>height</td>
                            <td>number</td>
                            <td>Height of the image</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ITooltipConfig_005607970137291307">Interface ITooltipConfig</h4>
            <p>Application tooltip config. Based on this config application desides what parts of tooltip should be rendered</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>device</td>
                            <td><a href="#IDeviceTooltipConfig_6978511226108259">IDeviceTooltipConfig</a></td>
                            <td>Changes information in devices tooltip</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
        <h4 id="IDeviceTooltipConfig_6978511226108259">Interface IDeviceTooltipConfig</h4>
            <p>Device tooltip config to control amount of information that is shown in tooltip.</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>state</td>
                            <td>boolean</td>
                            <td>Shows/hides current device state in tooltip</td>
                        </tr>
                        <tr>
                            <td>groups</td>
                            <td>boolean</td>
                            <td>Shows/hides device groups information in tooltip</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div className="mapAddins__docs-service">
        <div className="mapAddins__docs-service__part">
            <h2>ActionList Service (<a  target="_blank" rel="noreferrer" href="https://github.com/Geotab/sdk-map-addin-samples/tree/master/action" >Example</a>)</h2>
            <p>Service for showing a custom action list instead of the existing one, or adding custom buttons to existing action lists.</p>
            <h3>Methods</h3>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Service Methods</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>show (position: <a href="#TPosition_3201977562385554">TPosition</a>, title: string, items: <a href="#IMenuActionItem_4783193308694993">IMenuActionItem</a>[]): void</td>
                            <td>Shows custom action menu on certain position</td>
                        </tr>
                        <tr>
                            <td>attachMenu (menuName: <a href="#TMenuType_5476942457483802">TMenuType</a>, handler: <a href="#TMenuHandler_4714842508362269">TMenuHandler</a>): void</td>
                            <td>Subscribes on event when one of the MyGeotab map menus is shown to add new action button</td>
                        </tr>
                        <tr>
                            <td>detachMenu (menuName: <a href="#TMenuType_5476942457483802">TMenuType</a>, handler?: <a href="#TMenuHandler_4714842508362269">TMenuHandler</a>): void</td>  
                            <td>Unsubscribes on event when one of the MyGeotab map menus is shown</td>
                        </tr>
                        <tr>
                            <td>attach (eventName: string, eventHandler: (serviceData: any) =&gt; void): void</td>
                            <td>Attaches event handler to service</td>
                        </tr>
                        <tr>
                            <td>detach (eventName: string, eventHandler?: (serviceData: any) =&gt; void): void</td>
                            <td>Detaches event handler to service</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3>Events</h3>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Event name</th>
                            <th>Event object</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CustomEvent</td>
                            <td><div>data: (object) - Data from `IAddinActionItem.data` for the current button</div></td>
                            <td>Event is fired when user clicks on custom button in action list. Event name is defined by "clickEvent" property in custom button object.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IMenuActionItem_4783193308694993">Interface IMenuActionItem</h4>
            <p>Custom action button options</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>title</td>
                            <td>string</td>
                            <td>Button title</td>
                        </tr>
                        <tr>
                            <td>icon</td>
                            <td>string</td>
                            <td>Button icon image</td>
                        </tr>
                        <tr>
                            <td>url</td>
                            <td>string</td>
                            <td>URL to external page. If this property is used than button will be an anchor element</td>
                        </tr>
                        <tr>
                           <td>clickEvent</td>
                           <td>string</td>
                           <td>Name of the event that will be fired when user clicks on this button</td> 
                        </tr>
                        <tr>
                            <td>zIndex</td>
                            <td>number</td>
                            <td>Number that defined position of the custom action button in menu</td>
                        </tr>
                        <tr>
                            <td>data</td>
                            <td>object</td>
                            <td>Custom data that will be send with `clickEvent` when user clicks on this button</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IMenuEventData_851292153483612">Interface IMenuEventData</h4>
            <p>Data that is passed to add-in when all types of map action menus are about to be shown</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>x</td>
                            <td>number</td>
                        </tr>
                        <tr>
                            <td>y</td>
                            <td>number</td>
                        </tr>
                        <tr>
                            <td>menuName</td>
                            <td>string</td>
                        </tr>
                        <tr>
                           <td>location</td>
                           <td><a href="#ILocation_8963072152506912">ILocation</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IMapMenuEventData_24356897535149513">Interface IMapMenuEventData extends <a href="#IMenuEventData_851292153483612">IMenuEventData</a></h4>
            <p>Data that is passed to add-in when map action menu is about to be shown</p>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IZoneMenuEventData_4672500566394">Interface IZoneMenuEventData extends <a href="#IMenuEventData_851292153483612">IMenuEventData</a></h4>
            <p>Data that is passed to add-in when zone action menu is about to be shown</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>zone</td>
                            <td>&#123; id: string; &#125;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IRouteMenuEventData_9403032927960586">Interface IRouteMenuEventData extends <a href="#IMenuEventData_851292153483612">IMenuEventData</a></h4>
            <p>Data that is passed to add-in when route action menu is about to be shown</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>route</td>
                            <td>&#123; id: string; &#125;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IMarkerMenuEventData_490591523581543">Interface IMarkerMenuEventData extends <a href="#IMenuEventData_851292153483612">IMenuEventData</a></h4>
            <p>Data that is passed to add-in when location marker action menu is about to be shown</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>title</td>
                            <td>string</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IDeviceMenuEventData_08642871445163691">Interface IDeviceMenuEventData extends <a href="#IMenuEventData_851292153483612">IMenuEventData</a></h4>
            <p>Data that is passed to add-in when device action menu is about to be shown</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>device</td>
                            <td>&#123; id: string; &#125;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ITripMenuEventData_3804169527088357">Interface ITripMenuEventData extends <a href="#IMenuEventData_851292153483612">IMenuEventData</a></h4>
            <p>Data that is passed to add-in when trip action menu is about to be shown</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>dateTime</td>
                            <td>string</td>
                        </tr>
                        <tr>
                            <td>device</td>
                            <td>&#123; id: string; &#125;</td>
                        </tr>
                        <tr>
                            <td>trip</td>
                            <td><a href="#ITripData_7739013050032089">ITripData</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ITripData_7739013050032089">Interface ITripData</h4>
            <p>Trip data that is passed to add-in when trip action menu is about to be shown</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>start</td>
                            <td>string</td>
                        </tr>
                        <tr>
                            <td>stop</td>
                            <td>string</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="TMenuType_5476942457483802">Type TMenuType</h4>
            <code>"zone" | "map" | "device" | "route" | "marker" | "trip"</code>
            <p>Types of menus where custom action buttons can be added</p>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="TMenuHandler_4714842508362269">Type TMenuHandler</h4>
            <code>(menuName: string, data: <a href="#TMenuEventData_1566779089066337">TMenuEventData</a>) =&gt; <a href="#IMenuActionItem_4783193308694993">IMenuActionItem</a>[] | Promise&lt;<a href="#IMenuActionItem_4783193308694993">IMenuActionItem</a>[]&gt;</code>
            <p>Function that will be called when certain action menu is about to be opened</p>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="TMenuEventData_1566779089066337">Type TMenuEventData</h4>
            <code><a href="#IMapMenuEventData_24356897535149513">IMapMenuEventData</a> | <a href="#IZoneMenuEventData_4672500566394">IZoneMenuEventData</a> | <a href="#IRouteMenuEventData_9403032927960586">IRouteMenuEventData</a> | <a href="#IMarkerMenuEventData_490591523581543">IMarkerMenuEventData</a> | <a href="#IDeviceMenuEventData_08642871445163691">IDeviceMenuEventData</a> | <a href="#ITripMenuEventData_3804169527088357">ITripMenuEventData</a></code>
            <p>Data that is passed to add-in based on type of menu that is shown</p>
        </div>
    </div>
    <div className="mapAddins__docs-service">
        <div className="mapAddins__docs-service__part">
            <h2>Canvas Service (<a  target="_blank" rel="noreferrer" href="https://github.com/Geotab/sdk-map-addin-samples/tree/master/mapElements" >Example</a>)</h2>
            <p>Service for drawing custom shapes on the map</p>
            <h3>Methods</h3>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Service Methods</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>path (path: <a href="#IPathSeg_17730033837595904">IPathSeg</a>[], zIndex: number): <a href="#ICanvasElement_6459595766487005">ICanvasElement</a>&lt;<a href="#ICanvasPathAttributes_7903966618522675">ICanvasPathAttributes</a>&gt;</td>
                            <td>Draws SVG path element on the map</td>
                        </tr>
                        <tr>
                            <td>rect (coords: <a href="#TPosition_3201977562385554">TPosition</a>, width: number, height: number, radius: number, zIndex: number): <a href="#ICanvasElement_6459595766487005">ICanvasElement</a>&lt;<a href="#ICanvasRectAttributes_9460810613546908">ICanvasRectAttributes</a>&gt;</td>
                            <td>Draws SVG rect element on the map</td>
                        </tr>
                        <tr>
                            <td>circle (coords: <a href="#TPosition_3201977562385554">TPosition</a>, radius: number, zIndex: number): <a href="#ICanvasElement_6459595766487005">ICanvasElement</a>&lt;<a href="#ICanvasCircleAttributes_8903090928939335">ICanvasCircleAttributes</a>&gt;</td> 
                            <td>Draws SVG circle element on the map</td>
                        </tr>
                        <tr>
                            <td>text (coords: <a href="#TPosition_3201977562385554">TPosition</a>, text: string, zIndex: number): <a href="#ICanvasElement_6459595766487005">ICanvasElement</a>&lt;<a href="#ICanvasTextAttributes_919903973108549">ICanvasTextAttributes</a>&gt;</td>
                            <td>Draws SVG text element on the map</td>
                        </tr>
                        <tr>
                            <td>marker (coords: <a href="#TPosition_3201977562385554">TPosition</a>, width: number, height: number, source: <a href="#TMarkerSource_7275018139374292">TMarkerSource</a>, zIndex: number): <a href="#ICanvasElement_6459595766487005">ICanvasElement</a>&lt;<a href="#ICanvasMarkerAttributes_5404855776022532">ICanvasMarkerAttributes</a>&gt;</td>
                            <td>Draws custom image element on the map</td>
                        </tr>
                        <tr>
                            <td>clear (): void</td>
                            <td>Clears all drawn elements on the map</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="IPathSeg_17730033837595904">Interface IPathSeg</h4>
            <p>Segment of the path element that will be added in `d` attribute</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>type</td>
                            <td>string</td>
                            <td>Type of the segment. Supported types `M`, `m`, `L`, `l`, `Z`, `C`, `c`, `S`, `s`</td>
                        </tr>
                        <tr>
                            <td>points</td>
                            <td><a href="#TPathSegPoint_36185951910039704">TPathSegPoint</a>[]</td>
                            <td>Locations or coordinates that should be used in current segment</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ICanvasElement_6459595766487005">Interface ICanvasElement&lt;T extends <a href="#TCanvasElementAttributes_5122011616287052">TCanvasElementAttributes</a>&gt;</h4>
            <p>New map element object</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>change (attrs: T): <a href="#ICanvasElement_6459595766487005">ICanvasElement</a>&lt;T&gt;</td>
                            <td>Changes style attributes of the current map element</td>
                        </tr>
                        <tr>
                            <td>remove (): void</td>
                            <td>Removes current map element</td>
                        </tr>
                        <tr>
                            <td>isRemoved (): boolean</td>
                            <td>Returns true if element was removed</td>
                        </tr>
                        <tr>
                            <td>attach (event: <a href="#TCanvasElementEvent_06428007861141372">TCanvasElementEvent</a>, handler: (data: <a href="#ICoordinate_5317711472027584">ICoordinate</a>) =&gt; void): <a href="#ICanvasElement_6459595766487005">ICanvasElement</a>&lt;T&gt;</td>
                            <td>Attaches event handler to current element event</td>
                        </tr>
                        <tr>
                            <td>detach (event: <a href="#TCanvasElementEvent_06428007861141372">TCanvasElementEvent</a>, handler?: (data: <a href="#ICoordinate_5317711472027584">ICoordinate</a>) =&gt; void): <a href="#ICanvasElement_6459595766487005">ICanvasElement</a>&lt;T&gt;</td>
                            <td>Detaches event handler from current element event</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ICanvasElementStyleAttributes_7918630799407658">Interface ICanvasElementStyleAttributes</h4>
            <p>Style properties that can be changed for every custom element</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>fill</td>
                            <td>string</td>
                            <td>Background color of the element</td>
                        </tr>
                        <tr>
                            <td>stroke</td>
                            <td>string</td>
                            <td>Border color of the element</td>
                        </tr>
                        <tr>
                            <td>stroke-width</td>
                            <td>number</td>
                            <td>Border width of the element</td>
                        </tr>
                        <tr>
                            <td>fill-opacity</td>
                            <td>number</td>
                            <td>Opacity of the element</td>
                        </tr>
                        <tr>
                            <td>font-size</td>
                            <td>number</td>
                            <td>Text element font size</td>
                        </tr>
                        <tr>
                            <td>font-weight</td>
                            <td>number</td>
                            <td>Text element font weight</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ICanvasRectAttributes_9460810613546908">Interface ICanvasRectAttributes extends <a href="#ICanvasElementStyleAttributes_7918630799407658">ICanvasElementStyleAttributes</a></h4>
            <p>Attribute of rect that can be changed for every custom element</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>height</td>
                            <td>number</td>
                            <td>Height in pixels of the element</td>
                        </tr>
                        <tr>
                            <td>width</td>
                            <td>number</td>
                            <td>Width in pixels of the element</td>
                        </tr>
                        <tr>
                            <td>rx</td>
                            <td>number</td>
                            <td>Radius in pixels x-axios of the element</td>
                        </tr>
                        <tr>
                            <td>ry</td>
                            <td>number</td>
                            <td>Radius in pixels y-axios of the element</td>
                        </tr>
                        <tr>
                            <td>coords</td>
                            <td><a href="#TPosition_3201977562385554">TPosition</a></td>
                            <td>Position of the element</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ICanvasTextAttributes_919903973108549">Interface ICanvasTextAttributes extends <a href="#ICanvasElementStyleAttributes_7918630799407658">ICanvasElementStyleAttributes</a></h4>
            <p>Text element attributes that can be changed for every custom text element</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>dx</td>
                            <td>number</td>
                            <td>Offset in pixels x-axios of the element</td>
                        </tr>
                        <tr>
                            <td>dy</td>
                            <td>number</td>
                            <td>Offset in pixels y-axios of the element</td>
                        </tr>
                        <tr>
                            <td>text</td>
                            <td>string</td>
                            <td>Text of the element</td>
                        </tr>
                        <tr>
                            <td>coords</td>
                            <td><a href="#TPosition_3201977562385554">TPosition</a></td>
                            <td>Position of the element</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ICanvasCircleAttributes_8903090928939335">Interface ICanvasCircleAttributes extends <a href="#ICanvasElementStyleAttributes_7918630799407658">ICanvasElementStyleAttributes</a></h4>
            <p>Attribute of circle that can be changed for every custom element</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>r</td>
                            <td>number</td>
                            <td>Radius in pixels of the element</td>
                        </tr>
                        <tr>
                            <td>coords</td>
                            <td><a href="#TPosition_3201977562385554">TPosition</a></td>
                            <td>Position of the element</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ICanvasPathAttributes_7903966618522675">Interface ICanvasPathAttributes extends <a href="#ICanvasElementStyleAttributes_7918630799407658">ICanvasElementStyleAttributes</a></h4>
            <p>Attribute of path that can be changed for every custom element</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>path</td>
                            <td><a href="#IPathSeg_17730033837595904">IPathSeg</a>[]</td>
                            <td>path of the element</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ICanvasMarkerAttributes_5404855776022532">Interface ICanvasMarkerAttributes extends <a href="#ICanvasElementStyleAttributes_7918630799407658">ICanvasElementStyleAttributes</a></h4>
            <p>Attribute of marker that can be changed for every custom element</p>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>height</td>
                            <td>number</td>
                            <td>Height in pixels of the element</td>
                        </tr>
                        <tr>
                            <td>width</td>
                            <td>number</td>
                            <td>Width in pixels of the element</td>
                        </tr>
                        <tr>
                            <td>x</td>
                            <td>number</td>
                            <td>Position of the element</td>
                        </tr>
                        <tr>
                            <td>y</td>
                            <td>number</td>
                            <td>Position of the element</td>
                        </tr>
                        <tr>
                            <td>dx</td>
                            <td>number</td>
                            <td>Offset in pixels x-axios of the element</td>
                        </tr>
                        <tr>
                            <td>dy</td>
                            <td>number</td>
                            <td>Offset in pixels y-axios of the element</td>
                        </tr>
                        <tr>
                            <td>coords</td>
                            <td><a href="#TPosition_3201977562385554">TPosition</a></td>
                            <td>Position of the element</td>
                        </tr>
                        <tr>
                            <td>href</td>
                            <td>string</td>
                            <td>Image href of the element</td>
                        </tr>
                        <tr>
                            <td>buffer</td>
                            <td>ArrayBuffer</td>
                            <td>Image ArrayBuffer of the element</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="TPathSegPoint_36185951910039704">Type TPathSegPoint</h4>
            <code><a href="#ILocation_8963072152506912">ILocation</a> | <a href="#ICoordinate_5317711472027584">ICoordinate</a> | number</code>
            <p>Location or coordinate of the next point</p>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="TCanvasElementAttributes_5122011616287052">Type TCanvasElementAttributes</h4>
            <code><a href="#ICanvasRectAttributes_9460810613546908">ICanvasRectAttributes</a> | <a href="#ICanvasTextAttributes_919903973108549">ICanvasTextAttributes</a> | <a href="#ICanvasCircleAttributes_8903090928939335">ICanvasCircleAttributes</a> | <a href="#ICanvasPathAttributes_7903966618522675">ICanvasPathAttributes</a> | <a href="#ICanvasMarkerAttributes_5404855776022532">ICanvasMarkerAttributes</a></code>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="TCanvasElementEvent_06428007861141372">Type TCanvasElementEvent</h4>
            <code>"click" | "over" | "out"</code>
            <p>Supported custom map element event types</p>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="TMarkerSource_7275018139374292">Type TMarkerSource</h4>
            <code>string | ArrayBuffer</code>
            <p>Marker can be presented as a encoded SVG or base64 string or URL to third party resource or binary array in ArrayBufferb</p>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ILocation_8963072152506912">Interface ILocation</h4>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>lat</td>
                            <td>number</td>
                        </tr>
                        <tr>
                            <td>lng</td>
                            <td>number</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="ICoordinate_5317711472027584">Interface ICoordinate</h4>
            <div className="mapAddins__table-container">
                <table className="mapAddins__table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>x</td>
                            <td>number</td>
                        </tr>
                        <tr>
                            <td>y</td>
                            <td>number</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="mapAddins__docs-service__part">
            <h4 id="TPosition_3201977562385554">Type TPosition</h4>
            <code><a href="#ILocation_8963072152506912">ILocation</a> | <a href="#ICoordinate_5317711472027584">ICoordinate</a></code>
        </div>
    </div>
</div>;


const exampleAddins: ReactNode = <div className="paragraph">
    <p>
        <a  target="_blank" rel="noreferrer" href="https://github.com/Geotab/sdk-map-addin-samples">Here are some examples</a> and <a  target="_blank" rel="noreferrer" href="https://github.com/Geotab/map-addins-definitions/">type definition files</a> that can help you understand how to work with Map Add-ins. Download them, unzip the files, then follow the instructions in the ReadMe document.
    </p>
</div>;

export default function MapAddins() {
    return (
        <div className="pageContent">
            <div className="grayBackground">
                <div className="breadCrumb">
                    <span>MYG</span>
                    <IconChevronRightSmall></IconChevronRightSmall>
                    <span>Add-Ins</span>
                    <IconChevronRightSmall></IconChevronRightSmall>
                    <span>Map Add-ins</span>
                </div>
                <h1 className="title">Geotab Map Add-In Overview</h1>
            </div>
            <div className="paragraph">
                <p>
                    Map Add-ins are integrations embedded within the Map or Trips History pages of the MyGeotab platform. Once installed, a panel will appear on the right-side of the Map or Trips History page, containing the UI of the Map Add-in. These Add-ins can read from and operate on the map, as well as access the MyGeotab APIs. This document outlines the installation process and APIs available for Map Add-In development.
                </p>
                <p>
                    Below is an example of a Map Add-In installed within the Map page of MyGeotab. When a user clicks a vehicle on the map, this integration displays the relevant data for that vehicle.
                </p>
                <figure>
        <img className="mapAddins__image" src={mapVehicleInfoImage} alt="Figure #1 - The &quot;Vehicle Info&quot; Map Add-in." />
        <figcaption>Figure #1 - The &quot;Vehicle Info&quot; Map Add-in.</figcaption>
    </figure>

            </div>
            <Accordion summary="Installation" p={Installation}></Accordion>
            <Accordion summary="Usage" p={Usage}></Accordion>
            <Accordion summary="Map Add-In Services" p={MapAddinServices}></Accordion>
            <Accordion summary="Example Add-Ins" p={exampleAddins}></Accordion>
        </div>
    );
};