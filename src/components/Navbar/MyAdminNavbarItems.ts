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
        route: "/myAdmin/introduction",
        level: 0,
        order: 0,
        userTypes: [],
        roles: [],
        Icon: IconCircleInfo
    },
    {
        id: 1,
        label: "Release Notes",
        route: "/myAdmin/releaseNotes",
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
                route: "/myAdmin/guides/gettingStarted",
                level: 1,
                order: 0,
                roles: [],
                userTypes: []
            },
            {
                id: 1,
                label: "Concepts",
                route: "/myAdmin/guides/concepts",
                level: 1,
                order: 1,
                roles: [],
                userTypes: []
            },
            /* // TODO: This is legacy content that might not make it 
            {
                id: 2,
                label: "Using 3rd Party Devices",
                route: "/myAdmin/guides/using3rdPartyDevices",
                level: 1,
                order: 2,
                roles: [],
                userTypes: []
            },
            */
            {
                id: 2,
                label: "Code Base",
                level: 1,
                order: 2,
                roles: [],
                userTypes: [],
                children: [
                    {
                        id: 0,
                        label: "Javascript",
                        route: "/myAdmin/guides/codeBase/usingWithJavascript",
                        level: 2,
                        order: 0,
                        roles: [],
                        userTypes: []
                    },
                    {
                        id: 1,
                        label: ".Net",
                        route: "/myAdmin/guides/codeBase/usingWithDotNet", // TODO: This needs to be created
                        level: 2,
                        order: 1,
                        roles: [],
                        userTypes: []
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        label: "API Reference",
        level: 0,
        order: 3,
        userTypes: [],
        roles: [],
        Icon: IconDocumentWithMagnifyingGlass,
        children: [
            {
                id: 0,
                label: "Methods",
                route: "/myAdmin/apiReference/methods", // TODO: This needs to be created
                level: 1,
                order: 0,
                roles: [],
                userTypes: []
            },
            {
                id: 1,
                label: "Objects",
                route: "/myAdmin/apiReference/objects", // TODO: This needs to be created
                level: 1,
                order: 1,
                roles: [],
                userTypes: []
            }
        ]
    },
    {
        id: 4,
        label: "Code Samples",
        level: 0,
        order: 4,
        userTypes: [],
        roles: [],
        Icon: IconCodeBox,
        children: [
            {
                id: 0,
                label: "Javascript",
                route: "/myAdmin/codeSamples/javascriptExamples",
                level: 1,
                order: 0,
                roles: [],
                userTypes: []
            },
            {
                id: 1,
                label: ".Net",
                route: "/myAdmin/codeSamples/dotNetExamples", // TODO: This needs to be created
                level: 1,
                order: 1,
                roles: [],
                userTypes: []
            }
        ]
    }
];