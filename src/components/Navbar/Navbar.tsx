
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import MenuContext from "../../menuContext";

export default function Navbar() {

  const section = useContext(MenuContext);

  return (
    <div>
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
        <div>
          <Link to="/usingGoDevices">Using GO Devices</Link>
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
    </div>
  );
}