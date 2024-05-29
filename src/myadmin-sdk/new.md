---
layout: page
permalink: /myadmin-sdk/new/
title: What's New
---

## Apr 29, 2024

<h3 class="text-primary font-weight-bold">Updates</h3>

#### Updated firstDeviceActivationDate to align with First Connect Date in Device Admin

- We’ve updated the `firstDeviceActivationDate` property (in **ApiDeviceContract** and **DeviceContract** objects) to retrieve the same data as the `First Connect Date` column in **Device Admin**.   
<br/>   

#### Added OptionalPara parameter to GetDeviceContracts method

- As previously announced, we’ve added the `OptionalPara` parameter to the **GetDeviceContracts** method. This will allow Integrators to select and define the properties they want to see in the returned object.
- Previously, when device information was retrieved through the **GetDeviceContracts** method, the only option available was to return all data for a device. With this update, you can control how much data you want to retrieve, reducing the response times and the amount of data that has to be processed.   
<br/>   

#### Reminder — Deprecating currentStatus property in ApiOnlineOrder

- We’ve extended the deprecation date for the `currentStatus` property to May 25, 2024. 
- **NOTE**: The `currentStatus` property has been replaced by `currentOrderStatus` to return the current status of the order. 

<br/>  

***   
## Mar 25, 2024

<h3 class="text-primary font-weight-bold">Updates</h3>

#### Added newCustomerPlan property to ApiDeviceContractRatePlan method

- To help you determine whether a device is on the New Customer Plan, the **ApiDeviceContractRatePlan** method will now have a new property: `newCustomerPlan`. This new property will return one of the following responses:
    - **true** — The device is on the New Customer Plan
    - **false** — The device is not on the New Customer Plan
<br/>  

#### PostOrder

- As previously announced, we have added character limits to the following fields:
    - `My reference` — 500-character limit
    - `General comments for packing slip` — 300-character limit
    - `Order comments` — 300-character limit
- Orders processed through the **PostOrder** method that exceed these character limits will not be placed, and will prompt an error.
<br/>   

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### Moving devicePlanLevel property to ApiOnlineOrderItem API

- In a future release, we will be improving the checkout experience for selecting Device Plans when you buy devices. Currently, a single Device Plan applies to your entire order. Soon, you’ll be able to select and assign a Device Plan for each product in your cart. For GO Anywhere devices, the Device Plan will be assigned automatically.
- Together with the upcoming feature that allows assigning a Device Plan for each product in your cart in the MyAdmin UI, we will be moving the `devicePlanLevel` property from the **ApiOrderHeader** API to **ApiOnlineOrderItem** in a future release.
<br/>  

#### Adding OptionalPara parameter to GetDeviceContracts method 

- In a future release, we will be adding the `OptionalPara` parameter to the **GetDeviceContracts** method. This will allow Integrators to select and define the properties they want to see in the returned object, as well as improve response times.
<br/>  

#### Updating firstDeviceActivationDate to Align with First Connect Date in Device Admin

- In a future release, we will be renaming the **First Device Activation Date** column to **First Connect Date** in the Monthly Billing report (accessible via Billing > Monthly Billings). This change is to align with the **First Connect Date** column in Device Admin.
- We will be updating the  `firstDeviceActivationDate` property (in **ApiDeviceContract** and **DeviceContract** objects) to retrieve the same data as the **First Connect Date** column in **Device Admin**.
<br/>   

#### Deprecating currentStatus property in ApiOnlineOrder

- On April 27, 2024, we will be deprecating the `currentStatus` property, as it has been replaced by `currentOrderStatus` to return the current status of the order.
- The deprecation of `currentStatus` was previously communicated in March 2021, which was also when `currentOrderStatus` became available for use.

<br/>  

***  
## Feb 26, 2024

<h3 class="text-primary font-weight-bold">Updates</h3>

#### Max Results for Unpaginated Enpdoints

- Starting February 10, 2024, most of our API endpoints that provide all results in a single request will be limited to a maximum of 100,000 results.
- Some endpoints that previously returned more than 100,000 results (prior to 2024) will maintain their existing functionality to ensure continuous API backward-compatibility. 
<br/>  

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### PostOrder

- In a future release, we will be adding character limits to the following fields:
    - `My reference` — 500-character limit
    - `General comments for packing slip` — 300-character limit
    - `Order comments` — 300-character limit
- Orders processed through the **PostOrder** method that exceed these character limits will not be placed.
<br/>    

