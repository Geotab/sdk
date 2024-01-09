import { IconProps } from "@geotab/react-component-library";
// import { IconProps, SideNavigationMenuItemType } from "@geotab/react-component-library";
import { ComponentType } from "react";
import { IconCircleInfo, IconPuzzlePiece } from "./icons";

// TODO: Eventually remove and import from library
interface SideNavigationMenuItemType {
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
}

export const DriveNavbarItems: SideNavigationMenuItemType[] = [
    {
        id: 0,
        label: "Introduction",
        route: "/drive/introduction",
        level: 0,
        order: 0,
        userTypes: [],
        roles: [],
        Icon: IconCircleInfo
    },
    {
        id: 1,
        label: "Add-Ins",
        level: 0,
        order: 1,
        userTypes: [],
        roles: [],
        Icon: IconPuzzlePiece,
        children: [
            {
                id: 0,
                label: "Add-Ins for Drive",
                route: "/drive/addIns/driveAddIns",
                level: 1,
                order: 0,
                userTypes: [],
                roles: []
            }
        ]
    }
];
