import { IconGeotabDrive, IconGrid, IconMarketplace, IconMyGShort, IconQuestionSupport, SideNavigationMenuItemType } from "@geotab/react-component-library";
import { IconCodeTerminal, IconMyAShort } from "../icons";

export const TERTIARY_NAVBAR_ITEMS: SideNavigationMenuItemType[] = [
    {
        id: 0,
        label: "API Runner",
        // TODO: UPDATE THE URL IF NEEDED FOR THE API RUNNER WHEN THE NEW SITE IS LIVE
        externalRoute: "https://geotab.github.io/sdk/software/api/runner.html",
        level: 0,
        order: 0,
        userTypes: [],
        roles: [],
        Icon: IconCodeTerminal
    },
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
                Icon: IconMyGShort
            },
            {
                id: 3,
                label: "MyAdmin",
                externalRoute: "https://myadmin.geotab.com/",
                level: 1,
                order: 2,
                userTypes: [],
                roles: [],
                Icon: IconMyAShort
            },
            {
                id: 4,
                label: "Marketplace",
                externalRoute: "https://marketplace.geotab.com/",
                level: 1,
                order: 3,
                userTypes: [],
                roles: [],
                Icon: IconMarketplace
            },
            {
                id: 5,
                label: "Drive App",
                externalRoute: "https://my.geotab.com/drive/",
                level: 1,
                order: 4,
                userTypes: [],
                roles: [],
                Icon: IconGeotabDrive
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
                roles: []
            },
            {
                id: 8,
                label: "Geotab Support",
                externalRoute: "https://community.geotab.com/s/?language=en_US",
                level: 1,
                order: 7,
                userTypes: [],
                roles: []
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
        Icon: IconQuestionSupport
    }
];
