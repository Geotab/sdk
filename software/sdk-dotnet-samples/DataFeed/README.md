# Data Feed

The Data Feed is an example application that allows a third party to easily receive all the telematics data from your devices. The application can be run interactively or in the background as a Windows Service. The application will produce easy to consume CSV files containing the key telematics data sets with updates every few seconds. Furthermore, the application can easily be customized when further integration is required for example, pushing the data into a Web service, writing to a database, etc..

![](data:image/*;base64,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)

## Prerequisites
The sample application requires:

- [dotnet core 2.0 SDK](https://dot.net/core) or higher

The Geotab Data Feed application connects to the MyGeotab cloud hosting services, please ensure that devices have been registered and added to the database. The following information is required:

- Server (my.geotab.com)
- Username 
- Password
- Database (customer)

## Getting started

```
> git clone ... mg-sdk-dotnet-samples
> cd mg-sdk-dotnet-samples
> cd DataFeed
> dotnet run
```

The application will bring up the following console:

```
> dotnet run --s server --d database --u user --p password --gt nnn --st nnn --ft nnn --tt nnn --et nnn --f file path --c
--s  The Server
--d  The Database
--u  The User
--p  The Password
--gt [optional] The last known gps data token
--st [optional] The last known status data token
--ft [optional] The last known fault data token
--tt [optional] The last known trip token
--et [optional] The last known exception token
--f  [optional] The folder to save any output files to, if applicable. Defaults to the current directory.
--c  [optional] Run the feed continuously. Defaults to false.
```

Example usage:

```
> dotnet run --s "my.geotab.com" --d "database" --u "user@email.com" --p "password" --c
```

The options above are the inputs that the feed example can take. A server, database, user and password must be supplied in order for the feed to run. Optionally a gps data token, status data token, fault data token, trip token and/or exception token can be provided to start the feed at a particular token version ("nnn" should be replaced with the known token). Finally the feed can be instructed to run continuously or only one time.

By default the feed will output its results to a CSV file in the location specified by the -f flag above. If no location is provided the CSV file will be placed in the same directory that DataFeed.dll is located.

The feed example contains numerous other examples of what can be done with the feed output, for example writing the data to the console or automatically uploading it to Google BigQuery. Developers are encouraged to take a look at the examples in order to understand how the options available to them and how to best to integrate the feed data into their existing systems.

## Feed output

### Console output

#### GPS data

| **#** | **Field Name** | **Description** | **Example** |
| --- | --- | --- | --- |
| 1 | Vehicle Serial Number | The unique serial number printed on the GO device. | GT8010000001 |
| 2 | Date | The date and time in UTC for the GPS position. | 12/12/21 09:43:01 |
| 3 | Longitude | The coordinate longitude in decimal degrees. | -80.6860275268555 |
| 4 | Latitude | The coordinate latitude in decimal degrees. | 37.0907897949219 |
| 5 | Speed | The speed in km/h. | 103 |

#### Status data

| **#** | **Field Name** | **Description** | **Example** |
| --- | --- | --- | --- |
| 1 | Vehicle Serial Number | The unique serial number printed on the GO device | GT8010000001 |
| 2 | Date | The date and time in UTC for the engine diagnostic reading. | 12/12/21 09:43:01 |
| 3 | Diagnostic Name | The engine diagnostic description in English | Cranking Voltage |
| 4 | Source Name | An indication what the source of this status data reading is. | J1938 or
J1708 or
Geotab Go etc. |
| 5 | Controller Name | The controller name for the given source. | Body Controller |
| 6 | Value | The value associated with the status data reading. | 12.4 |
| 7 | Units | The unit of measure associated with this reading. | Volts |

#### Fault data

| **#** | **Field Name** | **Description** | **Example** |
| --- | --- | --- | --- |
| 1 | Vehicle Serial Number | The unique serial number printed on the GO device | GT8010000001 |
| 2 | Date | The date and time in UTC for the engine diagnostic reading | 12/12/21 09:43:01 |
| 3 | Diagnostic Name | The engine diagnostic description in English | Cranking Voltage |
| 4 | Failure Mode Name | The fault description in English | Voltage above normal or shorted high,
Out of Calibration |
| 5 | Failure Mode Source | An indication what the source of this fault reading is | J1938 or
J1708 or
Geotab Go etc |
| 6 | Controller Name | The controller name for the given source | Body Controller |

### CSV output

#### GPS data

| **#** | **Field Name** | **Description** | **Example** |
| --- | --- | --- | --- |
| 1 | Vehicle Name | The vehicle name/description as displayed to users in Checkmate | Truck 123 |
| 2 | Vehicle Serial Number | The unique serial number printed on the GO device | GT8010000001 |
| 3 | VIN | The Vehicle Identification Number of the vehicle | 1FUBCYCS111111111 |
| 4 | Date | The date and time in UTC for the GPS position | 2012-07-13 20:36:36.000 |
| 5 | Longitude | The coordinate longitude in decimal degrees | -80.6860275268555 |
| 6 | Latitude | The coordinate latitude in decimal degrees | 37.0907897949219 |
| 7 | Speed | The speed in km/h | 103 |

#### Status data

| **#** | **Field Name** | **Description** | **Example** |
| --- | --- | --- | --- |
| 1 | Vehicle Name | The vehicle name/description as displayed to users in Checkmate | Truck 123 |
| 2 | Vehicle Serial Number | The unique serial number printed on the GO device | GT8010000001 |
| 3 | VIN | The Vehicle Identification Number of the vehicle | 1FUBCYCS111111111 |
| 4 | Date | The date and time in UTC for the engine diagnostic reading | 2012-07-13 20:36:36.000 |
| 5 | Diagnostic Name | The engine diagnostic description in English | Cranking Voltage |
| 6 | Diagnostic Code | The numeric value associated with a diagnostic | 1234 |
| 7 | Source Name | An indication what the source of this status data reading is | J1938 or
J1708 or
Geotab Go etc. |
| 8 | Controller Name | The controller name for the given source | Body Controller |
| 9 | Value | The value associated with the status data reading | 12.4 |
| 10 | Units | The unit of measure associated with this reading | Volts |

#### Fault data

| **#** | **Field Name** | **Description** | **Example** |
| --- | --- | --- | --- |
| 1 | Vehicle Name | The vehicle name/description as displayed to users in Checkmate | Truck 123 |
| 2 | Vehicle Serial Number | The unique serial number printed on the GO device | GT8010000001 |
| 3 | VIN | The Vehicle Identification Number of the vehicle | 1FUBCYCS111111111 |
| 4 | Date | The date and time in UTC for the engine diagnostic reading | 2012-07-13 20:36:36.000 |
| 5 | Diagnostic Name | The engine diagnostic description in English | Cranking Voltage |
| 6 | Failure Mode Name | The fault description in English | Voltage above normal or shorted high,
Out of Calibration |
| 7 | Failure Mode Code | The numeric value associated with a fault | 1234 |
| 8 | Failure Mode Source | An indication what the source of this fault reading is | J1938 or
J1708 or
Geotab Go etc |
| 9 | Controller Name | The controller name for the given source | Body Controller |
| 10 | Count | The number of times the fault occurred | 1 |
| 11 | Active | Represents a fault code state code from the engine system of the specific device | None,
Pending,
Active |
| 12 | Malfunction Lamp | Indicates if the malfunction lamp is on or off | 0 = off
1 = on |
| 13 | Red Stop Lamp | Indicates if the red stop lamp is on or off | 0 = off
1 = on |
| 14 | Amber Warning Lamp | Indicates if the amber warning lamp is on or off | 0 = off
1 = on |
| 15 | Protect Lamp | Indicates if the protect lamp is on or off | 0 = off
1 = on |
| 16 | Dismiss Date | The date and time a user dismissed the fault | 2012-07-13 20:36:36.000 |
| 17 | Dismiss User | The user who dismissed the fault | AUser@geotab.com |

#### Trip data

| **#** | **Field Name** | **Description** | **Example** |
| --- | --- | --- | --- |
| 1 | Vehicle Name | The vehicle name/description as displayed to users in Checkmate | Truck 123 |
| 2 | Vehicle Serial Number | The unique serial number printed on the GO device | GT8010000001 |
| 3 | VIN | The Vehicle Identification Number of the vehicle | 1FUBCYCS111111111 |
| 4 | Driver Name | The name of the drive (if there was one) for the trip | Bob Goodman |
| 5 | Driver Keys | The key id of the driver (if there was one) for the trip | 100001, TA56EF2 |
| 6 | Trip Start Time | The date and time the trip started | 2012-07-13 20:36:36.000 |
| 7 | Trip End Time | The date and time the trip ended | 2012-07-13 20:36:36.000 |
| 8 | Trip Distance | The total distance of the trip in kilometers | 12 |

#### Exception data

| **#** | **Field Name** | **Description** | **Example** |
| --- | --- | --- | --- |
| 1 | Id | The unique identifier of the exception | 53CBB7C5-2DE4-4A84-8E0B-6E84C7D97FA9 |
| 2 | Vehicle Name | The vehicle name/description as displayed to users in Checkmate | Truck 123 |
| 3 | Vehicle Serial Number | The unique serial number printed on the GO device | GT8010000001 |
| 4 | VIN | The Vehicle Identification Number of the vehicle | 1FUBCYCS111111111 |
| 5 | Diagnostic Name | The engine diagnostic description in English | Cranking Voltage |
| 6 | Diagnostic Code | The numeric value associated with a diagnostic | 1234 |
| 7 | Source Name | An indication what the source of this status data reading is | J1938 or
J1708 or
Geotab Go etc |
| 8 | Driver Name | The name of the drive (if there was one) for the trip | Bob Goodman |
| 9 | Driver Keys | The key id of the driver (if there was one) for the trip | 100001, TA56EF2 |
| 10 | Rule Name | The name of the rule that was broken to generate this exception event | Speeding, Idling |
| 11 | Active From | The date and time the exception started | 2012-07-13 20:36:36.000 |
| 12 | Active To | The date and time the exception ended | 2012-07-13 20:36:36.000 |

## Customization

The feed has been designed in such a way that the data returned from the feed can be processed in a completely customized manner. Within the Program.cs file is the feed executable as described above. The file contains the abstract class Worker; within the class there is a method called DisplayFeedResults, this method takes the data of a feed and outputs the results. By default the FeedToCsv class is used to write the feed results to a CSV file, however the developer can change this method to customize the format of the output results. In this manner the developer can easily integrate the feed with existing systems.
