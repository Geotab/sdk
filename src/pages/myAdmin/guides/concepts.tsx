import { ReactNode } from "react";

import { Link } from "react-router-dom";

import { Page } from "./../../../components";
import { PageTitleProps } from "./../../../components/PageTitle/PageTitle";
import { HeaderSections } from "./../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "./../../../components/TableOfContents/TableOfContents";

import Accordion from "./../../../components/Accordion/Accordion";
import CodeSample from "./../../../components/CodeSamplesContainer/CodeSample";

const httpPostRequest: ReactNode = (
    <div className="paragraph">
        <p>When using HTTP POST request to invoke an API method, the following endpoint is used:</p>
        <CodeSample
            language=""
            code={
                `https://myadminapi.geotab.com/v2/MyAdminApi.ashx`
            }
        />
        <p>
            However, instead of encoding the method name and parameters in the query string, it is passed in the HTTP body using the JSON-RPC format.The MyAdmin API supports{" "}
            <a href="https://en.wikipedia.org/wiki/JSON-RPC"
                target="_blank"
                rel="noreferrer"
                aria-label="JSON-RPC">
                JSON-RPC
            </a>{" "}
            version 1.0. The following is a JavaScript example that shows how HTTP POST can be used to invoke a method.
            <p><strong>Note</strong>: This can be done from any language that has support for HTTP, for example the java.net.HttpUrlConnection class in Java or System.Net.HttpWebRequest in Microsoft .NET.</p>
            <CodeSample
                language="javascript"
                code={`var request = new XMLHttpRequest();
request.open("POST", "https://myadminapi.geotab.com/v2/MyAdminApi.ashx", true);
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
request.onreadystatechange = function () {
   if (request.readyState === 4) {
      if (request.status === 200) {
         var json = JSON.parse(request.responseText);
         if (json.result) {
            // Work with your result
            // Simple example just alerts its presence
            alert("Received Data");
         }
      }
   }
};
// Send the HTTP BODY in the JSON-RPC format. ID is ignored
// and can be set to -1.
// This example demonstrates authentication using HTTP POST.
var authenticateParams = {
   "id" : -1,
   "method" : "Authenticate",
   "params" : {
      "username":"user@geotab.com",
      "password":"<password>"
   }
};
request.send("JSON-RPC=" + encodeURIComponent(JSON.stringify(authenticateParams)));


// Send the HTTP BODY in the JSON-RPC format. ID is ignored
// and can be set to -1.
// The method being called is “GetDevicePlans”.
// The “GetDevicePlans” method’s parameters are then passed in the “params” property
var apiMethod = {
   "id" : -1,
   "method" : "GetDevicePlans",
   "params" : {
      "apiKey":"x12345x2-172x-4d04-8xx2-xx9e088c5xxx",
      "sessionId":"cff4e88b-931b-4363-ae4f-35b5ed169133"
   }
};
request.send("JSON-RPC=" + encodeURIComponent(JSON.stringify(apiMethod)));`}
            />
        </p>
    </div>
);

const resultsAndErrors: ReactNode = (
    <div className="paragraph">
        <p>A successful call to the server will result in an object with property "result", like this:</p>
        <CodeSample
            language="json"
            code={`{"result":[
   {"id":1,"level":1,"validForOrder":true,"name":"Pro Mode"},
   {"id":3,"level":3,"validForOrder":true,"name":"Base Mode"},
   {"id":4,"level":99,"validForOrder":false,"name":"Suspend Mode"},
   {"id":5,"level":9999,"validForOrder":false,"name":"Terminate Mode"}
]}`}
        />
        <p>
            However, when the call is incorrect or an error is triggered on the server, the error will be returned as an object with property "error":
        </p>
        <CodeSample
            language="json"
            code={`{
    "error":{
        "name":"JSONRPCError",
        "message":"'UnknownUser: user@geotab.com'",
        "errors":[{
            "name":"WebServerInvokerJSONException",
            "message":"'UnknownUser: user@geotab.com'"
        }]
    }
}`}
        />
        <p>The properties of the error object are:</p>
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
                        <td>name</td>
                        <td>For all JSON-RPC errors, this is always “JSONRPCError”.</td>
                    </tr>
                    <tr>
                        <td>message</td>
                        <td>The description of the likely root cause of the error.</td>
                    </tr>
                    <tr>
                        <td>errors</td>
                        <td>An array of individual errors that were caught. Usually, there is at least one error in this array.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>
            The properties for objects in the “errors” array are:
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
                        <td>name</td>
                        <td>The name of the server exception. For example, “SecurityException”, “NullReferenceException”, etc.</td>
                    </tr>
                    <tr>
                        <td>message</td>
                        <td>The description associated with the server exception.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>
            Session expiry is an example of a case where it is useful to catch and handle errors.</p>
    </div>
);

