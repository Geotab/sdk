---
layout: page
permalink: /hardware/developing-an-iox/messaging-protocol/
title: IO Expander Protocol
---

## General Description

The GO device and the Input-Output Expander (IOX) are connected in a dedicated CAN network. All communication is between the GO device and the IOX. IOXs do not talk to each other. Communications can be of the form: GO device to all IOXs, GO device to individual IOX, or individual IOX to GO device.

### Interoperability

Third party IOX Add-ons rely on the messages and protocol defined in this document in order to properly communicate with Geotab firmware. Geotab will endeavor to maintain support for the currently-documented messages and protocol. However, from time to time Geotab may make changes to such messages and protocol which could potentially impact third party IOX Add-on implementations. If Geotab makes any such changes, Geotab will use commercially reasonable efforts to provide partners with as much notice of the impending firmware changes as is practicable in the circumstances. Geotab accepts no responsibility or liability for third party IOX Add-ons which fail to function properly, or at all, and any and all damages which arise, directly or indirectly, from such failures.

Geotab recommends that all partners who develop their own IOX Add-ons ensure they have the ability to remotely update their firmware. This can be accomplished by sending an update to the IOX Add-on using the MIME passthrough messages.

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

0x1FC00000 IO\_EXPANDER\_RESERVED\_MASK

0x003F0000 IO\_EXPANDER\_COMMAND\_MASK

0x0000FFFF IO\_EXPANDER\_ID\_MASK

### Address ID

The last 2 bytes of the IOX Serial Number (MSB first) are used as the Address ID. This allows the GO device to identify the source of a message or, when the message is sent from the GO device, to identify the destination IOX.

The GO device sends messages with ID 0x0000 meant for all IOXs, or with an ID between 0x0001 and 0xFFFF when it is targeted at a specific IOX.

IOXs always use their own ID when sending messages. They never send 0x0000. For this reason, IOXs are not produced with Serial Numbers ending in 0x0000.

### IOX ID
Each model of IOX is assigned an IOX ID by Geotab, similar to each model of car having a model name. Integrators shall contact Geotab to get an IOX ID assigned. The IOX ID does not need to be included in the IOX Serial Number. Integrator shall report the IOX ID in byte 7 of the Poll Response (0x02).

### Acknowledge Process

1. Each IOX should receive an ACK from the GO device for every message sent. If an ACK is not received within 100 ms, the IOX should repeat the message before sending anything else.
2. The first poll after reset allows up to 1 second for the acknowledge to come in before repeating.
3. When a global message (addressed to 0x0000) requiring a response is received by an IOX, the IOX should respond with a delay of up to 70 ms in order to prevent all IOXs from trying to respond at the same time. This delay should be random and the seed for the randomizer must be based on the IOX&#39;s Serial Number.

## Polling

After powering up, the GO device will poll all IOXs every 7 seconds. Each IOX must respond to this poll by obeying the ACK rules.

### Device Removed

If the GO device fails to see an IOX that used to be connected (i.e. the IOX was disconnected), the GO device will remove the IOX from its internal database after 5 attempts (35 seconds) and will make the slot available for a new IOX that can be connected at any time.

### New Device

Any IOX that is connected to the GO device must respond to the poll request. The GO device will notice the new IOXs and add them to its internal database.

### Undocumented messages

An IOX could receive messages from the GO device that are not documented here. The IOX must be capable of handling this situation by ignoring/discarding the unknown messages.

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

Wakes up all the IOXs from Sleep Mode. Will be sent by the GO at least twice within a space of 10 ms.

### Sleep (0x05)

Causes all IOXs to go into Sleep Mode. Devices will enter Sleep Mode no sooner than 2 seconds, and not more than 20 seconds, after receiving this command. In the meantime, they will report through the poll response that they are going to sleep.

### TX Data (0x0B)

Data sent from the GO device to the addressed IOX.

#### Payload — TX Data

| Byte # | Byte Description |
| --- | --- |
| 0-7 | Data to transmit |

### RX Data (0x0C)

Data sent from an IOX to the GO device. The GO will reply with an ACK.

#### Payload — RX Data

| Byte # | Byte Description |
| --- | --- |
| 0-7 | Received data |

### Acknowledge (0x14)

Sent by the GO device to indicate that a message has been acknowledged.

