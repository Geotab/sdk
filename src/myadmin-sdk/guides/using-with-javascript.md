---
layout: page
permalink: /myadmin-sdk/guides/using-with-javascript/
title: Using with JavaScript
---
## Overview
All communication with our services is done over HTTPS with data serialized in JSON format. A request consists of three properties:
```
id: -1 - this ID is ignored
method: '<method name>'
params: [parameters required by the method serialized as JSON]
```
Before calling any API methods, a call must be made to the Authenticate method to obtain the user’s API key and session ID. All method calls require a `params` object which contains the values for the parameters required by the methods. The following sections describe how to build the `params` object to authenticate and call an API method. The myAdminApi.js utility is provided to help with calling MyAdmin API methods. It can be downloaded [here](https://raw.githubusercontent.com/Geotab/sdk/master/src/myadmin-sdk/myAdminApi.js).

## Step 1: Initialization & Authentication
The call to Authenticate is made as follows:
```javascript
var apiKey,
    sessionId,
    logonParams = {
        username: 'user@geotab.com',
        password: '<password>'
};
myAdminApi().call('Authenticate', logonParams, function(user) {
    apiKey = user.userId;
    sessionId = user.sessionId;
});
```
In the above example, the code passes the user name and password in the `logonParams` object and provides a callback function to be executed following a successful login. The callback function receives an ApiUser object which contains, among other properties, the user’s API key (userId) and session ID. See the [Reference](../../api/reference) documentation for more information on the `Authenticate` method and the `ApiUser` object.

## Step 2: Making Calls to Other Methods
Once authenticated, all other API methods can be called using the API key and Session ID obtained in the previous example. For example, the following code will return a list of available device plans:
```javascript
var devicePlan
Params = {
    apiKey: apiKey,
    sessionId: sessionId
};
myAdminApi().call('GetDevicePlans', devicePlanParams, function(devicePlans) {
    // Do something with the array of ApiDevicePlan
});
```
The result object in the above code contains an array of ApiDevicePlan.

## More information
For more information, see the [JavaScript Examples](../../code-samples/javascript-examples) section.