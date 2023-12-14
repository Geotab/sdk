import { ReactNode } from "react";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import Accordion from "../../../components/Accordion/Accordion";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import { CodeSample } from "../../../components/CodeSamplesContainer";

const overview: ReactNode = (
  <div className="paragraph">
    <p>
      All communication with our services is done over HTTPS with data
      serialized in JSON format. A request consists of three properties:
    </p>
    <CodeSample
      language="json"
      code={`id: -1 - this ID is ignored
method: '<method name>'
params: [parameters required by the method serialized as JSON]`}
    />
    <p>
      Before calling any API methods, a call must be made to the Authenticate
      method to obtain the user’s API key and session ID. All method calls
      require a <code className="small-code-sample">params</code> object which
      contains the values for the parameters required by the methods. The
      following sections describe how to build the{" "}
      <code className="small-code-sample">params</code> object to authenticate
      and call an API method. The myAdminApi.js utility is provided to help with
      calling MyAdmin API methods. It can be downloaded{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://raw.githubusercontent.com/Geotab/sdk/master/src/myadmin-sdk/myAdminApi.js"
      >
        here
      </a>
      .
    </p>
  </div>
);

const step1InitializationAuthentication: ReactNode = (
  <div className="paragraph">
    <p>The call to Authenticate is made as follows:</p>
    <CodeSample
      language="javascript"
      code={`var apiKey,
    sessionId,
    logonParams = {
        username: 'user@geotab.com',
        password: '<password>'
};
myAdminApi().call('Authenticate', logonParams, function(user) {
    apiKey = user.userId;
    sessionId = user.sessionId;
});`}
    />
    <p>
      In the above example, the code passes the user name and password in the{" "}
      <code className="small-code-sample">logonParams</code> object and provides
      a callback function to be executed following a successful login. The
      callback function receives an ApiUser object which contains, among other
      properties, the user's API key (userId) and session ID. See the{" "}
      <a href="../../api/reference"> {/* ToDo: fix link */}Reference</a>{" "}
      documentation for more information on the{" "}
      <code className="small-code-sample">Authenticate</code> method and the{" "}
      <code className="small-code-sample">ApiUser</code> object.
    </p>
  </div>
);

const step2MakingCallsToOtherMethods: ReactNode = (
  <div className="paragraph">
    <p>
      Once authenticated, all other API methods can be called using the API key
      and Session ID obtained in the previous example. For example, the
      following code will return a list of available device plans:
    </p>
    <CodeSample
      language="javascript"
      code={`var devicePlanParams = {
    apiKey: apiKey,
    sessionId: sessionId
};
myAdminApi().call('GetDevicePlans', devicePlanParams, function(devicePlans) {
    // Do something with the array of ApiDevicePlan
});`}
    />
    <p>
      The result object in the above code contains an array of ApiDevicePlan.
    </p>
  </div>
);

const moreInformation: ReactNode = (
  <div className="paragraph">
  <p>For more information, see the <a href="../../code-samples/javascript-examples">{/*To do: fix link */}JavaScript Examples</a> section.</p>
  </div>
);

const pageTitle: PageTitleProps = {
  title: "Using With JavaScript",
  breadCrumbItems: ["MYA", "Using With JavaScript"],
};

const pageSections: TableOfContentsItem[] = [
  {
    elementId: "overview",
    summary: "Overview",
    details: overview,
  },
  {
    elementId: "step-1:-initialization-&-authentication",
    summary: "Step 1: Initialization & Authentication",
    details: step1InitializationAuthentication,
  },
  {
    elementId: "step-2:-making-calls-to-other-methods",
    summary: "Step 2: Making Calls To Other Methods",
    details: step2MakingCallsToOtherMethods,
  },
  {
    elementId: "more-information",
    summary: "More Information",
    details: moreInformation,
  },
];

export default function UsingWithJavascript() {
  return (
    <Page
      section={HeaderSections.MyAdmin}
      pageTitle={pageTitle}
      tableOfContents={pageSections}
    >
      {pageSections.map((section) => (
        <Accordion
          summary={section.summary}
          p={section.details}
          id={section.elementId}
        />
      ))}
    </Page>
  );
}
