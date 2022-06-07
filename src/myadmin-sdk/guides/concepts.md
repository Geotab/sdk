---
layout: page
permalink: /myadmin-sdk/guides/concepts/
title: Concepts
---
Requests made to the MyAdmin API are performed using HTTPS. The URL your web application will send its requests to is:

```
https://myadminapi.geotab.com/v2/MyAdminApi.ashx
```

API request parameters and the results are transported in the lightweight [JSON](https://www.json.org/) format. The [Reference](../../api/reference) contains a listing of the methods that can be invoked, the parameters they expect, and the results they return. Requests to the API can be invoked using HTTP POST. HTTP POST requests use the JSON-RPC standard. The following sections explain how to construct HTTP POST requests to the MyAdmin API.

## HTTP POST Request

When using HTTP POST request to invoke an API method, the following endpoint is used:

```
https://myadminapi.geotab.com/v2/MyAdminApi.ashx
```
However, instead of encoding the method name and parameters in the query string, it is passed in the HTTP body using the JSON-RPC format. The MyAdmin API supports [JSON-RPC](https://en.wikipedia.org/wiki/JSON-RPC) version 1.0. The following is a JavaScript example that shows how HTTP POST can be used to invoke a method.  
   
   **Note**   
   This can be done from any language that has support for HTTP, for example the java.net.HttpUrlConnection class in Java or System.Net.HttpWebRequest in Microsoft .NET.  

```javascript
var request = new XMLHttpRequest();
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
request.send("JSON-RPC=" + encodeURIComponent(JSON.stringify(apiMethod)));
```

## Results & Errors

A successful call to the server will result in an object with property “result”, like this:

```json
{"result":[
   {"id":1,"level":1,"validForOrder":true,"name":"Pro Mode"},
   {"id":3,"level":3,"validForOrder":true,"name":"Base Mode"},
   {"id":4,"level":99,"validForOrder":false,"name":"Suspend Mode"},
   {"id":5,"level":9999,"validForOrder":false,"name":"Terminate Mode"}
]}
```
However, when the call is incorrect or an error is triggered on the server, the error will be returned as an object with property “error”:

```json
{"error":{
   "name":"JSONRPCError",
   "message":"'UnknownUser: user@geotab.com'",
   "errors":[{
      "name":"WebServerInvokerJSONException",
      "message":"'UnknownUser: user@geotab.com'"
   }]
}
}
```
The properties of the error object are:

| Property      | Description | 
| ------------- |:-------------| 
| name          | For all JSON-RPC errors this is always “JSONRPCError”.                                                 | 
| message       | The description of the likely root cause of the error.                                                          | 
| errors        | An array of individual errors that were caught. Usually, there is at least one error in this array.             |

The properties for objects in the “errors” array are:


| Property      | Description  | 
| ------------- |:-------------| 
| name          | The name of the server exception. For example, “SecurityException”, “NullReferenceException”, etc.                                                 | 
| message       | The description associated with the server exception.            |

Session expiry is an example of a case where it is useful to catch and handle errors.

## Working with dates

When exchanging dates as parameters to API methods, you must ensure that they are formatted properly as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string. In addition, all dates will have to first be converted to [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) in order to ensure timezone information and daylight savings times are accounted for correctly.

## Pagination

Version 3 of the API, e.g., `/v3/MyAdminApi.ashx`, introduces Pagination. Any method returning an array will be paginated, i.e., a limited number of results will be returned, along with other pagination information.

v3 versions of endpoints/methods that do not yet support pagination **will return an error when called**. Pagination support will be indicated in the method's docs, for those methods that support it. Please use the v1 version of those endpoints until they can be updated to support pagination. Please contact your account manager to indicate the endpoint for which you would like pagination supported, and they will queue the work with our development team.

Two kinds of pagination are supported:

* Offset-based pagination. This is the default method.
* Keyset-based pagination. Supported on some endpoints. This is faster and more effecient than offset-based pagination, and as such is recommended, where available.

### Offset-based pagination

This type of pagination breaks the result set into indexed pages, starting at 1. Specify the desired page and results per page by passing them in the request object, like so:

```javascript
    
    var apiMethod = {
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
    };
```                

Default page size is **20**. Maximum page size is **100**.

For `GET` requests, use the query parameters `page` and `per_page`.

The result object will include pagination information, where `total` is the total number of records matched by the query:

```javascript    
    {
    ...
        "pagination" : {
           "page" : 2,
           "perPage" : 10,
           "total" : 1234
        }
    };
```                

For `GET` requests, these values will be returned in the HTTP headers `Page`, `PerPage` and `Total`. Also for `GET` requests, a `Link` header will be returned that can be used to access the next page.

### Keyset-based pagination

Keyset-pagination allows for more efficient retrieval of pages, and runtime is independent of the size of the collection, in contrast to offset-based pagination. Use keyset pagination, on the methods that support it, like so:

```javascript    
    var apiMethod = {
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
    };
```                

For `GET` requests, use the query parameter `pagination` set to `keyset` to enable keyset pagination (on those methods that support it).

The result object will include keyset pagination information:

```javascript    
    {
    ...
        "pagination" : {
           "perPage" : 10,
           "nextCursor" : "KFbsifjSKfj9"
        }
    };
```                

For `GET` requests, these values will be returned in the HTTP headers `PerPage` and `NextCursor`. Also for `GET` requests, a `Link` header will be returned that can be used to access the next page.

Note that no information about total records or total pages will be returned for keyset pagination.

To get the next page, pass in the cursor returned in the result object of the previous page:

```javascript    
    var apiMethod = {
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
    };
```    

For `GET` requests, use the query parameter `cursor`.
