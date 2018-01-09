# Import Users

This is a console example of importing users from a .csv file.

Steps:
1. Process command line arguments: Server, Database, Username, Password, Input File and load .csv file.
2. Create Geotab API object and Authenticate.
3. Create users.
4. Add organization and security nodes to the users.
5. Create Geotab API object and Authenticate.
6. Import users into database.

> the .csv file included in this project is a sample, you may need to change entries (such as group names or password complexity) for the example to work.

### CSV layout

email | password | data access | secuity cleance name | first name | last name

```csv
# importUsers.csv
# Structure: User (Email), Password, Data Access,Security Clearance,First Name,Last Name
# -------------------------------------------------------------------------
# lines beginning with '#' are comments and ignored

# Basic authentication users
BasicUser@company.com,5bJknaJPKJSKP62Z,Entire Organization,Administrator,Basic,User
```

## Prerequisites
The sample application requires:

- [dotnet core 2.0 SDK](https://dot.net/core) or higher

## Getting started

```
> git clone ... mg-sdk-dotnet-samples
> cd mg-sdk-dotnet-samples
> cd ImportUsers
> dotnet run "my.geotab.com" "database" "user@email.com" "password" "importUsers.csv"
```
