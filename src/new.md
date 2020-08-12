---
layout: page
permalink: /resources/new/
title: What's New
---
## 5.7.2003

##### General improvements

JSON serialization improvements have been made to increase the efficiency of API calls. This is especially noticeable on API calls with large response payload. For example, calling `GetFeed` of `StatusData` with full payload (50,000 results), the average end to end time decreased from 1800 ms to 800 ms.

##### TextMessage and TextMessageSearch

- [TextMessage]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.TextMessage) - Added `Recipient`. This property is used to send a text message to a user.
- [TextMessageSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.TextMessageSearch) - Added searching by `IsDelivered`, `IsRead`, `UserSearch`.
  - `IsDelivered`, when set to true, returns all text messages that were delivered to the recipient/device.
  - `IsRead`, when set to true, returns all text messages that were read by the recipient/device.
  - `UserSearch` searches TextMessages from a user, and users in the specified `CompanyGroups` or `DriverGroups`.
- [TextMessageSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.TextMessageSearch) - Added searching by `ContentTypes` and `IsDirectionToVehicle`.
  - `ContentTypes` searches for TextMessages based on their MessageContentType.
  - `IsDirectionToVehicle`, when set to true, will return all text messages that were sent to the device. If set to false, it will return all text messages that were not sent to the device.

##### SecurityIdentifier

- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.SecurityIdentifier) - `PerformanceReport` has been removed.

##### Exception Messages

Some exception messages contained escaped Unicode characters. We have fixed these to exclude escaped characters. See the example message change below:

```text
The method \u0022NotAMethod\u0022 could not be found. Verify the method name and ensure all method parameters are included
```

```text
The method 'NotAMethod' could not be found. Verify the method name and ensure all method parameters are included
```

This fix applies to messages of exception types `MissingMethodException`, `AmbiguousMatchException`, `MissingMemberException` and `JsonSerializationException`.

##### DiagnosticType

- [DiagnosticType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Engine.DiagnosticType) - Added `GmcccFault` and `BrpFault`

##### KnownId

- [KnownId]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.KnownId) - Added `ControllerGmcccFaultId`, `SourceGmcccId`, `SourceGmcccObsoleteId`, `ControllerBrpFaultId`, `SourceBrpId`, `SourceBrpObsoleteId`
- [KnownId]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.KnownId) - Added `NoExceptionEventId`, `NoRuleId`

##### Device

- [Device]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Device) - Added `AutoHos`. This property is a toggle that represents automatic generation of DutyStatusLogs for a `GoDevice` and/or a `CustomVehicleDevice`.

##### DutyStatusViolation

- [DutyStatusViolation]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusViolation) - Added `HoursLimit` and `DaysLimit`. These properties show the maximum or minimum hours and/or days limit for duty status violations.
- [DutyStatusViolation]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusViolation) - Deprecated `Reason` property. This will be removed in a future version. The data in the Reason property string is now provided as `DaysLimit` and `HoursLimit` for better programmatic access.

##### UserSearch

- [UserSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.UserSearch) - Added searching by `LicenseNumber`, `EmployeeNumber`, `HosRuleSet` and `UserAuthenticationType`.

##### GetFeed DebugData

- [GetFeed]({{site.baseurl}}/software/api/reference/#M:Geotab.Checkmate.Database.DataStore.GetFeed1): [DebugData]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DebugData) - Fixed sort order issue leading to possible missed records.

##### FuelTransaction

- [FuelTransaction]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Fuel.FuelTransaction) - Added `Device` and `Driver`. These properties add fuel transactions for a device or user, rather than a loose match by VIN, etc. If left null, the application will attempt to match the fuel transaction to a device and driver at time of an Add or a Set. If no match is found, the fuel transaction's `Device` and `Driver` properties defaults to NoDevice and UnknownDriver.

##### DVIRLog

- [DVIRLog]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DVIRLog) - Added `AuthorityName`, `AuthorityAddress`, `Odometer`, `LoadHeight`, `LoadWidth` and `IsInspectedByDriver`. These properties support Canadian DVIR inspections. AuthorityName and AuthorityAddress are automatically populated based on what the user's corresponding fields are at the time. Odometer currently only applies to the entered `Hubometer` value for Trailer DVIRs.

##### ConditionType