const workingWithDates: ReactNode = (
    <div className="paragraph">
        <p>
            When exchanging dates as parameters to API methods, you must ensure that they are formatted properly as an{" "}
            <a href="https://en.wikipedia.org/wiki/ISO_8601"
                target="_blank"
                rel="noreferrer"
                aria-label="ISO 8601">
                ISO 8601
            </a>{" "}
            string. In addition, all dates will have to first be converted to {" "}
            <a href="https://en.wikipedia.org/wiki/Coordinated_Universal_Time"
                target="_blank"
                rel="noreferrer"
                aria-label="Coordinated Universal Time">
                UTC
            </a>{" "}
            in order to ensure timezone information and daylight savings times are accounted for correctly.
        </p>
    </div>
);

const pagination: ReactNode = (
    <div className="paragraph">
        <p>
            Version 3 of the API, e.g., <code className="small-code-sample">/v3/MyAdminApi.ashx</code>, introduces Pagination. Any method returning an array will be paginated, i.e., a limited number of results will be returned, along with other pagination information.
        </p>

        <p>
            v3 versions of endpoints/methods that do not yet support pagination <strong>will return an error when called</strong>. Pagination support will be indicated in the method's docs, for those methods that support it. Please use the v1 version of those endpoints until they can be updated to support pagination. Please contact your account manager to indicate the endpoint for which you would like pagination supported, and they will queue the work with our development team.
        </p>
        <p>
            Two kinds of pagination are supported:
        </p>
        <ul>
            <li>Offset-based pagination. This is the default method.</li>
            <li>Keyset-based pagination. Supported on some endpoints. This is faster and more efficient than offset-based pagination, and as such is recommended, where available.</li>

        </ul>

        <h2>Offset-based Pagination</h2>

        <p>
            This type of pagination breaks the result set into indexed pages, starting at 1. Specify the desired page and results per page by passing them in the request object, like so:
        </p>

        <CodeSample language="javascript" code={`var apiMethod = {
    "id" : -1,
    "method" : "GetDevicePlans",
    "params" : {
        "apiKey":"x12345x2-172x-4d04-8xx2-xx9e088c5xxx",
        "sessionId":"cff4e88b-931b-4363-ae4f-35b5ed169133"
    },
    "pagination" : {
        "page": 2,
        "perPage": 10
    }
};`} />

        <p>
            Default page size is <strong>20</strong>. Maximum page size is <strong>100</strong>.
        </p>
        <p>
            For <code className="small-code-sample">GET</code> requests, use the query parameters <code className="small-code-sample">page</code> and <code className="small-code-sample">per_page</code>.
        </p>
        <p>
            The result object will include pagination information, where <code className="small-code-sample">total</code> is the total number of records matched by the query:
        </p>

        <CodeSample language="json" code={`{
    ...
    "pagination" : {
    "page" : 2,
    "perPage" : 10,
    "total" : 1234
    }
};`} />

        <p>
            For <code className="small-code-sample">GET</code> requests, these values will be returned in the HTTP headers <code className="small-code-sample">Page</code>, <code className="small-code-sample">PerPage</code> and <code className="small-code-sample">Total</code>. Also for <code className="small-code-sample">GET</code> requests, a <code className="small-code-sample">Link</code> header will be returned that can be used to access the next page.
        </p>
        <h2>Keyset-based Pagination</h2>
        <p>
            Keyset-pagination allows for more efficient retrieval of pages, and runtime is independent of the size of the collection, in contrast to offset-based pagination. Use keyset pagination, on the methods that support it, like so:
        </p>


        <CodeSample language="javascript" code={`var apiMethod = {
            "id" : -1,
        "method" : "GetDevicePlans",
        "params" : {
            "apiKey":"x12345x2-172x-4d04-8xx2-xx9e088c5xxx",
        "sessionId":"cff4e88b-931b-4363-ae4f-35b5ed169133"
       },
        "pagination" : {
            "type": "keyset",
        "perPage": 10
       }
    };`} />

        <p>
            For <code className="small-code-sample">GET</code> requests, use the query parameter <code className="small-code-sample">pagination</code> set to <code className="small-code-sample">keyset</code> to enable keyset pagination (on those methods that support it).
        </p>
        <p>
            The result object will include keyset pagination information:
        </p>
        <CodeSample language="json" code={`{
    ...
    "pagination" : {
        "perPage" : 10,
        "nextCursor" : "KFbsifjSKfj9"
    }
};`} />
        <p>
            For <code className="small-code-sample">GET</code> requests, these values will be returned in the HTTP headers <code className="small-code-sample">PerPage</code> and <code className="small-code-sample">NextCursor</code>. Also for <code className="small-code-sample">GET</code> requests, a <code className="small-code-sample">Link</code> header will be returned that can be used to access the next page.
        </p >
        <p>
            Note that no information about total records or total pages will be returned for keyset pagination.
        </p>
        <p>
            To get the next page, pass in the cursor returned in the result object of the previous page:
        </p>
        <CodeSample language="javascript" code={`var apiMethod = {
    "id" : -1,
    "method" : "GetDevicePlans",
    "params" : {
        "apiKey":"x12345x2-172x-4d04-8xx2-xx9e088c5xxx",
    "sessionId":"cff4e88b-931b-4363-ae4f-35b5ed169133"
    },
    "pagination" : {
        "type": "keyset",
    "perPage": 10,
    "cursor": "KFbsifjSKfj9"
    }
};`} />
        <p>
            For <code className="small-code-sample">GET</code> requests, use the query parameter <code className="small-code-sample">cursor</code>.
        </p>
    </div >
);

