import { ReactNode } from "react";
import InformationalBox from "../../../components/InformationalBox/InformationalBox";
import { Page } from "../../../components";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import { HashLink } from "react-router-hash-link";

const linkToAPage: ReactNode = (
    <div className="paragraph">
        <p>To create a link to a page, the following URL structure is used:</p>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#<page>,<parameters>`}</code>
        <InformationalBox>
            <p>The portions of the examples noted with {`<`} and {`>`} (e.g. <code className="small-code-sample">{`<serverName>`}</code>)
                indicate where the user will enter information specific to their requirements.</p>
        </InformationalBox>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>serverName</td>
                        <td>The name of the server the database is on. For example, my.geotab.com</td>
                    </tr>
                    <tr>
                        <td>databaseName</td>
                        <td>The name of the database. This is typically the company name used during registration. If there are spaces in the name, they are replaced with underscore characters (_)</td>
                    </tr>
                    <tr>
                        <td>page</td>
                        <td>The MyGeotab web application page name</td>
                    </tr>
                    <tr>
                        <td>parameters</td>
                        <td>Additional arguments to apply to the request. For example,  <code className="small-code-sample">{`currentSortMode:deviceName`}</code> will sort the devices on the device
                            list page by name.
                            Note: each additional parameter is separated by a comma</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Example</h2>
        <p>Browse to your database using this URL format</p>
        <code className="small-code-sample">{`https://<my3.geotab.com>/<g560>/#devices`}</code>
        <p>Note: If you are not yet logged in, you will be prompted for your credentials.</p>
    </div>
);

const standalonePages: ReactNode = (
    <div className="paragraph">
        <p>Standalone pages are used to get a my.geotab.com page without the header and side menu. This is useful when specific functionality is required,
            for example adding a new vehicle to the system.
        </p>
        <p>To create a link to a page, the following URL structure is used:</p>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/geotab/checkmate/ui/<page>,<parameters>`}</code>
        <InformationalBox>
            <p>If you are not yet logged in, you will be prompted for your credentials.</p>
        </InformationalBox>
    </div>
);

const passingParameters: ReactNode = (
    <div className="paragraph">
        <p>Parameters are added at the end of the URL and each is separated by a comma. They work the same for both the normal and standalone page types. It is also important to note when no parameters
            are requested, the page will load with the default settings. The parameter and its value are always separated by a colon (":").</p>
        <h2>Example</h2>
        <p>These links will navigate to the map pages showing the live position of a device with id `b21`, and with the group `b1234` highlighted.</p>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#map,highlightGroup:b1234,liveVehicleIds:!(b21)`}</code>
        <br></br>
        <br></br>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/geotab/checkmate/ui/map.html#highlightGroup:b1234,liveVehicleIds:!(b21)`}</code>
    </div>
);

