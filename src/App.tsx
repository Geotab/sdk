import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages";

import MyGeotabIntroduction from "./pages/myGeotab/introduction";
import MyGeotabReleaseNotes from "./pages/myGeotab/releaseNotes";
import ApiClients from "./pages/myGeotab/apiClients";

import MyGeotabGettingStarted from "./pages/myGeotab/guides/gettingStarted";
import MyGeotabConcepts from "./pages/myGeotab/guides/concepts";
import DataFeed from "./pages/myGeotab/guides/dataFeed";
import UsingCustomTelematicsDevices from "./pages/myGeotab/guides/usingCustomTelematicsDevices";
import UsingGoDevices from "./pages/myGeotab/guides/usingGoDevices";
import GoDeviceLogging from "./pages/myGeotab/guides/goDeviceLogging";
import PowerBI from "./pages/myGeotab/guides/powerBI";
import UsingTheDataConnector from "./pages/myGeotab/guides/usingTheDataConnector";
import MyGeotabUrls from "./pages/myGeotab/guides/myGeotabUrls";
import MgMediaFiles from "./pages/myGeotab/guides/mgMediaFiles";
import UsingInDotnet from "./pages/myGeotab/guides/codeBase/usingInDotnet";
import UsingInJavascript from "./pages/myGeotab/guides/codeBase/usingInJavascript";
import UsingInJava from "./pages/myGeotab/guides/codeBase/usingInJava";

import MyGeotabDevelopingAddIns from "./pages/myGeotab/addIns/developingAddIns";
import MyGeotabAddInStorage from "./pages/myGeotab/addIns/addInStorage";
import MapAddIns from "./pages/myGeotab/addIns/mapAddIns";

import MyGeotabDotnetSamples from "./pages/myGeotab/codeSamples/dotnetSamples";
import MyGeotabJavascriptSamples from "./pages/myGeotab/codeSamples/javascriptSamples";

import Methods from "./components/ApiReference/Methods";
import Method from "./components/ApiReference/Method";
import Objects from "./components/ApiReference/Objects";
import Object from "./components/ApiReference/Object";

import MyAdminIntroduction from "./pages/myAdmin/introduction";
import MyAdminReleaseNotes from "./pages/myAdmin/releaseNotes";

import MyAdminGettingStarted from "./pages/myAdmin/guides/gettingStarted";
import MyAdminConcepts from "./pages/myAdmin/guides/concepts";
import MyAdminUsingWithJavascript from "./pages/myAdmin/guides/codeBase/usingWithJavascript";
import MyAdminUsingWithDotnet from "./pages/myAdmin/guides/codeBase/usingWithDotnet";
import MyAdminJavascriptExamples from "./pages/myAdmin/codeSamples/javascriptExamples";
import MyAdminDotnetExamples from "./pages/myAdmin/codeSamples/dotnetExamples";

import HardwareIntroduction from "./pages/hardware/introduction";
import MessagingProtocol from "./pages/hardware/guides/messagingProtocol";
import MimeProtocol from "./pages/hardware/guides/mimeProtocol";
import HardwareDesignGuide from "./pages/hardware/guides/hardwareDesignGuide";
import Ble from "./pages/hardware/protocolReference/ble";
import Can from "../src/pages/hardware/protocolReference/can";
import Rs232Usb from "./pages/hardware/protocolReference/rs232Usb";
import HardwarePython from "./pages/hardware/codeSamples/python";

import DriveIntroduction from "./pages/drive/introduction";
import DriveAddIns from "./pages/drive/addIns/driveAddIns";

