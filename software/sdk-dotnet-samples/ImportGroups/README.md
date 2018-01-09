# Import Groups

This is a console example of importing groups from a .csv file.
 
Steps:
1. Process command line arguments: Server, Database, Username, Password, Input File and load .csv file.
2. Create Geotab API object and Authenticate.
3. Import groups into database.

> the .csv file included in this project is a sample, you may need to change entries (such as group names) for the example to work.

### CSV layout

Parent Group Name | New Group Name

```csv
# importGroups.csv
# Structure: <parent group name>,<new group name>
# Both <parent group name>,<new group name> must be unique 
# -------------------------------------------------------------------------
# lines beginning with '#' are comments and ignored
# 
# create 2 groups under 'Organization'
# -------------------------------------------------------------------------
Organization,DriverGroup
Organization,VehicleGroups
```

## Prerequisites
The sample application requires:

- [dotnet core 2.0 SDK](https://dot.net/core) or higher

## Getting started

```
> git clone ... mg-sdk-dotnet-samples
> cd mg-sdk-dotnet-samples
> cd ImportGroups
> dotnet run "my.geotab.com" "database" "user@email.com" "password" "importGroups.csv"
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