import { ReactNode } from "react";
import Accordion from "../../../components/Accordion/Accordion";
import hierarchyDiagram from "../../../assets/images/usingGoDevices/using-go-devices_0.png";
import { CodeSample } from "../../../components/CodeSamplesContainer";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { Page } from "../../../components";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";

const overview: ReactNode = (
    <div className="paragraph">
        Data flows from the GO device to the MyGeotab hosted solution automatically.
        The first step is to create a database to receive the device's data (as outlined in <a href="../getting-started/">Getting Started</a>). {/* TODO: check link*/}
        Once that is complete, the device can be accessed using the APIs defined below.
    </div>
);

const deviceHierarchy: ReactNode = (
    <div className="paragraph">
        Different devices can support different features. Device objects are designed to extend from shared objects that have mutual support.
        In this way, each device object will only have properties that are supported and relevant for its specific type.
        The image below illustrates how different device types relate to each other and their hierarchy.
        <br></br>
        <img src={hierarchyDiagram} alt="device hiearchy" /> {/*TODO: what do we want to do with alt?*/}
    </div>
);

const apiToAddVehicles: ReactNode = (
    <div className="paragraph">
        <p>Geotab has a robust API that allows third-party developers to create their own applications that use data from Geotab hardware.
            A partner using Geotab hardware with their own software must use the API to add their Geotab devices to the database, as discussed above.</p>
        <h2>Adding a Single Device</h2>
        <p>C# API</p>
        <CodeSample
            language="csharp"
            code={`var api = new API(username, password, null, database);
var device = Device.FromSerialNumber("GT970000006A");
device.Name = "My First Car";
device.Id = await api.CallAsync<Id>("Add", typeof (Device), new {entity = device});`}
        />
        <p>JavaScript API</p>
        <CodeSample
            language="javascript"
            code={
                `let newDevice = {
    name: "My First Car",
    serialNumber: "GT970000006A"
};
        
api.call("Add", {
    typeName: "Device",
    entity: newDevice
}, result => {
    newDevice.id = result;
}, err => {
    alert(err);
});`
            }
        />
        <p>HTTP GET request</p>
        <CodeSample
            language="javascript"
            code={
                `https://YourServerName.geotab.com/apiv1/Add?typeName=Device&entity={"serialNumber":"GT970000006A","Name":"My First Car"}&credentials={"database":"Your Database Name","userName":"Your User Name","password":"Your Password"}`
            }
        />
        <p>The above code samples show a sample call to add a single device to a database using the C# API, JavaScript API and an HTTP request.
            Please refer to the API documentation for more information.</p>
        <h2>Adding Multiple Devices</h2>
        <p>Both the C# and JavaScript examples contain a comprehensive demonstration of how to add multiple devices to a database.
            This can be used as a starting point for additional development.
        </p>
        <h2>Enable In-Vehicle Features</h2>
        <p>To enable or disable vehicle features, the appropriate properties of the Device/GoDevice object must be set.
            For example, to enable beeping before adding the device to MyGeotab, the C# example above would be changed to:<br></br></p>
        <CodeSample
            language="csharp"
            code={
                `var api = new API(username, password, null,  database);

// GoCurve extends from Device and models a GoDevice with beeping features
GoCurve device = (GoCurve)Device.FromSerialNumber("GT970000006A");
device.Name = "My First Car";
device.DisableBuzzer = false;
device.Id = api.CallAsync<Id>("Add", typeof (Device), new {entity = device});`
            }
        />
        <p>Please note that GO devices use a byte value to track parameter changes. If an in-vehicle feature like a speeding alert was enabled, increment the parameterVersion property by 1.
            If a device has already been added to MyGeotab it can have features enabled or disabled by first obtaining the device parameters, changing the desired properties,
            and then calling the 'Set' method instead of 'Add'. The API documentation has a number of examples on how to Get, change, and Set a device.</p>
    </div >
);

const apiToExtractData: ReactNode = (
    <div className="paragraph">
        The simplest way to extract data efficiently and reliably is to create a data feed.
        There are special methods for this application — see the <a href="../data-feed/">Data Feed</a> documentation for a comprehensive explanation of the data feed and links to example code.
        {/*TODO: fix link */}
    </div>
);

const pageTitle: PageTitleProps = {
    "title": "Using GO Devices In Your Software",
    "breadCrumbItems": ["MYG", "Guides", "Using GO Devices"]
};

const pageSections: TableOfContentsItem[] = [
    {
        "elementId": "overview",
        "summary": "Overview",
        "details": overview
    },
    {
        "elementId": "device-hierarchy",
        "summary": "Device Hierarchy",
        "details": deviceHierarchy
    },
    {
        "elementId": "api-add-vehicles",
        "summary": "API To Add Vehicles",
        "details": apiToAddVehicles
    },
    {
        "elementId": "api-extract-data",
        "summary": "API To Extract Data",
        "details": apiToExtractData
    }
];

export default function UsingGoDevices() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                Geotab offers an option where the GO device hardware can be used without using the MyGeotab fleet management software.
                The rich telematics data that is captured by Geotab's hardware can be utilized in a customized software solution.
                This document covers the necessary steps to set up a customized solution. Note that the same API is used to retrieve the data from Geotab's
                hosting solution and is identical to the regular MyGeotab configuration.
            </div>
        </Page>
    );
};