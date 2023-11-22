import { ReactNode } from "react";
import Accordion from "../../../components/Accordion/Accordion";
import { IconChevronRightSmall } from "@geotab/react-component-library";
import "../../../pages/pages.scss";

const gettingStarted: ReactNode = (
  <div className="paragraph">
    <p>
      To connect Power BI to the MyGeotab SDK, please refer to{" "}
      <a href="https://docs.google.com/document/d/1yU-OMC5-DJoRaisB3_JOm0YS99Y26C34NxvJZ7ZM3J8/edit">
        Power BI Geotab Connection with Adapter
      </a>
    </p>
    <p>
      To connect Power BI to the MyGeotab SDK using the Power Query M formula
      language, please refer to{" "}
      <a href="https://docs.google.com/document/d/1ikEi3HCaSugzaCkT78e1Lk5ySMctzfMak_rQazC6DUk">
        Geotab API integration for Power BI
      </a>
    </p>
  </div>
);

export default function DataFeed() {
  return (
    <div className="pageContent">
      <div className="grayBackground">
        <div className="breadCrumb">
          <span>MYG</span>
          <IconChevronRightSmall></IconChevronRightSmall>
          <span>Guides</span>
          <IconChevronRightSmall></IconChevronRightSmall>
          <span>Power BI</span>
        </div>
        <h1 className="title">Connect To Power BI</h1>
      </div>
      <div className="paragraph">
        <p>
          Microsoft Power BI provides data visualization and analytics tools
          used to create interactive dashboards and reports. Users can connect
          Power BI to the MyGeotab SDK to use real-time Geotab data and gain
          meaningful insights into their business.
        </p>
      </div>

      <Accordion summary="Getting Started" p={gettingStarted} />
    </div>
  );
}
