import { ReactNode } from "react";
import Accordion from "../../components/Accordion/Accordion";
import { Page } from "../../components";
import { PageTitleProps } from "../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../components/TableOfContents/TableOfContents";
import "../../pages/pages.scss";

const myAdminNextSteps: ReactNode = (
  <div className="paragraph">
Access to the MyAdmin API requires a MyAdmin account with the MyAdminApiUser role. It is recommended that Resellers and Partners set up a new, dedicated account to access the API. If desired, the MyAdminApiUser role can be added to an existing MyAdmin account. A new account can be registered at <a href="https://myadmin.geotab.com" target="_blank" rel="noreferrer">myadmin.geotab.com</a>, after which Resellers or Partners can contact Geotab to add the MyAdminApiUser role to their account.

Please review the <a href="../myAdmin/guides/gettingStarted">Getting Started</a> and <a href="../myAdmin/guides/concepts">Concepts</a> sections prior to beginning development. {/* TODO: fix link when page is available*/} <a href="../code-samples/javascript-examples/">JavaScript</a> and {/* TODO: fix link when page is available*/} <a href="../code-samples/dotnet-examples/">.NET</a> examples have been provided to help you get started.
  </div>
);

const pageTitle: PageTitleProps = {
  "title": "Introduction",
  "breadCrumbItems": ["MYA", "Introduction"]
};

const pageSections: TableOfContentsItem[] = [
  {
    "elementId": "myadmin-next-steps",
    "summary": "Next Steps",
    "details": myAdminNextSteps
  }
];

export default function MyAdminIntroduction() {
  return (
    <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
      <div className="paragraph">
        The MyAdmin API provides an interface to Geotab's MyAdmin system allowing Geotab Resellers and Partners to build their own applications to integrate with MyAdmin. Some tasks that can be accessed through the API include:
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
        Data exchanged with the MyAdmin API is serialized as JSON, making the API compatible with any platform that can make HTTP requests. A .NET class library consisting of an invoker and all API objects is provided to help .NET developers interface with the API. For more information, see the {/* TODO: fix link when page is available*/} <a href="../myAdmin/guides/usingWithDotnet">Using with .NET</a> section. Also, a small JavaScript utility is also provided to facilitate interacting with the API using JavaScript. See the {/* TODO: fix link when page is available*/} <a href="../myAdmin/guides/usingWithJavaScript">Using with JavaScript</a> section for more information.
      </div>
      {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId} />)}
    </Page>
  );
};