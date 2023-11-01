---
layout: page
permalink: /software/js-samples/
title: JavaScript Examples
---

The following examples show common usages of the SDK using JavaScript. We recommend that you examine the examples in the following order to learn more about building great web applications using the Geotab JavaScript API. These examples are stand-alone HTML, JavaScript and CSS written so you can extract them and "run" them without having your own Web server.

You can also use the [Runner](../api/runner.html) to run code snippets that you can run directly against a database. The runner has code snippets that demonstrate:

* Adding a driver
* Adding a driver with 'View Nothing' clearance
* Bare bones API request
* Calculate vehicle fuel usage
* Create 10 groups and add devices
* Get vehicle location and driving status
* Get vehicle location
* Get DVIR unrepaired defects for last month
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

<a href="./addDriver.html" aria-label="Demo for adding driver">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/addDriver.html" aria-label="Source for adding driver">Source</a>

## Add Zone 

Demonstrates how to add Zones (geofences) your database.

<a href="./addZone.html" aria-label="Demo for adding zone">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/addZone.html" aria-label="Source for adding zone">Source</a>

## Data Feed

How to use the GetFeed method and retrieve a continuous stream of GPS, Engine Status and Fault data. This is the most efficient and recommended way of getting an ongoing copy of the data reported by a vehicle.

<a href="./dataFeed.html" aria-label="Demo for using datafeed">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/dataFeed.html" aria-label="Source for data feed">Source</a>

## Display Odometer

Display a vehicle's odometer readings over time.

<a href="./displayOdometer.html" aria-label="Demo for display odometer">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/displayOdometer.html" aria-label="Source for display odometer">Source</a>

## Get Count

This example demonstrates how to retrieve the number of vehicles and users in your database. 

> This does not use API.js; it has been designed to show you a simple integration example.

<a href="./getCount.html" aria-label="Demo for using get count">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/getCount.html" aria-label="Source for get count">Source</a>

## Get Vehicle Location

This examples shows how to obtain the location of a vehicle.

[Demo](./getLocation.html) / [Source](https://github.com/Geotab/sdk/blob/master/src/software/js-samples/getLocation.html)
<a href="./getLocation.html" aria-label="Demo for get vehicle location">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/getLocation.html" aria-label="Source for get vehicle location">Source</a>

## Importers

Tools that demonstrate how to bulk import different entity types into your database via comma-delimited text values.

* Import Devices - <a href="./importDevices.html" aria-label="Demo for importing devices">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/importDevices.html" aria-label="Source for importing devices">Source</a>
* Import Groups - <a href="./importGroups.html" aria-label="Demo for importing groups">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/importGroups.html" aria-label="Source for importing groups">Source</a>
* Import Hos Logs - <a href="./importHosLogs.html" aria-label="Demo for importing hos logs">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/importHosLogs.html" aria-label="Source for importing hos logs">Source</a>
* Import Route Plan - <a href="./importRoutePlan.html" aria-label="Demo for importing route plan">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/importRoutePlan.html" aria-label="Source for importing route plan">Source</a>
* Import Routes - <a href="./importRoutes.html" aria-label="Demo for importing routes">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/importRoutes.html" aria-label="Source for importing routes">Source</a>
* Import Users - <a href="./importUsers.html" aria-label="Demo for importing users">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/importUsers.html" aria-label="Source for importing users">Source</a>
* Import Zones - <a href="./importZones.html" aria-label="Demo for importing zones">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/importZones.html" aria-label="Source for importing zones">Source</a>

## Move a Zone

Shows how to move an existing zone (geofence) to a new address using reverse geocoding.

<a href="./moveZone.html" aria-label="Demo for moving zone">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/moveZone.html" aria-label="Source for moving zone">Source</a>

## Poll for Text Messages

This example illustrates how to poll the system for new text messages to and from compatible GO devices equipped with Garmin navigation systems.

<a href="./pollTextMessages.html" aria-label="Demo for poll text messages">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/pollTextMessages.html" aria-label="Source for poll text messages">Source</a>

## Send a Text Message

This example demonstrates how to send text messages to compatible GO devices equipped with Garmin navigation systems.

<a href="./sendTextMessage.html" aria-label="Demo for sending text messages">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/sendTextMessage.html" aria-label="Source for sending text messages">Source</a>

## Show Vehicle Trips on Map

Building upon the showVehicleToday.html example, this demonstrates some of the features of MyGeotab. You will learn how to retrieve vehicles and their trips for any date and show the trips on a map.

<a href="./showTrips.html" aria-label="Demo for showing trips">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/showTrips.html" aria-label="Source for showing trips">Source</a>

## Embedded URLs

This example demonstrates how you can embed MyGeotab functionality into your existing web applications. This is an excellent way to see how to embed your own vehicles on a map inside your projects.

<a href="./singleSignOn.html" aria-label="Demo for single sign on">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/singleSignOn.html" aria-label="Source for single sign on">Source</a>

## Status Data Sampler

Shows how to retrieve the status data (engine data) for a vehicle.

<a href="./statusDataSampler.html" aria-label="Demo for retreiving status data">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/statusDataSampler.html" aria-label="Source for retreiving status data">Source</a>

## Starter Kit

This is where we recommend you begin your projects. Use the starter kit to learn how to authenticate with Geotab and how to create simple API calls to retrieve information about your fleet. This example can be used as a base to continue building on or starting your own custom projects.

<a href="./starterKit.html" aria-label="Demo for starter kit">Demo</a> / <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/starterKit.html" aria-label="Source for starter kit">Source</a>

## Customer Registration

This example illustrates how to create a custom registration page. With this example, you will be able to: determine if a database name is available; register a new database; perform post-registration setup on the new database; send a confirmation email; and redirect a user to the new database. This is an advanced example and is designed for resellers.

<a href="https://github.com/Geotab/sample-registration" aria-label="Source for sample customer registration">Source</a>
