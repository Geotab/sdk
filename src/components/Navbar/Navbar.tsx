import { useContext } from "react";
import { Link } from "react-router-dom";
import MenuContext from "../../menuContext";
import {
  SideNavigationBase,
  SideNavigationCollapseProvider,
} from "@geotab/react-component-library";
import { LogoGeotabSDK } from "../Logo/LogoGeotabSDK";

export default function Navbar(props: any) {
  const section = useContext(MenuContext);

  return (
    <div>
      <SideNavigationCollapseProvider>
        <SideNavigationBase>
          <SideNavigationBase.Main Logo={LogoGeotabSDK} />
          <div>
            <Link to="/myGeotabIntroduction">Introduction</Link>
          </div>
          <div>
            <Link to="/whatsNew">What's New</Link>
          </div>
          <div>
            Guides
            <div>
              <Link to="/gettingStarted">Getting Started</Link>
            </div>
          </div>
          <div>
            API Reference
            <div>
              <Link to="/methods">Methods</Link>
            </div>
            <div>
              <Link to="/objects">Objects</Link>
            </div>
          </div>
        </SideNavigationBase>
      </SideNavigationCollapseProvider>
    </div>
  );
}
