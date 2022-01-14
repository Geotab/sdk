---
layout: page
permalink: /myadmin-sdk/guides/using-with-dotnet/
title: Using with .NET
---
## Overview
The .NET SDK tools facilitate the integration of MyAdmin with your own .NET software. All communication to MyGeotab services occurs through HTTPS and the data is serialized in [JSON](http://www.json.org/) format. The provided .NET library automatically handles both serialization and deserialization of JSON into MyAdmin objects.

### Packages
The inclusion of the Geotab.Internal.MyAdmin.APILib and Geotab.Checkmate.ObjectModel packages allows you to interact with the API. The nuget packages include tools to assist with serialization and deserialization of JSON and provide definitions for MyAdmin object classes. The packages can be found on the NuGet website:

[Geotab.Internal.MyAdmin.APILib](https://www.nuget.org/packages/Geotab.Internal.MyAdmin.APILib)

[Geotab.Checkmate.ObjectModel](https://www.nuget.org/packages/Geotab.Checkmate.ObjectModel)

## Step 1: Initialization & Authentication
The MyAdminInvoker class contains methods that facilitate calls to API functions. To access the invoker and object classes, include the following references in your code:
```cs
using MyAdminApiLib.Geotab.MyAdmin.MyAdminApi;
using MyAdminApiLib.Geotab.MyAdmin.MyAdminApi.ObjectModel;
```
Then, create an instance of the API invoker in your code:
```cs
MyAdminInvoker api = new MyAdminInvoker("https://myadminapi.geotab.com/v2/MyAdminApi.ashx");
```
The parameters required by each method are passed using a Dictionary <string, object>. For example, to authenticate with the API, pass a valid username and password to call the Authenticate method using the code below:
```cs
Dictionary<string, object> parameters = new Dictionary<string, object> { { "username", "user@geotab.com" }, { "password", "<password>" } };


ApiUser apiUser = await api.InvokeAsync<ApiUser>("Authenticate", parameters);
```
The Authenticate method authenticates with the MyAdmin API and, if successful, returns an ApiUser object. The ApiUser object contains the SessionId and UserId — used as the API key for all other methods.

## Step 2: Making Calls
Once authenticated, you can call other methods by passing the API key, Session ID, and any parameters required by the method.
```cs
// apiKey and sessionId were obtained from ApiUser object returned by Authenticate
Dictionary<string, object> parameters = new Dictionary<string, object> { { "apiKey", apiKey }, { "sessionId", sessionId }, { "serialNo", "G63XXXXXXXX8" } };


ApiDeviceInstallResult installResult = await api.InvokeAsync<ApiDeviceInstallResult>("LookupDevice", parameters);
```
## More Information
For more information, see [.NET examples](../../code-samples/dotnet-examples).