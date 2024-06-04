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

When the GeotabApi object has been set up, the first call to a method triggers the callback to get the credentials. Once the credentials have been entered by the user, authenticationCallback is called with the provided credentials, and then the original method result is retrieved. After this method has been called, the server, database, username, and session are all stored in localStorage.

## Using the GeotabApi object

The following example shows how to use the GeotabApi object to request the location of a vehicle:

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
callbackSuccess | The function that will be called back if the API call succeeds. The callback function has a single argument called “result” that contains any results returned by the API call.
callbackError | The function that will be called back if the API call fails. The callback function has a single argument that contains error information.

## MultiCall

A MultiCall is a way to make several API calls against a server with a single HTTP request. This eliminates potentially expensive round trip costs. When making multiple calls, we recommend leveraging MultiCalls as much as possible. For more information about multicalls, see https://geotab.github.io/sdk/software/guides/concepts/#multicall. Additionally, you can find a JS MultiCall example here: https://geotab.github.io/sdk/software/guides/concepts/#api-client-support.  

## A note about state

The GeotabApi object is designed to be stateless. The main reason for this is that a call could fail at any point due to session expiry or the database moving. The authenticationCallback will automatically be called when this situation is detected. The application will then prompt (or read from file etc.) for the required credentials. The call that was being attempted will resume when new credentials are received. This also means that there is no concept of being "logged in" or “logged out” of the server.

# Next steps

Once you have a basic understanding of how *api.js* and the JavaScript API work and want to learn more, you can take a look at our examples [here](../../js-samples).

