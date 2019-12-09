---
layout: page
permalink: /hardware/addon-protocols/ble/
title: Add-On Protocol - BLE
--- 

## Advertising Packet

| Offset | Value | Description |
| --- | --- | --- |
| 1 | 0x02 | AD length |
| 2 | 0x01 | Flags |
| 3 | 0x06 | -LE General Discoverable Mode-BR/EDR Not Supported |
| 4 | 0x06 +Optional Length | AD length |
| 5 | 0xFF | Manufacturer Specific Data |
| 6 | 0x0275 | Geotab's Company ID |
| 8 | 0x00 | Advertising packet version number |
| 9 | 0xXX | Tx Power Level |
| 10 | 0xXX | Battery Level |
| Optional Length(11 to 31) | 0xXX | Optional Information identifier |
| 3 bytes | Optional Information data |
| ... | ... |
| 0xXX | Optional Information identifier |
| X bytes | Optional Information data |

### Required Data Types

| Description | Unit type | Range |
| --- | --- | --- |
| Tx Power Level | Sint 8 | Resolution: 1 dBmMin: −100 dBmMax: 20 dBm |
| Battery Level | Uint 8 | Resolution: 1 %Min: 0%Max: 100% |

### Optional Information Types

These information types are optional and are not part of the required packet structure. Each entry must be preceded by the corresponding information identifier byte. If multiple information entries are used in the same advertisement packet, they should be arranged in an incrementing order based on their information identifier. The identifiers in the table below are those that are currently defined. Geotab will define new identifiers for any new sensors as required. You must use the IDs as defined by Geotab. If there is undefined data, contact us via the Help Desk and we will define the data and send you the required ID.

| Information identifier | Description | Unit type | Length (bytes) | Units |
| --- | --- | --- | --- | --- |
| 0 to 4 | Reserved |   |   |   |
| 5 | Firmware Version | FP24 | 3 | None |
| 6 | Accelerometer Event Counter | FP24 | 3 | None |
| 7 | Temperature | FP24 | 3 | Degrees Celsius (°C) |
| 8 | Illuminance | FP24 | 3 | Lux (lx) |
| 9 | Relative Humidity | FP24 | 3 | Percent (%) |
| 10 | Barometric Pressure | FP24 | 3 | Pascals (Pa) |
| 11 | Altitude | FP24 | 3 | Meters (m) |
| 12 | Particulate Matter (less than 1 µm) | FP24 | 3 | Micrograms per cubic meter (µg/m3) |
| 13 | Particulate Matter (less than 2.5 µm) | FP24 | 3 | Micrograms per cubic meter (µg/m3) |
| 14 | Particulate Matter (less than 10 µm) | FP24 | 3 | Micrograms per cubic meter (µg/m3) |
| 15 | Nitric Oxide | FP24 | 3 | Parts per million (ppm) |
| 16 | Nitrogen Dioxide | FP24 | 3 | Parts per million (ppm) |
| 17 | Carbon Monoxide | FP24 | 3 | Parts per million (ppm) |
| 18 | Ammonia | FP24 | 3 | Parts per million (ppm) |
| 19 | Methane | FP24 | 3 | Parts per million (ppm) |
| 20 | Ethanol | FP24 | 3 | Parts per million (ppm) |
| 21 | Hydrogen | FP24 | 3 | Parts per million (ppm) |
| 22 | Carbon Dioxide | FP24 | 3 | Parts per million (ppm) |
| 23 | Fuel Level | FP24 | 3 | Percent (%) |
| 24 to 199 | Reserved(for future data types) | FP24 | 3 |   |
| 200 to 229 | Reserved |   |   |   |
| 230 to 239 | Generic Byte (1 to 10) | UINT8 | 1 | None |
| 240 to 249 | Generic Timer (1 to 10) | UINT8UINT16 | 12 | Event CounterUnits Of Time |
| 250 to 253 | Reserved |   |   |   |
| 254 | Wakeup Event | UINT8 | 1 | None |
| 255 | Custom Data | UINT8 | X | None |

### FP24 (Floating Point 24 bit)

