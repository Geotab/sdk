import { IconProps } from "@geotab/react-component-library";
// import { IconProps, SideNavigationMenuItemType } from "@geotab/react-component-library";
import { ComponentType } from "react";
import { IconCircleInfo, IconDocument, IconDocumentWithMagnifyingGlass, IconCodeBox } from "./icons";

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

export const HardwareNavbarItems: SideNavigationMenuItemType[] = [
    {
        id: 0,
        label: 'Introduction',
        route: '/myGeotab/introduction',
        level: 0,
        order: 1,
        userTypes: ['admin', 'user'],
        roles: ['admin', 'user'],
        Icon: IconCircleInfo,
        onClick: () => alert('Introduction clicked')
    },
    {
        id: 1,
        label: 'Guides',
        level: 0,
        order: 2,
        userTypes: ['admin', 'user'],
        roles: ['admin', 'user'],
        Icon: IconDocument,
        children: []
    },
    {
        id: 2,
        label: 'Protocol Reference',
        level: 0,
        order: 3,
        userTypes: ['admin', 'user'],
        roles: ['admin', 'user'],
        Icon: IconDocumentWithMagnifyingGlass,
        children: []
    },
    {
        id: 3,
        label: 'Code Samples',
        level: 0,
        order: 4,
        userTypes: ['admin', 'user'],
        roles: ['admin', 'user'],
        Icon: IconCodeBox,
        children: []
    }
];