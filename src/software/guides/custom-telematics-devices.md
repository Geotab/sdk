---
layout: page
permalink: /software/guides/custom-telematics-devices/
title: Using Custom Telematics Devices
---

Geotab provides the ability to integrate non-GO device telematics devices into the platform. These devices are defined as any telematics device that is not manufactured or sold by Geotab but is used in conjunction with Geotab’s fleet management application.

# Getting Started

To get started with the registration process, please refer to the [Custom Telematics Devices and MyGeotab](https://docs.google.com/document/d/1Mddnxc2qKBCNYvVu0-BXcyR-blPlHwa0Zun0mBzZt88){:target="_blank"} document.

Geotab uses MyAdmin API to manage devices and uses Data Intake Gateway to intake device data
![MyAdmin and DIG flow]({{site.baseurl}}/software/guides/MyAdmin-and-DIG-flow.jpg){:width="65%"}

To manage devices, the following MyAdmin API calls are most frequently used:
* [Authenticate](https://geotab.github.io/sdk/myadmin-sdk/api/reference/#Authenticate) (an example is given in [What is the Authenticate MyAdmin API method](https://docs.google.com/document/d/1Mddnxc2qKBCNYvVu0-BXcyR-blPlHwa0Zun0mBzZt88/edit#heading=h.bub5istj4ydv))
* [ProvisionDeviceToAccount](https://geotab.github.io/sdk/myadmin-sdk/api/reference/#ProvisionDeviceToAccount_1) (an example is given in [What are the ProvisionDevice/ProvisionDeviceToAccount MyAdmin API method](https://docs.google.com/document/d/1Mddnxc2qKBCNYvVu0-BXcyR-blPlHwa0Zun0mBzZt88/edit#heading=h.y7845beasdle))
* [ProvisionDevice](https://geotab.github.io/sdk/myadmin-sdk/api/reference/#ProvisionDevice_1) (an example is given in [What are the ProvisionDevice/ProvisionDeviceToAccount MyAdmin API method](https://docs.google.com/document/d/1Mddnxc2qKBCNYvVu0-BXcyR-blPlHwa0Zun0mBzZt88/edit#heading=h.y7845beasdle))
* [UpdateDeviceContracts](https://geotab.github.io/sdk/myadmin-sdk/api/reference/#UpdateDeviceContracts)
* [TerminateDeviceBilling](https://geotab.github.io/sdk/myadmin-sdk/api/reference/#TerminateDeviceBilling)

To intake data from a Custom Telematics Device, the usage of [Data Intake Gateway](https://docs.google.com/document/d/15uNuPqwFcPLe6vKs_JgY5nPTy2isQ3WYUu4oyQ3cEfQ){:target="_blank"} is required. The required API calls, and recommended workflows are documented in the linked document.