const pageTitle: PageTitleProps = {
    "title": "Concepts",
    "breadCrumbItems":
        ["MYA", "Guides", "Concepts"]
};

const pageSections: TableOfContentsItem[] =
    [{
        "elementId": "myadmin-post-request",
        "summary": "HTTP POST Request",
        "details": httpPostRequest

    }, {
        "elementId": "myadmin-results-and-errors",
        "summary": "Results & Errors",
        "details": resultsAndErrors

    }, {
        "elementId": "myadmin-working-with-dates",
        "summary": "Working With Dates",
        "details": workingWithDates

    }, {
        "elementId": "myadmin-pagination",
        "summary": "Pagination",
        "details": pagination

    }];

export default function Concepts() {
    return (
        <Page section={HeaderSections.MyAdmin} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                <p>
                    Requests made to the MyAdmin API are performed using HTTPS. The URL your web application will send its requests to is:
                </p>
                <CodeSample
                    language=""
                    code={`https://myadminapi.geotab.com/v2/MyAdminApi.ashx`}
                />
                <p>
                    API request parameters and the results are transported in the lightweight{" "}
                    <a href="https://www.json.org/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="JSON website">
                        JSON
                    </a>{" "}
                    format. The{" "}
                    {/* TODO: update link */}
                    <Link to=""> Reference</Link>{" "}
                    contains a listing of the methods that can be invoked, the parameters they expect, and the results they return. Requests to the API can be invoked using HTTP POST. HTTP POST requests use the JSON-RPC standard. The following sections explain how to construct HTTP POST requests to the MyAdmin API.
                </p>
            </div>
            {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId} />)}
        </Page>
    );
};