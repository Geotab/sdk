import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages";

import MyGeotabIntroduction from "./pages/myGeotab/introduction";
import MyGeotabReleaseNotes from "./pages/myGeotab/releaseNotes";

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
import MyAdminReleaseNotes from "./pages/myAdmin/releaseNotes";
import MyAdminGettingStarted from "./pages/myAdmin/guides/gettingStarted";
import MyAdminConcepts from "./pages/myAdmin/guides/concepts";

import MyAdminMethods from "./pages/myAdmin/apiReference/methods";

import HardwareIntroduction from "./pages/hardware/introduction";
import HardwareIOExpanderProtocol from "./pages/hardware/guides/messagingProtocol";
import Ble from "./pages/hardware/protocolReference/ble";
import Can from "../src/pages/hardware/protocolReference/can";
import Rs232Usb from "./pages/hardware/protocolReference/rs232Usb";

import MIMEProtocol  from "./pages/hardware/guides/MIMEProtocol";

import DriveIntroduction from "./pages/drive/introduction";
import DriveAddIns from "./pages/drive/addIns/driveAddIns";

import { Toaster } from "@geotab/react-component-library";
import MgMediaFiles from "./pages/myGeotab/guides/mgMediaFiles";
import UsingInDotnet from "./pages/myGeotab/guides/codeBase/usingInDotnet";
import usingInJavascript from "./pages/myGeotab/guides/codeBase/usingInJavascript";
import usingInJava from "./pages/myGeotab/guides/codeBase/usingInJava";
import ApiClients from "./pages/myGeotab/apiClients";
import UsingWithJavascript from "./pages/myAdmin/guides/codeBase/usingWithJavascript";
import JavascriptExamples from "./pages/myAdmin/codeSamples/javascriptExamples";
import DotnetExamples from "./pages/myAdmin/codeSamples/dotnetExamples";
import Python from "./pages/hardware/codeSamples/python";
import UsingWithDotnet from "./pages/myAdmin/guides/codeBase/usingWithDotnet";
import HardwareDesignGuide from "./pages/hardware/guides/hardwareDesignGuide";
import DotnetSamples from "./pages/myGeotab/codeSamples/dotnetSamples";

