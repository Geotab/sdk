import { ReactNode } from "react";
import Accordion from "../../../components/Accordion/Accordion";
import InformationalBox from "../../../components/InformationalBox/InformationalBox";
import CodeSample from "../../../components/CodeSamplesContainer/CodeSample";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";

const security: ReactNode = (
    <div className="paragraph">
        <p>
            MyGeotab API requests can only be made over secure connections (HTTPS). The minimum SSL/TLS version supported by the MyGeotab API is TLS v1.2.
        </p>
        <p>
            Geotab recommends that all users of Geotab APIs adhere to modern cryptography best practices. When using our libraries, we recommend that developers use algorithms and ciphers that provide the most forward secrecy and the greatest adherence to modern compliance requirements.
        </p>
        <p>
            At the time of writing this document, best practices implies that we use AES-256 (or stronger) cipher suites and algorithms with a modern cipher mode, such as GCM or CCM. We recommend utilizing modern key exchange algorithms such as DHE or ECDHE. RSA3072 or the equivalent elliptic cryptographic algorithm should be use for asymmetric cryptography. We recommend SHA3 for all hashing operations. When using modern network communications software, the latest version of TLS (TLS1.3 at the time of writing) should be used.
        </p>
    </div>
);


//ToDo Update Reference Page Link
//ToDo Update Object Page Link
const makeYourFirstAPICall: ReactNode = (
    <div className="paragraph">
        <p>
            While both GET and POST requests are supported, we strongly recommend that only POST requests are used for requests that include MyGeotab credentials as parameters.
        </p>
        <p>
            The endpoint shown below is used to invoke an API method when an HTTP POST request is used. The example that follows illustrates a POST request that returns all devices (vehicles) and their properties.
        </p>
        <p><code className="small-code-sample">{`https://[myserver]/apiv1`}</code></p>
        <p>
            The method's name and parameters are passed in the HTTP body using the <a href="https://en.wikipedia.org/wiki/JSON-RPC" target="_blank" rel="noopener noreferrer">JSON-RPC</a> format. Geotab API version 1 supports JSON-RPC version 2.0. The full set of API methods and objects returned can be viewed in the <a href="../../api/reference">API reference</a>.
        </p>
        <p>To understand which parameters must be passed, consider the following JSON object:</p>
        <CodeSample
            language="javascript"
            code={
            `{
            "typeName":"Device",
                "credentials": {
                    "database":"acme",
                    "userName":"bob@acme.com",
                    "sessionId":"1234"
                }
};`}/>
        <p>To understand how HTTP POST can be used to invoke a method, consider the following JavaScript example. This can be achieved from any language that supports HTTP, such as the java.net.HttpUrlConnection class in Java, or System.Net.Http.HttpClient in .Net.</p>
        <CodeSample
            language="javascript"
            code={`var request = new XMLHttpRequest();

request.open("POST", "https://my.geotab.com/apiv1", true);
    
request.setRequestHeader("Content-Type", "application/json");

request.onreadystatechange = function() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            var json = JSON.parse(request.responseText);
            if (json.result) {
                // Work with your result
                // Simple example just alerts its presence
                console.log(json.result);
            }
        }
    }
};

// Send the HTTP BODY in the JSON-RPC format.
// The method being called is "Get".
// The "Get" method's parameters are then passed in the "params" property

var data = {
    "id": 0,
    "method": "Get",
    "params": {
        "typeName": "Device",
        "credentials": {
            "database": "demo",
            "userName": "example@geotab.com",
            "sessionId": "xxx"
        }
    }
};

request.send(JSON.stringify(data));`
        }/>
    </div>
);

const resultsAndErrors: ReactNode = (
    <div className="paragraph">
        <p>
            Using the example above, a successful request to the server results in an object with the property “result” in the following format:
        </p>
        <p>
            Generic:
        </p>
        <CodeSample 
            language="javascript"
            code={`{
    "result":"results",
    "jsonrpc":"2.0"
}`
}></CodeSample>
        <p>
            Specific:
        </p>
        <CodeSample 
            language="javascript"
            code={`{
    "result":"5.7.1801.122",
    "jsonrpc":"2.0"
}`
}/>
        <p>
            However, if the request is incorrect, or an error is triggered on the server, the error is returned as an object with the property “error”. For example:
        </p>
        <CodeSample 
            language="javascript"
            code={`{
    "error":{
        "code":-32000,
        "data":{
            "id":"5531c760-4ff7-485c-bb47-b6ed509b76d6",
            "type":"InvalidUserException",
            "requestIndex":0
        },
        "message":"Incorrect login credentials"
    },
    "jsonrpc":"2.0"
}`
}/>
        {/* ToDo: Update URLs later. */}
        <p>
            The properties of the error object are <a href="../../myGeotab/apiReference/objects">JsonRpcError</a>, and <a href="../../myGeotab/apiReference/objects">JsonRpcErrorData</a>. Objects are documented in the API Reference.
        </p>
    </div>
);

