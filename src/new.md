---
layout: page
permalink: /resources/new/
title: What’s New
---

# 2017

## December (5.7.1712.x)
* API.cs (.Net only) - Fix: When password and session id are supplied to constructor, session id will be used until no longer valid. Previously, session id would only be used if password was not supplied.

* FuelTaxDetail - Added properties: ”IsEnterOdometerInterpolated”, “IsExitOdometerInterpolated”, “HourlyIsOdometerInterpolated”

* User - Removed property: “MenuCollapsedNotified”

## November (5.7.1711.x)
* GetAddresses - Added: "hosAddresses" parameter to optionally search for ELD compliant address

* UnitOfMeaure - Added: Kilowatt hours ("UnitOfMeasureKiloWattHoursId")

* SecurityIdentifier - Added "ViewBinaryData", "ManageAddInData", "ViewAddInData"

* HosRuleSet - Added "CarrierExemption"

* .Net SDK samples updated to target netcoreapp2.0

* .Net nuget package now supports framework: netstandard2.0 (removed support for net46)

## September (5.7.1709.x)

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

## July (5.7.1707.x)

* Web Request Notifications: fix {zoneId} and {zoneComment} tokens would not get populated unless {zone} or {address} were also included.

* Documentation: API Reference updated to include default value and max length of object properties in their descriptions. Default values are automatically used when adding an entity and those properties have no value assigned (are null). For example, adding a Group with color = null, will add group with default color "Blue". If a property has no default value, it is required when calling "Add".

* Set operations now retain the value of missing (null) properties. A positive effect of this change is that is remedies a long existing issue that could occur when a server is a newer version (ex 5.7.1704) than client nuget package (ex 5.7.1701) which is making requests to it. The issue could arise when a new Enum value was added and exists only in the server's code base, not client client nuget package. When the unknown Enum was received by the client, it could not be deserialiezed into an Enum value and would throw an exception. Starting in nuget package version 5.7.1707.x, the unknown Enum value will be deserialiezed to null. This means the object can round trip" on "Set" because the server will now (starting at version 5.7.1707) fill in the null value with the existing saved value of the property.

* Added: JsonRpcError, JsonRpcErrorData - to better align JSON-RPC errors with the JSON-RPC 2.0 specification. Non-standard (now legacy) error properties have been deprecated. This should not affect nuget package users as the API.cs object serialized the JSON-RPC error results as Exceptions which are thrown. This may affect users consuming the raw JSON-RPC result of requests. It's recommended to update usages to the official, standardized, properties as outlined in the API Reference. Of note: the new objects exposes "requestIndex" property which is the index at which a "multicall" failed.

* Added: User/Driver objects now have property "IsDriver" to clearly indicate when a user is a driver. This also makes it easier to save a user who is no longer a driver, set the property to false and save.

* Added: FuelTaxDetail - A new entity which provides API access to calculated fuel tax data. In the past this data was only available via the IFTA Report in MyGeotab where it was calculated on the fly. Fuel tax details are now processed using live data and stored in the database and they can be access using the API via Get and GetFeed methods. Full documentation coming soon.

## June (5.7.1706.x)

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

## May (5.7.1705.x)

* GO8: Added preliminary support for GO8 devices
***requires update of .net nuget package to correctly read/write GO8 devices***

* IoxAddOn: Added preliminary support for IoxAddOn, IoxAddOnSearch, SerialIoxContent,KnownIoxAddOnType, IoxOutputContent, MimeContent

* TextMessageSearch: Added search by: "ParentTextMessageId"

## April (5.7.1704.x)

* DutyStatusLog - Added property: State

* DutyStatusLogSearch - Added search by device groups

* API.cs is now compatible with System.Net.Http v4.3.1

* Fix, API.cs proxy support. New constructor that accepts HttpMessageHandler, deprecated constructor that accepts IWebProxy and Proxy property

* Fix, content type of API response headers changed from "text/html" to "application/json"

## March (5.7.1703.x)

* DevicePlan: Added: D2GODriverChallengeStandard
***requires update of .net nuget package to ensure compatibility***

