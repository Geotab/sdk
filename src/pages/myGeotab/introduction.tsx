import { ReactNode } from "react";
import { Page } from "../../components";
import { PageTitleProps } from "../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../components/TableOfContents/TableOfContents";
import { Link } from "react-router-dom";
import InformationalBox from "../../components/InformationalBox/InformationalBox";

const deviceData: ReactNode = (
    <div className="paragraph">
        <p>The Geotab Data Feed API is a scalable, efficient and secure method to access all the device's data.</p>
        <p>There are many different types of data that can be requested from the API. For example:</p>
        <ul>
            <li>LogRecords (GPS and speed)</li>
            <li>StatusData (readings of vehicle measurements e.g. oil temperature or accelerometer)</li>
            <li>FaultData (fault codes reported by the engine)</li>
        </ul>
        <InformationalBox>
            <p>See the full list of supported data feed types <Link to="/method/GetFeed1">here</Link></p>{/*TODO: is this right?*/}
        </InformationalBox>
        The data feed service sample application allows the feed to be installed as a service and run continuously in the background downloading data from the database
        (see <a target="_blank" rel="noreferrer" href="https://github.com/Geotab/sdk-dotnet-samples/tree/master/DataFeed#data-feed">here for .Net</a> or <a target="_blank" rel="noreferrer"
            href="https://github.com/Geotab/sdk-java-samples/tree/master/src/main/java/com/geotab/sdk/datafeed">here for Java</a>).
    </div>
);

const importExport: ReactNode = (
    <div className="paragraph">
        Geotab has a set of pre-made applications (which include full source code) for synchronizing MyGeotab data and can be used for example to:
        <ul>
            <li>Import your customer list from a <a target="_blank" rel="noreferrer" href="http://en.wikipedia.org/wiki/Customer_relationship_management">CRM</a>
                {" "}(Customer Relationship Management) system</li>
            <li>Download your vehicle maintenance records into a maintenance system (DVIR)</li>
            <li>Keep your routes up to date based on the day's deliveries</li>
            <li>Synchronize your vehicle groups based on the vehicle's role in the company</li>
            <li>Track Hours of Service (HOS) for regulations compliance</li>
        </ul>
        You can start using these tools right now by trying the <a target="_blank" rel="noreferrer" href="https://github.com/Geotab/sdk-dotnet-samples">.Net examples</a>,
        {" "}<Link to="/myGeotab/codeSamples/javascriptSamples">JavaScript examples</Link> and <a target="_blank" rel="noreferrer" href="https://github.com/Geotab/sdk-java-samples">Java examples</a>.
    </div>
);

const automatingTasks: ReactNode = (
    <div className="paragraph">
        Common tasks that you perform online using MyGeotab can all be automated using the Geotab API. You can create time-saving scripts or automated processes such as:
        <ul>
            <li>When a new pick-up arrives, automate the dispatching by sending a text message to the vehicle's Garmin through an attached GO device</li>
            <li>Synchronize your customer's location with the closest vehicle when a new work order is created</li>
        </ul>
    </div>
);

const workingWithAddins: ReactNode = (
    <div className="paragraph">
        Geotab has developed a number of Add-In products which can be easily integrated into your MyGeotab UI. The benefits of using Add-Ins are:
        <ul>
            <li>Ready availability of Add-Ins to instantly integrate into your MyGeotab and Geotab Drive. Visit the <a target="_blank" rel="noreferrer" href="http://www.geotab.com/marketplace/">
                Geotab Marketplace</a> and the <Link to="/myGeotab/addIns/developingAddIns">Developing Add-Ins</Link> SDK page to see the available Add-Ins</li>
            <li>Versatility to create your own Add-In to customize a page or button to suit your needs</li>
        </ul>
    </div>
);

