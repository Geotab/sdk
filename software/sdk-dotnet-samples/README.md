# Dotnet Examples

The following examples show common usages of the SDK using dotnet. We recommend that you study the examples to learn everything necessary to build your own custom applications:


## How to run the examples?

In order to run these examples, you first need to [install .NET Core](http://dotnet.github.io/getting-started/). After that, you can clone this repo, go into each of the examples folders and either:

* Run from source using the following commands:
	* `dotnet restore`
	* `dotnet run`
* Compile and run using the following commands
	* `dotnet restore`
	* `dotnet build`
	* `dotnet bin/Debug/[framework]/[binary name]`

# Examples list

## Get Count

A simple console example to obtain the count of devices from a database. A good example to see how our authentication scheme works.

## Extract Mileage

An example that "extracts" vehicle mileage into a CSV or XML file. A good starting point for any data extraction tool.

## Get Logs

An example that obtains the logs for a given vehicle between a range of dates.

## Get Fuel Tax Details (IFTA)

An example that shows how to:

- Iterate through a list of devices.
- Retrieve fuel tax details for each device over a given time interval.
- Trim each detail to the time interval.

## Text Message

An example that sends text messages to and from a GO device.

## Import Groups

A console example that is also a group (node) import tool. It enables a one time import of groups to a database from a CSV file.

## Reconcile Groups — Alpha Version

A console example that is also a group (node) import tool. Similar to the ImportGroups tool, it enables the initial import of groups into a database from a CSV file. Unlike the ImportGroups tool,  ImportGroupsR enables synchronization between an existing group tree in a database and a group tree represented by the CSV file and can be run multiple times with the same or updated CSV file. The input CSV file shall represent an entire tree of groups with which the database will be synchronized.

R in the name stands for Reference. Reference is the property of a group that should be unique and is used as the group identifier.

> This tool can move groups to different parent groups and can delete groups if certain command line arguments are used. Please use this tool with caution and at your own risk.

## Import Devices

Another console example that imports devices from a CSV file.

## Import Zones

A console example that imports zones from a CSV file. This is useful if you have a list of geographic coordinates and want to quickly create zones around them.

## Import Zones from Shape File

Another console zone importer, but imports from an [Esri shapefile](http://en.wikipedia.org/wiki/Shapefile) set (.shp, .shx, .dbf) into a given database.

## Import Users

Another console example that imports users from a CSV file.

## Data Feed

An example of retrieving GPS, Status and Fault data as a feed and exporting to a CSV file.