const authentication: React.ReactNode = (
    <div className="paragraph">
        <p>
            Authentication is performed to obtain a session token (credentials). This token then confirms your identity for subsequent API operations. If the session expires, a new Authentication request must be made to get a new token. This approach encourages efficient use of Authentication requests, as shown in the Authentication example below.
        </p>
        <p>
            Below you can see an example making an authentication request to “my.geotab.com” that completes successfully, and then uses session to get a single device:
        </p>
        <CodeSample 
            language="javascript"
            code={`
// Simple method to make calls to API
async function call(host, method, data) {
return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const rpcData = JSON.stringify({
    "method": method,
    "params": data
});

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            let jsonRpcResponse = JSON.parse(this.responseText);
            if (jsonRpcResponse.error) {
            reject(new Error(\`\${jsonRpcResponse.error.data.type}: \${jsonRpcResponse.error.message}\`));
            } else {
            resolve(jsonRpcResponse.result);
            }
        }
    });

    xhr.open("POST", \`https://\${host}/apiv1\`);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(rpcData);
});
}

(async () => {
const authenticateHost = "my.geotab.com";

// Authenticate to get a token
let loginResult = await call(
    authenticateHost,
    "Authenticate", {
        "userName": "[user@email.com]",
        "password": "[password]",
        "database": "[database]"
    }
);
console.log(loginResult);

// Use the correct host when making subsequent calls (for legacy compatibility)
let callHost = loginResult.path === "ThisServer" ? authenticateHost : loginResult.path;

// Call to get one device
let devices = await call(
    callHost,
    "Get", {
        "typeName": "Device",
        "resultsLimit": 1,
        "credentials": loginResult.credentials
    }
);
console.log(devices);
})();`
}/>
        <InformationalBox>
            <p>Database, user and password must be set for successful authentiation.</p>
        </InformationalBox>
    </div>
);

const example1: ReactNode = (
    <div className="paragraph">
        <p>
            In this example, an authentication request is made to my.geotab.com to log in to the database named <i>database</i>.
        </p>
        <ol>
            <li>
                The <code className="small-code-sample">{`Authenticate`}</code> method is requested using the credentials provided.
            </li>
            <li>
                The response from the server contains two important properties — <code className="small-code-sample">{`path`}</code> and <code className="small-code-sample">{`credentials`}</code>.
            </li>
        </ol>
        <p>
            The path will either contain the URL of a server, or the string value <code className="small-code-sample">{`ThisServer`}</code>. Since the <i>database</i> is on my.geotab.com, it returns <i>{`ThisServer`}</i>. This means that the path is correct.
        </p>
        <p>
            The <code className="small-code-sample">{`credentials`}</code> object contains the username, database and session ID. This object is required for all subsequent requests to the server.
        </p>
        <ol>
            <li>
                Since the authentication method confirmed the path is correct, other methods can be used as well. For example, you can mak a request to <code className="small-code-sample">{`Get`}</code> devices from my.geotab.com. Pass the <code className="small-code-sample">{`credentials`}</code> object with the call to <code className="small-code-sample">{`Get`}</code> Device.
            </li>
            <li>
                The <code className="small-code-sample">{`Get`}</code> result is returned with one device.
            </li>
        </ol>
    </div>
);

const example2: ReactNode = (
    <div className="paragraph">
        <p>
            The examples above demonstrate how to authenticate to get a token and make a call to Get devices. However, there are two additional scenarios to consider:
        </p>
        <ol>
            <li>
                The credentials provided to <code className="small-code-sample">{`Authenticate`}</code> method are invalid.
            </li>
            <li>
                The token has eventually expired.
            </li>
        </ol>
        <p>
            In these scenarios, the API request will fail returning the JSON-RPC error similar to below:
        </p>
        <CodeSample
            language="javascript"
            code={`{
    "error":{
        "code":-32000,
        "data":{
            "id":"5531c760-4ff7-485c-bb47-b6ed509b76d6",
            "type":"InvalidUserException",
            "requestIndex":0
        },
        "message":"Incorrect login credentials"
    },
    "jsonrpc":"2.0"
}`
}/>
        <p>
            If the error contains an object with type <code className="small-code-sample">{`InvalidUserException`}</code>, the authentication failed or the authentication process must be repeated to obtain a fresh token.
        </p>
    </div>
);

const httpCompression: ReactNode = (
    <div className="paragraph">
        <p>
            The MyGeotab API supports brotli, gzip and deflate compression. To use either of these compression methods, include the HTTP header for “Accept-Encoding”. For example:
        </p>
        <p>
            Accept-Encoding: brotli, gzip, deflate
        </p>
        <InformationalBox>If you are using an API client (.Net, JavaScript, Nodejs, etc.), the header is enabled automatically.</InformationalBox>
    </div>
);

const limits: ReactNode = (
    <div className="paragraph">
        <p>
            At Geotab, we work hard to create an open and flexible API that encourages creativity and innovation. We do this by providing tools to create powerful applications, integrations, and Add-ins, while maintaining overall system health and quality. Result and rate limits are intended to encourage API developers to use appropriate APIs for their use cases, and to safeguard against unbounded requests.
        </p>
    </div>
);

