---
layout: page
permalink: /hardware/developing-an-iox/messaging-protocol/
title: IO Expander Protocol
---

## General Description

The GO device and the Input-Output Expander (IOX) are connected in a dedicated CAN network. All communication is between the GO device and the IOX — IOXs do not talk to each other. Communications can be of the form: GO device to all IOXs, GO device to individual IOX, or individual IOX to GO device.

### IO Expander Messages

Message identification is done with an arbitration ID.

The Arbitration ID Field for IOX Messages:

| Bits | 28 to 22 | 21 to 16 | 15 to 0 |
| --- | --- | --- | --- |
| Contents | Reserved: 0 | Message: 0–63 | All Expanders: 0Expander ID: 1–65535 |

0x1FC00000 IO\_EXPANDER\_RESERVED\_MASK

0x003F0000 IO\_EXPANDER\_COMMAND\_MASK

0x0000FFFF IO\_EXPANDER\_ID\_MASK

### IO Expander ID

The last 2 bytes of the IOX serial number (MSB first) are used as the ID. This allows the GO device to identify the source of a message or, when the message is sent from the GO device, to identify the destination IOX.

The GO device sends messages with ID 0x0000 meant for all IOXs, or with an ID between 0x0001 and 0xFFFF when it is targeted at a specific IOX.

IOXs always use their own ID when sending messages. They never send 0x0000. For this reason, IOXs are not produced with serial numbers ending in 0x0000.

### Acknowledge Process

1. Each IO Expander should receive an ACK from the GO device for every message sent. If an ACK is not received within 100 ms, the IO Expander should repeat the message before sending anything else.
2. The first poll after reset allows up to 1 second for the acknowledge to come in before repeating.
3. When a global message (addressed to 0x0000) requiring a response is received by the IO Expanders, the IO Expanders should respond with a delay of up to 70 ms in order to prevent all IO Expanders from trying to respond at the same time. This delay should be random and the seed for the randomizer must be based on the IOX&#39;s serial number.

## Polling

After powering up, the GO device will poll all devices every 7 seconds. They all have to respond to this poll by obeying the ACK rules.

### Device Removed

If the GO device fails to see a device that used to be connected (i.e. the device was disconnected), the GO device will remove the IOX from its internal database after 5 attempts (35 seconds) and will make the slot available for a new device that can be connected at any time.

### New Device

Any IOX that is connected to the GO device must respond to the poll request. The GO device will notice the new Expanders and add them to its internal database.

### Harness Autodetect

IO Expanders will be used for only one function at a time. This function could be: Garmin, Iridium, Third-Party Serial, RFID, Auxiliary 1 to 4, Auxiliary 5 to 8, and other future possibilities. The harness used to connect an IO Expander to each of these devices is unique to the application. IO Expanders have a harness ID programmed into their EEPROM. The harness ID is provided to the GO device during handshaking.

Auxiliary IOXs can be 1 to 4 and 5 to 8; a short between 2 unused lines is used to identify if the auxiliary is set as 1 to 4. The absence of this short indicates it set as 5 to 8. On startup, before handshaking takes place, the IO Expander attempts to determine which auxiliary harness it is attached to by selectively driving one of the shorted lines (output) and seeing if the line it is attached to (input) follows it (meaning it is shorted).

## Commands

### Reset (0x00)

Directed to all devices. Instructs all devices to reset and behave as if they have just powered up. IO Expanders should throw out any setup information they might have received, de-assert hardware control lines, and open their relays.

### Poll (0x01)

Sent by the GO device in broadcast fashion to all units to check if they are there.

### Poll Response (0x02)

Sent by the IO Expanders when a poll is received. The ACK procedure must be obeyed.

#### Payload — Poll Response

| Byte # | Byte Description |
| --- | --- |
| 0 | Bit 0 | 0 = Have been polled before.1 = First poll after power up. |
| Bit 1 | 0 = Not Going to Sleep.1 = Going to Sleep. |
| Bit 2 | 0 = Normal reply.1 = First poll response after wake up. |
| Bit 3 | 0 = Power Supply 1 disabled.1 = Power Supply 1 enabled. |
| Bit 4 | 0 = Power Supply 2 disabled.1 = Power Supply 2 enabled. |
| Bit 5 | Power Supply 1 overcurrent. |
| Bit 6 | Power Supply 2 overcurrent. |
| Bit 7 | Reserved |
| Following Bytes are only sent on first poll-response after power (when Byte 1 Bit 0 is 1). |
| 1 | Firmware Version Major Revision |
| 2 | Firmware Version Minor Revision |
| 3 | 2 Most significant bytes of serial number |
| 4 |
| 5 | Reset Reason0 —  Power Reset1 —  Reset Command2 —  New FirmwareAll others reserved. |
| 6 | Bit 0 | Loop Back Info:0 — No Loop Backs1 — Aux 1 to 4 Loopback |
| Bit 1 |
| Bit 2 |
| Bit 3 |   |
| Bit 4 |   |
| Bit 5 |   |
| Bit 6 |   |
| Bit 7 |   |
| 7 | 0 — Digital Aux Harness1 — Garmin Harness2 — Iridium Harness3 — RF-ID Harness4 — RS-232 Harness5 — HOS Harness6 — WIFI7 — NFC8 — Dickey John9 — Analog Aux10 — USB Charger11 — Buzzer12 — CAN13 — USB Charger &amp; Comm V114 — TTS15 — Rexroth16 — Output17 —Reserved18 — Bluetooth19 — Alert20 — USB Charger &amp; Comm V2All others reserved. |

