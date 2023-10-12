import { ReactNode } from "react";
import Accordion from "../../../components/Accordion/Accordion";
import { IconChevronRightSmall } from "@geotab/react-component-library";
import hierarchyDiagram from "../../../assets/images/usingGoDevices/using-go-devices_0.png";

const overview: ReactNode = <div className="paragraph">
    Data flows from the GO device to the MyGeotab hosted solution automatically.
    The first step is to create a database to receive the device's data (as outlined in <a href="../getting-started/">Getting Started</a>).
    Once that is complete, the device can be accessed using the APIs defined below.
</div>

const deviceHierarchy: ReactNode = <div className="paragraph">
    Different devices can support different features. Device objects are designed to extend from shared objects that have mutual support.
    In this way, each device object will only have properties that are supported and relevant for its specific type.
    The image below illustrates how different device types relate to each other and their hierarchy.
    <br></br>
    <img src={hierarchyDiagram} alt="device hiearchy" /> {/*TODO: what do we want to do with alt?*/}
</div>

const apiToAddVehicles: ReactNode = <div className="paragraph">
    <p>Geotab has a robust API that allows third-party developers to create their own applications that use data from Geotab hardware.
        A partner using Geotab hardware with their own software must use the API to add their Geotab devices to the database, as discussed above.</p>
    <h2>Adding a single device</h2>
    <p>C# API</p>
    {/*TODO: code block */}
    <p>JavaScript API</p>
    {/*TODO: code block */}
    <p>HTTP GET request</p>
    {/*TODO: code block */}
    <p>The above code samples show a sample call to add a single device to a database using the C# API, JavaScript API and an HTTP request.
        Please refer to the API documentation for more information.</p>
    <h2>Adding Multiple Devices</h2>
    <p>Both the C# and JavaScript examples contain a comprehensive demonstration of how to add multiple devices to a database.
        This can be used as a starting point for additional development.
    </p>
    <h2>Enable in-vehicle features</h2>
    <p>To enable or disable vehicle features, the appropriate properties of the Device/GoDevice object must be set.
        For example, to enable beeping before adding the device to MyGeotab, the C# example above would be changed to:<br></br></p>
    {/*TODO: code block */}
    <p>Please note that GO devices use a byte value to track parameter changes. If an in-vehicle feature like a speeding alert was enabled, increment the parameterVersion property by 1.
        If a device has already been added to MyGeotab it can have features enabled or disabled by first obtaining the device parameters, changing the desired properties,
        and then calling the 'Set' method instead of 'Add'. The API documentation has a number of examples on how to Get, change, and Set a device.</p>
</div>

const apiToExtractData: ReactNode = <div className="paragraph">
    The simplest way to extract data efficiently and reliably is to create a data feed.
    There are special methods for this application — see the <a href="../data-feed/">Data Feed</a> documentation for a comprehensive explination of the data feed and links to example code.
    {/*TODO: fix link */}
</div>

export default function UsingGoDevices() {
    return (
        <div className="pageContent">
            <div className="grayBackground">
                <div className="breadCrumb">
                    <span>MYG</span>
                    <IconChevronRightSmall></IconChevronRightSmall>
                    <span>Guides</span>
                    <IconChevronRightSmall></IconChevronRightSmall>
                    <span>Using GO Devices</span>
                </div>
                <h1 className="title">Using GO devices in your software</h1>
            </div>
            <div className="paragraph">
                Geotab offers an option where the GO device hardware can be used without using the MyGeotab fleet management software.
                The rich telematics data that is captured by Geotab's hardware can be utilized in a customized software solution.
                This document covers the necessary steps to set up a customized solution. Note that the same API is used to retrieve the data from Geotab's
                hosting solution and is identical to the regular MyGeotab configuration.
            </div>

            <Accordion summary="Overview" p={overview}></Accordion>
            <Accordion summary="Device hierarchy" p={deviceHierarchy}></Accordion>
            <Accordion summary="API to add vehicles" p={apiToAddVehicles}></Accordion>
            <Accordion summary="API to extract data" p={apiToExtractData}></Accordion>
        </div>
    );
};