#### Updating firstDeviceActivationDate to Align with First Connect Date in Device Admin

- We will be updating the  `firstDeviceActivationDate` property (in **ApiDeviceContract** and **DeviceContract** objects) to retrieve the same data as the **First Connect Date** column in **Device Admin**.
<br/>   

#### Deprecating currentStatus property in ApiOnlineOrder

- On April 27, 2024, we will be deprecating the `currentStatus` property, as it has been replaced by `currentOrderStatus` to return the current status of the order.
- The deprecation of `currentStatus` was previously communicated in March 2021, which was also when `currentOrderStatus` became available for use.

<br/>  

***  
## Jan 15, 2024

<h3 class="text-primary font-weight-bold">Updates</h3>

#### ApiRatePlan

- In September of 2023, we added two parameters (`isAutoActivated` and `billingStartDate`) to the **GetDeviceContractsByPage** and **GetDeviceContracts** methods. As a result, we have now deprecated the `isAutoActivated`` property from the **ApiRatePlan** object.  

<br/>   

***
## Dec 4, 2023

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### ApiRatePlan

- In September, we added two parameters (`isAutoActivated` and `billingStartDate`) to the **GetDeviceContractsByPage** and **GetDeviceContracts** methods. As a result, we will be deprecating the `isAutoActivated`` property from the **ApiRatePlan** object.  

<br/>   

***
## October 4, 2023

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### PostOrder

- Currently, for the **PostOrder** method, **InvalidDataException** is returned when there is an exception. In a future release, these exceptions will be returned as a **MyAdminException** instead.  

<br/>   

***
## September 5, 2023

<h3 class="text-primary font-weight-bold">Updates</h3>

#### GetDeviceContractsByPage & GetDeviceContracts

- Along with the new `Auto-Activated` and `Billing Start Date` columns in Device Admin, we have added two new parameters to the **GetDeviceContractsByPage** and **GetDeviceContracts** methods:
    - `isAutoActivated` — Returns a result that indicates whether the device was auto-activated by Geotab.
        - **true** — The device was auto-activated by Geotab.
        - **false** — The device has yet to be activated or was activated from being installed in an asset.
    - `billingStartDate` — Returns the date when the device was activated.
<br/>  

#### CalculateVinOemEligibilitiesAsync and GetOemSupportEligibilityForMakeAsync

- Together with the Vehicle / VIN Lookup page improvements, we’ve added the following APIs to allow you to confirm whether a vehicle or VIN is eligible for OEM connectivity services:
    - **CalculateVinOemEligibilitiesAsync** — Returns a result that indicates whether a VIN in a specific region is eligible for OEM connectivity services.
    - **GetOemSupportEligibilityForMakeAsync** — Returns a result that indicates whether a vehicle make and model in a specific region is eligible for OEM connectivity services.
<br/>   

#### GetOnlineOrderStatus

- We have added a new `shippingCost` field as a return object to the **GetOnlineOrderStatus** method. This field will return the shipping cost at the time the order was placed.  
<br/>   

***  
## July 29, 2023

<h3 class="text-primary font-weight-bold">Updates</h3>

#### MyAdminAPIUser

- We have deprecated the **MyAdminApiUser** role. This role was initially used to make MyAdmin API calls, but we confirmed that API calls are open to anyone with a MyAdmin account. As a result, we have deprecated the role to reduce confusion and simplify access to our API. 
<br/>  

#### CalculateVinOemEligibilitiesAsync and GetOemSupportEligibilityForMakeAsync

- Together with the Vehicle / VIN Lookup page improvements, we’ve added the following APIs to allow you to confirm whether a vehicle or VIN is eligible for OEM connectivity services:
    - **CalculateVinOemEligibilitiesAsync** — Returns a result that indicates whether a VIN in a specific region is eligible for OEM connectivity services.
    - **GetOemSupportEligibilityForMakeAsync** — Returns a result that indicates whether a vehicle make and model in a specific region is eligible for OEM connectivity services.
<br/>   

#### DatabaseExists

- To save time when creating new databases, we’ve added a new **DatabaseExists** method that returns a true or false value to allow you to confirm whether a database name already exists:
    - **true** — The database name already exists
    - **false** — The database name does not exist  
<br/>   

***  
## July 10, 2023

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### GetOnlineOrderStatus

- In a future release, we will be adding a new `shippingCost` field as a return object to the **GetOnlineOrderStatus** method. This field will return the shipping cost at the time the order was placed.
- In a future release, the **GetOnlineOrderStatus** method will add a default date range and return order data from the last month if the following parameters are sent as null:
    - purchaseOrderNo
    - orderNo
    - orderDateFrom
    - orderDateTo