When the &quot;Go to Sleep&quot; command is received, and before actually going to sleep, the devices will indicate they are going to sleep through the indicated bit. This bit is cleared on wakeup.

### Additional Info (0x03)

Sent by the IOX after an ACK for the first poll is received.

#### Payload — Additional Info

| Byte # | Byte Description |
| --- | --- |
| 0 | Software Version Control Number(Ex: SVN Version, Git SHA) |
| 1 |
| 2 |
| 3 |
| 4 | Product Version |
| 5 | Bit 0 | 0 = TX not connected to RX1 = TX connected to RX |
| Bit 1 | 0 = TX not connected to CTS1 = TX connected to CTS |
| Bit 2 | 0 = TX not connected to DCD1 = TX connected to DCD |
| Bit 3 |   |
| Bit 4 | 0 = RTS not connected to RX1 = RTS connected to RX |
| Bit 5 | 0 = RTS not connected to CTS1 = RTS connected to CTS |
| Bit 6 | 0 = RTS not connected to DCD1 = RTS connected to DCD |
| Bit 7 |   |
| 6 | Error Condition0 — No error1 — Memory allocation error |
| 7 | Hardware Versionv1 = 0 or 0xFFv1.4 = 1v2 = 2 |

### Wakeup (0x04)

Wakes up all the IO Expanders from Sleep Mode. Will be sent by the GO at least twice within a space of 10 ms.

### Sleep (0x05)

Causes all IO Expanders to go into Sleep Mode. Devices will enter Sleep Mode no sooner than 2 seconds, and not more than 20 seconds after receiving this command. In the meantime, they will report, through the poll response, that they are going to sleep.

### TX Data (0x0B)

Data sent from the GO device to the addressed IO Expander.

#### Payload — TX Data

| Byte # | Byte Description |
| --- | --- |
| 0 | Data to transmit |
| 1 |
| 2 |
| 3 |
| 4 |
| 5 |
| 6 |

### RX Data (0x0C)

Data sent from an IO Expander to the GO device. The GO will reply with an ACK.

#### Payload — RX Data

| Byte # | Byte Description |
| --- | --- |
| 0 | Received data |
| 1 |
| 2 |
| 3 |
| 4 |
| 5 |
| 6 |

### Acknowledge (0x14)

Sent by the GO device to indicate that a message has been acknowledged.

The ACK to an RX Data frame includes 1 more byte of data. This data is used as flow control. When the 80% watermark of the receive buffer has been reached, the flow control bit will tell the IOX to hold off sending messages for 50 ms. The IOX will send the next frame at the end of these 50 ms and, depending on the flow control bit of the ACK, it will either keep on sending messages or will delay for another 50 ms, thus repeating the process. The GO device will clear the flow control bit whenever the buffer is below the 20% watermark.

#### Payload

| Byte # | Byte Description |
| --- | --- |
| 0 | Bit | Bit Description | This byte is only sent when needed. |
| 0 | 0 = Clear to send more UART Data.1 = Stop sending UART Data. Buffer 80% full, withhold next frame 50 ms. |
| 1 |   |
| 2 |   |
| 3 |   |
| 4 |   |
| 5 |   |
| 6 |   |
| 7 |   |

### Application Specific Data (0x1C)

Sent by the GO device after a packet wrapped passthrough message attempt to the server.

#### Type 0: Modem transmission result

| **Byte #** | **Byte Description** |
| --- | --- |
| 0 | Log Type |
| 1 | MODEM\_RESULT\_FAILED = 0,MODEM\_RESULT\_SUCCESS = 1, |
| 2 | Data |
| 3 | Data |
| 4 | Data |
| 5 | Data |
| 6 | Data |
| 7 | Data |

### IOX Single Frame Log Data (0x1D)

Sent from the IOX to the GO device when the IOX wants create a log that can fit into a single CAN frame.

#### Payload

