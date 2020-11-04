---
layout: page
permalink: /software/guides/getting-started/
title: Getting Started
---

The Geotab API (Application Program Interface) is fully available to MyGeotab customers. Geotab provides helper libraries for C# and JavaScript; however, any language or application capable of making HTTP (HyperText Transfer Protocol) requests can access its full functionality. Only valid MyGeotab user credentials are required; special API keys or tokens are not necessary. Nonetheless, we recommend that the API be accessed with a dedicated user.

Note: The examples and source code presented in the Geotab SDK (Software Development Kit) require a modern browser. We recommend using the latest versions of Chrome, Firefox, Internet Explorer or Safari.

## Steps to get started

For testing purposes we recommend setting up a test database and adding test devices to it. Remember, if you decide to test against a production database, data could be accidentally modified or lost.

### Plug in a Geotab GO device

Refer to the "[Geotab Support Documentation](https://www.geotab.com/support-documentation/)" for detailed instructions on how to install a device.

### Register a new database

1. To register, browse to [https://my.geotab.com/registration.html](https://my.geotab.com/registration.html)

2. You can now sign in to my.geotab.com and access your database. Spend some time working through this guide and familiarize yourself with the key components of the application

3. Add your GO device serial number to this database so you can collect some GPS, Engine and other useful data

## What's next?

There are several other items in the SDK to help you get started:

* [Concepts](../concepts/) — Be sure to read through this before building your application

* [Using in Javascript](../using-in-javascript/)

* [Using in .NET](../using-in-dotnet/)

* [Using in Java](../using-in-java/)

* [Support Alerts](https://www.geotab.com/support-alert/) — To view our support notification page and to sign up for the Geotab Newsletter

* [API Reference](../../api/reference) — the reference documentation that explains what each API call does and documents the parameters and results for each call

* [API Runner](../../api/runner.html) — an easy way to "play" with the API. Click on the “Runner” link from the API Reference. It is a tool that can be used to make method calls to a MyGeotab server and see what the results look like

Note: Remember you are not in a sandbox — you are executing API commands against a real database. For example, removing a Device via the API will really delete that device from the database!

* [JavaScript](../../js-samples/) or [.NET](https://github.com/Geotab/sdk-dotnet-samples) Code samples. The JavaScript sample are "live" and can be run against your database hosted on my.geotab.com. The .NET examples are downloadable and can be compiled and run against your MyGeotab server.

For additional support [use the SDK forums](https://helpdesk.geotab.com/forums/21798473-Community-Forum?geotabsdk=forums). A number of solutions have already been provided in the forums. They are monitored by Geotab staff and other users of the SDK.