- [ConditionType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Exceptions.ConditionType) - Added `IsValueLessThanPercent` and `IsValueMoreThanPercent`. These properties are used to create a percentage threshold for speeding violations, rather than an exact speed value under/over the current posted road speed.

##### WebServerInvoker (Nuget only)

This method has been changed to use generics instead of passing type in, and returning an object, that needs  to be cast. For example, `var version = (string)(await invoker.InvokeAsync("GetVersion", typeof(string)));` is now `var version = await invoker.InvokeAsync<string>("GetVersion");`

> While not an officially supported component, it's possible `WebServerInvoker` is being used by some integrations. For this reason we thought it worth mentioning this change.

## 5.7.2002

##### NuGet

<span style="color:red">! IMPORTANT</span>: A bug has been identified with Geotab.Checkmate.Objectmodel NuGet packages older than version 5.7.2002, which can lead to serialization errors when a previous version received a new device plan value. Please update to the latest NuGet package to establish compatibility.

##### Map Add-In

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

##### Interpolation

- [Get]({{site.baseurl}}/software/api/reference/#M:Geotab.Checkmate.Database.DataStore.Get1): [StatusData]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Engine.StatusData), [LogRecord]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.LogRecord) - In the v5.7.2001 release and earlier, we interpolate between points when using `StatusData` and `LogRecord` API. When a date is requested that is less than or greater than the data, we return the first/last value with the date of the time requested. To minimize confusion, we now return the _first/last_ value with the _correct_ dateTime.

##### Users

- [User]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.User) - Added the `IsExemptHOSEnabled` property to indicate whether the user is allowed to use HOS Personal Conveyance.
- [User]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.User) - Added `CompanyName`, `CompanyAddress`, and `CarrierNumber` properties to store company and carrier information.
- [User]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.User) - Added `CountryCode`, `PhoneNumber`, and `PhoneNumberExtension` properties to assign a phone number to a selected user.

##### Drivers

- [Driver]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Driver) - Added `LicenseProvince` and `LicenseNumber` properties.
- [DriverRegulation]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DriverRegulation) - Added `RestBreakNeeded`, `OffDutyNeeded`, `DaySummaries`, `WorkdaySummaries` and `CycleSummaries` properties to DriverRegulation.

##### DutyStatuLog

- [DutyStatusLog]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusLog) - Added `DeferralStatus`, and `DeferralMinutes` properties to define the duty status deferral and deferral minutes.
- [DutyStatusLogType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusLogType) - Added the `PC_Exempted` property to indicate the status of a driver.

##### DVIRLog

- [DVIRLog]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DVIRLog) - Added `LogType` and `DefectList` properties.
- [DVIRLogType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DVIRLogType) - Most DVIRs are performed as either Pre or Post-trip inspections. To include middle-of-the day scenarios such as discovering new defects, or performing additional inspections, we have added a new `Intrip` inspection type.

##### Rules

- [RecipientType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.RecipientType) - Added `HosEnabled` and `HosDisabled` to `RecipientType` to automate HosEnabled/HosDisabled duty status logs using rule notifications. For example, when an exception event occurs, add an HosEnabled or HosDisabled duty status log at the same time as the event for an unidentified driver.
- [ConditionType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Exceptions.ConditionType) - Added `NoPreDVIRCheck` and `NoPostDVIRCheck` to `ConditionType` when no Pre or Post-trip DVIR is performed between work days.
- [ConditionType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Exceptions.ConditionType) - Added `SpeedLimitAsMeasurement` property to the `ConditionType` to create rules that only apply to posted road speeds that are greater than, or less than a specified value. For example, it may be more important to alert the driver when the vehicle is travelling less than 10mph, or greater than 10mph on a highway, than it is on a city street.
- [ConditionType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Exceptions.ConditionType) - The `NoDVIRCheck` `ConditionType` is obsolete and will be removed in a future version. Please use NoPreDVIRCheck and NoPostDVIRCheck.

##### Zones

- [Zone]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Zone) - Added the `ZoneTypes` property for enumeration of zone types for a given zone.

##### Devices

- [GO9]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Go9) - Added the `ObdAlertEnabled` property to allow users to enable/disable OBD alerts on their vehicles.
- [GoDevice]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.GoDevice) - Added the `ParameterVersionOnDevice` property to track the current parameter version on the device. The current `ParameterVersion` property communicates the parameter version to the device; however, parameter updates are not always immediate.
- [Device]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Device) - To prevent mismatches based on system clock settings, we have prevented `ActiveFrom` from being greater than `ActiveTo` when adding a device.