| Byte # | Byte Description |
| --- | --- |
| 0 | Log Type |
| 1 | Data |
| 2 | Data |
| 3 | Data |
| 4 | Data |
| 5 | Data |
| 6 | Data |
| 7 | Data |

#### Log Type: 0 (GenericDataRecord)

#### Log Type: 3 (PriorityDataRecord)

| Data | Description |
| --- | --- |
| 1 | Data ID |
| 2 |
| 3 | Length |
| 4 | Data |
| 5 |
| 6 |
| 7 |

#### Log Type: 1 (externalDeviceConnectionStatus)

| Data | Description |
| --- | --- |
| 1 | Connected = 1, Disconnected = 0 |
| 2 | Data ID |
| 3 |

#### Log Type: 2 (GenericFaultRecord)

| Data | Description |
| --- | --- |
| 1 | Fault code |
| 2 |
| 3 | Active / Inactive |
| 4 | Log Once Per Trip / Log Every Fault |

### IOX Multi-Frame Log Data (0x1E)

Sent from the IOX to the GO device when the IOX wants create a log that cannot fit into a single CAN frame. The first frame contains the Type and Length. All frames start with a Frame Counter that is an incrementing sequence number. The first frame always starts with 0x00. The frame counter will roll over to 0x00 after it reaches 0xFF.

#### Payload First Frame

| Byte # | Byte Description |
| --- | --- |
| 0 | Frame Counter (0x00) |
| 1 | Log Type |
| 2 | Length |
| 3 |
| 4 | Data |
| 5 | Data |
| 6 | Data |
| 7 | Data |

#### Payload Subsequent Frames

| Byte # | Byte Description |
| --- | --- |
| 0 | Frame Counter |
| 1 | Data |
| 2 | Data |
| 3 | Data |
| 4 | Data |
| 5 | Data |
| 6 | Data |
| 7 | Data |

#### Log Types

| Parameter Type | Description |
| --- | --- |
| 0 | Third Party Free Format Data |
| 1 | HOS Info Message |
| 2 | Bluetooth Record |
| 3 | Reserved |
| 4 | Reserved |

### IOX Status Information (0x25)

Sent from the IOX to the GO device to inform the GO device of events or status changes.

#### Payload

| Byte # | Byte Description |
| --- | --- |
| 0 | Information Type |
| 1 |
| 2 |   |
| 3 |   |
| 4 |   |
| 5 |   |
| 6 |   |
| 7 |   |

#### Information Type 0 — Busy

| Parameter Type | Description |
| --- | --- |
| 0 | 0x0000 |
| 1 |
| 2 | 0 - Not busy1 - Busy |

#### Information Type 1 - Packet Wrapper

| Parameter Type | Description |
| --- | --- |
| 0 | 0x0001 |
| 1 |
| 2 | 0 - Beginning of data packet1 - End of data packet |

#### Information Type 2 - Request GO Device Data Message

| Parameter Type | Description |
| --- | --- |
| 0 | 0x0002 |
| 1 |
| 2 | Message Version (1 or 2) |

#### Information Type 3 - Connect and Send Records

| Parameter Type | Description |
| --- | --- |
| 0 | 0x0003 |
| 1 |
| 2 | Unused |

### GO Status Information (0x26)

Sent from the GO to the IOX to pass information the IOX may need.

#### Payload

| Byte # | Byte Description |
| --- | --- |
| 0 | Information Type |
| 1 |
| 2 |   |
| 3 |   |
| 4 |   |
| 5 |   |
| 6 |   |
| 7 |   |

#### Information Type 0 - Ignition

| Parameter Type | Description |
| --- | --- |
| 0 | 0x0000 |
| 1 |
| 2 | 0 - Ignition Off1 - Ignition On |

### Pass through CAN Message (0x27) (0x28)

Sent from the IOX to pass a raw CAN message to the the GO device, encapsulated in the IOX private bus protocol. This message is meant for third-party companies developing their own IOXs and wanting to transfer CAN messages.

Both messages must be Acked by the GO device. 0x28 cannot be sent until 0x27 has been acked.

#### Payload (0x27)

| Byte # | Byte Description |
| --- | --- |
| 0 | Encapsulated CAN message Arbitration ID. LSB format. |
| 1 |
| 2 |
| 3 |
| 4 | Bit 0: Remote Frame (not used)Bit 1: Extended frame (0 = 11 bit Arb ID, 1 = 29 bit Arb ID)Bit 2 to Bit 7: Reserved. Must be 0. |
| 5 | Encapsulated CAN message DLC: 0 to 8 |

#### Payload (0x28)

| Byte # | Byte Description |
| --- | --- |
| 0 | Encapsulated CAN message data. Actual number of bytes present must match the DLC indicated in the previous message (0x27) |
| 1 |
| 2 |
| 3 |
| 4 |
| 5 |
| 6 |
| 7 |