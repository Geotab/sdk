---
layout: page
permalink: /hardware/developing-an-iox/messaging-protocol/
title: IO Expander Protocol
---

## General Description

The GO device and the Input-Output Expander (IOX) are connected in a dedicated CAN network. All communication is between the GO device and the IOX. IOXs do not talk to each other. Communications can be of the form: GO device to all IOXs, GO device to individual IOX, or individual IOX to GO device. Readers are recommended to find examples from [CAN IOX Sample Communication Session](https://docs.google.com/document/d/1BExcPst5bNzv-IZGX6ZbPeHK5MO1s2AI0rqzEhHbNZ4/edit?usp=sharing) as they read through the rest of this page.

### Identification
This document describes the <span style="color:red">IOX Expander Protocol version 1.2</span>.

All messages are supported since IOX Expander Protocol version 1.0 unless stated otherwise.

### Interoperability

Third party IOX Add-ons rely on the messages and protocol defined in this document in order to properly communicate with Geotab firmware. Geotab will endeavor to maintain support for the currently-documented messages and protocol. However, from time to time Geotab may make changes to such messages and protocol which could potentially impact third party IOX Add-on implementations. If Geotab makes any such changes, Geotab will use commercially reasonable efforts to provide partners with as much notice of the impending firmware changes as is practicable in the circumstances. Geotab accepts no responsibility or liability for third party IOX Add-ons which fail to function properly, or at all, and any and all damages which arise, directly or indirectly, from such failures.

Geotab recommends that all partners who develop their own IOX Add-ons ensure they have the ability to remotely update their firmware. This can be accomplished by sending an update to the IOX Add-on using the 
[MIME passthrough messages]({{site.baseurl}}/hardware/developing-an-iox/mime-protocol/).

### Serial Number
Each custom IOX is assigned a 4 byte Serial Number by the integrators, similar to each car having its own VIN. The 2 Most Significant Bytes of the Serial Number shall also be reported in bytes 3 and 4 of the Poll Response (0x02). The 2 Least Significant Bytes are used for differentiating each IOX which exists on the same CAN bus (attached to the same GO device) when the GO device is sending messages targeted for a specific IOX. In other words, the 2 LSB serve as the Address ID, and is included in bits 15 - 0 of the Arbitration ID.

Integrators are free to leverage any mechanism for the Serial Number assignment to each individual IOX, but Geotab recommends following the process outlined below:
1. Generate a random 4 byte value.
2. Make sure that the 2 LSBs are not equal to '0000'.
3. Make sure that you do not already have this value stored in your database of existing serial numbers.

### Message Structure

Message identification is done with an arbitration ID.

The Arbitration ID Field for IOX Messages:

| Bits | 28 to 22 | 21 to 16 | 15 to 0 |
| --- | --- | --- | --- |
| Contents | Reserved: 0 | Message: 0–63 | All IOXs: 0 <br> Individual IOX Address ID: 1–65535 |

0x1F800000 IO\_EXPANDER\_RESERVED\_MASK

0x007F0000 IO\_EXPANDER\_COMMAND\_MASK

0x0000FFFF IO\_EXPANDER\_ID\_MASK

### Address ID

The last 2 bytes of the IOX Serial Number (MSB first) are used as the Address ID. This allows the GO device to identify the source of a message or, when the message is sent from the GO device, to identify the destination IOX.

The GO device sends messages with ID 0x0000 meant for all IOXs, or with an ID between 0x0001 and 0xFFFF when it is targeted at a specific IOX.

IOXs always use their own ID when sending messages. They never send 0x0000. For this reason, IOXs are not produced with Serial Numbers ending in 0x0000.

### IOX ID
Each model of IOX is assigned an IOX ID by Geotab, similar to each model of car having a model name. Integrators shall contact Geotab to get an IOX ID assigned. The IOX ID does not need to be included in the IOX Serial Number. Integrator shall report the IOX ID in byte 7 of the Poll Response (0x02).

### Acknowledge Process

1. Each IOX should receive an ACK from the GO device for every message sent. If an ACK is not received within 150 ms, the IOX should repeat the message before sending anything else.
2. The IOX must respond to the poll request within 500ms.

## Polling

After powering up, the GO device will poll all IOXs every 7 seconds. Each IOX must respond to this poll by obeying the ACK rules. Unless otherwise described, most commands can only be sent after the first poll (handshake) is completed with the GO.

### Device Removed

If the GO device fails to see an IOX that used to be connected (i.e. the IOX was disconnected), the GO device will remove the IOX from its internal database after 5 attempts (35 seconds) and will make the slot available for a new IOX that can be connected at any time.

### New Device

Any IOX that is connected to the GO device must respond to the poll request. The GO device will notice the new IOXs and add them to its internal database.

### Undocumented messages

An IOX could receive messages from the GO device that are not documented here. The IOX must be capable of handling this situation by ignoring/discarding the unknown messages.

## Waking up the GO Device
Every 1 second, the GO wakes up for 2ms to look for CAN activity on the IOX bus. The IOX can wake up the GO by sending an [RX Data (0x0C)](#rx-data-0x0c) message every 1ms until the GO notices the activity and sends the [Wakeup (0x04)](#wakeup-0x04) message to the IOX.


## Commands

### Reset (0x00)

Directed to all devices. Instructs all devices to reset and behave as if they have just powered up. IOXs should throw out any setup information they might have received, de-assert hardware control lines, and open their relays.

### Poll (0x01)

Sent by the GO device in a broadcast fashion to all units to check if they are there.

### Poll Response (0x02)

Sent by an IOX when a poll is received. The ACK procedure must be obeyed. The first poll-response after power up (when Byte 0 Bit 0 is 1) contains all 8 bytes. All subsequent poll-responses (when Byte 0 Bit 0 is 0) only contain the first byte.

#### Payload — Poll Response

| Byte # | Byte Description |
| --- | --- |
| 0 - Bit 0 | 0 = Have been polled before. <br> 1 = First poll after power up. |
| 0 - Bit 1 | 0 = Not Going to Sleep. <br> 1 = Going to Sleep. |
| 0 - Bit 2 | 0 = Normal reply. <br> 1 = First poll response after wake up. |
| 0 - Bit 3-7 | Reserved |
| | The following Bytes are sent only on first poll-response |
| 1 | Firmware Version Major |
| 2 | Firmware Version Minor |
| 3-4 | 2 Most significant bytes of Serial Number |
| 5 | Reset Reason <br> 0 =  Power On Reset <br> 1 =  Reset Command <br> 2 = New Firmware <br> All others reserved. |
| 6 | Reserved |
| 7 | 150 to 199 <br> IOX ID. Please contact Geotab to get one assigned. |

When the &quot;Go to Sleep&quot; command is received, and before actually going to sleep, the devices will indicate they are going to sleep through the indicated bit. This bit is cleared on wakeup.

### Additional Info (0x03)

Sent by the IOX after an ACK for the first poll is received. This message is not strictly required for operation. However, sending of this message is required if any version information is to be reported, including: Product, Hardware, Firmware Major, Firmware Minor, or Version Control.

#### Payload — Additional Info

| Byte # | Byte Description |
| --- | --- |
| 0-3 | Software Version Control Number(Ex: SVN Version, Git SHA) |
| 4 | Product Version |
| 5 | Reserved |
| 6 | Error Condition <br> 0 = No error <br> 1 = Memory allocation error |
| 7 | Hardware Version |

### Wakeup (0x04)

Wakes up all the IOXs from Sleep Mode. Will be sent by the GO at least twice within a space of 50 ms. Currently the GO device sends this message 5 times with 10ms between.

### Sleep (0x05)

Causes all IOXs to go into Sleep Mode. Devices will enter Sleep Mode no sooner than 2 seconds, and not more than 20 seconds, after receiving this command. In the meantime, they will report through the poll response that they are going to sleep.

### TX Data (0x0B)

Data sent from the GO device to the addressed IOX. The contents of this payload may follow a higher level protocol structure such as [MIME]({{site.baseurl}}/hardware/developing-an-iox/mime-protocol/).

#### Payload — TX Data

| Byte # | Byte Description |
| --- | --- |
| 0-7 | Data to transmit |

### RX Data (0x0C)

Data sent from an IOX to the GO device. The GO will reply with an ACK. The contents of this payload may follow a higher level protocol structure such as [MIME]({{site.baseurl}}/hardware/developing-an-iox/mime-protocol/).
The 0x0C message series start with a Information Type 1 - Packet Wrapper [0x25 message](#iox-requeststatus-0x25), and also ends with one.

#### Payload — RX Data

| Byte # | Byte Description |
| --- | --- |
| 0-7 | Received data |

### Acknowledge (0x14)

Sent by the GO to indicate that a message is being acknowledged. The ACK to an Rx Data message (0x0C) could include 1 byte of data. This data is used for streaming flow control. When the 80% watermark of the receive buffer has been reached, the flow control bit will tell the IOX to hold off sending for 50ms. The IOX will send the next frame at the end of this period and depending on the flow control bit of the ACK, it will either keep on sending or delay another 50ms, thus repeating the process. The GO device will clear the flow control bit whenever the buffer is below the 20% watermark. If transferring data as part of a wrapped packet exchange the streaming watermark can be ignored. The buffers will not overflow so long as the length limit and the modem result are honored. This byte is only sent when needed.

#### Payload

| Byte #     | Byte Description |
| --- | --- |
| 0 - Bit 0 | 0 = Clear to send more Rx Data. <br> 1 = Stop sending UART Data. Buffer 80% full, withhold next frame 50 ms. |
| 1 - Bit 1-7 | Reserved |

### Application Specific Data (0x1C)

Sent by the GO device after a packet wrapped passthrough message attempt to the server. A 'rejected' response from the modem typically means it is not connected. If the message is 'accepted' this means it was added to the modem's TCP socket buffer. It is not a confirmation that the message was successfully sent.

#### Type 0: Modem Transmission Result

| **Byte #** | **Byte Description** |
| --- | --- |
| 0 | Log Type |
| 1 | 0 = Rejected <br> 1 = Accepted |


### IOX Single Frame Log Data (0x1D)

Sent from the IOX to the GO device when the IOX wants to create a log that can fit into a single CAN frame. Rate limit is 100 logs per 10 minutes. If you exceed the rate limit, the GO device will stop taking data from the IOX.

#### Payload

| Byte # | Byte Description |
| --- | --- |
| 0 | Log Type |
| 1-7 | Data |

#### Log Type: 0 (GenericDataRecord)

Used to request the GO log normal status data.

| Data | Description |
| --- | --- |
| 1-2 | Data ID |
| 3 | Data Length |
| 4-7 | Data |

#### Log Type: 3 (PriorityDataRecord)

Used to request the GO log status data and additionally send via Iridium if available.

| Data | Description |
| --- | --- |
| 1-2 | Data ID |
| 3 | Data Length |
| 4-7 | Data |

#### Log Type: 1 (externalDeviceConnectionStatus)

Used to identify the service running on the IOX. Required to use the passthrough channel to communicate with MyGeotab.

| Data | Description |
| --- | --- |
| 1 | Connected = 1 <br> Disconnected = 0 |
| 2-3 | External Device ID |
| 4-5 | Connection flags |

| Bits | Connection flags |
| --- | --- |
| 0 | Reserved |
| 1 | Binary Data Packet Wrapping |
| 2 - 15 | Reserved |

Binary Data Packet Wrapping:
0: The passthrough data from MyGeotab will be passed to the external device without modification.
1: The passthrough data from MyGeotab will be wrapped in a serial protocol before being sent to the external device.
Note: If sending large payloads of variable sizes, it is recommended to use the binary wrapping flag to allow the device to distinguish and accommodate different packet sizes. The device should implement support for both 0x23 and 0x25 message formats as the GO will dynamically select which one to use based on the amount of data within each packet received from MyGeotab. The maximum packet size currently supported is 1000 bytes.

For payloads with a length of 0 - 255 bytes, this format is used:
|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x23 | 1 | 1 |
| Message Body Length = x | 1 | 2 |
| Binary Data | x | 3 |
| Checksum | 2 | 3+x |
| ETX (0x03) | 1 | 5+x |

For payloads with a length of 256 - 1000 bytes, this format is used:
|   | Bytes | Position |
| --- | --- | --- |
| STX (0x02) | 1 | 0 |
| Message Type = 0x25 | 1 | 1 |
| Message Body Length = x | 2 | 2 |
| Binary Data | x | 4 |
| Checksum | 2 | 4+x |
| ETX (0x03) | 1 | 6+x |

More details on the checksum can be found here: [Add-On Protocol - RS232 & USB]({{site.baseurl}}/hardware/addon-protocols/rs232-usb/#checksum)


#### Log Type: 2 (GenericFaultRecord)

Typically used to log a fault condition that needs to be escalated to a supervisor for human intervention.

| Data | Description |
| --- | --- |
| 1-2 | Fault code |
| 3 | Fault = 1 <br> Information = 0 |
| 4 | Log Once Per Trip = 1 <br> Log Every Fault = 0 |

### IOX Multi-Frame Log Data (0x1E)

Sent from the IOX to the GO device when the IOX wants create a log that cannot fit into a single CAN frame. The first frame contains the Type and Length. All frames start with a Frame Counter that is an incrementing sequence number. The first frame always starts with 0x00.

#### Payload First Frame

| Byte # | Byte Description |
| --- | --- |
| 0 | Frame Counter (0x00) |
| 1 | Log Type |
| 2-3 | Data Length |
| 4-7 | Data |

#### Payload Subsequent Frames

| Byte # | Byte Description |
| --- | --- |
| 0 | Frame Counter |
| 1-7 | Data |

#### Log Types

| Parameter Type | Description |
| --- | --- |
| 0 | Third Party Free Format Data |
| 1 | Reserved |
| 2 | Bluetooth Record |
| 3-9 | Reserved |
| 10 | Driver ID |
| 11 | Curve Logging |
| 12 | Logging With Timestamp |
| 13 | Protobuf Data |

#### Type 0 Third Party Free Format Data

The maximum size is 27 bytes. Rate limit is 500 logs per 10 minutes. If you exceed the rate limit, the GO device will stop taking data from the IOX.

| Byte # | Driver ID|
| --- | --- |
| 0-27 | Data |

#### Type 2 Bluetooth Record

Rate limit is 1200 logs per 10 minutes. If you exceed the rate limit, the GO device will stop taking data from the IOX.

| Byte # | Bluetooth Record |
| --- | --- |
| 0-6 | MAC Address |
| 1 | Data Type |
| 2 | FP24 Value |

Further details can be found here: [Add-On Protocol - BLE]({{site.baseurl}}/hardware/addon-protocols/ble/)

#### Type 11 Curve Logging

This message can be used to send the 4byte (int32_t) data that is curve logged by the GO. Additional information about curve logging can be found here: [Curve Logging](https://github.com/Geotab/curve)

| Byte # | Curve Logging |
| --- | --- |
| 0 | Curve Function |
| 1-2 | Status Data ID |
| 3-7 | Data (signed 32bit) |
| 8 | Data Length |
| 9-10 | Allowed Error |
| 11-12 | Estimate Error |
| 12-13 | Deprecated = 0 |
| 14 | Smoothing Coefficient |

| Parameter | Description |
| --- | --- |
| Curve Function | 2 = Add Point <br> 3 = Save Curve |
| Allowed Error | Vertical distance threshold (must be > 0). All points with their vertical distance > threshold are declared as significant points and saved. |
| Estimate Error | If EstimateError > 0 and the new point deviated from estimated value > EstimateError, we will reduce/save the curve. |
| Smoothing Coefficient | Applies a low pass filter to the data. <br> 0 = No filtering <br> 1-254 = Smoothing coefficient magnitude |

#### Type 12 Logging With Timestamp

This message can be used to send status data along with a provided timestamp. 
Possible use cases:
1. Store data in the IOX while the GO device is asleep and send all data after waking up
2. Run the curve logging algorithm in the IOX and send those points to be transmitted to MyGeotab.  
Additional information about curve logging can be found here: [Curve Logging](https://github.com/Geotab/curve)

| Byte # | Curve Logging |
| --- | --- |
| 0-1 | Status Data ID |
| 2 | Data Length |
| 3-6 | Data (unsigned 32bit) |
| 7 | Timestamp (# secs since 2002-01-01) |
| 8 | Milliseconds |

#### Type 13 Protobuf Data

Supported from Add-On protocol version 1.2.

This message allows an IOX to send a protobuf encoded payload to the GO. It supports a publish/subscribe model of vehicle status information. The GO responds with GO Multi-Frame Data (0x27) - Type 13.
[Protobuf Schema](https://github.com/Geotab/android-external-device-example/blob/master/app/src/main/proto/iox_messaging.proto). The currently supported topics are:

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


### Buzzer Beep (0x24)

Sent from an IOX to the GO to request the buzzer beep with the given parameters. 

#### Payload

| Byte # | Byte Description |
| --- | --- |
| 0 | Number of Beeps |
| 1 | Duration (Multiple of 56ms)  |
| 2 | Delay Between Beeps (Multiple of 56ms) |


### IOX Request/Status (0x25)

Sent from the IOX to the GO device to inform the GO device of events or status changes.

#### Payload

| Byte # | Byte Description |
| --- | --- |
| 0-1 | Information Type |
| 2-7 | Optional bytes that depend on the type  |

#### Information Type 0 — Busy

This message is used to inform the GO device that the issuing IOX is busy with some critical tasks and the GO should not enter the sleep state. The IOX should send this message again to release the GO when it has completed its critical tasks.

| Parameter Type | Description |
| --- | --- |
| 0-1 | 0x0000 |
| 2 | 0 = Not busy <br> 1 = Busy |

#### Information Type 1 - Packet Wrapper

This is used to send a packet of up to 1023 bytes of binary data through the GO to MyGeotab.

Usage:
1. Send Packet Wrapper - Beginning of data packet (0).
2. Multiple Rx Data (0x0C) messages until the entire bypass binary data is sent. Pay attention to the Acknowledge (0x14) message responded from GO if the GO Receive-Buffer is ready to accept the next Rx Data (0x0C) message. The streaming flow control bit in the ACK is not relevant for this type of exchange and can be ignored.
3. Send Packet Wrapper - End of data packet (1).
4. At the end, GO sends confirmation with a Application Specific Data (0x1C) Type 0 (Modem transmission result) message to indicate if the packet has been accepted within 6 seconds.

| Parameter Type | Description |
| --- | --- |
| 0-1 | 0x0001 |
| 2 | 0 = Beginning of data packet <br> 1 = End of data packet |

#### Information Type 2 - Request GO Device Data Message

This message is used by an IOX which requires vehicle information from the GO device. This will cause GO to respond with GO Multi-Frame Data (0x27) - Type 2 message.

| Parameter Type | Description |
| --- | --- |
| 0-1 | 0x0002 |
| 2 | Message Version = 2 |

#### Information Type 3 - Connect and Send Records

This message requests the GO modem initiate a connection to the server. 

| Parameter Type | Description |
| --- | --- |
| 0-1 | 0x0003 |
| 2 | Unused |

#### Information Type 4 - Request VIN Message

An IOX uses this message to request the vehicle VIN number from GO. The GO will respond with GO Multi-frame Data (0x27) - Type 3 message.  

| Parameter Type | Description |
| --- | --- |
| 0-1 | 0x0004 |
| 2 | Unused |

#### Information Type 12 - Request Identification of Go device, versions

Supported from protocol version 1.1.

Sent from the IOX to the GO requesting the identification information. The will respond with a GO Multi-Frame Data (0x27) - Type 12 message.

| Parameter Type | Description |
| --- | --- |
| 0-1 | 0x000C |
| 2 | Request info:  <br> 0 = GO serial number  <br> 1 = GO firmware version  <br> 2 = IOX protocol version |


### GO Status Information (0x26)

Sent from the GO to the IOX to pass information the IOX may need. This is a broadcast message. It is sent once any corresponding information type changes.

#### Payload

| Byte # | Byte Description |
| --- | --- |
| 0-1 | Information Type |
| 2-7 | Optional bytes that depend on the type  |

#### Information Type 0 - Ignition

| Parameter Type | Description |
| --- | --- |
| 0-1 | 0x0000 |
| 2 | 0 = Ignition Off <br> 1 = Ignition On |

#### Information Type 1 - Modem Availability

| Parameter Type | Description |
| --- | --- |
| 0-1 | 0x0000 |
| 2 | 0 = Modem is not ready <br> 1 = Modem is available |


### GO Multi-Frame Data (0x27)

Sent from the GO to the IOX when the GO wants to transfer data that can not fit into a single CAN frame. The first frame contains the Type and Length. All frames start with a Frame Counter that is an incrementing sequence number. The first frame always starts with 0x00.

#### Payload First Frame

| Byte # | Byte Description |
| --- | --- |
| 0 | Frame Counter (0x00) |
| 1 | Info Type |
| 2-3 | Data Length |
| 4-7 | Data |

#### Payload Subsequent Frames

| Byte # | Byte Description |
| --- | --- |
| 0 | Frame Counter |
| 1-7 | Data |

#### Info Types

| Parameter Type | Description |
| --- | --- |
| 0 | Reserved |
| 1 | Reserved |
| 2 | GO device data packet |
| 3 | VIN |
| 4-11 | Reserved |
| 12 | GO info |
| 13 | Protobuf Data |

#### Type 2 GO Device Data

Sent in response to IOX Request(0x25) message with Type Request GO Device Data Message (0x02).

| Bytes | GO Device Data |
| --- | --- |
| 0-3 | Timestamp (# secs since 2002-01-01) |
| 4-7 | Latitude (1E-7 deg/bit) |
| 8-11 | Longitude (1E-7 deg/bit) |
| 12 | Road Speed (km/hr) |
| 13-14 | RPM |
| 15-18 | Odometer (0.1 Km/bit) |
| 19 | Status Flags (from LSB): <br> 1st bit: 1 = GPS Valid <br> 2nd bit: 1 = Ignition On <br> 3rd bit: 1 = Engine Bus Activity <br> 4th bit: 1 = Date/Time Valid <br> 5th bit: 1 = Speed From Engine <br> 6th bit: 1 = Odometer From Engine |
| 20-23 | Trip Odometer (0.1 Km/bit) |
| 24-27 | Total Engine Hours (0.1 hours/bit) |
| 28-31 | Trip Duration (1 second/bit) |
| 32-35 | Deprecated |
| 36-39 | Driver ID |
| 40-51 | GO Device Serial Number |

#### Type 3 VIN

Sent in response to IOX Request(0x25) message with Type Request VIN (0x04).

| Bytes | GO Device Data |
| --- | --- |
| 0-16 | VIN |

#### Type 12 GO Info

Supported from protocol version 1.1.
Sent in response to IOX Request/Status (0x25) - Type 12.

##### payload id = 0

| Byte | Byte Description |
| --- | --- |
| 0  | =0 for payload is GO serial number. |
| 1-12 | GO serial number |
| 13 | 0 |

##### payload id = 1

| Byte | Byte Description |
| --- | --- |
| 0  | =1 for payload is GO firmware version number. |
| 1-2 | GO firmware version: Product |
| 3-4 | GO firmware version: Major |
| 5-6 | GO firmware version: Minor |

##### payload id = 2

| Byte | Byte Description |
| --- | --- |
| 0  | =2 for payload is IOX protocol version number. |
| 1-2 | GO firmware version: Major |
| 3-4 | GO firmware version: Minor |

#### Type 13 Protobuf Data

Supported from protocol version 1.2.

This message allows an GO to send a protobuf encoded payload to the IOX. It supports a publish/subscribe model of vehicle status information. It is a response to GO Multi-Frame Data (0x1E) - Type 13.
[Protobuf Schema](https://github.com/Geotab/android-external-device-example/blob/master/app/src/main/proto/iox_messaging.proto).


## Sequence Diagrams

<!--
UML diagrams are generated from https://plantuml.com/
-->

### Handshake

<!--
@startuml handshake
note over GO, IOX: Go Power up
|||
GO -> IOX: RESET (0x00)
|||
GO -> IOX: POLL (0x01)
IOX->GO: 8 byte first POLL_RESPONSE (0x02) (value 01 ...)
GO->IOX: Acknowledgement (0x14)
IOX->GO: ADDITIONAL_INFO (0x03) (optional)
GO->IOX: Acknowledgement (0x14)
IOX->GO: IOX Single Frame Log Data (0x1D)\nType: 1 (ExternalDeviceConnectionStatus)
GO->IOX: Acknowledgement (0x14)
|||
note over GO, IOX: Idle Process
loop every 7 second
GO -> IOX: POLL (0x01)
IOX -> GO: 1 byte POLL_RESPONSE (0x02) (value 00)
GO -> IOX: Acknowledgement (0x14)
end
@enduml
-->

![]({{site.baseurl}}/hardware/developing-an-iox/uml_handshake.png)

### Sleep/Wake

<!--
@startuml sleep_wake
== GO going to Sleep ==
loop 5 times
GO -> IOX: Sleep (0x05)
end
note over IOX: IOX should wait 2s before sleeping
GO -> IOX: Poll (0x01)
IOX -> GO: Poll Response (0x02) (value: 02 = Going to sleep)
GO -> IOX: Acknowledge (0x14)
== GO Wake up ==
loop 5 times
GO -> IOX: Wakeup (0x04)
end
GO -> IOX: Poll (0x01)
IOX -> GO: Poll Response (0x02) (value: 04 = First poll response after wakeup)
GO -> IOX: Acknowledge (0x14)
@enduml
-->

![]({{site.baseurl}}/hardware/developing-an-iox/uml_sleep_wake.png)

### Data Logging

<!--
@startuml data_logging
note over GO, IOX: Inital handshake
== Status Data ==
IOX -> GO: IOX Single Frame Log Data (0x1D)\nType: 0 Generic Data Record
GO -> IOX: Acknowledge (0x14)
note over IOX: Header\n1 byte: Type = 0\n2 bytes: Data ID\n1 byte: Data Length = 0-3
note over IOX: Payload\n4 bytes: Data
== Curve Data ==
IOX -> GO: IOX Multi-Frame Log Data (0x1E)\nType 11: Curve Logging
GO -> IOX: Acknowledge (0x14)
note over GO: Each frame is ACKed
/ note over IOX: Each frame has a 1 byte frame counter
note over IOX: Header\n1 byte: Type = 4\n2 bytes: Data Length = 15
note over IOX: Payload\n1 byte: Curve Function\n\tAdd = 2, Save = 3\n2 bytes: Data ID\n4 bytes: Data\n1 byte: Length\n2 bytes: Allowed Error\n2 bytes: Estimate Error\n2 bytes: Data Interval\n1 byte: Smoothing Coefficient
@enduml
-->

![]({{site.baseurl}}/hardware/developing-an-iox/uml_data_logging.png)

### GO Info

<!--
@startuml go_info
autonumber
note over GO, IOX: Inital handshake
== Periodic timestamp request from IOX ==
IOX -> GO: IOX Request/Status (0x25)\nType 2 - Request GO Device Data Message
note over IOX: Message Version 2
GO->IOX: Acknowledgement (0x14)
GO->IOX: GO Multi-Frame Data (0x27)\nType 2 - GO Device Data Message Version 2
note over IOX: Each frame has a 1 byte frame counter
note over IOX: Header\n1 byte: Type = 2\n2 bytes: Data Length = 51
note over IOX: Payload\n4 bytes: Timestamp\n4 bytes: Latitude\n4 bytes: Longitude\n1 byte: Speed\n2 bytes: RPM\n4 bytes: Odometer\n1 byte: Flags\n4 bytes: Trip Odometer\n4 bytes: Engine Hours\n4 bytes: Trip Duration\n4 bytes: Deprecated\n4 bytes: Driver ID\n11 bytes: GO Serial Number
IOX->IOX: Receive all 7 frames\nAssemble complete message
@enduml
-->

![]({{site.baseurl}}/hardware/developing-an-iox/uml_go_info.png)

### PubSub

<!--
@startuml pubsub
autonumber
note over GO, IOX: Inital handshake
== PubSub - IOX Protocol Layer ==
note over GO: GO Multi-Frame Data (0x27)\nType 13: Protobuf data
/ note over IOX: IOX Multi-Frame Log Data (0x1E)\nType 13: Protobuf data
== PubSub - Protobuf Contents ==
IOX -> GO: Get a list of all subscribable topics
GO->IOX: Topic list
|||
IOX -> GO: Subscribe to a topic
GO->IOX: Subscribe ack
|||
GO->IOX: Publish on a topic
@enduml
-->

![]({{site.baseurl}}/hardware/developing-an-iox/uml_pubsub.png)

### MIME

<!--
@startuml mime
note over GO, IOX: Inital handshake
== MIME data from GO ==
loop N/8 times with up to 8 bytes of data in each frame
GO -> IOX: TX Data (0x0B)
end
note over GO: AddOn Wrapper - 1 byte data length\n1 byte: STX\n1 byte: Type = 0x23\n1 bytes: Data Length N\nN bytes: Data\n2 bytes: Checksum\n1 byte: ETX
note over GO: AddOn Wrapper - 2 byte data length\n1 byte: STX\n1 byte: Type = 0x25\n2 bytes: Data Length N\nN bytes: Data\n2 bytes: Checksum\n1 byte: ETX
== MIME data to GO ==
IOX -> GO: IOX Request/Status (0x25)\nType 1 - Packet Wrapper
note over IOX: 2 bytes: Type = 1\n1 byte: Beginning = 0
loop N/8 times with up to 8 bytes of data in each frame
GO <- IOX: TX Data (0x0C)
end
IOX -> GO: IOX Request/Status (0x25)\nType 1 - Packet Wrapper
note over IOX: 2 bytes: Type = 1\n1 byte: End = 1
|||
GO -> IOX: Application Specific Data (0x1C)\nType 0: Modem transmission result
note over GO: 1 byte: Type = 0\n1 byte: Result (0 = Fail, 1 = Success)
@enduml
-->

![]({{site.baseurl}}/hardware/developing-an-iox/uml_mime.png)