- There will also be a limit of 5000 orders that can be retrieved in a single request.   
<br/>   

***
## July 1, 2023

<h3 class="text-primary font-weight-bold">Updates</h3>

#### ProvisionDevicesBulk

- Currently, **ProvisionDevice** and **ProvisionDeviceToAccount** methods are available to provision a single third-party custom telematics or OEM device (via the serial number).
- To help you manage large quantities of devices, we’ve added a new **ProvisionDevicesBulk** method to provision multiple third-party custom telematics devices or OEM in bulk with an optional quantity field.
<br/>

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### GetDeviceContractsByPage and GetDeviceContracts

- In a future release, we will be adding two new columns to Device Admin: `Auto-Activated` and `Billing Start Date` to improve visibility of auto-activation events, as well as the actual start of billing for a device. 
- The `Auto-Activated` column will help you identify whether a device has been automatically activated by Geotab, and display the following values:
    - **Yes** — The device was automatically activated by Geotab.
    - **No** — The device was activated by installation.
    - **Not Available** — The device has been shipped, but has not been installed, or auto-activated.\
    **NOTE**: For devices shipped prior to the release of this feature, **Not Available** will be displayed.
- The `Billing Start Date` column will help you determine when billing started for a device. This column will display one of the following values:
    - **Date** — Displays the date that the device was auto-activated, installed, or transferred from another Partner.\
    **NOTE**: Plan changes for devices will not impact this date.
    - **Not Available** — Indicates that a device has been shipped, but has not been installed, or auto-activated.\
    **NOTE**: For devices shipped prior to the release of this feature, **Not Available** will be displayed.
- Therefore, we will also be making data points of `Auto-Activated` and `Billing Start Date` available through the **GetDeviceContractsByPage** and **GetDeviceContracts** APIs in a future release. We will provide more details closer to the release date.   

#### GetOnlineOrderStatus

- In an upcoming release, we will be adding the following parameters to the **GetOnlineOrderStatus** API:
- `promoCode` — Returns the promo code used when the order was placed, if applicable.
- `rateCode` — Returns the promo code used for a monthly Rate Plan subscription when the order was placed, if applicable.  
<br/>  

***
## May 29, 2023

<h3 class="text-primary font-weight-bold">Updates</h3>

#### GetPartnerDeviceContractsAsync

- To help you find devices faster, we’ve updated the **GetPartnerDeviceContractsAsync** API to include a database search parameter (`databaseFilter`). This parameter allows you to retrieve a list of devices that are owned by the specified database.  
<br/>

***
## March 27, 2023

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### ApiDeviceContract

- In an upcoming release, we will use the gateway’s activation date as the source for `FirstDeviceActivationDate` when returning an **ApiDeviceContract** object (for example, by calling **GetDeviceContractsByPage**) to align with the Device Admin page  
<br/>

***
## March 6, 2023

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### ApiDeviceContract

- In an upcoming release, we will use the gateway’s activation date as the source for `FirstDeviceActivationDate` when returning an **ApiDeviceContract** object (for example, by calling **GetDeviceContractsByPage**) to align with the Device Admin page  
<br/>

***
## February 13, 2023

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### GetPartnerDeviceContractsAsync

- Currently, the **GetPartnerDeviceContractsAsync** method allows you to return a list of third-party devices under your account.
- In a future release, we’ll enhance the **GetPartnerDeviceContractsAsync** method to return a list that includes all device types, including GO devices.   
<br/>

***
## January 23rd, 2023

<h3 class="text-primary font-weight-bold">Updates</h3>

#### EditUserContact

- To ensure that Customers receive their orders in a timely manner, we’ve updated the  **EditUserContact** method to validate provided addresses with the option to override invalid addresses if the user has the `Contact-Override` role.
- The API call will now match how shipping contacts are validated in checkout.  
<br/>

***
## December 12th, 2022

<h3 class="text-primary font-weight-bold">Updates</h3>

#### DeviceContractsByPage

- The `fromdate` and `todate` parameters are now optional in the GetDeviceContractsByPage API, so more records can be retrieved.

#### OnlineOrderStatus

- A new `OrderSource` parameter has been added to the GetOnlineOrderStatus method.
- The `OrderSource` parameter allows you to view a list of orders based on the channel used to place the order: MyAdmin, Marketplace, or API.

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### EditUserContact

