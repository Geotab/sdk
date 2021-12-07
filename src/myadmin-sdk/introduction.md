---
layout: page
permalink: /myadmin-sdk/introduction/
title: Introduction
---

The MyAdmin API provides an interface to Geotab’s MyAdmin system allowing Geotab Resellers and Partners to build their own applications to integrate with MyAdmin. Some tasks that can be accessed through the API include:

  * Registering MyAdmin users; 

  * Ordering Geotab products;

  * Querying device information, including installation status, contract information, etc;

  * Managing support tickets with Geotab’s help desk;

  * Creating RMA requests and querying RMA status;

  * Managing user contact information;

  * Integrating third-party data; and

  * Obtaining billing information.

Data exchanged with the MyAdmin API is serialized as JSON, making the API compatible with any platform that can make HTTP requests. A .NET class library consisting of an invoker and all API objects is provided to help .NET developers interface with the API. For more information, see the [Using with .NET](../guides/using-with-dotnet/ "Using with .NET") section. Also, a small JavaScript utility is also provided to facilitate interacting with the API using JavaScript. See the [Using with JavaScript](../guides/using-with-javascript/ "Using with JavaScript") section for more information.

## Next Steps
Access to the MyAdmin API requires a MyAdmin account with the MyAdminApiUser role. It is recommended that Resellers and Partners set up a new, dedicated account to access the API. If desired, the MyAdminApiUser role can be added to an existing MyAdmin account. A new account can be registered at [myadmin.geotab.com](https://myadmin.geotab.com "MyAdmin"), after which Resellers or Partners can contact Geotab to add the MyAdminApiUser role to their account.

Please review the [Getting Started](../guides/getting-started/ "Getting Started") and [Concepts](../guides/concepts/ "Concepts") sections prior to beginning development. [JavaScript](../code-samples/javascript-examples/ "JavaScript Examples") and [.NET](../code-samples/dotnet-examples/ ".NET Examples") examples have been provided to help you get started.