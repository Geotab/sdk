import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { CodeSample } from "../../../components/CodeSamplesContainer";
import myadminApiExample from "../../../assets/images/javascriptExamples/myadminApiExample.png";

const javascriptCodeExampleSnippet = `<html>
    <body>
        <h1>Device Plans</h1>
        <ul id="devicePlanList"></ul>
        <h1>Device Details</h1>
        <div>
            <div id="firmwareElement"></div>
            <div id="commentsElement"></div>
            <div id="lastCommElement"></div>
            <div id="possibleIssuesElement"></div>
        </div>
        <script type="text/javascript" src="myAdminApi.js"></script>
        <script type="text/javascript">
            var apiKey,
            sessionId,
            logonParams = {
                username: "user@geotab.com",
                password: "<password>",
            };
            myAdminApi().call("Authenticate", logonParams, function (user) {
                apiKey = user.userId;
                sessionId = user.sessionId;
                var deviceIdx,
                listHtml = "",
                devicePlanList = document.getElementById("devicePlanList"),
                devicePlanParams = {
                    apiKey: apiKey,
                    sessionId: sessionId,
                },
                lookupDeviceParams = {
                    apiKey: apiKey,
                    sessionId: sessionId,
                    serialNo: "G6XXX0XXXD08",
                };
                myAdminApi().call("GetDevicePlans", devicePlanParams, function (devicePlans) {
                    for (deviceIdx in devicePlans) {
                        listHtml += "<li>" + devicePlans[deviceIdx].name + "</li>";
                    }
                    devicePlanList.innerHTML = listHtml;
                    myAdminApi().call("LookupDevice", lookupDeviceParams, function (device) {
                        document.getElementById("firmwareElement").innerText = "Firmware: " + device.firmwareVersion;
                        document.getElementById("commentsElement").innerText = "Comments: " + device.comments;
                        document.getElementById("lastCommElement").innerText = "Last Communication: " + device.lastServerCommunication;
                        document.getElementById("possibleIssuesElement").innerText = "Possible Issues: " + device.possibleIssues;
                    });
                });
            }, function (errorMessage, error) {
                var errorIdx,
                alertMsg = "Error Message: " + errorMessage;
                if (error && error.errors) {
                    alertMsg += \\n\\nThe following errors occurred:\\n";
                    for (errorIdx in error.errors) {
                        alertMsg += error.errors[errorIdx].name + "\\n";
                    }
                }
                alert(alertMsg);
            });
        </script>
    </body>
</html>`;

const pageTitle: PageTitleProps = {
  title: "JavaScript Examples",
  breadCrumbItems: ["MYA", "Code Samples", "JavaScript Examples"],
};

export default function JavascriptExamples() {
  return (
    <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle}>
      <div className="paragraph">
        <p>
          The example below demonstrates a simple JavaScript application that
          authenticates with the MyAdmin API, then calls{" "}
          <code className="small-code-sample">GetDevicePlans</code> and{" "}
          <code className="small-code-sample">LookupDevice</code>.
        </p>
        <CodeSample language="javascript" code={javascriptCodeExampleSnippet} />
        <p>
          The <code className="small-code-sample">call</code> method uses the
          following parameters:
        </p>
        <ul>
          <li>Method name;</li>
          <li>Parameters;</li>
          <li>Success callback; and</li>
          <li>Error callback (optional).</li>
        </ul>
        <p>
          <strong>Note</strong>: The Success callback receives the object
          returned by the API as a parameter. The{" "}
          <a href="../../api/reference">{/*To do: fix link */}Reference</a> page
          provides details about the objects returned by each method. In the
          example above, the error callback is called if the login fails. The
          error callback receives two parameters: an error message and an
          “errors” object that contains an array of individual errors that
          occurred. In the example above, the <code className="small-code-sample">devicePlans</code> object — returned by
          <code className="small-code-sample">GetDevicePlans</code> — is an array of <code className="small-code-sample">ApiDevicePlans</code>. The device object,
          returned by <code className="small-code-sample">LookupDevice</code>, is an <code className="small-code-sample">ApiDeviceInstallResult</code>. For more
          information, see{" "}
          <a href="../../api/reference"> {/*To do: fix link */}Reference</a>.{" "}
        </p>
        <img src={myadminApiExample} alt="MyAdmin Api Example" className="javascriptExamples__myadminApiExampleIMG" />
      </div>
    </Page>
  );
}