The ACK to most messages contains 0 bytes of data. One exception is the ACK to an RX Data frame which includes 1 byte of data. This data is used as a flow control. When the 80% watermark of the receive buffer has been reached, the flow control bit will tell the IOX to hold off sending messages for 50 ms. The IOX will send the next frame at the end of these 50 ms and, depending on the flow control bit of the ACK, it will either keep on sending messages or will delay for another 50 ms, thus repeating the process. The GO device will clear the flow control bit whenever the buffer is below the 20% watermark.

#### Payload

| Byte #     | Byte Description |
| --- | --- |
| 0 - Bit 0 | 0 = Clear to send more UART Data. <br> 1 = Stop sending UART Data. Buffer 80% full, withhold next frame 50 ms. |
| 1 - Bit 1-7 | Reserved |

### Application Specific Data (0x1C)

Sent by the GO device after a packet wrapped passthrough message attempt to the server. A 'rejected' response from the modem typically means it is not connected. If the message is 'accepted' this means it was added to the modem's TCP socket buffer. It is not a confirmation the message was successfully sent.

#### Type 0: Modem transmission result

| **Byte #** | **Byte Description** |
| --- | --- |
| 0 | Log Type |
| 1 | 0 = Rejected. <br> 1 = Accepted. |


### IOX Single Frame Log Data (0x1D)

Sent from the IOX to the GO device when the IOX wants to create a log that can fit into a single CAN frame.

#### Payload

| Byte # | Byte Description |
| --- | --- |
| 0 | Log Type |
| 1-7 | Data |

#### Log Type: 0 (GenericDataRecord)

#### Log Type: 3 (PriorityDataRecord)

| Data | Description |
| --- | --- |
| 1-2 | Data ID |
| 3 | Length |
| 4-7 | Data |

#### Log Type: 1 (externalDeviceConnectionStatus)

| Data | Description |
| --- | --- |
| 1 | Connected = 1, Disconnected = 0 |
| 2-3 | Data ID |
| 4-5 | Connection flags |

#### Log Type: 2 (GenericFaultRecord)

| Data | Description |
| --- | --- |
| 1-2 | Fault code |
| 3 | Active / Inactive |
| 4 | Log Once Per Trip / Log Every Fault |

### IOX Multi-Frame Log Data (0x1E)

Sent from the IOX to the GO device when the IOX wants create a log that cannot fit into a single CAN frame. The first frame contains the Type and Length. All frames start with a Frame Counter that is an incrementing sequence number. The first frame always starts with 0x00.

#### Payload First Frame

| Byte # | Byte Description |
| --- | --- |
| 0 | Frame Counter (0x00) |
| 1 | Log Type |
| 2-3 | Length |
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


### IOX Request/Status (0x25)

Sent from the IOX to the GO device to inform the GO device of events or status changes.

#### Payload

| Byte # | Byte Description |
| --- | --- |
| 0-1 | Information Type |
| 2-7 | Optional bytes that depend on the type  |


#### Information Type 0 — Busy

| Parameter Type | Description |
| --- | --- |
| 0-1 | 0x0000 |
| 2 | 0 = Not busy <br> 1 = Busy |

#### Information Type 1 - Packet Wrapper

| Parameter Type | Description |
| --- | --- |
| 0-1 | 0x0001 |
| 2 | 0 = Beginning of data packet <br> 1 = End of data packet |

#### Information Type 2 - Request GO Device Data Message

| Parameter Type | Description |
| --- | --- |
| 0-1 | 0x0002 |
| 2 | Message Version (1 or 2) |

#### Information Type 3 - Connect and Send Records

| Parameter Type | Description |
| --- | --- |
| 0-1 | 0x0003 |
| 2 | Unused |

#### Information Type 4 - Request VIN Message

| Parameter Type | Description |
| --- | --- |
| 0-1 | 0x0004 |
| 2 | Unused |

### GO Status Information (0x26)

Sent from the GO to the IOX to pass information the IOX may need.

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


### GO Multi-Frame Data (0x27)

Sent from the GO to the IOX when the GO wants to transfer data that can not fit into a single CAN frame. The first frame contains the Type and Length. All frames start with a Frame Counter that is an incrementing sequence number. The first frame always starts with 0x00.

#### Payload First Frame

| Byte # | Byte Description |
| --- | --- |
| 0 | Frame Counter (0x00) |
| 1 | Log Type |
| 2-3 | Length |
| 4-7 | Data |

#### Payload Subsequent Frames

| Byte # | Byte Description |
| --- | --- |
| 0 | Frame Counter |
| 1-7 | Data |

#### Log Types

| Parameter Type | Description |
| --- | --- |
| 0 | Reserved |
| 1 | Reserved |
| 2 | GO device status packet |
| 3 | VIN |
