import { ReactNode } from "react";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import Accordion from "../../../components/Accordion/Accordion";
import { CodeSample } from "../../../components/CodeSamplesContainer";

const overview: ReactNode = (
    <div className="paragraph">
        <p>The .NET SDK tools facilitate the integration of MyAdmin with your own .NET software. All communication to MyGeotab services occurs through HTTPS and the data is serialized in <a href="http://www.json.org/" target="_blank" rel="noreferrer">JSON</a> format. The provided .NET library automatically handles both serialization and deserialization of JSON into MyAdmin objects.</p>
        <h2>Packages</h2>
        <p>The inclusion of the Geotab.Internal.MyAdmin.APILib and Geotab.Checkmate.ObjectModel packages allows you to interact with the API. The nuget packages include tools to assist with serialization and deserialization of JSON and provide definitions for MyAdmin object classes. The packages can be found on the NuGet website:</p>
        <p><a href="https://www.nuget.org/packages/Geotab.Internal.MyAdmin.APILib" target="_blank" rel="noreferrer">Geotab.Internal.MyAdmin.APILib</a></p>
        <p><a href="https://www.nuget.org/packages/Geotab.Checkmate.ObjectModel" target="_blank" rel="noreferrer">Geotab.Checkmate.ObjectModel</a></p>
    </div>
);

const step1: ReactNode = (
    <div className="paragraph">
        <p>The MyAdminInvoker class contains methods that facilitate calls to API functions. To access the invoker and object classes, include the following references in your code:</p>
        <CodeSample 
        language="csharp"
        code={`using MyAdminApiLib.Geotab.MyAdmin.MyAdminApi;
using MyAdminApiLib.Geotab.MyAdmin.MyAdminApi.ObjectModel;
`}/>
        <p>Then, create an instance of the API invoker in your code:</p>
        <CodeSample
        language="csharp"
        code={`MyAdminInvoker api = new MyAdminInvoker("https://myadminapi.geotab.com/v2/MyAdminApi.ashx");
`}/>
        <p>The parameters required by each method are passed using a Dictionary {`<string, object>`}. For example, to authenticate with the API, pass a valid username and password to call the Authenticate method using the code below:</p>
        <CodeSample
        language="csharp"
        code={`Dictionary<string, object> parameters = new Dictionary<string, object> { { "username", "user@geotab.com" }, { "password", "<password>" } };


ApiUser apiUser = await api.InvokeAsync<ApiUser>("Authenticate", parameters);
`}/>
        <p>The Authenticate method authenticates with the MyAdmin API and, if successful, returns an ApiUser object. The ApiUser object contains the SessionId and UserId - used as the API key for all other methods.</p>
    </div>
);

const step2: ReactNode = (
    <div className="paragraph">
        <p>Once authenticated, you can call other methods by passing the API key, Session ID, and any parameters required by the method.</p>
        <CodeSample
        language="csharp"
        code={`// apiKey and sessionId were obtained from ApiUser object returned by Authenticate
Dictionary<string, object> parameters = new Dictionary<string, object> { { "apiKey", apiKey }, { "sessionId", sessionId }, { "serialNo", "G63XXXXXXXX8" } };
        
        
ApiDeviceInstallResult installResult = await api.InvokeAsync<ApiDeviceInstallResult>("LookupDevice", parameters);
`}/>
    </div>
);

const moreInformation: ReactNode = (
    <div className="paragraph">
        <p>For more information, see <a href="../../code-samples/dotnet-examples">.NET examples</a>.</p>
    </div>
)

const pageTitle: PageTitleProps = {
    "title": "Using With .NET",
    "breadCrumbItems": ["MYA", "Guides", "Using With .NET"]
};

const pageSections: TableOfContentsItem[] = [
    {
        "elementId": "overview",
        "summary": "Overview",
        "details": overview
    },
    {
        "elementId": "step1",
        "summary": "Step 1: Initialization & Authentication",
        "details": step1
    },
    {
        "elementId": "step2",
        "summary": "Step 2: Making Calls",
        "details": step2
    },
    {
        "elementId": "moreInformation",
        "summary": "More Information",
        "details": moreInformation
    }
];

export default function usingWithDotnet() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle}>
            {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId}/>)}
        </Page>
    )
};