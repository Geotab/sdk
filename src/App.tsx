import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Header, Navbar} from "./components";
import LandingPage from "./pages";

import MyGeotabIntroduction from "./pages/myGeotab/introduction";
import MyGeotabWhatsNew from "./pages/myGeotab/whatsNew";
import MyGeotabGettingStarted from "./pages/myGeotab/guides/gettingStarted";
import usingCustomTelematicsDevices from "./pages/myGeotab/guides/usingCustomTelematicsDevices";
import UsingGoDevices from "./pages/myGeotab/guides/usingGoDevices";
import MyGeotabMethods from "./pages/myGeotab/apiReference/methods";
import MyGeotabObjects from "./pages/myGeotab/apiReference/objects";

import MyAdminIntroduction from "./pages/myAdmin/introduction";
import HardwareIntroduction from "./pages/hardware/introduction";
import DriveIntroduction from "./pages/drive/introduction";
import { Toaster } from "@geotab/react-component-library";


function App() {
  return (
    <Toaster duration={2000} position="bottom-center">
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/sdk" Component={LandingPage} />
          <Route path="/myGeotabIntroduction" Component={MyGeotabIntroduction} />
          <Route path="/whatsNew" Component={MyGeotabWhatsNew} />
          <Route path="/gettingStarted" Component={MyGeotabGettingStarted} />
          <Route path="/usingGoDevices" Component={UsingGoDevices} />
          <Route path="/methods" Component={MyGeotabMethods} />
          <Route path="/objects" Component={MyGeotabObjects} />
          <Route path="/usingCustomTelematicsDevices" Component={usingCustomTelematicsDevices} />
          <Route path="/myAdminIntroduction" Component={MyAdminIntroduction} />
          <Route path="/hardwareIntroduction" Component={HardwareIntroduction} />
          <Route path="/driveIntroduction" Component={DriveIntroduction} />

        </Routes>
      </Router>
      </Toaster>
  );
}

export default App;
