import { ReactNode } from "react";
import { Button, ButtonVariant } from "@geotab/react-component-library";

import { Page } from "./../../../components";
import { PageTitleProps } from "./../../../components/PageTitle/PageTitle";
import { HeaderSections } from "./../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "./../../../components/TableOfContents/TableOfContents";
import InformationalBox from "../../../components/InformationalBox/InformationalBox";

const howToRunTheExamples: ReactNode = (
  <div className="paragraph">
    <p>
      In order to run these examples, you first need to{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://learn.microsoft.com/en-us/dotnet/core/install/windows?tabs=net80#dependencies"
      >
        install .NET Core
      </a>
      . After that, you can clone the{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/Geotab/sdk-dotnet-samples"
      >
        repo
      </a>
      , go into each of the examples folders and either:
    </p>
    <ul>
      <li>
        Run from source using the following commands:
        <ul>
          <li>
            <code className="small-code-sample">dotnet restore</code>
          </li>
          <li>
            <code className="small-code-sample">dotnet run</code>
          </li>
        </ul>
      </li>
      <li>
        Compile and run using the following commands
        <ul>
          <li>
            <code className="small-code-sample">dotnet restore</code>
          </li>
          <li>
            <code className="small-code-sample">dotnet build</code>
          </li>
          <li>
            <code className="small-code-sample">
              dotnet bin/Debug/[framework]/[binary name]
            </code>
          </li>
        </ul>
      </li>
    </ul>
  </div>
);

const getCount: ReactNode = (
  <div className="paragraph">
    <p>
      A simple console example to obtain the count of devices from a database. A
      good example to see how our authentication scheme works.
    </p>
    <div className="code-samples-pages__button-container">
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => {
          window.open("https://github.com/Geotab/sdk-dotnet-samples/tree/master/GetCount", "_blank");
        }}
        ariaLabel="Source for get count folder"
      >
        View source code
      </Button>
    </div>
  </div>
);

const extractMileage: ReactNode = (
  <div className="paragraph">
    <p>
      An example that “extracts” vehicle mileage into a CSV or XML file. A good
      starting point for any data extraction tool.
    </p>
    <div className="code-samples-pages__button-container">
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => {
          window.open("https://github.com/Geotab/sdk-dotnet-samples/tree/master/ExtractMileage", "_blank");
        }}
        ariaLabel="Source for extract mileage folder"
      >
        View source code
      </Button>
    </div>
  </div>
);
const getLogs: ReactNode = (
  <div className="paragraph">
    <p>
      An example that obtains the logs for a given vehicle between a range of
      dates.
    </p>
    <div className="code-samples-pages__button-container">
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => {
          window.open("https://github.com/Geotab/sdk-dotnet-samples/tree/master/GetLogs", "_blank");
        }}
        ariaLabel="Source for get logs folder"
      >
        View source code
      </Button>
    </div>
  </div>
);

