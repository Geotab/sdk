---
layout: page
permalink: /software/guides/propertyselector/
---

# Using PropertySelector for Lightweight Object Retrieval

This page provides an overview of the PropertySelector feature when retrieving entities and describes how it can be used for for lightweight entity retrieval.

## What is PropertySelector?

`PropertySelector` is a new optional property that can be set in the [Get]({{site.baseurl}}/sdk/software/api/reference/#Get1) and [GetFeed]({{site.baseurl}}/sdk/software/api/reference/#GetFeed1) methods to selectively return specified properties for entities in a result set. 

## Creating a PropertySelector Object

| **Property** | **Description** |
| --- | --- |
| Fields | An array of string, consisting of the properties for a given [Entity]({{site.baseurl}}/sdk/software/api/reference/#Entity) type for which we want to include/exclude in the entities of the result set. Refer to the [reference]({{site.baseurl}}/sdk/software/api/reference/) page for all the properties supported for a given `Entity`. Note that the properties of a inheriting class will also be supported. (For example, [Go9]({{site.baseurl}}/sdk/software/api/reference/#Go9) is child of [Device]({{site.baseurl}}/sdk/software/api/reference/#Device), so the properties defined for `Go9` can be supplied to `Fields`.) |
| IsIncluded | A boolean, which if `true`, will include the properties of a given [Entity]({{site.baseurl}}/sdk/software/api/reference/#Entity) type defined in `Fields` for the entities of the result set. Otherwise, if this boolean is false, the properties defined in `Fields` will be excluded.

> In the [sample]({{site.baseurl}}/software/api/runner.html#sample:get-lightweight-device-response) API call for getting a result set of lightweight `Device` objects, we only want our `Device` objects to have the properties `ActiveTo` and `Id`, so we set our `PropertySelector` object like so: 
```json
"propertySelector": 
    {
        "fields": ["ActiveTo", "Id"],
        "isIncluded": true
    }
```

**Response**
```json
[
    {
        "activeTo": "2050-01-01T00:00:00.000Z",
        "id": "b1"
    },
    {
        "activeTo": "2050-01-01T00:00:00.000Z",
        "id": "b2"
    }
]
```

## List of Supported Entities

Below is a list of entities that are support the PropertySelector functionality.

| **Entity** | **Supported in Release** | **Notes**
| --- | --- | -- |
| [Device]({{site.baseurl}}/software/api/reference/#Device) | 8.0 | The following properties are not supported: `IsExternalDevicePowerControlSupported`, `DevicePlans`, `EngineHours`, `CustomFeatures`, `DeviceFlags`, `IsAuxInverted`, `IsAuxIgnTrigger`, `IsHarshBrakeWarningOn`, `Channel`, `DeviceType`, `ProductId`, `RegisterDeviceResultLite`, `Autogroups`, `AuxWarningSpeed`, `EnableAuxWarning`, `FrequencyOffset`, `TrailerId`
| [User]({{site.baseurl}}/software/api/reference/#Id) | 8.0 | `IsEULAAccepted` and `AcceptedEULA` are tied to each other, so if either property is set to be returned based on the `PropertySelector` logic, both properties will be returned.
| [Group]({{site.baseurl}}/software/api/reference/#Group) | 8.0 | The following properties are not supported: `IsDefectList`, `IsGlobalReportingGroup`, `Parent`
| [Rule]({{site.baseurl}}/software/api/reference/#Rule) | 8.0 | N/A 