import { useContext, useEffect } from "react";
import MenuContext from "../../menuContext";
import { SideNavigation, SideNavigationCollapseProvider, SideNavigationMenuItemType, TooltipProvider } from "@geotab/react-component-library";
import { LogoGeotabSDK } from "../Logo/LogoGeotabSDK";
import { HeaderSections } from "../Header/headerSectionsEnum";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { DRIVE_NAVBAR_ITEMS, HARDWARE_NAVBAR_ITEMS, MYADMIN_NAVBAR_ITEMS, MYGEOTAB_NAVBAR_ITEMS, TERTIARY_NAVBAR_ITEMS } from "./menuItems";

interface NavbarProps {
    section: string;
}

export default function Navbar({ section }: NavbarProps): JSX.Element {
    const { activeSiteSection, setActiveSiteSection } = useContext(MenuContext);
    const navigate: NavigateFunction = useNavigate();
    const handleLogoClick = (): void => {
        setActiveSiteSection(HeaderSections.Landing);
        navigate("/sdk");
    };

    const handleMenuItemClick = (menuItem: SideNavigationMenuItemType): void => {
        if (menuItem.route) {
            navigate(menuItem.route);
        } else if (menuItem.externalRoute) {
            window.open(menuItem.externalRoute, "_blank");
        }
    };

    const navBarMapping: { [key: string]: SideNavigationMenuItemType[] } = {
        [HeaderSections.MyGeotab]: MYGEOTAB_NAVBAR_ITEMS,
        [HeaderSections.MyAdmin]: MYADMIN_NAVBAR_ITEMS,
        [HeaderSections.Drive]: DRIVE_NAVBAR_ITEMS,
        [HeaderSections.Hardware]: HARDWARE_NAVBAR_ITEMS,
        "": [] // Default value is needed for the SideNavigation component to render properly
    };

    useEffect((): void => {
        setActiveSiteSection(section);
    });

    return (
        <div>
            <TooltipProvider>
                <SideNavigationCollapseProvider>
                    <SideNavigation onMenuItemClick={handleMenuItemClick}>
                        <SideNavigation.Main Logo={LogoGeotabSDK} onLogoClick={handleLogoClick} />
                        <SideNavigation.Primary menuItems={navBarMapping[activeSiteSection]} />
                        <SideNavigation.Tertiary menuItems={TERTIARY_NAVBAR_ITEMS} />
                    </SideNavigation>
                </SideNavigationCollapseProvider>
            </TooltipProvider>
        </div>
    );
}
