---
layout: page
permalink: /software/js-samples/
title: JavaScript Examples
---

The following examples show common usages of the SDK using JavaScript. We recommend that you examine the examples in the following order to learn more about build great web applications using the Geotab JavaScript API. These examples are stand-alone HTML, JavaScript and CSS written so you can extract them and "run" them without having your own Web server.

You can also use the [Runner](/software/api/runner.html) to run code snippets that you can run directly against a database. The runner has code snippets that demonstrate:

* Adding a driver
* Adding a driver with 'View Nothing' clearance
* Bare bones API request
* Calculate vehicle fuel usage
* Create 10 groups and add devices
* Get vehicle location and driving status
* Get vheilce location
* Get DVIR unrepaaired defects for last month
* Filtering out invalid position log records
* Find current live address of a driver
* Find the month with longest distance driven
* Get all unbroken exceptions for the last week
* Get the count of stops at a customer (zone)
* Get vehicle speed and posted road speed
* Get the odometer and VIN for all vehicles in a group
* Get zone stop exceptions
* HOS availability search
* Import USA states as zones
* Edit a user
* Change vehicle group and enable in vehicle speed warning
* Replace existing device with new device

## Add Driver
Demonstrates how to add Drivers to your database.

[Demo](/software/js-samples/addDriver.html) / [Source]()

## Add Zone 

Demonstrates how to add Zones (geofences) your database.

[Demo](/software/js-samples/addZone.html) / [Source]()

## Data Feed

How to use the GetFeed method and retrieve a continuous stream of GPS, Engine Status and Fault data. This is the most efficient and recommended way of getting an ongoing copy of the data reported by a vehicle.

[Demo](/software/js-samples/dataFeed.html) / [Source]()

## Display Odometer

Display a vehicle's odometer readings over time.

[Demo](/software/js-samples/displayOdometer.html) / [Source]()

## Get Count

This example demonstrates how to retrieve the number of vehicles and users in your database. 

> This does not use API.js; it has been designed to show you a simple integration example.

[Demo](/software/js-samples/getCount.html) / [Source]()

## Get Vehicle Location

This examples shows how to obtain the location of a vehicle.

[Demo](/software/js-samples/getLocation.html) / [Source]()

## Importers

Tools that demonstrate how to bulk import different entity types into your database via comma-delimited text values.

* Import Devices - [Demo](/software/js-samples/importDevices.html) / [Source]()
* Import Groups - [Demo](/software/js-samples/importGroups.html) / [Source]()
* Import Hos Logs - [Demo](/software/js-samples/importHosLogs.html) / [Source]()
* Import Route Plan - [Demo](/software/js-samples/importRoutePlan.html) / [Source]()
* Import Routes - [Demo](/software/js-samples/importRoutes.html) / [Source]()
* Import Users - [Demo](/software/js-samples/importUsers.html) / [Source]()
* Import Zones - [Demo](/software/js-samples/importZones.html) / [Source]()

## Move a Zone

Shows how to move an existing zone (geofence) to a new address using reverse geocoding.

[Demo](/software/js-samples/moveZone.html) / [Source]()

## Poll for Text Messages

This example illustrates how to poll the system for new text messages to and from compatible GO devices equipped with Garmin navigation systems.

[Demo](/software/js-samples/pollTextMessages.html) / [Source]()

## Send a Text Message

This example demonstrates how to send text messages to compatible GO devices equipped with Garmin navigation systems.

[Demo](/software/js-samples/sendTextMessage.html) / [Source]()

## Show Vehicle Trips on Map

Building upon the showVehicleToday.html example, this demonstrates some of the features of MyGeotab. You will learn how to retrieve vehicles and their trips for any date and show the trips on a map.

[Demo](/software/js-samples/showTrips.html) / [Source]()

## Embedded URLs

This example demonstrates how you can embed MyGeotab functionality into your existing web applications. This is an excellent way to see how to embed your own vehicles on a map inside your projects.

[Demo](/software/js-samples/singleSignOn.html) / [Source]()

## Status Data Samlper

Shows how to retrieve the status data (engine data) for a vehicle.

[Demo](/software/js-samples/statusDataSampler.html) / [Source]()

## Starter Kit

This is where we recommend you begin your projects. Use the starter kit to learn how to authenticate with Geotab and how to create simple API calls to retrieve information about your fleet. This example can be used as a base to continue building on or starting your own custom projects.

[Demo](/software/js-samples/starterKit.html) / [Source]()

## Customer Registration

This example illustrates how to create a custom registration page. With this example, you will be able to: determine if a database name is available; register a new database; perform post-registration setup on the new database; send a confirmation email; and redirect a user to the new database. This is an advanced example and is designed for resellers.

 [Source](https://github.com/Geotab/sample-registration)