import { IconProps } from "@geotab/react-component-library";
// import { IconProps, SideNavigationMenuItemType } from "@geotab/react-component-library";
import { ComponentType } from "react";
import { IconCircleInfo, IconCodeBox, IconDocument, IconDocumentWithMagnifyingGlass, IconStar } from "./icons";

// TODO: Eventually remove and import from library
type SideNavigationMenuItemType = {
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

export const MyAdminNavbarItems: SideNavigationMenuItemType[] = [
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
        label: "API Reference",
        level: 0,
        order: 4,
        userTypes: ["admin", "user"],
        roles: ["admin", "user"],
        Icon: IconDocumentWithMagnifyingGlass,
        children: []
    },
    {
        id: 4,
        label: "Code Samples",
        level: 0,
        order: 5,
        userTypes: ["admin", "user"],
        roles: ["admin", "user"],
        Icon: IconCodeBox,
        children: []
    }
];