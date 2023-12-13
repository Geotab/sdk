import { useContext, useEffect } from "react";
import MenuContext from "../../menuContext";
import {
  SideNavigation,
  SideNavigationCollapseProvider,
  SideNavigationMenuItem
} from "@geotab/react-component-library";
import { LogoGeotabSDK } from "../Logo/LogoGeotabSDK";
import { HeaderSections } from "../Header/headerSectionsEnum";
import { MyGeotabNavbarItems, SideNavigationMenuItemType } from "./MyGeotabNavbarItems";
import { MyAdminNavbarItems } from "./MyAdminNavbarItems";
import { DriveNavbarItems } from "./DriveNavbarItems";
import { HardwareNavbarItems } from "./HardwareNavbarItems";
import { TertiaryNavbarItems } from "./TertiaryNavbarItems";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useNavigate } from "react-router";

export default function Navbar(props: any) {
  const { active, setActive } = useContext(MenuContext);

  useEffect(() => {
    setActive(props.section);
  });

  const navBarMapping: { [key: string]: SideNavigationMenuItemType[] } = {
    [HeaderSections.MyGeotab]: MyGeotabNavbarItems,
    [HeaderSections.MyAdmin]: MyAdminNavbarItems,
    [HeaderSections.Drive]: DriveNavbarItems,
    [HeaderSections.Hardware]: HardwareNavbarItems,
    '': []
  };
  console.log(navBarMapping);
  console.log(active);

  const navigate = useNavigate();
  const handleLogoClick = () => navigate("/sdk");

  return (
    <div>
      <Tooltip.Provider delayDuration={350}>
        <SideNavigationCollapseProvider>
          <SideNavigation>
            <SideNavigation.Main Logo={LogoGeotabSDK} onLogoClick={handleLogoClick} />
            {/* <SideNavigation.Primary menuItems={MyGeotabNavbarItems} /> */}
            <SideNavigation.Primary menuItems={navBarMapping[active]} />
            {/* It's necessary to pass in an empty array for the Secondary section so that the nav bar displays properly */}
            <SideNavigation.Secondary menuItems={[]} />
            <SideNavigation.Tertiary menuItems={TertiaryNavbarItems} />
          </SideNavigation>
        </SideNavigationCollapseProvider>
      </Tooltip.Provider>
      {/* <div>
        <Link to="/myGeotab/introduction">Introduction</Link>
      </div>
      <div>
        <Link to="/myGeotab/whatsNew">What's New</Link>
      </div>
      <div>
        Guides
        <div>
          <Link to="/myGeotab/guides/gettingStarted">Getting Started</Link>
        </div>
        <div>
          <Link to="/myGeotab/guides/dataFeed">Data Feed</Link>
        </div>
        <div>
          <Link to="/myGeotab/guides/goDeviceLogging">GO Device Logging</Link>
        </div>
        <div>
          <Link to="/myGeotab/guides/usingGoDevices">Using GO Devices</Link>
        </div>
        <div>
          <Link to="/myGeotab/guides/usingCustomTelematicsDevices">Using Custom Telematics Devices</Link>
        </div>
        <div>
          <Link to="/myGeotab/guides/powerBI">Connect to Power BI</Link>
        </div>
        <div>
          <Link to="/myGeotab/guides/myGeotabUrls">Using MyGeotab URLs</Link>
        </div>
        <div>Code Base
          <div>
            <Link to="/myGeotab/guides/codeBase/usingInDotnet">Using In .NET</Link>
          </div>
          <div>
            <Link to="/myGeotab/guides/codeBase/usingInJavascript">Using In JavaScript</Link>
          </div>
        </div>
      </div >
      <div>
        Add-Ins
        <div>
          <Link to="/myGeotab/addIns/developingAddIns">Developing Add-Ins</Link>
        </div>
        <div>
          <Link to="/myGeotab/addIns/addInStorage">Using Add-Ins for Data Storage</Link>
        </div>
        <div>
          <Link to="/myGeotab/addIns/mapAddIns">Map Add-Ins</Link>
        </div>
      </div>
      <div>
        API Reference
        <div>
          <Link to="/myGeotab/apiReference/methods">Methods</Link>
        </div>
        <div>
          <Link to="/myGeotab/apiReference/objects">Objects</Link>
        </div>
      </div>
      <div>
        Drive
        <div>
          <Link to="/drive/addIns/driveAddIns">Drive Add-Ins</Link>
        </div>
      </div> */}
    </div >
  );
}
