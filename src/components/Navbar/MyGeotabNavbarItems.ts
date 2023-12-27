import { IconProps } from "@geotab/react-component-library";
// import { IconProps, SideNavigationMenuItemType } from "@geotab/react-component-library";
import { ComponentType } from "react";
import { IconCircleInfo, IconStar, IconDocument, IconPuzzlePiece, IconDocumentWithMagnifyingGlass, IconHexagonGear, IconCodeBox } from "./icons";

// TODO: Eventually remove and import from library
export type SideNavigationMenuItemType = {
  id: number;
  isTitle?: boolean;
  label: string;
  route?: string;
  externalRoute?: string;
  level: number;
  order: number;
  userTypes: string[];
  roles: string[];
  Icon?: ComponentType<IconProps>;
  Pill?: ComponentType<any>;
  onClick?: (value?: unknown) => void;
  children?: SideNavigationMenuItemType[];
};

export const MyGeotabNavbarItems: SideNavigationMenuItemType[] = [
  {
    id: 0,
    label: "Introduction",
    route: "/myGeotab/introduction",
    level: 0,
    order: 0,
    userTypes: [],
    roles: [],
    Icon: IconCircleInfo
  },
  {
    id: 1,
    label: "Release Notes",
    route: "/myGeotab/releaseNotes",
    level: 0,
    order: 1,
    userTypes: [],
    roles: [],
    Icon: IconStar
  },
  {
    id: 2,
    label: "Guides",
    level: 0,
    order: 2,
    userTypes: [],
    roles: [],
    Icon: IconDocument,
    children: [
      {
        id: 0,
        label: "Getting Started",
        route: "/myGeotab/guides/gettingStarted",
        level: 1,
        order: 0,
        roles: [],
        userTypes: []
      },
      {
        id: 1,
        label: "Concepts",
        route: "/myGeotab/guides/concepts",
        level: 1,
        order: 1,
        roles: [],
        userTypes: []
      },
      {
        id: 2,
        label: "Data Feed",
        route: "/myGeotab/guides/dataFeed",
        level: 1,
        order: 2,
        roles: [],
        userTypes: []
      },
      {
        id: 3,
        label: "Using MyGeotab URLs",
        route: "/myGeotab/guides/MyGeotabUrls",
        level: 1,
        order: 3,
        roles: [],
        userTypes: []
      },
      {
        id: 4,
        label: "Using GO Devices",
        route: "/myGeotab/guides/usingGoDevices",
        level: 1,
        order: 4,
        roles: [],
        userTypes: []
      },
      {
        id: 5,
        label: "GO Device Logging",
        route: "/myGeotab/guides/goDeviceLogging",
        level: 1,
        order: 5,
        roles: [],
        userTypes: []
      },
      {
        id: 6,
        label: "Using Custom Telematics Devices",
        route: "/myGeotab/guides/usingCustomTelematicsDevices",
        level: 1,
        order: 6,
        roles: [],
        userTypes: []
      },
      {
        id: 7,
        label: "Media Files",
        route: "/myGeotab/guides/mediaFiles",
        level: 1,
        order: 7,
        roles: [],
        userTypes: []
      },
      {
        id: 8,
        label: "Convert to Power BI",
        route: "/myGeotab/guides/powerBI",
        level: 1,
        order: 8,
        roles: [],
        userTypes: []
      },
      {
        id: 9,
        label: "Using the Data Connector",
        route: "/myGeotab/guides/usingTheDataConnector",
        level: 1,
        order: 9,
        roles: [],
        userTypes: []
      },
      {
        id: 10,
        label: "Code Base",
        level: 1,
        order: 10,
        roles: [],
        userTypes: [],
        children: [
          {
            id: 0,
            label: "Javascript",
            route: "/myGeotab/guides/codeBase/usingInJavascript",
            level: 2,
            order: 0,
            roles: [],
            userTypes: []
          },
          {
            id: 1,
            label: ".Net",
            route: "/myGeotab/guides/codeBase/usingInDotNet",
            level: 2,
            order: 1,
            roles: [],
            userTypes: []
          },
          {
            id: 2,
            label: "Java",
            route: "/myGeotab/guides/codeBase/usingInJava",
            level: 2,
            order: 2,
            roles: [],
            userTypes: []
          }
        ],
      },
    ]
  },
  {
    id: 3,
    label: "Add-Ins",
    level: 0,
    order: 3,
    userTypes: [],
    roles: [],
    Icon: IconPuzzlePiece,
    children: [
      {
        id: 0,
        label: "Developing Add-Ins",
        route: "/myGeotab/addIns/developingAddIns",
        level: 1,
        order: 0,
        roles: [],
        userTypes: []
      },
      {
        id: 1,
        label: "Add-Ins for Data Storage",
        route: "/myGeotab/addIns/addInStorage",
        level: 1,
        order: 1,
        roles: [],
        userTypes: []
      },
      {
        id: 2,
        label: "Map Add-Ins",
        route: "/myGeotab/addIns/mapAddIns",
        level: 1,
        order: 2,
        roles: [],
        userTypes: []
      },
    ]
  },
  {
    id: 4,
    label: "API Reference",
    level: 0,
    order: 4,
    userTypes: [],
    roles: [],
    Icon: IconDocumentWithMagnifyingGlass,
    children: [
      {
        id: 0,
        label: "Methods",
        route: "/myGeotab/apiReference/methods",
        level: 1,
        order: 0,
        roles: [],
        userTypes: []
      },
      {
        id: 1,
        label: "Objects",
        route: "/myGeotab/apiReference/objects",
        level: 1,
        order: 1,
        roles: [],
        userTypes: []
      },
    ]
  },
  {
    id: 5,
    label: "API Clients",
    route: "/myGeotab/apiClients",
    level: 0,
    order: 5,
    userTypes: [],
    roles: [],
    Icon: IconHexagonGear
  },
  {
    id: 6,
    label: "Code Samples",
    level: 0,
    order: 6,
    userTypes: [],
    roles: [],
    Icon: IconCodeBox,
    children: [
      {
        id: 0,
        label: "Javascript",
        route: "/myGeotab/codeSamples/javascriptSamples",
        level: 1,
        order: 0,
        roles: [],
        userTypes: []
      },
      {
        id: 1,
        label: ".Net",
        route: "/myGeotab/codeSamples/dotnetSamples",
        level: 1,
        order: 1,
        roles: [],
        userTypes: []
      },
      {
        id: 2,
        label: "Java",
        externalRoute: "https://github.com/Geotab/sdk-java-samples",
        level: 1,
        order: 2,
        roles: [],
        userTypes: [],
        onClick: () => window.open("https://github.com/Geotab/sdk-java-samples", "_blank")
      },
      {
        id: 3,
        label: "Add-Ins",
        externalRoute: "https://github.com/Geotab/sdk-addin-samples",
        level: 1,
        order: 3,
        roles: [],
        userTypes: [],
        onClick: () => window.open("https://github.com/Geotab/sdk-addin-samples", "_blank")
      },
    ]
  }
];