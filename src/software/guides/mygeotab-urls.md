---
layout: page
permalink: /software/guides/mygeotab-urls/
title: Using MyGeotab URLs
---

This guide explains how to format a URL (Uniform Resource Locator) to obtain access to a specific page/feature in MyGeotab. This can be used to link to MyGeotab from an Internet application, sending an email notification, third-party applications and other customized functions.

## Link to a page

To create a link to a page, the following URL structure is used:

`https://<serverName>/<databaseName>/#<page>,<parameters>`

> The portions of the examples noted with < and > (e.g. <serverName>) indicate where the user will enter information specific to their requirements.

<table class="table">
  <tr>
    <th>Item</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>serverName</td>
    <td>The name of the server the database is on. For example, my.geotab.com</td>
  </tr>
  <tr>
    <td>databaseName</td>
    <td>The name of the database. This is typically the company name used during registration. If there are spaces in the name, they are replaced with underscore characters (_)</td>
  </tr>
  <tr>
    <td>page</td>
    <td>The MyGeotab web application page name</td>
  </tr>
  <tr>
    <td>parameters</td>
    <td>Additional arguments to apply to the request. For example, ‘currentSortMode:deviceName’ will sort the devices on the device list page by name. Note: each additional parameter is separated by a comma</td>
  </tr>
</table>


#### Example

Browse to your database using this URL format

`https://<my3.geotab.com>/<g560>/#devices`

Note: If you are not yet logged in, you will be prompted for your credentials.

## Standalone pages

Standalone pages are used to get a my.geotab.com page without the header and side menu. This is useful when specific functionality is required, for example adding a new vehicle to the system.

To create a link to a page, the following URL structure is used:

`https://<serverName>/<databaseName>/geotab/checkmate/ui/<page>**,**<parameters>`

#### Example

