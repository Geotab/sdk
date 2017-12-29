---
layout: page
permalink: /software/guides/using-go-devices/
title: Using GO devices in your software
---

# Who is this for?

Geotab offers an option where the GO device hardware can be used without using the MyGeotab fleet management software. The rich telematics data that is captured by Geotab’s hardware can be utilized in a customized software solution. This document covers the necessary steps to set up a customized solution. Note that the same API is used to retrieve the data from Geotab’s hosting solution and is identical to the regular MyGeotab configuration.

# Overview

Data flows from the GO device to the MyGeotab hosted solution automatically. The first step is to create a database to receive the device’s data (as outlined in [Getting Started](https://my3.geotab.com/sdk/default.html#/gettingStarted)). Once that is complete, the device can be accessed using the APIs defined below.

# Device hierarchy

Different devices can support different features. Device objects are designed to extend from shared objects that have mutual support. In this way, each device object will only have properties that are supported and relevant for its specific type. The image below illustrates how different device types relate to each other and their hierarchy.

![]({{site.baseurl}}using-go-devices_0.png)

# API to add vehicles

Geotab has a robust API that allows third-party developers to create their own applications that use data from Geotab hardware. A partner using Geotab hardware with their own software must use the API to add their Geotab devices to the database, as discussed above.

### Adding a single device

C# API

```
API api = new API(username, password, null, database);
Device device = Device.FromSerialNumber("GT970000006A");
device.Name = "My First Car";
device.Id = api.Call<Id>("Add", typeof (Device), new { entity = device });
```

JavaScript API

```
var newDevice = {
	name: "My First Car",
	serialNumber: "GT970000006A"
};
api.call("Add", {
typeName: "Device",
entity: newDevice
},
function (result) {
    newDevice.id = result;
},
function (errorString) {
    alert(errorString);
});
```

HTTP request

`https://YourServerName.geotab.com/apiv1/Add?typeName=Device&entity={"serialNumber":"GT970000006A","Name":"My First Car"}&credentials={"database":"Your Database Name","userName":"Your User Name","password":"Your Password"}`

The above code samples show a sample call to add a single device to a database using the C# API, JavaScript API and an HTTP request. Please refer to the API documentation for more information.

### Adding Multiple Devices

Both the C# and JavaScript examples contain a comprehensive demonstration of how to add multiple devices to a database. This can be used as a starting point for additional development.

# API to extract data

The simplest way to extract data efficiently and reliably is to create a data feed. There are special methods for this application — see the [Geotab Data Feed](https://my3.geotab.com/sdk/#/dataFeed) documentation. The document contains examples of how to create a data feed in C# and JavaScript.

# Enable in-vehicle features

To enable or disable vehicle features, the appropriate properties of the Device/GoDevice object must be set. For example, to enable beeping before adding the device to MyGeotab, the C# example above would be changed to:

```
API api = new API(username, password, null,  database);

// GoCurve extends from Device and models a GoDevice with beeping features
GoCurve device = (GoCurve)Device.FromSerialNumber("GT970000006A");
device.Name = "My First Car";
device.DisableBuzzer = false;
device.Id = api.Call<Id>("Add", typeof (Device), new { entity = device });
```

Please note that GO devices use a byte value to track parameter changes. If an in-vehicle feature like a speeding alert was enabled, increment the parameterVersion property by 1.

If a device has already been added to MyGeotab it can have features enabled or disabled by first obtaining the device parameters, changing the desired properties, and then calling the ‘Set’ method instead of ‘Add’. The API documentation has a number of examples on how to Get, change, and Set a device.

