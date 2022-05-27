---
layout: page
permalink: /software/guides/concepts/
title: Concepts
---

Requests made to the Geotab API are performed over HTTPS. The current API is version 1. The version number is appended to the API endpoint URL, where the web application sends requests:

`https://[myserver]/apiv1`

NOTE: Sample text inside `[` and `]` (e.g. `[myserver]`) are placeholders to indicate where the user enters information unique to their requirements.

API request parameters and their results are transported using the lightweight [JSON](http://www.json.org/) format. The [API reference](../../api/reference) contains a list of methods that can be invoked, including the parameters they expect, and the results they return. Examples are provided below to demonstrate what the Geotab API can do.

Requests to the Geotab API are invoked using HTTP GET or HTTP POST. HTTP POST requests use the JSON-RPC standard. When making requests that contain MyGeotab credentials, use the POST request only. This helps to minimize potential leaks into browser histories, or web server logs. 

The following sections explain how to construct HTTP GET and POST requests to the Geotab API. 

MyGeotab API requests can only be made over secure connections (HTTPS). The minimum SSL/TLS version supported by the MyGeotab API is TLS v1.2.

## HTTP GET request

Methods can be invoked using the HTTPS GET request as follows:

`https://[myserver]/apiv1/[methodname]?[parameters]`

When using methods that pass MyGeotab credentials as parameters, avoid HTTP GET requests, and use HTTP POST requests instead.   

A simple GetVersion method does not require any parameters. For example:

`https://my3.geotab.com/apiv1/GetVersion`

The HTTP response is returned as JSON. For example:

```json
{"result":"5.7.1508.122"}
```

Where the version is the current version installed on the server.

### Make your first API call
A more complex request requires parameters. While both GET and POST requests are supported, we strongly recommend that only POST requests are used for requests that include MyGeotab credentials as parameters. 

The endpoint shown below is used to invoke an API method when an HTTP POST request is used. The example that follows illustrates a POST request that returns all devices (vehicles) and their properties.

`https://[myserver]/apiv1/`

The method's name and parameters are passed in the HTTP body using the [JSON-RPC](http://en.wikipedia.org/wiki/JSON-RPC) format. Geotab API version 1 supports JSON-RPC version 2.0. The full set of API methods and objects returned can be viewed in the [API reference](../../api/reference). 

To understand which parameters must be passed, consider the following JSON object:

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

To understand how HTTP POST can be used to invoke a method, consider the following JavaScript example. This can be achieved from any language that supports HTTP, such as the java.net.HttpUrlConnection class in Java, or System.Net.Http.HttpClient in .Net.

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

Using the example above, a successful request to the server results in an object with the property "result" in the following format:

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

However, if the request is incorrect, or an error is triggered on the server, the error is returned as an object with the property "error". For example:

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

The properties of the error object are [JsonRpcError](../../api/reference/#JsonRpcError), and [JsonRpcErrorData](../../api/reference/#JsonRpcErrorData). Objects are documented in the API Reference.

See [Example 3](#example-3-requests-to-missing-databases-or-with-expiring credentials): Handling a database move or credential expiry to show how it can be useful to identify and handle errors.

## HTTP Compression

The MyGeotab API supports _gzip_ and _deflate_ compression. To use either of these compression methods, include the HTTP header for "Accept-Encoding". For example:

Accept-Encoding: gzip, deflate

> If you are using an API client (.Net, JavaScript, Nodejs, etc.), the header is enabled automatically.

## Authentication

Data is stored on one of many servers within our cloud environment. A group of servers is referred to as a _federation_. For example, the my.geotab.com federation consists of my1.geotab.com, my2.geotab.com, and so on.

While it is tempting to "hard code" the application to point to a particular server (e.g. my20.geotab.com), this is not the correct approach. Over time, databases can be relocated as load balancing occurs, and resources are distributed from one server to another. They do not necessarily remain on the same server for the duration their lifecycle. To prevent the application from disconnecting from the database, authentication requests should not be made to a particular server; rather, they should be made to the root federation server.

> Authentication can be avoided by using the **credentials** object that is returned from subsequent Authentication requests. The **credentials** object contains a token that confirms your identity for API operations. If the session expires, or a database is moved, a new Authentication request must be made. This approach encourages efficient use of Authentication requests, as shown in the Authentication section above.

For example: an authentication request to "my.geotab.com" that completes successfully can be made as:

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

If redirection is necessary, the application is notified, and the correct server targeted. The following are special cases for consideration when accessing the federation.

### Example 1: Request to the correct server

In this example, an authentication request is made to my.geotab.com to log in to the database named _acme_. The server's response confirms that my.geotab.com is the correct server (i.e. no need to redirect).

1. The **Authenticate** method is requested using the credentials provided.
2. The response from the server contains two important properties — path and credentials.

The path will either contain the URL of a server, or the string value _ThisServer_. Since the database _acme_ is on my.geotab.com, it returns _ThisServer_. This means that the path is correct and there is no need to redirect.

The credentials object contains the username, database, and session ID. This object is required for all subsequent requests to the server (password not required when used).

1. Since the authentication method confirmed the path is correct, other methods can be used as well. For example, you can request _GetCountOf_ from my.geotab.com. Pass the _credentials_ property and send the contents of _credentials_ returned in step 2.
2. The _GetCountOf_ result is returned, which in this case is 1234.

### Example 2: Request redirected to correct server

In this example, an authentication request is made to my.geotab.com to log in to database "_acme"_. Here, the server's response confirms the database is on my23.geotab.com, and subsequent requests are redirected to my23.geotab.com.

1. The Authenticate method is requested using the credentials provided.
2. The response from the server contains two properties — path and credentials.

The path will either contain the URL of a server, or the string value _ThisServer_. Since the database _acme_ in this example is on my23.geotab.com, it returns "my23.geotab.com". This means that all subsequent requests should be directed to my23.geotab.com.

The credentials object contains the username, database and session ID. This object is required in all subsequent requests to the server (password not required when used).

1. Since the authentication method redirected the _acme_ log in request to the my23.geotab.com server, other methods can be used as well. For example, you can request _GetCountOf_ from my23.geotab.com. Pass the _credentials_ property, and send the contents of _credentials_ returned in step 2.
2. The _GetCountOf_ result is returned, which in this case is 1234.

![]({{site.baseurl}}/software/guides/concepts_0.png)

### Example 3: Requests with missing databases or with expiring credentials

The examples above demonstrate how to specify which server to request authentication from. However, there are two additional scenarios to consider:

1. The database has moved to a different server.
2. The credentials returned will eventually expire.

In these scenarios, the next API request will fail using the error object below:

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

If the errors contain an object with name _"InvalidUserException"_, the authentication process must be repeated. This will indicate what the new server is and provide a new credentials object. If the authentication process returns an error, the user was likely changed, in this case another user will be required for the login.

## Limits

At Geotab, we work hard to create an open and flexible API that encourages creativity and innovation. We do this by providing tools to create powerful applications, integrations, and Add-ins, while maintaining overall system health and quality. Result and rate limits are intended to encourage API developers to use appropriate APIs for their use cases, and to safeguard against unbounded requests.

### Rate limits

#### Authenticate

No more than **10 requests-per-minute** are permitted for a user. Both successful and unsuccessful Authentication requests count towards the limit.

Credentials with a password instead of, or combined with a session ID, must be authenticated. This ensures that each request where credentials are provided, are counted towards the user's authentication limits.

#### GetFeed

The GetFeed request has two common use cases:

1. Receiving a constant feed of near real-time data reported by devices (GPS), or calculated by MyGeotab (Trips History).
2. Generating large aggregate reports during an off-peak interval.

For constant polling, we recommend polling for data at 30-second intervals. However, we understand that 30 seconds may be too infrequent for the rate of data generated by some vehicles, so we created rate limits. A rate limit of **1 request-per-second** is applied to `GetFeed` requests for each supported entity type.

#### CreateDatabase

Typically used by Integrators, CreateDatabase provides a way to dynamically provision customer databases. Limits of 15 requests per minute, 100 requests per hour, and 800 requests per day are applied.

#### OverLimitException

When a rate limit is exceeded, an OverLimitException error is returned. A header (`Retry-After`) is also set with time remaining for the limit to reset.

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
If a rate limit is applied to an API, with a successful JSON-RPC response, headers are set with rate limit information:

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

> For legacy compatabilty, `GetFeed` does not generate an exception when the limit provided is over 50,000. Rather, it implicitly limits results to 50,000 records.

#### Get

The entities listed below have `Get` limits of 50,000 results:

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

Please note that MyGeotab also records various other status data (e.g. engine data) from the vehicle and these values can be in various units of measure. The units of measure are not provided by Geotab in all cases. Refer to the applicable [SAE](http://standards.sae.org/automotive/) standard of the specific code for the associated unit of measure.

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

If the system entities do not have any properties then they are specified as strings with their ID's name. For example the source "Obd" will be identified as "SourceObdId".

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

Depending on the process, for some entities like diagnostics, it may be desirable to maintain a local cache from which the status/fault data can be populated. In this case it will be necessary to refresh the cache when the cache is missing the required entity making an API call. This will allow the API to get the required entity and add it to the local cache. An example of maintaining a diagnostic cache would occur when consuming a feed of data from the API. An example of this process is included in both the [.Net](https://github.com/Geotab/sdk-dotnet-samples/tree/master/DataFeed) and [JavaScript DataFeed](../../js-samples/dataFeed.html) examples.

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

Let's assume that it takes 100 milliseconds for this call round trip (the time from sending request to receiving the response), including 40 milliseconds to send the request, 20 ms to process the data on the server, and 40 ms for the response to be returned. [Google's SPDY research project](http://dev.chromium.org/spdy/spdy-whitepaper) [white paper](http://dev.chromium.org/spdy/spdy-whitepaper) states that "_typical header sizes of 700-800 bytes is common_". Based on this assumption, we pay a 750 byte cost when making a request. From the example, there would be 80 ms of network overhead and 750 bytes of HTTP overhead, this is accepted as the "cost of doing business" when making a request over a network.

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

**Can I use a search in a multicall?**

Yes, it is possible to use a search in a multicall.

**When shouldn't I use a multicall?**

1. If you need to make a few requests that are long running and return a large amount of data, it may be preferable to make the requests singularly instead of running one multicall request that continues for a very long time before completion. When the connection is held open for a long period of time, you become increasingly susceptible to network interference that can terminate the request.
2. Manipulating data (Add, Set, Remove) via a multicall is not recommended. A multicall is not transactional. Therefore, if call 1 of 3 to Add succeeds and call 2 of 3 fails, call 3 of 3 will not be executed and call 1 would not be rolled back.

**How many request can I put in a multicall?**

There is no limit on the number of requests that can be made in a multicall. When making a large number of requests it may be desirable to "chunk" the requests into several requests of a smaller and more manageable size.

**What if the call doesn't return a result?**

The index in the array of results will have a **null** value.


# PropertySelector BETA

`PropertySelector` is a new optional property that can be set in the [Get]({{site.baseurl}}/sdk/software/api/reference/#Get1) and [GetFeed]({{site.baseurl}}/sdk/software/api/reference/#GetFeed1) methods to selectively return specified properties for entities in a result set for lightweight object retrieval. 

## Creating a PropertySelector Object

| **Property** | **Description** |
| --- | --- |
| Fields | An array of string, consisting of the properties for a given [Entity]({{site.baseurl}}/sdk/software/api/reference/#Entity) type for which we want to include/exclude in the entities of the result set. Refer to the [reference]({{site.baseurl}}/sdk/software/api/reference/) page for all the properties supported for a given `Entity`. Note that the properties of a inheriting class will also be supported. (For example, [Go9]({{site.baseurl}}/sdk/software/api/reference/#Go9) is child of [Device]({{site.baseurl}}/sdk/software/api/reference/#Device), so the properties defined for `Go9` can be supplied to `Fields`.) |
| IsIncluded | A boolean, which if `true`, will include the properties of a given [Entity]({{site.baseurl}}/sdk/software/api/reference/#Entity) type defined in `Fields` for the entities of the result set. Otherwise, if this boolean is false, the properties defined in `Fields` will be excluded.

> In the [sample]({{site.baseurl}}/software/api/runner.html#sample:get-lightweight-device-response) API call for getting a result set of lightweight `Device` objects, we only want our `Device` objects to have the properties `ActiveTo` and `Id`, so we set our `PropertySelector` object like so: 
```json
"propertySelector": 
    {
        "fields": ["ActiveTo", "Id"],
        "isIncluded": true
    }
```

**Response**
```json
[
    {
        "activeTo": "2050-01-01T00:00:00.000Z",
        "id": "b1"
    },
    {
        "activeTo": "2050-01-01T00:00:00.000Z",
        "id": "b2"
    }
]
```

**C# Example**
```csharp
    var propertySelector = new PropertySelector
    {
        Fields = new List<string> { nameof(Device.ActiveTo), nameof(Device.Id) },
        IsIncluded = true
    };
    var results = await api.CallAsync<List<Device>>("Get", typeof(Device), new { propertySelector });
```

## List of Supported Entities

Below is a list of entities that are support the PropertySelector functionality.

| **Entity** | **Supported in Release** | **Notes**
| --- | --- | -- |
| [Device]({{site.baseurl}}/software/api/reference/#Device) | 8.0 | The following properties are not supported: `IsExternalDevicePowerControlSupported`, `DevicePlans`, `EngineHours`, `CustomFeatures`, `DeviceFlags`, `IsAuxInverted`, `IsAuxIgnTrigger`, `IsHarshBrakeWarningOn`, `Channel`, `DeviceType`, `ProductId`, `RegisterDeviceResultLite`, `Autogroups`, `AuxWarningSpeed`, `EnableAuxWarning`, `FrequencyOffset`, `TrailerId`
| [User]({{site.baseurl}}/software/api/reference/#User) | 8.0 | `IsEULAAccepted` and `AcceptedEULA` are tied to each other, so if either property is set to be returned based on the `PropertySelector` logic, both properties will be returned.
| [Group]({{site.baseurl}}/software/api/reference/#Group) | 8.0 | The following properties are not supported: `IsDefectList`, `IsGlobalReportingGroup`, `Parent`
| [Rule]({{site.baseurl}}/software/api/reference/#Rule) | 8.0 | N/A 
| [LogRecord]({{site.baseurl}}/software/api/reference/#LogRecord) | 8.0 | `DateTime` must be a part of the PropertySelector object and must be included. 
| [Trip]({{site.baseurl}}/software/api/reference/#Trip) | 9.0 | N/A 