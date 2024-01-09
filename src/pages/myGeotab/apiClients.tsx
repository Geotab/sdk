import { ReactNode } from "react";
import { Page } from "../../components";
import { PageTitleProps } from "../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../components/TableOfContents/TableOfContents";
import CodeSample from "../../components/CodeSamplesContainer/CodeSample";

const dotnet: ReactNode = (
    <div className="paragraph">
        <h2>Quick start</h2>
        <p>
            Install the{" "}
            <a href="https://www.nuget.org/packages/Geotab.Checkmate.ObjectModel/" target="_blank" rel="noopener noreferrer">
                NuGet package
            </a>{" "}
            from the package manager console:
        </p>
        <code className="small-code-sample">{`Install-Package Geotab.Checkmate.ObjectModel`}</code>
        <p>
            Please remember to regularly check for Geotab.Checkmate.ObjectModel nuget package updates. Ideally, your integration should use the same Geotab.Checkmate.ObjectModel nuget package
            version as the one that your database is on.
        </p>
        <p>
            <strong>Using it in code</strong>
        </p>
        <CodeSample
            language="csharp"
            code={`var api = new API("user@example.com", "password", null, "database");
await api.AuthenticateAsync();
                
var devices = await api.CallAsync<List<Device>>("Get", typeof(Device), new { resultsLimit = 1 });`}
        />
    </div>
);

const java: ReactNode = (
    <div className="paragraph">
        <h2>Quick start</h2>
        <p>
            Add the{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://mvnrepository.com/artifact/com.geotab/java-sdk">
                maven dependency
            </a>
        </p>
        <p>
            <strong>Using it in code</strong>
        </p>
        <CodeSample
            language="java"
            code={`Credentials credentials = Credentials.builder()
    .database("database")
    .userName("user@example.com")
    .password("password")
    .build();
              
GeotabApi api = new GeotabApi(credentials);
              
LoginResult loginResult = api.authenticate();
              
AuthenticatedRequest<?> request = AuthenticatedRequest.authRequestBuilder()
    .method("Get")
    .params(SearchParameters.searchParamsBuilder()
        .credentials(loginResult.getCredentials()) 
        .typeName("Device")
        .build())
    .build();
              
Optional<List<Device>> result = api.call(request, DeviceListResponse.class);`}
        />
    </div>
);

const javascript: ReactNode = (
    <div className="paragraph">
        <h2>Quick start</h2>
        <p>Install the Bower package from the command line:</p>
        <code className="small-code-sample">{`$ bower install --save mg-api-js`}</code>
        <p>
            <strong>Using it in code</strong> {`(`}more on{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Geotab/mg-api-js">
                github - MyGeotab API wrapper for both clientside JavaScript and NodeJS
            </a>
            {`)`}
        </p>
        <CodeSample
            language="javascript"
            code={`var api = GeotabApi(function (authenticateCallback) {
    authenticateCallback('my.geotab.com', 'database', 'user@example.com', 'password', function(err) {
        console.error(err);
    });
});
            
api.call('Get', {
    typeName: 'Device',
    resultsLimit: 1
    }, function (result) {
        if (result) {
            console.log(result);
        }
    }, function (err) {
        console.error(err);
});`}
        />
    </div>
);

const nodejs: ReactNode = (
    <div className="paragraph">
        <h2>Quick start</h2>
        <p>
            Install the{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://www.npmjs.com/package/mg-api-node#getting-started">
                NPM package
            </a>{" "}
            from the command line:
        </p>
        <p>
            <strong>Using it in code</strong> {`(`}more on{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Geotab/mg-api-node">
                github - nodejs client for the MyGeotab API
            </a>
            {`)`}
        </p>
        <CodeSample
            language="javascript"
            code={`var api = new API('user@example.com', 'password', 'database');
api.authenticate(function(err, result) {
    if(err){
        console.log('Error', err);
        return;
    }
            
api.call('Get', {
    typeName: 'Device',
    resultsLimit: 1
    }, function(err, devices) {
        if(err){
            console.log('Error', err);
            return;
        }
        console.log('Devices', devices);
    });
});`}
        />
    </div>
);

const python: ReactNode = (
    <div className="paragraph">
        <h2>Quick start</h2>
        <p>Install the library and command line tool:</p>
        <code className="small-code-sample">{`$ pip install mygeotab`}</code>
        <p>
            <strong>Using it in code</strong> {`(`}more on{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Geotab/mygeotab-python">
                github - Python client for the MyGeotab SDK
            </a>
            {`)`}
        </p>
        <CodeSample
            language="python"
            code={`import mygeotab
api = mygeotab.API(username='user@example.com', password='password', database='database')
api.authenticate()

api.get('Device', resultsLimit=1)`}
        />
    </div>
);

const php: ReactNode = (
    <div className="paragraph">
        <h2>Quick start</h2>
        <p>Install the composer package from the command line:</p>
        <code className="small-code-sample">{`$ composer require geotab/mygeotab-php`}</code>
        <p>
            <strong>Using it in code</strong> {`(`}more on{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Geotab/mygeotab-php">
                github - PHP client for the MyGeotab SDK
            </a>
            {`)`}
        </p>
        <CodeSample
            language="php"
            code={`$api = new Geotab\API("user@example.com", "password", "database", "my.geotab.com");
$api->authenticate();
            
$api->get("Device", ["resultsLimit" => 1], function ($results) {
    var\_dump($results);
}, function ($error) {
    var\_dump($error);
});`}
        />
    </div>
);

const pageTitle: PageTitleProps = {
    title: "API Clients",
    breadCrumbItems: ["MYG", "API Clients"]
};

const pageSections: TableOfContentsItem[] = [
    {
        elementId: "dotnet",
        summary: ".NET",
        details: dotnet
    },
    {
        elementId: "java",
        summary: "Java",
        details: java
    },
    {
        elementId: "javascript",
        summary: "JavaScript",
        details: javascript
    },
    {
        elementId: "nodejs",
        summary: "Node.js",
        details: nodejs
    },
    {
        elementId: "python",
        summary: "Python",
        details: python
    },
    {
        elementId: "php",
        summary: "PHP",
        details: php
    }
];

export default function ApiClients () {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                <p>The MyGeotab API is language agnostic and can be accessed from languages that support HTTPS requests and JSON.</p>
                <p>
                    There are a number of language specific API clients that roll-up some common functionality such as authentication, session management, deserialization, etc. making it easier to
                    hit the ground running in your language of choice.
                </p>
            </div>
        </Page>
    );
}