const rateLimits: ReactNode = (
    <div className="paragraph">
        <h2>
            Authenticate
        </h2>
        <p>
            No more than <b>10 requests-per-minute</b> are permitted for a user. Both successful and unsuccessful Authentication requests count towards the limit.
        </p>
        <p>
            Credentials with a password instead of, or combined with a session ID, must be authenticated. This ensures that each request where credentials are provided, are counted towards the user’s authentication limits.
        </p>
        <h2>
            GetFeed
        </h2>
        <p>
            The GetFeed request has two common use cases:
        </p>
        <ol>
            <li>
                Receiving a constant feed of near real-time data reported by devices (GPS), or calculated by MyGeotab (Trips History).
            </li>
            <li>
                Generating large aggregate reports during an off-peak interval.
            </li>
        </ol>
        <p>
            For constant polling, we recommend polling for data at 30-second intervals. However, we understand that 30 seconds may be too infrequent for the rate of data generated by some vehicles, so we created rate limits. A rate limit of <b>1 request-per-second</b> is applied to <code className="small-code-sample">{`GetFeed`}</code> requests for each supported entity type.
        </p>
        <h2>
            CreateDatabase
        </h2>
        <p>
            Typically used by Integrators, CreateDatabase provides a way to dynamically provision customer databases. Limits of 15 requests per minute, 100 requests per hour, and 800 requests per day are applied.
        </p>
        <h2>
            OverLimitException
        </h2>
        <p>
            When a rate limit is exceeded, an OverLimitException error is returned. A header (<code className="small-code-sample">{`Retry-After`}</code>) is also set with time remaining for the limit to reset.
        </p>
        <h3>
            Header Example
        </h3>
        <code className="small-code-sample">{`Retry-After: 58`}</code>
        <h3>
            Example
        </h3>
        <CodeSample
        language="javascript"
        code={`{
    "error": {
        "message": "API calls quota exceeded. Maximum admitted 10 per 1m.",
        "code": -32000,
        "data": {
            "id": "b83dc64f-3976-4b35-8e32-c55b3a4adc2f",
            "type": "OverLimitException"
        }
    },
    "jsonrpc": "2.0"
}`
}/>
        <h2>
            Headers
        </h2>
        <p>
            If a rate limit is applied to an API, with a successful JSON-RPC response, headers are set with rate limit information:
        </p>
        <ul>
            <li>
                <code className="small-code-sample">{`X-Rate-Limit-Limit`}</code>: the rate limit period (eg. 1s, 1m, 12h, 1d)
            </li>
            <li>
                <code className="small-code-sample">{`X-Rate-Limit-Remaining`}</code>: number of request remaining
            </li>
            <li>
                <code className="small-code-sample">{`X-Rate-Limit-Reset`}</code>: UTC date time (ISO 8601) when the limit resets
            </li>
        </ul>
        <h3>
            Example
        </h3>
        <CodeSample
        language="javascript"
        code={`
X-Rate-Limit-Limit: 1m
X-Rate-Limit-Remaining: 8
X-Rate-Limit-Reset: 2019-04-26T16:13:11.9440478Z`
}/>
    </div>
);

const resultLimits: ReactNode = (
    <div className="paragraph">
        <h2>
            GetFeed
        </h2>
        <p>
            <code className="small-code-sample">{`GetFeed`}</code> is limited to 50,000 records returned in a single request.
        </p>
        <InformationalBox>For legacy compatibility, <code className="small-code-sample">{`GetFeed`}</code> does not generate an exception when the limit provided is over 50,000. Rather, it implicitly limits results to 50,000 records.</InformationalBox>
        <h2>
            Get
        </h2>
        <p>
            The entities listed below have <code className="small-code-sample">{`Get`}</code> limits of 50,000 results:
        </p>
        <ul>
            <li>
                AnnotationLog
            </li>
            <li>
                DVIRLog
            </li>
            <li>
                TrailerAttachment
            </li>
            <li>
                IoxAddOn
            </li>
            <li>
                CustomData
            </li>
            <li>
                BinaryData
            </li>
        </ul>
        <p>
            Other entities will have <code className="small-code-sample">{`Get`}</code> limits of 50,000 results in the future, along with a new parameter for pagination when the number of results exceed such limits. For easier transition to the future format, it's recommended that you pass in a 50,000 resultsLimit in the <code className="small-code-sample">{`Get`}</code> call, along with your own way to paginate (e.g. using timestamp).
        </p>
        <h2>
            OverLimitException
        </h2>
        <p>
            To ensure your application doesn't think it has every result that matches the search criteria, when in reality there are more, an error result (<code className="small-code-sample">{`OverLimitException`}</code>) may be returned in these scenarios:
        </p>
        <ul>
            <li>
                If an API call is made with no results limit, one will be implicitly applied to the request on the server side.
            </li>
            <li>
                If the results are of the limit, an error result will be returned.
            </li>
            <li>
                If a request is made with a result limit higher than the imposed limit.
            </li>
            <li>
                A multicall child request limit is exceeded.
            </li>
            <li>
                No error will be returned if the provided rate limit matches the imposed limit, and the results match that limit.
            </li>
        </ul>
        <p>
            Example
        </p>
        <CodeSample
        language="javascript"
        code={`{
    "error": {
        "message": "Supplied results limit (50001) exceeds maximum limit (50000).",
        "code": -32000,
        "data": {
        "id": "16526e19-06b9-4a4a-b2a3-c1dbc0144cd8",
        "type": "OverLimitException"
        }
    },
    "jsonrpc": "2.0"
}`
}/>
    </div>
);

