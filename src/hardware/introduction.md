---
layout: page
title: Add-On Hardware Integration Protocol
permalink: /hardware/introduction/
---

## Introduction

Geotab supports third-party device integration through the CAN, USB, RS232, and BLE interfaces. The Add-On Protocols section outlines the integration process for all four applications. Data can be sent via any of these interfaces and will be saved as status data in the GO device which will then be sent up to MyGeotab along with all other GO device data and can be reported on just like any other data. Data being sent to the GO device from external devices via the third party protocol include tire pressures, multiple temperatures, external switch states, load weights and much more. If you have an external device that reports information, and you want to send that data to the GO device there is reasonable chance we already have it defined. If we don't we will define it and add it to the system.

## Input-Output Expander (IOX)

Third-party devices communicate with the GO device using an IOX Add-On corresponding to the aforementioned interfaces, namely the [IOX-CAN](https://docs.google.com/document/d/19Wlwsb_AnpE3AndOf1cbiFLzTOCI5fwscOwQh5a6jF8/preview), [IOX-USB](https://docs.google.com/document/d/1_vocie4MYAHAUBOJ_AUXzYN11jrR5jyCynFgbqigFys/preview), [IOX-RS232](https://docs.google.com/document/d/1UDEwQOY2zH1ABQ3UP6rdlcZ--LPt5SUbKEZ_AZgUsWk/preview) and [IOX-BT](https://docs.google.com/document/d/1ICzpfhyYQEl1acQtJ9AGw09pzH5ADHNC8EGIcvTP2KU/preview).

Third-party data sent to the GO device will be transmitted to the MyGeotab platform. Data received from the third-party device can be queried within MyGeotab by navigating to **Engine &amp; Maintenance** > **Engine &amp; Device…** > **Measurements**. It can also be reported on just like any other status data.