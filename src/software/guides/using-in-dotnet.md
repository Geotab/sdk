---
layout: page
permalink: /software/guides/using-in-dotnet/
title: Using in .NET
---

The .NET SDK tools provide an easy way to integrate MyGeotab into .NET software. All of the communication to Geotab’s services is accomplished over HTTPS with data serialized in [JSON](http://en.wikipedia.org/wiki/JSON) format. The .NET library provided will automatically handle the JSON serialization and deserialization into MyGeotab objects.

## Nuget package

The [nuget package](https://www.nuget.org/packages/Geotab.Checkmate.ObjectModel/) is an SDK library for accessing MyGeotab customer databases. It is a convenient "wrapper" around Geotab’s HTTP/JSON API to allow developers focus on writing code instead of moving data over the wire. It includes tools to assist authenticating against Geotab’s servers, automatically serializing/deserializing JSON, and providing definitions for Checkmate object classes.

Please remember to regularly check for Geotab.Checkmate.ObjectModel nuget package updates. Ideally, your integration should use the same Geotab.Checkmate.ObjectModel nuget package version as the one that your database is on.

> Quick start in [API Clients](../../api/clients)

## API class

### Step 1: Initialization & authentication

In order to have access to the API class, add the following to the file’s includes section:

```csharp
using Geotab.Checkmate;
using Geotab.Checkmate.ObjectModel;
```

An instance of API can now be constructed to be used in the code. For the most basic use case, all the data that is needed is user credentials and a database name:

```csharp
var api = new API(userName, password, null, databaseName, server);
```

At this point there has not been any communication with Geotab’s servers. In order to make calls to Geotab’s API, an authentication call must be made:

```csharp
await api.AuthenticateAsync();
```

When the call is made to Geotab’s servers to authenticate, a token is returned for security. Behind the scenes, the Authenticate call makes a JSON-RPC request to Geotab’s "Authenticate" method. The resulting security token and server information are stored in order to make further calls to the API.

> For more information regarding authentication, please review the [Authentication](../concepts/#authentication) documentation.

### Step 2: Making calls

When authenticated, calls are made to the API by invoking the `Call` method of the API class.

The example below illustrates how to make a generic call to get all devices in the system.

`List<Device> devices = await api.CallAsync<List<Device>>("Get", typeof(Device));`

In the example below it is shown how to delete a device using the generic "Remove" method. Notice that it is not required to send all of the device’s information to remove it, the device’s id is sufficient:

```csharp
await api.CallAsync<object>("Remove", typeof(Device), new {
    entity = new Device {
        Id = "b1a34"
    }
});
```

The last parameter to this Call method is an [anonymous object](http://msdn.microsoft.com/en-us/library/bb397696.aspx) which contains the parameters for the method (please review the [API reference](../../api/reference/#Remove1) to see which parameters the method expects, and whether the parameters are required or optional). The parameter order is not significant, and it is acceptable to omit optional parameters. Optional parameters will revert to their default values, typically "null" or “false” values.

The API class automatically handles databases that are moved to different servers in the federation and expired tokens (token are typically valid for 2 weeks) by automatically re-authenticating and continuing.

### Example code

The following is a simple console app that will output the latitude and longitude of each device in a list of devices:

```csharp
// Create the API object and authenticate
public static async Task Main(string[] args)
{
    // Create the API object and authenticate
    var api = new API("bob@geotab.com", "password", null, "demo", "server");
    await api.AuthenticateAsync();

    // Get all devices
    var devices = await api.CallAsync<List<Device>>("Get", typeof(Device));
    Console.WriteLine("SerialNumber\tLatitude\tLongitude");
    foreach (Device device in devices)
    {
        // Get the Device Status Info which contains the current latitude and longitude for this device
        var results = await api.CallAsync<List<DeviceStatusInfo>>("Get", typeof(DeviceStatusInfo), new
        {
            search = new DeviceStatusInfoSearch
            {
                DeviceSearch = new DeviceSearch
                {
                    Id = device.Id
                }
            }
        });

        if (results.Count <= 0)
        {
            continue;
        }

        DeviceStatusInfo deviceStatus = results[0];

        // Print the results to the console
        Console.WriteLine(device.SerialNumber + "\t" + deviceStatus.Latitude + "\t" + deviceStatus.Longitude);
    }
}
```

> Hint: async main method requires [C# 7.1](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-7-1).

After entering your credentials into the API constructor, this example will produce results similar to this in your command prompt window.

```
> dotnet run
SerialNumber    Latitude        Longitude
G70000000001    43.4371071      -79.7124329
G70000000002    43.3683701      -79.7784042
G80000000003    43.4620934      -79.6879883
```

## Next steps

Once you have a basic understanding of how the .NET SDK works, we recommend reviewing the examples that we have created [here](https://github.com/Geotab/sdk-dotnet-samples).
