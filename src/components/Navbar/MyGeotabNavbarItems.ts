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
    order: 1,
    userTypes: [],
    roles: [],
    Icon: IconCircleInfo
  },
  {
    id: 1,
    label: "Release Notes",
    route: "/myGeotab/whatsNew", //TODO: Update to new file name
    level: 0,
    order: 2,
    userTypes: [],
    roles: [],
    Icon: IconStar
  },
  {
    id: 2,
    label: "Guides",
    level: 0,
    order: 3,
    userTypes: [],
    roles: [],
    Icon: IconDocument,
    children: [
      {
        id: 1,
        label: "Getting Started",
        route: "/myGeotab/guides/gettingStarted",
        level: 1,
        order: 1,
        roles: [],
        userTypes: [],
      },
      {
        id: 2,
        label: "Concepts",
        route: "/myGeotab/guides/concepts",
        level: 1,
        order: 2,
        roles: [],
        userTypes: [],
      },
      {
        id: 3,
        label: "Data Feed",
        route: "/myGeotab/guides/dataFeed",
        level: 1,
        order: 3,
        roles: [],
        userTypes: [],
      },
    ]
  },
  {
    id: 3,
    label: "Add-Ins",
    level: 0,
    order: 4,
    userTypes: [],
    roles: [],
    Icon: IconPuzzlePiece,
    children: []
  },
  {
    id: 4,
    label: "API Reference",
    level: 0,
    order: 5,
    userTypes: [],
    roles: [],
    Icon: IconDocumentWithMagnifyingGlass,
    children: []
  },
  {
    id: 5,
    label: "API Clients",
    route: "/myGeotab/apiClients",
    level: 0,
    order: 6,
    userTypes: [],
    roles: [],
    Icon: IconHexagonGear
  },
  {
    id: 6,
    label: "Code Samples",
    level: 0,
    order: 7,
    userTypes: [],
    roles: [],
    Icon: IconCodeBox,
    children: []
  }
];