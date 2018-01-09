# Get Fuel Tax Details (IFTA)

 This example demonstrates how to get fuel tax details (IFTA) for all vehilces in a time interval.

Steps:
1. Create API from command line arguments.
2. Authenticate the user.
3. Iterate trhough a list of devices.
4. Retrieve fuel tax details for each device over a given time interval.
5. Trim each detail to the time interval.

## Prerequisites
The sample application requires:

- [dotnet core 2.0 SDK](https://dot.net/core) or higher

## Getting started

```
> git clone ... mg-sdk-dotnet-samples
> cd mg-sdk-dotnet-samples
> cd GetFuelTaxDetails
> dotnet run "database" "user@email.com" "password"
```