##### generator-addin version 3.0

We have modernized the Add-In scaffolding, development and packaging tool to use more current techniques and features:

- Now using webpack.
- Now using Puppeteer for browser testing.
- UI now shows a collapsible navbar.
- Can now toggle multi-language support.
- Can now toggle blur and focus events to simulate leaving and re-visiting the Add-In page.
- For more information visit GitHub: <https://github.com/Geotab/generator-addin>{:target="_blank"}

##### mg-api-js version 2.0

This major release merges the API wrappers mg-api-js (previously browser only version) and mg-api-node (previously Nodejs only version) into a single project:

- Uses single js library for nodejs or browser.
- Supports Async promises and legacy callback behavior.
- Simplifies authentication process, no more hard-to-understand callbacks.
- Optional lower-level control over http response.
- For more information visit GitHub: <https://github.com/Geotab/mg-api-js>{:target="_blank"}

##### Other SDK Updates

- [BinaryDataSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.BinaryDataSearch) - Search by `DeviceSearch.Groups` property using `BinaryDataSearch`.
- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.SecurityIdentifier) - Added `SystemSettings` value to `SecurityIdentifier`.
- Removed the `DiagnosticCategory` object from the [SDK reference]({{site.baseurl}}/software/api/reference) page. This is a legacy object that is no longer in use.
- Updated the ExternalDeviceShutdownDelay documentation to clarify values in minutes rather than seconds.
- Added a sample for getting fuel tax details using the [API runner]({{site.baseurl}}/software/api/runner.html#sample:get-fuel-tax-details).
- Feature preview items now marked as Beta in [SDK reference]({{site.baseurl}}/software/api/reference).
- Added a hardware [Add-On Data Types]({{site.baseurl}}//hardware/hardware-add-on-data-types) section to the SDK.

## 5.7.2001

- AddInData (Feature Preview) - Remove requirement of `AddInDataId` for search by `Id`.

- [AuditSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.AuditSearch), [DeviceSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DeviceSearch), [ShipmentLogSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.ShipmentLogSearch), [UserSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.UserSearch), [ZoneSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.ZoneSearch) - Added new search by list of `Keywords`. This allows searching "or" across multiple wildcard searchable string fields of an object in one request. For example, searching for device with keywords will search for matches against `Comment`, `LicensePlate`, `Name`, `SerialNumber` and `VehicleIdentificationNumber` matching the provided keywords. Keywords strings support wildcard character (`%`).

- [BinaryData]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.BinaryData) (nuget only) - Fix issue deserializing enum values known to the server but unknown to older nuget package.

- Calculated Engine Hours Search - As mentioned in 5.7.1904 What’s New, `DiagnosticEngineHoursAdjustmentId` is now interpolated using trips and `DiagnosticIgnitionId` values when a search includes a from/toDate value(s) to provide exact values by default.

- [CompanyDetails]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Registration.CompanyDetails) - Add documentation describing field length limits. Added more specific error messages relating to max field lengths from `CreateDatabase` method.

- [Device]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Device) - `HardwareId` is no longer returned as part of Device object. For more information regarding this change, please refer to this [community post](https://community.geotab.com/s/question/0D52J00007MIPRYSA5/sdk-notice-removal-of-device-property).

- [DVIRDefect]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DVIRDefect) - Providing `RepairUser` and `RepairDateTime` are no longer supported for unrepaired `DVIRDefect`.

- [DVIRLog]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DVIRLog) - `DefectList` must be provided with `DVIRLog`.

