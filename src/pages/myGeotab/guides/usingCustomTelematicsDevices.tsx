import { ReactNode } from "react";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import "../../../pages/pages.scss";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import myAdminAndDIGFlow from "../../../assets/images/myGeotab/usingCustomTelematicsDevices/myAdminAndDIGFlow.jpg";

const gettingStarted: ReactNode = (
    <div className="paragraph">
        To get started with the registration process, please refer to the{" "}
        <a target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/1Mddnxc2qKBCNYvVu0-BXcyR-blPlHwa0Zun0mBzZt88/edit?usp=sharing">
            Custom Telematics Devices and MyGeotab
        </a>{" "}
        document.
    </div>
);

const deviceManagement: ReactNode = (
    <div className="paragraph">
        Geotab uses MyAdmin API to manage devices and uses Data Intake Gateway to intake device data.
        <br></br>
        <img src={myAdminAndDIGFlow} className="usingCustomTelematicsDevices__deviceManagementIMG" alt="Navigate to MyAdmin introduction" />
        <br></br>
        To manage devices, the following MyAdmin API calls are most frequently used:
        <ul>
            <li>
                <a hrefLang="../api/reference/#Authenticate">Authenticate</a> {/* TODO: Need to replace this with routing to Authenticate page*/} (an example is given in{" "}
                <a href="https://docs.google.com/document/d/1Mddnxc2qKBCNYvVu0-BXcyR-blPlHwa0Zun0mBzZt88/edit#heading=h.bub5istj4ydv">What is the Authenticate MyAdmin API method</a>)
            </li>
            <li>
                <a hrefLang="../api/reference/#ProvisionDeviceToAccount_1">ProvisionDeviceToAccount</a> {/* TODO: Need to replace this with routing to ProvisionDeviceToAccount page*/} (an example is
                given in{" "}
                <a href="https://docs.google.com/document/d/1Mddnxc2qKBCNYvVu0-BXcyR-blPlHwa0Zun0mBzZt88/edit#heading=h.eghr27v40pev">
                    What are the ProvisionDevice/ProvisionDeviceToAccount MyAdmin API method
                </a>
                )
            </li>
            <li>
                <a hrefLang="../api/reference/#ProvisionDevice_1">ProvisionDevice</a> {/* TODO: Need to replace this with routing to ProvisionDevice_1 page*/} (an example is given in{" "}
                <a href="https://docs.google.com/document/d/1Mddnxc2qKBCNYvVu0-BXcyR-blPlHwa0Zun0mBzZt88/edit#heading=h.eghr27v40pev">
                    What are the ProvisionDevice/ProvisionDeviceToAccount MyAdmin API method
                </a>
                )
            </li>
            <li>
                <a hrefLang="../api/reference/#UpdateDeviceContracts">UpdateDeviceContracts</a>
            </li>{" "}
            {/* TODO: Need to replace this with routing to UpdateDeviceContracts page*/}
            <li>
                <a hrefLang="../api/reference/#TerminateDeviceBilling">TerminateDeviceBilling</a>
            </li>{" "}
            {/* TODO: Need to replace this with routing to TerminateDeviceBilling page*/}
        </ul>
    </div>
);

const customTelematicsDeviceSerialNumbers: ReactNode = (
    <div className="paragraph">
        Before data can be sent for a custom telematics device, you must provision (generate) a serial number and add an asset to your MyGeotab database using this serial number. Calling the
        ProvisionDevice or ProvisionDeviceToAccount MyAdmin API method returns a unique serial number. Both calls must include a <strong>Product ID</strong>, which is a unique identifier assigned to
        each type of custom telematics device. The Product ID determines the first 2 characters of the generated serial number. For example, using Product ID 10032 will always generate a serial
        number starting with “CX”. You will be assigned a Product ID during development of your integration, and you can start by using 10032 for a{" "}
        <a hrefLang="../api/reference/#CustomDevice">CustomDevice</a> {/* TODO: Need to replace this with routing to CustomDevice page*/} or 10184 for a{" "}
        <a hrefLang="../api/reference/#CustomVehicleDevice">CustomVehicleDevice</a>. {/* TODO: Need to replace this with routing to CustomVehicleDevice page*/}
    </div>
);

const sendingData: ReactNode = (
    <div className="paragraph">
        To intake data from a Custom Telematics Device, the usage of{" "}
        <a target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/15uNuPqwFcPLe6vKs_JgY5nPTy2isQ3WYUu4oyQ3cEfQ/edit#heading=h.nxfqu6pl4j28">
            Data Intake Gateway
        </a>{" "}
        is required. The required API calls, and recommended workflows are documented in the linked document.
    </div>
);

const pageTitle: PageTitleProps = {
    title: "Using Custom Telematics Devices",
    breadCrumbItems: ["MYG", "Guides", "Using Custom Telematics Devices"]
};

const pageSections: TableOfContentsItem[] = [
    {
        elementId: "getting-started",
        summary: "Getting Started",
        details: gettingStarted
    },
    {
        elementId: "device-management",
        summary: "Device Management",
        details: deviceManagement
    },
    {
        elementId: "automating-tasks",
        summary: "Custom Telematics Device Serial Numbers",
        details: customTelematicsDeviceSerialNumbers
    },
    {
        elementId: "sending-data",
        summary: "Sending Data",
        details: sendingData
    }
];

export default function UsingCustomTelematicsDevices () {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                Geotab provides the ability to integrate non-GO device telematics devices into the platform. These devices are defined as any telematics device that is not manufactured or sold by
                Geotab but is used in conjunction with Geotab's fleet management application.
            </div>
        </Page>
    );
}
