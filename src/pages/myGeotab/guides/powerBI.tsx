import { ReactNode } from "react";
import Accordion from "../../../components/Accordion/Accordion";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import "../../../pages/pages.scss";

const gettingStarted: ReactNode = (
  <div className="paragraph">
    <p>
      To connect Power BI to the MyGeotab SDK, please refer to{" "}
      <a
        href="https://docs.google.com/document/d/1yU-OMC5-DJoRaisB3_JOm0YS99Y26C34NxvJZ7ZM3J8/edit"
        aria-label="Power BI Geotab Connection Guide"
        target="_blank"
        rel="noopener noreferrer"
      >
        Power BI Geotab Connection with Adapter
      </a>
    </p>
    <p>
      To connect Power BI to the MyGeotab SDK using the Power Query M formula
      language, please refer to{" "}
      <a
        href="https://docs.google.com/document/d/1ikEi3HCaSugzaCkT78e1Lk5ySMctzfMak_rQazC6DUk"
        aria-label="Geotab API Integration Guide for Power BI using Power Query M"
        target="_blank"
        rel="noopener noreferrer"
      >
        Geotab API integration for Power BI
      </a>
    </p>
  </div>
);

const pageTitle: PageTitleProps = {
  title: "Connect To Power BI",
  breadCrumbItems: ["MYG", "Guides", "Power BI"],
};

const pageSections: TableOfContentsItem[] = [
  {
    elementId: "getting-started",
    summary: "Getting Started",
    details: gettingStarted,
  },
];

export default function DataFeed() {
  return (
    <Page
      section={HeaderSections.MyGeotab}
      pageTitle={pageTitle}
      tableOfContents={pageSections}
    >
      <div className="paragraph">
        <p>
          Microsoft Power BI provides data visualization and analytics tools
          used to create interactive dashboards and reports. Users can connect
          Power BI to the MyGeotab SDK to use real-time Geotab data and gain
          meaningful insights into their business.
        </p>
      </div>

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