[https://my3.geotab.com/g560/geotab/checkmate/ui/devices.html](https://my3.geotab.com/g560/geotab/checkmate/ui/devices.html)

> If you are not yet logged in, you will be prompted for your credentials.

## Passing parameters to a page

Parameters are added at the end of the URL and each is separated by a comma. They work the same for both the normal and standalone page types. It is also important to note when no parameters are requested, the page will load with the default settings. The parameter and its value are always separated by a colon (":").

#### Example

These links will navigate to the map pages showing the live position of a device with id ‘b21’, and with the group ‘b1234’ highlighted.

`https://<serverName>/<databaseName>/#map,highlightGroup:b1234,liveVehicleIds:!(b21)`

`https://<serverName>/<databaseName>/geotab/checkmate/ui/map.html#highlightGroup:b1234,liveVehicleIds:!(b21)`

## List of pages and accepted parameters

### Page: devices

The list of devices in the system.

Default: list of all devices sorted by name.

<table class="table">
  <tr>
    <td>Parameter</td>
    <td>Description</td>
    <td>Values</td>
  </tr>
  <tr>
    <td>sortMode</td>
    <td>Sorts the list of devices in a specific way</td>
    <td>byType — sort by device
byName — sort by name</td>
  </tr>
  <tr>
    <td>groupSelection</td>
    <td>Divides the device list into subheadings, which are children groups of the selected parent</td>
    <td><groupName> — parent group name that the device belongs to</td>
  </tr>
</table>


#### Example

`https://<serverName>/<databaseName>/#devices,groupSelection:someGroup`

`https://<serverName>/<databaseName>/#devices,sortMode:byName`

`https://<serverName>/<databaseName>/#devices,sortMode:byType`

### Page: device

Edit an individual device.

Default: no default page, you must have an id parameter.

<table class="table">
  <tr>
    <td>Parameter</td>
    <td>Description</td>
    <td>Values</td>
  </tr>
  <tr>
    <td>id</td>
    <td>Goes to a device’s edit page</td>
    <td><deviceId></td>
  </tr>
</table>


#### Example

`https://<serverName>/<databaseName>/#device,id:<b12>`

### Page: deviceSerialNo

Add a new device.

Default: add new device page. No parameters required.

#### Example

`https://<serverName>/<databaseName>/#deviceSerialNo`

### Page: map

The map viewer page.

Default: shows the map with your default map settings.

<table class="table">
  <tr>
    <td>Parameter</td>
    <td>Description</td>
    <td>Values</td>
  </tr>
  <tr>
    <td>liveVehicleIds</td>
    <td>Used to show the live location of a device by its id</td>
    <td><list of deviceIds></td>
  </tr>
  <tr>
    <td>planRoutes</td>
    <td>Show a route on the map</td>
    <td><list of deviceIds></td>
  </tr>
  <tr>
    <td>highlightGroup</td>
    <td>Will highlight all devices in that group on the map display</td>
    <td><groupId></td>
  </tr>
</table>


#### Example

`https://<serverName>/<databaseName>/#map,liveVehicleIds:!(b12,b65,b3)`

`https://<serverName>/<databaseName>/#map,planRoutes:!(b2,b3,b1)`

### Page: tripsHistory

The detailed vehicle trip history page.

Default: will request you to select settings from the drop down menus. You can define the settings using the parameters.

<table class="table">
  <tr>
    <td>Parameter</td>
    <td>Description</td>
    <td>Values</td>
  </tr>
  <tr>
    <td>dateRange</td>
    <td>Sets the range of dates for the trips</td>
    <td>(interval:<value>) — values: ‘Today’, ‘Yesterday’, ‘This Week’, ‘Last Week’, ‘This Month’, ‘Last Month’

(interval:custom,startDate: ‘<date1>’,endDate:‘<date2>’)</td>
  </tr>
  <tr>
    <td>entityType</td>
    <td>Show activity for drivers or devices</td>
    <td>Device — list device activity
Driver — list driver activity</td>
  </tr>
  <tr>
    <td>selectedEntities</td>
    <td>Vehicles to list information for</td>
    <td>!(<listOfEnitities>) or ‘all’</td>
  </tr>
</table>


#### Example

`https://<serverName>/<databaseName>/#tripsHistory,dateRange:(interval:<Today>),entityType:Device,selectedEntities:!(<b1,b7,b21>)`

`https://<serverName>/<databaseName>/#tripsHistory,dateRange:(interval:<custom,startDate:'2015-08-08T04:00:00.000Z',endDate:'2015-08-09T03:59:59.999Z>'),entityType:<Driver>`

### Page: zones

The zone list page.

Default: list of all zones by name.

<table class="table">
  <tr>
    <td>Parameter</td>
    <td>Description</td>
    <td>Values</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>The list order</td>
    <td> 1 — list alphabetically
-1 — Invert the list</td>
  </tr>
  <tr>
    <td>sortMode</td>
    <td>Choose how the sort the list</td>
    <td>zoneName — sorts by name
zoneType — sorts by type
zoneGroup — sorts by group</td>
  </tr>
</table>


#### Example

`https://<serverName>/<databaseName>/#zones,sortOrder:-1,sortMode:zoneGroup`

`https://<serverName>/<databaseName>/#zones,sortMode:zoneName`

`https://<serverName>/<databaseName>/#zones,sortMode:zoneType`

### Page: zone

The zone edit page.

Default: No default available. Needs parameters.

<table class="table">
  <tr>
    <td>Parameter</td>
    <td>Description</td>
    <td>Values</td>
  </tr>
  <tr>
    <td>id</td>
    <td>Goes to edit page for the selected zone</td>
    <td><zoneId></td>
  </tr>
</table>


#### Example

`https://<serverName>/<databaseName>/#zone,id:<b12>`

### Page: notifications

The notification list page.

Default: full list of user notifications listed in order of most recent time.

<table class="table">
  <tr>
    <td>Parameter</td>
    <td>Description</td>
    <td>Values</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>The list order</td>
    <td> 1 — list the most recent time first -1 — invert the list</td>
  </tr>
  <tr>
    <td>sortMode</td>
    <td>Selects the sort mode</td>
    <td>machineName — sorts by machine</td>
  </tr>
  <tr>
    <td>showDismissed:!t</td>
    <td>Shows all dismissed messages</td>
    <td>None</td>
  </tr>
</table>


#### Example

`https://<serverName>/<databaseName>/#notifications,sortOrder:-1,sortMode:machineSort,showDismissed:!t`

### Page: users

The user list page.

Default: list of all current users.

<table class="table">
  <tr>
    <td>Parameter</td>
    <td>Description</td>
    <td>Values</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>The list order</td>
    <td> 1 — list alphabetically 
-1 — invert the list</td>
  </tr>
</table>


#### Example

`https://<serverName>/<databaseName>/#users,sortOrder:-1`

### Page: user

The user edit page.

Default: goes to add a new user page.

<table class="table">
  <tr>
    <td>Parameter</td>
    <td>Description</td>
    <td>Values</td>
  </tr>
  <tr>
    <td>id</td>
    <td>The user’s id. Will link to the edit page for that user</td>
    <td><userId></td>
  </tr>
</table>

#### Example

`https://<serverName>/<databaseName>/#user,id:<b32>`

### Page: options

The user preferences page.

Default: edit user preferences page, no parameters required.

#### Example

`https://<serverName>/<databaseName>/#options`

## Credentials

### Links That include username and database

It is possible to insert username and database credentials into a URL. Note that the user will be required to be logged in to utilize these types of links.

#### MyGeotab Page Example

`https://<serverName>/<databaseName>/?('userName':'<userName>','database':<databaseName>)#<page>`

#### Standalone Page Example

`https://<serverName>/<databaseName>/geotab/checkmate/ui/<page>#credentials:(database:<databaseName>,userName:'<userName>')`

We do not support passing the password credential through the URL because it is unsafe. The way around this is to use a session Id.

### Links that include username, database and session id:

It is also possible to include a session id in the URL. This will not prompt the user to login if the session id is valid.

#### MyGeotab Page Example

`https://<serverName>/<databaseName>/#<page>,token:('userName':'<userName>','sessionId':'<sessionId>','database':'<databaseName>')`

#### Standalone Page Example

`https://<serverName>/<databaseName>/geotab/checkmate/ui/<page>#credentials:('userName':'<userName>','sessionId':'<sessionId>','database':'<databaseName>')`

## Getting the session Id using the API:

Refer to the [Concepts](/software/guides/concepts/#authentication) page, under the section ‘Authentication’. Within that section the instructions explain the process of authenticating a user to obtain their session id.

## Security Using the Session Id

By using the sessionId, a valid login is created for that account. Another user will be able to fully access that account as long as the sessionId credential remain valid. If an application is being created where the sessionId could potentially be viewed by another party, it is advised to generate the credentials using an account with access limited only to the necessary data.

## Embedding MyGeotab inside an iFrame

#### Trusted domains only

Due to the risk of [ClickJacking](https://en.wikipedia.org/wiki/Clickjacking), MyGeotab will instruct the browser to prevent MyGeotab from loading inside a frame that came from an arbitrary domain. Customers wishing to utilize this feature must meet the minimum security requirements. Please contact your reseller for more details.