- [GetFeed]({{site.baseurl}}/software/api/reference/#M:Geotab.Checkmate.Database.DataStore.GetFeed1) - Fixed corner case where it was possible to miss data in feed due to concurrency issue.

- [GetFeed]({{site.baseurl}}/software/api/reference/#M:Geotab.Checkmate.Database.DataStore.GetFeed1) `StatusData` - Fix, providing a search to GetFeed `StatusData` containing a `DiagnosticSearch` which has no results within the provided limit of records will now return a feed version advanced by the results limit or remaining records when less then results limit.

- [Get]({{site.baseurl}}/software/api/reference/#M:Geotab.Checkmate.Database.DataStore.Get1) `Diagnostic` - Fix issue searching by `DiagnosticType.ProprietaryFault` or `DiagnosticType.LegacyFault` causing error result.

- [GoCurve]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.GoCurve) - Added `IsIoxConnectionEnabled`. (Adds to `GO4v3`, `GO5`, `GO6`, `GO7`, `GO8`, `GO9`)

- [Group]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Group) (nuget only) - Removed `left` and `right` parameters from constructor and `Group.Get` method.

- [GroupRelations]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.GroupRelations) - Added `AddInDatas` property. When `Group` linked `AddInData` (Feature Preview) is blocking a `Group` remove, a list blocking `AddInData` `Id`s will be returned in the `GroupRelations` property of `GroupRelationViolatedException`.

- [HosRuleSet]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.Settings.HosRuleSet) - Added `WashingtonIntrastate7Day`, `WashingtonIntrastate8Day`, `NoneCanada`, `HosRuleSetCanadaNorthOf60CycleOne`, `HosRuleSetCanadaNorthOf60CycleTwo`

- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.SecurityIdentifier) -  Added `ViewGroups`, `AdministerWiFiHotspotSettings`, `ViewWiFiHotspotSettings` 

- [TextMessage]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.TextMessage) - Proper support of active from/to dates. *Messages that have not been sent by active to date will not be sent.

- [TextMessageSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.TextMessageSearch) - `ParentTextMessageId` (long) is obsolete. Usage should be replaced with `ParentMessageId` (Id).

- [User]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.User) - Added `MaxPCDistancePerDay`

- [UserSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.UserSearch) - Added "negatable" search of `FistName`, `LastName` and `Name` properties. If the first character of this search property is '!', then the API will know to negate the search logic. For example: `field = "!John%"`, is equivalent to: `WHERE NOT LIKE 'John%'`.

## 5.7.1904

- AddInData (Feature Preview) - Groups are now optional for AddInData objects, currently in Feature preview. Previously, groups were a required property for the AddInData object. This limited the potential usage of AddInData as there are situations where data should be available to all users regardless of scope, and some users were not able to access data when they belonged to groups outside the data’s scope. Removing this restriction means any user is now allowed to get an AddInData object if no group is specified for the object.

- API.cs (nuget only) - Now implements IApi interface. This allows for simpler unit testing of integration code using mocks.

- [BinaryDataType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.BinaryData) - Added `SoftwareVersionFull`

- Calculated Engine Hours Search - With a custom setting (`ENABLEENGINEHOURSINTERPOLATION`) applied to your database, DiagnosticEngineHoursAdjustmentId will now be interpolated using trips and DiagnosticIgnitionId values when a search includes a from/toDate value(s) to provide exact values. To apply this custom setting to your database, please reach out to Geotab support. This will become the default behavior in v5.7.2001.

- [DatabaseExists]({{site.baseurl}}/software/api/reference/#M:CheckmateServer.Web.WebMethods.DatabaseExistsAsync) fixed to include databases existing in other federations.

- [FuelTransactionProductType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Fuel.FuelTransactionProductType) - Added `Hydrogen` and `DieselExhaustFluid`.

- [FuelTransactionProvider]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Fuel.FuelTransactionProvider) - Added `GFN`.

- [HosRuleSet]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.Settings.HosRuleSet) - Added `HosRuleSetCanadaCycleOneTeam` and `HosRuleSetCanadaCycleTwoTeam`.

- [LoginResult]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.LoginResult) - Removed unsupported legacy property `SecurityToken`. This property duplicated the supported property `Credentials`. It was previously maintained for compatibility with MyGeotab Web Server 5.6.1 which is no longer supported.

- [Rule]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Exceptions.Rule) - Fix, don't allow adding Rules without Conditions.

- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.SecurityIdentifier) - Added `ViewGroups`.

## 5.7.1903

- [DutyStatusLog]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusLog): Added `EditRequestedByUser`.

- [DutyStatusLog]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusLog): Locations will not be included with DutyStatusLog by default. To include locations must use `dutyStatusLogSearch.IncludeLocations: true`.

- [DutyStatusLogType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusLogType): Added `HosEnabled`, `HosDisabled`.

- [DVIRLog]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DVIRLog): Added `RepairDate`.

