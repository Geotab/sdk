import { IconGeotabDrive, IconGrid, IconMarketplace, IconMyGShort, IconProps, IconQuestionSupport, LogoMyAdmin } from "@geotab/react-component-library";
// import { IconProps, SideNavigationMenuItemType } from "@geotab/react-component-library";
import { ComponentType } from "react";
import { IconCodeTerminal } from "./icons";

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

export const TertiaryNavbarItems: SideNavigationMenuItemType[] = [
    {
        id: 0,
        label: "API Runner",
        externalRoute: "https://geotab.github.io/sdk/software/api/runner.html",
        level: 0,
        order: 0,
        userTypes: ["admin", "user"],
        roles: ["admin", "user"],
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
    //     userTypes: ["admin", "user"],
    //     roles: ["admin", "user"],
    //     Icon: IconGrid,
    //     onClick: () => alert("Installation clicked")
    // },
    {
        id: 1,
        label: "Geotab Apps",
        route: "/GeotabApps",
        level: 0,
        order: 1,
        userTypes: ["admin", "user"],
        roles: ["admin", "user"],
        Icon: IconGrid,
        children: [
            {
                id: 1,
                label: "Core Products",
                isTitle: true,
                level: 1,
                order: 0,
                roles: [],
                userTypes: [],
            },
            {
                id: 2,
                label: "MyGeotab",
                externalRoute: "https://my.geotab.com/",
                level: 1,
                order: 1,
                userTypes: ["admin", "user"],
                roles: ["admin", "user"],
                Icon: IconMyGShort,
                onClick: () => window.open("https://my.geotab.com/", "_blank")
            },
            {
                id: 3,
                label: "MyAdmin",
                externalRoute: "https://myadmin.geotab.com/",
                level: 1,
                order: 2,
                userTypes: ["admin", "user"],
                roles: ["admin", "user"],
                // TODO: Get MyAdmin short icon
                Icon: LogoMyAdmin,
                onClick: () => window.open("https://myadmin.geotab.com/", "_blank")
            },
            {
                id: 4,
                label: "Marketplace",
                externalRoute: "https://marketplace.geotab.com/",
                level: 1,
                order: 3,
                userTypes: ["admin", "user"],
                roles: ["admin", "user"],
                Icon: IconMarketplace,
                onClick: () => window.open("https://marketplace.geotab.com/", "_blank")
            },
            {
                id: 5,
                label: "Drive App",
                externalRoute: "/InternalTools",
                level: 1,
                order: 4,
                userTypes: ["admin", "user"],
                roles: ["admin", "user"],
                Icon: IconGeotabDrive,
                onClick: () => alert("clicked")
            },
            {
                id: 6,
                label: "Other Apps & Products",
                isTitle: true,
                level: 1,
                order: 5,
                roles: [],
                userTypes: [],
            },
            {
                id: 7,
                label: "Geotab.com",
                externalRoute: "/Geotabcom",
                level: 1,
                order: 6,
                userTypes: ["admin", "user"],
                roles: ["admin", "user"],
                onClick: () => alert("clicked")
            },
            {
                id: 8,
                label: "Geotab Support",
                externalRoute: "/GeotabSupport",
                level: 1,
                order: 7,
                userTypes: ["admin", "user"],
                roles: ["admin", "user"],
                onClick: () => alert("clicked")
            }
        ],
    },
    {
        id: 2,
        label: "Help & Support",
        route: "/myGeotab/whatsNew",
        level: 0,
        order: 2,
        userTypes: ["admin", "user"],
        roles: ["admin", "user"],
        Icon: IconQuestionSupport,
        onClick: () => alert("Installation clicked")
    }
];