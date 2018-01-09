# Import Devices

This is a console example of importing devices from a .csv file.

Steps:
1. Process command line arguments: Server, Database, Username, Password, Options and Load .csv file.
2. Create Geotab API object and Authenticate.
3. Import devices into database.

> the .csv file included in this project is a sample, you may need to change entries (such as group names) for the example to work.

### CSV layout
description | serial number | pipe delimited group names

```csv
# importDevices.csv
# Structure: <description>, <serialNumber>, <group1|group2>
# -------------------------------------------------------------------------
# lines beginning with '#' are comments and ignored
Vehicle 1,GT-810-000-0001,Company Group
Vehicle 2,GT-820-000-0002,Company Group
```

## Prerequisites
The sample application requires:

- [dotnet core 2.0 SDK](https://dot.net/core) or higher

## Getting started

```
> git clone ... mg-sdk-dotnet-samples
> cd mg-sdk-dotnet-samples
> cd ImportDevices
> dotnet run "my.geotab.com" "database" "user@email.com" "password" "importDevices.csv"
```

### Parameters
`dotnet run <server> <database> <login> <password> <inputfile>`
Name | Description | Required
--- | --- | ---
server | The server name (Example: my.geotab.com) | true
database | The database name (Example: G560) | true
username | The MyGeotab user name | true
password | The MyGeotab password | true
inputfile | File name of the CSV file to import | true