- [IoxAddOn]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.IoxAddOn): Added `DateTime` representing when the channel was set to the given value.

- Serialization: ISO date time at zero hour will now have full ISO time ex `1986-01-01` -> `1986-01-01T00:00:00.000Z`.

- [HosRuleSet]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.Settings.HosRuleSet): Added `AmericaShortHaul14hrWorkday`, `AmericaShortHaul8Day14hrWorkday`, `OilTransportShortHaul14hrWorkday`, `OilTransportShortHaul8Day14hrWorkday`, `CaliforniaFlammableLiquidWithRestRequirement`, `CaliforniaSchoolPupilWithRestRequirement`, `CaliforniaFarmProductWithRestRequirement`, `OilTransportCaliforniaProperty`, `OilWellCaliforniaProperty`, `AmericaSalespersonNonCdlShortHaul`

- [User]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.User): Active from/to: The user property `ActiveTo` will automatically be set to max date (2050-01-01) to denote that it is active.
To account for differences in Client machine time vs Server machine time, we are allowing users to set the value of `ActiveTo` to a max window of 24 hours in the future (i.e. Current Time + 24 hours). In this situation we are considering it to be historical.

- [CustomData]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.CustomData): Incomplete custom data is no longer returned via GetFeed API.

- [GetFeed]({{site.baseurl}}/software/api/reference/#M:Geotab.Checkmate.Database.DataStore.GetFeed1): Added feeds for entities that could generate more than 50,000 records in a single request. Please take note of the limits on results.

    - [Audit]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Audit) - 50,000 record limit

    - [Device]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Device) - 5,000 record limit

    - [Diagnostic]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Engine.Diagnostic) - 50,000 record limit

    - [DriverChange]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DriverChange) - 50,000 record limit

    - [Route]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Route) - 10,000 record limit

    - [Rule]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Exceptions.Rule) - 10,000 record limit

    - [TextMessage]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.TextMessage) - 50,000 record limit

    - [Trailer]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Trailer) - 50,000 record limit

    - [User]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.User) - 5,000 record limit

    - [Zone]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Zone) - 10,000 record limit

## 5.7.1902

- [ApplicationVersionInformation]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.ApplicationVersionInformation): Added beta support

- [BinaryDataType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.BinaryDataType): Added `SoftwareVersionSection1`, `SoftwareVersionSection2`, `SoftwareVersionSection3`

- [DefectRemark]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DefectRemark): Added beta support

- [DefectSeverity]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DefectSeverity): Added `Unregulated`

- [Device]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Device): Adding a device will now force the ActiveTo property to max date. Setting a device's ActiveTo property to a future date, but not max date, will force the value to max date.

- [DeviceType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DeviceType): Added `GO9`

- [DiagnosticType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Engine.DiagnosticType): Added `ProprietaryFault`, `LegacyFault`

- [DriverRegulation]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DriverRegulation): Added beta support

- [DtcClass]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Engine.DtcClass): Added beta support

- [DtcSeverity]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Engine.DtcSeverity): Added beta support

- [DutyStatusAvailability]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusAvailability): Added properties `CycleRest`, `DutySinceCycleRest`, `Is16HourExemptionAvailable`, `IsAdverseDrivingExemptionAvailable`, `IsOffDutyDeferralExemptionAvailable`

- DutyStatusAvailabilityDuration: Removed from documentionation, will be obsoleted in future

- [DutyStatusViolationType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusViolationType): Added `CycleRest` and `DutySinceCycleRest`

- [DVIRDefect]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DVIRDefect): Added beta support

- [ElectricEnergyUnit]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.Settings.ElectricEnergyUnit): Added beta support

- [ElectricEnergyEconomyUnit]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.Settings.ElectricEnergyEconomyUnit): Added beta support

- [FaultData]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Engine.FaultData): Added `ClassCode`, `Severity` and `SourceAddress` properties

- [GO9]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Go9): Added support

- [GroupSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.GroupSearch): Added search by `Reference`

- [HosRuleSet]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.Settings.HosRuleSet): Added `CaliforniaFlammableLiquid`, `CaliforniaSchoolPupil`, `CaliforniaFarmProduct`, `OilTransportCalifornia8day`, `OilWellCalifornia8day`

