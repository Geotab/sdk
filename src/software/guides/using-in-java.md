---
layout: page
permalink: /software/guides/using-in-java/
title: Using in Java
---

The Java SDK tools provide an easy way to integrate MyGeotab into Java software. All of the communication to Geotab’s services is accomplished over HTTPS with data serialized in [JSON](http://en.wikipedia.org/wiki/JSON) format. The Java library provided will automatically handle the JSON serialization and deserialization into MyGeotab objects.

## Maven dependency

The maven dependency available in [maven repo](https://mvnrepository.com/artifact/com.geotab/java-sdk) is an SDK library for accessing MyGeotab customer databases. It is a convenient "wrapper" around Geotab’s HTTP/JSON API to allow developers focus on writing code instead of moving data over the wire. It includes tools to assist authenticating against Geotab’s servers, automatically serializing/deserializing JSON, and providing definitions for Checkmate object classes.

> Quick start in [API Clients](../../api/clients/#java)

## API class

### Step 1: Initialization & authentication

An instance of API can be constructed to be used in the code. For the most basic use case, all the data that is needed is user credentials and a database name:

```java
Credentials credentials = Credentials.builder()
  .database("db")
  .userName("username@geotab.com")
  .password("TopS3cretPass")
  .build();

GeotabApi api = new GeotabApi(credentials);
```

At this point there has not been any communication with Geotab’s servers. In order to make calls to Geotab’s API, an authentication call must be made:

```java
api.authenticate(); // optional; API will authenticate automatically on first `call()`
```

When the call is made to Geotab’s servers to authenticate, a token is returned for security. Behind the scenes, the Authenticate call makes a JSON-RPC request to Geotab’s "Authenticate" method. The resulting security token and server information are stored in order to make further calls to the API. 

If the `authenticate()` call is not made explicit, then it will be made implicit, behind the scene, before the first api `call()`.

> For more information regarding authentication, please review the [Authentication](../concepts/#authentication) documentation.

### Step 2: Making calls

When authenticated, calls are made to the API by invoking the `call()` method of the API class.

The example below illustrates how to make a generic call to get all devices in the system.

```java
try (GeotabApi api = new GeotabApi(credentials)) {
  LoginResult loginResult = api.authenticate(); // optional; API will authenticate automatically on first `call()`

  AuthenticatedRequest<?> request = AuthenticatedRequest.authRequestBuilder()
        .method("Get")
        .params(SearchParameters.searchParamsBuilder()
          .credentials(loginResult.getCredentials()) // optional; API will set this automatically if not provided, based on the authenticate() result
          .typeName("Device")
          .build())
        .build();

  Optional<List<Device>> result = api.call(request, DeviceListResponse.class);
}
```

In the example below it is shown how to delete a device using the generic "Remove" method. Notice that it is not required to send all of the device’s information to remove it, the device’s id is sufficient:

```java
Device device = Device.builder()
    .id("G9XXXXXXXXXX")
    .build();

try (GeotabApi api = new GeotabApi(credentials)) {
  AuthenticatedRequest<?> removeRequest = AuthenticatedRequest.authRequestBuilder()
        .method("Remove")
        .params(EntityParameters.entityParamsBuilder()
            .typeName("Device")
            .entity(device)
            .build())
        .build();
    
  api.call(removeRequest, VoidResponse.class);
}
```

The `call()` parameters are:
- `request` represents the request details, and it's an instance of `AuthenticatedRequest`
- `response` represents the response and it's an instance of `BaseResponse`; `BaseResponse` holds the actual result type to be deserialized and returned by the `call()` method

The API class automatically handles databases that are moved to different servers in the federation and expired tokens (token are typically valid for 2 weeks) by automatically re-authenticating and continuing.

### Example code

The following is a simple console app that will search Device by serial number:

```java
public static void main(String[] args) throws Exception {
  try {
      if (args.length != 5) {
        System.out.println("Command line parameters:");
        System.out.println("server             - The server name (Example: my.geotab.com)");
        System.out.println("database           - The database name (Example: G560)");
        System.out.println("username           - The Geotab user name");
        System.out.println("password           - The Geotab password");
        System.out.println("serialNumber       - Serial number of the device.");
        System.exit(1);
      }
    
      // Process command line arguments
      String server = args[0];
      String database = args[1];
      String username = args[2];
      String password = args[3];
      String serialNumber = args[4];
    
      Credentials credentials = Credentials.builder()
          .database(database)
          .password(password)
          .userName(username)
          .build();

     try {
       AuthenticatedRequest<?> request = AuthenticatedRequest.authRequestBuilder()
           .method("Get")
           .params(SearchParameters.searchParamsBuilder()
               .credentials(loginResult.getCredentials())
               .typeName("Device")
               .search(
                   DeviceSearch.builder()
                       .serialNumber(serialNumber)
                       .build()
               )
               .build())
           .build();

       Optional<List<Device>> deviceListResponse = api.call(request, DeviceListResponse.class);
       if (!deviceListResponse.isPresent() || deviceListResponse.get().isEmpty()) {
         log.error("Device not found");
         System.exit(1);
       }

       Device device = deviceListResponse.get().get(0);
       log.info("Found {}", device);
     } catch (Exception exception) {
       log.error("Failed to get device: ", exception);
       System.exit(1);
     }

    } catch (Exception exception) {
      log.error("Unhandled exception: ", exception);
    } finally {
      log.info("Press Enter to exit...");
      System.in.read();
    }
}
```

## Next steps

Once you have a basic understanding of how the Java SDK works, we recommend reviewing the examples that we have created [here](https://github.com/Geotab/sdk-java-samples).