const workingWithDates: ReactNode = (
    <div className="paragraph">
        <p>
            When exchanging dates as parameters to API methods, you must ensure that they are formatted properly as an <a href="https://en.wikipedia.org/wiki/ISO_8601" target="_blank" rel="noopener noreferrer">ISO 8601</a> string (format <code className="small-code-sample">{`yyyy-MM-ddTHH:mm:ss.fffZ`}</code>). In addition, all dates will have to first be converted to <a href="https://en.wikipedia.org/wiki/Coordinated_Universal_Time" target="_blank" rel="noopener noreferrer">{`UTC`}</a> in order to ensure time zone information and daylight savings times are accounted for correctly.
        </p>
    </div>
);

const unitOfMeasure: ReactNode = (
    <div className="paragraph">
        <p>
            As a general rule, MyGeotab uses the metric system for values such as speed (km/h) and distance (m). For example, if you queried the odometer reading for a vehicle, the value would be returned in meters or if you retrieved the current speed of a vehicle it would be in km/h. It does not matter in which region in the world the vehicle or user of MyGeotab system is located — we always return the values in metric.A simple conversion can be applied to these values should you wish to work in imperial units or other customized units instead.
        </p>
        <p>
            Please note that MyGeotab also records various other status data (e.g. engine data) from the vehicle and these values can be in various units of measure. The units of measure are not provided by Geotab in all cases. Refer to the applicable <a href="https://www.sae.org/standards/" target="_blank" rel="noopener noreferrer">SAE</a> standard of the specific code for the associated unit of measure.
        </p>
    </div>
);

const entities: ReactNode = (
    <div className="paragraph">
        <p>
            All objects in the MyGeotab system are called entities. Entities have an ID property that is used to uniquely identify that object in the database. The ID is an opaque string value that uniquely identifies the entity and no assumption about the format or length of this ID value should be made when comparing or storing the values.  
        </p>
    </div>
);

const id: ReactNode = (
    <div className="paragraph">
        <p>
            An ID is used to uniquely reference entities in the API. IDs are represented by opaque strings. Generally the contents of the IDs are not significant for the user. Building logic around the value of the string should be avoided — unless it is a system ID (see the examples below).
        </p>
    </div>
);

const example3: ReactNode = (
    <div className="paragraph">
        <p>
            In this example, a vehicle in the system and its ID value will be examined. Here is a partial JSON representation of a device object:
        </p>
        <CodeSample
        language="javascript"
        code={`{
    "id": "b0a46",
    "name": "007 - Aston Martin",
    "serialNumber": "GTA9000003EA",
    "deviceType": "GO6",
    "vehicleIdentificationNumber": "1002"
}`
}/>
        <p>
            Note the “id” property with value “b0a46”. This is the unique identifier for the device (vehicle) with description “007 - Aston Martin”.
        </p>
        <p>
            To find Trips for this vehicle all of the properties of the device do not have to be passed to the Get method. Instead, only the ID property of the device object is required. Below is an example of a valid parameter object (TripSearch) for passing into Get method. The deviceSearch with the ID property set to the value “b0a46” (as indicated in the example above) is passed.
        </p>
        <CodeSample
        language="javascript"
        code={`{
    "typeName":"Trip",
    "search" : {
        "deviceSearch" : {
        "id" : "b0a46"
        }
    }
}`
}/>
        <p>
            Calling the Get method with the parameter defined above will return all trips for the vehicle “007 - Aston Martin”.
        </p>
    </div>
);

const example4: ReactNode = (
    <div className="paragraph">
        <p>
            There are certain IDs that are predefined for system entities. For example the group that has been defined as the root group of all user groups, and called the CompanyGroup, will have an ID of “CompanyGroupId” rather than other characters (such as “b0a46” above). For example:
        </p>
        <CodeSample
        language="javascript"
        code={`{
    "id": "CompanyGroupId",
    "name": "The Company Group",
    "children": [..]
}`
}/>
        <p>
            If the system entities do not have any properties then they are specified as strings with their ID’s name. For example the source “Obd” will be identified as “SourceObdId”.
        </p>
        <CodeSample
        language="javascript"
        code={`{
    "code": "738960445",
    "engineType": {
        "id": "b2715",
    },
    "source": "SourceObdId"
}`
}/>
    </div>
);

//ToDo Update .Net and JS example links
const buildingBlockApproach: ReactNode = (
    <div className="paragraph">
        <p>
            The results of a call to our API will only contain literal values and the identities of contained objects — not the actual fully populated child objects. This provides a predictable system that efficiently serializes objects to JSON and back. Additional lookups of the nested objects will be required to retrieve additional properties of the objects.
        </p>
        <p>
            For example, an engine status data record has a device property. If 1000 engine status data records are retrieved for a device, the status data's device property will only contain the ID of the device. An additional retrieval for the devices object will be required to obtain the status data records. This approach has several benefits:
        </p>
        <ul>
            <li>
                Saves bytes over the wire
            </li>
            <li>
                Reduces request time
            </li>
            <li>
                Avoids redundant copies of entities
            </li>
            <li>
                More flexible since the child objects may not always be required
            </li>
        </ul>
        <p>
            In the example below it can be seen how, by creating a dictionary of devices where the key is the device ID and the value is the device object, devices can be easily “stitched” into the status data records:
        </p>
        <CodeSample
        language="javascript"
        code={`var statusDatas = [{
        "id": "a1",
        "device": {
            "id": "b1"
        },
        "data": 0.002,
    ...
    },{
        "id": "a2",
        "device": {
            "id": "b1"
        },
        "data": 1.05,
    ...
    }
];

var deviceLookup = {
    "b1": {
        "id": "b1",
        "name": "Device 1",
        ...
    }
};`
}/>
        <p>
            statusDatas[i].device = deviceLookup[statusDatas[i].device.id];
        </p>
        <p>
            Depending on the process, for some entities like diagnostics, it may be desirable to maintain a local cache from which the status/fault data can be populated. In this case it will be necessary to refresh the cache when the cache is missing the required entity making an API call. This will allow the API to get the required entity and add it to the local cache. An example of maintaining a diagnostic cache would occur when consuming a feed of data from the API. An example of this process is included in both the <a href="https://github.com/Geotab/sdk-dotnet-samples/tree/master/DataFeed" target="_blank" rel="noopener noreferrer">.Net</a> and <a href="https://geotab.github.io/sdk/software/js-samples/dataFeed.html" target="_blank" rel="noopener noreferrer">JavaScript DataFeed</a> examples.
        </p>
    </div>
);

