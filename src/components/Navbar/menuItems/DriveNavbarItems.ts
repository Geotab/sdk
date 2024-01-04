// import { IconProps } from "@geotab/react-component-library";
import { SideNavigationMenuItemType } from "@geotab/react-component-library";
import { IconCircleInfo, IconPuzzlePiece } from "../icons";

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