- [KnownId]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.KnownId): Added `UnitOfMeasureLitersPerTonneId`, `DiagnosticStateOfChargeId`, `DiagnosticTotalLifetimeBatteryEnergyInDuringACChargingId`, `DiagnosticTotalLifetimeBatteryEnergyInDuringDCChargingId`, `DiagnosticTotalLifetimeOnBoardChargerEnergyOutDuringACChargingId`, `DiagnosticTotalLifetimeOnBoardChargerEnergyInDuringACChargingInId`, `DiagnosticOnBoardChargerAcInputVoltageId`, `DiagnosticElectricVehicleChargingStateId`, `DiagnosticElectricVehicleBatteryPowerId`,  `DiagnosticOnBoardChargerACInputPowerId`, `DiagnosticOnBoardChargerDCOutputPowerId`, `DiagnosticElectricEnergyInId,DiagnosticElectricEnergyOutId`, `HosRuleSetCaliforniaFlammableLiquid`, `HosRuleSetCaliforniaSchoolPupil`, `HosRuleSetCaliforniaFarmProduct`, `HosRuleSetOilTransportCalifornia8day`, `HosRuleSetOilWellCalifornia8day`, `ControllerProprietaryFaultId`, `ControllerLegacyFaultId`, `SourceProprietaryId`, `SourceLegacyId`, `DiagnosticBluetoothNitricOxideConcentrationId`, `DiagnosticBluetoothNitrogenDioxideConcentrationId`, `DiagnosticBluetoothCarbonMonoxideConcentrationId`, `DiagnosticBluetoothAmmoniaConcentrationId`, `DiagnosticBluetoothMethaneConcentrationId`, `DiagnosticBluetoothEthanolConcentrationId`, `DiagnosticBluetoothHydrogenConcentrationId`, `DiagnosticBluetoothCarbonDioxideConcentrationId`

- [MimeContent]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.MimeContent): Added `ChannelNumber` property

- [RepairStatusType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.RepairStatusType): Added beta support

- [SecurityIdentifierPermalink]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.SecurityIdentifierPermalink): Added `InspectDVIR`, `CertifyDVIR` - Removed `DailyUsageReport`

- [User]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.User): Added `ElectricEnergyEconomyUnit` and `isEmailReportEnabled` properties

- [User]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.User): Fixed bug where `isDriver` property would be included with `id` in nested driver entities. This property is removed from nested entities. It will remain in non-nested users.

- [VersionInformation]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.VersionInformation): `Server` is obsolete and replaced with more detailed `Application` property (see [ApplicationVersionInformation]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.ApplicationVersionInformation))

- .Net nuget package: Group constructor with only ID has been removed.

### Result and Rate Limits

For an in-depth description of the result in rate limit changes in 5.7.1902 and future releases see [this blog post](https://www.geotab.com/blog/result-and-rate-limits/)

- [Concepts]({{site.baseurl}}/software/guides/concepts/#limits) section updated to reflect new result and rate limits.

- Result Limits: Maximum result limit of 50,000 has been added to generic `Get` (including `Get` using `search`) requests of entity types: AnnotationLog, DVIRLog, TrailerAttachment, IoxAddOn, CustomData, BinaryData. Results limits will be added to more entity types in future releases.

- Rate Limits: Rate limits of 1 RPS (request-per-second) has been added to all `GetFeed` APIs.

## 5.7.1901

- Sun-setting support for SendEmail API. No longer available in API documentation.

- [Device]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Device): Active from/to:
  - The device property `ActiveTo` will automatically be set to max date (2050-01-01) to denote that it is active.
  - To account for differences in Client machine time vs Server machine time, we are allowing users to set the value of `ActiveTo` to a max window of 24 hours in the future (i.e. Current Time + 24 hours). In this situation we are considering it to be historical.

- [DVIRLog]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DVIRLog): Added `Location` property.

- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.SecurityIdentifier): Added `ViewBusinessIntelligence`, `ActiveTrackingClearance`.

- SecurityRole: Added `EmailSent`, `SkipHosVerify`, `SkipHosClaimUnassigned`, `SkipDvirInspect`.

## 5.7.1804.1

- [API.cs]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.API) (.Net only): Fix bug, Windows 10 using IIS Express possible hanging *synchronous* requests using nuget package 5.7.1803\5.7.1804.

## 5.7.1804

