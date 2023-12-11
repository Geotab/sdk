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
import MapAddIns from "./pages/myGeotab/addIns/mapAddIns";

import MyGeotabMethods from "./pages/myGeotab/apiReference/methods";
import MyGeotabObjects from "./pages/myGeotab/apiReference/objects";
import MyGeotabMethod from "./pages/myGeotab/apiReference/method";

import MyAdminIntroduction from "./pages/myAdmin/introduction";
import HardwareIntroduction from "./pages/hardware/introduction";

import DriveIntroduction from "./pages/drive/introduction";
import DriveAddIns from "./pages/drive/addIns/driveAddIns";

import { Toaster } from "@geotab/react-component-library";
import MgMediaFiles from "./pages/myGeotab/guides/mgMediaFiles";
import usingInDotnet from "./pages/myGeotab/guides/codeBase/usingInDotnet";
import usingInJavascript from "./pages/myGeotab/guides/codeBase/usingInJavascript";
import usingInJava from "./pages/myGeotab/guides/codeBase/usingInJava";
import ApiClients from "./pages/myGeotab/apiClients";
import UsingWithJavascript from "./pages/myAdmin/guides/usingWithJavascript";



function App() {
  return (
    <Toaster duration={2000} position="bottom-center">
      <Router>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/sdk" Component={LandingPage} />
          <Route path="/myGeotab/introduction" Component={MyGeotabIntroduction} />
          <Route path="/myGeotab/whatsNew" Component={MyGeotabWhatsNew} />
          <Route path="/myGeotab/apiClients" Component={ApiClients} />

          <Route path="/myGeotab/guides/gettingStarted" Component={MyGeotabGettingStarted} />
          <Route path="/myGeotab/guides/dataFeed" Component={DataFeed} />
          <Route path="/myGeotab/guides/usingGoDevices" Component={UsingGoDevices} />
          <Route path="/myGeotab/guides/goDeviceLogging" Component={GoDeviceLogging} />
          <Route path="/myGeotab/guides/usingCustomTelematicsDevices" Component={usingCustomTelematicsDevices} />
          <Route path="/myGeotab/guides/powerBI" Component={PowerBI} />
          <Route path="/myGeotab/guides/goDeviceLogging" Component={GoDeviceLogging} />
          <Route path="/myGeotab/guides/MyGeotabUrls" Component={MyGeotabUrls} />
          <Route path="/myGeotab/guides/mgMediaFiles" Component={MgMediaFiles} />

          <Route path="/myGeotab/guides/codeBase/usingInDotnet" Component={usingInDotnet} />
          <Route path="/myGeotab/guides/codeBase/usingInJava" Component={usingInJava} />
          <Route path="/myGeotab/guides/codeBase/usingInJavascript" Component={usingInJavascript} />

          <Route path="/myGeotab/addIns/developingAddIns" Component={MyGeotabDevelopingAddIns} />
          <Route path="/myGeotab/addIns/mapAddIns" Component={MapAddIns} />
          <Route path="/myGeotab/addIns/addInStorage" Component={MyGeotabAddInStorage} />

          <Route path="/myGeotab/apiReference/methods" Component={MyGeotabMethods} />
          <Route path="/method/:methodId" element={<MyGeotabMethod />}/> 
          <Route path="/myGeotab/apiReference/objects" Component={MyGeotabObjects} />

          <Route path="/myAdmin/introduction" Component={MyAdminIntroduction} />
          <Route path="/myAdmin/guides/usingWithJavascript" Component={UsingWithJavascript} /> 
          <Route path="/hardware/introduction" Component={HardwareIntroduction} />

          <Route path="/drive/introduction" Component={DriveIntroduction} />
          <Route path="/drive/addIns/driveAddIns" Component={DriveAddIns} />
        </Routes>
      </Router>
    </Toaster>
  );
}

export default App;
