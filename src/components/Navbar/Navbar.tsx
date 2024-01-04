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
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handleLogoClick = () => {
    setActiveSiteSection(HeaderSections.Landing);
    navigate("/sdk");
  };

  const navBarMapping: { [key: string]: SideNavigationMenuItemType[] } = {
    [HeaderSections.MyGeotab]: MyGeotabNavbarItems,
    [HeaderSections.MyAdmin]: MyAdminNavbarItems,
    [HeaderSections.Drive]: DriveNavbarItems,
    [HeaderSections.Hardware]: HardwareNavbarItems,
    "": [] // Default value is needed for the SideNavigation component to render properly
  };

  function attachOnClickHandlerToMenuItems(
    item: SideNavigationMenuItemType
  ): void {
    if (item.children && item.children?.length > 0) {
      item.children.forEach((child: SideNavigationMenuItemType) => {
        attachOnClickHandlerToMenuItems(child);
      });
    } else {
      if (!item.externalRoute && item.onClick === undefined) {
        item.onClick = () => {
          if (item.route) {
            navigate(item.route);
          }
        };
      }
    }
  }

  useEffect(() => {
    setActiveSiteSection(section);

    // The navigate function (aka useNavigate hook) has to be called within the useEffect hook so that it gets executed after the component mounts, not when the component is first rendered.
    Object.values(navBarMapping).forEach(
      (items: SideNavigationMenuItemType[]) => {
        items.forEach((item: SideNavigationMenuItemType) => {
          attachOnClickHandlerToMenuItems(item);
        });
      }
    );
  });

  return (
    <div>
      <TooltipProvider>
        <SideNavigationCollapseProvider>
          <SideNavigation>
            <SideNavigation.Main
              Logo={LogoGeotabSDK}
              onLogoClick={handleLogoClick}
            />
            <SideNavigation.Primary menuItems={navBarMapping[activeSiteSection]} />
            {/* It's necessary to pass in an empty array for the Secondary section so that the nav bar displays properly */}
            <SideNavigation.Secondary menuItems={[]} />
            <SideNavigation.Tertiary menuItems={TertiaryNavbarItems} />
          </SideNavigation>
        </SideNavigationCollapseProvider>
      </TooltipProvider>
    </div>
  );
}
