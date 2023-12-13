import { IconProps } from "@geotab/react-component-library";
// import { IconProps, SideNavigationMenuItemType } from "@geotab/react-component-library";
import { ComponentType } from "react";
import { IconCircleInfo, IconPuzzlePiece } from "./icons";

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

export const DriveNavbarItems: SideNavigationMenuItemType[] = [
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
        label: "Add-Ins",
        level: 0,
        order: 2,
        userTypes: ["admin", "user"],
        roles: ["admin", "user"],
        Icon: IconPuzzlePiece,
        children: []
    }
];