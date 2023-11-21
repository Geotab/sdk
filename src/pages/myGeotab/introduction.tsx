import { ReactNode } from "react";
import Accordion from "../../components/Accordion/Accordion";
import { Page } from "../../components";
import { PageTitleProps } from "../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../components/TableOfContents/TableOfContents";

const deviceData: ReactNode =
    <div className="paragraph" id="device-data">
        The Geotab Data Feed API is a scalable, efficient and secure method to access all the device's data.
        <br></br>
        There are many different types of data that can be requested from the API. For example:
        <ul>
            <li>LogRecords (GPS and speed)</li>
            <li>StatusData (readings of vehicle measurements e.g. oil temperature or accelerometer)</li>
            <li>FaultData (fault codes reported by the engine)</li>
        </ul>
        See the full list of supported data feed types <a hrefLang="../api/reference/#GetFeed1">here</a> {/* TODO: Need to replace this with routing for feed, Add info icon here*/}
        <br></br>
        The data feed service sample application allows the feed to be installed as a service and run continuously in the background downloading data from the database
        (see <a href="https://github.com/Geotab/sdk-dotnet-samples/tree/master/DataFeed#data-feed">here for .Net</a> or <a href="https://github.com/Geotab/sdk-java-samples/tree/master/src/main/java/com/geotab/sdk/datafeed">here for Java</a>).
    </div>;

const importExport: ReactNode =
    <div className="paragraph" id="import-export">
        Geotab has a set of pre-made applications (which include full source code) for synchronizing MyGeotab data and can be used for example to:
        <ul>
            <li>Import your customer list from a <a href="http://en.wikipedia.org/wiki/Customer_relationship_management">CRM</a> (Customer Relationship Management) system</li>
            <li>Download your vehicle maintenance records into a maintenance system (DVIR)</li>
            <li>Keep your routes up to date based on the day's deliveries</li>
            <li>Synchronize your vehicle groups based on the vehicle's role in the company</li>
            <li>Track Hours of Service (HOS) for regulations compliance</li>
        </ul>
        You can start using these tools right now by trying the <a href="https://github.com/Geotab/sdk-dotnet-samples">.Net examples</a>,
        <a href="../js-samples/">JavaScript examples</a> and <a href="https://github.com/Geotab/sdk-java-samples">Java examples</a>. {/*TODO: fix link*/}
    </div>;

const automatingTasks: ReactNode =
    <div className="paragraph" id="automating-tasks">
        Common tasks that you perform online using MyGeotab can all be automated using the Geotab API. You can create time-saving scripts or automated processes such as:
        <ul>
            <li>When a new pick-up arrives, automate the dispatching by sending a text message to the vehicle's Garmin through an attached GO device</li>
            <li>Synchronize your customer's location with the closest vehicle when a new work order is created</li>
        </ul>
    </div>;

const workingWithAddins: ReactNode =
    <div className="paragraph" id="working-with-addins">
        Geotab has developed a number of Add-In products which can be easily integrated into your MyGeotab UI. The benefits of using Add-Ins are:
        <ul>
            <li>Ready availability of Add-Ins to instantly integrate into your MyGeotab and Geotab Drive. Visit the <a href="http://www.geotab.com/marketplace/">Geotab Marketplace</a> and the
                <a href="../guides/developing-addins/">Developing Add-Ins</a> SDK page to see the available Add-Ins</li> {/*TODO: fix link*/}
            <li>Versatility to create your own Add-In to customize a page or button to suit your needs</li>
        </ul>
    </div>;

const integratingWithMyG: ReactNode =
    <div className="paragraph" id="integrating-with-myg">
        You can integrate an embedded version of MyGeotab into your own web application. This is perfect for providing a website to your customers with insight as to where their deliveries are and when they will arrive.
        You have control of which features appear on the embedded MyGeotab to create a seamless integration between your software and ours.
        <br></br>
        By using single sign-on authentication with the Geotab API, you have the ability to manage several options from your MyGeotab user accounts including:
        <ul>
            <li>Receiving an authentication token from MyGeotab for a valid username/password</li>
            <li>Accepting the end user agreement on behalf of the user (this has legal implications)</li>
            <li>Updating a user's password</li>
            <li>Adding and removing a user</li>
        </ul>
        Each of the MyGeotab pages has a URL (Uniform Resource Locator) associated with the page that allows that page to be embedded in your own application or linked to.
        This is a great way to leverage MyGeotab and make it part of your services. See <a href="../guides/mygeotab-urls/">mygeotab-urls</a> for more details. {/*TODO: fix link*/}
    </div>;

const customDevices: ReactNode =
    <div className="paragraph" id="custom-devices">
        Custom telematics devices can have their data added into the MyGeotab database. The Geotab API is used to provision and upload the devices data.
        Additionally, data from these devices can be used in conjunction with data collected by Geotab GO devices. Contact Geotab support to have your custom telematics device added
        (each device type will receive a unique prefix code) and contact your reseller to handle billing.
        <br></br>
        Note: There may be differences in how devices from custom telematics manufacturers record the data; frequency of data collection and accuracy of the device record may vary.
        The rich information contained in the MyGeotab reports may not be fully available. Testing of these tracking device will be required to properly integrate the data into MyGeotab.
        <br></br>
        Please refer to [Using Custom Telematics Devices](../guides/custom-telematics-devices/) for further details on using your own devices with MyGeotab.
    </div>;

const softwareToolkit: ReactNode =
    <div className="paragraph" id="software-toolkit">
        The toolkit provides helpful integration resources and context which are in addition to the existing documentation and make it easier for partners to get up and running.
        <br></br>
        Please refer to <a href="https://docs.google.com/presentation/d/1fqtMPgsdwF3CQuvhqhC8SBwdI8PZDjUtpVGEzsdDYjo/">Geotab Integrations: Software Technical Toolkit</a> for further details.
    </div>;

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
        "summary": "Technical Software Toolkit",
        "details": softwareToolkit
    }
];

export default function Introduction() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                The MyGeotab SDK (Software Development Kit) is a powerful set of tools for automating tasks and working with the data in MyGeotab.
                Within these documents you will find information on how to develop JavaScript and C# applications, build and integrate Add-Ins and use MyGeotab with third-party systems.
                <br />
                Various working examples are included in this SDK for use as a starting point with your own code e.g.:
                <ul>
                    <li>Display vehicle trips on third-party map (for example <a href="http://leafletjs.com/">Leaflet</a> or <a href="https://developers.arcgis.com/javascript/">ArcGIS API for JavaScript</a>)</li>
                    <li>Integrate an embedded MyGeotab frame in your web application (real time map, vehicle listing and more)</li>
                    <li>Create your own web interface to import and export Geotab data</li>
                </ul>
                Keep up to date with Geotab's technical updates by subscribing to our <a href="https://www.geotab.com/subscription/">technical bulletins</a>.{/*TODO: Add info icon here*/}
            </div>

            {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} />)}
        </Page>
    );
};
