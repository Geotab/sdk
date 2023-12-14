import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages";

import MyGeotabIntroduction from "./pages/myGeotab/introduction";
import MyGeotabWhatsNew from "./pages/myGeotab/whatsNew";

import MyGeotabGettingStarted from "./pages/myGeotab/guides/gettingStarted";
import MyGeotabConcepts from "./pages/myGeotab/guides/concepts";
import DataFeed from "./pages/myGeotab/guides/dataFeed";
import usingCustomTelematicsDevices from "./pages/myGeotab/guides/usingCustomTelematicsDevices";
import UsingGoDevices from "./pages/myGeotab/guides/usingGoDevices";
import GoDeviceLogging from "./pages/myGeotab/guides/goDeviceLogging";
import PowerBI from "./pages/myGeotab/guides/powerBI";
import UsingTheDataConnector from "./pages/myGeotab/guides/usingTheDataConnector";
import MyGeotabUrls from "./pages/myGeotab/guides/myGeotabUrls";

import MyGeotabDevelopingAddIns from "./pages/myGeotab/addIns/developingAddIns";
import MyGeotabAddInStorage from "./pages/myGeotab/addIns/addInStorage";
import MapAddIns from "./pages/myGeotab/addIns/mapAddIns";

import MyGeotabMethods from "./pages/myGeotab/apiReference/methods";
import MyGeotabObjects from "./pages/myGeotab/apiReference/objects";
import MyGeotabMethod from "./pages/myGeotab/apiReference/method";

import MyAdminIntroduction from "./pages/myAdmin/introduction";
import MyAdminConcepts from "./pages/myAdmin/guides/concepts";

import HardwareIntroduction from "./pages/hardware/introduction";

import DriveIntroduction from "./pages/drive/introduction";
import DriveAddIns from "./pages/drive/addIns/driveAddIns";

import { Toaster } from "@geotab/react-component-library";
import MgMediaFiles from "./pages/myGeotab/guides/mgMediaFiles";
import UsingWithDotnet from "./pages/myGeotab/guides/codeBase/usingInDotnet";
import usingInJavascript from "./pages/myGeotab/guides/codeBase/usingInJavascript";
import usingInJava from "./pages/myGeotab/guides/codeBase/usingInJava";
import ApiClients from "./pages/myGeotab/apiClients";
import JavascriptExamples from "./pages/myAdmin/codeSamples/javascriptExamples";
import Python from "./pages/hardware/samples/python";



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
          <Route path="/myGeotab/guides/concepts" Component={MyGeotabConcepts} />
          <Route path="/myGeotab/guides/dataFeed" Component={DataFeed} />
          <Route path="/myGeotab/guides/usingGoDevices" Component={UsingGoDevices} />
          <Route path="/myGeotab/guides/goDeviceLogging" Component={GoDeviceLogging} />
          <Route path="/myGeotab/guides/usingCustomTelematicsDevices" Component={usingCustomTelematicsDevices} />
          <Route path="/myGeotab/guides/powerBI" Component={PowerBI} />
          <Route path="/myGeotab/guides/goDeviceLogging" Component={GoDeviceLogging} />
          <Route path="/myGeotab/guides/MyGeotabUrls" Component={MyGeotabUrls} />
          <Route path="/myGeotab/guides/mgMediaFiles" Component={MgMediaFiles} />
          <Route path="/myGeotab/guides/usingTheDataConnector" Component={UsingTheDataConnector} />

          <Route path="/myGeotab/guides/codeBase/usingInDotnet" Component={UsingWithDotnet} />
          <Route path="/myGeotab/guides/codeBase/usingInJava" Component={usingInJava} />
          <Route path="/myGeotab/guides/codeBase/usingInJavascript" Component={usingInJavascript} />

          <Route path="/myGeotab/addIns/developingAddIns" Component={MyGeotabDevelopingAddIns} />
          <Route path="/myGeotab/addIns/mapAddIns" Component={MapAddIns} />
          <Route path="/myGeotab/addIns/addInStorage" Component={MyGeotabAddInStorage} />

          <Route path="/myGeotab/apiReference/methods" Component={MyGeotabMethods} />
          <Route path="/method/:methodId" element={<MyGeotabMethod />} />
          <Route path="/myGeotab/apiReference/objects" Component={MyGeotabObjects} />

          <Route path="/myAdmin/introduction" Component={MyAdminIntroduction} />
          <Route path="/myAdmin/codeSamples/javascriptExamples" Component={JavascriptExamples} />
          <Route path="/myAdmin/guides/usingWithDotnet" Component={UsingWithDotnet}/>
          <Route path="/myAdmin/guides/concepts" Component={MyAdminConcepts} />

          <Route path="/hardware/introduction" Component={HardwareIntroduction} />
          <Route path="/hardware/samples/python" Component={Python} />

          <Route path="/drive/introduction" Component={DriveIntroduction} />
          <Route path="/drive/addIns/driveAddIns" Component={DriveAddIns} />
        </Routes>
      </Router>
    </Toaster>
  );
}

export default App;
