---
layout: page
permalink: /myadmin-sdk/guides/getting-started/
title: Getting Started
---

The MyAdmin API is available for Geotab Resellers and Partners. Geotab provides helper libraries for C# and JavaScript; however, any language or application capable of making HTTP requests can access the full functionality of the MyAdmin API. API users must have the **MyAdminApiUser** role. It is recommended that Resellers and Partners access the API with a new, dedicated account; however, any MyAdmin account may be used. A new account can be registered at <https://myadmin.geotab.com>, after which the Reseller or Partner contacts their Geotab Account Manager to add the MyAdminApiUser role to their account.

<div class="alert alert-primary"><strong>NOTE</strong> The examples and source code presented in the MyAdmin SDK require a modern browser. We recommend using the latest Chrome, Firefox or Edge browser.</div>

## Accessing the API

The API is accessed via HTTPS by sending requests to the following URL:

`https://myadminapi.geotab.com/v2/MyAdminApi.ashx`

The API supports POST requests only.

### Test Environment

A sandbox environment is a testing environment that is available to developers who wish to test their application before making API calls to the live system. The test environment can be accessed at:

`https://myadminapitest.geotab.com/v2/MyAdminApi.ashx`

A few methods are not supported in the test environment and will throw exceptions when called. For more information, see the [Reference](../../api/reference) section.

<div class="alert alert-danger"><strong>WARNING</strong>

Data in the sandbox environment is volatile. API developers should not expect data entered into the sandbox environment to persist for any amount of time.
</div>

## Authenticating with the API

A successful response is a JSON object where the result property is information about the session, including the user ID and a session ID. It looks similar to this:

`{"result":{"userId":"x12345x2-172x-4d04-8xx2-xx9e088c5xxx","sessionId":"cff4e88b-931b-4363-ae4f-35b5ed169133","lastLogonDate":"2013-11-04T15:01:00.000Z","roles":[{"comments":"Third Party Integrator role","name":"Third-Party-Integrator"}],"name":"user@geotab.com"}}`

The API key is found in the `userId` property and the session ID is found in the `sessionId` property. Both of these properties must be included on all other API calls. If the session ID has expired, the API will return a `SessionExpiredException` which requires a call to Authenticate to get the new session ID. For more information, see the [Reference](../../api/reference) section. [JavaScript](../../code-samples/javascript-examples) and [.NET](../../code-samples/dotnet-examples) examples have been provided to help you get started.

## What’s next?
There are several other items in the SDK to help you get started:

[Concepts](../concepts) — Be sure to read through this before building your application.

[Using with JavaScript](../using-with-javascript)

[Using with .NET](../using-with-dotnet)

[API Reference](../../api/reference) — The reference documentation that explains what each API call does and documents the parameters and results for each call.