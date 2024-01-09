import { ReactNode } from "react";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import { Page } from "../../../components";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { Link } from "react-router-dom";
import "../../../pages/pages.scss";

const stepsToGetStarted: ReactNode = (
    <div className="paragraph">
        For testing purposes we recommend setting up a test database and adding test devices to it. Remember, if you decide to test against a production database, data could be accidentally modified
        or lost.
    </div>
);

const plugInAGeotabGoDevice: ReactNode = (
    <div className="paragraph">
        Refer to the "
        <a href="https://www.geotab.com/support-documentation/" target="_blank" rel="noopener noreferrer">
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
                <a href="https://my.geotab.com/registration.html" target="_blank" rel="noopener noreferrer">
                    https://my.geotab.com/registration.html
                </a>
            </li>
            <li>You can now sign in to my.geotab.com and access your database. Spend some time working through this guide and familiarize yourself with the key components of the application</li>
            <li>Add your GO device serial number to this database so you can collect some GPS, Engine and other useful data</li>
        </ol>
    </div>
);

const whatsNext: ReactNode = (
    <div className="paragraph">
        There are several other items in the SDK to help you get started:
        <ul>
            <li>
                <Link to="/myGeotab/guides/concepts">Concepts</Link>— Be sure to read through this before building your application
            </li>
            <li>
                <Link to="/myGeotab/guides/codeBase/usingInJavascript">Using in JavaScript</Link>
            </li>
            <li>
                <Link to="/myGeotab/guides/codeBase/usingInDotnet">Using in .NET</Link>
            </li>
            <li>
                <Link to="/myGeotab/guides/codeBase/usingInJava">Using in Java</Link>
            </li>
            <li>
                <a href="https://community.geotab.com/s/?language=en_US" target="_blank" rel="noopener noreferrer">
                    Support Alert
                </a>{" "}
                — Be sure to read through this before building your application
            </li>
            <li>
                <Link to="/myGeotab/apiReference/methods">API Reference</Link>— The reference documentation that explains what each API call does and documents the parameters and results for each
                call
            </li>
            <li>
                <a href="https://geotab.github.io/sdk/software/api/runner.html" target="_blank" rel="noopener noreferrer">
                    API Runner
                </a>{" "}
                — An easy way to “play” with the API. Click on the “Runner” link from the API Reference. It is a tool that can be used to make method calls to a MyGeotab server and see what the
                results look like
            </li>
        </ul>
        <p>
            {" "}
            Note: Remember you are not in a sandbox — you are executing API commands against a real database. For example, removing a Device via the API will really delete that device from the
            database!
        </p>
        <ul>
            <li>
                <Link to="/myGeotab/codeSamples/javascriptSamples">JavaScript</Link> or <Link to="/myGeotab/codeSamples/dotnetSamples">.NET</Link> Code samples. The JavaScript sample are “live” and
                can be run against your database hosted on my.geotab.com. The .NET examples are downloadable and can be compiled and run against your MyGeotab server.
            </li>
        </ul>
        <p>
            For additional support{" "}
            <a href="https://helpdesk.geotab.com/forums/21798473-Community-Forum?geotabsdk=forums" target="_blank" rel="noopener noreferrer">
                use the SDK forums
            </a>
            . A number of solutions have already been provided in the forums. They are monitored by Geotab staff and other users of the SDK.
        </p>
    </div>
);

const pageTitle: PageTitleProps = {
    title: "Getting Started",
    breadCrumbItems: ["MYG", "Guides", "Getting Started"]
};

const pageSections: TableOfContentsItem[] = [
    {
        elementId: "steps-to-get-started",
        summary: "Steps to get started",
        details: stepsToGetStarted
    },
    {
        elementId: "plug-in-a-geotab-go-device",
        summary: "Plug in a Geotab GO device",
        details: plugInAGeotabGoDevice
    },
    {
        elementId: "register-a-new-database",
        summary: "Register a new database",
        details: registerANewDatabase
    },
    {
        elementId: "whats-next",
        summary: "What's next?",
        details: whatsNext
    }
];

export default function UsingGoDevices () {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                <p>
                    The Geotab API (Application Program Interface) is fully available to MyGeotab customers. Geotab provides helper libraries for C# and JavaScript; however, any language or
                    application capable of making HTTP (HyperText Transfer Protocol) requests can access its full functionality. Only valid MyGeotab user credentials are required; special API keys
                    or tokens are not necessary. Nonetheless, we recommend that the API be accessed with a dedicated user.
                </p>
                <p>
                    Note: The examples and source code presented in the MyGeotab SDK (Software Development Kit) require a modern browser. We recommend using the latest versions of Chrome, Firefox,
                    Internet Explorer or Safari.
                </p>
            </div>
        </Page>
    );
}
