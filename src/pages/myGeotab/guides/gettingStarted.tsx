import { ReactNode } from "react";
import Accordion from "../../../components/Accordion/Accordion";
import "../../../pages/pages.scss";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import { Page } from "../../../components";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";

const stepsToGetStarted: ReactNode = (
  <div className="paragraph" id="steps-to-get-started">
    For testing purposes we recommend setting up a test database and adding test
    devices to it. Remember, if you decide to test against a production
    database, data could be accidentally modified or lost.
  </div>
);

const plugInAGeotabGoDevice: ReactNode = (
  <div className="paragraph" id="plug-in-a-geotab-go-device">
    Refer to the "
    <a href="https://www.geotab.com/support-documentation/">
      Geotab Support Documentation
    </a>
    " for detailed instructions on how to install a device.
  </div>
);

const registerANewDatabase: ReactNode = (
  <div className="paragraph" id="register-a-new-database">
    <ol>
      <li>
        To register, browse to{" "}
        <a href="https://my.geotab.com/registration.html">
          https://my.geotab.com/registration.html
        </a>
      </li>
      <li>
        You can now sign in to my.geotab.com and access your database. Spend
        some time working through this guide and familiarize yourself with the
        key components of the application
      </li>
      <li>
        Add your GO device serial number to this database so you can collect
        some GPS, Engine and other useful data
      </li>
    </ol>
  </div>
);

const whatsNext: ReactNode = (
  <div className="paragraph" id="whats-next">
    There are several other items in the SDK to help you get started:
    <ul>
      <li>
        <a href="https://geotab.github.io/sdk/software/guides/concepts">
          Concepts
        </a>{" "}
        {/* TODO: Need to replace this with routing to "../concepts" when created */}
        — Be sure to read through this before building your application
      </li>
      <li>
        <a href="https://geotab.github.io/sdk/software/guides/using-in-javascript">
          Using in JavaScript
        </a>{" "}
        {/* TODO: Need to replace this with routing to "../using-in-javascript" when created*/}
      </li>
      <li>
        <a href="https://geotab.github.io/sdk/software/guides/using-in-dotnet">
          Using in .NET
        </a>{" "}
        {/* TODO: Need to replace this with routing to "../using-in-dotnet" when created*/}
      </li>
      <li>
        <a href="https://geotab.github.io/sdk/software/guides/using-in-java">
          {/* TODO: Need to replace this with routing to "../using-in-java" when created*/}
          Using in Java
        </a>{" "}
      </li>
      <li>
        <a href="https://community.geotab.com/s/?language=en_US">
          Support Alert
        </a>{" "}
        — Be sure to read through this before building your application
      </li>
      <li>
        <a href="https://geotab.github.io/sdk/software/api/reference">
          API Reference
        </a>{" "}
        {/* TODO: Need to replace this with routing to api/reference page when created*/}
        — The reference documentation that explains what each API call does and
        documents the parameters and results for each call
      </li>
      <li>
        <a href="https://geotab.github.io/sdk/software/api/runner.html">
          API Runner
        </a>{" "}
        — An easy way to “play” with the API. Click on the “Runner” link from
        the API Reference. It is a tool that can be used to make method calls to
        a MyGeotab server and see what the results look like
      </li>
    </ul>
    <p>
      {" "}
      {/*NOTE: possibly adjust spacing for this element or keep as it? */}
      Note: Remember you are not in a sandbox — you are executing API commands
      against a real database. For example, removing a Device via the API will
      really delete that device from the database!
    </p>
    <ul>
      <li>
        <a href="https://geotab.github.io/sdk/software/js-samples">
          JavaScript
        </a>{" "}
        or{" "}
        {/* TODO: Need to replace this with routing to js-samples page when created*/}
        <a href="https://github.com/Geotab/sdk-dotnet-samples">.NET</a> Code
        samples. The JavaScript sample are “live” and can be run against your
        database hosted on my.geotab.com. The .NET examples are downloadable and
        can be compiled and run against your MyGeotab server.
      </li>
    </ul>
    <p>
      For additional support{" "}
      <a href="https://helpdesk.geotab.com/forums/21798473-Community-Forum?geotabsdk=forums">
        use the SDK forums
      </a>
      . A number of solutions have already been provided in the forums. They are
      monitored by Geotab staff and other users of the SDK.
    </p>
  </div>
);

const pageTitle: PageTitleProps = {
  "title": "Getting Started",
  "breadCrumbItems": ["MYG", "Guides", "Getting Started"]
};

const pageSections: TableOfContentsItem[] = [
  {
    "elementId": "steps-to-get-started",
    "summary": "Steps To Get Started",
    "details": stepsToGetStarted
  },
  {
    "elementId": "plug-in-a-geotab-go-device",
    "summary": "Plug In A Geotab GO Device",
    "details": plugInAGeotabGoDevice
  },
  {
    "elementId": "register-a-new-database",
    "summary": "Register A New Database",
    "details": registerANewDatabase
  },
  {
    "elementId": "whats-next",
    "summary": "What's Next?",
    "details": whatsNext
  }
];

export default function UsingGoDevices() {
  return (
    <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
      <div className="paragraph">
        <p>
          The Geotab API (Application Program Interface) is fully available to
          MyGeotab customers. Geotab provides helper libraries for C# and
          JavaScript; however, any language or application capable of making
          HTTP (HyperText Transfer Protocol) requests can access its full
          functionality. Only valid MyGeotab user credentials are required;
          special API keys or tokens are not necessary. Nonetheless, we
          recommend that the API be accessed with a dedicated user.
        </p>
        <p>
          Note: The examples and source code presented in the MyGeotab SDK
          (Software Development Kit) require a modern browser. We recommend
          using the latest versions of Chrome, Firefox, Internet Explorer or
          Safari.
        </p>
      </div>

      {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} />)}
    </Page>
  );
}
