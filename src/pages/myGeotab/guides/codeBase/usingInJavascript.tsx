import { ReactNode } from "react";
import { Page } from "../../../../components";
import { PageTitleProps } from "../../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../../components/TableOfContents/TableOfContents";
import InformationalBox from "../../../../components/InformationalBox/InformationalBox";
import CodeSample from "../../../../components/CodeSamplesContainer/CodeSample";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

const geotabApiObject: ReactNode = (
    <div className="paragraph">
        <p>
            Geotab provides JavaScript developers with easy to use and consistent access to our API through the {" "}
            <a href="https://github.com/Geotab/mg-api-js" target="_blank" rel="noopener noreferrer">GeotabApi</a> object. The GeotabAPI provides authentication handling, asynchronous method calling, error handling and MultiCall support.
        </p>
        <InformationalBox>
            <p>
                Quick start in <HashLink to="/myGeotab/apiClients#javascript">API Clients</HashLink>
            </p>
        </InformationalBox>
    </div>
);

const creatingAGeotabApiObject: ReactNode = (
    <div className="paragraph">
        <p>
            When creating the GeotabApi object, prepend a reference to the file <i>api.js</i> before the main JavaScript code:
        </p>
        <CodeSample
            language="html"
            code={
                `<script type="text/javascript" src="api.js"></script>
<script type="text/javascript">
    // Custom code goes here
</script>`
            }
        />
        <p>
            In the main JavaScript code, initialize the GeotabApi object by providing the constructor with a callback function to handle the authentication:
        </p>
        <CodeSample
            language="javascript"
            code={
                `var api = GeotabApi(function (authenticationCallback) {
	// Handling getting credentials. Deals with these cases:
	//      a) No credentials yet (first page load)
	//      b) The credentials have expired (password changed or server moved)
	//      c) "api.forget()" has been called
	//
	// Show the dialog now & set up listener to callback with credentials
	//
	document.getElementById("submit").addEventListener("click", function () {
		var
		server = document.getElementById("server").value,
		userName = document.getElementById("username").value,
		password = document.getElementById("password").value,
		database = document.getElementById("database").value;

		authenticationCallback(server, database, userName, password,
			function (errorString) {
			alert(errorString);
		});
	}, false);
});`
            }
        />
        <p>
            When the GeotabApi object has been set up, the first call to a method triggers the callback to get the credentials. Once the credentials have been entered by the user, <code className="small-code-sample">authenticationCallback</code> is called with the provided credentials, and then the original method result is retrieved. After this method has been called, the server, database, username, and session are all stored in localStorage.
        </p>
    </div>
);

const usingTheGeotabApiObject: ReactNode = (
    <div className="paragraph">
        <p>
            The following example shows how to use the GeotabApi object to request the location of a vehicle:
        </p>
        <CodeSample
            language="javascript"
            code={
                `// Sample API invocation retrieves all "Device" objects
var deviceId = "b93B";
api.call("Get", {
	typeName : "DeviceStatusInfo",
	search : {
		deviceSearch : {
			id : deviceId
		}
	}
}, function (result) {
	if (result != null && result.length > 0) {
		alert(JSON.stringify(result[0]));
	}
}, function (errorString) {
	alert(errorString);
});`}
        />
    </div>
);

const theCallMethodArguments: ReactNode = (
    <div className="paragraph">
        <p>
            The Call method is used to "Call" any of the APIs that the MyGeotab SDK provides. It takes 4 arguments:
        </p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Argument</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>method</td>
                        <td>The API method that is being called. For example, “Get” or “GetCountOf”. See the API reference for the full set of methods.</td>
                    </tr>
                    <tr>
                        <td>params</td>
                        <td>The parameter object that the API method expects. For example: <code className="small-code-sample">{`{ typeName: "DeviceStatusInfo", search { deviceSearch: { id: deviceId } } }`}</code></td>
                    </tr>
                    <tr>
                        <td>callbackSuccess</td>
                        <td>The function that will be called back if the API call succeeds. The callback function has a single argument called “result” that contains any results returned by the API call.</td>
                    </tr>
                    <tr>
                        <td>callbackError</td>
                        <td>The function that will be called back if the API call fails. The callback function has a single argument that contains error information.</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
);

const multicall: ReactNode = (
    <div className="paragraph">
        <p>
            A MultiCall is a way to make several API calls against a server with a single HTTP request. This eliminates potentially expensive round trip costs. When making multiple calls, we recommend leveraging MultiCalls as much as possible. For more information about MultiCalls, see the <HashLink to="/myGeotab/guides/concepts#authentication">MultiCall</HashLink> documentation. Additionally, you can find a JavaScript MultiCall example <HashLink to="/myGeotab/guides/concepts#api-client-support">here</HashLink>.
        </p>
    </div>
);

const aNoteAboutState: ReactNode = (
    <div className="paragraph">
        <p>
            The GeotabApi object is designed to be stateless. The main reason for this is that a call could fail at any point due to session expiry or the database moving. The <code className="small-code-sample">authenticationCallback</code> will automatically be called when this situation is detected. The application will then prompt (or read from file etc.) for the required credentials. The call that was being attempted will resume when new credentials are received. This also means that there is no concept of being "logged in" or “logged out” of the server.
        </p>
    </div>
);

const nextSteps: ReactNode = (
    <div className="paragraph">
        <p>
            Once you have a basic understanding of how <i>api.js</i> and the JavaScript API work and want to learn more, you can take a look at our examples <Link to="/myGeotab/codeSamples/javascriptSamples">here</Link>.
        </p>
    </div>
);

const pageTitle: PageTitleProps = {
    "title": "Using In JavaScript",
    "breadCrumbItems": ["MYG", "Guides", "Code Base", "Using In JavaScript"]
};

const pageSections: TableOfContentsItem[] = [
    {
        "elementId": "geotabapi-object",
        "summary": "GeotabApi object",
        "details": geotabApiObject
    },
    {
        "elementId": "creating-a-geotabapi-object",
        "summary": "Creating a GeotabApi object",
        "details": creatingAGeotabApiObject
    },
    {
        "elementId": "using-the-geotabapi-object",
        "summary": "Using the GeotabApi object",
        "details": usingTheGeotabApiObject
    },
    {
        "elementId": "the-call-method-arguments",
        "summary": "The call method arguments",
        "details": theCallMethodArguments
    },
    {
        "elementId": "multicall",
        "summary": "MultiCall",
        "details": multicall
    },
    {
        "elementId": "a-note-about-state",
        "summary": "A note about state",
        "details": aNoteAboutState
    },
    {
        "elementId": "next-steps",
        "summary": "Next steps",
        "details": nextSteps
    }
];

export default function usingInJavascript() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections} />
    );
};