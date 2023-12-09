import { ReactNode } from "react";
import CodeSample from "../../../components/CodeSamplesContainer/CodeSample";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import { Page } from "../../../components";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import Accordion from "../../../components/Accordion/Accordion";
import InformationalBox from "../../../components/InformationalBox/InformationalBox";

const specialRequirements: ReactNode = (
    <div className="paragraph">
        <h2>Enabling IOX-USB Data Transfer</h2>
        <p>To enable third-party data communication on the IOX-USB, apply the following custom parameter to the GO device through MyGeotab:</p>
        <code className="small-code-sample">{`<GoParameters><Parameter Description="Enable USB Data" Offset="164" Bytes="02"/></GoParameters>`}</code>
        <InformationalBox>
            <p>The GO device will automatically upgrade to the ProPlus rate plan once third-party data transfer begins.</p>
        </InformationalBox>
        <h2>Powering A Device Using The IOX-RS232 And IOX-USB</h2>
    </div>
);

const apiClass: ReactNode = (
    <div className="paragraph">
        <h2>Step 1: Initialize & Authentication</h2>
        <p>In order to have access to the API class, add the following to the file's includes section:</p>
        <CodeSample
            language="csharp"
            code={
                `using Geotab.Checkmate;
using Geotab.Checkmate.ObjectModel;`
            }
        />
        <p>An instance of API can now be constructed to be used in the code. For the most basic use case, all the data that is needed is user credentials and a database name:</p>
        <CodeSample
            language="csharp"
            code={
                `var api = new API(userName, password, null, databaseName, server);`
            }
        />
        <p>At this point there has not been any communication with Geotab's servers. In order to make calls to Geotab's API, an authentication call must be made:</p>
        <CodeSample
            language="csharp"
            code={
                `await api.AuthenticateAsync();`
            }
        />
        <p>When the call is made to Geotab’s servers to authenticate, a token is returned for security. Behind the scenes, the Authenticate call makes a JSON-RPC request to Geotab's
            "Authenticate" method. The resulting security token and server information are stored in order to make further calls to the API.</p>
        <h2>Step 2: Making Calls</h2>
        <p >When authenticated, calls are made to the API by invoking the <code className="small-code-sample">{`Call`}</code> method of the API class.</p>
        <p>The example below illustrates how to make a generic call to get all devices in the system.</p>
        <code className="small-code-sample">{`List<Device> devices = await api.CallAsync<List<Device>>("Get", typeof(Device));`}</code>
        <p>In the example below it is shown how to delete a device using the generic "Remove" method. Notice that it is not required to send all of the device's information to remove it,
            the device's id is sufficient:</p>
        <CodeSample
            language="csharp"
            code={
                `await api.CallAsync<object>("Remove", typeof(Device), new {
    entity = new Device {
        Id = "b1a34"
    }
});`
            }
        />
        <p>The last parameter to this Call method is an <a href="http://msdn.microsoft.com/en-us/library/bb397696.aspx" target="_blank" rel="noopener noreferrer">anonymous object</a> which contains the
            parameters for the method (please review the <a href="../../api/reference/#Remove1">API reference</a> to see which parameters the method expects, and whether the parameters are required or optional).
            The parameter order is not significant, and it is acceptable to omit optional parameters. Optional parameters will revert to their default values, typically "null" or “false” values.</p>
        <p>The API class automatically handles databases that are moved to different servers in the federation and expired tokens (token are typically valid for 2 weeks) by automatically
            re-authenticating and continuing.</p>
        <h2>Example Code</h2>
        <p>The following is a simple console app that will output the latitude and longitude of each device in a list of devices:</p>
        <CodeSample
            language="csharp"
            code={
                `// Create the API object and authenticate
public static async Task Main(string[] args) {
// Create the API object and authenticate
    var api = new API("bob@geotab.com", "password", null, "demo", "server");
    await api.AuthenticateAsync();
            
    // Get all devices
    var devices = await api.CallAsync<List<Device>>("Get", typeof(Device));
    Console.WriteLine("SerialNumber\tLatitude\tLongitude");
    foreach (Device device in devices) {
        // Get the Device Status Info which contains the current latitude and longitude for this device
            var results = await api.CallAsync<List<DeviceStatusInfo>>("Get", typeof(DeviceStatusInfo), new {
                search = new DeviceStatusInfoSearch {
                    DeviceSearch = new DeviceSearch {
                        Id = device.Id
                    }
                }
            });
            
        if (results.Count <= 0) {
            continue;
        }
            
        DeviceStatusInfo deviceStatus = results[0];
            
        // Print the results to the console
        Console.WriteLine(device.SerialNumber + "\t" + deviceStatus.Latitude + "\t" + deviceStatus.Longitude);
    }
}`
            }
        />
        <p>After entering your credentials into the API constructor, this example will produce results similar to this in your command prompt window.</p>
        <CodeSample
            language="bash"
            code={
                `> dotnet run
SerialNumber    Latitude        Longitude
G70000000001    43.4371071      -79.7124329
G70000000002    43.3683701      -79.7784042
G80000000003    43.4620934      -79.6879883`
            }
        />
    </div>
);

const nextSteps: ReactNode = (
    <div className="paragraph">
        Once you have a basic understanding of how the .NET SDK works, we recommend reviewing the examples that we have created {" "}
        <a href="https://github.com/Geotab/sdk-dotnet-samples" target="_blank" rel="noopener noreferrer">here</a>.
    </div>
);

const pageTitle: PageTitleProps = {
    "title": "Add-On Protocol - RS232 & USB",
    "breadCrumbItems": ["Hardware", "Guides", "RS232 & USB"]
};

const pageSections: TableOfContentsItem[] = [
    {
        "elementId": "special-requirements",
        "summary": "Special Requirements",
        "details": specialRequirements
    },
    {
        "elementId": "api-class",
        "summary": "API Class",
        "details": apiClass
    },
    {
        "elementId": "next-steps",
        "summary": "Next Steps",
        "details": nextSteps
    },
    {
        "elementId": "next-steps",
        "summary": "Next Steps",
        "details": nextSteps
    },
    {
        "elementId": "next-steps",
        "summary": "Next Steps",
        "details": nextSteps
    }
];

export default function Rs232Usb() {
    return (
        <Page section={HeaderSections.Hardware} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
            External devices can communicate with a Geotab GO device through the Third-Party RS232 and USB protocols linked below. Two-way communication is supported, allowing a MyGeotab API call to 
            produce messages from the IOX device to reach the external device. The hardware interface is one of the following:
            <ul>
                <li><a href="https://www.geotab.com/documentation/iox-rs232/" target="_blank" rel="noopener noreferrer" aria-label="IOX-RS232 Support Documentation">IOX-RS232 F/M</a></li>
                <li><a href="https://www.geotab.com/documentation/iox-usb/" target="_blank" rel="noopener noreferrer" aria-label="IOX-USB Support Documentation">IOX-USB</a></li>
            </ul>
            </div>

            {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId} />)}
        </Page>
    );
};