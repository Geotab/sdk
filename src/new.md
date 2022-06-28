---
layout: page
permalink: /resources/new/
title: What's New
---
<a class="btn btn-primary" href="https://community.geotab.com/CommunitiesLogin?startURL=%2Fs%2Fgroup%2F0F92J000000bnW9SAI%2Fintegrators-hub%3Flanguage%3Den_US%26t%3D1643135255743" target="_blank">Subscribe for Updates </a>

## 8.0

### Special note about Trailer and Device

We have migrated all Trailers to be Devices in all customer databases. As a result, you will see the following changes:

- `GroupAssetTypeId`, `GroupTrailerId`, and `GroupVehicleId` built-in groups are added under CompanyGroup.

- A `GroupVehicleId` built-in group is added to all Devices.

- Calling Add Trailer and Add Device with the `GroupTrailerId` built-in group now performs the same action. Both create a Device in the system that is in the `GroupTrailerId` group.

- Trailer APIs have been marked as obsolete but will continue to be supported (for now).

- Calling Get Device now returns devices that are in the `GroupTrailerId` built-in group as part of the response.

- If the Customer wants only vehicles to be returned when calling Get Device, and not trailers, they should specify groupSearch: `{“id”:”GroupVehicleId”}`.

- Calling Add Trailer with the `GroupTrailerId` or `GroupVehicleId` built-in groups will throw an error.

> **! IMPORTANT**: Calling Set Device and removing the `GroupVehicleId` or `GroupTrailerId` built-in groups will prevent the vehicle or trailer from being shown on the relevant selection screens on the Drive App. Calling Set Device and switching the group from `GroupTrailerId` built-in group to `GroupVehicleId` built-in group or vice versa will not be allowed. This is a temporary restriction in the 8.0 release, and we intend to remove this check in a future release.