const integratingWithMyG: ReactNode = (
    <div className="paragraph">
        <p>
            You can integrate an embedded version of MyGeotab into your own web application. This is perfect for providing a website to your customers with insight as to where their deliveries are and
            when they will arrive.
            You have control of which features appear on the embedded MyGeotab to create a seamless integration between your software and ours.
        </p>
        By using single sign-on authentication with the Geotab API, you have the ability to manage several options from your MyGeotab user accounts including:
        <ul>
            <li>Receiving an authentication token from MyGeotab for a valid username/password</li>
            <li>Accepting the end user agreement on behalf of the user (this has legal implications)</li>
            <li>Updating a user's password</li>
            <li>Adding and removing a user</li>
        </ul>
        Each of the MyGeotab pages has a URL (Uniform Resource Locator) associated with the page that allows that page to be embedded in your own application or linked to.
        This is a great way to leverage MyGeotab and make it part of your services. See <Link to="/myGeotab/guides/MyGeotabUrls">mygeotab-urls</Link> for more details.
    </div>
);

const customDevices: ReactNode = (
    <div className="paragraph">
        <p>
            Custom telematics devices can have their data added into the MyGeotab database. The Geotab API is used to provision and upload the devices data.
            Additionally, data from these devices can be used in conjunction with data collected by Geotab GO devices. Contact Geotab support to have your custom telematics device added
            (each device type will receive a unique prefix code) and contact your reseller to handle billing.
        </p>
        <p>
            Note: There may be differences in how devices from custom telematics manufacturers record the data; frequency of data collection and accuracy of the device record may vary.
            The rich information contained in the MyGeotab reports may not be fully available. Testing of these tracking device will be required to properly integrate the data into MyGeotab.
        </p>
        Please refer to [Using Custom Telematics Devices](../guides/custom-telematics-devices/) for further details on using your own devices with MyGeotab.
    </div>
);

const softwareToolkit: ReactNode = (
    <div className="paragraph">
        <p>The toolkit provides helpful integration resources and context which are in addition to the existing documentation and make it easier for partners to get up and running.</p>
        <p>Please refer to <a target="_blank" rel="noreferrer" href="https://docs.google.com/presentation/d/1fqtMPgsdwF3CQuvhqhC8SBwdI8PZDjUtpVGEzsdDYjo/">Geotab Integrations: Software Technical Toolkit</a>
            {" "} for further details.</p>
    </div>
);

const pageTitle: PageTitleProps = {
    "title": "Introduction",
    "breadCrumbItems": ["MYG", "Introduction"]
};

const pageSections: TableOfContentsItem[] = [
    {
        "elementId": "device-data",
        "summary": "Accessing the device's data",
        "details": deviceData
    },
    {
        "elementId": "import-export",
        "summary": "Importing, exporting and synchronizing",
        "details": importExport
    },
    {
        "elementId": "automating-tasks",
        "summary": "Automating tasks",
        "details": automatingTasks
    },
    {
        "elementId": "working-with-addins",
        "summary": "Working with Add-Ins",
        "details": workingWithAddins
    },
    {
        "elementId": "integrating-with-myg",
        "summary": "Integrating with MyGeotab",
        "details": integratingWithMyG
    },
    {
        "elementId": "custom-devices",
        "summary": "Integrating custom telematics tracking devices into MyGeotab",
        "details": customDevices
    },
    {
        "elementId": "software-toolkit",
        "summary": "Technical software toolkit",
        "details": softwareToolkit
    }
];

export default function Introduction() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                <p>
                    The MyGeotab SDK (Software Development Kit) is a powerful set of tools for automating tasks and working with the data in MyGeotab.
                    Within these documents you will find information on how to develop JavaScript and C# applications, build and integrate Add-Ins and use MyGeotab with third-party systems.
                </p>
                Various working examples are included in this SDK for use as a starting point with your own code e.g.:
                <ul>
                    <li>Display vehicle trips on third-party map (for example <a href="http://leafletjs.com/" target="_blank" rel="noopener noreferrer">Leaflet</a> or <a href="https://developers.arcgis.com/javascript/" target="_blank" rel="noopener noreferrer">ArcGIS API for JavaScript</a>)</li>
                    <li>Integrate an embedded MyGeotab frame in your web application (real time map, vehicle listing and more)</li>
                    <li>Create your own web interface to import and export Geotab data</li>
                </ul>
                <InformationalBox>
                    <p>Keep up to date with Geotab's technical updates by subscribing to our <a href="https://www.geotab.com/subscription/" target="_blank" rel="noopener noreferrer">technical bulletins</a>.</p>
                </InformationalBox>
            </div>
        </Page>
    );
};
