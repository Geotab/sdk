import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages";

import MyGeotabIntroduction from "./pages/myGeotab/introduction";
import MyGeotabWhatsNew from "./pages/myGeotab/whatsNew";

import MyGeotabGettingStarted from "./pages/myGeotab/guides/gettingStarted";
import DataFeed from "./pages/myGeotab/guides/dataFeed";
import usingCustomTelematicsDevices from "./pages/myGeotab/guides/usingCustomTelematicsDevices";
import UsingGoDevices from "./pages/myGeotab/guides/usingGoDevices";
import GoDeviceLogging from "./pages/myGeotab/guides/goDeviceLogging";
import PowerBI from "./pages/myGeotab/guides/powerBI";
import MyGeotabUrls from "./pages/myGeotab/guides/myGeotabUrls";

import MyGeotabDevelopingAddIns from "./pages/myGeotab/addIns/developingAddIns";
import MyGeotabAddInStorage from "./pages/myGeotab/addIns/addInStorage";

import MyGeotabMethods from "./pages/myGeotab/apiReference/methods";
import MyGeotabObjects from "./pages/myGeotab/apiReference/objects";

import MyAdminIntroduction from "./pages/myAdmin/introduction";
import HardwareIntroduction from "./pages/hardware/introduction";
import DriveIntroduction from "./pages/drive/introduction";
import { Toaster } from "@geotab/react-component-library";
import MapAddins from "./pages/myGeotab/addIns/mapAddIns";


function App() {
  return (
    <Toaster duration={2000} position="bottom-center">
      <Router>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/sdk" Component={LandingPage} />
          <Route path="/myGeotab/introduction" Component={MyGeotabIntroduction} />
          <Route path="/myGeotab/whatsNew" Component={MyGeotabWhatsNew} />

          <Route path="/myGeotab/guides/gettingStarted" Component={MyGeotabGettingStarted} />
          <Route path="/myGeotab/guides/dataFeed" Component={DataFeed} />
          <Route path="/myGeotab/guides/usingGoDevices" Component={UsingGoDevices} />
          <Route path="/myGeotab/guides/goDeviceLogging" Component={GoDeviceLogging} />
          <Route path="/myGeotab/guides/usingCustomTelematicsDevices" Component={usingCustomTelematicsDevices} />
          <Route path="/myGeotab/guides/powerBI" Component={PowerBI} />
          <Route path="/myGeotab/guides/goDeviceLogging" Component={GoDeviceLogging} />
          <Route path="/myGeotab/guides/MyGeotabUrls" Component={MyGeotabUrls} />

          <Route path="/myGeotab/addIns/developingAddIns" Component={MyGeotabDevelopingAddIns} />
          <Route path="/myGeotab/addIns/mapAddins" Component={MapAddins} />
          <Route path="/myGeotab/addIns/addInStorage" Component={MyGeotabAddInStorage} />

          <Route path="/myGeotab/apiReference/methods" Component={MyGeotabMethods} />
          <Route path="/myGeotab/apiReference/objects" Component={MyGeotabObjects} />

          <Route path="/myAdmin/introduction" Component={MyAdminIntroduction} />
          <Route path="/hardware/introduction" Component={HardwareIntroduction} />
          <Route path="/drive/introduction" Component={DriveIntroduction} />
        </Routes>
      </Router>
    </Toaster>
  );
}

export default App;
