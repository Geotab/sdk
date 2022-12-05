---
layout: page
permalink: /software/guides/drive-addins/
title: Drive Add-Ins
---

> Geotab Drive Add-Ins are in preview release and subject to change_

## Overview

The MyGeotab Add-In structure can be applied to the Geotab Drive application as well, providing you the ability to extend the functionality for drivers in an environment with sensors (e.g. geolocation and acceleration) and actuators (e.g. voice alerts and notifications). This environment must also be completely operable in an offline state — so your Add-In must be able to handle having no internet connection, or sleeping in the background of the mobile device.

Please read the [Developing Add-Ins](../developing-addins) guide first before attempting a Geotab Drive Add-In.

All Add-Ins that have been designed to work with MyGeotab will work on the Geotab Drive app as well. Your Add-In will be completely downloaded for all referenced links, images, and scripts upon user login. This way, as the user is authenticated over the internet — they will have your Add-In with them as they travel or disconnect from the network. If your Add-In requires dynamic loading of CSS, images, or JavaScript — these requests will fail if the user does not have a network connection. As such you should either: include all dependencies on creation of the Add-In, explicitly link to them, or provide a fallback if **state.online** returns False. Geotab Drive Add-Ins will also display differently, on both the dashboard and the menu.

 ![]({{site.baseurl}}/software/guides/drive-addins_0.png)

To make an Add-In on the Geotab Drive app, the **item** in your configuration file must have a **path** that equals " **DriveAppLink/**" (including a trailing forward slash). The menuName, url, and version will remain unchanged. For example:

### Listing 1 — Geotab Drive "item" configuration

```json
"items": [{
 "version": "1.0",
 "url": "addinFile.html",
 "path": "DriveAppLink/",
 "menuName": {
  "en": "English Label",
  "fr": "French Label"
 }
}]
```

> The array of **items** also allows you to have one link item in MyGeotab, and another link item to Geotab Drive

There are also 2 additional properties that are optional for the configuration file that control the availability to additional page lifecycle methods, *onStartup* and *onShutdown*. These configuration properties are boolean, they can be set to *true* if they are to be used and *false* when not in use. By default these 2 properties will be set to false if not included in the configuration file.

1. **onStartup:** Startup Add-Ins are executed when a driver logs in to the Drive App for the first time.
2. **onShutdown:** The onShutdown property must be set to true to execute an Add-In when logging out of Geotab Drive.