* HosRuleSet.cs Added: America7DayNo34h, America8DayNo34h, AmericaShortHaulNo34h, AmericaShortHaul8DayNo34h, BrazilShortHaul
***requires update of .net nuget package to ensure compatibility***

* SecurityRole.cs Added: ReassignData
***requires update of .net nuget package to ensure compatibility***

* TimeZoneId: it was possible to add a user or device with "Unknown" time zone ID. This was only possible using the API and "Unknown" is not returned via the GetTimeZones method or a valid Olson time zone. The ability to add users and devices with "Unknown" as been removed and all users and devices with this time zone ID have been changed to "Etc/GMT"

## February (5.7.1702.x)

* FuelTransactionProvider: Added - "Voyager", "UltramarCST"

* SecurityIdentifier: Added - "PurchaseMarketplacePaidItems"
***requires update of .net nuget package to ensure compatibility***

* SecurityRole: Added: "TripTypeChangeInsert", "TripTypeChangeRemove", "CustomReportSendError" 
***requires update of .net nuget package to ensure compatibility***

* Fix: nuget package issue making API requests from Azure WebJob

* Fix: TimeZoneInfoAdjustmentRule serialization (result of GetDaylightSavingRules)

## January (5.7.1701.x)

* Added "Hardware" section to SDK

* Nuget: Replace usage of Microsoft.Net.Http with System.Net.Http (WebRequest => HttpClient)

* DiagnosticSearch: Added DiagnosticType property to search by the type of diagnostic. Ex, only GoFault diagnostics.

* Added "ExpiredPasswordException" object. This exception can be thrown if a user makes a request while their ChangePassword flag is true. The user must change their password before they are able to successfully make further requests

* SecurityRole: Added "ReportHosAvailability" 
***requires update of .net nuget package to ensure compatibility***

* If you are using the .net nuget package and plan to use the new "HOS Only" device plan you must update to nuget package version 5.7.1701 or greater to ensure compatibility.

# 2016

## December (5.7.1612.x)

