---
layout: page
permalink: /myadmin-sdk/code-samples/dotnet-examples/
title: .NET Examples
---
Here are a few examples to help you get started.

## Example 1
The first example is a method that authenticates with the MyAdmin API, retrieves a list of device plans, and looks up the details for a specific device.
```cs
async Task Example1()
{
   MyAdminInvoker api = new MyAdminInvoker("https://myadminapi.geotab.com/v2/MyAdminApi.ashx");

   Dictionary<string, object> parameters = new Dictionary<string, object>
   {
      {"username", "user@geotab.com"},
      {"password", "<password>"}
   };

   ApiUser apiUser = await api.InvokeAsync<ApiUser>("Authenticate", parameters);
    
   Guid apiKey = apiUser.UserId;
   Guid sessionId = apiUser.SessionId;

   parameters = new Dictionary<string, object>
   {
      {"apiKey", apiKey},
      {"sessionId", sessionId}
   };
    
   ApiDevicePlan[] devicePlans = await api.InvokeAsync<ApiDevicePlan[]>("GetDevicePlans", parameters);

   Console.WriteLine("Device Plans");
   Console.WriteLine("Level\tName");
    
   foreach (ApiDevicePlan devicePlan in devicePlans)
   {
      Console.WriteLine("{0}\t{1}", devicePlan.Level, devicePlan.Name);
   }


   Console.Write("\nDevice Information\n");


   parameters = new Dictionary<string, object>
   {
      {"apiKey", apiKey},
      {"sessionId", sessionId},
      {"serialNo", "G6XXX0XXXD08"}
   };
   ApiDeviceInstallResult device = await api.InvokeAsync<ApiDeviceInstallResult>("LookupDevice", parameters);


   Console.WriteLine("Firmware Version: {0}", device.FirmwareVersion);
   Console.WriteLine("Comments: {0}", device.Comments);
   Console.WriteLine("Last Server Communication: {0}", device.LastServerCommunication.ToString());
   Console.WriteLine("Possible Issues: {0}", device.PossibleIssues);


   // Example Output:
   // Device Plans
   // Level    Name
   // 3        Base Mode
   // 99       Suspend Mode
   // 9999     Terminate Mode
    
   // Device Information
   // Firmware Version: 101.2.85
   // Comments: No Data from Device
   // Last Server Communication:  2021-07-23 11:20:03 p.m.
   // Possible Issues: No Data from Device

    
}
```
## Example 2
The second example demonstrates how to query the MyAdmin API to get shipping fee information.
```cs
async Task Example2()
{
   MyAdminInvoker api = new MyAdminInvoker("https://myadminapi.geotab.com/v2/MyAdminApi.ashx");

   Dictionary<string, object> parameters = new Dictionary<string, object>
   {
      {"username", "user@geotab.com"},
      {"password", "<password>"}
   };

   ApiUser apiUser = await api.InvokeAsync<ApiUser>("Authenticate", parameters);
    
   Guid apiKey = apiUser.UserId;
   Guid sessionId = apiUser.SessionId;

   parameters = new Dictionary<string, object>
   {
      {"apiKey", apiKey},
      {"sessionId", sessionId},
      {"forAccount", "<account number>"}
   };
   ApiShippingFee[] shippingFees = await api.InvokeAsync<ApiShippingFee[]>("GetShippingFees", parameters);
    
}
```