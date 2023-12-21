import { useContext, useEffect } from "react";
import MenuContext from "../../menuContext";
import {
  SideNavigation,
  SideNavigationCollapseProvider,
  SideNavigationMenuItem // This will be imported once it's added to the react-component-library
} from "@geotab/react-component-library";
import { LogoGeotabSDK } from "../Logo/LogoGeotabSDK";
import { HeaderSections } from "../Header/headerSectionsEnum";
import { MyGeotabNavbarItems, SideNavigationMenuItemType } from "./MyGeotabNavbarItems";
import { MyAdminNavbarItems } from "./MyAdminNavbarItems";
import { DriveNavbarItems } from "./DriveNavbarItems";
import { HardwareNavbarItems } from "./HardwareNavbarItems";
import { TertiaryNavbarItems } from "./TertiaryNavbarItems";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useNavigate } from "react-router-dom";

export default function Navbar(props: any) {
  const { active, setActive } = useContext(MenuContext);
  const navigate = useNavigate();
  const handleLogoClick = () => {
    setActive(HeaderSections.Landing);
    navigate("/sdk");
  };

  const navBarMapping: { [key: string]: SideNavigationMenuItemType[] } = {
    [HeaderSections.MyGeotab]: MyGeotabNavbarItems,
    [HeaderSections.MyAdmin]: MyAdminNavbarItems,
    [HeaderSections.Drive]: DriveNavbarItems,
    [HeaderSections.Hardware]: HardwareNavbarItems,
    '': [] // Default value is needed for the SideNavigation component to render properly
  };

  function attachOnClickHandlerToMenuItems(item: SideNavigationMenuItemType) {
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
    setActive(props.section);

    // The navigate function (aka useNavigate hook) has to be called within the useEffect hook so that it gets executed after the component mounts, not when the component is first rendered.
    Object.values(navBarMapping).forEach((items: SideNavigationMenuItemType[]) => {
      items.forEach((item: SideNavigationMenuItemType) => {
        attachOnClickHandlerToMenuItems(item);
      });
    });
  });

  return (
    <div>
      <Tooltip.Provider delayDuration={350}>
        <SideNavigationCollapseProvider>
          <SideNavigation>
            <SideNavigation.Main Logo={LogoGeotabSDK} onLogoClick={handleLogoClick} />
            <SideNavigation.Primary menuItems={navBarMapping[active]} />
            {/* It's necessary to pass in an empty array for the Secondary section so that the nav bar displays properly */}
            <SideNavigation.Secondary menuItems={[]} />
            <SideNavigation.Tertiary menuItems={TertiaryNavbarItems} />
          </SideNavigation>
        </SideNavigationCollapseProvider>
      </Tooltip.Provider>
    </div >
  );
}