- In an upcoming release, we will update the **EditUserContact** method logic to validate provided addresses, and provide the option to override invalid addresses, if the user has the `Contact-Override` role.  
<br/>

***
## December 5th, 2022

<h3 class="text-primary font-weight-bold">Updates</h3>

#### DeviceContractTransactions

- When calling **GetDeviceContractTransactions**, you will now see a new property in the returned **DeviceContractTransactions** object: int `UserContactId`
- If null, `UserContactId` will return -1
- Else, it will return the unique ID that belongs to the user contact
- This ID can be leveraged alongside **GetUserContacts** to return all the contact details of the user contact (currently **DeviceContractTransactions** only returns `UserContactName`)

#### ForceChangePasswordForUsersAsync

- The **ForceChangePasswordForUsersAsync** method now allows you to toggle on 'Force Password Change' for user accounts so that you can decide how often users are resetting their passwords
- The **ForceChangePasswordForUsersAysync** requires the `apikey`, `sessionID`, and a list of usernames `userNames`, and you must toggle `forceChangePassword` to True or False.

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### EditUserContact

- In an upcoming release, we will update the **EditUserContact** method logic to validate provided addresses, and provide the option to override invalid addresses, if the user has the `Contact-Override` role.  
<br/>

***
## November 14th, 2022

<h3 class="text-primary font-weight-bold">Updates</h3>

#### ApiOnlineOrder

- A new source parameter has been added to the `ApiOnlineOrder` object: `OrderSource.`
- The Order source parameter allows you to determine the channel used to place the order: MyAdmin, Marketplace, or API.

#### MyInstallLogs

- A new **GetMyInstallLogs** method has been added to allow you to easily retrieve your installation record information.

#### CreateExternalVendorDeviceBulkAsync

- A new method, **CreateExternalVendorDeviceBulkAsync**, has been added to make it easier for Marketplace Partners to offer products that do not connect to Geotab gateways.
- The **CreateExternalVendorDeviceBulkAsync** method allows Marketplace Partners to register devices using serial numbers, as well as the option to include IMEI and SIM numbers, so they show up in MyAdmin. 
- To use this method, you must have the `DeviceRegister-Bulk` role.  
<br/>

***
## September 19th, 2022

<h3 class="text-primary font-weight-bold">Updates</h3>

#### ApiDeviceContract

- **ApiDeviceContract** has been updated with a boolean value for the `isAutoActivated` parameter to indicate whether a device was auto-activated by Geotab using True or False. 
- The True label indicates the device was auto-activated by Geotab.

#### AccountsFromSerialsAsync

-  A new API, **GetAccountsFromSerialsAsync**, has been added to allow our Partners with multiple accounts identify the account associated with a specified device, and facilitates the use of other MyAdmin APIs that require account information.

#### OnlineOrderStatus

- A new parameter, `poExactMatch`, has been added to **GetOnlineOrderStatus** to allow youto search for orders that match a specific PO number.
- To search for orders that match an exact PO number, use double quotation marks.

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### End of Life — MyAdmin APIs for Third-party Device Data Ingestion