- [Add]({{site.baseurl}}/software/api/reference/#M:Geotab.Checkmate.Database.DataStore.Add1)/[Set]({{site.baseurl}}/software/api/reference/#M:Geotab.Checkmate.Database.DataStore.Set1) [Device]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Device): `ParameterVersion` will auto increment server side when device parameters property changed. Server must see that  `ParameterVersion` has incremented to send parameters to an installed GO device (ex device beeping instructions). Previously, `ParameterVersion` required manual increment.

- [API.cs]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.API) (.Net only): Fix bug, in certian senario changing `Timeout` property could abort the action on timeout and not cancel underlying request.

- [CustomVehicleDevice]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.CustomVehicleDevice): Support of vehicle specific custom devices which provide vehicle specific properties and functionality. Custom device product ID must be of CustomVehicleDevice type. Contact your reseller for more information.

  - Improved support for calculated odometer and raw odometer with third-party diagnostic KnownId `DiagnosticThirdPartyOdometerId` and `OdometerAdjusmentId`

  - Improved support for calculated engine hours with third-party diagnostic KnownId `DiagnosticThirdPartyEngineRunTimeId` and `EngineHoursAdjusmentId`

  - `VehicleIdentificationNumber` property moved from CustomDevice to CustomVehicleDevice

  - Added `LicencePlate` and `LicenceState` properties

- [DutyStatusAvailability]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusAvailability): Added BETA support for `Recap` and `CycleAvailabilities` properties

- [DutyStatusAvailability]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusAvailability): Replaced `Availabilities` list with separate properties: `Driving`, `Cycle`, `Rest`, `Duty`, `Workday`

- [DeviceType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DeviceType): Added `CustomVehicleDevice`.

- [DriverChange]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DriverChange): DriverChange object Id property is no longer backed by integer type. It is now backed by GUID type. When update 1804 is applied to the database, all previous numeric entity Id's will be invalidated and assigned a new GUID Id's. This could pose an issue if your integration stores driver change Id and you then reference the DriverChange by that Id. Note: JSON representation of Id was previously string and remains string type.

- [DutyStatusLogType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusLogType): Added `ExemptionOffDutyDeferral`.

- [DutyStatusViolationType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusViolationType): Added `DailyDriving`, `DailyRest`, `DailyDuty`, `DailyOff`.

- [KnownId]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.KnownId): Added `DiagnosticThirdPartyEngineRunTimeId`,  `DiagnosticThirdPartyOdometerId`.

- [GetFeed]({{site.baseurl}}/software/api/reference/#M:Geotab.Checkmate.Database.DataStore.GetFeed1) [LogRecord]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.LogRecord): Fixed bug with inconstant results limit.

- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.SecurityIdentifier): Added `DirectSupportAdmin`, `UserLoginStatusRead`, `UserLoginStatusSet`.

- [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.SecurityIdentifier): Values `AlarmSoundList`, `Tracking`, `CreateNewSqlDatabase`, `EngineControllerList`, `PurgeSettings`, `SendImmobilizationInstruction` are obsolete and will be removed in version 1806+.

- [SecurityRole]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.SecurityRole): Added `SupportTicketInsert`, `TrainingTicketInser`, `SupportTicketSet`, `TrainingTicketSetUser`, `LoginFailure`, `UserLockout`, `UserUnlocked`, `ShipmentLogInsert`, `ShipmentLogSet`, `ShipmentLogRemove`, `TrailerAttachmentInsert`, `TrailerAttachmentSet`, `TrailerAttachmentRemove`.

- [ZoneSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.ZoneSearch): Added `FromDate` and `ToDate` search properties providing ability to filter zones by their active dates.

> [API.cs]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.API) (.Net only): There is a known issue on Windows 10 using IIS Express with possible hanging *synchronous* requests using nuget package 5.7.1803\5.7.1804. This issue is solved in 5.7.1804.1 or greater.

## 5.7.1803

* SecurityRole: Added `CertificateSet` permission

* [DriverChangeSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DriverChangeSearch): Added property `Type` indicating the DriverChangeType to search for exclusively.

> [API.cs]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.API) (.Net only): There is a known issue on Windows 10 using IIS Express with possible hanging *synchronous* requests using nuget package 5.7.1803\5.7.1804. This issue is solved in 5.7.1804.1 or greater.

## 5.7.1802

* [DutyStatusLog]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusLog): Added properties `Odometer`, `EngineHours`, `EventRecordStatus`, `EventCode`, `EventType`