> More information about these 2 methods can be found in this [document](https://docs.google.com/document/d/1-r9o9epj61WMmGxRveA9SXR86lQGHcxgMh8lsVXGL54/edit?usp=sharing).

e.g.
```json
{
  "name": "addin-name",
  "supportEmail": "mysupport@support.com",
  "version": "1.0.0",
  "items": [{
    "url": "index.html",
    "path": "DriveAppLink/",
    "menuName": {
      "en": "Add-in"
    },
    "icon": "images/icon.svg"
  },
{
    "url": "myGeotabConfigurationPage.html",
    "path": "AdministrationLink/",
    "menuName": {
      "en": "Add-in Configurations"
    },
    "icon": "images/icon.svg"
  }],
  "onStartup": true,
  "onShutdown": true
}
```
## GEOTAB Drive Page Lifecycle Methods
The onStartup and onShutdown properties respectively enable the **startup** and **shutdown** lifecycle methods.

### Startup
When the dashboard page is visible, the startup method is only called once. If the user navigates away from the page then navigates back, the startup method is not called again. If the Add-In requires re-initialization, the user must either log out and log in again, or refresh the application.

```javascript
startup: function (freshApi, freshState, initializeCallback) {
    // Code that needs to be executed on dashboard should go here
    initializeCallback();
}
```

### Shutdown
Shutdown Add-Ins are executed when the final driver logs out of the Drive App. If there are co-drivers, and one of the co-drivers logs out (while other drivers remain logged in to the Drive App), the shutdown Add-In is not executed.

Additionally, the Add-In is expected to return a promise since shutdown Add-Ins have a 15-second time limit to perform their function before the Add-Ins time out and the logout process is completed. The time limit prevents the application from freezing in the middle of the logout process as a result of faulty Add-Ins.

```javascript
shutdown: function (api, state, callback) {
    return new Promise(resolve => {
        // Do work, make any api calls etc
        resolve() // eventually need to call this somewhere so the promise resolves
    });
}
```

## API and State Documentation

Inside the Geotab Drive app, we provide the same _api_ and _state_ properties for your initialize method that we do for our normal Add-Ins. In addition to this, we provide you with properties and methods to allow access to mobile device sensors/actuators. See Table 1 below for a list of the properties and methods provided.

### Table 1 — Geotab Drive additional properties and methods

|   | **Description** | **Parameters** | **Return Type** |
| --- | --- | --- | --- |
| api.mobile.exists() | Returns `true` if Geotab Drive is running within a native application, and `false` if just as a HTML5 web application | None | Boolean |
| api.mobile.getVersion() | If `api.mobile.exists()`, gets the Geotab Drive version from the native application | None | String |
| api.mobile.speak() | If `api.mobile.exists()`, uses the text to speech functionality on the mobile device | String | Void |
| api.mobile.notify() | If `api.mobile.exists()`, will add a notification to the top bar of a native operating system Example: `api.mobile.notify("Fill up your vehicle", "Low on gas")` | String[Message], String[Title], String[Id], [String[JsonData]], [Boolean[Permanent]] | Void |
| api.mobile.geolocation | A navigator object that is similar to HTML5 `navigator.geolocation` Example: `api.mobile.geolocation.getCurrentPosition(function (position) { }, function (error) { }, { enableHighAccuracy: true })` | None | None |
| api.mobile.camera.takePicture() | If `api.mobile.exists()`, will open up a modal with the following options `New Picture` and `Upload`. | None | Promise&lt;octet-stream&gt; |
| api.mobile.dutyStatusLog.getCurrentDrivingLog() | Gets the current DutyStatusLog of the driver. | None | Promise that resolves with a [DutyStatusLog](https://geotab.github.io/sdk/software/api/reference/#DutyStatusLog) object. |
| api.mobile.dutyStatusLog.get() | Gets all of the DutyStatusLogs for the current user | None | Promise that resolves with an array of [DutyStatusLog](https://geotab.github.io/sdk/software/api/reference/#DutyStatusLog) objects. |
| api.mobile.dutyStatusLog.add() | Adds a new DutyStatusLog. **Note:** The log will not be immediately added with this method, it will be synced during the next drive sync cycle. | DutyStatusLog: Object **Required properties**: dateTime: String, device: Object, driver: Object, status: String, origin: String | Promise that resolves with the newly added [DutyStatusLog](https://geotab.github.io/sdk/software/api/reference/#DutyStatusLog) object |
| api.mobile.navigate() | Navigates to default pages on Geotab Drive. | url: String (REQUIRED) String Valid page values: assets, hos, hos/logs, dvir, messaging, inspection, and settings. *Note: param will append the string at the end of the URL path with a comma ‘,’ as a delimeter* | Void |
| api.mobile.store.getItem() | Retrieves an item that has been saved in the global store. | key: String (REQUIRED), jsonParse: boolean. *Note: if jsonParse is set to true it’ll execute a JSON.parse on the data* | Promise that resolves with the requested data as a string unless jsonParse is set to true, in which case it would resolve with a JSON object |
| api.mobile.store.setItem() | Sets data to be stored in the global store. | key: String, data: Any | Void |
| api.mobile.store.removeItem() | Removes the associated data | key: String | Void |
| api.mobile.store.clear() | Clears all stored data | key: String | Void |
| api.mobile.listenTo() | Event listener that executes the specified callback function whenever a change on the state is detected | Callback Function e.g. listenTo((newState) => { console.log(JSON.stringify(newState)); }) | Void |
| state.device | Get the current vehicle that is being connected to the mobile device | None | String |
| state.driving | Mobile device is detected as driving with the current vehicle | None | Boolean |
| state.charging | Mobile device is being powered | None | Boolean |
| state.background | Geotab Drive application is running in the background | None | Boolean |
| state.online | Mobile device has internet access | None | Boolean |
| state.deviceCommunicating | Telematics device is communicating to the server | None | Boolean |
| state.gpsConnected | Mobile device has GPS enabled | None | Boolean |

## Opening third-party applications using URI schema

> Drive app v4.1.0+

It's possible to open different applications like prontoforms or native calendar from add-ins. To do so, it's important to construct correct URI schema string and pass it to `window.open. For example:

```javascript
window.open(uriSchemaString, "_system")
```

Make sure to read carefully documentation of the app you're trying to open to use correct schema. For example, to open twitter application from addin you should use:

```javascript
window.open("twitter://messages", "_system")
```

You can't use just `twitter://` as it's not correct and app won't open. You need to specify which page you want to open: `messages`, `account` etc.

To open webpage you need to use the same method, but with this notation:

```javascript
window.open("https://google.com", "_blank")
```

> `_blank` is important, especially for iOS devices


## Opening Geotab Drive from third-party applications

On Android and iOS devices with the Geotab Drive app installed, a URL handler is registered which can:

* Launch Drive,
* Navigate to a specified page in Drive, and
* Automatically log into Drive with a token (session ID, user name, and database name) retrieved by authenticating against MyGeotab’s API in a third-party app

Deep linking is used to provide a seamless link from a third-party app into the Geotab Drive app.

On the most basic level, launching Geotab Drive to the main screen, can be executed by creating a link to:

    geotabdrive://

From there, it’s possible to automatically login and/or link to specific modules or pages of the Geotab Drive app.

For more information on how to **Automatic Login, Single Sign-on** and **Navigate to Desired Page** on Geotab Drive app, please refer to [Geotab Drive Single Sign-on and Deep Linking](https://docs.google.com/document/d/1RwIaVmQ6VEYF9BIMlM4Bp2zWP5ulDX5Xh4NVINPDYzA)

## Other Useful Resources
- [Geotab Drive Addin SDK](https://docs.google.com/document/d/1-r9o9epj61WMmGxRveA9SXR86lQGHcxgMh8lsVXGL54/edit?usp=sharing)
- [DriverRegulation (Daily Totals)](https://docs.google.com/document/d/19crX8xXYsYNY-NwP6PGc7LFqOk2KV1xzNgwdJ-40kb8/edit?usp=sharing)