//ToDo Update Methods links
const propertySelector: ReactNode = (
    <div className="paragraph">
        <p>
            <code className="small-code-sample">{`PropertySelector`}</code> is a new optional parameter that can be used with the <a href="">{`Get`}</a> and <a href="">{`GetFeed`}</a> methods to selectively include or exclude specific properties for entity type requested. This provides a mechanism to reduce the amount of data sent over the wire and can significantly reduce call times.
        </p>
    </div>
);

//ToDo Update Reference Page Link
//ToDo Update object links
const supportedTypes: ReactNode = <div className="paragraph" >
    <p>
        A limited set of objects have support for use with property selector in the beta version. These objects tend to have many properties and would provide the most benefit to reducing size over the wire.
    </p>
    <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Fields</td>
                    <td>An array of string, consisting of the properties for a given <a href="">Entity</a> type for which we want to include/exclude in the entities of the result set. Refer to the <a href="../../api/reference">reference</a> page for all the properties supported for a given <code className="small-code-sample">{`Entity`}</code>. Note that the properties of an inheriting class will also be supported. (For example, <a href="">Go9</a> is child of <a href="">Device</a>, so the properties defined for <code className="small-code-sample">{`Go9`}</code> can be supplied to <code className="small-code-sample">{`Fields`}</code>.)</td>
                </tr>
                <tr>
                    <td>IsIncluded</td>
                    <td>A boolean, which if <code className="small-code-sample">{`true`}</code>, will include the properties of a given <a href="">Entity</a> type defined in <code className="small-code-sample">{`Fields`}</code> for the entities of the result set. Otherwise, if this boolean is false, the properties defined in <code className="small-code-sample">{`Fields`}</code> will be excluded.</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>;

const supportedTypeExample: ReactNode = <div className="paragraph">
    <p>
        A simple <a href="https://geotab.github.io/sdk/software/api/runner.html#sample:get-lightweight-device-response" target="_blank" rel="noopener noreferrer">example</a> of this can be illustrated by using the property selector with <code className="small-code-sample">{`Device`}</code>. The <code className="small-code-sample">{`Device`}</code> object can have many properties which may not be useful to all use-cases. For example, if I have an add-in to display a list of 500 devices by name. We only want our <code className="small-code-sample">{`Device`}</code> objects to have the properties <code className="small-code-sample">{`Name`}</code> and <code className="small-code-sample">{`Id`}</code>, so we set our <code className="small-code-sample">{`PropertySelctor`}</code> object like so:
    </p>
    <h2>
        Javascript
    </h2>
    <h3>
        Request
    </h3>
    <CodeSample
    language="javascript"
    code={`api.call("Get", {
    "typeName": "Device",
    "propertySelector":
    {
        fields: ["id", "name"],
        isIncluded: true
    },
        "resultsLimit": 500
    }, function(result) {
        console.log("Done: ", result);
    }, function(e) {
        console.error("Failed:", e);
    });`

}/>
        <h3>
            Response
        </h3>
        <CodeSample
        language="javascript"
        code={`[
    {
        "name": "Work Truck 10",
        "id": "b1"
    },
    {
        "name": "Delivery Van 6",
        "id": "b2"
    }
]`
}/>
    <p>
        In our example, making this call using the property selector results in the total JSON size over the wire of 5.4 kB and time of 45 ms.
    </p>
    <p>
        Making the same call, without property selector (returning all properties) results in 41.8 kB of JSON sent over the wire and a round trip time of 320 ms.
    </p>
    <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th>using property selector</th>
                    <th>device count</th>
                    <th>size</th>
                    <th>time</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>false</td>
                    <td>500</td>
                    <td>41.8 kB</td>
                    <td>320 ms</td>
                </tr>
                <tr>
                    <td>true</td>
                    <td>500</td>
                    <td>5.4 kB</td>
                    <td>45 ms</td>
                </tr>
                <tr>
                    <td>Improvement</td>
                    <td></td>
                    <td>-36.4 kB</td>
                    <td>-275 ms</td>
                </tr>
            </tbody>
        </table>
    </div>
    <h2>
        C# Example
    </h2>
    <CodeSample
    language="javascript"
    code={`var results = await api.CallAsync<List<Device>>(
    "Get",
    typeof(Device),
    new
    {
        propertySelector = new PropertySelector
        {
            Fields = new List<string>
            {
            nameof(Device.Name),
            nameof(Device.Id)
            },
            IsIncluded = true
        },
        resultsLimit = 500
    });`
}/>
</div>;