Same as FP32 but the 8 least-significant bits dropped.

| S | E | E | E | E | E | E | E | E | F | F | F | F | F | F | F | F | F | F | F | F | F | F | F |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 23 | 22 | 21 | 20 | 19 | 18 | 17 | 16 | 15 | 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |

[ -2^16, 2^16 ] can be exactly represented

[ -2^17, -2^16 -1 ] or [ 2^16 +1, 2^17 ] rounded to a multiple of 2

[ -2^18, -2^17 -1 ] or [ 2^17 +1 2^18 ] rounded to a multiple of 4

…

Infinity at: 2^128

### FP24 Conversions:

| Action |   |
| --- | --- |
| Store | Convert to FP32FP24 = FP32 >> 8 |
| Read | FP32 = FP24 << 8Read as FP32 |

Note:

For all information types that use the FP24 format, a new log will be generated for any change in the data. For example, a change in temperature from 2°C to 2.000061°C would trigger a new log. Some implementations may only require a reporting resolution of 1°C. If an excessive number of logs are generated, we will disable reporting on BLE data. The onus is on the implementer to choose an appropriate reporting resolution for their data.

### Generic Byte

The Generic Byte type can store one byte of data (0 to 255). It could be used to count the number of times a button is pressed. Or simply store the state of a toggle (0 or 1) switch. A new log will be generated on any change of data.

### Generic Timer

The Generic Timer allows keeping track of an elapsed time. The Units Of Time are not specifically defined and can be chosen by the implementor. If may make sense to measure some durations in hours, while others may warrant seconds. The Units Of Time may continuously increment. A new log will not be saved until a new event counter value is reported. The Generic Timer can be associated with other data types. For example, you could associate Generic Timer 1 with temperature to indicating the time when a chosen temperature threshold was exceeded.

### Wakeup Event

A custom parameter is used to configure the IOX-BT to wakeup periodically to check for any wakeup events from beacons within range. The wakeup duration is 1s every 30s while sleeping. This periodic wakeup can be enabled using the following custom parameter:

<Parameter Description='Enable Periodic Bluetooth Wakeup' Offset='167' Bytes='80' IsEnabled='true'/>

The implementor of this protocol should increase the frequency of advertisements sent during an attempted wakeup event. A 100ms advertisement interval that persists for a minimum of 1 minute is recommended.

When sending the wakeup event as part of the advertisement data a value of 0x00 means "no event". Anything greater than 0 that has not already been reported on will cause the GO to wakeup and report on the beacon advertisements. The event is only used as an indication for reporting the changes in the rest of the advertisement data. The actual contents of the alert event byte will not be sent/reported.

### Custom Data

Arbitrary data can be placed in the custom data segment. The data will not be interpreted by MyGeotab, but will be accessible through the API. The onus is on the implementor to extract and interpret the data. The data must be preceded by the length. The length is limited by the amount of data that can fit in the optional information section. The maximum custom data length is 18 bytes. A new log will be generated on any change in the data.

| Offset | Description |
| --- | --- |
| 1 | Length |
| 2 to Length | Custom Data |

Example:

| Type | Length | Data |
| --- | --- | --- |
| 255 | 8 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |

### Message Interleaving

Message interleaving is not supported. The data types in the packet must remain consistent between advertisements.

### Example Packets

Reporting temperature

| Offset | Value | Description |
| --- | --- | --- |
| 1 | 0x02 | AD length |
| 2 | 0x01 | Flags |
| 3 | 0x06 | -LE General Discoverable Mode-BR/EDR Not Supported |
| 4 | 0x0A | AD length |
| 5 | 0xFF | Manufacturer Specific Data |
| 6 | 0x0275 | Geotab's Company ID |
| 8 | 0x00 | Advertising packet version number |
| 9 | 0xC6 | Tx Power Level (-58dBm) |
| 10 | 0x64 | Battery Level (100%) |
| 11 | 0x07 | Temperature |
| 12 | 0x00 | 0x412000 FP24 = 10°C |
| 13 | 0x20 |
| 14 | 0x41 |

Reporting a timer

