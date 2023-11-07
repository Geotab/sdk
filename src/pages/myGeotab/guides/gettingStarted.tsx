import { ReactNode } from "react";
import Accordion from "../../../components/Accordion/Accordion";
import { IconChevronRightSmall } from "@geotab/react-component-library";

const stepsToGetStarted: ReactNode = (
  <div className="paragraph">
    For testing purposes we recommend setting up a test database and adding test
    devices to it. Remember, if you decide to test against a production
    database, data could be accidentally modified or lost.
  </div>
);

const plugInAGeotabGoDevice: ReactNode = (
  <div className="paragraph">
    Refer to the "
    <a href="https://www.geotab.com/support-documentation/">
      Geotab Support Documentation
    </a>
    " for detailed instructions on how to install a device.
  </div>
);

const registerANewDatabase: ReactNode = (
  <div className="paragraph">
    <ol>
      <li>
        To register, browse to{" "}
        <a href="https://my.geotab.com/registration.htm">
          https://my.geotab.com/registration.htm
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
  <div className="paragraph">
    There are several other items in the SDK to help you get started:
    <ul>
      <li>
        <a hrefLang="../concepts">Concepts</a>{" "}
        {/* TODO: Need to replace this with routing to the Concepts page*/} — Be
        sure to read through this before building your application
      </li>
      <li>
        <a hrefLang="../using-in-javascript">Using in JavaScript</a>{" "}
        {/* TODO: Need to replace this with routing to Using in Javascript page*/}
      </li>
      <li>
        <a hrefLang="../using-in-dotnet">Using in .NET</a>{" "}
        {/* TODO: Need to replace this with routing to Using in Dotnet page*/}
      </li>
      <li>
        <a hrefLang="../using-in-java">Using in Java</a>
      </li>{" "}
      {/* TODO: Need to replace this with routing to Using in Java page*/}
      <li>
        <a href="https://community.geotab.com/s/?language=en_US">
          Support Alert
        </a>
        — Be sure to read through this before building your application
      </li>
      <li>
        <a hrefLang="../api/reference">API Reference</a> — The reference
        documentation that explains what each API call does and documents the
        parameters and results for each call
      </li>
      {/* TODO: Need to replace this with routing to api/reference page*/}
      <li>
        <a href="https://geotab.github.io/sdk/software/api/runner.html">
          API Runner
        </a>
        — An easy way to “play” with the API. Click on the “Runner” link from
        the API Reference. It is a tool that can be used to make method calls to
        a MyGeotab server and see what the results look like
      </li>
      <div>
        Note: Remember you are not in a sandbox — you are executing API commands
        against a real database. For example, removing a Device via the API will
        really delete that device from the database!
      </div>
      <li>
        <a hrefLang="../../js-samples">JavaScript</a> or{" "}
         {/* TODO: Need to replace this with routing to js-samples page*/}
        <a href="https://github.com/Geotab/sdk-dotnet-samples">.NET</a> Code
        samples. https://github.com/Geotab/sdk-dotnet-samples
      </li>
      <div>
        For additional support{" "}
        <a href="https://helpdesk.geotab.com/forums/21798473-Community-Forum?geotabsdk=forums">
          use the SDK forums
        </a>
        . A number of solutions have already been provided in the forums. They
        are monitored by Geotab staff and other users of the SDK.
      </div>
    </ul>
  </div>
);

export default function UsingGoDevices() {
  return (
    <div className="pageContent">
      <div className="grayBackground">
        <div className="breadCrumb">
          <span>MYG</span>
          <IconChevronRightSmall></IconChevronRightSmall>
          <span>Guides</span>
          <IconChevronRightSmall></IconChevronRightSmall>
          <span>Getting Started</span>
        </div>
        <h1 className="title">Getting Started</h1>
      </div>
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

      <Accordion
        summary="Steps To Get Started"
        p={stepsToGetStarted}
      ></Accordion>
      <Accordion
        summary="Plug In A Geotab GO Device"
        p={plugInAGeotabGoDevice}
      ></Accordion>
      <Accordion
        summary="Register A New Database"
        p={registerANewDatabase}
      ></Accordion>
      <Accordion summary="What's Next?" p={whatsNext}></Accordion>
    </div>
  );
}