- On September 30, 2022, the MyAdmin APIs for third-party device data ingestion into MyGeotab will be permanently discontinued. After this date, MyGeotab will be unable to receive data from any devices that have not migrated to DIG. 
- For more information, refer to the [Migrating to DIG from MyAdmin API/SDK guide](https://docs.google.com/document/d/1hJj2CEMJlgbXHjF-it8Gey8b5_EnUDCqqhS8jRtxGyw/edit#heading=h.dzk3awl3nlud). 
- If you’re a new Partner with a standalone telematics device, refer to the [Using Custom Telematics Devices](https://geotab.github.io/sdk/software/guides/custom-telematics-devices/) section in the MyGeotab SDK.  
<br/>

***
## September 12th, 2022

<h3 class="text-primary font-weight-bold">Updates</h3>

#### GetDeviceContracts

- **GetDeviceContracts** has been updated for Partners that closely integrate their billing with MyAdmin
- The API now identifies the Rate Plan of a specific device in real time, as opposed to only the deivce mode

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### Moving the MyAdmin SDK Site

- On September 17, 2022, the current MyAdmin SDK site will be deprecated, and the MyAdmin SDK will be merged with the MyGeotab SDK site to create a centralized point of information related to integrating with Geotab.  

#### End of Life — MyAdmin APIs for Third-party Device Data Ingestion

- On September 30, 2022, the MyAdmin APIs for third-party device data ingestion into MyGeotab will be permanently discontinued. After this date, MyGeotab will be unable to receive data from any devices that have not migrated to DIG. 
- For more information, refer to the [Migrating to DIG from MyAdmin API/SDK guide](https://docs.google.com/document/d/1hJj2CEMJlgbXHjF-it8Gey8b5_EnUDCqqhS8jRtxGyw/edit#heading=h.dzk3awl3nlud). 
- If you’re a new Partner with a standalone telematics device, refer to the [Using Custom Telematics Devices](https://geotab.github.io/sdk/software/guides/custom-telematics-devices/) section in the MyGeotab SDK.  
<br/>

***
## August 17th, 2022

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### Moving the MyAdmin SDK Site

- On September 17, 2022, the current MyAdmin SDK site will be deprecated, and the MyAdmin SDK will be merged with the MyGeotab SDK site to create a centralized point of information related to integrating with Geotab.  

#### End of Life — MyAdmin APIs for Third-party Device Data Ingestion

- On September 30, 2022, the MyAdmin APIs for third-party device data ingestion into MyGeotab will be permanently discontinued. After this date, MyGeotab will be unable to receive data from any devices that have not migrated to DIG. 
- For more information, refer to the [Migrating to DIG from MyAdmin API/SDK guide](https://docs.google.com/document/d/1hJj2CEMJlgbXHjF-it8Gey8b5_EnUDCqqhS8jRtxGyw/edit#heading=h.dzk3awl3nlud). 
- If you’re a new Partner with a standalone telematics device, refer to the [Using Custom Telematics Devices](https://geotab.github.io/sdk/software/guides/custom-telematics-devices/) section in the MyGeotab SDK.  
<br/>

***
## July 11th, 2022

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### Moving the MyAdmin SDK Site

- On August 29, 2022, the current MyAdmin SDK site will be deprecated, and the MyAdmin SDK will be merged with the MyGeotab SDK site to create a centralized point of information related to integrating with Geotab.  

#### End of Life — MyAdmin APIs for Third-party Device Data Ingestion

- On September 30, 2022, the MyAdmin APIs for third-party device data ingestion into MyGeotab will be permanently discontinued. After this date, MyGeotab will be unable to receive data from any devices that have not migrated to DIG. 
- For more information, refer to the [Migrating to DIG from MyAdmin API/SDK guide](https://docs.google.com/document/d/1hJj2CEMJlgbXHjF-it8Gey8b5_EnUDCqqhS8jRtxGyw/edit#heading=h.dzk3awl3nlud). 
- If you’re a new Partner with a standalone telematics device, refer to the [Using Custom Telematics Devices](https://geotab.github.io/sdk/software/guides/custom-telematics-devices/) section in the MyGeotab SDK.  
<br/>

***
## June 20th, 2022

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### Orders

- Currently, MyAdmin does not require a zip code or postal code for shipments. As a result, shipments may be delayed due to blank or invalid zip or postal codes, and require verification before the order can be shipped. 
- To ensure we can get your order shipped as quickly as possible, the Zip Code/Postal Code field will be required, and we’re adding the functionality to validate the zip or postal code during the checkout process.  
<br/>

***
## June 6th, 2022

<h3 class="text-primary font-weight-bold">Updates</h3>

#### ApiOrderHeader 

- An optional parameter `Requested Delivery Date` is going to be added to **ApiOrderHeader** object, so Partners can request a specific delivery date for orders placed through the API.

#### GetDeviceContracts

- We’ve added two new parameters — `ordersAddedFrom` and `ordersAddedTo` — to the **GetDeviceContracts** method, so you can retrieve a list of OEM Purchase Order (PO) numbers added during the specific date range. 
- When using these parameters, the other two parameters — `fromDate` and `toDate` — are not required. 

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### Monthly Billing

- In an upcoming release, we’re adding an Extended from Database column on the Monthly Billing page for clarity and to improve the Monthly Billing reports for Extendable Services. 
- The Extended from Database column displays the names of the originating databases, when a device has extended services from a database in the selected billing period. We are also renaming the Database column to Database Billed to more accurately describe what this column represents.
- Please take note of this if your integration uses column names rather than column numbers.

#### Orders

- Currently, MyAdmin does not require a zip code or postal code for shipments. As a result, shipments may be delayed due to blank or invalid zip or postal codes, and require verification before the order can be shipped. 
- To ensure we can get your order shipped as quickly as possible, the Zip Code/Postal Code field will be required, and we’re adding the functionality to validate the zip or postal code during the checkout process.  
<br/>

***
## May 16th, 2022

<h3 class="text-primary font-weight-bold">Updates</h3>

#### OnlineOrderStatus

- The **GetOnlineOrderStatus** API has been updated to include a new parameter, `includeCancelledOrders`, which allows you to include cancelled orders in the search results.

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### ApiOrderHeader 

- An optional parameter `Requested Delivery Date` is going to be added to **ApiOrderHeader** object, so Partners can request a specific delivery date for orders placed through the API.

#### Monthly Billing

- In an upcoming release, we’re adding an Extended from Database column on the Monthly Billing page for clarity and to improve the Monthly Billing reports for Extendable Services. 
- The Extended from Database column displays the names of the originating databases, when a device has extended services from a database in the selected billing period. We are also renaming the Database column to Database Billed to more accurately describe what this column represents.
- Please take note of this if your integration uses column names rather than column numbers.

#### Orders

- Currently, MyAdmin does not require a zip code or postal code for shipments. As a result, shipments may be delayed due to blank or invalid zip or postal codes, and require verification before the order can be shipped. 
- To ensure we can get your order shipped as quickly as possible, the Zip Code/Postal Code field will be required, and we’re adding the functionality to validate the zip or postal code during the checkout process.  
<br/>

***
## April 11th, 2022

<h3 class="text-primary font-weight-bold">Updates</h3>

#### PartnerDeviceContractsAsync

- A new API, **GetPartnerDeviceContractsAsync**, has been added to allow Marketplace Partners and Integration Partners to retrieve a list of active devices they’ve produced, as well as the database each device is connected to.
- With this API, these Partners can set up, service, and support their products, as well as ensure their products are properly functioning. 
- The `ThirdPartyPartner-Admin` role is required to access the **GetPartnerDeviceContractsAsync** API. 
-  To use this API, input `sessionID` in addition to the **GetPartnerDeviceContractsAsync** method. Once this is complete, the API call retrieves the list of devices including the Serial Number, Database, and Product Code. 
- This API is for Partners who produce third-party products only.

#### Shutdown complete — disabled GET requests used for authentication

-  For several months, we have communicated that we will disable **Authenticate** and **RegisterNewUser** GET requests to the MyAdmin API for increased security. 
- As mentioned, effective March 31, 2022, GET requests have been disabled. POST requests will continue to be supported. 
- If GET requests are used for authentication purposes, users will receive the following error message: “405 Method Not Allowed.”  
<br/>

***
## March 25th, 2022

<h3 class="text-primary font-weight-bold">Updates</h3>

#### Updated character limit for Reseller Reference

- We’ve made changes to our current character limit for the Reseller Reference field. We have increased the limit from 250 characters to 500 characters.

#### Shutdown imminent — disable GET requests used for authentication

-  Effective March 31, 2022, GET requests will be disabled. POST requests will continue to be supported. If GET requests are used for authentication purposes, users will receive the following error message: “405 Method Not Allowed.”  
<br/>

***
## February 28th, 2022

<h3 class="text-primary font-weight-bold">Updates</h3>

#### DeviceContracts

- The **GetDeviceContracts** method search functionality has been updated to support searching for OEM devices based on full or partial Purchase Order (PO) numbers.

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### Disable GET Requests used for Authentication

- In an upcoming release, **Authenticate** and **RegisterNewUser** GET requests will be disabled to the MyAdmin API for increased security. 
- POST requests will continue to be supported. If GET requests are used for authentication purposes, users will receive the following error message: “405 Method Not Allowed.”  
<br/>

***
## January 31st, 2022

<h3 class="text-primary font-weight-bold">Updates</h3>

#### Generate Serial Numbaers in Bulk

-  Serial numbers can now be requested for up to 1000 custom telematics devices (with the same product code) at a time. 
- Previously, the functionality only supported one custom telematics device at a time.

#### Update to the NuGet Package

- The NuGet package now includes common elements from the MyGeotab SDK. We leverage .NET Core instructions, so in order to use the new package any integrations using the old .NET Framework instructions must be updated.

<h3 class="text-danger font-weight-bold">Coming Soon</h3>

#### Disable GET Requests used for Authentication

- In an upcoming release, **Authenticate** and **RegisterNewUser** GET requests will be disabled to the MyAdmin API for increased security. 
- POST requests will continue to be supported. If GET requests are used for authentication purposes, users will receive the following error message: “405 Method Not Allowed.” 