See [this slide deck](https://docs.google.com/presentation/d/1C0CBY4qaJKHx3J-fdB-YZzxbilQoleqjv8WsyFIZhEE/edit#slide=id.gdb284aa95f_0_61) to understand more about why this change was made, and how this may impact you.

### Special note about EV Powertrain Groups

This new built-in group structure automatically classifies electric vehicles (EV) based on their unique powertrain types: Plug-in Hybrid (PHEV), Battery Electric Vehicle (BEV), or Fuel Cell Electric Vehicle (FCEV). [See MyGeotab Version 8.0 SDK Announcement - New built-in groups for EV powertrain identification for additional details.](https://docs.google.com/document/d/1W9_Y1XukkaRKQDfJ-RH2YsUptSkUPazx_E4UjfOcKoU/edit)

### Updates

#### AddInData

- Removed the obsolete alpha `Data` property.

#### Audit

- Fix: The Audit API is inconsistent in what it returns. Most ways of getting audit (Get - from ID or search, GetFeed) do not return a populated User property. However, the GetAll (Get with no search) returns records with the user fully populated. This is not consistent with the API philosophy. A nested entity will only have its ID populated. User will now never be returned in the Audit object (only userName).

#### Device

- Fix: Searching for `CustomDevice` type could also return `CustomVehicleDevice` devices in some cases. It has been fixed to return only devices of `CustomDevice` type.

#### DutyStatusAvailability

- Added `IsAdverseDrivingApplied` and `IsRailroadExemptionAvailable`.

#### DutyStatusLogType

- Added `RailroadExemption`.

#### DVIRLog

- `RepairStatus` / `RepairUser` / `RepairDate` cannot be changed once set. A repair cannot be completed without the `RepairUser`, `RepairDate`, and `RepairStatus`.

#### GroupRelations

- Improved description of `GroupRelations` in [API Reference]({{site.baseurl}}/software/api/reference/).

#### Group

- Added the following system groups:
  - `GroupAssetTypeId`
  - `GroupVehicleId`
  - `GroupTrailerId`
  - `PowertrainAndFuelTypeId`
  - `GroupElectricHybridPluginId`
  - `GroupBatteryElectricVehicleId`
  - `GroupPluginHybridElectricVehicleId`
  - `GroupFuelCellElectricVehicleId`
  - `GroupInternalCombustionEngineId`
  - `GroupBiodieselId`
  - `GroupCompressedNaturalGasId`
  - `GroupDieselId`
  - `GroupEthanolId`
  - `GroupGasolinePetrolId`
  - `GroupLiquifiedNaturalGasId`
  - `GroupPropaneLiquifiedPetroleumGasId`
  - `GroupManuallyClassifiedPowertrainId`

#### HosRuleSet

- Added `America7DayRailroad` and `America8DayRailroad`.

#### KnownIoxAddOnTypes

- Added `NFC`, `Bluetooth`, and `UReader` add-on types.

#### Nuget Package

- Nuget package uses `HttpClient.VersionPolicy` `RequestVersionOrHigher`. Allowing client to use HTTP/2 and above. HttpClient default is HTTP/1.1.

#### SecurityIdentifier

- Added `EVBatteryHealthReport`.

#### Trailer

- Marked obsolete, but can still be used for this release.

#### TrailerAttachment

- Marked obsolete, but can still be used for this release.

#### User

- Added `IsAdverseDrivingEnabled`.

#### Zone

- When adding and setting zones, points are validated to be latitude and longitude bounds. Valid Latitude -90 to 90. Valid Longitude -180 to 180.

#### ZoneSearch

- `Viewport` property which was made obsolete in v5.7.2004 will be **removed and no longer supported in v9.0**. Please switch your application to use `searchArea` and `BoundingBox` objects as soon as possible.

## 7.0

### Security updates

In an effort to increase application and API security, exception types that expose database provider or platform-specific error messages have been removed and are now represented as one of the exceptions below. Most exceptions and error messages have not changed. Exception types that were previously documented remain unchanged; however, some new exception types include non-specific, generalized messages to avoid sharing information about the underlying infrastructure. The following common exceptions are still supported.

- `ArgumentException`
- `ArgumentNullException`
- `ArgumentOutOfRangeException`
- `CaptchaException`
- `DatabaseMaintenanceException`
- `DbUnavailableException`
- `DuplicateException`
- `ExpiredPasswordException`
- `GenericException` *new*
- `GroupRelationViolatedException`
- `InvalidApiOperationException` *new* (fromerly `InvalidOperationException`)
- `InvalidCastException`
- `InvalidMyAdminUserException`
- `InvalidPermissionsException`
- `InvalidUserException`
- `JsonSerializerException`
- `MissingMemberException`
- `MissingMethodException`
- `PasswordPolicyViolationException`

### Password policies

- User passwords will now be validated against a list of common passwords. If it is a common password, a `PasswordPolicyViolationException` is returned.
- User passwords will now be validated against username, first name, and last name. If it contains a username, first name, last name, a `PasswordPolicyViolationException` is returned. This method can no longer be disabled.

### User policies

- The maximum number of active sessions for a user on a single database has been lowered to 100. Active sessions are a rolling list sorted by date and time. When the number of active sessions reaches 100, a new session is added, and the oldest session is removed from the list (expired).

### General updates

- Added `ModifyGroupFilter` and `ViewGroupFilter` to `SecurityIdentifier`.
- Added `CaliforniaPropertyShortHaulWithRest`, `CanadaOil`, `CanadaNorthOf60Oil`, `CanadaOilTeam`, and `CanadaNorthOf60OilTeam` properties.
- Added support for fuel transaction provider, `WexCanada`.
- Minor bug fixes and package updates.

### Coming soon

- The `AddInData` legacy property `Data` will be removed in the coming 9.0 release. Please update your integration requests to use the `Details` property instead
- JSONP support will be removed from the API in the coming 8.0 release, and should no longer be used.

## 6.0

- Changed the software version naming convention to use three parts (e.g. 6.0.0) from four parts (e.g. 5.7.2104.0). To learn more, [click here](https://community.geotab.com/s/feed/0D52J00008j4IghSAE?language=en_US).

- Added [WifiHotspot]({{site.baseurl}}/software/api/reference/#WifiHotspot) capability, with Interface to configure hotspot settings on telematics devices.

- The MyAdmin SDK is now available from [the SDK]({{site.baseurl}}/myadmin-sdk/introduction/). All pages are in the process of being converted to Markdown format.

### HOS

Added `CanadaNorthOf60CycleOneTeam` and `CanadaNorthOf60CycleTwoTeam` to the rulesets.

### Limits

Increased media file size limits to 50 MB for video and 10 MB for images.

### NuGet

- Fixed an issue in which the NuGet package `API.SessionId` property generates an `InvalidOperationException`, if accessed before it is assigned.

- The MyGeotab NuGet package no longer includes a reference to `Newtonsoft.json`.

## 5.7.2104

### JSON Serializer Change in 5.7.2103

Post-release update: it was recently uncovered within our development team that as of MyGeotab release 5.7.2103, the JSON Serializer responsible for parsing API calls has changed to no longer allow single quote (') usage within the call parameters. Integrators should now solely use double quotes (") for this purpose. The expected error result for single quote usage with this change is as follows:

```json
{
   "error":{
      "message":"Exception of type 'Geotab.Serialization.JsonSerializerException' was thrown.",
      "code":-32700,
      "data":{
         "id":"5b161301-f931-43e0-ba2a-46d6bb54d898",
         "type":"JsonSerializerException",
         "requestIndex":0
      },
      "name":"JSONRPCError",
      "errors":[
         {
            "message":"Exception of type 'Geotab.Serialization.JsonSerializerException' was thrown.",
            "name":"JsonSerializerException"
         }
      ]
   },
   "jsonrpc":"2.0",
   "requestIndex":0
}
```
The new Serializer logic only accepts property names and string values in double quotes because that format is required by the [RFC8259](https://datatracker.ietf.org/doc/html/rfc8259) specification and is the only format considered to be valid JSON.

### New Stock Groups Available
 
- GroupDriverActivityGroupId
- GroupPersonalGroupId
- GroupBusinessGroupId

### Device

- `FuelTankCapacity` will now throw an `ArgumentOutOfRangeException` if the value is less than 0.
- The `DevicePlans` property will be removed from the object model in a future version. DevicePlans does not encapsulate billing information, so please use the `DevicePlanBillingInfo` property from this version forward.
- Added the `DevicePlanBillingInfo` property to replace the `DevicePlans` property. `DevicePlanBillingInfo` contains more billing information than `DevicePlans`.

### DeviceStatusInfoSearch

Fixed a bug that omitted the `closestAssetLimit` property when applying `closestAssetLimit` and `resultsLimit` together.

### UserHosRuleSetSearch

Fixed bug that applied the wrong date when searching for `UserHosRuleSet` using both `fromDate` and `userSearch.fromDate`.

### FuelTransaction

Added the `ProviderProductDescription` property. This property requests the non-generic product description as described by the fuel card provider.

### DutyStatusViolationType

Added `EwdRest`, `EwdWork`, and `EwdWorkExemption`.

### Errors

Removed provider-specific details from exception messages when a relation violation exception occurs. The exception types returned have not changed.

### Defect

Added `IsHidden` and `IsRequired` properties.

- `IsHidden` is a boolean value indicating whether a defect is hidden in the UI. Used to determine if “other” should be shown or not.
- `IsRequired` is a boolean value indicating whether a defect must be signed off. Used to determine if the part must be explicitly marked as having defect(s) or not.

## 5.7.2103

### JSON Serializer Change

The JSON Serializer responsible for parsing API calls has changed to no longer allow single quote (') usage within the call parameters. Integrators should now solely use double quotes (") for this purpose. The expected error result for single quote usage with this change is as follows:

```json
{
   "error":{
      "message":"Exception of type 'Geotab.Serialization.JsonSerializerException' was thrown.",
      "code":-32700,
      "data":{
         "id":"5b161301-f931-43e0-ba2a-46d6bb54d898",
         "type":"JsonSerializerException",
         "requestIndex":0
      },
      "name":"JSONRPCError",
      "errors":[
         {
            "message":"Exception of type 'Geotab.Serialization.JsonSerializerException' was thrown.",
            "name":"JsonSerializerException"
         }
      ]
   },
   "jsonrpc":"2.0",
   "requestIndex":0
}
```
The new Serializer logic only accepts property names and string values in double quotes because that format is required by the [RFC8259](https://datatracker.ietf.org/doc/html/rfc8259) specification and is the only format considered to be valid JSON.

### Add/Set FuelTransaction

Fuel transactions must be unique when comparing all fields (excluding sourceData) against existing transactions.

### CompanyDetails

Added `jurisdiction` property.

### CreateDatabase

The CreateDatabase API now requires user-selected jurisdiction. The jurisdiction is the place of residency for Customer data, maintenance hours, and other information (e.g.U.S., EU). This was previously inferred from the selected timezone. To maintain backwards compatibility, timezone can still be used to infer jurisdiction. However, all users are encouraged to provide a jurisdiction as part of the CompanyDetails provided to the CreateDatabase API.

### CustomVehicleDevice

Added `fuelTankCapacity` property.

### DiagnosticType

Added `LevcFault`.

### Drive Add-In Photos

A new API was added to Drive add-ins to access the device camera to take a photo or select an exiting photo from the mobile device using `api.mobile.camera.takePicture()`.

### DriverRegulation

Added `CurrentDutyStatus` representing the latest `DutyStatusLogType` affecting availability or violations.

### DutyStatusViolationType

Added `EwdRest`, `EwdWork`, and `EwdWorkExemption` (formerly `Work` and `WorkExemption`).

### DVIRLogSearch

Added `LogTypes` property for searching by list of DVIRLogType.

### ExceptionEvent

Exception events can be deleted when new data arrives from a device that, when evaluated against the same rule conditions, invalidates the previous state of the exception. For example, a speeding exception is generated for a street with a 40mph speed limit beside a highway. As more GPS data arrives, it becomes clear the vehicle is on the highway, not the service road, so the exception is invalidated. This is a problem for users who continuously request ExceptionEvent data because they are unaware when an exception is invalidated, and deleted at a later date.
To resolve this issue, two new properties have been added to ExceptionEvent; `lastModifiedDate` and `state`. These properties determine if the exception event is invalidated instead of deleted. This means that when a new GetFeed request is made, the user sees the updated record and can adjust their records accordingly. Invalidated exceptions will no longer be removed immediately.

> NOTE: Invalidtated exceptions will not be returned by default. You must pass the search parameter `includeInvalidated` in the request to Get or GetFeed to return invalidated exception events. The `state` of these exceptions will be `Invalid`.

### ExceptionEventSearch

Added `includeInvalidated` property.

### ExceptionEventState

New object representing the state of the exception event. Possible states are `Valid` and `Invalid`.

### Generator Add-in

[Generator-addin](https://github.com/Geotab/generator-addin) updated to mock drive add-in camera API features.

### Group

Group objects in some instances had `color` and `children` properties partially populated when nested in another object (ex device.groups). This is fixed, so they are no longer populated when groups are nested in group linked entities.

### HosRuleSet

Added `CaliforniaPropertyShortHaul` and `CaliforniaPropertyShortHaulWithRest`.

### Jurisdiction

New enumeration representing the Jurisdiction of a database.

### MediaType

Added `Application` media file type. This is to support PDF file types in MediaFiles.

### RadioDownloader, RadioData and related objects are removed

All Radio Downloader related objects are removed as Geotab deprecates all RF functionality.

### SecurityIdentifier

Added `ViewDeviceDataPrivacyChangeData` and `EditDeviceDataPrivacyChangeData`
Added `ViewSharedDevice`
Added `AdministerPropertySet`, `ViewPropertySet`, `AdministerProperty`, and `ViewProperty`
Added `ViewActiveInsights`
Added `IgnoreHOSLogs`
Added `ViewShareableLink`, `CreateShareableLink`, and `DeleteShareableLink`

### TripSearch

Added `SearchArea` property to allow searching for trips within a rectangular `BoundingBox` geographic area.

## 5.7.2102

### Data Intake Gateway (DIG)

DIG is our new platform for integrating custom telematics data into MyGeotab. To learn more, [click here]({{site.baseurl}}/software/guides/custom-telematics-devices/).

### APIv1 JSON Serialization

To reduce the duration of process-intensive requests with large JSON payloads, the MyGeotab JSON-RPC API now uses System.Text.Json instead of Newtonsoft.JSON to serialize JSON data sent using the API. This change includes backward compatibility with Newtonsoft.JSON, with the following exception: Numbers with decimals will no longer be serialized using the decimal followed by a zero, if it is a whole number.

### Nuget Package

The Nuget Package now targets .NET Standard 2.0,.NET Standard 2.1 and .NET 5.0. To improve serialization and deserialization performance, the Geotab.Checkmate.Objectmodel Nuget Package version 5.7.2102 replaced the JSON serialization library from Newtonsoft.JSON, with System.Text.Json.

> Due to the performance improvement with System.Text.Json, the existing rate limit OverLimitException may be surpassed when calling the GetFeed API in a tight loop.

### SDK Site

SDK site adjusted for AODA compliance.

### Generator Add-in

New Geotab Drive Add-in features start/stop, hook and notifications added to generator-addin.

### General SDK updates

#### DeviceSearch

Keywords property expanded to include `EngineVehicleIdentificationNumber`, `VehicleIdentificationNumber` and `SerialNumber` properties.

#### DeviceShare, DeviceShareSearch, DeviceShareType, DeviceShareSearch

Beta support for `DeviceShare` functionality added. This object is used for Extendable Services billing purposes.

#### DutyStatusLogType

Added `Work`, `Rest`, and `WorkExemption` properties.

#### ExceptionRuleBaseType

Route Completion displays the completion status of custom routes and roads to help users maintain compliance with service level agreements. A route is completed based on the rule and conditions set by the user. Route completion exceptions represent servicing activity for a set of previously defined routes, within a service group.

A new `RouteCompletion` category is used to classify a rule in the Route Completion Report. Route completion rules are returned with unfiltered requests to the `Get<Rule>` API, or with the category filter `UserExceptionRules`. They can also be searched by `RouteCompletion`.

#### FaultData

Added `FaultStates`. This allows faults to represent more precise and potentially multiple fault states. In the future, FaultState will be deprecated, though still available for backwards compatibility.

#### FaultState

Removed `PendingOff`, `ActiveOff`, `InactiveOff`, as more accurately represented in `FaultStatus`.

#### FaultStateProvider

Describes the current `FaultState` when a single fault is present.

#### FaultStatus

Complements the `FaultStates` property of `FaultData`. Describes the status of a fault.

#### GetFeed<TextMessage>

To comply with the GetFeed contract and avoid performance loss, fixed a bug that applies both fromDate and fromVersion when both are supplied in the API request. When fromVersion is supplied, fromVersion will be ignored.

> This fix may return more records when both fromDate and fromVersion are supplied with before the given dateTime is returned.

Also, fixed a bug where toVersion is returned as 0, when a search returns no results. Now, when no results are returned, ToVersion is returned as the latest Feed version.

#### HosRuleSet

Added `StandardHoursSoloExemptionHours`.

#### RoutePlanItem

Added `PassCount`. The expected number of passes through the Zone.

#### RouteSearch

Added `Groups` search option to allow searches for Route Completion routes (`RouteType.Service`) that are members of `GroupSearch`(s). Only returns routes that are members of a service group hierarchy.

#### RouteType

Added `Service` route type.

#### SecurityIdentifier

Added `RouteCompletionReport`.

#### UserSearch

Added `UserSearchType` property to address IsDriver search limitation for Driver or Drivers, and Users. UserSearch allows searching for drivers and users, users who are not drivers, and only users who are drivers. `IsDriver` will be deprecated but remain backwards compatible.

#### UserSearchType

Added values to the `UserSearch`, `UserSearchType` properties.

## 5.7.2101

### Map Add-In

Map Add-ins are now fully supported, and no longer in Feature Preview. [Click here to learn more about Map Add-ins]({{site.baseurl}}/software/guides/map-add-ins-docs/)

### Storage API

Storage APIs are now fully supported, and no longer in Feature Preview. [Click here to learn more about Storage APIs]({{site.baseurl}}/software/guides/addin-storage/)

### General SDK updates

#### DeviceStatusInfo

The dates of GPS, status and fault records are compared and uses the latest recorded data point as the `DateTime`.

#### AddInData

The `Set` method will now allow modifying a value with no groups assigned.

#### CreateDatabase

Added a rate limit to the `CreateDatabase` method: 15/1m, 100/1h, 800/1d.

#### Device

Added support for Untracked Assets. This allows adding devices that do not have a serial number.

#### DutyStatusLog

- Added the `IsTransitioning` property indicating whether an HOS log is in transition after the first driver accepts it.
- Added the `IsHidden` property.

#### DutyStatusLogType

- Added `CanadaCycleOne`, `CanadaCycleTwo`, `OperatingZoneCanadaSouthOf60`, `OperatingZoneCanadaNorthOf60`, `OperatingZoneAmerica` and `INT_CoDriver`.

#### DutyStatusViolationSearch

The `DutyStatusViolationSearch` method can now search by user company or driver groups.

#### DVIRLog

Updated the documentation for Canada-specific fields on DVIRLogs (`LoadHeight`, `LoadWidth`, and `Odometer`) to better describe how they are populated.

#### FaultState

Added `Inactive`, `PendingOff`, `ActiveOff`, `InactiveOff,` and `Cleared`.

#### Get:DutyStatusLog

Fixed bug getting latest log for all users.

#### Get:StatusData

Users can now extrapolate the status date for diagnostics using the unit of measure `None` when `Get` is used with search (device, diagnostic, from and to date).

#### GetFeed:DeviceStatusInfo

Added `GetFeed` for `DeviceStatusInfo`.

#### MessageContentType

Added `MimeContent` to `MessageContentType`.

#### MimeContent

Fixed documentation of maximum size.

#### RuleSearch

Fixed a bug getting zone stop rules.

#### SDK Runner

Fixed a UI bug rendering JSON, causing it to fail on an empty object.

#### sdk-addin-samples:proximity

- Removed ResultsLimit of 1000 for the `Get<Device>` request.
- `Get<Device>` request now accepts wildcard searches.
- Added a Run, Select All and Deselect All button.
- Updated warning messages if an input is missing or invalid when a user clicks Run.
- Updated minor UI aesthetics.

#### sdk-map-addin-samples

Added a new sample illustrating tooltip which displays the odometer, fuel level, and battery charge level (if applicable) of a vehicle.

#### SecurityIdentifier

Added `ViewDeviceShare`, `ViewDeviceShare`, `InstallRecord`, `ViewDeviceShare`, `ViewDeviceShare`, `ViewUserDeviceLink`, and `ViewUserDeviceLink`.

#### VersionInformation

Added the `ServerId` property, a unique identifier for a server/cluster.

## 5.7.2004

### New Media File API

Geotab is happy to announce a new set of APIs related to Media Files. This new API can be used to store images or video clips related to a device or driver.

[MediaFile]({{site.baseurl}}/software/api/reference/#MediaFile): MediaFile is a new type used to store images or video clips related to a device or driver. More information about media files can be found [here](https://github.com/Geotab/mg-media-files).

[MediaType]({{site.baseurl}}/software/api/reference/#MediaType): The type of Media.

[Status]({{site.baseurl}}/software/api/reference/#Status): The status of an uploaded file.

[MediaFileSearch]({{site.baseurl}}/software/api/reference/#MediaFileSearch): The object used to specify the arguments when searching for MediaFile. This will return the data describing a file, not the actual file.

[Tag]({{site.baseurl}}/software/api/reference/#Tag): A named tag to provide context to an entity.

[DownloadMediaFile]({{site.baseurl}}/software/api/reference/#DownloadMediaFileAsync): Download a file for the given MediaFile. The Content type is determined by the file extension. Range headers are supported.

[UploadMediaFile]({{site.baseurl}}/software/api/reference/#UploadMediaFileAsync): Upload a file for the corresponding MediaFile using multipart/form-data POST request.

[SecurityIdentifier]({{site.baseurl}}/software/api/reference/#SecurityIdentifier): Added ViewMedia and ManageMedia.

### General SDK updates

#### BinaryDataType

Added `ThirdPartyData` type to allow flexible length binary data format records to be stored.

#### Methods

[GetCountOf]({{site.baseurl}}/software/api/reference/#GetCountOf1) method now accounts for user scope. It previously did not account for user scope, which was a bug.

#### ZoneSearch

`Viewport` is obsolete and no longer officially supported. It is replaced with `SearchArea` property. This will be better represented by the type `BoundingBox`. Providing a bounding box is simpler to use because map libraries provide viewport/map bounds in this way already. Backwards compatibility will be maintained with the `Viewport` property, though no longer documented.

#### BoundingBox

Added `BoundingBox` which represents a geographic area defined by the top-left and bottom-right coordinates.

#### DiagnosticSearch

Added searching by diagnostic name.

#### FaultDataSearch

Added searching by Diagnostic Code, Diagnostic Name, Diagnostic Source Name, Diagnostic Source Id, FaultState and Controller Id.

#### Generator-addin

Added groups filter to [generator-addin](https://github.com/Geotab/generator-addin).

#### HOSRuleSet

**Added**: `America7DaySleeper`, `America7DayBigSleeper`, `America8DaySleeper`, `America8DayBigSleeper`, `OilTransport7DaySleeper`, `OilTransport7DayBigSleeper`, `OilTransport8DaySleeper`, `OilTransport8DayBigSleeper`, `America7DayNo34hSleeper`, `America8DayNo34hSleeper`, `AmericaNoRestRequirement7DaySleeper`, `AmericaNoRestRequirement7DayBigSleeper`, `AmericaNoRestRequirement8DaySleeper`, `AmericaNoRestRequirement8DayBigSleeper`, `OilWell7DaySleeper`, `OilWell7DayBigSleeper`, `OilWell8DaySleeper`, `OilWell8DayBigSleeper`, `OilTransportNoRestRequirement7DaySleeper`, `OilTransportNoRestRequirement7DayBigSleeper`, `OilTransportNoRestRequirement8DaySleeper`, `OilTransportNoRestRequirement8DayBigSleeper`, `OilWellNoRestRequirement7DaySleeper`, `OilWellNoRestRequirement7DayBigSleeper`, `OilWellNoRestRequirement8DaySleeper`, `OilWellNoRestRequirement8DayBigSleeper`, `AlaskaProperty7DaySleeper`, `AlaskaProperty8DaySleeper`

#### Removed BETA attribute on the following

- AnnotationLog
- AnnotationLogSearch
- ApplicationVersionInformation
- DefectRemark
- DefectSeverity
- DutyStatusAvailability
- DutyStatusAvailabilitySearch
- DutyStatusLog
- DutyStatusLogSearch
- DutyStatusLogType
- DutyStatusMalfunctionTypes
- DutyStatusOrigin
- DutyStatusState
- DutyStatusViolation
- DutyStatusViolationSearch
- DutyStatusViolationType
- DVIRDefect
- DVIRDefectSearch
- DVIRLog
- DVIRLogSearch
- DVIRLogType
- DtcClass
- DtcSeverity
- ElectricEnergyEconomyUnit
- ElectricEnergyUnit
- HosRuleSet
- InvalidMyAdminUserException
- RepairStatusType
- ShipmentLog
- ShipmentLogSearch
- TextMessageContentType
- Trailer
- TrailerAttachment
- TrailerAttachmentSearch
- TrailerSearch
- VersionInformation
- GetVersionInformation
- GetFeed:Audit
- GetFeed:Device
- GetFeed:Diagnostic
- GetFeed:DriverChange
- GetFeed:Route
- GetFeed:Rule
- GetFeed:TextMessage
- GetFeed:TrailerAttachment
- GetFeed:Driver
- GetFeed:Zone

### Java SDK (Feature Preview)

We work hard to create fast and flexible tools that make sense for your business, and your feedback is an essential part of that process. With this in mind, we are previewing our new Java SDK, and we want you to tell us how we did! So go ahead – test the kit, join our Community Developer Discussions to help us improve our product, and get to know our users.

The Java SDK offers an easy way to integrate MyGeotab into Java software. All communication with Geotab services is accomplished using HTTPS with serialized data in JSON format. The Java library provides Java objects representing MyGeotab entities and automatically handles their JSON serialization and deserialization.

The Java SDK is available as a Maven Dependency Library from the Maven Central Repository and includes documentation with information and usage samples for your new kit.

You can find Java-based API usage samples at https://github.com/Geotab/sdk-java-samples

Samples include:

Get Logs for a given vehicle between a range of dates.
Send Text Messages to and from a GO device
Import Groups includes a console example that is also a Group import tool. The sample enables a one-time import of groups to a database from a CSV file.
Import Devices includes console example that imports devices from a CSV file.
Import Users includes a console example that imports users from a CSV file.
Get Data Feed includes an example for retrieving GPS, StatusData and FaultData as a feed, and for exporting to CSV file.

Supported Methods include:

- Authenticate
- Get
- Add
- Set
- Remove
- GetFeed (LogRecord, StatusData, FaultData, Trip)
- GetCountOf

Supported Objects include:

- Id
- Entity
- EntityWithVersion
- NameEntity
- NameEtityWithVersion
- LoginResult
- Credentials
- Coordinate
- Color
- Controller
- ControllerSearch
- Device (all types)
- DeviceSearch
- Diagnostic
- DiagnosticSearch
- DataDiagnostic
- DiagnosticType
- EngineType
- EngineTypeSearch
- FailureMode
- FailureModeSearch
- FaultData
- FaultDataSearch
- FlashCode
- Group
- GroupSearch
- IoxAddOn
- IoxAddOnSearch
- LogRecord
- LogRecordSearch
- ParameterGroup
- ParameterGroupSearch
- Source
- SourceSearch
- StatusData
- StatusDataSearch
- TextMessage
- TextMessageSearch
- TextMessageContentType
- Trip
- TripSearch
- UnitOfMeasure
- UnitOfMeasureSearch
- User
- Driver
- UserSearch
- WorkTime
- WorkTimeDetail
- WorkTimeHolidayGroupId
- WorkTimeSearch
- DefectSeverity
- DeviceType
- DiagnosticType
- DtcClass
- DtcSeverity
- ElectricEnergyEconomyUnit
- FaultLampState
- FaultResetMode
- FaultState
- FuelEconomyUnit
- GoogleMapStyle
- GoTalkLanguage
- HosOption
- HosRuleSet
- MessageContentType
- OpenStreetMapStyle
- SecurityIdentifier
- SecurityFilter
- ZoneDisplayMode
- MapView
- FeedResult
- DbUnavailableException
- DuplicateException
- GroupRelationViolatedException
- InvalidMyAdminUserException
- InvalidUserException
- OverLimitException
- RegistrationException
- JsonRpcError
- JsonRpcErrorData

## 5.7.2003

### General improvements

JSON serialization improvements have been made to increase the efficiency of API calls. This is especially noticeable on API calls with large response payload. For example, calling `GetFeed` of `StatusData` with full payload (50,000 results), the average end to end time decreased from 1800 ms to 800 ms.

### TextMessage and TextMessageSearch

- [TextMessage]({{site.baseurl}}/software/api/reference/#TextMessage) - Added `Recipient`. This property is used to send a text message to a user.
- [TextMessageSearch]({{site.baseurl}}/software/api/reference/#TextMessageSearch) - Added searching by `IsDelivered`, `IsRead`, `UserSearch`.
  - `IsDelivered`, when set to true, returns all text messages that were delivered to the recipient/device.
  - `IsRead`, when set to true, returns all text messages that were read by the recipient/device.
  - `UserSearch` searches TextMessages from a user, and users in the specified `CompanyGroups` or `DriverGroups`.
- [TextMessageSearch]({{site.baseurl}}/software/api/reference/#TextMessageSearch) - Added searching by `ContentTypes` and `IsDirectionToVehicle`.
  - `ContentTypes` searches for TextMessages based on their MessageContentType.
  - `IsDirectionToVehicle`, when set to true, will return all text messages that were sent to the device. If set to false, it will return all text messages that were not sent to the device.

### SecurityIdentifier

- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#SecurityIdentifier) - `PerformanceReport` has been removed.

### Exception Messages

Some exception messages contained escaped Unicode characters. We have fixed these to exclude escaped characters. See the example message change below:

```text
The method \u0022NotAMethod\u0022 could not be found. Verify the method name and ensure all method parameters are included
```

```text
The method 'NotAMethod' could not be found. Verify the method name and ensure all method parameters are included
```

This fix applies to messages of exception types `MissingMethodException`, `AmbiguousMatchException`, `MissingMemberException` and `JsonSerializationException`.

### DiagnosticType

- [DiagnosticType]({{site.baseurl}}/software/api/reference/#DiagnosticType) - Added `GmcccFault` and `BrpFault`

### KnownId

- [KnownId]({{site.baseurl}}/software/api/reference/#KnownId) - Added `ControllerGmcccFaultId`, `SourceGmcccId`, `SourceGmcccObsoleteId`, `ControllerBrpFaultId`, `SourceBrpId`, `SourceBrpObsoleteId`
- [KnownId]({{site.baseurl}}/software/api/reference/#KnownId) - Added `NoExceptionEventId`, `NoRuleId`

### Device

- [Device]({{site.baseurl}}/software/api/reference/#Device) - Added `AutoHos`. This property is a toggle that represents automatic generation of DutyStatusLogs for a `GoDevice` and/or a `CustomVehicleDevice`.

### DutyStatusViolation

- [DutyStatusViolation]({{site.baseurl}}/software/api/reference/#DutyStatusViolation) - Added `HoursLimit` and `DaysLimit`. These properties show the maximum or minimum hours and/or days limit for duty status violations.
- [DutyStatusViolation]({{site.baseurl}}/software/api/reference/#DutyStatusViolation) - Deprecated `Reason` property. This will be removed in a future version. The data in the Reason property string is now provided as `DaysLimit` and `HoursLimit` for better programmatic access.

### UserSearch

- [UserSearch]({{site.baseurl}}/software/api/reference/#UserSearch) - Added searching by `LicenseNumber`, `EmployeeNumber`, `HosRuleSet` and `UserAuthenticationType`.

### GetFeed DebugData

- [GetFeed]({{site.baseurl}}/software/api/reference/#GetFeed1): [DebugData]({{site.baseurl}}/software/api/reference/#DebugData) - Fixed sort order issue leading to possible missed records.

### FuelTransaction

- [FuelTransaction]({{site.baseurl}}/software/api/reference/#FuelTransaction) - Added `Device` and `Driver`. These properties add fuel transactions for a device or user, rather than a loose match by VIN, etc. If left null, the application will attempt to match the fuel transaction to a device and driver at time of an Add or a Set. If no match is found, the fuel transaction's `Device` and `Driver` properties defaults to NoDevice and UnknownDriver.

### DVIRLog

- [DVIRLog]({{site.baseurl}}/software/api/reference/#DVIRLog) - Added `AuthorityName`, `AuthorityAddress`, `Odometer`, `LoadHeight`, `LoadWidth` and `IsInspectedByDriver`. These properties support Canadian DVIR inspections. AuthorityName and AuthorityAddress are automatically populated based on what the user's corresponding fields are at the time. Odometer currently only applies to the entered `Hubometer` value for Trailer DVIRs.

### ConditionType

- [ConditionType]({{site.baseurl}}/software/api/reference/#ConditionType) - Added `IsValueLessThanPercent` and `IsValueMoreThanPercent`. These properties are used to create a percentage threshold for speeding violations, rather than an exact speed value under/over the current posted road speed.

### WebServerInvoker (Nuget only)

This method has been changed to use generics instead of passing type in, and returning an object, that needs  to be cast. For example, `var version = (string)(await invoker.InvokeAsync("GetVersion", typeof(string)));` is now `var version = await invoker.InvokeAsync<string>("GetVersion");`

> While not an officially supported component, it's possible `WebServerInvoker` is being used by some integrations. For this reason we thought it worth mentioning this change.

## 5.7.2002

### NuGet

<span style="color:#EE0700">! IMPORTANT</span>: A bug has been identified with Geotab.Checkmate.Objectmodel NuGet packages older than version 5.7.2002, which can lead to serialization errors when a previous version received a new device plan value. Please update to the latest NuGet package to establish compatibility.

### Map Add-In

Users can now create a [Map Add-In]({{site.baseurl}}/software/guides/map-add-ins-docs/) without using the view panel on the right. For quick tasks such as adding icons or text to the Map, simply use the `"noView":true` parameter in your configuration file.

```json
{
    "page": "map",
    "noView": true,
    "title": "Some title",
    "mapScript": {
        "script": "..."
    }
}
```

You can now hide Vehicle State and Groups information from the tooltip when hovering or selecting vehicles on the Map. See the example below.

```js
service.tooltip.setConfig({
    device: {
        state: false,
        groups: false
    }
});
```

### Interpolation

- [Get]({{site.baseurl}}/software/api/reference/#Get1): [StatusData]({{site.baseurl}}/software/api/reference/#StatusData), [LogRecord]({{site.baseurl}}/software/api/reference/#LogRecord) - In the v5.7.2001 release and earlier, we interpolate between points when using `StatusData` and `LogRecord` API. When a date is requested that is less than or greater than the data, we return the first/last value with the date of the time requested. To minimize confusion, we now return the _first/last_ value with the _correct_ dateTime.

### Users

- [User]({{site.baseurl}}/software/api/reference/#User) - Added the `IsExemptHOSEnabled` property to indicate whether the user is allowed to use HOS Personal Conveyance.
- [User]({{site.baseurl}}/software/api/reference/#User) - Added `CompanyName`, `CompanyAddress`, and `CarrierNumber` properties to store company and carrier information.
- [User]({{site.baseurl}}/software/api/reference/#User) - Added `CountryCode`, `PhoneNumber`, and `PhoneNumberExtension` properties to assign a phone number to a selected user.

### Drivers

- [Driver]({{site.baseurl}}/software/api/reference/#Driver) - Added `LicenseProvince` and `LicenseNumber` properties.
- [DriverRegulation]({{site.baseurl}}/software/api/reference/#DriverRegulation) - Added `RestBreakNeeded`, `OffDutyNeeded`, `DaySummaries`, `WorkdaySummaries` and `CycleSummaries` properties to DriverRegulation.

### DutyStatuLog

- [DutyStatusLog]({{site.baseurl}}/software/api/reference/#DutyStatusLog) - Added `DeferralStatus`, and `DeferralMinutes` properties to define the duty status deferral and deferral minutes.
- [DutyStatusLogType]({{site.baseurl}}/software/api/reference/#DutyStatusLogType) - Added the `PC_Exempted` property to indicate the status of a driver.

### DVIRLog

- [DVIRLog]({{site.baseurl}}/software/api/reference/#DVIRLog) - Added `LogType` and `DefectList` properties.
- [DVIRLogType]({{site.baseurl}}/software/api/reference/#DVIRLogType) - Most DVIRs are performed as either Pre or Post-trip inspections. To include middle-of-the day scenarios such as discovering new defects, or performing additional inspections, we have added a new `Intrip` inspection type.

### Rules

- [RecipientType]({{site.baseurl}}/software/api/reference/#RecipientType) - Added `HosEnabled` and `HosDisabled` to `RecipientType` to automate HosEnabled/HosDisabled duty status logs using rule notifications. For example, when an exception event occurs, add an HosEnabled or HosDisabled duty status log at the same time as the event for an unidentified driver.
- [ConditionType]({{site.baseurl}}/software/api/reference/#ConditionType) - Added `NoPreDVIRCheck` and `NoPostDVIRCheck` to `ConditionType` when no Pre or Post-trip DVIR is performed between work days.
- [ConditionType]({{site.baseurl}}/software/api/reference/#ConditionType) - Added `SpeedLimitAsMeasurement` property to the `ConditionType` to create rules that only apply to posted road speeds that are greater than, or less than a specified value. For example, it may be more important to alert the driver when the vehicle is travelling less than 10mph, or greater than 10mph on a highway, than it is on a city street.
- [ConditionType]({{site.baseurl}}/software/api/reference/#ConditionType) - The `NoDVIRCheck` `ConditionType` is obsolete and will be removed in a future version. Please use NoPreDVIRCheck and NoPostDVIRCheck.

### Zones

- [Zone]({{site.baseurl}}/software/api/reference/#Zone) - Added the `ZoneTypes` property for enumeration of zone types for a given zone.

### Devices

- [GO9]({{site.baseurl}}/software/api/reference/#Go9) - Added the `ObdAlertEnabled` property to allow users to enable/disable OBD alerts on their vehicles.
- [GoDevice]({{site.baseurl}}/software/api/reference/#GoDevice) - Added the `ParameterVersionOnDevice` property to track the current parameter version on the device. The current `ParameterVersion` property communicates the parameter version to the device; however, parameter updates are not always immediate.
- [Device]({{site.baseurl}}/software/api/reference/#Device) - To prevent mismatches based on system clock settings, we have prevented `ActiveFrom` from being greater than `ActiveTo` when adding a device.

### generator-addin version 3.0

We have modernized the Add-In scaffolding, development and packaging tool to use more current techniques and features:

- Now using webpack.
- Now using Puppeteer for browser testing.
- UI now shows a collapsible navbar.
- Can now toggle multi-language support.
- Can now toggle blur and focus events to simulate leaving and re-visiting the Add-In page.
- For more information visit GitHub: <https://github.com/Geotab/generator-addin>{:target="_blank"}

### mg-api-js version 2.0

This major release merges the API wrappers mg-api-js (previously browser only version) and mg-api-node (previously Nodejs only version) into a single project:

- Uses single js library for nodejs or browser.
- Supports Async promises and legacy callback behavior.
- Simplifies authentication process, no more hard-to-understand callbacks.
- Optional lower-level control over http response.
- For more information visit GitHub: <https://github.com/Geotab/mg-api-js>{:target="_blank"}

### Other SDK Updates

- [BinaryDataSearch]({{site.baseurl}}/software/api/reference/#BinaryDataSearch) - Search by `DeviceSearch.Groups` property using `BinaryDataSearch`.
- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#SecurityIdentifier) - Added `SystemSettings` value to `SecurityIdentifier`.
- Removed the `DiagnosticCategory` object from the [SDK reference]({{site.baseurl}}/software/api/reference) page. This is a legacy object that is no longer in use.
- Updated the ExternalDeviceShutdownDelay documentation to clarify values in minutes rather than seconds.
- Added a sample for getting fuel tax details using the [API runner]({{site.baseurl}}/software/api/runner.html#sample:get-fuel-tax-details).
- Feature preview items now marked as Beta in [SDK reference]({{site.baseurl}}/software/api/reference).
- Added a hardware [Add-On Data Types]({{site.baseurl}}//hardware/hardware-add-on-data-types) section to the SDK.

## 5.7.2001

- AddInData (Feature Preview) - Remove requirement of `AddInDataId` for search by `Id`.

- [AuditSearch]({{site.baseurl}}/software/api/reference/#AuditSearch), [DeviceSearch]({{site.baseurl}}/software/api/reference/#DeviceSearch), [ShipmentLogSearch]({{site.baseurl}}/software/api/reference/#ShipmentLogSearch), [UserSearch]({{site.baseurl}}/software/api/reference/#UserSearch), [ZoneSearch]({{site.baseurl}}/software/api/reference/#ZoneSearch) - Added new search by list of `Keywords`. This allows searching "or" across multiple wildcard searchable string fields of an object in one request. For example, searching for device with keywords will search for matches against `Comment`, `LicensePlate`, `Name`, `SerialNumber` and `VehicleIdentificationNumber` matching the provided keywords. Keywords strings support wildcard character (`%`).

- [BinaryData]({{site.baseurl}}/software/api/reference/#BinaryData) (nuget only) - Fix issue deserializing enum values known to the server but unknown to older nuget package.

- Calculated Engine Hours Search - As mentioned in 5.7.1904 What’s New, `DiagnosticEngineHoursAdjustmentId` is now interpolated using trips and `DiagnosticIgnitionId` values when a search includes a from/toDate value(s) to provide exact values by default.

- [CompanyDetails]({{site.baseurl}}/software/api/reference/#CompanyDetails) - Add documentation describing field length limits. Added more specific error messages relating to max field lengths from `CreateDatabase` method.

- [Device]({{site.baseurl}}/software/api/reference/#Device) - `HardwareId` is no longer returned as part of Device object. For more information regarding this change, please refer to this [community post](https://community.geotab.com/s/question/0D52J00007MIPRYSA5/sdk-notice-removal-of-device-property).

- [DVIRDefect]({{site.baseurl}}/software/api/reference/#DVIRDefect) - Providing `RepairUser` and `RepairDateTime` are no longer supported for unrepaired `DVIRDefect`.

- [DVIRLog]({{site.baseurl}}/software/api/reference/#DVIRLog) - `DefectList` must be provided with `DVIRLog`.

- [GetFeed]({{site.baseurl}}/software/api/reference/#GetFeed1) - Fixed corner case where it was possible to miss data in feed due to concurrency issue.

- [GetFeed]({{site.baseurl}}/software/api/reference/#GetFeed1) `StatusData` - Fix, providing a search to GetFeed `StatusData` containing a `DiagnosticSearch` which has no results within the provided limit of records will now return a feed version advanced by the results limit or remaining records when less then results limit.

- [Get]({{site.baseurl}}/software/api/reference/#Get1) `Diagnostic` - Fix issue searching by `DiagnosticType.ProprietaryFault` or `DiagnosticType.LegacyFault` causing error result.

- [GoCurve]({{site.baseurl}}/software/api/reference/#GoCurve) - Added `IsIoxConnectionEnabled`. (Adds to `GO4v3`, `GO5`, `GO6`, `GO7`, `GO8`, `GO9`)

- [Group]({{site.baseurl}}/software/api/reference/#Group) (nuget only) - Removed `left` and `right` parameters from constructor and `Group.Get` method.

- [GroupRelations]({{site.baseurl}}/software/api/reference/#GroupRelations) - Added `AddInDatas` property. When `Group` linked `AddInData` (Feature Preview) is blocking a `Group` remove, a list blocking `AddInData` `Id`s will be returned in the `GroupRelations` property of `GroupRelationViolatedException`.

- [HosRuleSet]({{site.baseurl}}/software/api/reference/#HosRuleSet) - Added `WashingtonIntrastate7Day`, `WashingtonIntrastate8Day`, `NoneCanada`, `HosRuleSetCanadaNorthOf60CycleOne`, `HosRuleSetCanadaNorthOf60CycleTwo`

- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#SecurityIdentifier) -  Added `ViewGroups`, `AdministerWiFiHotspotSettings`, `ViewWiFiHotspotSettings` 

- [TextMessage]({{site.baseurl}}/software/api/reference/#TextMessage) - Proper support of active from/to dates. *Messages that have not been sent by active to date will not be sent.

- [TextMessageSearch]({{site.baseurl}}/software/api/reference/#TextMessageSearch) - `ParentTextMessageId` (long) is obsolete. Usage should be replaced with `ParentMessageId` (Id).

- [User]({{site.baseurl}}/software/api/reference/#User) - Added `MaxPCDistancePerDay`

- [UserSearch]({{site.baseurl}}/software/api/reference/#UserSearch) - Added "negatable" search of `FistName`, `LastName` and `Name` properties. If the first character of this search property is '!', then the API will know to negate the search logic. For example: `field = "!John%"`, is equivalent to: `WHERE NOT LIKE 'John%'`.

## 5.7.1904

- AddInData (Feature Preview) - Groups are now optional for AddInData objects, currently in Feature preview. Previously, groups were a required property for the AddInData object. This limited the potential usage of AddInData as there are situations where data should be available to all users regardless of scope, and some users were not able to access data when they belonged to groups outside the data’s scope. Removing this restriction means any user is now allowed to get an AddInData object if no group is specified for the object.

- API.cs (nuget only) - Now implements IApi interface. This allows for simpler unit testing of integration code using mocks.

- [BinaryDataType]({{site.baseurl}}/software/api/reference/#BinaryData) - Added `SoftwareVersionFull`

- Calculated Engine Hours Search - With a custom setting (`ENABLEENGINEHOURSINTERPOLATION`) applied to your database, DiagnosticEngineHoursAdjustmentId will now be interpolated using trips and DiagnosticIgnitionId values when a search includes a from/toDate value(s) to provide exact values. To apply this custom setting to your database, please reach out to Geotab support. This will become the default behavior in v5.7.2001.

- [DatabaseExists]({{site.baseurl}}/software/api/reference/#DatabaseExistsAsync) fixed to include databases existing in other federations.

- [FuelTransactionProductType]({{site.baseurl}}/software/api/reference/#FuelTransactionProductType) - Added `Hydrogen` and `DieselExhaustFluid`.

- [FuelTransactionProvider]({{site.baseurl}}/software/api/reference/#FuelTransactionProvider) - Added `GFN`.

- [HosRuleSet]({{site.baseurl}}/software/api/reference/#HosRuleSet) - Added `HosRuleSetCanadaCycleOneTeam` and `HosRuleSetCanadaCycleTwoTeam`.

- [LoginResult]({{site.baseurl}}/software/api/reference/#LoginResult) - Removed unsupported legacy property `SecurityToken`. This property duplicated the supported property `Credentials`. It was previously maintained for compatibility with MyGeotab Web Server 5.6.1 which is no longer supported.

- [Rule]({{site.baseurl}}/software/api/reference/#Rule) - Fix, don't allow adding Rules without Conditions.

- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#SecurityIdentifier) - Added `ViewGroups`.

## 5.7.1903

- [DutyStatusLog]({{site.baseurl}}/software/api/reference/#DutyStatusLog): Added `EditRequestedByUser`.

- [DutyStatusLog]({{site.baseurl}}/software/api/reference/#DutyStatusLog): Locations will not be included with DutyStatusLog by default. To include locations must use `dutyStatusLogSearch.IncludeLocations: true`.

- [DutyStatusLogType]({{site.baseurl}}/software/api/reference/#DutyStatusLogType): Added `HosEnabled`, `HosDisabled`.

- [DVIRLog]({{site.baseurl}}/software/api/reference/#DVIRLog): Added `RepairDate`.

- [IoxAddOn]({{site.baseurl}}/software/api/reference/#IoxAddOn): Added `DateTime` representing when the channel was set to the given value.

- Serialization: ISO date time at zero hour will now have full ISO time ex `1986-01-01` -> `1986-01-01T00:00:00.000Z`.

- [HosRuleSet]({{site.baseurl}}/software/api/reference/#HosRuleSet): Added `AmericaShortHaul14hrWorkday`, `AmericaShortHaul8Day14hrWorkday`, `OilTransportShortHaul14hrWorkday`, `OilTransportShortHaul8Day14hrWorkday`, `CaliforniaFlammableLiquidWithRestRequirement`, `CaliforniaSchoolPupilWithRestRequirement`, `CaliforniaFarmProductWithRestRequirement`, `OilTransportCaliforniaProperty`, `OilWellCaliforniaProperty`, `AmericaSalespersonNonCdlShortHaul`

- [User]({{site.baseurl}}/software/api/reference/#User): Active from/to: The user property `ActiveTo` will automatically be set to max date (2050-01-01) to denote that it is active.
To account for differences in Client machine time vs Server machine time, we are allowing users to set the value of `ActiveTo` to a max window of 24 hours in the future (i.e. Current Time + 24 hours). In this situation we are considering it to be historical.

- [CustomData]({{site.baseurl}}/software/api/reference/#CustomData): Incomplete custom data is no longer returned via GetFeed API.

- [GetFeed]({{site.baseurl}}/software/api/reference/#GetFeed1): Added feeds for entities that could generate more than 50,000 records in a single request. Please take note of the limits on results.

    - [Audit]({{site.baseurl}}/software/api/reference/#Audit) - 50,000 record limit

    - [Device]({{site.baseurl}}/software/api/reference/#Device) - 5,000 record limit

    - [Diagnostic]({{site.baseurl}}/software/api/reference/#Diagnostic) - 50,000 record limit

    - [DriverChange]({{site.baseurl}}/software/api/reference/#DriverChange) - 50,000 record limit

    - [Route]({{site.baseurl}}/software/api/reference/#Route) - 10,000 record limit

    - [Rule]({{site.baseurl}}/software/api/reference/#Rule) - 10,000 record limit

    - [TextMessage]({{site.baseurl}}/software/api/reference/#TextMessage) - 50,000 record limit

    - [Trailer]({{site.baseurl}}/software/api/reference/#Trailer) - 50,000 record limit

    - [User]({{site.baseurl}}/software/api/reference/#User) - 5,000 record limit

    - [Zone]({{site.baseurl}}/software/api/reference/#Zone) - 10,000 record limit

## 5.7.1902

- [ApplicationVersionInformation]({{site.baseurl}}/software/api/reference/#ApplicationVersionInformation): Added beta support

- [BinaryDataType]({{site.baseurl}}/software/api/reference/#BinaryDataType): Added `SoftwareVersionSection1`, `SoftwareVersionSection2`, `SoftwareVersionSection3`

- [DefectRemark]({{site.baseurl}}/software/api/reference/#DefectRemark): Added beta support

- [DefectSeverity]({{site.baseurl}}/software/api/reference/#DefectSeverity): Added `Unregulated`

- [Device]({{site.baseurl}}/software/api/reference/#Device): Adding a device will now force the ActiveTo property to max date. Setting a device's ActiveTo property to a future date, but not max date, will force the value to max date.

- [DeviceType]({{site.baseurl}}/software/api/reference/#DeviceType): Added `GO9`

- [DiagnosticType]({{site.baseurl}}/software/api/reference/#DiagnosticType): Added `ProprietaryFault`, `LegacyFault`

- [DriverRegulation]({{site.baseurl}}/software/api/reference/#DriverRegulation): Added beta support

- [DtcClass]({{site.baseurl}}/software/api/reference/#DtcClass): Added beta support

- [DtcSeverity]({{site.baseurl}}/software/api/reference/#DtcSeverity): Added beta support

- [DutyStatusAvailability]({{site.baseurl}}/software/api/reference/#DutyStatusAvailability): Added properties `CycleRest`, `DutySinceCycleRest`, `Is16HourExemptionAvailable`, `IsAdverseDrivingExemptionAvailable`, `IsOffDutyDeferralExemptionAvailable`

- DutyStatusAvailabilityDuration: Removed from documentionation, will be obsoleted in future

- [DutyStatusViolationType]({{site.baseurl}}/software/api/reference/#DutyStatusViolationType): Added `CycleRest` and `DutySinceCycleRest`

- [DVIRDefect]({{site.baseurl}}/software/api/reference/#DVIRDefect): Added beta support

- [ElectricEnergyUnit]({{site.baseurl}}/software/api/reference/#ElectricEnergyUnit): Added beta support

- [ElectricEnergyEconomyUnit]({{site.baseurl}}/software/api/reference/#ElectricEnergyEconomyUnit): Added beta support

- [FaultData]({{site.baseurl}}/software/api/reference/#FaultData): Added `ClassCode`, `Severity` and `SourceAddress` properties

- [GO9]({{site.baseurl}}/software/api/reference/#Go9): Added support

- [GroupSearch]({{site.baseurl}}/software/api/reference/#GroupSearch): Added search by `Reference`

- [HosRuleSet]({{site.baseurl}}/software/api/reference/#HosRuleSet): Added `CaliforniaFlammableLiquid`, `CaliforniaSchoolPupil`, `CaliforniaFarmProduct`, `OilTransportCalifornia8day`, `OilWellCalifornia8day`

- [KnownId]({{site.baseurl}}/software/api/reference/#KnownId): Added `UnitOfMeasureLitersPerTonneId`, `DiagnosticStateOfChargeId`, `DiagnosticTotalLifetimeBatteryEnergyInDuringACChargingId`, `DiagnosticTotalLifetimeBatteryEnergyInDuringDCChargingId`, `DiagnosticTotalLifetimeOnBoardChargerEnergyOutDuringACChargingId`, `DiagnosticTotalLifetimeOnBoardChargerEnergyInDuringACChargingInId`, `DiagnosticOnBoardChargerAcInputVoltageId`, `DiagnosticElectricVehicleChargingStateId`, `DiagnosticElectricVehicleBatteryPowerId`,  `DiagnosticOnBoardChargerACInputPowerId`, `DiagnosticOnBoardChargerDCOutputPowerId`, `DiagnosticElectricEnergyInId,DiagnosticElectricEnergyOutId`, `HosRuleSetCaliforniaFlammableLiquid`, `HosRuleSetCaliforniaSchoolPupil`, `HosRuleSetCaliforniaFarmProduct`, `HosRuleSetOilTransportCalifornia8day`, `HosRuleSetOilWellCalifornia8day`, `ControllerProprietaryFaultId`, `ControllerLegacyFaultId`, `SourceProprietaryId`, `SourceLegacyId`, `DiagnosticBluetoothNitricOxideConcentrationId`, `DiagnosticBluetoothNitrogenDioxideConcentrationId`, `DiagnosticBluetoothCarbonMonoxideConcentrationId`, `DiagnosticBluetoothAmmoniaConcentrationId`, `DiagnosticBluetoothMethaneConcentrationId`, `DiagnosticBluetoothEthanolConcentrationId`, `DiagnosticBluetoothHydrogenConcentrationId`, `DiagnosticBluetoothCarbonDioxideConcentrationId`

- [MimeContent]({{site.baseurl}}/software/api/reference/#MimeContent): Added `ChannelNumber` property

- [RepairStatusType]({{site.baseurl}}/software/api/reference/#RepairStatusType): Added beta support

- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#SecurityIdentifier): Added `InspectDVIR`, `CertifyDVIR` - Removed `DailyUsageReport`

- [User]({{site.baseurl}}/software/api/reference/#User): Added `ElectricEnergyEconomyUnit` and `isEmailReportEnabled` properties

- [User]({{site.baseurl}}/software/api/reference/#User): Fixed bug where `isDriver` property would be included with `id` in nested driver entities. This property is removed from nested entities. It will remain in non-nested users.

- [VersionInformation]({{site.baseurl}}/software/api/reference/#VersionInformation): `Server` is obsolete and replaced with more detailed `Application` property (see [ApplicationVersionInformation]({{site.baseurl}}/software/api/reference/#ApplicationVersionInformation))

- .Net nuget package: Group constructor with only ID has been removed.

### Result and Rate Limits

For an in-depth description of the result in rate limit changes in 5.7.1902 and future releases see [this blog post](https://www.geotab.com/blog/result-and-rate-limits/)

- [Concepts]({{site.baseurl}}/software/guides/concepts/#limits) section updated to reflect new result and rate limits.

- Result Limits: Maximum result limit of 50,000 has been added to generic `Get` (including `Get` using `search`) requests of entity types: AnnotationLog, DVIRLog, TrailerAttachment, IoxAddOn, CustomData, BinaryData. Results limits will be added to more entity types in future releases.

- Rate Limits: Rate limits of 1 RPS (request-per-second) has been added to all `GetFeed` APIs.

## 5.7.1901

- Sun-setting support for SendEmail API. No longer available in API documentation.

- [Device]({{site.baseurl}}/software/api/reference/#Device): Active from/to:
  - The device property `ActiveTo` will automatically be set to max date (2050-01-01) to denote that it is active.
  - To account for differences in Client machine time vs Server machine time, we are allowing users to set the value of `ActiveTo` to a max window of 24 hours in the future (i.e. Current Time + 24 hours). In this situation we are considering it to be historical.

- [DVIRLog]({{site.baseurl}}/software/api/reference/#DVIRLog): Added `Location` property.

- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#SecurityIdentifier): Added `ViewBusinessIntelligence`, `ActiveTrackingClearance`.

- SecurityRole: Added `EmailSent`, `SkipHosVerify`, `SkipHosClaimUnassigned`, `SkipDvirInspect`.

## 5.7.1804.1

- [API.cs]({{site.baseurl}}/software/api/reference/#API) (.Net only): Fix bug, Windows 10 using IIS Express possible hanging *synchronous* requests using nuget package 5.7.1803\5.7.1804.

## 5.7.1804

- [Add]({{site.baseurl}}/software/api/reference/#Add1)/[Set]({{site.baseurl}}/software/api/reference/#Set1) [Device]({{site.baseurl}}/software/api/reference/#Device): `ParameterVersion` will auto increment server side when device parameters property changed. Server must see that  `ParameterVersion` has incremented to send parameters to an installed GO device (ex device beeping instructions). Previously, `ParameterVersion` required manual increment.

- [API.cs]({{site.baseurl}}/software/api/reference/#API) (.Net only): Fix bug, in certian senario changing `Timeout` property could abort the action on timeout and not cancel underlying request.

- [CustomVehicleDevice]({{site.baseurl}}/software/api/reference/#CustomVehicleDevice): Support of vehicle specific custom devices which provide vehicle specific properties and functionality. Custom device product ID must be of CustomVehicleDevice type. Contact your reseller for more information.

  - Improved support for calculated odometer and raw odometer with third-party diagnostic KnownId `DiagnosticThirdPartyOdometerId` and `OdometerAdjusmentId`

  - Improved support for calculated engine hours with third-party diagnostic KnownId `DiagnosticThirdPartyEngineRunTimeId` and `EngineHoursAdjusmentId`

  - `VehicleIdentificationNumber` property moved from CustomDevice to CustomVehicleDevice

  - Added `LicencePlate` and `LicenceState` properties

- [DutyStatusAvailability]({{site.baseurl}}/software/api/reference/#DutyStatusAvailability): Added BETA support for `Recap` and `CycleAvailabilities` properties

- [DutyStatusAvailability]({{site.baseurl}}/software/api/reference/#DutyStatusAvailability): Replaced `Availabilities` list with separate properties: `Driving`, `Cycle`, `Rest`, `Duty`, `Workday`

- [DeviceType]({{site.baseurl}}/software/api/reference/#DeviceType): Added `CustomVehicleDevice`.

- [DriverChange]({{site.baseurl}}/software/api/reference/#DriverChange): DriverChange object Id property is no longer backed by integer type. It is now backed by GUID type. When update 1804 is applied to the database, all previous numeric entity Id's will be invalidated and assigned a new GUID Id's. This could pose an issue if your integration stores driver change Id and you then reference the DriverChange by that Id. Note: JSON representation of Id was previously string and remains string type.

- [DutyStatusLogType]({{site.baseurl}}/software/api/reference/#DutyStatusLogType): Added `ExemptionOffDutyDeferral`.

- [DutyStatusViolationType]({{site.baseurl}}/software/api/reference/#DutyStatusViolationType): Added `DailyDriving`, `DailyRest`, `DailyDuty`, `DailyOff`.

- [KnownId]({{site.baseurl}}/software/api/reference/#KnownId): Added `DiagnosticThirdPartyEngineRunTimeId`,  `DiagnosticThirdPartyOdometerId`.

- [GetFeed]({{site.baseurl}}/software/api/reference/#GetFeed1) [LogRecord]({{site.baseurl}}/software/api/reference/#LogRecord): Fixed bug with inconstant results limit.

- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#SecurityIdentifier): Added `DirectSupportAdmin`, `UserLoginStatusRead`, `UserLoginStatusSet`.

- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#SecurityIdentifier): Values `AlarmSoundList`, `Tracking`, `CreateNewSqlDatabase`, `EngineControllerList`, `PurgeSettings`, `SendImmobilizationInstruction` are obsolete and will be removed in version 1806+.

- [SecurityRole]({{site.baseurl}}/software/api/reference/#SecurityRole): Added `SupportTicketInsert`, `TrainingTicketInser`, `SupportTicketSet`, `TrainingTicketSetUser`, `LoginFailure`, `UserLockout`, `UserUnlocked`, `ShipmentLogInsert`, `ShipmentLogSet`, `ShipmentLogRemove`, `TrailerAttachmentInsert`, `TrailerAttachmentSet`, `TrailerAttachmentRemove`.

- [ZoneSearch]({{site.baseurl}}/software/api/reference/#ZoneSearch): Added `FromDate` and `ToDate` search properties providing ability to filter zones by their active dates.

> [API.cs]({{site.baseurl}}/software/api/reference/#API) (.Net only): There is a known issue on Windows 10 using IIS Express with possible hanging *synchronous* requests using nuget package 5.7.1803\5.7.1804. This issue is solved in 5.7.1804.1 or greater.

## 5.7.1803

* SecurityRole: Added `CertificateSet` permission

* [DriverChangeSearch]({{site.baseurl}}/software/api/reference/#DriverChangeSearch): Added property `Type` indicating the DriverChangeType to search for exclusively.

> [API.cs]({{site.baseurl}}/software/api/reference/#API) (.Net only): There is a known issue on Windows 10 using IIS Express with possible hanging *synchronous* requests using nuget package 5.7.1803\5.7.1804. This issue is solved in 5.7.1804.1 or greater.

## 5.7.1802

* [DutyStatusLog]({{site.baseurl}}/software/api/reference/#DutyStatusLog): Added properties `Odometer`, `EngineHours`, `EventRecordStatus`, `EventCode`, `EventType`

* [DutyStatusLogType]({{site.baseurl}}/software/api/reference/#DutyStatusLogType): Added `SituationalDrivingClear`

* [FuelTaxDetail]({{site.baseurl}}/software/api/reference/#FuelTaxDetail): Added properties `HourlyIsOdometerInterpolated`, `IsEnterOdometerInterpolated`, `IsExitOdometerInterpolated`

* [FuelTaxDetail]({{site.baseurl}}/software/api/reference/#FuelTaxDetail): Obsolete `IsClusterOdometer` - Superseded by the IsEnterOdometerInterpolated, HourlyIsOdometerInterpolated, and IsExitOdometerInterpolated properties. Will be removed in future version.

* [FuelTaxDetailSearch]({{site.baseurl}}/software/api/reference/#FuelTaxDetailSearch): Added properties `IncludeBoundaries`, `IncludeHourlyData`

* [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#SecurityIdentifier): Added `ViewTripTypeChangeData`, `EditTripTypeChangeData`

### Notice

An issue was discovered which could cause integrations using the Geotab.Checkmate.Objectmodel nuget package v5.7.1801 and lower to encounter a serailizaion failure when a new DiagnosticType is introduced. The issue has been addressed in nuget package v[5.7.1802](https://www.nuget.org/packages/Geotab.Checkmate.ObjectModel/). To ensure compatibility, it is strongly recommended that all integrations referencing the nuget package v5.7.1801 and lower update to version v5.7.1802 as soon as possible. (this issue is only relevant to .Net nuget package users)

## 5.7.1801

* KnownId - Removed: `UnitOfMeasureLitersPer100KilometersId`. Diagnostics associated with this unit of measure now use `UnitOfMeasureKilometersPerLiterId`. This will not affect any previously recorded data.

* KnownId - Added: `DiagnosticGpsLogReasonId`, `DiagnosticEngineRoadSpeedId`

* ConditionType - Added: `DVIRDefect` - Currently works with Devices not Trailers

* SecurityIdentifier - Added: `DriverIdentificationClearance`, `AccelerometerDataClearance`, `ServicePlansClearance`, `AuxiliaryClearance`, `EngineStatusDataClearance`, `ResellerControlClearance`, `GoTalkClearance`, `StatusGroupsClearance`, `ProductGuideClearance`, `FeaturePreviewClearance`, `NewsNotificationsClearance`, `ManageAddinsClearance`, `DeviceCurrentStatusClearance`

### Notice

In early 2018 the following legacy properties will be removed:

**Authenticate**: `userLogin` parameter. This was kept around for compatibility with legacy (5.6.* and lower) integrations. It has not been publicly exposed or documented since version 5.6 of MyGeotab. It is planned to be removed as a valid parameter in version 5.7.1803. The `userName` parameter is the standard supported property that should be used.

**LoginResult**: `securityToken` property. LoginResult is the object returned by the Authenticate method. It's property `securityToken` was kept around for compatibility with legacy (5.6.* and lower) integrations. It has not been publicly exposed or documented since version 5.6 of MyGeotab. It is planned to be removed as a valid parameter in version 5.7.1803. The property `credentials` is the standard supported property that shares the same value.

## 5.7.1712

* API.cs (.Net only) - Fix: When password and session id are supplied to constructor, session id will be used until no longer valid. Previously, session id would only be used if password was not supplied.

* FuelTaxDetail - Added properties: ”IsEnterOdometerInterpolated”, “IsExitOdometerInterpolated”, “HourlyIsOdometerInterpolated”

* User - Removed property: “MenuCollapsedNotified”

## 5.7.1711

* GetAddresses - Added: "hosAddresses" parameter to optionally search for ELD compliant address

* UnitOfMeaure - Added: Kilowatt hours ("UnitOfMeasureKiloWattHoursId")

* SecurityIdentifier - Added "ViewBinaryData", "ManageAddInData", "ViewAddInData"

* HosRuleSet - Added "CarrierExemption"

* .Net SDK samples updated to target netcoreapp2.0

* .Net nuget package now supports framework: netstandard2.0 (removed support for net46)

## 5.7.1709

* API.cs (.Net only) - Added cancellation token parameter to AuthenticateAsync and CallAsync methods.

* DutyStatusLog - Added "Malfunction" property - The DutyStatusMalfunctionType of the DutyStatusLog record. As a flag it can be both a diagnostic and malfunction state which is used to mark status based records (e.g. "D", "SB") as having a diagnostic or malfunction present at time of recording.

* DutyStatusLog - Added "Sequence" property - The sequence number, which is used to generate the sequence ID.

* DutyStatusLogType - Added "EnginePowerup", "EngineShutdown", "EnginePowerupPC", "EngineShutdownPC", "PowerCompliance", "EngineSyncCompliance", "TimingCompliance", "PositioningCompliance", "DataRecordingCompliance", "DataTransferCompliance", "OtherCompliance", "MissingElementCompliance", "UnidentifiedDrivingCompliance", "INT_PC", "INT_D".

* Controller - Added short integer "CodeId" property, which will replace the "Code" property. New "AnyController" for J1708 engine diagnostics to allow replacing those engine diagnostics identical except for the controller with one diagnostic. J1708 engine diagnostics for 58 separate SIDs were updated.

* CustomDevice - Added "VehicleIdentificationNumber" property.

* FuelTaxDetail - Added "Driver" property.

* DriverChangeSearch - Added "IncludeOverlappedChanges" property - A value indicating whether to include the last driver change before the from date or the most recent driver change (if the from date is not provided).

* InvalidUserException - Message changed from to "Incorrect MyGeotab login credentials..." to "Incorrect login credentials...".

### New Objects

* DutyStatusMalfunctionType - Added - Malfunction or Diagnostic type of the DutyStatusLog.

* DutyStatusState - Added - The record status of DutyStatusLog.

## 5.7.1707

* Web Request Notifications: fix {zoneId} and {zoneComment} tokens would not get populated unless {zone} or {address} were also included.

* Documentation: API Reference updated to include default value and max length of object properties in their descriptions. Default values are automatically used when adding an entity and those properties have no value assigned (are null). For example, adding a Group with color = null, will add group with default color "Blue". If a property has no default value, it is required when calling "Add".

* Set operations now retain the value of missing (null) properties. A positive effect of this change is that is remedies a long existing issue that could occur when a server is a newer version (ex 5.7.1704) than client nuget package (ex 5.7.1701) which is making requests to it. The issue could arise when a new Enum value was added and exists only in the server's code base, not client client nuget package. When the unknown Enum was received by the client, it could not be deserialiezed into an Enum value and would throw an exception. Starting in nuget package version 5.7.1707.x, the unknown Enum value will be deserialiezed to null. This means the object can round trip" on "Set" because the server will now (starting at version 5.7.1707) fill in the null value with the existing saved value of the property.

* Added: JsonRpcError, JsonRpcErrorData - to better align JSON-RPC errors with the JSON-RPC 2.0 specification. Non-standard (now legacy) error properties have been deprecated. This should not affect nuget package users as the API.cs object serialized the JSON-RPC error results as Exceptions which are thrown. This may affect users consuming the raw JSON-RPC result of requests. It's recommended to update usages to the official, standardized, properties as outlined in the API Reference. Of note: the new objects exposes "requestIndex" property which is the index at which a "multicall" failed.

* Added: User/Driver objects now have property "IsDriver" to clearly indicate when a user is a driver. This also makes it easier to save a user who is no longer a driver, set the property to false and save.

* Added: FuelTaxDetail - A new entity which provides API access to calculated fuel tax data. In the past this data was only available via the IFTA Report in MyGeotab where it was calculated on the fly. Fuel tax details are now processed using live data and stored in the database and they can be access using the API via Get and GetFeed methods. Full documentation coming soon.

## 5.7.1706

* DatabaseId has been removed from .net package as per the [December 2016 post](https://helpdesk.geotab.com/hc/en-us/community/posts/255601466--NET-SDK-ID-Object-Changes)

* DutyStatusLogType: Added: "Authority"
***requires update of .net nuget package to ensure compatibility***

* FuelTransaction: Added: "ExternalReference"

* FuelTransactionSearch: Added: "ExternalReference" and "Provider"

* User: Added: "AuthorityName" and "AuthorityAddress"

* GetFeed of Trip now includes stop point (woohoo!)
***requires server running 5.7.1706.x**

* <a href="https://my112.geotab.com/sdk/#/apiWrappers" aria-label="API clients section in SDK document">API Clients</a> section added to SDK documentation

* Geotab.Reflection package no longer a dependency of Geotab.Checkmate.Objectmodel nuget package

## 5.7.1705

* GO8: Added preliminary support for GO8 devices
***requires update of .net nuget package to correctly read/write GO8 devices***

* IoxAddOn: Added preliminary support for IoxAddOn, IoxAddOnSearch, SerialIoxContent,KnownIoxAddOnType, IoxOutputContent, MimeContent

* TextMessageSearch: Added search by: "ParentTextMessageId"

## 5.7.1704

* DutyStatusLog - Added property: State

* DutyStatusLogSearch - Added search by device groups

* API.cs is now compatible with System.Net.Http v4.3.1

* Fix, API.cs proxy support. New constructor that accepts HttpMessageHandler, deprecated constructor that accepts IWebProxy and Proxy property

* Fix, content type of API response headers changed from "text/html" to "application/json"

## 5.7.1703

* DevicePlan: Added: D2GODriverChallengeStandard
***requires update of .net nuget package to ensure compatibility***

* HosRuleSet.cs Added: America7DayNo34h, America8DayNo34h, AmericaShortHaulNo34h, AmericaShortHaul8DayNo34h, BrazilShortHaul
***requires update of .net nuget package to ensure compatibility***

* SecurityRole.cs Added: ReassignData
***requires update of .net nuget package to ensure compatibility***

* TimeZoneId: it was possible to add a user or device with "Unknown" time zone ID. This was only possible using the API and "Unknown" is not returned via the GetTimeZones method or a valid Olson time zone. The ability to add users and devices with "Unknown" as been removed and all users and devices with this time zone ID have been changed to "Etc/GMT"

## 5.7.1702

* FuelTransactionProvider: Added - "Voyager", "UltramarCST"

* SecurityIdentifier: Added - "PurchaseMarketplacePaidItems"
***requires update of .net nuget package to ensure compatibility***

* SecurityRole: Added: "TripTypeChangeInsert", "TripTypeChangeRemove", "CustomReportSendError" 
***requires update of .net nuget package to ensure compatibility***

* Fix: nuget package issue making API requests from Azure WebJob

* Fix: TimeZoneInfoAdjustmentRule serialization (result of GetDaylightSavingRules)

## 5.7.1701

* Added "Hardware" section to SDK

* Nuget: Replace usage of Microsoft.Net.Http with System.Net.Http (WebRequest => HttpClient)

* DiagnosticSearch: Added DiagnosticType property to search by the type of diagnostic. Ex, only GoFault diagnostics.

* Added "ExpiredPasswordException" object. This exception can be thrown if a user makes a request while their ChangePassword flag is true. The user must change their password before they are able to successfully make further requests

* SecurityRole: Added "ReportHosAvailability" 
***requires update of .net nuget package to ensure compatibility***

* If you are using the .net nuget package and plan to use the new "HOS Only" device plan you must update to nuget package version 5.7.1701 or greater to ensure compatibility.

## 5.7.1612

* Id refactoring - The ID object has been refactored in the .NET SDK. See [this forum post](https://helpdesk.geotab.com/hc/en-us/community/posts/255601466--NET-SDK-ID-Object-Changes) for details.

* Updated description of GoCurveAuxiliary (GO4v3, GO6, GO7) properties:
ImmobilizeUnit: With ImmobilizeUnit being true, it is used to define the delay before the driver identification reminder is sent out if the driver key has not been not swiped. The maximum value of this property is 255. When it is less or equal to 180, it indicates the number of seconds of the delay.  When it is greater than 180, the delay increases 30 seconds for every increment of one of this property. For example, 180 indicates 180 seconds, 181 indicates 210 seconds, and 182 indicates 240 seconds.
ImmobilizeArming: A value mainly used for enable or disable driver identification reminder. If it is used in conjunction with vehicle relay circuits, it can force the driver to swipe the driver key before starting the vehicle.

## 5.7.1611

* Authentication rate limiting being phased in. See this [Blog Post](https://www.geotab.com/blog/api-call-limits/) for more details. Added "Rate Limiting" section to [SDK Concepts]({{site.baseurl}}/software/guides/concepts/).

* KnownId - Added: "DiagnosticDieselExhaustFluidId", ”DiagnosticDieselParticulateFilterLampId”, “DiagnosticPowerTakeoffEngagedId”, “DiagnosticPowerTakeoffTotalFuelUsedId”

* KnownId - Removed: "DiagnosticBluetoothBeaconOutOfRangeId"

* Trailer - Added "Groups" property. Trailers can now be added to groups.

* TrailerSearch - Added property groups. Search for Trailers that are members of these GroupSearch(s) one of it's children or one of it's parents.

* *SecurityIdentifier - Added: "RepairDVIR"

*Important: Update .Net [nuget](https://www.nuget.org/packages/Geotab.Checkmate.ObjectModel/) package to ensure compatibility

## 5.7.1610

* KnownId - Added: "DiagnosticDieselExhaustFluidId”, "DiagnosticDieselParticulateFilterLampId”, “DiagnosticPowerTakeoffEngagedId”, “DiagnosticPowerTakeoffTotalFuelUsedId”

* HosRuleSet - Added: "Florida7Day”, "Florida8Day”, “FloridaShortHaul7Day”, “FloridaShortHaul8Day”

### New Objects

* OverLimitException:
Thrown when a user has exceeded the query limit of an API (currently only applies to authentication). Previously, if a user reached this limit, an InvalidUserException would have been thrown.

## 5.7.1609

* KnownId - "DiagnosticRamFailure" name fixed to be “DiagnosticRamFailureId”

## 5.7.1608

* MessageContentType - Added: "DriverWhiteList"

* DutyStatusLogType - Added: "PC" (Personal conveyance driver status), “YM” (Yard move driver status), “WT” (Wait time oil well driver status).

* FuelTransaction - Added "ProductType" property.

* FuelTransactionProvider - Added "WexLegacy", “Fuelman” and “Comdata”.

* GoDevice - Added "GoTalkLanguage" property.

* User - Added "IsYardMoveEnabled" and "IsPersonalConveyanceEnabled" properties.

* HosRuleSet - Added "OilWell7Day", “OilWell7DayBig”, “OilWell8Day”, “OilWell8DayBig”, “AmericaTexas”, “AmericaTexasShortHaul”, “OilTransportTexas”, “OilWellTexas”, “AmericaShortHaul8Day”, “AmericaShortHaulPassenger8Day”, “OilTransportShortHaul8Day”, “AmericaTexasShortHaul8Day”

* KnownId - Added "DiagnosticSystemAlertId"

* TimeZoneInfo - Adjusted to support recently updated Windows times zones and the latest version of [IANA/Windows](http://www.unicode.org/cldr/charts/dev/supplemental/zone_tzid.html) maped time zones. [Click here for more info](https://docs.google.com/document/d/1kjIhyqpgOg1wNHi3JkvV7uXVBzhl5stlZZxIVjXs1Fc/edit#)

### New Objects

* DriverWhiteListContent

* GoTalkLanguage

* FuelTransactionProductType

For detailed information on new features please review the API Reference.

**.Net users will require a dll update*

## 5.7.1607

* Performance and maintenance enhancements.

## 5.7.1606

* DiagnosticTypes - Added "GoFault"

* FuelTransactionProvider - Added "WexCustomer", "Drive" and "FuelTracker"

* SecurityIdentifier - Added "EventOccurrenceList","ViewCertificates","ManageCertificates"

* HosRuleSet - Added "AmericaSalesperson"

* .Net: MachineSettings - Fix to work with ASP.Net Web API projects

* .Net: DataToComponenet - Updated "Equals" method to compare payloads for equality

* .Net: DutyStatusOrigin - removed unused "Serializable" attribute

* .Net - Changes in API.cs to use HttpClient instead of HttpWebRequest in order to support .Net core in the future.

* dll requires .Net Framework version v4.6+

### New APIs

* GetDirections

* OptimizeWaypoints

### New Objects

* Directions

* Leg

* Step

* Waypoint

**.Net users will require a dll update*

## 5.7.1605

*  Added new Units of Measure (km/L, kg/km, L/lane km, L/ton and g/m^2)
** .Net users will require a dll update*

## 5.7.1604

* For security reasons, TLS 1.2 is being enforced on all servers. To fix the integration, please update to at least .NET 4.5 and use the [latest nuget package](https://www.nuget.org/packages/Geotab.Checkmate.ObjectModel/). For more information, please visit the [forum discussion](https://helpdesk.geotab.com/entries/108236723-TLS1-2-Upgrade-Notice).

* Driver has a new property: viewDriversOwnDataOnly. When set to true, a driver gains the ability to view their own driving data.
** .Net users will require a dll update*

## 5.7.1602

* TextToSpeechContent has been renamed to GoTalkContent and RelayContent has been renamed to IoxOutputContent
** .Net users will require a dll update*

## 5.7.1601

* New recipient types added that will send even if there is a delay in data. (BeepTenTimesRapidlyAllowDelay, BeepThreeTimesAllowDelay, BeepThreeTimesRapidlyAllowDelay , TextToSpeechAllowDelay)
** .Net users will require a dll update*

* Access to third party messages via API.
** .Net users will require a dll update*

### New Objects

* IoxAddOn

* KnownIoxAddOnType

* IoxAddOnSearch

* IoxOutputContent

* GoTalkContent

## 5.7.1512

* Fixed operator overloading for Id object in .Net dll (id1 == id2 is the same as id1.Equals(id2)) - **If you are using dll version 5.7.1508-1511 this will require a dll update.*

* New addin: Trips Streetview added to [GitHub](https://github.com/Geotab/addin-trips-streetview)

## 5.7.1511

* Added new security clearances for:

    * ViewMarketplacePaidItems:  Allow user to see paid Marketplace items

    * DeviceAdminDeleteUnplugReplace: Access to removing vehicle, unpluging device, and replacing device.

**If you are using dll version 5.7.1508-1510 this will require a dll update.*

## 5.7.1509

* New SDK.  Featuring the new [SDK Runner](https://geotab.github.io/sdk/software/api/runner.html), new methods and objects ([click here to see the preview items](https://geotab.github.io/sdk/software/api/reference/))

* Code snippets in the reference documentation.  Now you can see working examples of the methods as they are used in the runner.

* .Net users will require a .DLL update to access the latest features.

### New Methods

* CreateDatabase

* DatabaseExists

* GenerateCaptcha

* GetVersionInformation

### New Objects

* AnnotationLog

* AnnotationLogSearch

* CaptchaAnswer

* CaptchaException

* Color

* CompanyDetails

* DVIRLog

* DVIRLogSearch

* DiagnosticCategory

* DistributionList

* DuplicateException

* DutyStatusAvailability

* DutyStatusAvailabilityDuration

* DutyStatusAvailablitySearch

* DutyStatusLog

* DutyStatusLogSearch

* DutyStatusLogType

* DutyStatusViolation

* DutyStatusViolationSearch

* DutyStatusViolationType

* EntityWithVersion

* FuelEconomyUnit

* FuelEvent

* FuelTransaction

* FuelTransactionProvider

* HosRuleSet

* IncludeGroups

* InvalidMyAdminUserException

* MapView

* NameEntity

* NameEntityWithVersion

* RadioDownloaderSearch

* Recipient

* RecipientType

* RegistrationException

* Search

* ShipmentLog

* ShipmentLogSearch

* TextMessageContentType

* Trailer

* TrailerAttachment

* TrailerAttachmentSearch

* TrailerSearch

* VersionInformation

* VolumeUnit

### Deprecated

* BingMapStyle

* EngineType

* EngineTypeSearch

* StatusDataRequestContent

## 5.7.1508

* DriverChangeSearch received new search points including: DeviceSearch, DriverSearch, FromDate and ToDate. Checkout the [API Reference]({{site.baseurl}}/software/api/reference/) for more details

* DistributionList is now supported by the API. Checkout the [API Reference]({{site.baseurl}}/software/api/reference/) for more details. Some related objects are still pending support (Notification, NotificationTemplate, BinaryData)

* <a href="https://github.com/Geotab/sdk-addin-samples" aria-label="Add-In examples in SDK documentation">Add-In examples</a> have been added to SDK documentation

* When searching for Zones you can now specify a traversal method of the group tree. You can choose to include just the specified element, just the ancestors, just the descendents, or both ancestors and descendents. See the ZoneSearch object in the [API Reference]({{site.baseurl}}/software/api/reference/) for more details

* Fix documentation for object properties

* Added KnownIds: DiagnosticDeviceTotalIdleFuel

* Added FuelTransaction API (*Beta*)

* HOS/DVIR objects supported in API. Key objects are AnnotationLog, DVIRLog, DutyStatusAvailability, DutyStatusLog, DutyStatusViolation, and ShipmentLog. Check out the [API Reference]({{site.baseurl}}/software/api/reference/) for more details

* Added Groups property to StatusDataSearch. This allows searching for status data for devices in the supplied groups. This does not return interpolated results

* Added from/to date search to UserSearch object. Checkout the [API Reference]({{site.baseurl}}/software/api/reference/) for more details

* [API Reference]({{site.baseurl}}/software/api/reference/), objects now show properties from inherited classes. For example GoDevice extends Device and will show properties of GoDevice and Device in the documentation

* Geotab Announces New [DEV Channel](https://www.geotab.com/dev-channel/) for Developers

## 5.7.1505

* New condition types added - .Net will require dll update

## 5.7.1504

* Add KnownId for DiagnosticDeviceTotalIdleFuelId - .Net will require dll update

## 5.7.1502

* Get *all* zones now populating points correctly (<a href="https://helpdesk.geotab.com/entries/26004844-Get-Zone-return-distinct-points" aria-label="forum post about zones populating points correctly">see forum post</a>)

* Fixed TimeZoneInfo isDaylightSavingsSupported always false using .Net API client

* Units of measure have been converted to use Known Id’s (<a href="https://helpdesk.geotab.com/entries/52897090-MyGeotab-SDK-Update-KnownId" aria-label="forum post about using known Ids">see forum post</a>)

* Adding, setting and removing of some entities has been disabled via the API. Exception Event, Trip, Status Data, Fault Data, Log Record with exceptions for adding odometer and engine hours adjustments and dismissing faults

* Clearer documentation of date and long values in [API Reference]({{site.baseurl}}/software/api/reference/)

* Data Feed section added to Guides portion of SDK ([see document](https://docs.google.com/document/d/1LJfb57qyBX2WklnqioHtlWkYN9xKBWxA_FIpaJzjKyY/edit))
