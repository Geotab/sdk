---
layout: page
permalink: /myadmin-sdk/new/
title: What's New
---
New changes to the MyAdmin SDK.

## December 12th, 2022

### Updates

#### DeviceContractsByPage

- The `fromdate` and `todate` parameters are now optional in the GetDeviceContractsByPage API, so more records can be retrieved.

#### OnlineOrderStatus

- A new `OrderSource` parameter has been added to the GetOnlineOrderStatus method.
- The `OrderSource` parameter allows you to view a list of orders based on the channel used to place the order: MyAdmin, Marketplace, or API.

### Coming Soon

#### EditUserContact

-In an upcoming release, we will update the EditUserContact method logic to validate provided addresses, and provide the option to override invalid addresses, if the user has the Contact-Override role. 

## December 5th, 2022

### Updates

#### DeviceContractTransactions

- When calling GetDeviceContractTransactions, you will now see a new property in the returned DeviceContractTransactions object: int `UserContactId`
- If null, `UserContactId` will return -1
- Else, it will return the unique ID that belongs to the user contact
- This ID can be leveraged alongside GetUserContacts to return all the contact details of the user contact (currently DeviceContractTransactions only returns `UserContactName`)

#### ForceChangePasswordForUsersAsync

- The ForceChangePasswordForUsersAsync method now allows you to toggle on Force Password Change for user accounts so that you can decide how often users are resetting their passwords
- The ForceChangePasswordForUsersAysync requires the `apikey`, `sessionID`, and a list of usernames `userNames`, and you must toggle `forceChangePassword` to True or False.


### Coming Soon

#### EditUserContact

-In an upcoming release, we will update the EditUserContact method logic to validate provided addresses, and provide the option to override invalid addresses, if the user has the Contact-Override role. 

## November 14th, 2022

### Updates

#### ApiOnlineOrder

- A new source parameter has been added to the ApiOnlineOrder object: `OrderSource.`
- The Order source parameter allows you to determine the channel used to place the order: MyAdmin, Marketplace, or API.

#### MyInstallLogs

- A new GetMyInstallLogs method has been added to allow you to easily retrieve your installation record information.

#### CreateExternalVendorDeviceBulkAsync

- A new method, CreateExternalVendorDeviceBulkAsync, has been added to make it easier for Marketplace Partners to offer products that do not connect to Geotab gateways.
- The CreateExternalVendorDeviceBulkAsync method allows Marketplace Partners to register devices using serial numbers, as well as the option to include IMEI and SIM numbers, so they show up in MyAdmin. 
- To use this method, you must have the DeviceRegister-Bulk role.

## September 19th, 2022

### Updates

#### ApiDeviceContract

- ApiDeviceContract has been updated with a boolean value for the `isAutoActivated` parameter to indicate whether a device was auto-activated by Geotab using True or False. 
- The True label indicates the device was auto-activated by Geotab.

#### AccountsFromSerialsAsync

-  A new API, GetAccountsFromSerialsAsync, has been added to allow our Partners with multiple accounts identify the account associated with a specified device, and facilitates the use of other MyAdmin APIs that require account information.

#### OnlineOrderStatus

- A new parameter, `poExactMatch`, has been added to GetOnlineOrderStatus to allow youto search for orders that match a specific PO number.
- To search for orders that match an exact PO number, use double quotation marks.

## May 16th, 2022

### Updates

#### OnlineOrderStatus

- The GetOnlineOrderStatus API has been updated to include a new parameter, `includeCancelledOrders`, which allows you to include cancelled orders in the search results.

### Coming Soon

#### ApiOrderHeader 

- An optional parameter `Requested Delivery Date` is going to be added to ApiOrderHeader object, so Partners can request a specific delivery date for orders placed through the API.

## April 11th, 2022

### Updates

#### PartnerDeviceContractsAsync

- A new API, GetPartnerDeviceContractsAsync, has been added to allow Marketplace Partners and Integration Partners to retrieve a list of active devices they’ve produced, as well as the database each device is connected to.
- With this API, these Partners can set up, service, and support their products, as well as ensure their products are properly functioning. 
- The ThirdPartyPartner-Admin role is required to access the GetPartnerDeviceContractsAsync API. 
-  To use this API, input `sessionID` in addition to the GetPartnerDeviceContractsAsync method. Once this is complete, the API call retrieves the list of devices including the Serial Number, Database, and Product Code. 
- This API is for Partners who produce third-party products only.

## March 25th, 2022

### Updates

#### Updated character limit for Reseller Reference

- We’ve made changes to our current character limit for the Reseller Reference field. We have increased the limit from 250 characters to 500 characters.

#### Shutdown imminent — disable GET requests used for authentication

-  Effective March 31, 2022, GET requests will be disabled. POST requests will continue to be supported. If GET requests are used for authentication purposes, users will receive the following error message: “405 Method Not Allowed.” 

## February 28th, 2022

### Updates

#### DeviceContracts

- The GetDeviceContracts method search functionality has been updated to support searching for OEM devices based on full or partial Purchase Order (PO) numbers.

## January 31st, 2022

### Updates

#### Generate Serial Numbaers in Bulk

-  Serial numbers can now be requested for up to 1000 custom telematics devices (with the same product code) at a time. 
- Previously, the functionality only supported one custom telematics device at a time.

#### Update to the NuGet Package

- The NuGet package now includes common elements from the MyGeotab SDK. We leverage .NET Core instructions, so in order to use the new package any integrations using the old .NET Framework instructions must be updated.

### Coming Soon

#### Disable GET Requests used for Authentication

- In an upcoming release, Authenticate and RegisterNewUser GET requests will be disabled to the MyAdmin API for increased security. 
- POST requests will continue to be supported. If GET requests are used for authentication purposes, users will receive the following error message: “405 Method Not Allowed.” 