* [DutyStatusLogType]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.DutyStatusLogType): Added `SituationalDrivingClear`

* [FuelTaxDetail]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.FuelTaxDetail): Added properties `HourlyIsOdometerInterpolated`, `IsEnterOdometerInterpolated`, `IsExitOdometerInterpolated`

* [FuelTaxDetail]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.FuelTaxDetail): Obsolete `IsClusterOdometer` - Superseded by the IsEnterOdometerInterpolated, HourlyIsOdometerInterpolated, and IsExitOdometerInterpolated properties. Will be removed in future version.

* [FuelTaxDetailSearch]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.FuelTaxDetailSearch): Added properties `IncludeBoundaries`, `IncludeHourlyData`

* [SecurityIdentifier]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.SecurityIdentifier): Added `ViewTripTypeChangeData`, `EditTripTypeChangeData`

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

* [API Clients](https://my112.geotab.com/sdk/#/apiWrappers) section added to SDK documentation

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

* Authentication rate limiting being phased in. See this [Blog Post](https://www.geotab.com/blog/api-call-limits/) for more details. Added "Rate Limiting" section to SDK [Concepts](https://my.geotab.com/sdk/default.html#/concepts).

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

* New SDK.  Featuring the new [SDK Runner](https://geotab.github.io/sdk/software/api/runner.html), new methods and objects (click [here](https://geotab.github.io/sdk/software/api/reference/) to see the preview items)

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

* DriverChangeSearch received new search points including: DeviceSearch, DriverSearch, FromDate and ToDate. Checkout the [API Reference](https://my.geotab.com/sdk/default.html#/api) for more details

* DistributionList is now supported by the API. Checkout the [API Reference](https://my.geotab.com/sdk/default.html#/api) for more details. Some related objects are still pending support (Notification, NotificationTemplate, BinaryData)

* [Add-In examples](https://my.geotab.com/sdk/default.html#/addinExamples) have been added to SDK documentation

* When searching for Zones you can now specify a traversal method of the group tree. You can choose to include just the specified element, just the ancestors, just the descendents, or both ancestors and descendents. See the ZoneSearch object in the [API Reference](https://my.geotab.com/sdk/default.html#/api) for more details

* Fix documentation for object properties

* Added KnownIds: DiagnosticDeviceTotalIdleFuel

* Added FuelTransaction API (*Beta*)

* HOS/DVIR objects supported in API. Key objects are AnnotationLog, DVIRLog, DutyStatusAvailability, DutyStatusLog, DutyStatusViolation, and ShipmentLog. Check out the [API Reference](https://my.geotab.com/sdk/default.html#/api) for more details

* Added Groups property to StatusDataSearch. This allows searching for status data for devices in the supplied groups. This does not return interpolated results

* Added from/to date search to UserSearch object. Checkout the [API Reference](https://my.geotab.com/sdk/default.html#/api) for more details

* [API Reference](https://www.geotab.com/dev-channel/), objects now show properties of from inherited classes. For example GoDevice extends Device and will show properties of GoDevice and Device in the documentation

* Geotab Announces New [DEV Channel](https://www.geotab.com/dev-channel/) for Developers

## 5.7.1505

* New condition types added - .Net will require dll update

## 5.7.1504

* Add KnownId for DiagnosticDeviceTotalIdleFuelId - .Net will require dll update

## 5.7.1502

* Get *all* zones now populating points correctly ([see forum post](https://helpdesk.geotab.com/entries/26004844-Get-Zone-return-distinct-points))

* Fixed TimeZoneInfo isDaylightSavingsSupported always false using .Net API client

* Units of measure have been converted to use Known Id’s ([see forum post](https://helpdesk.geotab.com/entries/52897090-MyGeotab-SDK-Update-KnownId))

* Adding, setting and removing of some entities has been disabled via the API. Exception Event, Trip, Status Data, Fault Data, Log Record with exceptions for adding odometer and engine hours adjustments and dismissing faults

* Clearer documentation of date and long values in [API Reference](https://my.geotab.com/sdk/default.html#/api)

* Data Feed section added to Guides portion of SDK ([see document](https://docs.google.com/document/d/1LJfb57qyBX2WklnqioHtlWkYN9xKBWxA_FIpaJzjKyY/edit))