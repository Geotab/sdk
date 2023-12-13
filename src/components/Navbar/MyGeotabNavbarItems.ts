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
    userTypes: ["admin", "user"],
    roles: ["admin", "user"],
    Icon: IconCircleInfo,
    onClick: () => alert("Introduction clicked")
  },
  {
    id: 1,
    label: "Release Notes",
    route: "/myGeotab/whatsNew",
    level: 0,
    order: 2,
    userTypes: ["admin", "user"],
    roles: ["admin", "user"],
    Icon: IconStar,
    onClick: () => alert("Installation clicked")
  },
  {
    id: 2,
    label: "Guides",
    level: 0,
    order: 3,
    userTypes: ["admin", "user"],
    roles: ["admin", "user"],
    Icon: IconDocument,
    children: []
  },
  {
    id: 3,
    label: "Add-Ins",
    level: 0,
    order: 4,
    userTypes: ["admin", "user"],
    roles: ["admin", "user"],
    Icon: IconPuzzlePiece,
    children: []
  },
  {
    id: 4,
    label: "API Reference",
    level: 0,
    order: 5,
    userTypes: ["admin", "user"],
    roles: ["admin", "user"],
    Icon: IconDocumentWithMagnifyingGlass,
    children: []
  },
  {
    id: 5,
    label: "API Clients",
    level: 0,
    order: 6,
    userTypes: ["admin", "user"],
    roles: ["admin", "user"],
    Icon: IconHexagonGear,
    onClick: () => alert("API Clients clicked")
  },
  {
    id: 6,
    label: "Code Samples",
    level: 0,
    order: 7,
    userTypes: ["admin", "user"],
    roles: ["admin", "user"],
    Icon: IconCodeBox,
    children: []
  }
];