const listOfPages: ReactNode = (
    <div className="paragraph">
        <h2>Page: Devices</h2>
        <p>The list of devices in the system.</p>
        <p>Default: list of all devices sorted by name.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>sortMode</td>
                        <td>Sorts the list of devices in a specific way</td>
                        <td>byType — sort by devicebyName — sort by name</td>
                    </tr>
                    <tr>
                        <td>groupSelection</td>
                        <td>Divides the device list into subheadings, which are children groups of the selected parent</td>
                        <td><code className="small-code-sample">{`<groupName>`}</code> — parent group name that the device belongs to</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Example</h3>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#devices,groupSelection:someGroup`}</code>
        <br></br>
        <br></br>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#devices,sortMode:byName`}</code>
        <br></br>
        <br></br>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#devices,sortMode:byType`}</code>
        <h2>Page: Device</h2>
        <p>Edit an individual device.</p>
        <p>Default: no default page, you must have an id parameter.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>id</td>
                        <td>Goes to a device's edit page</td>
                        <td><code className="small-code-sample">{`<deviceId>`}</code></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Example</h3>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#device,id:<b12>`}</code>
        <h2>Page: DeviceSerialNo</h2>
        <p>Add a new device.</p>
        <p>Default: add new device page. No parameters required.</p>
        <h3>Example</h3>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#deviceSerialNo`}</code>
        <h2>Page: Map</h2>
        <p>The map viewer page.</p>
        <p>Default: shows the map with your default map settings.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>liveVehicleIds</td>
                        <td>Used to show the live location of a device by its id</td>
                        <td><code className="small-code-sample">{`<list of deviceIds>`}</code></td>
                    </tr>
                    <tr>
                        <td>planRoutes</td>
                        <td>Show a route on the map</td>
                        <td><code className="small-code-sample">{`<list of deviceIds>`}</code></td>
                    </tr>
                    <tr>
                        <td>highlightGroup</td>
                        <td>Will highlight all devices in that group on the map display</td>
                        <td><code className="small-code-sample">{`<groupId>`}</code></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Example</h3>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#map,liveVehicleIds:!(b12,b65,b3)`}</code>
        <br></br>
        <br></br>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#map,planRoutes:!(b2,b3,b1)`}</code>
        <h2>Page: TripsHistory</h2>
        <p>The detailed vehicle trip history page.</p>
        <p>Default: will request you to select settings from the drop down menus. You can define the settings using the parameters.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>dateRange</td>
                        <td>Sets the range of dates for the trips</td>
                        <td><code className="small-code-sample">{`(interval:<value>)`}</code>
                            — values:
                            <code className="small-code-sample">Today</code>,
                            <code className="small-code-sample">Yesterday</code>,
                            <code className="small-code-sample">This Week</code>,
                            <code className="small-code-sample">Last Week</code>,
                            <code className="small-code-sample">This Month</code>,
                            <code className="small-code-sample">Last Month</code>,
                            <code className="small-code-sample">{`(interval:custom,startDate: <date1>,endDate:<date2>)`}</code>
                        </td>
                    </tr>
                    <tr>
                        <td>entityType</td>
                        <td>Show activity for drivers or devices</td>
                        <td>Device — list device activity, Driver — list driver activity</td>
                    </tr>
                    <tr>
                        <td>selectedEntities</td>
                        <td>Vehicles to list information for</td>
                        <td>!(<code className="small-code-sample">{`<listOfEnitities>`}</code>) or <code className="small-code-sample">{`all`}</code></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Example</h3>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#tripsHistory,dateRange:(interval:<Today>),entityType:Device,selectedEntities:!(<b1,b7,b21>)`}</code>
        <br></br>
        <br></br>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#tripsHistory,dateRange:(interval:<custom,startDate:'2015-08-08T04:00:00.000Z',endDate:'2015-08-09T03:59:59.999Z>')
    ,entityType:<Driver>`}</code>
        <h2>Page: Zones</h2>
        <p>The zone list page.</p>
        <p>Default: list of all zones by name.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>sortOrder</td>
                        <td>The list order</td>
                        <td><code className="small-code-sample">{`1`}</code> — list alphabetically, <code className="small-code-sample">{`-1`}</code> — Invert the list</td>
                    </tr>
                    <tr>
                        <td>sortMode</td>
                        <td>Choose how the sort the list</td>
                        <td><code className="small-code-sample">{`zoneName`}</code>
                            — sorts by name,
                            <code className="small-code-sample">{`zoneType`}</code>
                            — sorts by type,
                            <code className="small-code-sample">{`zoneGroup`}</code>
                            — sorts by group</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Example</h3>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#zones,sortOrder:-1,sortMode:zoneGroup`}</code>
        <br></br>
        <br></br>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#zones,sortMode:zoneName`}</code>
        <br></br>
        <br></br>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#zones,sortMode:zoneType`}</code>
        <h2>Page: Zone</h2>
        <p>The zone edit page.</p>
        <p>Default: No default available. Needs parameters.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>id</td>
                        <td>Goes to edit page for the selected zone</td>
                        <td><code className="small-code-sample">{`<zoneId>`}</code></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Example</h3>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#zone,id:<b12>`}</code>
        <h2>Page: Notifications</h2>
        <p>The notification list page.</p>
        <p>Default: full list of user notifications listed in order of most recent time.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>sortOrder</td>
                        <td>The list order</td>
                        <td><code className="small-code-sample">{`1`}</code> — list the most recent time first <code className="small-code-sample">{`-1`}</code> — invert the list</td>
                    </tr>
                    <tr>
                        <td>sortMode</td>
                        <td>Selects the sort mode</td>
                        <td><code className="small-code-sample">{`machineName`}</code> — sorts by machine</td>
                    </tr>
                    <tr>
                        <td>showDismissed:!t</td>
                        <td>Shows all dismissed messages</td>
                        <td>None</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Example</h3>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#notifications,sortOrder:-1,sortMode:machineSort,showDismissed:!t`}</code>
        <h2>Page: Users</h2>
        <p>The user list page.</p>
        <p>Default: list of all current users.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>sortOrder</td>
                        <td>The list order</td>
                        <td><code className="small-code-sample">{`1`}</code> — list the most recent time first <code className="small-code-sample">{`-1`}</code> — invert the list</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Example</h3>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#users,sortOrder:-1`}</code>
        <h2>Page: User</h2>
        <p>The user edit page.</p>
        <p>Default: goes to add a new user page.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>id</td>
                        <td>The user’s id. Will link to the edit page for that user</td>
                        <td><code className="small-code-sample">{`<userId>`}</code></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Example</h3>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#user,id:<b32>`}</code>
        <h2>Page: Options</h2>
        <p>The user preferences page.</p>
        <p>Default: edit user preferences page, no parameters required.</p>
        <h3>Example</h3>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/#options`}</code>
    </div>
);

