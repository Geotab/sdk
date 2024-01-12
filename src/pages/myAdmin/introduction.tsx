import { ReactNode } from "react";
import { Page } from "../../components";
import { PageTitleProps } from "../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../components/TableOfContents/TableOfContents";
import { Link } from "react-router-dom";
import "../../pages/pages.scss";

const myAdminNextSteps: ReactNode = (
    <div className="paragraph">
        Access to the MyAdmin API requires a MyAdmin account with the MyAdminApiUser role. It is recommended that Resellers and Partners set up a new, dedicated account to access the API. If
        desired, the MyAdminApiUser role can be added to an existing MyAdmin account. A new account can be registered at{" "}
        <a href="https://myadmin.geotab.com" target="_blank" rel="noreferrer">
            myadmin.geotab.com
        </a>
        , after which Resellers or Partners can contact Geotab to add the MyAdminApiUser role to their account. Please review the <Link to="/myAdmin/guides/gettingStarted">Getting Started</Link> and{" "}
        <Link to="/myAdmin/guides/concepts">Concepts</Link> sections prior to beginning development. <Link to="/myAdmin/guides/codeBase/usingWithJavascript">JavaScript</Link> and{" "}
        <Link to="/myAdmin/guides/codeBase/usingWithDotnet">.NET</Link> examples have been provided to help you get started.
    </div>
);

const pageTitle: PageTitleProps = {
    title: "Introduction",
    breadCrumbItems: ["MYA", "Introduction"]
};

const pageSections: TableOfContentsItem[] = [
    {
        elementId: "myadmin-next-steps",
        summary: "Next steps",
        details: myAdminNextSteps
    }
];

export default function Introduction() {
    return (
        <Page section={HeaderSections.MyAdmin} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                The MyAdmin API provides an interface to Geotab's MyAdmin system allowing Geotab Resellers and Partners to build their own applications to integrate with MyAdmin. Some tasks that can
                be accessed through the API include:
                <ul>
                    <li>Registering MyAdmin users;</li>
                    <li>Ordering Geotab products;</li>
                    <li>Querying device information, including installation status, contract information, etc;</li>
                    <li>Managing support tickets with Geotab's help desk;</li>
                    <li>Creating RMA requests and querying RMA status;</li>
                    <li>Managing user contact information;</li>
                    <li>Integrating third-party data; and</li>
                    <li>Obtaining billing information.</li>
                </ul>
                Data exchanged with the MyAdmin API is serialized as JSON, making the API compatible with any platform that can make HTTP requests. A .NET class library consisting of an invoker and
                all API objects is provided to help .NET developers interface with the API. For more information, see the <Link to="/myAdmin/guides/codeBase/usingWithDotnet">Using with .NET</Link>{" "}
                section. Also, a small JavaScript utility is also provided to facilitate interacting with the API using JavaScript. See the{" "}
                <Link to="/myAdmin/guides/codeBase/usingWithJavascript">Using with JavaScript</Link> section for more information.
            </div>
        </Page>
    );
}