function App() {
  return (
    <Toaster duration={2000} position="bottom-center">
      <Router>
        <Routes>
          {/* Landing Page Routes */}
          <Route path="/" Component={LandingPage} />
          <Route path="/sdk" Component={LandingPage} />

          {/* =================================================== */}
          {/* MyGeotab Routes */}
          <Route path="/myGeotab" Component={MyGeotabIntroduction} />
          <Route path="/myGeotab/introduction" Component={MyGeotabIntroduction} />
          <Route path="/myGeotab/releaseNotes" Component={MyGeotabReleaseNotes} />

          {/* MyGeotab > Guides Routes */}
          <Route path="/myGeotab/guides/gettingStarted" Component={MyGeotabGettingStarted} />
          <Route path="/myGeotab/guides/concepts" Component={MyGeotabConcepts} />
          <Route path="/myGeotab/guides/dataFeed" Component={DataFeed} />
          <Route path="/myGeotab/guides/MyGeotabUrls" Component={MyGeotabUrls} />
          <Route path="/myGeotab/guides/usingGoDevices" Component={UsingGoDevices} />
          <Route path="/myGeotab/guides/goDeviceLogging" Component={GoDeviceLogging} />
          <Route path="/myGeotab/guides/usingCustomTelematicsDevices" Component={usingCustomTelematicsDevices} />
          <Route path="/myGeotab/guides/mediaFiles" Component={MgMediaFiles} />
          <Route path="/myGeotab/guides/powerBI" Component={PowerBI} />
          <Route path="/myGeotab/guides/usingTheDataConnector" Component={UsingTheDataConnector} />

          {/* MyGeotab > Guides > Code Base Routes */}
          <Route path="/myGeotab/guides/codeBase/usingInJavascript" Component={usingInJavascript} />
          <Route path="/myGeotab/guides/codeBase/usingInDotnet" Component={UsingInDotnet} />
          <Route path="/myGeotab/guides/codeBase/usingInJava" Component={usingInJava} />

          {/* MyGeotab > Add-Ins Routes */}
          <Route path="/myGeotab/addIns/developingAddIns" Component={MyGeotabDevelopingAddIns} />
          <Route path="/myGeotab/addIns/addInStorage" Component={MyGeotabAddInStorage} />
          <Route path="/myGeotab/addIns/mapAddIns" Component={MapAddIns} />

          {/* MyGeotab > API Reference Routes */}
          <Route path="/myGeotab/apiReference/methods" Component={MyGeotabMethods} />
          <Route path="/method/:methodId" element={<MyGeotabMethod />} />
          <Route path="/myGeotab/apiReference/objects" Component={MyGeotabObjects} />

          {/* MyGeotab > ApiClients Route */}
          <Route path="/myGeotab/apiClients" Component={ApiClients} />

          {/* MyGeotab > Code Samples Routes */}
          {/* TODO: Need to add Code Samples > Javascript & .Net routes when the files are made */}
          <Route path="/myGeotab/codeSamples/dotnetSamples" Component={DotnetSamples} />

          {/* =================================================== */}
          {/* MyAdmin Routes */}
          <Route path="/myAdmin" Component={MyAdminIntroduction} />
          <Route path="/myAdmin/introduction" Component={MyAdminIntroduction} />

          {/* MyAdmin > Guides Routes */}
          <Route path="/myAdmin/releaseNotes" Component={MyAdminReleaseNotes} />
          <Route path="/myAdmin/guides/gettingStarted" Component={MyAdminGettingStarted} />
          <Route path="/myAdmin/guides/concepts" Component={MyAdminConcepts} />
          
          {/* MyAdmin > API Reference Routes */}
          <Route path="/myAdmin/apiReference/methods" Component={MyAdminMethods} />

          {/* MyAdmin > Guides > Code Base Routes */}
          <Route path="/myAdmin/guides/codeBase/usingWithJavascript" Component={UsingWithJavascript} /> 
          <Route path="/myAdmin/guides/codeBase/usingWithDotnet" Component={UsingWithDotnet} />
          
          {/* MyAdmin > Code Samples Routes */}
          <Route path="/myAdmin/codeSamples/javascriptExamples" Component={JavascriptExamples} />
          <Route path="/myAdmin/codeSamples/dotnetExamples" Component={DotnetExamples} />

          {/* =================================================== */}
          {/* Hardware Routes */}
          <Route path="/hardware" Component={HardwareIntroduction} />
          <Route path="/hardware/introduction" Component={HardwareIntroduction} />

          {/* Hardware > Guides Routes */}
          <Route path="/hardware/guides/messagingProtocol" Component={HardwareIOExpanderProtocol} />
          <Route path="/hardware/guides/designGuide" Component={HardwareDesignGuide} />
          <Route path="/hardware/guides/MIMEProtocol" Component={MIMEProtocol} />

          {/* Hardware > Protocol Reference Routes */}
          <Route path="/hardware/protocolReference/can" Component={Can} />
          <Route path="/hardware/protocolReference/ble" Component={Ble} />
          <Route path="/hardware/protocolReference/rs232-usb" Component={Rs232Usb} />

          {/* Hardware > Code Samples Routes */}
          <Route path="/hardware/codeSamples/python" Component={Python} />

          {/* =================================================== */}
          {/* Drive Routes */}
          <Route path="/drive" Component={DriveIntroduction} />
          <Route path="/drive/introduction" Component={DriveIntroduction} />
          <Route path="/drive/addIns/driveAddIns" Component={DriveAddIns} />
        </Routes>
      </Router>
    </Toaster>
  );
}

export default App;
