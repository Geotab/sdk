import { IconProps } from "@geotab/react-component-library";
// import { IconProps, SideNavigationMenuItemType } from "@geotab/react-component-library";
import { ComponentType } from "react";
import { IconCircleInfo, IconDocument, IconDocumentWithMagnifyingGlass, IconCodeBox } from "./icons";

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

export const HardwareNavbarItems: SideNavigationMenuItemType[] = [
    {
        id: 0,
        label: "Introduction",
        route: "/hardware/introduction",
        level: 0,
        order: 0,
        userTypes: [],
        roles: [],
        Icon: IconCircleInfo
    },
    {
        id: 1,
        label: "Guides",
        level: 0,
        order: 1,
        userTypes: [],
        roles: [],
        Icon: IconDocument,
        children: [
            {
                id: 0,
                label: "Design Guide",
                route: "/hardware/guides/designGuide",
                level: 1,
                order: 0,
                roles: [],
                userTypes: []
            },
            {
                id: 1,
                label: "Messaging Protocol",
                route: "/hardware/guides/messagingProtocol",
                level: 1,
                order: 1,
                roles: [],
                userTypes: []
            },
            {
                id: 2,
                label: "MIME Protocol",
                route: "/hardware/guides/mimeProtocol",
                level: 1,
                order: 2,
                roles: [],
                userTypes: []
            }
        ]
    },
    {
        id: 2,
        label: "Protocol Reference",
        level: 0,
        order: 2,
        userTypes: [],
        roles: [],
        Icon: IconDocumentWithMagnifyingGlass,
        children: [
            {
                id: 0,
                label: "RS232 & USB",
                route: "/hardware/protocolReference/rs232-usb",
                level: 1,
                order: 0,
                roles: [],
                userTypes: []
            },
            {
                id: 1,
                label: "CAN",
                route: "/hardware/protocolReference/can",
                level: 1,
                order: 1,
                roles: [],
                userTypes: []
            },
            {
                id: 2,
                label: "BLE",
                route: "/hardware/protocolReference/ble",
                level: 1,
                order: 2,
                roles: [],
                userTypes: []
            }
        ]
    },
    {
        id: 3,
        label: "Code Samples",
        level: 0,
        order: 3,
        userTypes: [],
        roles: [],
        Icon: IconCodeBox,
        children: [
            {
                id: 0,
                label: "Python",
                route: "/hardware/codeSamples/python",
                level: 1,
                order: 0,
                roles: [],
                userTypes: []
            },
            {
                id: 1,
                label: "Android",
                externalRoute: "https://github.com/Geotab/android-external-device-example",
                level: 1,
                order: 1,
                roles: [],
                userTypes: [],
                onClick: () => window.open("https://github.com/Geotab/android-external-device-example", "_blank")
            },
            {
                id: 2,
                label: "Raspberry Pi",
                externalRoute: "https://github.com/Geotab/IOX-raspberryPi-demo",
                level: 1,
                order: 2,
                roles: [],
                userTypes: [],
                onClick: () => window.open("https://github.com/Geotab/IOX-raspberryPi-demo", "_blank")
            }
        ]
    }
];
