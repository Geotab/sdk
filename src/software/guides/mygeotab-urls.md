---
layout: page
permalink: /software/guides/mygeotab-urls/
title: Using MyGeotab URLs
---

This guide explains how to format a URL (Uniform Resource Locator) to obtain access to a specific page/feature in MyGeotab. This can be used to link to MyGeotab from an Internet application, sending an email notification, third-party applications and other customized functions.

## Link to a page

To create a link to a page, the following URL structure is used:

`https://<serverName>/<databaseName>/#<page>,<parameters>`

> The portions of the examples noted with < and > (e.g. `<serverName>`) indicate where the user will enter information specific to their requirements.

| Item | Description
| --- | --- |
| serverName | The name of the server the database is on. For example, my.geotab.com |
| databaseName | The name of the database. This is typically the company name used during registration. If there are spaces in the name, they are replaced with underscore characters (_) |
| page | The MyGeotab web application page name |
| parameters | Additional arguments to apply to the request. For example, `currentSortMode:deviceName` will sort the devices on the device list page by name. Note: each additional parameter is separated by a comma |

### Example

Browse to your database using this URL format

`https://<my3.geotab.com>/<g560>/#devices`

Note: If you are not yet logged in, you will be prompted for your credentials.

## Standalone pages

Standalone pages are used to get a my.geotab.com page without the header and side menu. This is useful when specific functionality is required, for example adding a new vehicle to the system.

To create a link to a page, the following URL structure is used:

`https://<serverName>/<databaseName>/geotab/checkmate/ui/<page>,<parameters>`

> If you are not yet logged in, you will be prompted for your credentials.

## Passing parameters to a page

Parameters are added at the end of the URL and each is separated by a comma. They work the same for both the normal and standalone page types. It is also important to note when no parameters are requested, the page will load with the default settings. The parameter and its value are always separated by a colon (":").

### Example

These links will navigate to the map pages showing the live position of a device with id `b21`, and with the group `b1234` highlighted.

`https://<serverName>/<databaseName>/#map,highlightGroup:b1234,liveVehicleIds:!(b21)`

`https://<serverName>/<databaseName>/geotab/checkmate/ui/map.html#highlightGroup:b1234,liveVehicleIds:!(b21)`

## List of pages and accepted parameters

### Page: devices

The list of devices in the system.

Default: list of all devices sorted by name.

| Parameter | Description | Values |
| --- | --- | --- |
| sortMode | Sorts the list of devices in a specific way | byType — sort by devicebyName — sort by name |
| groupSelection | Divides the device list into subheadings, which are children groups of the selected parent | `<groupName>` — parent group name that the device belongs to |

#### Example

`https://<serverName>/<databaseName>/#devices,groupSelection:someGroup`

`https://<serverName>/<databaseName>/#devices,sortMode:byName`

`https://<serverName>/<databaseName>/#devices,sortMode:byType`

### Page: device

Edit an individual device.

Default: no default page, you must have an id parameter.

| Parameter | Description | Values |
| --- | --- | --- |
| id | Goes to a device’s edit page | `<deviceId>` |

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

| Parameter | Description | Values |
| --- | --- | --- |
| liveVehicleIds | Used to show the live location of a device by its id | `<list of deviceIds>` |
| planRoutes | Show a route on the map | `<list of deviceIds>` |
| highlightGroup | Will highlight all devices in that group on the map display | `<groupId>` |

#### Example

`https://<serverName>/<databaseName>/#map,liveVehicleIds:!(b12,b65,b3)`

`https://<serverName>/<databaseName>/#map,planRoutes:!(b2,b3,b1)`

### Page: tripsHistory

The detailed vehicle trip history page.

Default: will request you to select settings from the drop down menus. You can define the settings using the parameters.

