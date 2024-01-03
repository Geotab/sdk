import { ReactNode } from "react";

import { Link } from 'react-router-dom';

import { Page } from "./../../../components";
import { PageTitleProps } from "./../../../components/PageTitle/PageTitle";
import { HeaderSections } from "./../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "./../../../components/TableOfContents/TableOfContents";

import InformationalBox from "../../../components/InformationalBox/InformationalBox";
import WarningBox from "../../../components/WarningBox/WarningBox";

const accessApi: ReactNode = (
    <div className="paragraph">
        <p>
            The API is accessed via HTTPS by sending requests to the following URL:
        </p>
        <code className="small-code-sample">https://myadminapi.geotab.com/v2/MyAdminApi.ashx</code>
        <p>
            The API supports POST requests only.
        </p>
        <h2>Test Environment</h2>
        <p>
            A sandbox environment is a testing environment that is available to developers who wish to test their application before making API calls to the live system. The test environment can be accessed at:
        </p>
        <code className="small-code-sample">https://myadminapitest.geotab.com/v2/MyAdminApi.ashx</code>
        <p>
            A few methods are not supported in the test environment and will throw exceptions when called. For more information, see the{" "}
            {/* TODO: update link */}
            <Link to="">Reference</Link>{" "}
            section.
        </p>
        <WarningBox>
            <p>
                Data in the sandbox environment is volatile. API developers should not expect data entered into the sandbox environment to persist for any amount of time.
            </p>
        </WarningBox>
    </div>
);

const authenticateApi: ReactNode = (
    <div className="paragraph">
        <p>
            A successful response is a JSON object where the result property is information about the session, including the user ID and a session ID. It looks similar to this:
        </p>
        <code className="small-code-sample">{`{"result":{"userId":"x12345x2-172x-4d04-8xx2-xx9e088c5xxx","sessionId":"cff4e88b-931b-4363-ae4f-35b5ed169133","lastLogonDate":"2013-11-04T15:01:00.000Z","roles":[{"comments":"Third Party Integrator role","name":"Third-Party-Integrator"}],"name":"user@geotab.com"}}`}</code>
        <p>
            The API key is found in the <code className="small-code-sample">userId</code> property and the session ID is found in the <code className="small-code-sample">sessionId</code> property. Both of these properties must be included on all other API calls. If the session ID has expired, the API will return a <code className="small-code-sample">SessionExpiredException</code> which requires a call to Authenticate to get the new session ID. For more information, see the{" "}
            {/* TODO: update link */}
            <Link to="">Reference</Link>{" "}
            section.{" "}
            {/* TODO: update link */}
            <Link to="">JavaScript</Link>{" "}
            and{" "}
            {/* TODO: update link */}
            <Link to="">.NET</Link>{" "}
            examples have been provided to help you get started.
        </p>
    </div>
);

const whatsNext: ReactNode = (
    <div className="paragraph">
        <p>
            There are several other items in the SDK to help you get started:
        </p>
        <p>
            {/* TODO: update link */}
            <Link to="">Concepts</Link>{" "}
            — Be sure to read through this before building your application.
        </p>
        <p>
            {/* TODO: update link */}
            <Link to="">Using with JavaScript</Link>
        </p>
        <p>
            {/* TODO: update link */}
            <Link to="">Using with .NET</Link>
        </p>
        <p>
            {/* TODO: update link */}
            <Link to="">API Reference</Link>{" "}
            — The reference documentation that explains what each API call does and documents the parameters and results for each call.
        </p>
    </div>
);

const pageTitle: PageTitleProps = {
    "title": "Getting Started",
    "breadCrumbItems":
        ["MYA", "Guides", "Getting Started"]
};

const pageSections: TableOfContentsItem[] =
    [{
        "elementId": "myadmin-accessing-the-api",
        "summary": "Accessing the API",
        "details": accessApi
    }, {

        "elementId": "myadmin-authenticating-with-the-api",
        "summary": "Authenticating with the API",
        "details": authenticateApi
    }, {

        "elementId": "myadmin-whats-next",
        "summary": "What's Next?",
        "details": whatsNext
    }];

export default function ReleaseNotes() {
    return (
        <Page section={HeaderSections.MyAdmin} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                <p>
                    The MyAdmin API is available for Geotab Resellers and Partners. Geotab provides helper libraries for C# and JavaScript; however, any language or application capable of making HTTP requests can access the full functionality of the MyAdmin API. It is recommended that Resellers and Partners access the API with a new, dedicated account; however, any MyAdmin account may be used. A new account can be registered at{" "}
                    <a href="https://myadmin.geotab.com/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="MyAdmin - Geotab">
                        https://myadmin.geotab.com
                    </a>
                    .
                </p>
                <InformationalBox>
                    <p>
                        The examples and source code presented in the MyAdmin SDK require a modern browser. We recommend using the latest Chrome, Firefox or Edge browser.
                    </p>
                </InformationalBox>
            </div>
        </Page >
    );
};