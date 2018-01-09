# Extract Mileage

 This example demonstrates how to get mileage for all vehilces using the MyGeotab API and save to a CSV or XML file.

Steps:
1. Create Geotab API object from supplied arguments and authenticate.
2. Get the odometer readings of each device and a VehicleWithMileage object.
3. Output the information to a CSV or XML file.

## Prerequisites
The sample application requires:

- [dotnet core 2.0 SDK](https://dot.net/core) or higher

## Getting started

```
> git clone ... mg-sdk-dotnet-samples
> cd mg-sdk-dotnet-samples
> cd ExtractMileage
> dotnet run "my.geotab.com" "database" "user@email.com" "password" "mileage.csv"
```