| Parameter | Description | Values |
| --- | --- | --- |
| dateRange | Sets the range of dates for the trips | `(interval:<value>)` — values: `Today`, `Yesterday`, `This Week`, `Last Week`, `This Month`, `Last Month`, `(interval:custom,startDate: <date1>,endDate:`<date2>)` |
| entityType | Show activity for drivers or devices | Device — list device activity, Driver — list driver activity |
| selectedEntities | Vehicles to list information for | !(`<listOfEnitities>`) or `all` |

#### Example

`https://<serverName>/<databaseName>/#tripsHistory,dateRange:(interval:<Today>),entityType:Device,selectedEntities:!(<b1,b7,b21>)`

`https://<serverName>/<databaseName>/#tripsHistory,dateRange:(interval:<custom,startDate:'2015-08-08T04:00:00.000Z',endDate:'2015-08-09T03:59:59.999Z>'),entityType:<Driver>`

### Page: zones

The zone list page.

Default: list of all zones by name.

| Parameter | Description | Values |
| --- | --- | --- |
| sortOrder | The list order | `1` — list alphabetically, `-1` — Invert the list|
| sortMode | Choose how the sort the list | `zoneName` — sorts by name, `zoneType` — sorts by type, `zoneGroup` — sorts by group |

#### Example

`https://<serverName>/<databaseName>/#zones,sortOrder:-1,sortMode:zoneGroup`

`https://<serverName>/<databaseName>/#zones,sortMode:zoneName`

`https://<serverName>/<databaseName>/#zones,sortMode:zoneType`

### Page: zone

The zone edit page.

Default: No default available. Needs parameters.

| Parameter | Description | Values |
| --- | --- | --- |
| id | Goes to edit page for the selected zone | `<zoneId>` |

#### Example

`https://<serverName>/<databaseName>/#zone,id:<b12>`

### Page: notifications

The notification list page.

Default: full list of user notifications listed in order of most recent time.

| Parameter | Description | Values |
| --- | --- | --- |
| sortOrder | The list order | `1` — list the most recent time first `-1` — invert the list |
| sortMode | Selects the sort mode | `machineName` — sorts by machine |
| showDismissed:!t | Shows all dismissed messages | None |

#### Example

`https://<serverName>/<databaseName>/#notifications,sortOrder:-1,sortMode:machineSort,showDismissed:!t`

### Page: users

The user list page.

Default: list of all current users.

| Parameter | Description | Values |
| --- | --- | --- |
| sortOrder | The list order | `1` — list alphabetically `-1` — invert the list |

#### Example

`https://<serverName>/<databaseName>/#users,sortOrder:-1`

### Page: user

The user edit page.

Default: goes to add a new user page.

| Parameter | Description | Values |
| --- | --- | --- |
| id | The user’s id. Will link to the edit page for that user | `<userId>` |

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

MyGeotab Page Example

`https://<serverName>/<databaseName>/?('userName':'<userName>','database':<databaseName>)#<page>`

Standalone Page Example

`https://<serverName>/<databaseName>/geotab/checkmate/ui/<page>#credentials:(database:<databaseName>,userName:'<userName>')`

We do not support passing the password credential through the URL because it is unsafe. 

## Getting the session Id using the API

Refer to the [Authentication](../concepts/#authentication) section. Within that section the instructions explain the process of authenticating a user to obtain their session id.

## Security Using the Session Id

By using the sessionId, a valid login is created for that account. Another user will be able to fully access that account as long as the sessionId credential remain valid. If an application is being created where the sessionId could potentially be viewed by another party, it is advised to generate the credentials using an account with access limited only to the necessary data.

## Embedding MyGeotab inside an iFrame

### Trusted domains only

Due to the risk of [ClickJacking](https://en.wikipedia.org/wiki/Clickjacking), MyGeotab will instruct the browser to prevent MyGeotab from loading inside a frame that came from an arbitrary domain. Customers wishing to utilize this feature must meet the minimum security requirements. Please contact your reseller for more details.

#### Info for resellers
If your customer wish to embed MyGeotab pages inside an iFrame, you need to request it through MyAdmin. Please, create a ticket specifying the URL of the MyGeotab database, business justification and URL on which it will be integrated. Geotab's support team will initiate the process to get the requested domains approved.

This process can take some time as the domains need to be reviewed by Geotab's security team before being added to the approved list by the development team.