//ToDo Update Object page links
const supportEntitiesList: ReactNode = <div className="paragraph">
    <p>
        Below is a list of entities that support the PropertySelector functionality. 
    </p>
    <div className="table-content">
        <table>
            <thead>
                <tr>    
                    <th>Entity</th>
                    <th>Supported in Release</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><a href="">Device</a></td>
                    <td>8.0</td>
                    <td>The following properties are not supported: <code className="small-code-sample">deviceFlags</code>, <code className="small-code-sample">isAuxInverted</code>, <code className="small-code-sample">deviceType</code>, <code className="small-code-sample">productId</code>, <code className="small-code-sample">autogroups</code>, <code className="small-code-sample">auxWarningSpeed</code>, <code className="small-code-sample">enableAuxWarning</code></td>
                </tr>
                <tr>
                    <td><a href="">User</a></td>
                    <td>8.0</td>
                    <td><code className="small-code-sample">isEULAAccepted</code> and <code className="small-code-sample">acceptedEULA</code> are tied to each other, so if either property is set to be returned based on the <code className="small-code-sample">PropertySelector</code> logic, both properties will be returned.</td>
                </tr>
                <tr>
                    <td><a href="">Group</a></td>
                    <td>8.0</td>
                    <td>N/A</td>
                </tr>
                <tr>
                    <td><a href="">Rule</a></td>
                    <td>8.0</td>
                    <td>N/A</td>
                </tr>
                <tr>
                    <td><a href="">LogRecord</a></td>
                    <td>8.0</td>
                    <td><code className="small-code-sample">dateTime</code> must be included.</td>
                </tr>
                <tr>
                    <td><a href="">Trip</a></td>
                    <td>9.0</td>
                    <td>N/A</td>
                </tr>
                <tr>
                    <td><a href="">TextMessage</a></td>
                    <td>10.0</td>
                    <td>N/A</td>
                </tr>
                <tr>
                    <td><a href="">IoxAddOn</a></td>
                    <td>10.0</td>
                    <td>N/A</td>
                </tr>
                <tr>
                    <td><a href="">IoxAddOnStatus</a></td>
                    <td>10.0</td>
                    <td>N/A</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>;

const PropertySelctorFAQ: ReactNode = (
    <div className="paragraph">
        <p><b>Can I combine property selector and search?</b></p>
        <p>Yes. PropertySelector and Search work independently of each other and can be used together in the same request.</p>
    </div>
);

const MultiCall: ReactNode = (
    <div className="paragraph">
        <p>
            A MultiCall is a way to make several API calls against a server with a single HTTP request. This eliminates potentially expensive round trip costs.
        </p>
        <p>
            Why use a MultiCall?    
        </p>
        <p>
            Making an HTTP request over a network has overhead. This can be in the form of Network overhead, the round trip time to send and receive data over the network and HTTP overhead, the HTTP request and response headers. A MultiCall can be used to reduce amount of overhead in situations where many small requests need to be made to a server.    
        </p>
        <p>
            For example, if we make a request to get the count of devices. The request would be constructed in a format similar to:   
        </p>
        <CodeSample
        language="javascript"
        code={`{
    "method": "GetCountOf",
    "params": {
        "typeName": "Device",
        "credentials": {
        "database": "demo",
        "sessionId": "xxx",
        "userName": "bob@geotab.com"
        }
    }
}`
}></CodeSample>
        <p>
            Response:
        </p>
        <CodeSample
        language="javascript"
        code={`{
    "result": 2340,
    "jsonrpc": "2.0"
}`
}></CodeSample>
        <p>
            Let’s assume that it takes 100 milliseconds for this call round trip (the time from sending request to receiving the response), including 40 milliseconds to send the request, 20 ms to process the data on the server, and 40 ms for the response to be returned. <a href="https://www.chromium.org/spdy/spdy-whitepaper/">Google’s SPDY research project white paper</a> states that <i>“typical header sizes of 700-800 bytes is common”</i>. Based on this assumption, we pay a 750 byte cost when making a request. From the example, there would be 80 ms of network overhead and 750 bytes of HTTP overhead, this is accepted as the “cost of doing business” when making a request over a network.
        </p>
        <p>
            Taking the previous assumptions, what would the overhead be for making 1000 requests for road max speeds? When individual calls are made to the server for 1000 addresses; the base (minimum) HTTP and Network overhead is required for each of these calls. This would result in 80 seconds (80,000 milliseconds) of network overhead and 0.72 MB (750,000 bytes) in headers just going to and from the server. It can be clearly seen that a great deal of overhead can be generated by making small but repeated requests.
        </p>
        <p>
            By using a MultiCall, the network and HTTP overhead remains at the cost of a single request. This brings the overhead back down to our original 80 milliseconds and 750 bytes. The server processes each request and returns an Array of results when complete.    
        </p>
        <p>
            The above illustration is an extreme example to demonstrate the benefits of using a MultiCall. A MultiCall can (and should) be used to make short running calls of 2 or more requests more efficient than individual calls.    
        </p>
    </div>
);

