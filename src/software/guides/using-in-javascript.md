---
layout: page
permalink: /software/guides/using-in-javascript/
title: Using in JavaScript
---

## GeotabApi object

Geotab provides JavaScript developers with easy to use and consistent access to our API through the [GeotabApi](https://github.com/Geotab/mg-api-js) object. The GeotabAPI provides authentication handling, asynchronous method calling, error handling and multi-call support.

> Quick start in [API Clients]({{site.baseurl}}/software/api/clients/#javascript)

## Creating a GeotabApi object

When creating the GeotabApi object, prepend a reference to the file *api.js* before the main JavaScript code:

```html
<script type="text/javascript" src="api.js"></script>
<script type="text/javascript">
    // Custom code goes here
</script>
```

In the main JavaScript code, initialize the GeotabApi object by providing the constructor with a callback function to handle the authentication:

```javascript
var api = GeotabApi(function (authenticationCallback) {
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
});
```

When the GeotabApi object has been set up, the first call to a method will trigger the callback to get the credentials. Once the credentials have been entered by the user, the authenticationCallback will be called with the entered credentials. Then the original method result will then be retrieved. After this method has been called, the server, database, username, and session are stored in localStorage.

## Using the GeotabApi object

The following example demonstrates how to use the GeotabApi object to request the location of a vehicle.

```javascript
// Sample API invocation retrieves all "Device" objects
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
});
```

## The Call method arguments

The Call method is used to "Call" any of the APIs that the MyGeotab SDK provides. It takes 4 arguments:

**Argument** | **Description**
--- | ---
method | The API method that is being called. For example, "Get" or “GetCountOf”. See the API reference for the full set of methods.
params | The parameter object that the API method expects. For example: `{ typeName: "DeviceStatusInfo", search { deviceSearch: { id: deviceId } }`
callbackSuccess | The function that will be called back when the API call succeeds. The callback function has a single argument called “result” that will contain any results returned by the API call.
callbackError | The function that will be called back should the API call fail. The callback function has a single argument that will contain error information.

## A note about state

The GeotabApi object is designed to be stateless. The main reason for this is that a call could fail at any point due to session expiry or the database moving. The authenticationCallback will automatically be called when this situation is detected. The application will then prompt (or read from file etc.) for the required credentials. The call that was being attempted will resume when new credentials are received. This also means that there is no concept of being "logged in" or “out” of the server.

# Working with JSONP

Creating a [JSONP](http://en.wikipedia.org/wiki/JSONP) request is similar to creating a HTTP GET request — but with one minor change. An additional parameter that specifies the callback in the requested URL will be required to be passed as follows:

`https://my.geotab.com/apiv1/GetVersion?JSONP=jsonpCallback`

The response will be in the following format with your current version number:

```json
{"result":"5.7.1508.414"}
```

In a JavaScript application a function to handle the JSONP callback will need to be set up.

```javascript
window.jsonpCallback = function(data) {
    if (data.result) {
        alert(data.result);
    } else {
        alert(data.error);
    }
};
```

When the examples are downloaded, the GeotabApi object has an option to use JSONP requests. In this way the examples can be run without placing them on a Web server.

# Next steps

Once you have a basic understanding of how *api.js* and the JavaScript API work and want to learn more, you can take a look at our examples [here](../../js-samples).

