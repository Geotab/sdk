---
layout: page
title: Clients
permalink: /software/api/clients/
---
The MyGeotab API is language agnostic and can be accessed from languages that support HTTPS requests and JSON.

There are a number of language specific API clients that roll-up some common functionality such as authentication, session management, deserialization, etc. making it easier to hit the ground running in your language of choice.

## .Net

### Quick Start

Install the [NuGet package](https://www.nuget.org/packages/Geotab.Checkmate.ObjectModel/) from the package manager console:

`Install-Package Geotab.Checkmate.ObjectModel`

Please remember to regularly check for updates to the Checkmate DLL. Ideally, your integration should use the same Checkmate DLL version as the one that your database is on. 

**Using it in code**

```csharp
var api = new API("user@example.com", "password", null, "database");
await api.AuthenticateAsync();

var devices = await api.CallAsync<List<Device>>("Get", typeof(Device), new { resultsLimit = 1 });
```

## Java

### Quick Start

Add the [maven dependency](https://mvnrepository.com/artifact/com.geotab/java-sdk)

**Using it in code**

```java
Credentials credentials = Credentials.builder()
  .database("database")
  .userName("user@example.com")
  .password("password")
  .build();

GeotabApi api = new GeotabApi(credentials);

LoginResult loginResult = api.authenticate();

AuthenticatedRequest<?> request = AuthenticatedRequest.authRequestBuilder()
    .method("Get")
    .params(SearchParameters.searchParamsBuilder()
      .credentials(loginResult.getCredentials()) 
      .typeName("Device")
      .build())
    .build();

Optional<List<Device>> result = api.call(request, DeviceListResponse.class);
```

## Javascript

### Quick Start

Install the Bower package from the command line:

$ `bower install --save mg-api-js`

**Using it in code** (more on [github - MyGeotab API wrapper for both clientside JavaScript and NodeJS](https://github.com/Geotab/mg-api-js))

```js
var api = GeotabApi(function (authenticateCallback) {
    authenticateCallback('my.geotab.com', 'database', 'user@example.com', 'password', function(err) {
        console.error(err);
    });
});

api.call('Get', {
    typeName: 'Device',
    resultsLimit: 1
}, function (result) {
    if (result) {
        console.log(result);
    }
}, function (err) {
    console.error(err);
});
```

## Nodejs

### Quick Start

Install the [NPM package](https://www.npmjs.com/package/mg-api-node#getting-started) from the command line:

`$ npm install mg-api-node --save`

**Using it in code** (more on [github - nodejs client for the MyGeotab API](https://github.com/Geotab/mg-api-node))

```js
var api = new API('user@example.com', 'password', 'database');
api.authenticate(function(err, result) {
  if(err){
    console.log('Error', err);
    return;
  }

  api.call('Get', {
    typeName: 'Device',
    resultsLimit: 1
  }, function(err, devices) {
    if(err){
      console.log('Error', err);
      return;
    }
    console.log('Devices', devices);
  });
});
```

## Python

### Quick Start

Install the library and command line tool:

`$ pip install mygeotab`

**Using it in code**  (more on [github - Python client for the MyGeotab SDK](https://github.com/Geotab/mygeotab-python))

```py
>> import mygeotab
>> api = mygeotab.API(username='user@example.com', password='password', database='database')
>> api.authenticate()

>> api.get('Device', resultsLimit=1)
```

## PHP

### Quick Start

Install the composer package from the command line:

`$ composer require geotab/mygeotab-php`

**Using it in code**  (more on [github - Php client for the MyGeotab SDK](https://github.com/Geotab/mygeotab-php))

```php
$api = new Geotab\API("user@example.com", "password", "database", "my.geotab.com");
$api->authenticate();

$api->get("Device", ["resultsLimit" => 1], function ($results) {
    var\_dump($results);
}, function ($error) {
    var\_dump($error);
});
```
