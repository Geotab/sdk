---
layout: page
permalink: /hardware/addon-protocols/rs232-usb/
title: Add-On Protocol - RS232 & USB
---

External devices can communicate with a Geotab GO device through the Third-Party RS232 and USB protocols linked below. Two-way communication is supported, allowing a MyGeotab API call to produce messages from the IOX device to reach the external device. The hardware interface is one of the following:

 - [IOX-RS232 F/M](https://www.geotab.com/documentation/iox-rs232/ "IOX-RS232 Support Documentation")
 - [IOX-USB](https://www.geotab.com/documentation/iox-usb/ "IOX-USB Support Documentation")

## Special Requirements
### Enabling IOX-USB Data Transfer

To enable third-party data communication on the IOX-USB, apply the following custom parameter to the GO device through MyGeotab:

```xml
<GoParameters><Parameter Description="Enable USB Data" Offset="164" Bytes="02"/></GoParameters>
```

\* *Note* \- The GO device will automatically upgrade to the ProPlus rate plan once third-party data transfer begins.

### IOX-USB Communication Consideration
 
The IOX-USB operates as a USB 2.0 full-speed host. The maximum data transfer rate is 12 Mbit/s. The IOX-USB can use two methods to enumerate a USB device:

1. The [Android Open Accessory protocol (*AOA*)](https://source.android.com/devices/accessories/protocol.html). This [sample project](https://github.com/Geotab/android-external-device-example "Android Open Accessory Sample") can be used as a framework.
2. USB-CDC (Communications Device Class)

### Powering a device using the IOX-RS232 and IOX-USB
Both the IOX-USB and the IOX-RS232 can provide power to an Add-On Device. 

- The IOX-USB can provide 1.5A at 5V as a power output. 
- The IOX-RS232 supports 900mA at 12/24V to the external red (power) and black (ground) wires. However, it is not required to power the Add-On device using the IOX-RS232.

### Grounding a device
Even if the Hardware Add-On has a separate connection to vehicle power and ground, it is still recommended to connect the Add-On ground to the ground wire of the IOX-RS232, as this improves signal integrity.

### Serial Port Settings For Add-Ons

Geotab recommends that RS232/USB serial ports are programmed in accordance with the following specifications:

- Baud Rate: 9600 or 115200. Note: the device is equipped with autobaud detection, so other standard rates are acceptable.
- Parity: None
- Stop Bits: 1
- Flow Control: None

## Integration Process

The following process should be followed when integrating a third-party device with the GO device using our Third-Party Data Protocol:

### Contact Solutions Engineering

Contact the [Geotab Solutions Engineering team](mailto:soleng@geotab.com) with a detailed integration proposal, which should include:

 - A name for the integration
 - The interfacing hardware
 - Data types that will be sent to MyGeotab
 - The required Status Data
 - Direction of data transfer
 - Expected timelines for integrating
 
The Solutions Engineering team will respond with followup questions to define the integration, and assign an External device ID and any Status Data IDs that would be required. 

An additional resource is the [Hardware Integration Toolkit](https://docs.google.com/presentation/d/1nkmDYw2tscZxKaezFm5sR3jLItI3IRJTS6JIhgg0rFU/edit#slide=id.g625282e7fc_0_0) with integration walkthrough.

### Using Status Data IDs

There is an extensively defined Status Data ID list which can be found at [MyGeotab Diagnostics](https://docs.google.com/spreadsheets/d/1sy7IOhWmFoo40_I-ruOJO8bVTMLXqHa11d0oJtaoIcE/edit#gid=1133172080). Specifics regarding Status Data ID implementations can be found on the README sheet. 

### Handshake

An initial Handshake **is required** in order for the GO device to accept third-party data. Vehicle ignition must be on during the handshake process.

1. After powering up, the GO device will enter an external device detection cycle. The external device will be powered for 72 seconds. In this interval, the GO device will listen for a [Handshake Sync](#handshake-sync-auto-baud-detect-for-rs232) from the external device. The Handshake Sync is used to indicate that an external device is present. For implementations using the IOX-RS232, the Handshake Sync is also used to detect baud rate.
  - The external device must send the Handshake Sync message once per second.
  - If a Handshake Sync message is not detected from the external device after 72 seconds, the external device is powered down for 5 seconds, then powered up again to restart the detection cycle.
2. The GO device will reply to a Handshake Sync with a [Handshake Request](#msg-type-0x01-handshake-request).
3. The external device must reply with a [Handshake Confirmation](#msg-type-0x81-handshake-confirmation) message within 2 seconds. If the external device would like an acknowledgment from the GO device that it received the Handshake Confirmation message, the corresponding flag in the Handshake Confirmation message may be set.
4. After sending the Handshake Confirmation message, the external device can begin to send third-party data as required. For every [Third-Party Data Message](#msg-type-0x80-third-party-data-as-status-data) sent, the GO device will reply with a [Data Acknowledge message](#msg-type-0x02-third-party-data-acknowledge).
  - If the external device receives no response to a Third-Party Data message, it must restart the handshake process — returning to step 1 above.
5. The GO device may send a Handshake Request message at any time after the initial handshake. The external device must respond with a Handshake Confirmation message. If the external device does not respond, it must restart the handshake process — returning to step 1 above.

### Checksum

Each message contains a 2-byte Fletcher's Checksum calculated across all the bytes of the message except the checksum itself. The checksum values are bytes, and as such overflow from 255 (0xFF) to 0 (0x00). The bytes used for the checksum calculation are all the bytes up to the checksum byte, including STX, LEN, TYPE, but not including ETX.

Checksum calculation pseudocode:

```js
byte ChkA = 0;
byte ChkB = 0;
// n is the number of bytes in the message
// up to, but not including, the checksum
for (i = 0; i < n; i++)
{
ChkA = ChkA + MsgBuffer[i];
ChkB = ChkB + ChkA;
}
// ChkA precedes ChkB in the message
```

### Data Endianness

All values must be sent using Little-Endian Byte Order, meaning the least significant byte is first.

## Messages from the GO device
### Msg Type 0x01: Handshake Request

Issued by the GO device upon receipt of the Handshake Sync, and periodically re-sent to confirm that the external device is still connected.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x01 | 1 | 1 |
| Message Body Length = 0 | 1 | 2 |
| Checksum | 2 | 3 |
| ETX (0x03) | 1 | 5 |
| Reply: Handshake Confirmation ([Msg Type 0x81](#msg-type-0x81-handshake-confirmation)) |

### Msg Type 0x02: Third-Party Data Acknowledge

Issued by the GO device upon receipt of Third-Party Data from the External Device.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x02 | 1 | 1 |
| Message Body Length = 0 | 1 | 2 |
| Checksum | 2 | 3 |
| ETX (0x03) | 1 | 5 |

### Msg Type 0x21: GO Device Data

Issued by the GO device every 2 seconds to a connected Enhanced Hours Of Service Device (ID: 4141), or periodically when a 0x85 request message is received.

- An Enhanced Hours Of Service Device must ACK this message with a 0x84 message.
- If the data is requested periodically using the 0x85 message, the ACK is optional.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x21 | 1 | 1 |
| Message Body Length >= 52 [1] | 1 | 2 |
| Date / Time [2] | 4 | 3 |
| Latitude | 4 | 7 |
| Longitude | 4 | 11 |
| Road Speed [3] | 1 | 15 |
| RPM | 2 | 16 |
| Odometer [4] | 4 | 18 |
| Status Flags (from LSB): <br> 1st bit: 1 = GPS Valid <br> 2nd bit: 1 = Ignition On <br> 3rd bit: 1 = Engine Bus Activity <br> 4th bit: 1 = Date/Time Valid <br> 5th bit: 1 = Speed From Engine <br> 6th bit: 1 = Odometer From Engine | 1 | 22 |
| Trip Odometer [4] | 4 | 23 |
| Total Engine Hours | 4 | 27 |
| Trip Duration [5] | 4 | 31 |
| Deprecated = 0 | 4 | 35 |
| Driver ID [6] | 4 | 39 |
| GO Device Serial Number | 12 | 43 |
| Checksum | 2 | Length + 3 |
| ETX (0x03) | 1 | Length + 5 |
| Reply: Device Data Ack ([Msg Type 0x84](#msg-type-0x84-device-data-ack)) |   |   |

1. All implementations of this message must cater for the message length increasing in the future.
2. "Date/Time" is a 'seconds' counter starting from 1st of January 2002.
3. If Road Speed from the engine is not available, GPS speed is used.
4. Increase of odometer since the most recent ignition on. If Odometer is not available, GPS device distance is used.
5. Time passed since the most recent ignition on.
6. Driver ID is only available when using the IOX-NFC.

#### *Conversions*

| **Data** | **Conversion** | **Units** |
| --- | --- | --- |
| Engine Road Speed | 1 | km/h |
| Odometer | 0.1 | km |
| RPM | 0.25 | RPM |
| Lat/Long | 1e-7 | degrees |
| Engine Hours | 0.1 | h |
| Trip Duration | 1 | s |

### Msg Type 0x22: Binary Data Response

Issued by the GO device upon acceptance or rejection of either a Binary Data (0x86), an Extended Application Specific Data (0x88), or an Extended Binary Data (0x8A) message from the external device.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x22 | 1 | 1 |
| Message Body Length = 4 | 1 | 2 |
| Binary data transmission success <br> 0 = Rejected <br> 1 = Accepted | 1 | 3 |
| Reserved | 3 | 4 |
| Checksum | 2 | 7 |
| ETX (0x03) | 1 | 9 |

### Msg Type 0x23: Binary Data Packet

Issued by the GO device upon receipt of a Binary Data packet of 255 bytes or less from MyGeotab destined for the external device. This message format is only used if the corresponding "Binary Data Packet Wrapping" flag has been set by the external device during the Handshake Confirmation. The payload of the binary data packet message will be the raw bytes sent from MyGeotab.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x23 | 1 | 1 |
| Message Body Length = x (0 - 255) | 1 | 2 |
| Binary Data | x | 3 |
| Checksum | 2 | 3+x |
| ETX (0x03) | 1 | 5+x |

### Msg Type 0x24: Extended application specific data to external device

Sent by the GO device to the external device. Can be in response to a 0x88 message and used for payloads larger than 1 byte. Currently only used for Keyless.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x24 | 1 | 1 |
| Message Body Length = x | 2 | 2 |
| Binary Data | x | 4 |
| Checksum | 2 | 4+x |
| ETX (0x03) | 1 | 6+x |


### Msg Type 0x25: Extended binary data packet

Issued by the GO device upon receipt of a Binary Data packet of 256 bytes or more from MyGeotab destined for the external device This message format will only be used if the corresponding “Binary Data Packet Wrapping” flag has been set by the external device during the Handshake Confirmation. The payload of the binary data packet message will be the raw bytes as sent from MyGeotab. The maximum length currently supported by the GO is 1000 bytes.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x25 | 1 | 1 |
| Message Body Length = x (256 - 1000) | 2 | 2 |
| Binary Data | x | 4 |
| Checksum | 2 | 4+x |
| ETX (0x03) | 1 | 6+x |

### Msg Type 0x26: Protobuf data packet

Available with add-on protocol versions 1.2 and later.
Issued by the GO device in response to 0x8C. Also issued by the GO device to publish information for the topics subscribed by the Add-On device.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x26 | 1 | 1 |
| Message Body Length = x (1 - 255) | 1 | 2 |
| Data Payload Protobuf (1-255) | x | 3 |
| Checksum | 2 | 3+x |
| ETX (0x03) | 1 | 5+x |

The payload is protobuf-encoded. Please see [Protobuf Schema](https://github.com/Geotab/android-external-device-example/blob/master/app/src/main/proto/iox_messaging.proto) for details. 

### Msg Type 0x27: Add-On protocol version to external device

Sent by the GO device to an external device as a reply to the Add-On protocol version request (0x8B).

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x27 | 1 | 1 |
| Message Body Length = 4 | 1 | 2 |
| Protocol major version | 2 | 3 |
| Protocol minor version | 2 | 5 |
| Checksum | 2 | 7 |
| ETX (0x03) | 1 | 9 |

## Messages from External Device

### Handshake Sync (Auto-BAUD detect for RS232)

Issued by an external device every second until the Handshake Request is received.

|   | Bytes | Position |
| --- | --- | --- |
| Sync Char (0x55) | 1 | 0 |
| Reply: Handshake Request ([Msg Type 0x01](#msg-type-0x01-handshake-request)) |

### Msg Type 0x81: Handshake Confirmation

Issued by the external device when it receives the Handshake Request.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x81 | 1 | 1 |
| Message Body Length = 4 | 1 | 2 |
| External Device ID (assigned by Geotab) | 2 | 3 |
| Flags <br> 1st bit: Handshake Confirmation ACK <br> 2nd bit: Binary Data Packet Wrapping <br>  3rd bit: Self Powered External Device <br>All other bits:Reserved for future implementation, must be set to 0 | 2 | 5 |
| Checksum | 2 | 7 |
| ETX (0x03) | 1 | 9 |

Handshake Confirmation ACK:

- 0: No Ack to Handshake Confirmation message will be sent by the GO device.
- 1: The Handshake Confirmation is to be acknowledged with a Third-Party Data Acknowledge message.

Binary Data Packet Wrapping:

- 0: The passthrough data from the server will be passed to the external device without modification.
- 1: The passthrough data from the server will be wrapped in a Binary Data Packet message before being sent to the external device.

Self-Powered External Device:

- 0: The External Device receives power from the IOX. After waking up, the IOX will restore power to the External Device and wait for the handshake to complete.
- 1: The External Device has its own power source. The IOX will not wait for the handshake and will assume it can initiate communication with the External Device immediately after waking up.

### Msg Type 0x80: Third-Party Data as Status Data

Issued by the external device whenever it requires Third-Party Data to be saved on the GO device as Status Data. Rate limit is 100 logs per 10 minutes, for each distinct data ID. If you exceed the rate limit, the GO device will stop taking data from the IOX.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x80 | 1 | 1 |
| Message Body Length = 6 | 1 | 2 |
| Data ID (assigned by Geotab) | 2 | 3 |
| Data | 4 | 5 |
| Checksum | 2 | 9 |
| ETX (0x03) | 1 | 11 |
| Reply: Third-Party Data Ack ([Msg Type 0x02](#msg-type-0x02-third-party-data-acknowledge)) |

### Msg Type 0x82: Free Format Third-Party Data

Issued by the external device whenever it wants Third-Party Data to be saved on the GO device in a free format (1 to 27 bytes) that will be saved in MyGeotab as Custom Data. Rate limit is 500 logs per 10 minutes. If you exceed the rate limit, the GO device will stop taking data from the IOX.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x82 | 1 | 1 |
| Message Body Length = x (1 to 27) | 1 | 2 |
| Data | x | 3 |
| Checksum | 2 | 3 + x |
| ETX (0x03) | 1 | 5 + x |
| Reply: Third-Party Data Ack ([Msg Type 0x02](#msg-type-0x02-third-party-data-acknowledge)) |

### Msg Type 0x84: Device Data ACK

Issued by the External Device on receipt of the GO Device Data message.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x84 | 1 | 1 |
| Message Body Length = 0 | 1 | 2 |
| Checksum | 2 | 3 |
| ETX (0x03) | 1 | 5 |

For the purpose of acknowledging the GO Device Data message when connected as an Enhanced Hours Of Service Device:

- The GO device will keep streaming the GO Device Data messages for up to 30 seconds, even if no ACK is received.
- If no ACK is received in that time frame, the GO Device will send an External Device Disconnected record to the server and will wait for a new Handshake Sync request from the External Device.
- If the ACK message is received within the 30 seconds, the counter is re-initialized.

### Msg Type 0x85: Request Device Data Message

This is a request-response message. It can be issued by the External Device whenever it wishes to receive the Device Data Info Message (0x21).

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x85 | 1 | 1 |
| Message Body Length = 0 | 1 | 2 |
| Checksum | 2 | 3 |
| ETX (0x03) | 1 | 5 |
| Reply: GO Device Data ([Msg Type 0x21](#msg-type-0x21-go-device-data)) |   |   |

### Msg Type 0x86: Binary Data Packet

Sent by the external device when sending messages with less than or equal to 255 bytes of data content to MyGeotab. The GO device will respond with the Binary Data Response message indicating whether the data was accepted into the modem's socket buffer.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x86 | 1 | 1 |
| Message Body Length = x (0 - 255) | 1 | 2 |
| Binary Data | x | 3 |
| Checksum | 2 | 3+x |
| ETX (0x03) | 1 | 5+x |
| Reply: Binary Data Response ([Msg Type 0x22](#msg-type-0x22-binary-data-response)) |   |   |

The payload of the binary data needs to adhere to protocols understood by MyGeotab. MIME protocol is one of these protocols. Please see [Appendix C](#appendix-c-using-binary-data-messages-to-transfer-mime-data) for implementation details.

### Msg Type 0x87: Third-Party Data as Priority Status Data

Priority Status Data follows an expedited processing workflow on the GO device, but will otherwise be treated the same as an 0x80 Status Data message. It will also be logged using an Iridium modem connection, if available.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x87 | 1 | 1 |
| Message Body Length = 6 | 1 | 2 |
| Data ID (assigned by Geotab) | 2 | 3 |
| Data | 4 | 5 |
| Checksum | 2 | 9 |
| ETX (0x03) | 1 | 11 |
| Reply: Third-Party Data Ack ([Msg Type 0x02](#msg-type-0x02-third-party-data-acknowledge)) |

### Msg Type 0x88: Extended application specific data from external device

Extended application-specific data from external device is sent by the external device to the GO device. Can be used for payloads larger than 1 byte. There must be an associated service running on the GO device that is looking for these messages. Currently only used for Keyless.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x88 | 1 | 1 |
| Message Body Length = x (1 to 1024) | 2 | 2 |
| Data Payload | x | 4 |
| Checksum | 2 | 4+x |
| ETX (0x03) | 1 | 6+x |
| Reply: Binary Data Response ([Msg Type 0x22](#msg-type-0x22-binary-data-response)) |

### Msg Type 0x89: Ping

After handshaking, this message can be issued periodically by the external device to check that the GO device is active and ready. The GO device will normally reply with the Third-Party Data Ack (Msg Type 0x02). If this reply is not received, the external device should reset and begin sending the Handshake Sync (0x55).

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x89 | 1 | 1 |
| Message Body Length = 0 | 1 | 2 |
| Checksum | 2 | 3 |
| ETX (0x03) | 1 | 5 |
| Reply: Third-Party Data Ack ([Msg Type 0x02](#msg-type-0x02-third-party-data-acknowledge)) |

### Msg Type 0x8A: Extended binary data packet

Sent by the external device when sending messages with <= 1000 bytes of data content to MyGeotab. The GO device will respond with the Binary Data Response message indicating whether the data was accepted into the modem's socket buffer.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x86 | 1 | 1 |
| Message Body Length = x (0 - 1000) | 2 | 2 |
| Extended_binary_data | x | 4 |
| Checksum | 2 | 4+x |
| ETX (0x03) | 1 | 6+x |
| Reply: Binary Data Response ([Msg Type 0x22](#msg-type-0x22-binary-data-response)) |   |   |

The payload of the binary data needs to adhere to protocols understood by the Geotab servers. MIME protocol is one of these protocols. Please see [Appendix C](#appendix-c-using-binary-data-messages-to-transfer-mime-data) for implementation details.

### Msg Type 0x8B: Add-On protocol version request

Sent by the external device when requesting the Add-On protocol version number. Once the GO device receives this request, it will reply with 0x27.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x8B | 1 | 1 |
| Message Body Length = 0 | 1 | 2 |
| Checksum | 2 | 3 |
| ETX (0x03) | 1 | 5 |
| Reply: Third-Party version Ack Reply ([Msg Type 0x27](#msg-type-0x27-add-on-version-to-external-device)) |

### Msg Type 0x8C: Protobuf data packet

Available with Add-On protocol versions 1.2 and later.
Sent by the external device to subscribe to various topics/information. The GO device will respond with 0x26 ACK.

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x8C | 1 | 1 |
| Message Body Length = x(1-255) | 1 | 2 |
| Data Payload Protobuf (message_body) = x (1 to 255) | x | 3 |
| Checksum | 2 | 3 + x |
| ETX (0x03) | 1 | 5 + x |
| Reply: Protobuf data packet ([Msg Type 0x26](#msg-type-0x26-Protobuf-data-packet)) |

The payload is protobuf-encoded. Please see [Protobuf Schema](https://github.com/Geotab/android-external-device-example/blob/master/app/src/main/proto/iox_messaging.proto) for details. The currently supported topics are:

| Topic | 
| --- |
| TOPIC_VIN |
| TOPIC_GEAR |
| TOPIC_ENGINE_SPEED |
| TOPIC_ENGINE_LOAD |
| TOPIC_ODOMETER |
| TOPIC_ACCEL_PEDAL_PERCENTAGE |
| TOPIC_COOLANT_TEMP |
| TOPIC_DOC_INTAKE_GAS_TEMP |
| TOPIC_DOC_OUTLET_GAS_TEMP |
| TOPIC_FUELTANK1_UNITS |
| TOPIC_FUELTANK2_UNITS |
| TOPIC_FUELTANK1_PERCENT |
| TOPIC_FUELTANK2_PERCENT |
| TOPIC_STATE_OF_CHARGE |
| TOPIC_ENGINE_ROAD_SPEED |
| TOPIC_VEHICLE_ACTIVE |
| TOPIC_DRIVER_SEATBELT |
| TOPIC_LEFT_TURN_SIGNAL |
| TOPIC_RIGHT_TURN_SIGNAL |
| TOPIC_EV_CHARGING_STATE |
| TOPIC_PARK_BRAKE |

## Appendices

### Appendix A: Raw Message Data Example for IOX-USB & IOX-RS232

```javascript
Handshake Sync from External Device
0x55... 0x55... 0x55

Handshake Request from GO device
0x02, 0x01, 0x00, 0x03, 0x08, 0x03

Handshake Confirmation from External Device (4208 is a test Device ID)
(Device ID: 4208 = 0x00001070)
0x02, 0x81, 0x04, 0x70, 0x10, 0x00, 0x00, 0x07, 0x18, 0x03

Third-Party Data from External Device
(Status Data ID: 35349 = 0x8A15, Data Value: 200 = 0x000000C8)
0x02, 0x80, 0x06, 0x15, 0x8A, 0xC8, 0x00, 0x00, 0x00, 0xEF, 0x8C, 0x03

Third-Party Data Acknowledge from GO device
0x02, 0x02, 0x00, 0x04, 0x0A, 0x03
```

### Appendix B: Sample Message Flow for IOX-USB & IOX-RS232

 ![]({{site.baseurl}}/hardware/addon-protocols/rs232-usb_0.png)

### Appendix C: Using Binary Data Messages to Transfer MIME Data

MIME-type data can be transferred from an external device to the server via the GO device. The protocol is described in [MIME passthrough messages]({{site.baseurl}}/hardware/developing-an-iox/mime-protocol/).

 The Message Flow is similar to that outlined in [Appendix B](#appendix-b-sample-message-flow-for-iox-usb--iox-rs232), with the following variations:
1. Third-Party Data Message is instantiated as Binary Data Packet Containing MIME Type Data, whose format is [such](#binary-data-packets-containing-mime-type-data)
2. Data Acknowledge Message is instantiated as Binary Data Response (0x22)
3. After the last Binary Data Response, add a Binary Data Packet Containing MIME Type Acknowledge, whose format is [such](#binary-data-packet-containing-mime-type-acknowledge). Once the complete payload of the MIME message is successfully received by MyGeotab, a MIME ACK will be sent back from MyGeotab.

Readers are encouraged to also read the [Geotab MIME Data Exchange Example IOX-RS232](https://docs.google.com/document/d/1a8XCgpmEEbx6KxnFxhu40XULWr2uZeAG_5aKkm-Mjnw/edit?usp=sharing) to better understand of the protocol.

#### Binary Data Packets Containing MIME Type Data

This is an example of binary data packets for image data transferred using the MIME type “image/jpeg”. The image size is 83000 bytes. The packet size is 250.

**First packet:**

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x86 | 1 | 1 |
| Message Body Length = 250 | 1 | 2 |
| **Sequence number = 0** | **1** | **3** |
| **MIME type length = 10** | **1** | **4** |
| **MIME type ("image/jpeg")** | **10** | **5** |
| **Payload Length = 83000** | **4** | **15** |
| **Binary Payload (the first 234 bytes)** | **234** | **19** |
| Checksum | 2 | 253 |
| ETX (0x03) | 1 | 255 |

**Second packet:**

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x86 | 1 | 1 |
| Message Body Length = 250 | 1 | 2 |
| **Sequence number = 1**\* | **1** | **3** |
| **Binary Payload (the next 249 bytes)** | **249** | **4** |
| Checksum | 2 | 253 |
| ETX (0x03) | 1 | 255 |

#### Binary Data Packet Containing MIME Type Acknowledge

|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x23 | 1 | 1 |
| Message Body Length = 9+x | 1 | 2 |
| Sequence Number = 0 | 1 | 3 |
| MIME type length = 3 | 1 | 4 |
| MIME type in ASCII = 'ACK' | 3 | 5 |
| Payload Length = x | 4 | 8 |
| Total Number of Payload Bytes Received | x | 12 |
| Checksum | 2 | 12+x |
| ETX (0x03) | 1 | 14+x |