const getFuelTaxDetailsIFTA: ReactNode = (
  <div className="paragraph">
    <p>
      An example that shows how to:
      <ul>
        <li>Iterate through a list of devices.</li>
        <li>
          Retrieve fuel tax details for each device over a given time interval.
        </li>
        <li>Trim each detail to the time interval.</li>
      </ul>
    </p>
    <div className="code-samples-pages__button-container">
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => {
          window.open("https://github.com/Geotab/sdk-dotnet-samples/tree/master/GetFuelTaxDetails", "_blank");
        }}
        ariaLabel="Source for get fuel tax details folder"
      >
        View source code
      </Button>
    </div>
  </div>
);
const textMessage: ReactNode = (
  <div className="paragraph">
    <p>
      An example that sends text messages to and from a GO device.
    </p>
    <div className="code-samples-pages__button-container">
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => {
          window.open("https://github.com/Geotab/sdk-dotnet-samples/tree/master/TextMessage", "_blank");
        }}
        ariaLabel="Source for text message folder"
      >
        View source code
      </Button>
    </div>
  </div>
);
const importGroups: ReactNode = (
  <div className="paragraph">
    <p>
      A console example that is also a group import tool. It enables a one time
      import of groups to a database from a CSV file.
    </p>
    <div className="code-samples-pages__button-container">
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => {
          window.open("https://github.com/Geotab/sdk-dotnet-samples/tree/master/ImportGroups", "_blank");
        }}
        ariaLabel="Source for import groups folder"
      >
        View source code
      </Button>
    </div>
  </div>
);
const reconcileGroupsAlphaVersion: ReactNode = (
  <div className="paragraph">
    <p>
      A console example that is also a group import tool. Similar to the
      ImportGroups tool, it enables the initial import of groups into a database
      from a CSV file. Unlike the ImportGroups tool, ImportGroupsR enables
      synchronization between an existing group tree in a database and a group
      tree represented by the CSV file and can be run multiple times with the
      same or updated CSV file. The input CSV file shall represent an entire
      tree of groups with which the database will be synchronized.
    </p>
    <p>
      R in the name stands for Reference. Reference is the property of a group
      that should be unique and is used as the group identifier.
    </p>
    <InformationalBox>
      <p>
        This tool can move groups to different parent groups and can delete
        groups if certain command line arguments are used. Please use this tool
        with caution and at your own risk.
      </p>
    </InformationalBox>
    <div className="code-samples-pages__button-container">
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => {
          window.open("https://github.com/Geotab/sdk-dotnet-samples/tree/master/ImportGroupsR", "_blank");
        }}
        ariaLabel="Source for import groups R folder"
      >
        View source code
      </Button>
    </div>
  </div>
);
const importDevices: ReactNode = (
  <div className="paragraph">
    <p>
      Another console example that imports devices from a CSV file.
    </p>
    <div className="code-samples-pages__button-container">
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => {
          window.open("https://github.com/Geotab/sdk-dotnet-samples/tree/master/ImportDevices", "_blank");
        }}
        ariaLabel="Source for import devices folder"
      >
        View source code
      </Button>
    </div>
  </div>
);
const importZones: ReactNode = (
  <div className="paragraph">
    <p>
      A console example that imports zones from a CSV file. This is useful if
      you have a list of geographic coordinates and want to quickly create zones
      around them.
    </p>
    <div className="code-samples-pages__button-container">
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => {
          window.open("https://github.com/Geotab/sdk-dotnet-samples/tree/master/ImportZones", "_blank");
        }}
        ariaLabel="Source for import zones folder"
      >
        View source code
      </Button>
    </div>
  </div>
);
const importZonesFromShapeFile: ReactNode = (
  <div className="paragraph">
    <p>
      Another console zone importer, but imports from an{" "}
      <a
        href="http://en.wikipedia.org/wiki/Shapefile"
        target="_blank"
        rel="noopener noreferrer"
      >
        Esri shapefile
      </a>{" "}
      set (.shp, .shx, .dbf) into a given database.
    </p>
    <div className="code-samples-pages__button-container">
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => {
          window.open("https://github.com/Geotab/sdk-dotnet-samples/tree/master/ImportZonesShapeFile", "_blank");
        }}
        ariaLabel="Source for import zones shapefile folder"
      >
        View source code
      </Button>
    </div>
  </div>
);
const importUsers: ReactNode = (
  <div className="paragraph">
    <p>
      Another console example that imports users from a CSV file.
    </p>
    <div className="code-samples-pages__button-container">
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => {
          window.open("https://github.com/Geotab/sdk-dotnet-samples/tree/master/ImportUsers", "_blank");
        }}
        ariaLabel="Source for import users folder"
      >
        View source code
      </Button>
    </div>
  </div>
);
const dataFeed: ReactNode = (
  <div className="paragraph">
    <p>
      An example of retrieving GPS, Status and Fault data as a feed and
      exporting to a CSV file.
    </p>
    <div className="code-samples-pages__button-container">
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => {
          window.open("https://github.com/Geotab/sdk-dotnet-samples/tree/master/DataFeed", "_blank");
        }}
        ariaLabel="Source for data feed folder"
      >
        View source code
      </Button>
    </div>
  </div>
);

const pageTitle: PageTitleProps = {
  title: ".Net Samples",
  breadCrumbItems: ["MYG", "Code Samples", ".Net Samples"]
};

const pageSections: TableOfContentsItem[] = [
  {
    elementId: "how-to-run-the-examples",
    summary: "How to run the examples?",
    details: howToRunTheExamples
  },
  {
    elementId: "get-Count",
    summary: "Get count",
    details: getCount
  },
  {
    elementId: "extract-mileage",
    summary: "Extract mileage",
    details: extractMileage
  },
  {
    elementId: "get-logs",
    summary: "Get logs",
    details: getLogs
  },
  {
    elementId: "get-fuel-tax-details-IFTA",
    summary: "Get fuel tax details (IFTA)",
    details: getFuelTaxDetailsIFTA
  },
  {
    elementId: "text-message",
    summary: "Text message",
    details: textMessage
  },
  {
    elementId: "import-groups",
    summary: "Import groups",
    details: importGroups
  },
  {
    elementId: "reconcile-groups-alpha-version",
    summary: "Reconcile groups - (Alpha version)",
    details: reconcileGroupsAlphaVersion
  },
  {
    elementId: "import-devices",
    summary: "Import devices",
    details: importDevices
  },
  {
    elementId: "import-zones",
    summary: "Import zones",
    details: importZones
  },
  {
    elementId: "import-zones-from-shape-file",
    summary: "Import zones from shape file",
    details: importZonesFromShapeFile
  },
  {
    elementId: "import-users",
    summary: "Import users",
    details: importUsers
  },
  {
    elementId: "data-feed",
    summary: "Data feed",
    details: dataFeed
  }
];

export default function DotnetSamples() {
  return (
    <Page
      section={HeaderSections.MyGeotab}
      pageTitle={pageTitle}
      tableOfContents={pageSections}
    >
      <div className="paragraph">
        <p>
          The following examples show common usages of the SDK using dotnet. We
          recommend that you study the examples to learn everything necessary to
          build your own custom applications:
        </p>
      </div>
    </Page>
  );
}