* Id refactoring - The ID object has been refactored in the .NET SDK. See [this forum post](https://helpdesk.geotab.com/hc/en-us/community/posts/255601466--NET-SDK-ID-Object-Changes) for details.

* Updated description of GoCurveAuxiliary (GO4v3, GO6, GO7) properties:
ImmobilizeUnit: With ImmobilizeUnit being true, it is used to define the delay before the driver identification reminder is sent out if the driver key has not been not swiped. The maximum value of this property is 255. When it is less or equal to 180, it indicates the number of seconds of the delay.  When it is greater than 180, the delay increases 30 seconds for every increment of one of this property. For example, 180 indicates 180 seconds, 181 indicates 210 seconds, and 182 indicates 240 seconds.
ImmobilizeArming: A value mainly used for enable or disable driver identification reminder. If it is used in conjunction with vehicle relay circuits, it can force the driver to swipe the driver key before starting the vehicle.

## November (5.7.1611.x)

* Authentication rate limiting being phased in. See this [Blog Post](https://www.geotab.com/blog/api-call-limits/) for more details. Added "Rate Limiting" section to SDK [Concepts](https://my.geotab.com/sdk/default.html#/concepts).

* KnownId - Added: "DiagnosticDieselExhaustFluidId", ”DiagnosticDieselParticulateFilterLampId”, “DiagnosticPowerTakeoffEngagedId”, “DiagnosticPowerTakeoffTotalFuelUsedId”

* KnownId - Removed: "DiagnosticBluetoothBeaconOutOfRangeId"

* Trailer - Added "Groups" property. Trailers can now be added to groups.

* TrailerSearch - Added property groups. Search for Trailers that are members of these GroupSearch(s) one of it's children or one of it's parents.

* *SecurityIdentifier - Added: "RepairDVIR"

*Important: Update .Net [nuget](https://www.nuget.org/packages/Geotab.Checkmate.ObjectModel/) package to ensure compatibility

## October (5.7.1610.x)

* KnownId - Added: "DiagnosticDieselExhaustFluidId”, "DiagnosticDieselParticulateFilterLampId”, “DiagnosticPowerTakeoffEngagedId”, “DiagnosticPowerTakeoffTotalFuelUsedId”

* HosRuleSet - Added: "Florida7Day”, "Florida8Day”, “FloridaShortHaul7Day”, “FloridaShortHaul8Day”

### New Objects

* OverLimitException:
Thrown when a user has exceeded the query limit of an API (currently only applies to authentication). Previously, if a user reached this limit, an InvalidUserException would have been thrown.

## September (5.7.1609.x)

* KnownId - "DiagnosticRamFailure" name fixed to be “DiagnosticRamFailureId”

## August (5.7.1608.x)

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

## July (5.7.1607.x)

* Performance and maintenance enhancements.

## June (5.7.1606.x)

* DiagnosticTypes - Added "GoFault"

* FuelTransactionProvider - Added "WexCustomer", "Drive" and "FuelTracker"

* SecurityIdentifier - Added "EventOccurrenceList","ViewCertificates","ManageCertificates"

* HosRuleSet - Added "AmericaSalesperson"

* .Net: MachineSettings - Fix to work with ASP.Net Web API projects

* .Net: DataToComponenet - Updated "Equals" method to compare payloads for equality

* .Net: DutyStatusOrigin - removed unused "Serializable" attribute

* .Net - Changes in API.cs to use HttpClient instead of HttpWebRequest in order to support .Net core in the future.

* dll requires .Net Framework version v4.6+

### New APIs:

* GetDirections

* OptimizeWaypoints

### New Objects:

* Directions

* Leg

* Step

* Waypoint

**.Net users will require a dll update*

## May (5.7.1605.x)

*  Added new Units of Measure (km/L, kg/km, L/lane km, L/ton and g/m^2)
** .Net users will require a dll update*

## April (5.7.1604.x)

* For security reasons, TLS 1.2 is being enforced on all servers. To fix the integration, please update to at least .NET 4.5 and use the [latest nuget package](https://www.nuget.org/packages/Geotab.Checkmate.ObjectModel/). For more information, please visit the [forum discussion](https://helpdesk.geotab.com/entries/108236723-TLS1-2-Upgrade-Notice).

* Driver has a new property: viewDriversOwnDataOnly. When set to true, a driver gains the ability to view their own driving data.
** .Net users will require a dll update*

## February (5.7.1602.x)

* TextToSpeechContent has been renamed to GoTalkContent and RelayContent has been renamed to IoxOutputContent
** .Net users will require a dll update*

## January (5.7.1601.x)

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

# 2015

## December (5.7.1512.x)

* Fixed operator overloading for Id object in .Net dll (id1 == id2 is the same as id1.Equals(id2)) - **If you are using dll version 5.7.1508-1511 this will require a dll update.*

* New addin: Trips Streetview added to [GitHub](https://github.com/Geotab/addin-trips-streetview)

## November (5.7.1511.x)

* Added new security clearances for:

    * ViewMarketplacePaidItems:  Allow user to see paid Marketplace items

    * DeviceAdminDeleteUnplugReplace: Access to removing vehicle, unpluging device, and replacing device.

**If you are using dll version 5.7.1508-1510 this will require a dll update.*

## September (5.7.1509.x)

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

## August (5.7.1508.x)

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

## May (5.7.1505.x)

* New condition types added - .Net will require dll update

## March (5.7.1504.x)

* Add KnownId for DiagnosticDeviceTotalIdleFuelId - .Net will require dll update

## February (5.7.1502.x)

* Get *all* zones now populating points correctly ([see forum post](https://helpdesk.geotab.com/entries/26004844-Get-Zone-return-distinct-points))

* Fixed TimeZoneInfo isDaylightSavingsSupported always false using .Net API client

* Units of measure have been converted to use Known Id’s ([see forum post](https://helpdesk.geotab.com/entries/52897090-MyGeotab-SDK-Update-KnownId))

* Adding, setting and removing of some entities has been disabled via the API. Exception Event, Trip, Status Data, Fault Data, Log Record with exceptions for adding odometer and engine hours adjustments and dismissing faults

* Clearer documentation of date and long values in [API Reference](https://my.geotab.com/sdk/default.html#/api)

* Data Feed section added to Guides portion of SDK ([see document](https://docs.google.com/document/d/1LJfb57qyBX2WklnqioHtlWkYN9xKBWxA_FIpaJzjKyY/edit))

