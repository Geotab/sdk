import { ReactNode } from "react";
import { Page } from "../../components";
import { PageTitleProps } from "../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../components/TableOfContents/TableOfContents";

const introduction: ReactNode = (
  <div className="paragraph">
    <p>
      Geotab supports Hardware Add-On integration through the CAN, USB, RS232,
      and BLE interfaces. The Add-On Protocols section outlines the integration
      process for all four interfaces. Geotab's open platform allows for
      expandability to support the unique data sets of any Hardware Add-On. The
      GO device can currently report Hardware Add-On Data Types found on{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/Geotab/sdk-java-samples/tree/master/src/main/java/com/geotab/sdk/datafeed"
      >
        MyGeotab Diagnostics
      </a>
      .
    </p>
    <p>
      When using Geotab's Hardware Add-On protocols, it is important not to send
      excessive amounts of data to the GO device. This can be assured by only
      sending data when it is completely necessary and avoiding the sending of
      repetitive values. The GO device will stop recording data from the
      Hardware Add-On device if excessive Add-On data is detected. When this
      condition occurs, the following will appear in the Fault Data for the GO
      device within MyGeotab: "Status data no longer being saved due to
      excessive data", "Third-party data no longer being saved due to excessive
      data" or "Bluetooth data no longer being saved due to excessive data". In
      order to re-enable data logging for the Hardware Add-On, the GO device
      will need to be completely disconnected from power and then powered back
      up again.
    </p>
  </div>
);

const integratingWithTheInputOutputExpanderIOX: ReactNode = (
  <div className="paragraph">
    <p>
      Hardware Add-Ons communicate with the GO device using an IOX corresponding
      to the aforementioned interfaces, namely the{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://docs.google.com/document/d/19Wlwsb_AnpE3AndOf1cbiFLzTOCI5fwscOwQh5a6jF8/preview"
      >
        IOX-CAN
      </a>
      ,{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://docs.google.com/document/d/1_vocie4MYAHAUBOJ_AUXzYN11jrR5jyCynFgbqigFys/preview"
      >
        IOX-USB
      </a>
      ,{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://docs.google.com/document/d/1UDEwQOY2zH1ABQ3UP6rdlcZ--LPt5SUbKEZ_AZgUsWk/preview"
      >
        IOX-RS232
      </a>
      ,{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://docs.google.com/document/d/1ICzpfhyYQEl1acQtJ9AGw09pzH5ADHNC8EGIcvTP2KU/preview"
      >
        IOX-BT
      </a>
      , and any{" "}
      <a href="../developing-an-iox/hardware-design-guide">Custom IOX</a>
      {/*TODO: fix link*/}. The format of data sent through an IOX could vary
      with the type of IOX, which is shown in the table below. All IOXs support
      data transfer from Add-On to GO device, while some IOXs also support data
      transfer from GO device to Add-On.
    </p>

    <div className="hardwareIntroduction__table-container">
      <table className="hardwareIntroduction__table center-tableItem">
        <thead>
          <tr>
            <th>IOX Type</th>
            <th>Add-On Protocol</th>
            <th>Status Data</th>
            <th>Custom Data</th>
            <th>Binary Data</th>
            <th>Data Transfer From GO Device To Add-On</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>IOX-RS232</td>
            <td>Y</td>
            <td>Y</td>
            <td>Y</td>
            <td>Y</td>
            <td>Y</td>
          </tr>
          <tr>
            <td>IOX-USB</td>
            <td>Y</td>
            <td>Y</td>
            <td>Y</td>
            <td>Y</td>
            <td>Y</td>
          </tr>
          <tr>
            <td>IOX-CAN</td>
            <td>Y</td>
            <td>Y</td>
            <td>N</td>
            <td>N</td>
            <td>Y</td>
          </tr>
          <tr>
            <td>IOX-BT</td>
            <td>Y</td>
            <td>Y</td>
            <td>Y</td>
            <td>N</td>
            <td>N</td>
          </tr>
          <tr>
            <td>Custom IOX</td>
            <td>Y</td>
            <td>Y</td>
            <td>Y</td>
            <td>Y</td>
            <td>Y</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      Hardware Add-On data can be sent via any of these IOX and will be be
      transmitted to the Geotab server in several formats, namely "Status Data",
      "Custom Data", and "Binary Data". Data in all three formats may be
      retrieved via <a href="../myGeotab/introduction">API</a>. However, only
      Status Data can be queried within MyGeotab by navigating to{" "}
      <strong>Engine {"&"} Maintenance</strong> {">"}{" "}
      <strong>Engine {"&"} Device…</strong> {">"} <strong>Measurements</strong>.
      Only with Status Data, it is possible to create meaningful reports or
      leverage the rules engine via MyGeotab.
    </p>

    <p>
      Geotab offers a wide range of IOXs, some of which are stand-alone
      solutions. IOXs such as IOX-CAN, IOX-USB, and IOX-RS232 connect GO devices
      with Hardware Add-Ons, while others like IOX-GOTALK, etc. are readily
      available solutions. Check out our full{"  "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.geotab.com/blog/iox-expansion/"
      >
        IOX offerings
      </a>
      .
    </p>
  </div>
);

const technicalHardwareToolkit: ReactNode = (
  <div className="paragraph">
    <p>
      The toolkit provides helpful integration resources and context in addition
      to the existing documentation and make it easier for partners to get up
      and running.
    </p>

    <p>
      We have also moved to the new DIG platform for Custom Telematics Device
      integrations and included DIG documentation linked from the toolkit as
      well (while slating the MyAdmin documentation for deprecation).
    </p>

    <p>
      Please refer to{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://docs.google.com/presentation/d/1SH-VX9GeVImHUyaqJgCzZ28fMa0-sVqh4ue-sNRTO9M/"
      >
        Geotab Integrations: Hardware Technical Toolkit
      </a>{" "}
      for further details.
    </p>
  </div>
);

const requestingSampleHardware: ReactNode = (
  <div className="paragraph">
    If you would like to request Geotab hardware for testing or development,
    here are your options:
    <ul>
      <li>
        If you are already working with a Geotab reseller or a Geotab employee,
        please procure hardware with their help.
      </li>
      <li>
        Otherwise, please submit{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://forms.gle/CnAxQwEFqPGQEGPp9"
        >
          this form
        </a>
        .
      </li>
    </ul>
  </div>
);

const pageTitle: PageTitleProps = {
  title: "Hardware Development Kit",
  breadCrumbItems: ["Hardware", "Hardware Introduction"]
};

const pageSections: TableOfContentsItem[] = [
  {
    elementId: "introduction",
    summary: "Introduction",
    details: introduction
  },
  {
    elementId: "integrating-with-the-input-output-expander-iox",
    summary: "Integrating with the Input-Output Expander (IOX)",
    details: integratingWithTheInputOutputExpanderIOX
  },
  {
    elementId: "technical-hardware-toolkit",
    summary: "Technical Hardware Toolkit",
    details: technicalHardwareToolkit
  },
  {
    elementId: "requesting-sample-hardware",
    summary: "Requesting sample hardware",
    details: requestingSampleHardware
  },
];

export default function Introduction() {
  return (
    <Page
      section={HeaderSections.Hardware}
      pageTitle={pageTitle}
      tableOfContents={pageSections}
    >
      {null}
    </Page>
  );
}
