import { useContext, useEffect } from "react";
import MenuContext from "../../menuContext";
import {
  SideNavigation,
  SideNavigationCollapseProvider,
  SideNavigationMenuItemType,
  TooltipProvider
} from "@geotab/react-component-library";
import { LogoGeotabSDK } from "../Logo/LogoGeotabSDK";
import { HeaderSections } from "../Header/headerSectionsEnum";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  DriveNavbarItems,
  HardwareNavbarItems,
  MyAdminNavbarItems,
  MyGeotabNavbarItems,
  TertiaryNavbarItems,
} from "./menuItems";

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
  }

  const navBarMapping: { [key: string]: SideNavigationMenuItemType[] } = {
    [HeaderSections.MyGeotab]: MyGeotabNavbarItems,
    [HeaderSections.MyAdmin]: MyAdminNavbarItems,
    [HeaderSections.Drive]: DriveNavbarItems,
    [HeaderSections.Hardware]: HardwareNavbarItems,
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
            <SideNavigation.Main
              Logo={LogoGeotabSDK}
              onLogoClick={handleLogoClick}
            />
            <SideNavigation.Primary
              menuItems={navBarMapping[activeSiteSection]}
            />
            <SideNavigation.Tertiary menuItems={TertiaryNavbarItems} />
          </SideNavigation>
        </SideNavigationCollapseProvider>
      </TooltipProvider>
    </div>
  );
}
