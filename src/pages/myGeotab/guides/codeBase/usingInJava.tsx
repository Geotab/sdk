import { ReactNode } from "react";
import { Page } from "../../../../components";
import { PageTitleProps } from "../../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../../components/TableOfContents/TableOfContents";
import InformationalBox from "../../../../components/InformationalBox/InformationalBox";
import CodeSample from "../../../../components/CodeSamplesContainer/CodeSample";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const mavenDependency: ReactNode = (
    <div className="paragraph">
        <p>
            The maven dependency available in{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://mvnrepository.com/artifact/com.geotab/java-sdk">
                maven repo
            </a>{" "}
            is an SDK library for accessing MyGeotab customer databases. It is a convenient "wrapper" around Geotab's HTTP/JSON API to allow developers focus on writing code instead of moving data
            over the wire. It includes tools to assist authenticating against Geotab's servers, automatically serializing/deserializing JSON, and providing definitions for Checkmate object classes.
        </p>
        <InformationalBox>
            <p>
                Quick start in <HashLink to="/myGeotab/apiClients#java">API Clients</HashLink>
            </p>
        </InformationalBox>
    </div>
);

const apiClass: ReactNode = (
    <div className="paragraph">
        <h2>Step 1: Initialize & authentication</h2>
        <p>An instance of API can be constructed to be used in the code. For the most basic use case, all the data that is needed is user credentials and a database name:</p>
        <CodeSample
            language="java"
            code={`Credentials credentials = Credentials.builder()
    .database("db")
    .userName("username@geotab.com")
    .password("TopS3cretPass")
    .build();
          
GeotabApi api = new GeotabApi(credentials);`}
        />
        <p>At this point there has not been any communication with Geotab's servers. In order to make calls to Geotab's API, an authentication call must be made:</p>
        <CodeSample language="java" code={`api.authenticate(); // optional; API will authenticate automatically on first \`call()\``} />
        <p>
            When the call is made to Geotab's servers to authenticate, a token is returned for security. Behind the scenes, the Authenticate call makes a JSON-RPC request to Geotab's "Authenticate"
            method. The resulting security token and server information are stored in order to make further calls to the API. If the <code className="small-code-sample">{`authenticate()`}</code>{" "}
            call is not made explicit, then it will be made implicit, behind the scene, before the first api <code className="small-code-sample">{`call()`}</code>.
        </p>
        <InformationalBox>
            <p>
                For more information regarding authentication, please review the <HashLink to="/myGeotab/guides/concepts/#authentication">Authentication</HashLink> documentation.
            </p>
        </InformationalBox>
        <h2>Step 2: Making calls</h2>
        <p>
            When authenticated, calls are made to the API by invoking the <code className="small-code-sample">{`call()`}</code> method of the API class.
        </p>
        <p>The example below illustrates how to make a generic call to get all devices in the system.</p>
        <CodeSample
            language="java"
            code={`try (GeotabApi api = new GeotabApi(credentials)) {
        LoginResult loginResult = api.authenticate(); // optional; API will authenticate automatically on first call()
              
        AuthenticatedRequest<?> request = AuthenticatedRequest.authRequestBuilder()
            .method("Get")
            .params(SearchParameters.searchParamsBuilder()
                .credentials(loginResult.getCredentials()) // optional; API will set this automatically if not provided, based on the authenticate() result
                .typeName("Device")
                .build())
            .build();
              
        Optional<List<Device>> result = api.call(request, DeviceListResponse.class);
    }`}
        />
        <p>
            In the example below it is shown how to delete a device using the generic "Remove" method. Notice that it is not required to send all of the device's information to remove it, the
            device's id is sufficient:
        </p>
        <CodeSample
            language="java"
            code={`Device device = Device.builder()
        .id("G9XXXXXXXXXX")
        .build();
        
    try (GeotabApi api = new GeotabApi(credentials)) {
        AuthenticatedRequest<?> removeRequest = AuthenticatedRequest.authRequestBuilder()
            .method("Remove")
            .params(EntityParameters.entityParamsBuilder()
                .typeName("Device")
                .entity(device)
                .build())
            .build();
            
        api.call(removeRequest, VoidResponse.class);
    }`}
        />
        <p>
            The <code className="small-code-sample">{`call()`}</code> parameters are:
        </p>
        <ul>
            <li>
                <code className="small-code-sample">{`request`}</code> represents the request details, and it's an instance of <code className="small-code-sample">{`AuthenticatedRequest`}</code>
            </li>
            <li>
                <code className="small-code-sample">{`response`}</code> represents the response and it's an instance of <code className="small-code-sample">{`BaseResponse`}</code>;
                <code className="small-code-sample">{`BaseResponse`}</code> holds the actual result type to be deserialized and returned by the <code className="small-code-sample">{`call()`}</code>{" "}
                method
            </li>
        </ul>
        <p>
            The API class automatically handles databases that are moved to different servers in the federation and expired tokens {`(`}token are typically valid for 2 weeks{`)`} by automatically
            re-authenticating and continuing.
        </p>
        <h2>Example code</h2>
        <p>The following is a simple console app that will search Device by serial number:</p>
        <CodeSample
            language="java"
            code={`public static void main(String[] args) throws Exception {
        try {
            if (args.length != 5) {
                System.out.println("Command line parameters:");
                System.out.println("server             - The server name (Example: my.geotab.com)");
                System.out.println("database           - The database name (Example: G560)");
                System.out.println("username           - The Geotab user name");
                System.out.println("password           - The Geotab password");
                System.out.println("serialNumber       - Serial number of the device.");
                System.exit(1);
            }
                  
            // Process command line arguments
            String server = args[0];
            String database = args[1];
            String username = args[2];
            String password = args[3];
            String serialNumber = args[4];
                  
            Credentials credentials = Credentials.builder()
                .database(database)
                .password(password)
                .userName(username)
                .build();
              
            try {
                AuthenticatedRequest<?> request = AuthenticatedRequest.authRequestBuilder()
                    .method("Get")
                    .params(SearchParameters.searchParamsBuilder()
                        .credentials(loginResult.getCredentials())
                        .typeName("Device")
                        .search(
                            DeviceSearch.builder()
                                .serialNumber(serialNumber)
                                .build()
                            )
                        .build())
                    .build();
              
                Optional<List<Device>> deviceListResponse = api.call(request, DeviceListResponse.class);
                    if (!deviceListResponse.isPresent() || deviceListResponse.get().isEmpty()) {
                        log.error("Device not found");
                        System.exit(1);
                    }
              
                Device device = deviceListResponse.get().get(0);
                log.info("Found {}", device);
            } catch (Exception exception) {
                log.error("Failed to get device: ", exception);
                System.exit(1);
            }
              
        } catch (Exception exception) {
            log.error("Unhandled exception: ", exception);
        } finally {
            log.info("Press Enter to exit...");
            System.in.read();
        }
    }`}
        />
    </div>
);

const nextSteps: ReactNode = (
    <div className="paragraph">
        Once you have a basic understanding of how the Java SDK works works, we recommend reviewing the examples that we have created{" "}
        <a href="https://github.com/Geotab/sdk-java-samples" target="_blank" rel="noopener noreferrer">
            here
        </a>
        .
    </div>
);

const pageTitle: PageTitleProps = {
    title: "Using In Java",
    breadCrumbItems: ["MYG", "Guides", "Code Base", "Using In Java"]
};

const pageSections: TableOfContentsItem[] = [
    {
        elementId: "maven-dependency",
        summary: "Maven dependency",
        details: mavenDependency
    },
    {
        elementId: "api-class",
        summary: "API class",
        details: apiClass
    },
    {
        elementId: "next-steps",
        summary: "Next steps",
        details: nextSteps
    }
];

export default function usingInJava() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                The Java SDK tools provide an easy way to integrate MyGeotab into Java software. All of the communication to Geotab's services is accomplished over HTTPS with data serialized in{" "}
                <a target="_blank" rel="noopener noreferrer" href="http://en.wikipedia.org/wiki/JSON">
                    JSON
                </a>{" "}
                format. The Java library provided will automatically handle the JSON serialization and deserialization into MyGeotab objects.
            </div>
        </Page>
    );
}
