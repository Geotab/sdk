import { IconGeotabDrive, IconGrid, IconMarketplace, IconMyGShort, IconProps, IconQuestionSupport } from "@geotab/react-component-library";
// import { IconProps, SideNavigationMenuItemType } from "@geotab/react-component-library";
import { ComponentType } from "react";
import { IconCodeTerminal, IconMyAShort } from "./icons";

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

export const TertiaryNavbarItems: SideNavigationMenuItemType[] = [
    {
        id: 0,
        label: "API Runner",
        externalRoute: "https://geotab.github.io/sdk/software/api/runner.html",
        level: 0,
        order: 0,
        userTypes: [],
        roles: [],
        Icon: IconCodeTerminal,
        // TODO: UPDATE THE URL IF NEEDED
        onClick: () => window.open("https://geotab.github.io/sdk/software/api/runner.html", "_blank")
    },
    // {
    //     id: 1,
    //     label: "Geotab Apps",
    //     route: "/myGeotab/whatsNew",
    //     level: 0,
    //     order: 0,
    //     userTypes: [],
    //     roles: [],
    //     Icon: IconGrid,
    //     onClick: () => alert("Installation clicked")
    // },
    {
        id: 1,
        label: "Geotab Apps",
        route: "/GeotabApps",
        level: 0,
        order: 1,
        userTypes: [],
        roles: [],
        Icon: IconGrid,
        children: [
            {
                id: 1,
                label: "Core Products",
                isTitle: true,
                level: 1,
                order: 0,
                roles: [],
                userTypes: []
            },
            {
                id: 2,
                label: "MyGeotab",
                externalRoute: "https://my.geotab.com/",
                level: 1,
                order: 1,
                userTypes: [],
                roles: [],
                Icon: IconMyGShort,
                onClick: () => window.open("https://my.geotab.com/", "_blank")
            },
            {
                id: 3,
                label: "MyAdmin",
                externalRoute: "https://myadmin.geotab.com/",
                level: 1,
                order: 2,
                userTypes: [],
                roles: [],
                // TODO: Get MyAdmin short icon
                Icon: IconMyAShort,
                onClick: () => window.open("https://myadmin.geotab.com/", "_blank")
            },
            {
                id: 4,
                label: "Marketplace",
                externalRoute: "https://marketplace.geotab.com/",
                level: 1,
                order: 3,
                userTypes: [],
                roles: [],
                Icon: IconMarketplace,
                onClick: () => window.open("https://marketplace.geotab.com/", "_blank")
            },
            {
                id: 5,
                label: "Drive App",
                externalRoute: "https://my.geotab.com/drive/",
                level: 1,
                order: 4,
                userTypes: [],
                roles: [],
                Icon: IconGeotabDrive,
                onClick: () => window.open("https://my.geotab.com/drive/", "_blank")
            },
            {
                id: 6,
                label: "Other Apps & Products",
                isTitle: true,
                level: 1,
                order: 5,
                roles: [],
                userTypes: []
            },
            {
                id: 7,
                label: "Geotab.com",
                externalRoute: "https://www.geotab.com/",
                level: 1,
                order: 6,
                userTypes: [],
                roles: [],
                onClick: () => window.open("https://www.geotab.com/", "_blank")
            },
            {
                id: 8,
                label: "Geotab Support",
                externalRoute: "https://community.geotab.com/s/?language=en_US",
                level: 1,
                order: 7,
                userTypes: [],
                roles: [],
                onClick: () => window.open("https://community.geotab.com/s/?language=en_US", "_blank")
            }
        ]
    },
    {
        id: 2,
        label: "Help & Support",
        externalRoute: "https://community.geotab.com/s/integrators-hub?language=en_US",
        route: "/myGeotab/whatsNew",
        level: 0,
        order: 2,
        userTypes: [],
        roles: [],
        Icon: IconQuestionSupport,
        onClick: () => window.open("https://community.geotab.com/s/integrators-hub?language=en_US", "_blank")
    }
];
