---
layout: page
title: Hardware Add-On data types
permalink: /hardware/hardware-add-on-data-types/
---

Listed in the table below are the types of data that the GO device can currently report from Hardware Add-Ons. If you'd like to send a data type that's not listed, we can work with you to build support for it.

The GO device will relay the raw data sent by the external device to MyGeotab. MyGeotab will then take the raw value received from the GO device and adjust by the multiplier and the offset. When MyGeotab applies the conversion, the multiplier is always done first, followed by the offset, as per the formula:

<b><center><i>
Final Value = (Initial Value × Multiplier) + Offset
</i></center></b>

The unit refers to the unit of measurement that you wish to see in MyGeotab after all the conversions are complete. Geotab uses metric units and all predefined status IDs currently used by Geotab are in metric units.

**Example:**

- If you are reporting a temperature range from -40 °C to 215 °C, the third-party device would send values from 0 to 255 (can&#39;t send negative values). The offset would be set to -40 so that MyGeotab would know to subtract 40 from the value obtained from the GO device. So a reported value of 0 by the third-party device would show up as -40 °C in MyGeotab.

- The third-party device is sending a distance in 0.1 km increments, such that a value of 1223 represents a distance of 122.3 km. A multiplier of 0.1 should be applied so that the value is properly converted to kilometers on MyGeotab.

| Diagnostic | Code | Unit | Data Length | Conversion | Offset |
|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-----:|:---------:|:-----------:|:-----------:|:------:|
| External immobilizer: tag UID high | 2600 | 0 | 1 | 1 | 0 |
| External immobilizer: tag UID low | 2601 | 0 | 1 | 1 | 0 |
| External immobilizer: tag read status | 2602 | 0 | 1 | 1 | 0 |
| External immobilizer: door open | 2603 | 0 | 1 | 1 | 0 |
| External immobilizer: USB connected | 2604 | 0 | 1 | 1 | 0 |
| External immobilizer: USB disconnected | 2605 | 0 | 1 | 1 | 0 |
| External immobilizer: vehicle not in park | 2606 | 0 | 1 | 1 | 0 |
| External immobilizer: vehicle in park | 2607 | 0 | 1 | 1 | 0 |
| External immobilizer: vehicle moving | 2608 | 0 | 1 | 1 | 0 |
| External immobilizer: vehicle stopped | 2609 | 0 | 1 | 1 | 0 |
| External immobilizer: vehicle parking brake on | 2610 | 0 | 1 | 1 | 0 |
| External immobilizer: vehicle parking brake off | 2611 | 0 | 1 | 1 | 0 |
| External immobilizer: vehicle engine on | 2612 | 0 | 1 | 1 | 0 |
| External immobilizer: vehicle engine off | 2613 | 0 | 1 | 1 | 0 |
| External immobilizer: power supply failure | 2614 | 0 | 1 | 1 | 0 |
| External immobilizer: power supply recover | 2615 | 0 | 1 | 1 | 0 |
| External immobilizer: vehicle engine on (1 = true) | 2616 | 0 | 1 | 1 | 0 |
| External immobilizer: vehicle engine off (1 = true) | 2617 | 0 | 1 | 1 | 0 |
| External immobilizer: power supply failure (1 = true) | 2618 | 0 | 1 | 1 | 0 |
| External immobilizer: power supply recover (1 = true) | 2619 | 0 | 1 | 1 | 0 |
| Bluetooth beacon in range | 10011 | 0 | 1 | 1 | 0 |
| Diagnostic not in use | 10012 | 0 | 1 | 1 | 0 |
| Bluetooth beacon battery level | 10014 | % | 1 | 1 | 0 |
| Bluetooth beacon firmware | 10015 | 0 | 3 | 1 | 0 |
| Bluetooth beacon accelerometer event counter | 10016 | 0 | 3 | 1 | 0 |
| Bluetooth beacon temperature | 10017 | C | 3 | 1 | 0 |
| Bluetooth beacon illuminance (lux) | 10018 | 0 | 3 | 1 | 0 |
| Bluetooth beacon relative humidity | 10019 | % | 3 | 1 | 0 |
| Bluetooth beacon barometric pressure | 10020 | Pa | 3 | 1 | 0 |
| Bluetooth beacon altitude | 10021 | m | 3 | 1 | 0 |
| Bluetooth particulate matter less than 1 micrometer (micrograms per cubic meter) | 10022 | 0 | 3 | 1 | 0 |
| Bluetooth particulate matter less than 2.5 micrometers (micrograms per cubic meter) | 10023 | 0 | 3 | 1 | 0 |
| Bluetooth particulate matter less than 10 micrometers (micrograms per cubic meter) | 10024 | 0 | 3 | 1 | 0 |
| Bluetooth Nitric Oxide (NO) concentration | 10025 | ppm | 3 | 1 | 0 |
| Bluetooth Nitrogen Dioxide (NO2) concentration | 10026 | ppm | 3 | 1 | 0 |
| Bluetooth Carbon Monoxide (CO) concentration | 10027 | ppm | 3 | 1 | 0 |
| Bluetooth Ammonia (NH3) concentration | 10028 | ppm | 3 | 1 | 0 |
| Bluetooth Methane (CH4) concentration | 10029 | ppm | 3 | 1 | 0 |
| Bluetooth Ethanol (C2H5OH) concentration | 10030 | ppm | 3 | 1 | 0 |
| Bluetooth Hydrogen (H2) concentration | 10031 | ppm | 3 | 1 | 0 |
| Bluetooth Carbon Dioxide (CO2) concentration | 10032 | ppm | 3 | 1 | 0 |
| Bluetooth generic byte: 230 | 10240 | 0 | 1 | 1 | 0 |
| Bluetooth generic byte: 231 | 10241 | 0 | 1 | 1 | 0 |
| Bluetooth generic byte: 232 | 10242 | 0 | 1 | 1 | 0 |
| Bluetooth generic byte: 233 | 10243 | 0 | 1 | 1 | 0 |
| Bluetooth generic byte: 234 | 10244 | 0 | 1 | 1 | 0 |
| Bluetooth generic byte: 235 | 10245 | 0 | 1 | 1 | 0 |
| Bluetooth generic byte: 236 | 10246 | 0 | 1 | 1 | 0 |
| Bluetooth generic byte: 237 | 10247 | 0 | 1 | 1 | 0 |
| Bluetooth generic byte: 238 | 10248 | 0 | 1 | 1 | 0 |
| Bluetooth generic byte: 239 | 10249 | 0 | 1 | 1 | 0 |
| Bluetooth generic timer: 240 | 10250 | 0 | 3 | 1 | 0 |
| Bluetooth generic timer: 241 | 10251 | 0 | 3 | 1 | 0 |
| Bluetooth generic timer: 242 | 10252 | 0 | 3 | 1 | 0 |
| Bluetooth generic timer: 243 | 10253 | 0 | 3 | 1 | 0 |
| Bluetooth generic timer: 244 | 10254 | 0 | 3 | 1 | 0 |
| Bluetooth generic timer: 245 | 10255 | 0 | 3 | 1 | 0 |
| Bluetooth generic timer: 246 | 10256 | 0 | 3 | 1 | 0 |
| Bluetooth generic timer: 247 | 10257 | 0 | 3 | 1 | 0 |
| Bluetooth generic timer: 248 | 10258 | 0 | 3 | 1 | 0 |
| Bluetooth generic timer: 249 | 10259 | 0 | 3 | 1 | 0 |
| Bluetooth custom data | 10265 | 0 | 18 | 1 | 0 |
| Onboard scale axle 1 weight | 30000 | g | 4 | 1000 | 0 |
| Onboard scale axle 2 weight | 30001 | g | 4 | 1000 | 0 |
| Onboard scale axle 3 weight | 30002 | g | 4 | 1000 | 0 |
| Onboard scale axle 4 weight | 30003 | g | 4 | 1000 | 0 |
| Onboard scale gross weight | 30004 | g | 4 | 1000 | 0 |
| Onboard scale net weight | 30005 | g | 4 | 1000 | 0 |
| Onboard scale alarm enabled (1 = enabled) | 30006 | 0 | 1 | 1 | 0 |
| Onboard scale alarm active (1 = active) | 30007 | 0 | 1 | 1 | 0 |
| Onboard scale weight error (1=error) | 30008 | 0 | 1 | 1 | 0 |
| Onboard scale weight distribution alarm (1 = on) | 30009 | 0 | 1 | 1 | 0 |
| Onboard scale stability angle alarm (1 = on) | 30010 | 0 | 1 | 1 | 0 |
| Onboard scale stability angle right (1 = on) | 30011 | 0 | 1 | 1 | 0 |
| Onboard scale stability angle left (1 = on) | 30012 | 0 | 1 | 1 | 0 |
| Onboard scale system fault (1 = fault) | 30013 | 0 | 1 | 1 | 0 |
| On-board truck scale net weight | 30014 | g | 4 | 453.6 | 0 |
| Remote probe 1 temperature | 30050 | C | 4 | 0.0625 | -1024 |
| Remote probe 1 fault (1 = fault) | 30051 | 0 | 1 | 1 | 0 |
| Remote probe 1 disconnected (1 = disconnected) | 30052 | 0 | 1 | 1 | 0 |
| Remote probe 2 temperature | 30053 | C | 4 | 0.0625 | -1024 |
| Remote probe 2 fault (1 = fault) | 30054 | 0 | 1 | 1 | 0 |
| Remote probe 2 disconnected (1 = disconnected) | 30055 | 0 | 1 | 1 | 0 |
| Remote probe 3 temperature | 30056 | C | 4 | 0.0625 | -1024 |
| Remote probe 3 fault (1 = fault) | 30057 | 0 | 1 | 1 | 0 |
| Remote probe 3 disconnected (1 = disconnected) | 30058 | 0 | 1 | 1 | 0 |
| Remote probe 4 temperature | 30059 | C | 4 | 0.0625 | -1024 |
| Remote probe 4 fault (1 = fault) | 30060 | 0 | 1 | 1 | 0 |
| Remote probe 4 disconnected (1 = disconnected) | 30061 | 0 | 1 | 1 | 0 |
| H2S gas present | 30070 | ppm | 4 | 1 | 0 |
| Vehicle mounted ALERT alarm | 30071 | 0 | 1 | 1 | 0 |
| Wireless ALERT alarm | 30072 | 0 | 1 | 1 | 0 |
| Motion time-out ALERT alarm | 30073 | 0 | 1 | 1 | 0 |
| EIA status (1 = active) | 30080 | 0 | 1 | 1 | 0 |
| Siren status (1 = on) | 30081 | 0 | 1 | 1 | 0 |
| PRAN ignition status (1 = ignition on) | 30082 | 0 | 1 | 1 | 0 |
| Remote CIA status (1 = active) | 30083 | 0 | 1 | 1 | 0 |
| Local CIA status (1 = active) | 30084 | 0 | 1 | 1 | 0 |
| Remote VIA status (1 = active) | 30085 | 0 | 1 | 1 | 0 |
| Local VIA status (1 = active) | 30086 | 0 | 1 | 1 | 0 |
| CIT mode (1 = on) | 30087 | 0 | 1 | 1 | 0 |
| Valet mode (1 = on) | 30088 | 0 | 1 | 1 | 0 |
| Emergency mode (1 = on) | 30089 | 0 | 1 | 1 | 0 |
| Shuttle mode (1 = on) | 30090 | 0 | 1 | 1 | 0 |
| Contact sensor 1 | 30091 | 0 | 1 | 1 | 0 |
| Contact sensor 2 | 30092 | 0 | 1 | 1 | 0 |
| Contact sensor 3 | 30093 | 0 | 1 | 1 | 0 |
| Contact sensor 4 | 30094 | 0 | 1 | 1 | 0 |
| Contact sensor 5 | 30095 | 0 | 1 | 1 | 0 |
| Contact sensor 6 | 30096 | 0 | 1 | 1 | 0 |
| Contact sensor 7 | 30097 | 0 | 1 | 1 | 0 |
| Contact sensor 8 | 30098 | 0 | 1 | 1 | 0 |
| RFID tag front temperature | 31000 | C | 2 | 0.00390625 | 0 |
| RFID tag front battery | 31001 | V | 1 | 0.01294 | 0 |
| RFID tag mid temperature | 31002 | C | 2 | 0.00390625 | 0 |
| RFID tag mid battery | 31003 | V | 1 | 0.01294 | 0 |
| RFID tag back temperature | 31004 | C | 2 | 0.00390625 | 0 |
| RFID tag back battery | 31005 | V | 1 | 0.01294 | 0 |
| RFID tag fridge power | 31006 | 0 | 1 | 1 | 0 |
| RFID tag fridge battery | 31007 | V | 1 | 0.01294 | 0 |
| Onboard scale gross weight | 31020 | N | 4 | 1 | 0 |
| Peripheral device: trailer ID | 31030 | 0 | 3 | 1 | 0 |
| Peripheral device: trailer connected (1 = connected) | 31031 | 0 | 1 | 1 | 0 |
| Peripheral device: trailer fault loss of RF link in transit | 31032 | 0 | 1 | 1 | 0 |
| Peripheral device: trailer fault loss of RF link at disconnect | 31033 | 0 | 1 | 1 | 0 |
| Peripheral device: fingerprint scanner report type | 31040 | 0 | 1 | 1 | 0 |
| Peripheral device: fingerprint scanner user ID | 31041 | 0 | 2 | 1 | 0 |
| Peripheral device: fingerprint scanner truck ID | 31042 | 0 | 4 | 1 | 0 |
| Radar rear sensor 1 zone | 31060 | 0 | 1 | 1 | 0 |
| Radar rear sensor 1 status | 31061 | 0 | 1 | 1 | 0 |
| Radar rear sensor 2 zone | 31062 | 0 | 1 | 1 | 0 |
| Radar rear sensor 2 status | 31063 | 0 | 1 | 1 | 0 |
| Radar right sensor 1 zone | 31064 | 0 | 1 | 1 | 0 |
| Radar right sensor 1 status | 31065 | 0 | 1 | 1 | 0 |
| Radar right sensor 2 zone | 31066 | 0 | 1 | 1 | 0 |
| Radar right sensor 2 status | 31067 | 0 | 1 | 1 | 0 |
| Radar left sensor 1 zone | 31068 | 0 | 1 | 1 | 0 |
| Radar left sensor 1 status | 31069 | 0 | 1 | 1 | 0 |
| Radar left sensor 2 zone | 31070 | 0 | 1 | 1 | 0 |
| Radar left sensor 2 status | 31071 | 0 | 1 | 1 | 0 |
| Radar front sensor 1 zone | 31072 | 0 | 1 | 1 | 0 |
| Radar front sensor 1 status | 31073 | 0 | 1 | 1 | 0 |
| Radar front sensor 2 zone | 31074 | 0 | 1 | 1 | 0 |
| Radar front sensor 2 status | 31075 | 0 | 1 | 1 | 0 |
| Trailer 1 connected | 31076 | 0 | 1 | 1 | 0 |
| Trailer 2 connected | 31077 | 0 | 1 | 1 | 0 |
| Idling device - partial idle time | 31078 | s | 1 | 1 | 0 |
| Idling device - idle time since first acceleration | 31079 | s | 2 | 1 | 0 |
| Idling device - accelerations during idling | 31080 | 0 | 1 | 1 | 0 |
| Driver detected (1 = yes) | 31081 | 0 | 1 | 1 | 0 |
| Driver fatigue alarm | 31082 | 0 | 1 | 1 | 0 |
| Fuel level - external tank 1 | 31083 | m | 2 | 0.001 | 0 |
| Fuel level - external tank 2 | 31084 | m | 2 | 0.001 | 0 |
| Fuel level - external tank 3 | 31085 | m | 2 | 0.001 | 0 |
| Fuel tank 1 (volume) | 31086 | L | 4 | 0.01 | 0 |
| Fuel tank 2 (volume) | 31087 | L | 4 | 0.01 | 0 |
| Fuel tank 3 (volume) | 31088 | L | 4 | 0.01 | 0 |
| Fuel tank 1 (%) | 31089 | % | 4 | 0.01 | 0 |
| Fuel tank 2 (%) | 31090 | % | 4 | 0.01 | 0 |
| Fuel tank 3 (%) | 31091 | % | 4 | 0.01 | 0 |
| Onboard scale channel A: net weight | 32768 | g | 4 | 1000 | 0 |
| Onboard scale channel A: net overweight | 32769 | g | 4 | 1000 | 0 |
| Onboard scale channel A: gross weight | 32770 | g | 4 | 1000 | 0 |
| Onboard scale channel A: gross overweight | 32771 | g | 4 | 1000 | 0 |
| Onboard scale front axle empty weight | 32772 | g | 4 | 1000 | 0 |
| Onboard scale channel A: error on channel | 32773 | 0 | 4 | 1 | 0 |
| Onboard scale front axle loaded weight | 32774 | g | 4 | 1000 | 0 |
| Onboard scale front axle overweight | 32775 | g | 4 | 1000 | 0 |
| Onboard scale channel B: net weight | 32776 | g | 4 | 1000 | 0 |
| Onboard scale channel B: net overweight | 32777 | g | 4 | 1000 | 0 |
| Onboard scale channel B: gross weight | 32778 | g | 4 | 1000 | 0 |
| Onboard scale channel B: gross overweight | 32779 | g | 4 | 1000 | 0 |
| Onboard scale rear axle empty weight | 32780 | g | 4 | 1000 | 0 |
| Onboard scale channel B: error on channel | 32781 | 0 | 4 | 1 | 0 |
| Onboard scale rear axle loaded weight | 32782 | g | 4 | 1000 | 0 |
| Onboard scale rear axle overweight | 32783 | g | 4 | 1000 | 0 |
| Onboard scale channel C: net weight | 32784 | g | 4 | 1000 | 0 |
| Onboard scale channel C: net overweight | 32785 | g | 4 | 1000 | 0 |
| Onboard scale channel C: gross weight | 32786 | g | 4 | 1000 | 0 |
| Onboard scale channel C: gross overweight | 32787 | g | 4 | 1000 | 0 |
| Onboard scale pup empty weight | 32788 | g | 4 | 1000 | 0 |
| Onboard scale channel C: error on channel | 32789 | 0 | 4 | 1 | 0 |
| Onboard scale pup loaded weight | 32790 | g | 4 | 1000 | 0 |
| Onboard scale pup overweight | 32791 | g | 4 | 1000 | 0 |
| Onboard scale channel D: net weight | 32792 | g | 4 | 1000 | 0 |
| Onboard scale channel D: net overweight | 32793 | g | 4 | 1000 | 0 |
| Onboard scale channel D: gross weight | 32794 | g | 4 | 1000 | 0 |
| Onboard scale channel D: gross overweight | 32795 | g | 4 | 1000 | 0 |
| Onboard scale channel D: error on channel | 32797 | 0 | 4 | 1 | 0 |
| Onboard scale A+B: net weight | 32800 | g | 4 | 1000 | 0 |
| Onboard scale A+B: net overweight | 32801 | g | 4 | 1000 | 0 |
| Onboard scale A+B: gross weight | 32802 | g | 4 | 1000 | 0 |
| Onboard scale A+B: gross overweight | 32803 | g | 4 | 1000 | 0 |
| Onboard scale truck empty weight | 32804 | g | 4 | 1000 | 0 |
| Onboard scale A+B error | 32805 | 0 | 4 | 1 | 0 |
| Onboard scale truck loaded weight | 32806 | g | 4 | 1000 | 0 |
| Onboard scale truck overweight | 32807 | g | 4 | 1000 | 0 |
| Onboard scale C+D: net weight | 32808 | g | 4 | 1000 | 0 |
| Onboard scale C+D: net overweight | 32809 | g | 4 | 1000 | 0 |
| Onboard scale C+D: gross weight | 32810 | g | 4 | 1000 | 0 |
| Onboard scale C+D: gross overweight | 32811 | g | 4 | 1000 | 0 |
| Onboard scale pup empty weight | 32812 | g | 4 | 1000 | 0 |
| Onboard scale C+D error | 32813 | 0 | 4 | 1 | 0 |
| Onboard scale pup loaded weight | 32814 | g | 4 | 1000 | 0 |
| Onboard scale pup overweight | 32815 | g | 4 | 1000 | 0 |
| Onboard scale A+B+C: net weight | 32816 | g | 4 | 1000 | 0 |
| Onboard scale A+B+C: net overweight | 32817 | g | 4 | 1000 | 0 |
| Onboard scale A+B+C: gross weight | 32818 | g | 4 | 1000 | 0 |
| Onboard scale A+B+C: gross overweight | 32819 | g | 4 | 1000 | 0 |
| Onboard scale total payload weight | 32820 | g | 4 | 1000 | 0 |
| Onboard scale A+B+C error | 32821 | 0 | 4 | 1 | 0 |
| Onboard scale total gross weight | 32822 | g | 4 | 1000 | 0 |
| Onboard scale total overweight | 32823 | g | 4 | 1000 | 0 |
| Onboard scale A+B+C+D: net weight | 32824 | g | 4 | 1000 | 0 |
| Onboard scale A+B+C+D: net overweight | 32825 | g | 4 | 1000 | 0 |
| Onboard scale A+B+C+D: gross weight | 32826 | g | 4 | 1000 | 0 |
| Onboard scale A+B+C+D: gross overweight | 32827 | g | 4 | 1000 | 0 |
| Onboard scale A+B+C+D error | 32829 | 0 | 4 | 1 | 0 |
| Onboard scale total gross weight | 32830 | g | 4 | 1000 | 0 |
| Onboard scale total overweight | 32831 | g | 4 | 1000 | 0 |
| Onboard scale channel A: net weight | 32896 | g | 4 | 453.592 | 0 |
| Onboard scale channel A: net overweight | 32897 | g | 4 | 453.592 | 0 |
| Onboard scale channel A: gross weight | 32898 | g | 4 | 453.592 | 0 |
| Onboard scale channel A: gross overweight | 32899 | g | 4 | 453.592 | 0 |
| Onboard scale front axle empty weight | 32900 | g | 4 | 453.592 | 0 |
| Onboard scale channel A: error on channel | 32901 | 0 | 4 | 1 | 0 |
| Onboard scale front axle loaded weight | 32902 | g | 4 | 453.592 | 0 |
| Onboard scale front axle overweight | 32903 | g | 4 | 453.592 | 0 |
| Onboard scale channel B: net weight | 32904 | g | 4 | 453.592 | 0 |
| Onboard scale channel B: net overweight | 32905 | g | 4 | 453.592 | 0 |
| Onboard scale channel B: gross weight | 32906 | g | 4 | 453.592 | 0 |
| Onboard scale channel B: gross overweight | 32907 | g | 4 | 453.592 | 0 |
| Onboard scale rear axle empty weight | 32908 | g | 4 | 453.592 | 0 |
| Onboard scale channel B: error on channel | 32909 | 0 | 4 | 1 | 0 |
| Onboard scale rear axle loaded weight | 32910 | g | 4 | 453.592 | 0 |
| Onboard scale rear axle overweight | 32911 | g | 4 | 453.592 | 0 |
| Onboard scale channel C: net weight | 32912 | g | 4 | 453.592 | 0 |
| Onboard scale channel C: net overweight | 32913 | g | 4 | 453.592 | 0 |
| Onboard scale channel C: gross weight | 32914 | g | 4 | 453.592 | 0 |
| Onboard scale channel C: gross overweight | 32915 | g | 4 | 453.592 | 0 |
| Onboard scale pup empty weight | 32916 | g | 4 | 453.592 | 0 |
| Onboard scale channel C: error on channel | 32917 | 0 | 4 | 1 | 0 |
| Onboard scale pup loaded weight | 32918 | g | 4 | 453.592 | 0 |
| Onboard scale pup overweight | 32919 | g | 4 | 453.592 | 0 |
| Onboard scale channel D: net weight | 32920 | g | 4 | 453.592 | 0 |
| Onboard scale channel D: net overweight | 32921 | g | 4 | 453.592 | 0 |
| Onboard scale channel D: gross weight | 32922 | g | 4 | 453.592 | 0 |
| Onboard scale channel D: gross overweight | 32923 | g | 4 | 453.592 | 0 |
| Onboard scale channel D: error on channel | 32925 | 0 | 4 | 1 | 0 |
| Onboard scale A+B: net weight | 32928 | g | 4 | 453.592 | 0 |
| Onboard scale A+B: net overweight | 32929 | g | 4 | 453.592 | 0 |
| Onboard scale A+B: gross weight | 32930 | g | 4 | 453.592 | 0 |
| Onboard scale A+B: gross overweight | 32931 | g | 4 | 453.592 | 0 |
| Onboard scale truck empty weight | 32932 | g | 4 | 453.592 | 0 |
| Onboard scale A+B error | 32933 | 0 | 4 | 1 | 0 |
| Onboard scale truck loaded weight | 32934 | g | 4 | 453.592 | 0 |
| Onboard scale truck overweight | 32935 | g | 4 | 453.592 | 0 |
| Onboard scale C+D: net weight | 32936 | g | 4 | 453.592 | 0 |
| Onboard scale C+D: net overweight | 32937 | g | 4 | 453.592 | 0 |
| Onboard scale C+D: gross weight | 32938 | g | 4 | 453.592 | 0 |
| Onboard scale C+D: gross overweight | 32939 | g | 4 | 453.592 | 0 |
| Onboard scale pup empty weight | 32940 | g | 4 | 453.592 | 0 |
| Onboard scale C+D error | 32941 | 0 | 4 | 1 | 0 |
| Onboard scale pup loaded weight | 32942 | g | 4 | 453.592 | 0 |
| Onboard scale pup overweight | 32943 | g | 4 | 453.592 | 0 |
| Onboard scale A+B+C: net weight | 32944 | g | 4 | 453.592 | 0 |
| Onboard scale A+B+C: net overweight | 32945 | g | 4 | 453.592 | 0 |
| Onboard scale A+B+C: gross weight | 32946 | g | 4 | 453.592 | 0 |
| Onboard scale A+B+C: gross overweight | 32947 | g | 4 | 453.592 | 0 |
| Onboard scale total payload weight | 32948 | g | 4 | 453.592 | 0 |
| Onboard scale A+B+C error | 32949 | 0 | 4 | 1 | 0 |
| Onboard scale total gross weight | 32950 | g | 4 | 453.592 | 0 |
| Onboard scale total overweight | 32951 | g | 4 | 453.592 | 0 |
| Onboard scale A+B+C+D: net weight | 32952 | g | 4 | 453.592 | 0 |
| Onboard scale A+B+C+D: net overweight | 32953 | g | 4 | 453.592 | 0 |
| Onboard scale A+B+C+D: gross weight | 32954 | g | 4 | 453.592 | 0 |
| Onboard scale A+B+C+D: gross overweight | 32955 | g | 4 | 453.592 | 0 |
| Onboard scale A+B+C+D error | 32957 | 0 | 4 | 1 | 0 |
| Onboard scale total gross weight | 32958 | g | 4 | 453.592 | 0 |
| Onboard scale total overweight | 32959 | g | 4 | 453.592 | 0 |
| Onboard scale steer channel: net weight | 32960 | g | 4 | 1000 | 0 |
| Onboard scale steer channel: gross weight | 32961 | g | 4 | 1000 | 0 |
| Onboard scale steer channel: empty weight | 32962 | g | 4 | 1000 | 0 |
| Onboard scale steer channel: error on channel | 32963 | 0 | 4 | 1 | 0 |
| Compartment 1 | 33000 | L | 4 | 1 | 0 |
| Compartment 2 | 33001 | L | 4 | 1 | 0 |
| Compartment 3 | 33002 | L | 4 | 1 | 0 |
| Compartment 4 | 33003 | L | 4 | 1 | 0 |
| Compartment 5 | 33004 | L | 4 | 1 | 0 |
| Compartment 6 | 33005 | L | 4 | 1 | 0 |
| Compartment 7 | 33006 | L | 4 | 1 | 0 |
| Compartment 8 | 33007 | L | 4 | 1 | 0 |
| Compartment 1 status (0 = good/1 = bad) | 33008 | 0 | 4 | 1 | 0 |
| Compartment 2 status (0 = good/1 = bad) | 33009 | 0 | 4 | 1 | 0 |
| Compartment 3 status (0 = good/1 = bad) | 33010 | 0 | 4 | 1 | 0 |
| Compartment 4 status (0 = good/1 = bad) | 33011 | 0 | 4 | 1 | 0 |
| Compartment 5 status (0 = good/1 = bad) | 33012 | 0 | 4 | 1 | 0 |
| Compartment 6 status (0 = good/1 = bad) | 33013 | 0 | 4 | 1 | 0 |
| Compartment 7 status (0 = good/1 = bad) | 33014 | 0 | 4 | 1 | 0 |
| Compartment 8 status (0 = good/1 = bad) | 33015 | 0 | 4 | 1 | 0 |
| Compressed natural gas tank pressure | 33100 | Pa | 4 | 689475.729 | 0 |
| Compressed natural gas fuel level | 33101 | % | 4 | 1 | 0 |
| Compressed natural gas temperature | 33102 | C | 4 | 1 | -40 |
| Compressed natural gas fuel consumption rate | 33103 | m^3/s | 4 | 0.000000546 | 0 |
| Compressed natural gas refuel pressure | 33104 | Pa | 4 | 689475.729 | 0 |
| Compressed natural gas lock-off (1 = active) | 33105 | 0 | 4 | 1 | 0 |
| Compressed natural gas fault 1 (1 = set) | 33106 | 0 | 4 | 1 | 0 |
| Compressed natural gas fault 2 (1 = set) | 33107 | 0 | 4 | 1 | 0 |
| Compressed natural gas fault 3 (1 = set) | 33108 | 0 | 4 | 1 | 0 |
| Compressed natural gas fault 4 (1 = set) | 33109 | 0 | 4 | 1 | 0 |
| Compressed natural gas fault 5 (1 = set) | 33110 | 0 | 4 | 1 | 0 |
| MAC automatic distance substance 1 (solid) | 34000 | m | 4 | 1 | 0 |
| MAC automatic weight substance 1 (solid) | 34001 | g | 4 | 1000 | 0 |
| MAC automatic duration substance 1 (solid) | 34002 | s | 4 | 3.6 | 0 |
| MAC blast distance substance 1 (solid) | 34003 | m | 4 | 1 | 0 |
| MAC blast weight substance 1 (solid) | 34004 | g | 4 | 1000 | 0 |
| MAC blast duration substance 1 (solid) | 34005 | s | 4 | 3.6 | 0 |
| MAC automatic distance substance 2 (solid) | 34010 | m | 4 | 1 | 0 |
| MAC automatic weight substance 2 (solid) | 34011 | g | 4 | 1000 | 0 |
| MAC automatic duration substance 2 (solid) | 34012 | s | 4 | 3.6 | 0 |
| MAC blast distance substance 2 (solid) | 34013 | m | 4 | 1 | 0 |
| MAC blast weight substance 2 (solid) | 34014 | g | 4 | 1000 | 0 |
| MAC blast duration substance 2 (solid) | 34015 | s | 4 | 3.6 | 0 |
| MAC automatic distance substance 3 (solid) | 34020 | m | 4 | 1 | 0 |
| MAC automatic weight substance 3 (solid) | 34021 | g | 4 | 1000 | 0 |
| MAC automatic duration substance 3 (solid) | 34022 | s | 4 | 3.6 | 0 |
| MAC blast distance substance 3 (solid) | 34023 | m | 4 | 1 | 0 |
| MAC blast weight substance 3 (solid) | 34024 | g | 4 | 1000 | 0 |
| MAC blast duration substance 3 (solid) | 34025 | s | 4 | 3.6 | 0 |
| MAC automatic distance substance 4 (solid) | 34030 | m | 4 | 1 | 0 |
| MAC automatic weight substance 4 (solid) | 34031 | g | 4 | 1000 | 0 |
| MAC automatic duration substance 4 (solid) | 34032 | s | 4 | 3.6 | 0 |
| MAC blast distance substance 4 (solid) | 34033 | m | 4 | 1 | 0 |
| MAC blast weight substance 4 (solid) | 34034 | g | 4 | 1000 | 0 |
| MAC blast duration substance 4 (solid) | 34035 | s | 4 | 3.6 | 0 |
| MAC automatic distance substance 1 (liquid) | 34040 | m | 4 | 1 | 0 |
| MAC automatic volume substance 1 (liquid) | 34041 | L | 4 | 0.001 | 0 |
| MAC automatic duration substance 1 (liquid) | 34042 | s | 4 | 3.6 | 0 |
| MAC blast distance substance 1 (liquid) | 34043 | m | 4 | 1 | 0 |
| MAC blast volume substance 1 (liquid) | 34044 | L | 4 | 0.001 | 0 |
| MAC blast duration substance 1 (liquid) | 34045 | s | 4 | 3.6 | 0 |
| MAC automatic distance substance 2 (liquid) | 34050 | m | 4 | 1 | 0 |
| MAC automatic volume substance 2 (liquid) | 34051 | L | 4 | 0.001 | 0 |
| MAC automatic duration substance 2 (liquid) | 34052 | s | 4 | 3.6 | 0 |
| MAC blast distance substance 2 (liquid) | 34053 | m | 4 | 1 | 0 |
| MAC blast volume substance 2 (liquid) | 34054 | L | 4 | 0.001 | 0 |
| MAC blast duration substance 2 (liquid) | 34055 | s | 4 | 3.6 | 0 |
| MAC automatic distance substance 3 (liquid) | 34060 | m | 4 | 1 | 0 |
| MAC automatic volume substance 3 (liquid) | 34061 | L | 4 | 0.001 | 0 |
| MAC automatic duration substance 3 (liquid) | 34062 | s | 4 | 3.6 | 0 |
| MAC blast distance substance 3 (liquid) | 34063 | m | 4 | 1 | 0 |
| MAC blast volume substance 3 (liquid) | 34064 | L | 4 | 0.001 | 0 |
| MAC blast duration substance 3 (liquid) | 34065 | s | 4 | 3.6 | 0 |
| MAC automatic distance substance 4 (liquid) | 34070 | m | 4 | 1 | 0 |
| MAC automatic volume substance 4 (liquid) | 34071 | L | 4 | 0.001 | 0 |
| MAC automatic duration substance 4 (liquid) | 34072 | s | 4 | 3.6 | 0 |
| MAC blast distance substance 4 (liquid) | 34073 | m | 4 | 1 | 0 |
| MAC blast volume substance 4 (liquid) | 34074 | L | 4 | 0.001 | 0 |
| MAC blast duration substance 4 (liquid) | 34075 | s | 4 | 3.6 | 0 |
| MAC vehicle distance | 34080 | m | 4 | 1 | 0 |
| MAC select substance 1 - blast | 34081 | 0 | 1 | 1 | 0 |
| MAC select substance 2 - blast | 34082 | 0 | 1 | 1 | 0 |
| MAC select substance 3 - blast | 34083 | 0 | 1 | 1 | 0 |
| MAC select substance 4 - blast | 34084 | 0 | 1 | 1 | 0 |
| MAC select substance 5 - blast | 34085 | 0 | 1 | 1 | 0 |
| MAC select substance 6 - blast | 34086 | 0 | 1 | 1 | 0 |
| MAC select substance 7 - blast | 34087 | 0 | 1 | 1 | 0 |
| MAC select substance 8 - blast | 34088 | 0 | 1 | 1 | 0 |
| MAC master switch status (0 = off/1 = auto/2 = unload) | 34089 | 0 | 1 | 1 | 0 |
| MAC select substance 1 - auto | 34090 | 0 | 1 | 1 | 0 |
| MAC select substance 2 - auto | 34091 | 0 | 1 | 1 | 0 |
| MAC select substance 3 - auto | 34092 | 0 | 1 | 1 | 0 |
| MAC select substance 4 - auto | 34093 | 0 | 1 | 1 | 0 |
| MAC select substance 5 - auto | 34094 | 0 | 1 | 1 | 0 |
| MAC select substance 6 - auto | 34095 | 0 | 1 | 1 | 0 |
| MAC select substance 7 - auto | 34096 | 0 | 1 | 1 | 0 |
| MAC select substance 8 - auto | 34097 | 0 | 1 | 1 | 0 |
| MAC reserved 1 | 34098 | 0 | 1 | 1 | 0 |
| MAC reserved 2 | 34099 | 0 | 1 | 1 | 0 |
| MAC automatic distance substance 1 (prewet) | 34100 | m | 4 | 1 | 0 |
| MAC automatic volume substance 1 (prewet) | 34101 | L | 4 | 0.001 | 0 |
| MAC automatic duration substance 1 (prewet) | 34102 | s | 4 | 3.6 | 0 |
| MAC blast distance substance 1 (prewet) | 34103 | m | 4 | 1 | 0 |
| MAC blast volume substance 1 (prewet) | 34104 | L | 4 | 0.001 | 0 |
| MAC blast duration substance 1 (prewet) | 34105 | s | 4 | 3.6 | 0 |
| MAC automatic distance substance 2 (prewet) | 34106 | m | 4 | 1 | 0 |
| MAC automatic volume substance 2 (prewet) | 34107 | L | 4 | 0.001 | 0 |
| MAC automatic duration substance 2 (prewet) | 34108 | s | 4 | 3.6 | 0 |
| MAC blast distance substance 2 (prewet) | 34109 | m | 4 | 1 | 0 |
| MAC blast volume substance 2 (prewet) | 34110 | L | 4 | 0.001 | 0 |
| MAC blast duration substance 2 (prewet) | 34111 | s | 4 | 3.6 | 0 |
| MAC automatic distance substance 3 (prewet) | 34112 | m | 4 | 1 | 0 |
| MAC automatic volume substance 3 (prewet) | 34113 | L | 4 | 0.001 | 0 |
| MAC automatic duration substance 3 (prewet) | 34114 | s | 4 | 3.6 | 0 |
| MAC blast distance substance 3 (prewet) | 34115 | m | 4 | 1 | 0 |
| MAC blast volume substance 3 (prewet) | 34116 | L | 4 | 0.001 | 0 |
| MAC blast duration substance 3 (prewet) | 34117 | s | 4 | 3.6 | 0 |
| MAC automatic distance substance 4 (prewet) | 34118 | m | 4 | 1 | 0 |
| MAC automatic volume substance 4 (prewet) | 34119 | L | 4 | 0.001 | 0 |
| MAC automatic duration substance 4 (prewet) | 34120 | s | 4 | 3.6 | 0 |
| MAC blast distance substance 4 (prewet) | 34121 | m | 4 | 1 | 0 |
| MAC blast volume substance 4 (prewet) | 34122 | L | 4 | 0.001 | 0 |
| MAC blast duration substance 4 (prewet) | 34123 | s | 4 | 3.6 | 0 |
| MAC select substance 9 - blast | 34124 | 0 | 1 | 1 | 0 |
| MAC select substance 10 - blast | 34125 | 0 | 1 | 1 | 0 |
| MAC select substance 11 - blast | 34126 | 0 | 1 | 1 | 0 |
| MAC select substance 12 - blast | 34127 | 0 | 1 | 1 | 0 |
| MAC select substance 9 - auto | 34128 | 0 | 1 | 1 | 0 |
| MAC select substance 10 - auto | 34129 | 0 | 1 | 1 | 0 |
| MAC select substance 11 - auto | 34130 | 0 | 1 | 1 | 0 |
| MAC select substance 12 - auto | 34131 | 0 | 1 | 1 | 0 |
| MAC air temperature | 34132 | C | 1 | 1 | -40 |
| MAC road temperature | 34133 | C | 1 | 1 | -40 |
| MAC main plow (0 = plow up 1 = plow down) | 34134 | 0 | 1 | 1 | 0 |
| MAC wing plow (0 = plow up 1 = plow down) | 34135 | 0 | 1 | 1 | 0 |
| MAC tow plow (0 = plow up 1 = plow down) | 34136 | 0 | 1 | 1 | 0 |
| MAC spreader 1 master status (off=0 auto=1 pause=2 blast=3 unload=4<br> reverse=5 manual=6 unknown=7 open=8 power up=9 stand by=10<br> spreading=11 clear jam/aux power=12 route start=13 route end=14 route abort=15) | 34137 | 0 | 1 | 1 | 0 |
| MAC spreader 1 material set rate 1 | 34138 | kg/km | 4 | 0.01 | 0 |
| MAC spreader 1 material actual rate 1 | 34139 | kg/km | 4 | 0.01 | 0 |
| MAC spreader 1 material set rate 2 | 34140 | kg/km | 4 | 0.01 | 0 |
| MAC spreader 1 material actual rate 2 | 34141 | kg/km | 4 | 0.01 | 0 |
| MAC spreader 2 master status (off=0 auto=1 pause=2 blast=3 unload=4 <br>reverse=5 manual=6 unknown=7 open=8 power up=9 stand by=10 <br>spreading=11 clear jam/aux power=12 route start=13 route end=14 route abort=15) | 34142 | 0 | 1 | 1 | 0 |
| MAC spreader 2 material set rate 1 | 34143 | kg/km | 4 | 0.01 | 0 |
| MAC spreader 2 material actual rate 1 | 34144 | kg/km | 4 | 0.01 | 0 |
| MAC spreader 2 material set rate 2 | 34145 | kg/km | 4 | 0.01 | 0 |
| MAC spreader 2 material actual rate 2 | 34146 | kg/km | 4 | 0.01 | 0 |
| MAC spread rate - actual (solid) | 34147 | kg/km | 2 | 1 | 0 |
| MAC spread rate - set point (solid) | 34148 | kg/km | 2 | 1 | 0 |
| MAC spread rate - actual (liquid) | 34149 | L/lane km | 2 | 1 | 0 |
| MAC spread rate - set point (liquid) | 34150 | L/lane km | 2 | 1 | 0 |
| MAC spread rate - actual (prewet) | 34151 | L/tonne | 2 | 1 | 0 |
| MAC spread rate - set point (prewet) | 34152 | L/tonne | 2 | 1 | 0 |
| MAC substance 1 (solid) trip duration automatic | 34153 | s | 4 | 3.6 | 0 |
| MAC vehicle trip distance | 34154 | m | 4 | 1 | 0 |
| MAC substance 1 (solid) trip distance automatic | 34155 | m | 4 | 1 | 0 |
| MAC substance 1 (solid) trip weight automatic | 34156 | g | 4 | 1000 | 0 |
| MAC substance 2 (solid) trip weight automatic | 34157 | g | 4 | 1000 | 0 |
| MAC substance 1 (liquid) trip weight automatic | 34158 | g | 4 | 1000 | 0 |
| MAC dosage setting (solid 1) | 34159 | g/m^2 | 4 | 0.03125 | 0 |
| MAC dosage setting (solid 2) | 34160 | g/m^2 | 4 | 0.03125 | 0 |
| MAC dosage setting (liquid 1) | 34161 | g/m^2 | 4 | 0.03125 | 0 |
| MAC spreading or spraying width | 34162 | m | 4 | 0.125 | 0 |
| MAC spreading percentage humidifier | 34163 | 0 | 4 | 1 | 0 |
| MAC asymmetry (1 = right/2 = centerright/3 = center/4 = centerleft/5 = left) | 34164 | 0 | 4 | 1 | 0 |
| MAC spreading status (1 = on/0 = off) | 34165 | 0 | 4 | 1 | 0 |
| MAC spraying status (1 = on/0 = off) | 34166 | 0 | 4 | 1 | 0 |
| MAC substance 3 (solid) trip weight automatic | 34167 | g | 4 | 1000 | 0 |
| MAC substance 4 (solid) trip weight automatic | 34168 | g | 4 | 1000 | 0 |
| MAC substance 5 (solid) trip weight automatic | 34169 | g | 4 | 1000 | 0 |
| MAC substance 6 (solid) trip weight automatic | 34170 | g | 4 | 1000 | 0 |
| MAC automatic weight substance 9 (solid) | 34171 | g | 4 | 1000 | 0 |
| MAC automatic weight substance 10 (solid) | 34172 | g | 4 | 1000 | 0 |
| MAC automatic volume substance 5 (liquid) | 34173 | L | 4 | 0.001 | 0 |
| MAC automatic volume substance 6 (liquid) | 34174 | L | 4 | 0.001 | 0 |
| MAC automatic volume substance 7 (liquid) | 34175 | L | 4 | 0.001 | 0 |
| MAC automatic volume substance 8 (liquid) | 34176 | L | 4 | 0.001 | 0 |
| MAC automatic volume substance 9 (liquid) | 34177 | L | 4 | 0.001 | 0 |
| MAC automatic volume substance 10 (liquid) | 34178 | L | 4 | 0.001 | 0 |
| MAC automatic volume substance 5 (prewet) | 34179 | L | 4 | 0.001 | 0 |
| MAC automatic volume substance 6 (prewet) | 34180 | L | 4 | 0.001 | 0 |
| MAC automatic volume substance 7 (prewet) | 34181 | L | 4 | 0.001 | 0 |
| MAC automatic volume substance 8 (prewet) | 34182 | L | 4 | 0.001 | 0 |
| MAC automatic volume substance 9 (prewet | 34183 | L | 4 | 0.001 | 0 |
| MAC automatic volume substance 10 (prewet) | 34184 | L | 4 | 0.001 | 0 |
| MAC automatic weight substance 5 (solid) | 34185 | g | 4 | 1000 | 0 |
| MAC automatic weight substance 6 (solid) | 34186 | g | 4 | 1000 | 0 |
| MAC automatic weight substance 7 (solid) | 34187 | g | 4 | 1000 | 0 |
| MAC automatic weight substance 8 (solid) | 34188 | g | 4 | 1000 | 0 |
| MAC dosage setting (solid 3) | 34189 | g/m^2 | 4 | 0.03125 | 0 |
| MAC dosage setting (solid 4) | 34190 | g/m^2 | 4 | 0.03125 | 0 |
| MAC dosage setting (solid 5) | 34191 | g/m^2 | 4 | 0.03125 | 0 |
| MAC dosage setting (solid 6) | 34192 | g/m^2 | 4 | 0.03125 | 0 |
| Substance spreader - spinner speed | 34193 | % | 4 | 1 | 0 |
| MAC unknown substance (solid) total distance dispensed | 34194 | m | 4 | 1 | 0 |
| MAC unknown substance (liquid) total distance dispensed | 34195 | m | 4 | 1 | 0 |
| MAC unknown substance (prewet) total distance dispensed | 34196 | m | 4 | 1 | 0 |
| RFID reader maximum messages reached (1 = paused) | 34560 | 0 | 1 | 1 | 0 |
| RFID reader IO input 1 change (0 = closed) | 34561 | 0 | 1 | 1 | 0 |
| RFID reader IO input 2 change (0 = closed) | 34562 | 0 | 1 | 1 | 0 |
| RFID reader IO input 3 change (0 = closed) | 34563 | 0 | 1 | 1 | 0 |
| RFID reader IO input 4 change (0 = closed) | 34564 | 0 | 1 | 1 | 0 |
| RFID reader antenna 0 tag added | 34565 | 0 | 1 | 1 | 0 |
| RFID reader antenna 0 tag removed | 34566 | 0 | 1 | 1 | 0 |
| RFID reader antenna 1 tag added | 34567 | 0 | 1 | 1 | 0 |
| RFID reader antenna 1 tag removed | 34568 | 0 | 1 | 1 | 0 |
| RFID reader antenna 2 tag added | 34569 | 0 | 1 | 1 | 0 |
| RFID reader antenna 2 tag removed | 34570 | 0 | 1 | 1 | 0 |
| RFID reader antenna 3 tag added | 34571 | 0 | 1 | 1 | 0 |
| RFID reader antenna 3 tag removed | 34572 | 0 | 1 | 1 | 0 |
| MAC select substance 13 - blast | 34580 | 0 | 1 | 1 | 0 |
| MAC select substance 14 - blast | 34581 | 0 | 1 | 1 | 0 |
| MAC select substance 15 - blast | 34582 | 0 | 1 | 1 | 0 |
| MAC select substance 16 - blast | 34583 | 0 | 1 | 1 | 0 |
| MAC select substance 17 - blast | 34584 | 0 | 1 | 1 | 0 |
| MAC select substance 18 - blast | 34585 | 0 | 1 | 1 | 0 |
| MAC select substance 19 - blast | 34586 | 0 | 1 | 1 | 0 |
| MAC select substance 20 - blast | 34587 | 0 | 1 | 1 | 0 |
| MAC select substance 21 - blast | 34588 | 0 | 1 | 1 | 0 |
| MAC select substance 22 - blast | 34589 | 0 | 1 | 1 | 0 |
| MAC select substance 23 - blast | 34590 | 0 | 1 | 1 | 0 |
| MAC select substance 24 - blast | 34591 | 0 | 1 | 1 | 0 |
| MAC select substance 25 - blast | 34592 | 0 | 1 | 1 | 0 |
| MAC select substance 26 - blast | 34593 | 0 | 1 | 1 | 0 |
| MAC select substance 27 - blast | 34594 | 0 | 1 | 1 | 0 |
| MAC select substance 28 - blast | 34595 | 0 | 1 | 1 | 0 |
| MAC select substance 29 - blast | 34596 | 0 | 1 | 1 | 0 |
| MAC select substance 30 - blast | 34597 | 0 | 1 | 1 | 0 |
| MAC select substance 13 - auto | 34598 | 0 | 1 | 1 | 0 |
| MAC select substance 14 - auto | 34599 | 0 | 1 | 1 | 0 |
| MAC select substance 15 - auto | 34600 | 0 | 1 | 1 | 0 |
| MAC select substance 16 - auto | 34601 | 0 | 1 | 1 | 0 |
| MAC select substance 17 - auto | 34602 | 0 | 1 | 1 | 0 |
| MAC select substance 18 - auto | 34603 | 0 | 1 | 1 | 0 |
| MAC select substance 19 - auto | 34604 | 0 | 1 | 1 | 0 |
| MAC select substance 20 - auto | 34605 | 0 | 1 | 1 | 0 |
| MAC select substance 21 - auto | 34606 | 0 | 1 | 1 | 0 |
| MAC select substance 22 - auto | 34607 | 0 | 1 | 1 | 0 |
| MAC select substance 23 - auto | 34608 | 0 | 1 | 1 | 0 |
| MAC select substance 24 - auto | 34609 | 0 | 1 | 1 | 0 |
| MAC select substance 25 - auto | 34610 | 0 | 1 | 1 | 0 |
| MAC select substance 26 - auto | 34611 | 0 | 1 | 1 | 0 |
| MAC select substance 27 - auto | 34612 | 0 | 1 | 1 | 0 |
| MAC select substance 28 - auto | 34613 | 0 | 1 | 1 | 0 |
| MAC select substance 29 - auto | 34614 | 0 | 1 | 1 | 0 |
| MAC select substance 30 - auto | 34615 | 0 | 1 | 1 | 0 |
| Substance spreader - joystick left | 34616 | 0 | 1 | 1 | 0 |
| Substance spreader - joystick right | 34617 | 0 | 1 | 1 | 0 |
| Substance spreader - joystick up | 34618 | 0 | 1 | 1 | 0 |
| Substance spreader - joystick down | 34619 | 0 | 1 | 1 | 0 |
| Substance spreader - joystick twist left | 34620 | 0 | 1 | 1 | 0 |
| Substance spreader - joystick twist right | 34621 | 0 | 1 | 1 | 0 |
| Substance spreader - joystick mode | 34622 | 0 | 1 | 1 | 0 |
| Substance spreader - joystick emergency button | 34623 | 0 | 1 | 1 | 0 |
| Substance spreader - joystick power float1 | 34624 | 0 | 1 | 1 | 0 |
| Substance spreader - joystick power float2 | 34625 | 0 | 1 | 1 | 0 |
| ADAS forward vehicle speed | 34700 | km/h | 1 | 1 | 0 |
| ADAS forward vehicle distance | 34701 | m | 1 | 1 | 0 |
| ADAS lane departure indication | 34702 | 0 | 1 | 1 | 0 |
| ADAS lane tracking left side | 34703 | 0 | 1 | 1 | 0 |
| ADAS lane tracking right side | 34704 | 0 | 1 | 1 | 0 |
| ADAS headway warning level | 34705 | 0 | 1 | 1 | 0 |
| ADAS error valid | 34706 | 0 | 1 | 1 | 0 |
| ADAS error code | 34707 | 0 | 1 | 1 | 0 |
| ADAS failsafe | 34708 | 0 | 1 | 1 | 0 |
| ADAS headway valid | 34709 | 0 | 1 | 1 | 0 |
| ADAS headway measurement | 34710 | s | 1 | 0.1 | 0 |
| ADAS night time indicator | 34711 | 0 | 1 | 1 | 0 |
| ADAS dusk time indicator | 34712 | 0 | 1 | 1 | 0 |
| ADAS left lane departure warning | 34713 | 0 | 1 | 1 | 0 |
| ADAS right lane departure warning | 34714 | 0 | 1 | 1 | 0 |
| ADAS forward collision warning | 34715 | 0 | 1 | 1 | 0 |
| ADAS headway monitor warning | 34716 | 0 | 1 | 1 | 0 |
| ADAS pedestrian collision warning | 34717 | 0 | 1 | 1 | 0 |
| ADAS pedestrian in danger zone | 34718 | 0 | 1 | 1 | 0 |
| ADAS stopped | 34719 | 0 | 1 | 1 | 0 |
| ADAS tamper alert | 34720 | 0 | 1 | 1 | 0 |
| ADAS urban forward collision warning (1=yes) | 34721 | 0 | 1 | 1 | 0 |
| Fatigue level status | 34789 | 0 | 1 | 1 | 0 |
| Hands on status (0=no hands on wheel / 1=left hand on wheel / <br>2=right hand on wheel / 3=both hands on wheel) | 34790 | 0 | 1 | 1 | 0 |
| Driver changed | 34791 | 0 | 1 | 1 | 0 |
| Flowmeter - high resolution total fuel consumption | 34792 | L | 4 | 0.001 | 0 |
| Flowmeter - fuel rate | 34793 | m^3/s | 4 | 2.78E-08 | 0 |
| Flowmeter - fuel temperature | 34794 | C | 4 | 1 | -40 |
| Skyjack controller status | 34795 | 0 | 4 | 1 | 0 |
| Snow plow: plow cylinder position | 34796 | % | 1 | 1 | 0 |
| Snow plow: wing toe cylinder position | 34797 | % | 1 | 1 | 0 |
| Snow plow: wing heel cylinder position | 34798 | % | 1 | 1 | 0 |
| Snow plow: oil pressure | 34799 | Pa | 2 | 6894.757 | 0 |
| Snow plow: oil temperature | 34800 | C | 1 | 1 | -40 |
| Air temperature | 34801 | C | 4 | 0.1 | 0 |
| Road temperature | 34802 | C | 4 | 0.1 | 0 |
| Prewet material rate | 34803 | L/tonne | 4 | 0.1 | 0 |
| Liquid material rate | 34804 | L/lane km | 4 | 0.1 | 0 |
| Solid material rate | 34805 | kg/km | 4 | 0.1 | 0 |
| Truck prewet material total | 34806 | L | 4 | 0.1 | 0 |
| Truck liquid material total | 34807 | L | 4 | 0.1 | 0 |
| Truck solid material total | 34808 | g | 4 | 100 | 0 |
| Tow prewet material total | 34809 | L | 4 | 1 | 0 |
| Tow liquid material total | 34810 | L | 4 | 1 | 0 |
| Tow solid material total | 34811 | g | 4 | 1000 | 0 |
| Truck prewet spread distance | 34812 | m | 4 | 10 | 0 |
| Truck liquid spread distance | 34813 | m | 4 | 10 | 0 |
| Truck solid spread distance | 34814 | m | 4 | 10 | 0 |
| Tow prewet spread distance | 34815 | m | 4 | 10 | 0 |
| Tow liquid spread distance | 34816 | m | 4 | 10 | 0 |
| Tow solid spread distance | 34817 | m | 4 | 10 | 0 |
| Controller mode | 34818 | 0 | 4 | 1 | 0 |
| Controller status | 34819 | 0 | 4 | 1 | 0 |
| Spinner state | 34820 | 0 | 4 | 1 | 0 |
| Spinner rate | 34821 | RPM | 4 | 0.01 | 0 |
| Precipitation type | 34822 | 0 | 4 | 1 | 0 |
| Road conditions | 34823 | 0 | 4 | 1 | 0 |
| Operating lane | 34824 | 0 | 4 | 1 | 0 |
| Sky condition | 34825 | 0 | 4 | 1 | 0 |
| Precipation freeze temperature | 34826 | C | 4 | 0.1 | 0 |
| Return amount | 34827 | g | 4 | 1000 | 0 |
| Load amount | 34828 | g | 4 | 1000 | 0 |
| Controller model | 34829 | 0 | 4 | 1 | 0 |
| Controller type | 34830 | 0 | 4 | 1 | 0 |
| Prewet material type | 34831 | 0 | 4 | 1 | 0 |
| Liquid material type | 34832 | 0 | 4 | 1 | 0 |
| Solid material type | 34833 | 0 | 4 | 1 | 0 |
| Third party aux 1 | 34834 | 0 | 4 | 1 | 0 |
| Third party aux 2 | 34835 | 0 | 4 | 1 | 0 |
| Third party aux 3 | 34836 | 0 | 4 | 1 | 0 |
| Third party aux 4 | 34837 | 0 | 4 | 1 | 0 |
| Third party aux 5 | 34838 | 0 | 4 | 1 | 0 |
| Third party aux 6 | 34839 | 0 | 4 | 1 | 0 |
| Third party aux 7 | 34840 | 0 | 4 | 1 | 0 |
| Third party aux 8 | 34841 | 0 | 4 | 1 | 0 |
| Barometric pressure | 34842 | Pa | 4 | 100 | 0 |
| Wind speed | 34843 | km/h | 4 | 0.1 | 0 |
| Relative humidity | 34844 | % | 4 | 1 | 0 |
| Spread width | 34845 | m | 4 | 0.1 | 0 |
| Prewet material active | 34846 | 0 | 4 | 1 | 0 |
| Solid material active | 34847 | 0 | 4 | 1 | 0 |
| Liquid material active | 34848 | 0 | 4 | 1 | 0 |
| Key life hours | 34849 | s | 4 | 360 | 0 |
| Idle mitigation hours | 34850 | s | 4 | 360 | 0 |
| All idle hours | 34851 | s | 4 | 360 | 0 |
| All run hours | 34852 | s | 4 | 360 | 0 |
| Park idle hours | 34853 | s | 4 | 360 | 0 |
| Park run hours | 34854 | s | 4 | 360 | 0 |
| In drive count | 34855 | 0 | 4 | 1 | 0 |
| Accelerator override count | 34856 | 0 | 4 | 1 | 0 |
| Power only hours | 34857 | s | 4 | 360 | 0 |
| Power only count | 34858 | 0 | 4 | 1 | 0 |
| IMS cooling hours | 34859 | s | 4 | 360 | 0 |
| IMS cooling count | 34860 | 0 | 4 | 1 | 0 |
| IMS heating hours | 34861 | s | 4 | 360 | 0 |
| IMS heating count | 34862 | 0 | 4 | 1 | 0 |
| Battery 1 charging hours | 34863 | s | 4 | 360 | 0 |
| Battery 1 charging count | 34864 | 0 | 4 | 1 | 0 |
| Battery 2 charging hours | 34865 | s | 4 | 360 | 0 |
| Battery 2 charging count | 34866 | 0 | 4 | 1 | 0 |
| Brake override hours | 34867 | s | 4 | 360 | 0 |
| Brake override count | 34868 | 0 | 4 | 1 | 0 |
| Idle cooling hours | 34869 | s | 4 | 360 | 0 |
| Idle cooling count | 34870 | 0 | 4 | 1 | 0 |
| Idle heating hours | 34871 | s | 4 | 360 | 0 |
| Idle heating count | 34872 | 0 | 4 | 1 | 0 |
| Input override hours | 34873 | s | 4 | 360 | 0 |
| Input override count | 34874 | 0 | 4 | 1 | 0 |
| Aux 1 hours | 34875 | s | 4 | 360 | 0 |
| Aux 1 count | 34876 | 0 | 4 | 1 | 0 |
| Aux 2 hours | 34877 | s | 4 | 360 | 0 |
| Aux 2 count | 34878 | 0 | 4 | 1 | 0 |
| ePTO active hours | 34879 | s | 4 | 360 | 0 |
| ePTO active count | 34880 | 0 | 4 | 1 | 0 |
| Battery 1 minimum voltage | 34881 | V | 4 | 0.1 | 0 |
| Battery 2 minimum voltage | 34882 | V | 4 | 0.1 | 0 |
| Shore power hours | 34883 | s | 4 | 360 | 0 |
| Shore power count | 34884 | 0 | 4 | 1 | 0 |
| A/C error code 1 | 34885 | 0 | 4 | 1 | 0 |
| A/C error code 2 | 34886 | 0 | 4 | 1 | 0 |
| A/C error code 3 | 34887 | 0 | 4 | 1 | 0 |
| Remote disconnect 1 | 34888 | 0 | 4 | 1 | 0 |
| Remote disconnect 2 | 34889 | 0 | 4 | 1 | 0 |
| Remote disconnect 3 | 34890 | 0 | 4 | 1 | 0 |
| Start error 1 | 34891 | 0 | 4 | 1 | 0 |
| Start error 2 | 34892 | 0 | 4 | 1 | 0 |
| Start error 3 | 34893 | 0 | 4 | 1 | 0 |
| Generic external device serial number | 34894 | 0 | 4 | 1 | 0 |
| Generic fuel added | 34895 | L | 2 | 0.01 | 0 |
| Generic fuel siphoned | 34896 | L | 2 | 0.01 | 0 |
| Generic external device hardware version | 34897 | 0 | 4 | 0.1 | 0 |
| Generic external device firmware version | 34898 | 0 | 4 | 0.01 | 0 |
| Generic external device temperature | 34899 | C | 4 | 0.1 | 0 |
| Generic external device fuel level | 34900 | % | 4 | 0.1 | 0 |
| Generic external device AC current 1 (RMS) | 34901 | A | 4 | 0.1 | 0 |
| Generic external device AC current 2 (RMS) | 34902 | A | 4 | 0.1 | 0 |
| Generic external device status | 34903 | 0 | 4 | 1 | 0 |
| Welder voltage | 34904 | V | 4 | 0.001 | 0 |
| Welder current | 34905 | A | 4 | 0.001 | 0 |