| Offset | Value | Description |
| --- | --- | --- |
| 1 | 0x02 | AD length |
| 2 | 0x01 | Flags |
| 3 | 0x06 | -LE General Discoverable Mode-BR/EDR Not Supported |
| 4 | 0x0A | AD length |
| 5 | 0xFF | Manufacturer Specific Data |
| 6 | 0x0275 | Geotab's Company ID |
| 8 | 0x00 | Advertising packet version number |
| 9 | 0xC6 | Tx Power Level (-58dBm) |
| 10 | 0x64 | Battery Level (100%) |
| 11 | 0xF1 | Generic Timer 2 |
| 12 | 0x03 | Event |
| 13 | 0xF4 | 0x01F4 = 500 minutes |
| 14 | 0x01 |

Reporting temperature and a timer

| Offset | Value | Description |
| --- | --- | --- |
| 1 | 0x02 | AD length |
| 2 | 0x01 | Flags |
| 3 | 0x06 | -LE General Discoverable Mode-BR/EDR Not Supported |
| 4 | 0x0E | AD length |
| 5 | 0xFF | Manufacturer Specific Data |
| 6 | 0x0275 | Geotab's Company ID |
| 8 | 0x00 | Advertising packet version number |
| 9 | 0xC6 | Tx Power Level (-58dBm) |
| 10 | 0x64 | Battery Level (100%) |
| 11 | 0x07 | Temperature |
| 12 | 0x00 | 0x412000 FP24 = 10°C |
| 13 | 0x20 |
| 14 | 0x41 |
| 15 | 0xF1 | Generic Timer 2 |
| 16 | 0x03 | Event |
| 17 | 0xF4 | 0x01F4 = 500 minutes |
| 18 | 0x01 |

Reporting custom data

| Offset | Value | Description |
| --- | --- | --- |
| 1 | 0x02 | AD length |
| 2 | 0x01 | Flags |
| 3 | 0x06 | -LE General Discoverable Mode-BR/EDR Not Supported |
| 4 | 0x0F | AD length |
| 5 | 0xFF | Manufacturer Specific Data |
| 6 | 0x0275 | Geotab's Company ID |
| 8 | 0x00 | Advertising packet version number |
| 9 | 0xC6 | Tx Power Level (-58dBm) |
| 10 | 0x64 | Battery Level (100%) |
| 11 | 0xFF | Custom Data |
| 12 | 0x07 | Length |
| 13 | 0x42 | Custom data"Beacon1" in ASCII |
| 14 | 0x65 |
| 15 | 0x61 |
| 16 | 0x63 |
| 17 | 0x6F |
| 18 | 0x6E |
| 19 | 0x31 |

Reporting temperature + counter + timer + custom data

| Offset | Value | Description |
| --- | --- | --- |
| 1 | 0x02 | AD length |
| 2 | 0x01 | Flags |
| 3 | 0x06 | -LE General Discoverable Mode-BR/EDR Not Supported |
| 4 | 0x19 | AD length |
| 5 | 0xFF | Manufacturer Specific Data |
| 6 | 0x0275 | Geotab's Company ID |
| 8 | 0x00 | Advertising packet version number |
| 9 | 0xC6 | Tx Power Level (-58dBm) |
| 10 | 0x64 | Battery Level (100%) |
| 11 | 0x07 | Temperature |
| 12 | 0x00 | 0x412000 FP24 = 10°C |
| 13 | 0x20 |
| 14 | 0x41 |
| 15 | 0xE6 | Generic Counter 1 |
| 16 | 0x08 | Count |
| 17 | 0xF1 | Generic Timer 2 |
| 18 | 0x03 | Event |
| 19 | 0xF4 | 0x01F4 = 500 minutes |
| 20 | 0x01 |
| 21 | 0xFF | Custom Data |
| 22 | 0x07 | Length |
| 23 | 0x42 | Custom data"Beacon1" in ASCII |
| 24 | 0x65 |
| 25 | 0x61 |
| 26 | 0x63 |
| 27 | 0x6F |
| 28 | 0x6E |
| 29 | 0x31 |