import { Toaster } from "@geotab/react-component-library";

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
                    <Route path="/myGeotab/guides/usingCustomTelematicsDevices" Component={UsingCustomTelematicsDevices} />
                    <Route path="/myGeotab/guides/mediaFiles" Component={MgMediaFiles} />
                    <Route path="/myGeotab/guides/powerBI" Component={PowerBI} />
                    <Route path="/myGeotab/guides/usingTheDataConnector" Component={UsingTheDataConnector} />

                    {/* MyGeotab > Guides > Code Base Routes */}
                    <Route path="/myGeotab/guides/codeBase/usingInJavascript" Component={UsingInJavascript} />
                    <Route path="/myGeotab/guides/codeBase/usingInDotnet" Component={UsingInDotnet} />
                    <Route path="/myGeotab/guides/codeBase/usingInJava" Component={UsingInJava} />

                    {/* MyGeotab > Add-Ins Routes */}
                    <Route path="/myGeotab/addIns/developingAddIns" Component={MyGeotabDevelopingAddIns} />
                    <Route path="/myGeotab/addIns/addInStorage" Component={MyGeotabAddInStorage} />
                    <Route path="/myGeotab/addIns/mapAddIns" Component={MapAddIns} />

                    {/* MyGeotab > API Reference Routes */}
                    <Route path="/myGeotab/apiReference/methods" Component={Methods} />
                    <Route path="/myGeotab/apiReference/methods/:methodId" element={<Method />} />
                    <Route path="/myGeotab/apiReference/objects" Component={Objects} />
                    <Route path="/myGeotab/apiReference/objects/:objectId" element={<Object />} />

                    {/* MyGeotab > ApiClients Route */}
                    <Route path="/myGeotab/apiClients" Component={ApiClients} />

                    {/* MyGeotab > Code Samples Routes */}
                    <Route path="/myGeotab/codeSamples/javascriptSamples" Component={MyGeotabJavascriptSamples} />
                    <Route path="/myGeotab/codeSamples/dotnetSamples" Component={MyGeotabDotnetSamples} />

                    {/* =================================================== */}
                    {/* MyAdmin Routes */}
                    <Route path="/myAdmin" Component={MyAdminIntroduction} />
                    <Route path="/myAdmin/introduction" Component={MyAdminIntroduction} />
                    <Route path="/myAdmin/releaseNotes" Component={MyAdminReleaseNotes} />

                    {/* MyAdmin > Guides Routes */}
                    <Route path="/myAdmin/guides/gettingStarted" Component={MyAdminGettingStarted} />
                    <Route path="/myAdmin/guides/concepts" Component={MyAdminConcepts} />

                    {/* MyAdmin > Guides > Code Base Routes */}
                    <Route path="/myAdmin/guides/codeBase/usingWithJavascript" Component={MyAdminUsingWithJavascript} />
                    <Route path="/myAdmin/guides/codeBase/usingWithDotnet" Component={MyAdminUsingWithDotnet} />

                    {/* MyAdmin > Code Samples Routes */}
                    <Route path="/myAdmin/codeSamples/javascriptExamples" Component={MyAdminJavascriptExamples} />
                    <Route path="/myAdmin/codeSamples/dotnetExamples" Component={MyAdminDotnetExamples} />

                    {/* =================================================== */}
                    {/* Hardware Routes */}
                    <Route path="/hardware" Component={HardwareIntroduction} />
                    <Route path="/hardware/introduction" Component={HardwareIntroduction} />

                    {/* Hardware > Guides Routes */}
                    <Route path="/hardware/guides/messagingProtocol" Component={MessagingProtocol} />
                    <Route path="/hardware/guides/designGuide" Component={HardwareDesignGuide} />
                    <Route path="/hardware/guides/MIMEProtocol" Component={MimeProtocol} />

                    {/* Hardware > Protocol Reference Routes */}
                    <Route path="/hardware/protocolReference/can" Component={Can} />
                    <Route path="/hardware/protocolReference/ble" Component={Ble} />
                    <Route path="/hardware/protocolReference/rs232-usb" Component={Rs232Usb} />

                    {/* Hardware > Code Samples Routes */}
                    <Route path="/hardware/codeSamples/python" Component={HardwarePython} />

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
