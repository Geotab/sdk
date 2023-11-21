
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import MenuContext from "../../menuContext";

export default function Navbar(props: any) {

  const section = useContext(MenuContext);

  return (
    <div>
      <div>
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
          <Link to="/myGeotab/addIns/mapAddins">Map Add-ins</Link>
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
    </div >
  );
}