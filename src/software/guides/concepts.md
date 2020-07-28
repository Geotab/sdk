---
layout: page
permalink: /software/guides/concepts/
title: Concepts
---

Requests made to the Geotab API are performed over HTTPS. The current API is version 1 — this is denoted in the API endpoint URL the web application will send requests to:

`https://[myserver]/apiv1`

Note: The portions of the examples noted with `[` and `]` (e.g. `[myserver]`) indicate where the user will enter information specific to their requirements.

API request parameters and the results are transported in the lightweight [JSON](http://www.json.org/) format. The [API reference](../../api/reference) contains a listing of the methods that can be invoked, the parameters they expect and the results they return. Below are examples to illustrate the capabilities of the Geotab API.

Requests to the API can be invoked using HTTP GET or POST. HTTP POST requests uses the JSON-RPC standard. 

The following sections explain how to construct HTTP GET and POST requests to the Geotab API. When making requests which contain MyGeotab credentials to the Geotab API only POST requests should be used. This will help minimize the potential for credentials being leaked into browser histories or in web server logs.

The MyGeotab API only allows making requests over secure connections (HTTPS). The minimum SSL/TLS version supported by the MyGeotab API is TLS v1.2.

## HTTP GET request

Methods can be invoked via HTTPS GET request as follows:

`https://[myserver]/apiv1/[methodname]?[parameters]`

When using methods which require MyGeotab Credentials to be passed as parameters the HTTP GET requests should be avioded and HTTP POST requests should be used instead.   

Here is a simple example of invoking the method GetVersion. This method does not require any parameters.

`https://my3.geotab.com/apiv1/GetVersion`

The HTTP response is returned as JSON. For example:

```json
{"result":"5.7.1508.122"}
```

Where the version will be the current version on the server.

### Make your first API call
Here is a more complex example that requires parameters. While both GET and POST requests are supported, it is strongly recommended that only POST requests are used for calls which require MyGeotab credentials as parameters. This example shows a POST request that returns all devices (vehicles) and their properties.

The following endpoint is used to invoke an API method when an HTTP POST request is used

`https://[myserver]/apiv1/`

The method name and parameters are passed in the HTTP body using the [JSON-RPC](http://en.wikipedia.org/wiki/JSON-RPC) format. Geotab API version 1 supports JSON-RPC version 2.0. The full set of API methods and objects returned can be viewed in the [API reference](../../api/reference). 

To understand what parameters need to be passed to the method consider the following JSON object:

```json
{
    "typeName":"Device",
        "credentials": {
            "database":"acme",
            "userName":"bob@acme.com",
            "sessionId":"1234"
        }
}
```


The following is a JavaScript example that shows how an HTTP POST can be used to invoke a method. Note that this can be done from any language that has support for HTTP, for example the java.net.HttpUrlConnection class in Java or System.Net.Http.HttpClient in .Net can be utilized.

```javascript
var request = new XMLHttpRequest();
request.open("POST", "https://[myserver]/apiv1", true);
request.setRequestHeader("Content-Type", "application/json");
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

// Send the HTTP BODY in the JSON-RPC format.
// The method being called is "Get".
// The "Get" method's parameters are then passed in the "params" property

var data = {
 "id" : 0,
 "method" : "Get",
 "params" : {
  "typeName" : "Device",
  "credentials" : {
   "database" : "demo",
   "userName" : "bob@geotab.com",
   "sessionId" : "xxx"
  }
 }
};

request.send(JSON.stringify(data));
```

## Results and Errors

Using the example above, a successful call to the server will result in an object with property "result", in this format:

Generic:

```json
{
    "result":"results",
    "jsonrpc":"2.0"
}
```

Specific:

```json
{
    "result":"5.7.1801.122",
    "jsonrpc":"2.0"
}
```

However, when the call is incorrect or an error is triggered on the server, the error will be returned as an object with property "error". For example:

```json
{
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
}
```

The properties of the error object are [JsonRpcError](../../api/reference/#T:Geotab.Checkmate.ObjectModel.Web.JsonRpcError) and [JsonRpcErrorData](../../api/reference/#T:Geotab.Checkmate.ObjectModel.Web.JsonRpcErrorData) objects as documented in the API Reference.

See [Example 3](#example-3-dealing-with-a-database-move-or-credential-expiry): Dealing with a database move or credential expiry for an example of a case where it would be useful to catch and handle errors.

## HTTP Compression

The MyGeotab API supports _gzip_ and _deflate_ compression. To utilize either of these supported compression methods, include the HTTP header for "Accept-Encoding". Ex:

Accept-Encoding: gzip, deflate

> If you are using an API client (.Net, JavaScript, Nodejs, etc) this header should be enabled automatically.

## Authentication

Data is stored on one of many servers in our cloud. A group of servers is referred to as a _federation_ of servers. For example, the my.geotab.com federation consists of my1.geotab.com, my2.geotab.com and many other servers.

While it is tempting to simply "hard code" the application to point to a particular server, such as my20.geotab.com, this is the incorrect approach. Over the course of time a database is not guaranteed to remain on the same server. It is common for load balancing to occur and resources to be transferred from one server to another as necessary. To prevent the application from losing its connection to the correct database, authentication calls must be made to the root federation server instead of making the request to a particular server.

> Authentication should be avoided by using the **credentials** object that is returned from an Authentication request for subsequent calls. It contains a token that confirms your identity for API operations. If the session expires or a database is moved, a new Authentication call should be made. This approach allows for efficient usage of Authentication requests and is detailed in the Authentication section above.

As an example; making an authentication call to "my.geotab.com" and authentication occurring. Such a call could be made as:

```js
var data = JSON.stringify({
  "method": "Authenticate",
  "params": {
    "database": "database",
    "userName": "user@geotab.com",
    "password": "password"
  }
});

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://my.geotab.com/apiv1");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);
```

Where the database, user and password are set by you.

If a redirect is necessary, the application will be informed and the correct server can be targeted. Below are special cases which should be considered when accessing the federation.

### Example 1: Currently on the correct server

In this example, an authentication call is made to my.geotab.com to log into the database "_acme"_ and the server responds that the server is correct (e.g. no need to redirect).

Steps:

1. The **Authenticate** method is called with the given credentials
2. The response from the server contains two important properties: path and credentials

The path will either contain the URL of a server _or_ the string value _ThisServer_. Since the database "_acme"_ in this example is on my.geotab.com, it simply returns _ThisServer_ as highlighted below. This means that the correct server has been targeted and there is no need for a redirect.

The credentials object contains the username, database and session ID. This object will be used in all subsequent calls (password not required when used).

1. As the authentication method stated the server is correct, other methods can be called. For example _GetCountOf_, to my.geotab.com. Pass the property called _credentials_ and send along the contents of _credentials_ that was returned in step 2
2. The result of the GetCountOf is returned, in this case it is 1234

### Example 2: Redirect to different server

In this example, an authentication call to my.geotab.com is made trying to log into database "_acme"_. Here the server responds that the database is located on my23.geotab.com. Subsequent calls are then directed to my23.geotab.com

Steps:

1. The Authenticate method is called with the given credentials
2. The response from the server contains two properties: path and credentials

The path will either contain the URL of a server _or_ the string value _ThisServer_. Since the database "_acme"_ in this example is on my23.geotab.com, the return is "my23.geotab.com" meaning that all subsequent requests should be directed at my23.geotab.com.

The credentials object contains the username, database and session ID. This object will be required in all subsequent calls to the server for security reasons (password not required when used).

1. As the authentication method stated that _acme_ is on the my23.geotab.com server, other methods can be called, for example _GetCountOf_, to my23.geotab.com. Pass the property called _credentials_ and send along the contents of _credentials_ that was returned in step 2
2. The result of the GetCountOf is returned, in this case it is 1234

![]({{site.baseurl}}/software/guides/concepts_0.png)

### Example 3: Dealing with a database move or credential expiry

The examples in the previous sections demonstrated how to specify which server to communicate with during authentication. There are however two additional situations to consider:

1. the database has moved to a different server
2. the credentials object returned willeventually expire

When this happens the next API call will fail with the following error object:

```json
{
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
}
```

When the errors collection contains an object with name _"InvalidUserException"_, the authentication process must be repeated. This will indicate what the new server is and provide a new credentials object. If the authentication process returns an error, the user was likely changed, in this case another user will be required for the login.

## Limits

At Geotab, we strive to create an open and flexible API that fosters creativity and innovation. With this in mind, we try to strike a balance between providing tools to create powerful applications, integrations and Add-ins, while maintaining overall system health and quality. Result and rate limits are meant to encourage API developers to use appropriate APIs for a given use case, as well as to safeguard against unbounded requests.

### Rate limits

#### Authenticate

No more than **10 requests-per-minute** are permitted for a user. Both successful and unsuccessful Authentication calls count towards the limit.

Credentials provided with password instead of or combined with session ID must be authenticated. Therefore, each request where credentials are provided in this way will tally against a given user's authentication limits.

#### GetFeed

The feed has a couple of common use-cases:

- Getting a constant, near real-time feed of all data reported by devices (GPS), or calculated by the system (Trips).
- Generating large aggregate reports on an off-peak interval.

For a constant poll, we recommend polling for data on a 30 second interval. However, we understand for some use cases, this to too infrequent to keep up with the rate of data generated by your vehicles and have created limits accordingly. Rate limits of **1 request-per-second** are applied to `GetFeed` requests of each supported Entity type independently.

#### OverLimitException

When a limit is exceeded, an error result with OverLimitException will be returned. A header (`Retry-After`) is also set with time remaining for the limit to reset.

##### Header Example

`Retry-After: 58`

##### Example

```json
{
    "error": {
        "message": "API calls quota exceeded. Maximum admitted 10 per 1m.",
        "code": -32000,
        "data": {
            "id": "b83dc64f-3976-4b35-8e32-c55b3a4adc2f",
            "type": "OverLimitException"
        }
    },
    "jsonrpc": "2.0"
}
```

#### Headers
If a rate limit is applied to an API, with the successful request JSON-RPC response, headers are set with rate limit information:

- `X-Rate-Limit-Limit`: the rate limit period (eg. 1s, 1m, 12h, 1d)
- `X-Rate-Limit-Remaining`: number of request remaining
- `X-Rate-Limit-Reset`: UTC date time (ISO 8601) when the limits resets

##### Example

```
X-Rate-Limit-Limit: 1m
X-Rate-Limit-Remaining: 8
X-Rate-Limit-Reset: 2019-04-26T16:13:11.9440478Z
```

### Result Limits

#### GetFeed

`GetFeed` is limited to 50,000 records returned in a single request.

> For legacy compatabilty `GetFeed` will not throw an exception when the provided limit is over 50,000. It will implicitly limit to 50,000 records.

#### Get

The Entities listed below have `Get` limits of 50,000 results:

- AnnotationLog
- DVIRLog
- TrailerAttachment
- IoxAddOn
- CustomData
- BinaryData

#### OverLimitException

To ensure your application doesn't think it has every result that matches the search criteria, when in reality there are more, an error result (`OverLimitException`) may be returned in these scenarios:

- If an API call is made with no results limit, one will be implicitly applied to the request on the server side.
- If the results are of the limit, an error result will be returned.
- If a request is made with a result limit higher than the imposed limit.
- A multicall child request limit is exceeded.
- No error will be returned if the provided rate limit matches the imposed limit, and the results match that limit.

Example

```json
{
 "error": {
  "message": "Supplied results limit (50001) exceeds maximum limit (50000).",
  "code": -32000,
  "data": {
   "id": "16526e19-06b9-4a4a-b2a3-c1dbc0144cd8",
   "type": "OverLimitException"
  }
 },
 "jsonrpc": "2.0"
}
```

## Working with dates

When exchanging dates as parameters to API methods, you must ensure that they are formatted properly as an [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) string (format `yyyy-MM-ddTHH:mm:ss.fffZ`). In addition, all dates will have to first be converted to [UTC](http://en.wikipedia.org/wiki/Coordinated_Universal_Time) in order to ensure time zone information and daylight savings times are accounted for correctly.

## Unit of measure

As a general rule, MyGeotab uses the metric system for values such as speed (km/h) and distance (m). For example, if you queried the odometer reading for a vehicle, the value would be returned in meters or if you retrieved the current speed of a vehicle it would be in km/h. It does not matter in which region in the world the vehicle or user of MyGeotab system is located — we always return the values in metric.A simple conversion can be applied to these values should you wish to work in imperial units or other customized units instead.

Please note that MyGeotab also records various other status data (i.e. engine data) from the vehicle and these values can be in various units of measure. The units of measure are not provided by Geotab in all cases. Refer to the applicable [SAE](http://standards.sae.org/automotive/) standard of the specific code for the associated unit of measure.

## Entities

All objects in the MyGeotab system are called entities. Entities have an ID property that is used to uniquely identify that object in the database. The ID is an opaque string value that uniquely identifies the entity and no assumption about the format or length of this ID value should be made when comparing or storing the values.

## ID

An ID is used to uniquely reference entities in the API. IDs are represented by opaque strings. Generally the contents of the IDs are not significant for the user. Building logic around the value of the string should be avoided — unless it is a system ID (see the examples below).

### Example 4

In this example, a vehicle in the system and its ID value will be examined. Here is a partial JSON representation of a device object:

```json
{
    "id": "b0a46",
    "name": "007 - Aston Martin",
    "serialNumber": "GTA9000003EA",
    "deviceType": "GO6",
    "vehicleIdentificationNumber": "1002"
}
```

Note the "id" property with value "b0a46". This is the unique identifier for the device (vehicle) with description "007 - Aston Martin".

To find Trips for this vehicle all of the properties of the device do not have to be passed to the Get method. Instead, only the ID property of the device object is required. Below is an example of a valid parameter object (TripSearch) for passing into Get method. The deviceSearch with the ID property set to the value "b0a46" (as indicated in the example above) is passed.

```json
{
  "typeName":"Trip",
  "search" : {
    "deviceSearch" : {
      "id" : "b0a46"
    }
  }
}
```

Calling the Get method with the parameter defined above will return all trips for the vehicle "007 - Aston Martin".

### Example 5

There are certain IDs that are predefined for system entities. For example the group that has been defined as the root group of all user groups, and called the CompanyGroup, will have an ID of "CompanyGroupId" rather than other characters (such as "b0a46" above). For example:

```json
{
    "id": "CompanyGroupId",
    "name": "The Company Group",
    "children": [..]
}
```

If the system entities do not have any properties then they are specified as strings with their ID's name.  For example the source "Obd" will be identified as "SourceObdId".

```json
{
    "code": "738960445",
    "engineType": {
        "id": "b2715",
    },
    "source": "SourceObdId"
}
```

## Building block approach

The results of a call to our API will only contain literal values and the identities of contained objects — not the actual fully populated child objects. This provides a predictable system that efficiently serializes objects to JSON and back. Additional lookups of the nested objects will be required to retrieve additional properties of the objects.

For example, an engine status data record has a device property. If 1000 engine status data records are retrieved for a device, the status data's device property will only contain the ID of the device. An additional retrieval for the devices object will be required to obtain the status data records. This approach has several benefits:

- Saves bytes over the wire
- Reduces request time
- Avoids redundant copies of entities
- More flexible since the child objects may not always be required

In the example below it can be seen how, by creating a dictionary of devices where the key is the device ID and the value is the device object, devices can be easily "stitched" into the status data records:

```javascript
var statusDatas = [{
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
};
```

statusDatas[i].device = deviceLookup[statusDatas[i].device.id];

Depending on the process, for some entities like diagnostics, it may be desirable to maintain a local cache from which the status/fault data can be populated. In this case it will be necessary to refresh the cache when the cache is missing the required entity making an API call.This will allow the API to get the required entity and add it to the local cache. An example of maintaining a diagnostic cache would occur when consuming a feed of data from the API. An example of this process is included in both the [.Net](https://github.com/Geotab/sdk-dotnet-samples/tree/master/DataFeed) and [JavaScript DataFeed](../../js-samples/dataFeed.html) examples.

## MultiCall

A MultiCall is a way to make several API calls against a server with a single HTTP request. This eliminates potentially expensive round trip costs.

Why use a MultiCall?

Making an HTTP request over a network has overhead. This can be in the form of Network overhead, the round trip time to send and receive data over the network and HTTP overhead, the HTTP request and response headers. A MultiCall can be used to reduce amount of overhead in situations where many small requests need to be made to a server.

For example, if we make a request to get the count of devices. The request would be constructed in a format similar to:

```json
{
 "method": "GetCountOf",
 "params": {
  "typeName": "Device",
  "credentials": {
   "database": "demo",
   "sessionId": "xxx",
   "userName": "bob@geotab.com"
  }
 }
}
```

Response:

```json
{
 "result": 2340,
 "jsonrpc": "2.0"
}
```

Making the assumption that it takes 100 milliseconds for this call round trip (the time from sending request to receiving the response), 40 milliseconds to send the request, 20 ms to process the data on the server and 40 ms for the response to be returned. [Google's SPDY research project](http://dev.chromium.org/spdy/spdy-whitepaper) [white paper](http://dev.chromium.org/spdy/spdy-whitepaper) states that "_typical header sizes of 700-800 bytes is common_". Based on this assumption, we pay a 750 byte cost when making a request. From the example, there would be 80 ms of network overhead and 750 bytes of HTTP overhead, this is accepted as the "cost of doing business" when making a request over a network.

Taking the previous assumptions, what would the overhead be for making 1000 requests for road max speeds? When individual calls are made to the server for 1000 addresses; the base (minimum) HTTP and Network overhead is required for each of these calls. This would result in 80 seconds (80,000 milliseconds) of network overhead and 0.72 MB (750,000 bytes) in headers just going to and from the server. It can be clearly seen that a great deal of overhead can be generated by making small but repeated requests.

By using a MultiCall, the network and HTTP overhead remains at the cost of a single request. This brings the overhead back down to our original 80 milliseconds and 750 bytes. The server processes each request and returns an Array of results when complete.

The above illustration is an extreme example to demonstrate the benefits of using a MultiCall. A MultiCall can (and should) be used to make short running calls of 2 or more requests more efficient than individual calls.

### Basic implementation

Making a MultiCall is simple, use the method "ExecuteMultiCall" with the parameter "calls" of JSON type Array. Each call should be formatted as an Object with property "method" of type string with the method name as its value and a property "params" of type Object with the method parameters as its properties. The parent "params" object will also need to contain the user credentials if they are required for at least one of the child methods being called. It is not necessary to include credentials with each child call.

```json
{
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
}
```

Response:

```json
{
 "result": [
  2340,
  2022
 ],
 "jsonrpc": "2.0"
}
```

### Errors
In a MultiCall, each request is run on the server in syncronously. If one fails, the error results are returned immediately and **unreached calls are not run**. The error results includes the index of the call in the array that the exception occured.

To illustrate, let's assume an array of calls (api.multicall([call-a, call-b, call-c])) where call-b is formatted incorrectly.

```javascript
var calls = [
  call-a, // ran successfully
  call-b, // error occurred, throw and return error
  call-c  // never ran
]
```

Below is an example of the error result. The `requestIndex` property contains the index of the call that failed.

```javascript
results = {
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
}
```

Alternatively, a successful MultiCall would look similar to:

```javascript
calls = [
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
}
```

### API client support

All of the [API clients](../../api/clients/) have native support for making multi-calls. Below are examples of making multi-calls using the Javascript and .Net wrappers:

JavaScript API multi-call example:

```javascript
var calls = [
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
});
```

.Net nuget package multi-call example:

```csharp
var calls = new object[] {
    new object[] { "Get", typeof(Diagnostic), typeof(List<Diagnostic>)},
    new object[] { "Get", typeof(Source), new { search = new SourceSearch { Id = KnownId.SourceGeotabGoId } }, typeof(List<Source>)},
    new object[] { "Get", typeof(Controller), typeof(List<Controller>)},
};

var results = api.MultiCall(calls);

var diagnostics = (List<Diagnostic>)results[0];
var sources = (List<Source>)results[1];
var controllers = (List<Controller>)results[2];
```

### MultiCall FAQ

*Can I use a search in a multicall?*

Yes, it is possible to use a search in a multicall.

*When shouldn't I use a multicall?*

1. If you need to make a few requests that are long running and return a large amount of data.In these casesit may be preferable to make these requests singularly instead of running one request that continues for a very long time before completion. When the connection is held open for a long period of time you become increasingly susceptible to network interference that could terminate the request.
2. Manipulating data (Add,Set,Remove) is not recommended via a multicall. A muilticall is not transactional. Therefore, if call 1 of 3 to Add succeeds and call 2 of 3 fails, call 3 of 3 is not executed and call 1 is not rolled back. See "What if an error occurs in one of the MultiCall requests?" below for illustration.

*How many request can I put in a multicall?*

There is no limit on the number of requests that can be made in a multicall. When making a large number of requests it may be desirable to "chunk" the requests into several requests of a smaller and more manageable size.

*What if the call doesn't return a result?*

The index in the array of results will have a **null** value.