const MultiCallBasicImplementation: ReactNode = (
    <div className="paragraph">
        <p>
            Making a MultiCall is simple, use the method “ExecuteMultiCall” with the parameter “calls” of JSON type Array. Each call should be formatted as an Object with property “method” of type string with the method name as its value and a property “params” of type Object with the method parameters as its properties. The parent “params” object will also need to contain the user credentials if they are required for at least one of the child methods being called. It is not necessary to include credentials with each child call.    
        </p>
        <CodeSample
        language="javascript"
        code={`{
    "method": "ExecuteMultiCall",
    "params": {
        "calls": [
            {
                "method": "GetCountOf",
                "params": {
                    "typeName": "Device"
                }
            },
            {
                "method": "GetCountOf",
                "params": {
                    "typeName": "User"
                }
            }
        ],
        "credentials": {
            "database": "demo",
            "sessionId": "xxx",
            "userName": "bob@geotab.com"
        }
    }
}`
}></CodeSample>
        <p>Response:</p>
        <CodeSample
        language="javascript"
        code={`{
    "result": [
        2340,
        2022
    ],
    "jsonrpc": "2.0"
}`
}></CodeSample>
    </div>
);

const MultiCallErrors: ReactNode = (
    <div className="paragraph">
        <p>
            In a MultiCall, each request is run on the server synchronously. If one fails, the error results are returned immediately and <b>unreached calls are not run</b>. The error results includes the index of the call in the array that the exception occurred. 
        </p>
        <p>
            To illustrate, let’s assume an array of calls (api.multicall([call-a, call-b, call-c])) where call-b is formatted incorrectly.
        </p>
        <CodeSample
        language="javascript"
        code={`var calls = [
    call-a, // ran successfully
    call-b, // error occurred, throw and return error
    call-c  // never ran
]`
}></CodeSample>
        <p>
            Below is an example of the error result. The <code className="small-code-sample">requestIndex</code> property contains the index of the call that failed.
        </p>
        <CodeSample
        language="javascript"
        code={`results = {
    "error": {
        "message": "The method 'Foobar' could not be found. Verify the method name and ensure all method parameters are included.",
        "code": -32601,
        "data": {
            "id":"2901ac83-0d7f-41a1-9cca-fd4a68e77ae7",
            "type":"MissingMethodException",
            "requestIndex": 1
        }
    },
    "jsonrpc":"2.0"
}`
}></CodeSample>
        <p>Alternatively, a successful MultiCall would look similar to:</p>
        <CodeSample
        language="javascript"
        code={`calls = [
    call-a, // ran successfully
    call-b, // ran successfully
    call-c  // ran successfully
]
results = {
    "results": [
        [...],
        [...],
        [...]
    ]
}`
}></CodeSample>
    </div>
);

//ToDo Update Reference Page Link
const APIClientSupport: ReactNode = (
    <div className="paragraph">
        <p>
            All of the <a href="https://geotab.github.io/sdk/software/api/clients/">API</a> clients have native support for making multi-calls. Below are examples of making multi-calls using the Javascript and .Net wrappers:    
        </p>
        <p>
            JavaScript API multi-call example:    
        </p>
        <CodeSample
        language="javascript"
        code={`var calls = [
    ["Get", { typeName: "Diagnostic" }],
    ["Get", { typeName: "Source", search: {id: "SourceGeotabGoId"}}],
    ["Get", { typeName: "Controller" }]
];

api.multiCall(calls, function (results) {
    var diagnostics = results[0];
    var sources = results[1];
    var controllers = results[2];
}, function (errorString) {
    alert(errorString);
});`
}></CodeSample>
        <p>
            .Net nuget package multi-call example:
        </p>
        <CodeSample
        language="javascript"
        code={`var calls = new object[] {
    new object[] { "Get", typeof(Diagnostic), typeof(List<Diagnostic>)},
    new object[] { "Get", typeof(Source), new { search = new SourceSearch { Id = KnownId.SourceGeotabGoId } }, typeof(List<Source>)},
    new object[] { "Get", typeof(Controller), typeof(List<Controller>)},
};

var results = api.MultiCall(calls);

var diagnostics = (List<Diagnostic>)results[0];
var sources = (List<Source>)results[1];
var controllers = (List<Controller>)results[2];`
}></CodeSample>
    </div>
);

const MultiCallFAQ: ReactNode = (
    <div className="javascript">
        <p>
            <b>Can I use a search in a multicall?</b>
        </p>
        <p>
            Yes, it is possible to use a search in a multicall.  
        </p>
        <p>
            <b>When shouldn’t I use a multicall?</b>
        </p>
        <ol>
            <li>
                If you need to make a few requests that are long running and return a large amount of data, it may be preferable to make the requests singularly instead of running one multicall request that continues for a very long time before completion. When the connection is held open for a long period of time, you become increasingly susceptible to network interference that can terminate the request.
            </li>
            <li>
                Manipulating data (Add, Set, Remove) via a multicall is not recommended. A multicall is not transactional. Therefore, if call 1 of 3 to Add succeeds and call 2 of 3 fails, call 3 of 3 will not be executed and call 1 would not be rolled back.
            </li>
        </ol>
        <p>
            <b>How many request can I put in a multicall?</b>
        </p>
        <p>
            For optimal performance, we advise limiting to 100 nested requests.
        </p>
        <p>
            This is relevant when processing requests large response sizes, for instance, Getover an extended period. Similarly, using chunking to manage high-volume requests improves process control and optimizes response management.
        </p>
        <p>
            That being said, the system does not enforce a hard limit on the number of requests in a multicall at this point.
        </p>
        <p>
            <b>What if the call doesn’t return a result?</b>
        </p>
        <p>
            The index in the array of results will have a <b>null</b> value.
        </p>
    </div>
);

