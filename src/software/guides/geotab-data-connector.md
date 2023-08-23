---
layout: page
permalink: /software/guides/geotab-data-connector/
title: Using the Geotab Data Connector
---

## Overview
This guide describes the general flow for ETL users to consume [Geotab Data Connector](https://docs.google.com/document/d/1-Id2ReZcR8c-qudzY-dw8AzGTlMEzwO_mScg45vplDU/edit?usp=sharing). OData Connector implemented OData protocol V4, or you may consider it just as a RESTful service.

## Endpoint
Before making your first call, it is strongly recommended to skip the **general entry** and make the call directly to **OData Connector**. If you are not sure what the URL to call is, please contact the support team.

### General Entry
Feel free to skip this section if you plan to make calls directly to OData Connector. If you have to make a call to the general entry (https://data-connector.geotab.com), make sure you are ready to handle the 302 response and make another call to the returned URL.

Sample general entry response:
```
> GET /odata/v4/svc/VehicleKpi_Daily?%24search=this_year&%24top=1 HTTP/1.1
> Host: data-connector.geotab.com
> User-Agent: insomnia/2022.6.0
> Authorization: Basic {credential_base64_encoded}
> Accept: */*


* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* Mark bundle as not supporting multiuse


< HTTP/1.1 302 
< Location: https://odata-connector-1.geotab.com/odata/v4/svc/VehicleKpi_Daily?%24search=this_year&%24top=1
< Content-Language: en-US
< Content-Length: 0
< Date: Tue, 07 Feb 2023 16:32:57 GMT
```
If you are making calls to the general entry with postman or insomnia, the 400 error code is expected since postman or insomnia redirect requests WITHOUT the auth header.

### OData Connector
Given the right url, you may test the service connection by making calls to the service root: https://odata-connector-1.geotab.com/odata/v4/svc/

No credential is required for this service root.

#### Curl
Sample request:
```
curl --request GET \
>   --url https://odata-connector-1.geotab.com/odata/v4/svc/
```
Sample response:
```
{
	"@odata.context": "https://odata-connector-1.geotab.com/odata/v4/svc/$metadata",
	"value": [
		{
			"name": "LatestVehicleMetadata",
			"url": "LatestVehicleMetadata"
		},
		{
			"name": "VehicleKpi_Daily",
			"url": "VehicleKpi_Daily"
		},
		{
			"name": "VehicleKpi_Hourly",
			"url": "VehicleKpi_Hourly"
		},
		{
			"name": "DeviceGroups",
			"url": "DeviceGroups"
		},
		{
			"name": "VehicleKpi_Monthly",
			"url": "VehicleKpi_Monthly"
		}
	]
}
```
Make sure to attach one of the above table names after the service root and attach your base64 encoded credentials in the following format:
`<database>/<username>:<password>`

**e.g.** abccompany/geotab-data-connector@geotab.com:password
Sample request:
```
curl --request GET \
>   --url https://odata-connector-1.geotab.com/odata/v4/svc/VehicleKpi_Daily \
>   --header 'Authorization: Basic {credential_base64_encoded}'
```
Sample response:
```{
	"@odata.context": "https://odata-connector-1.geotab.com/odata/v4/svc/$metadata#VehicleKpi_Daily",
	"value": [
		{
			"UTC_Date": "2023-01-03",
			"Local_Date": "2023-01-02",
			"CompanyGuid": "B010CC02-xxxx-xxxx-xxx",
			"Vin": null,
			"SerialNo": "G94B210xxxx",
			"DeviceId": "b4xxxx",
			"Device_Health": "Device did not communicate within the day",
			"MinOdometer_Km": null,
			"MaxOdometer_Km": null,
			"DriveDuration_Seconds": 0.0,
			"IdleDuration_Seconds": 0.0,
			"TotalEngine_Hours": 0.0,
			"GPS_Distance_Km": 0.0,
			"Stops_Count": 0,
			"TotalFuel_Litres": null,
			"IdleFuel_Litres": null,
			"FuelEconomy_Distance_Km": null,
			"UniqueVehicleFault_Count": null,
			"UniqueDeviceFault_Count": null,
			"LatestLongitude": null,
			"LatestLatitude": null
		}
	]
}
```
You can also specify a date range as the query option, for more information about the query option, see [here](https://docs.google.com/document/d/1PEY6L5i3UlVV-5S9FaAV0MHnReCl9vgLxs_mLs26yVo/edit#heading=h.xcvdktyx0p8t).

#### Python
The following example shows how to consume OData Connector with Python, feel free to use any programming language, library or framework.
Dependencies:
```
#@title Import Libraries
import requests
import getpass
import json
import numpy as np
import pandas as pd
import datetime
from datetime import date, timezone
from datetime import timedelta
```
Setup credential and query options :
```
#@title Grab user login info, database, username, password and date range
database = 'database'   #@param {type:"string"}
username = 'username'  #@param {type:"string"}
wStartDate = "2022-12-01" #@param {type:"date"}
wEndDate = "2022-12-05" #@param {type:"date"}
wVehicleKPI = "VehicleKPI_Daily" #@param ["VehicleKPI_Hourly", "VehicleKPI_Daily", "VehicleKPI_Monthly"]
password = 'password' #@param {type:"string"}
```
Get data from latest vehicle metadata and visualization:
```
#Retrieve latest Vehicle metadata based on table selected and date range.
#Connect to table
r=requests.get('https://odata-connector-1.geotab.com/odata/v4/svc/LatestVehicleMetadata', auth=(database + '/' + username, password) , verify=False)
#Display http request status code.
print(r.status_code)
#Load the data into a dataframe.  (Data is contained within the 'value' key.)
vDf= pd.DataFrame(r.json()['value'])
#Display the first 5 records.
vDf.head(5)
```
Get data from vehicle KPI table with date range:
```
#Retrieve appropriate Vehicle KPI data based on table selected and date range.
#Connect to table
r=requests.get('https://odata-connector-1.geotab.com/odata/v4/svc/' + wVehicleKPI  + '?$search=from_' + wStartDate +  '_to_' +  wEndDate, auth=(database + '/' + username, password) , verify=False)


#Display http request status code.
print(r.status_code)


#Load the data into a dataframe.  (Data is contained within the 'value' key.)
kpiDf= pd.DataFrame(r.json()['value'])
#Display the first 5 records.
kpiDf.head(5)
```
## Table Schema
In phase 1, Data Connector supports 5 tables: **DeviceGroups, LatestVehicleMetadata, VehicleKPI_Daily, VehicleKPI_Hourly** and **VehicleKPI_Monthly**. For more information, see [here](https://docs.google.com/document/d/1PEY6L5i3UlVV-5S9FaAV0MHnReCl9vgLxs_mLs26yVo/edit#heading=h.ct62i572rkz8).