const credentials: ReactNode = (
    <div className="paragraph">
        <h2>Links that include username and database</h2>
        <p>It is possible to insert username and database credentials into a URL. Note that the user will be required to be logged in to utilize these types of links.</p>
        <p>MyGeotab Page Example</p>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/?('userName':'<userName>','database':<databaseName>)#<page>`}</code>
        <p>Standalone Page Example</p>
        <code className="small-code-sample">{`https://<serverName>/<databaseName>/geotab/checkmate/ui/<page>#credentials:(database:<databaseName>,userName:'<userName>')`}</code>
        <p>We do not support passing the password credential through the URL because it is unsafe. </p>
    </div>
);

const gettingSessionId: ReactNode = (
    <div className="paragraph">
        Refer to the <HashLink to="/myGeotab/guides/concepts/#authentication">Authentication</HashLink> section. Within that section the instructions explain the process of authenticating a user to obtain their session id.
    </div>
);

const securitySessionId: ReactNode = (
    <div className="paragraph">
        By using the sessionId, a valid login is created for that account. Another user will be able to fully access that account as long as the sessionId credential remain valid.
        If an application is being created where the sessionId could potentially be viewed by another party, it is advised to generate the credentials using an account with access limited only
        to the necessary data.
    </div>
);

const embeddingMyGInIframe: ReactNode = (
    <div className="paragraph">
        <h2>Trusted domains only</h2>
        <p>Due to the risk of <a href="https://en.wikipedia.org/wiki/Clickjacking">ClickJacking</a>, MyGeotab will instruct the browser to prevent MyGeotab from loading inside a frame that came
            from an arbitrary domain. Customers wishing to utilize this feature must meet the minimum security requirements. Please contact your reseller for more details.</p>
        <h3>Info for resellers</h3>
        <p>If your customer wish to embed MyGeotab pages inside an iFrame, you need to request it through MyAdmin. Please, create a ticket specifying the URL of the MyGeotab database, business
            justification and URL on which it will be integrated. Geotab's support team will initiate the process to get the requested domains approved.</p>
        <p>This process can take some time as the domains need to be reviewed by Geotab's security team before being added to the approved list by the development team.</p>
    </div>
);

const pageTitle: PageTitleProps = {
    "title": "Using MyGeotab URLs",
    "breadCrumbItems": ["MYG", "Guides", "Using MyGeotab URLs"]
};

const pageSections: TableOfContentsItem[] = [
    {
        "elementId": "link-to-page",
        "summary": "Link to a page",
        "details": linkToAPage
    },
    {
        "elementId": "standalone-pages",
        "summary": "Standalone pages",
        "details": standalonePages
    },
    {
        "elementId": "passing-parameters",
        "summary": "Passing parameters to a page",
        "details": passingParameters
    },
    {
        "elementId": "list-of-pages",
        "summary": "List of pages and accepted parameters",
        "details": listOfPages
    },
    {
        "elementId": "credentials",
        "summary": "Credentials",
        "details": credentials
    },
    {
        "elementId": "custom-devices",
        "summary": "Getting the session id using the API",
        "details": gettingSessionId
    },
    {
        "elementId": "security-session-id",
        "summary": "Security using the session id",
        "details": securitySessionId
    },
    {
        "elementId": "embedding-myg-in-iframe",
        "summary": "Embedding MyGeotab inside an IFrame",
        "details": embeddingMyGInIframe
    }
];

export default function myGeotabUrls() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                This guide explains how to format a URL (Uniform Resource Locator) to obtain access to a specific page/feature in MyGeotab.
                This can be used to link to MyGeotab from an Internet application, sending an email notification, third-party applications and other customized functions.
            </div>
        </Page>
    );
}