const pageTitle: PageTitleProps = {
    "title": "Concepts",
    "breadCrumbItems": ["MYG", "Guides", "Concepts"]
};

const pageSections: TableOfContentsItem[] = [
    {
        "elementId": "security",
        "summary": "Security",
        "details": security
    },
    {
        "elementId": "firstAPICall",
        "summary": "Make Your First API Call",
        "details": makeYourFirstAPICall
    },
    {
        "elementId": "resultAndErrors",
        "summary": "Results And Errors",
        "details": ResultsAndErrors
    },
    {
        "elementId": "authentication",
        "summary": "Authentication",
        "details": Authentication
    },
    {
        "elementId": "example1",
        "summary": "Example 1: Authenticate With Valid Credentials",
        "details": Example1
    },
    {
        "elementId": "example2",
        "summary": "Example 2: Requests With Missing Databases Or With Expiring Credentials",
        "details": Example2
    },
    {
        "elementId": "httpCompression",
        "summary": "HTTP Compression",
        "details": HTTPCompression
    },
    {
        "elementId": "limits",
        "summary": "Limits",
        "details": Limits
    },
    {
        "elementId": "rateLimits",
        "summary": "Rate Limits",
        "details": RateLimits
    },
    {
        "elementId": "resultLimits",
        "summary": "Result Limits",
        "details": ResultLimits
    },
    {
        "elementId": "workingWithDates",
        "summary": "Working With Dates",
        "details": WorkingWithDates
    },
    {
        "elementId": "unitOfMeasure",
        "summary": "Unit Of Measure",
        "details": UnitOfMeasure
    },
    {
        "elementId": "entities",
        "summary": "Entities",
        "details": Entities
    },
    {
        "elementId": "id",
        "summary": "ID",
        "details": ID
    },
    {
        "elementId": "example4",
        "summary": "Example 4",
        "details": Example4
    },
    {
        "elementId": "example5",
        "summary": "Example 5",
        "details": Example5
    },
    {
        "elementId": "buildingBlock",
        "summary": "Building Block Approach",
        "details": BuildBlockApproach
    },
    {
        "elementId": "propertySelector",
        "summary": "PropertSelector BETA",
        "details": PropertySelector
    },
    {
        "elementId": "supportedTypes",
        "summary": "Supported Types",
        "details": SupportedTypes
    },
    {
        "elementId": "supportedTypeExample",
        "summary": "Examples",
        "details": SupportedTypeExample
    },
    {
        "elementId": "supportEntitiesList",
        "summary": "List Of Supported Entities",
        "details": SupportEntitiesList
    },
    {
        "elementId": "propertySelectorFAQ",
        "summary": "PropertySelector FAQ",
        "details": PropertySelctorFAQ
    },
    {
        "elementId": "multiCall",
        "summary": "MultiCall",
        "details": MultiCall
    },
    {
        "elementId": "multiCallImplementation",
        "summary": "Basic Implementation",
        "details": MultiCallBasicImplementation
    },
    {
        "elementId": "multiCallErrors",
        "summary": "Errors",
        "details": MultiCallErrors
    },
    {
        "elementId": "APIClientSupport",
        "summary": "API Client Support",
        "details": APIClientSupport
    },
    {
        "elementId": "multiCallFAQ",
        "summary": "MultiCall FAQ",
        "details": MultiCallFAQ
    }
];

//ToDo Update Reference Page Link
export default function Concepts() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                <p>Requests made to the Geotab API are performed over HTTPS. The current API is version 1. The version number is appended to the API endpoint URL, where the web application sends requests:</p>
                <p><code className="small-code-sample">{`https://[myserver]/apiv1`}</code></p>
                <p>
                    NOTE: Sample text inside <code className="small-code-sample">{`[`}</code>
                    and 
                    <code className="small-code-sample">{`]`}</code>
                    (e.g 
                    <code className="small-code-sample">{`[`}myserver{`]`}</code>
                    are placeholders to indicate where the user enters information unique to their requirements.
                </p>
                <p>
                    API request parameters and their results are transported using the lightweight <a href="http://www.json.org" target="_blank" rel="noopener noreferrer">JSON</a> format. The <a href="../../api/reference">API Reference</a> contains a list of methods that can be invoked, including the parameters they expect, and the results they return. Examples are provided below to demonstrate what the Geotab API can do.
                </p>
                <p>
                    Requests to the Geotab API are invoked using HTTP GET or HTTP POST. HTTP POST requests use the JSON-RPC standard. When making requests that contain MyGeotab credentials, use the POST request only. This helps to minimize potential leaks into browser histories, or web server logs.
                </p>
                <p>
                    The following sections explain how to construct HTTP GET and POST requests to the Geotab API.
                </p>
            </div>

            {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId} />)}
        </Page>
    );
};