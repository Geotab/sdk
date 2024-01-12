import { ReactNode } from "react";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import { CodeSample } from "../../../components/CodeSamplesContainer";
import "../../../pages/pages.scss";

const dotnetExampleCodeSnippet1: ReactNode = (
    <div className="paragraph">
        <p>The first example is a method that authenticates with the MyAdmin API, retrieves a list of device plans, and looks up the details for a specific device.</p>
        <CodeSample
            language="csharp"
            code={`async Task Example1()
{
   MyAdminInvoker api = new MyAdminInvoker("https://myadminapi.geotab.com/v2/MyAdminApi.ashx");

   Dictionary<string, object> parameters = new Dictionary<string, object>
   {
      {"username", "user@geotab.com"},
      {"password", "<password>"}
   };

   ApiUser apiUser = await api.InvokeAsync<ApiUser>("Authenticate", parameters);
    
   Guid apiKey = apiUser.UserId;
   Guid sessionId = apiUser.SessionId;

   parameters = new Dictionary<string, object>
   {
      {"apiKey", apiKey},
      {"sessionId", sessionId}
   };
    
   ApiDevicePlan[] devicePlans = await api.InvokeAsync<ApiDevicePlan[]>("GetDevicePlans", parameters);

   Console.WriteLine("Device Plans");
   Console.WriteLine("Level\tName");
    
   foreach (ApiDevicePlan devicePlan in devicePlans)
   {
      Console.WriteLine("{0}\t{1}", devicePlan.Level, devicePlan.Name);
   }

   Console.Write("\\nDevice Information\\n");

   parameters = new Dictionary<string, object>
   {
      {"apiKey", apiKey},
      {"sessionId", sessionId},
      {"serialNo", "G6XXX0XXXD08"}
   };
   ApiDeviceInstallResult device = await api.InvokeAsync<ApiDeviceInstallResult>("LookupDevice", parameters);

   Console.WriteLine("Firmware Version: {0}", device.FirmwareVersion);
   Console.WriteLine("Comments: {0}", device.Comments);
   Console.WriteLine("Last Server Communication: {0}", device.LastServerCommunication.ToString());
   Console.WriteLine("Possible Issues: {0}", device.PossibleIssues);

   // Example Output:
   // Device Plans
   // Level    Name
   // 3        Base Mode
   // 99       Suspend Mode
   // 9999     Terminate Mode
    
   // Device Information
   // Firmware Version: 101.2.85
   // Comments: No Data from Device
   // Last Server Communication:  2021-07-23 11:20:03 p.m.
   // Possible Issues: No Data from Device
}`}
        />
    </div>
);

const dotnetExampleCodeSnippet2: ReactNode = (
    <div className="paragraph">
        <p>The second example demonstrates how to query the MyAdmin API to get shipping fee information.</p>
        <CodeSample
            language="csharp"
            code={`async Task Example2()
{
   MyAdminInvoker api = new MyAdminInvoker("https://myadminapi.geotab.com/v2/MyAdminApi.ashx");

   Dictionary<string, object> parameters = new Dictionary<string, object>
   {
      {"username", "user@geotab.com"},
      {"password", "<password>"}
   };

   ApiUser apiUser = await api.InvokeAsync<ApiUser>("Authenticate", parameters);
    
   Guid apiKey = apiUser.UserId;
   Guid sessionId = apiUser.SessionId;

   parameters = new Dictionary<string, object>
   {
      {"apiKey", apiKey},
      {"sessionId", sessionId},
      {"forAccount", "<account number>"}
   };
   ApiShippingFee[] shippingFees = await api.InvokeAsync<ApiShippingFee[]>("GetShippingFees", parameters); 
}`}
        />
    </div>
);

const pageTitle: PageTitleProps = {
    title: ".NET Examples",
    breadCrumbItems: ["MYA", "Code Samples", ".NET Examples"]
};

const pageSections: TableOfContentsItem[] = [
    {
        elementId: "dotnet-example-code-snippet1",
        summary: "Example 1",
        details: dotnetExampleCodeSnippet1
    },
    {
        elementId: "dotnet-example-code-snippet2",
        summary: "Example 2",
        details: dotnetExampleCodeSnippet2
    }
];

export default function DotnetExamples() {
    return (
        <Page section={HeaderSections.MyAdmin} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">Here are a few examples to help you get started.</div>
        </Page>
    );
}
