import { ReactNode } from "react";
import { Page } from "../../../../components";
import { PageTitleProps } from "../../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../../components/Header/headerSectionsEnum";
import Accordion from "../../../../components/Accordion/Accordion";
import { TableOfContentsItem } from "../../../../components/TableOfContents/TableOfContents";
import InformationalBox from "../../../../components/InformationalBox/InformationalBox";
import CodeSample from "../../../../components/CodeSamplesContainer/CodeSample";

const nugetPackage: ReactNode = (
    <div className="paragraph">
        <p>The <a href="https://www.nuget.org/packages/Geotab.Checkmate.ObjectModel/" target="_blank" rel="noopener noreferrer">nuget package</a> is an SDK library for accessing MyGeotab customer databases.
            It is a convenient "wrapper" around Geotab's HTTP/JSON API to allow developers focus on writing code instead of moving data over the wire. It includes tools to assist authenticating against Geotab's
            servers, automatically serializing/deserializing JSON, and providing definitions for Checkmate object classes.</p>
        <p>Please remember to regularly check for Geotab.Checkmate.ObjectModel nuget package updates. Ideally, your integration should use the same Geotab.Checkmate.ObjectModel nuget package version
            as the one that your database is on.</p>
        <InformationalBox>
            <p>Quick start in <a href="../../api/clients">{/*TODO: fix link*/}API Clients</a></p>
        </InformationalBox>
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
        <InformationalBox>
            <p>For more information regarding authentication, please review the {/*TODO: fix link*/}<a href="../concepts/#authentication">Authentication</a> documentation.</p>
        </InformationalBox>
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
        <InformationalBox>
            <p>Hint: async main method requires <a href="https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-7-1" target="_blank" rel="noopener noreferrer">C# 7.1</a>.</p>
        </InformationalBox>
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
    "title": "Using In .NET",
    "breadCrumbItems": ["MYG", "Guides", "Code Base", "Using In .NET"]
};

const pageSections: TableOfContentsItem[] = [
    {
        "elementId": "nuget-package",
        "summary": "Nuget Package",
        "details": nugetPackage
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
    }
];

export default function usingInDotnet() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                The .NET SDK tools provide an easy way to integrate MyGeotab into .NET software. All of the communication to Geotab's services is accomplished over HTTPS with data serialized in
                {" "}<a href="http://en.wikipedia.org/wiki/JSON" target="_blank" rel="noopener noreferrer">JSON</a> format. The .NET library provided will automatically handle the JSON serialization
                and deserialization into MyGeotab objects.
            </div>

            {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId} />)}
        </Page>
    );
};