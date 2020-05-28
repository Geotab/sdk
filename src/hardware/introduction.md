---
layout: page
title: Hardware Development Kit
permalink: /hardware/introduction/
---

## Introduction

Geotab supports Hardware Add-On integration through the CAN, USB, RS232, and BLE interfaces. The Add-On Protocols section outlines the integration process for all four interfaces. Geotab's open platform allows for expandability to support the unique data sets of any Hardware Add-On. GO device can currently report these [Hardware Add-On data types](../hardware-add-on-data-types/).

When using Geotab's Hardware Add-On protocols, it is important not to send excessive amounts of data to the GO device.  This can be assured by only sending data when it is completely necessary and avoiding the sending of repetitive values. The GO device will stop recording data from the Hardware Add-On device if excessive Add-On data is detected. When this condition occurs, "Status data no longer being saved due to excessive data" will appear in the Fault Data for the GO device within MyGeotab. In order to re-enable data logging for the Hardware Add-On, the GO device will need to be completely disconnected from power and then powered back up again.

## Integrating with the Input-Output Expander (IOX)

Hardware Add-Ons communicate with the GO device using an IOX corresponding to the aforementioned interfaces, namely the [IOX-CAN](https://docs.google.com/document/d/19Wlwsb_AnpE3AndOf1cbiFLzTOCI5fwscOwQh5a6jF8/preview), [IOX-USB](https://docs.google.com/document/d/1_vocie4MYAHAUBOJ_AUXzYN11jrR5jyCynFgbqigFys/preview), [IOX-RS232](https://docs.google.com/document/d/1UDEwQOY2zH1ABQ3UP6rdlcZ--LPt5SUbKEZ_AZgUsWk/preview), [IOX-BT](https://docs.google.com/document/d/1ICzpfhyYQEl1acQtJ9AGw09pzH5ADHNC8EGIcvTP2KU/preview) and any [Custom IOX](../developing-an-iox/hardware-design-guide/). The format of data sent through an IOX could vary with the type of IOX, which is shown in the table below. All IOXs support data transfer from Add-On to GO device, while some IOXs also support data transfer from GO device to Add-On.

| IOX Type | Add-On Protocol | Status Data | Custom Data | Binary Data | Data Transfer From GO Device To Add-On   |
| :---: | :---: | :---: | :---: | :---: | :---: |
| IOX-RS232 | Y | Y | Y | Y | Y |
| IOX-USB | Y | Y | Y | Y | Y |
| IOX-CAN | Y | Y | N | N | Y |
| IOX-BT | Y | Y | Y | N | N |
| Custom IOX | Y | Y | Y | Y | Y |

Hardware Add-On data can be sent via any of these IOX and will be be transmitted to the Geotab server in several formats, namely "Status Data", "Custom Data", and "Binary Data". Data in all three formats may be retrieved via [API](../../software/introduction). However, only Status Data can be queried within MyGeotab by navigating to **Engine &amp; Maintenance** > **Engine &amp; Device…** > **Measurements**. Only with Status Data, it is possible to create meaningful reports or leverage the rules engine via MyGeotab.

Geotab offers a wide range of IOXs, some of which are stand-alone solutions. IOXs such as IOX-CAN, IOX-USB, and IOX-RS232 serve to connect a GO device with a Hardware Add-On, while others like IOX-GARMIN, IOX-GOTALK, etc. are readily available solutions. Check out our full [IOX offerings](https://www.geotab.com/blog/iox-expansion/).