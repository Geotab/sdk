---
layout: page
permalink: /hardware/addon-protocols/can/
title: Add-On Protocol - CAN
--- 

External devices can communicate with the Geotab GO device through the revised Third-Party Data CAN protocol. The hardware interface will be the [IOX-CAN](https://www.geotab.com/documentation/iox-can/). Two-way communication is supported, allowing a MyGeotab API call to produce messages on the connected CAN network using the IOX-CAN. An initial handshake is required before messages can be produced using the IOX-CAN.

The GO device will start processing third-party data if it is in the correct format. Once processed, the third-party data will be saved and sent to MyGeotab as Status Data.

## Integration Process

The following process should be followed when attempting to integrate a third-party device with the GO device using our Third-Party Data CAN Protocol:

### 1 - Request External Device ID

Contact [Geotab Solution Engineering team](mailto:soleng@geotab.com) to obtain an External Device ID for your third-party device. This will allow us to uniquely identify your device when it connects to a GO device. Thereafter, any connection established by that type of external device will be recorded as Status Data in MyGeotab under the naming format &quot;[External device name] device connected&quot;.

### 2 - Request Status Data IDs

Contact [Geotab Solution Engineering team](mailto:soleng@geotab.com) to obtain Status Data IDs for every individual piece of information you wish to send to the GO device. For each piece of information, conversion parameters are also required. Conversions must be in the form as per the examples below:

| Status Data ID | Description | Multiplier | Offset | Unit |
| --- | --- | --- | --- | --- |
| 5 (assigned by Geotab) | Odometer | 0.1 | 0 | km |
| 53 (assigned by Geotab) | Outside Temperature | 1 | –40 | degrees C |

A multiplier and offset must be supplied by the third-party vendor when requesting Status Data IDs so that MyGeotab can convert the data.

The GO device will relay the raw data sent by the external device to MyGeotab. MyGeotab will then take the raw value received from the GO device and adjust by the multiplier and the offset. When MyGeotab applies the conversion, the multiplier is always done first, followed by the offset, as per the formula:

Final Value = (Initial Value × Multiplier) + Offset

For example, if you are reporting a temperature range from -40 °C to 215 °C, the third-party device would send values from 0 to 255 (can&#39;t send negative values). The offset would be set to -40 so that MyGeotab would know to subtract 40 from the value obtained from the GO device. So a reported value of 0 by the third-party device would show up as -40 °C in MyGeotab.

Another example: The third-party device is sending a distance in 0.1 km increments, such that a value of 1223 represents a distance of 122.3 km. A multiplier of 0.1 should be applied so that the value is properly converted to kilometers on MyGeotab.

The unit refers to the unit of measurement that you wish to see in MyGeotab after all the conversions are complete. Geotab uses metric units and all predefined status IDs currently used by Geotab are in metric units.

### 3 - Implement the Third-Party CAN Protocol

Implement the Third-Party CAN Protocol in the external device as detailed below. The CAN speed to be used will be 250K or 500K and the external device should have its CAN transceiver set to normal mode. The IOX CAN will auto-baud between 250K and 500K.

### CAN ID

The CAN ID will be an extended frame message (29-bit) and will be broken down into 4 bytes with the most significant byte (MSB) (byte 1) containing 5 bits to make up the 29-bit ID header. A breakdown of the CAN ID is shown below:

| Byte | Description | Value |
| --- | --- | --- |
| Byte 1 | MSB, 5 bits | 0 |
| Byte 2 and 3 | Geotab&#39;s Parameter Group Number (PGN) | 0x0FDB |
| Byte 4 | Message Type | Varied |

#### Data Length (DLC)

Indicates how many bytes of data are being sent (up to a maximum of 8).

#### Data

All values must be sent with the least significant byte first.

Each piece of information related to the third-party device must be sent individually and have its own Status Data ID as part of the message.

Note: See [Appendix A](#appendix-a-raw-message-data-example-for-iox-can) for an example of raw message data.

#### Handshake
An initial Handshake **is required** in order for the GO device to accept MyGeotab API calls to produce CAN messages from the IOX-CAN. Ignition must be on for the handshake process.

1. After powering up, the GO device will enter an external device detection cycle. The GO device will listen for a [Msg Type 0x81](#msg-type-0x81-third-party-device-id) from the external device. This message is used to indicate that an external device is present.
  - The external device must send this message once per second.
2. The GO device will reply with a [Msg Type 0x02](#msg-type-0x02-third-party-data-acknowledge) to acknowledge it has received the external device ID. After detecting this response, the external device may stop broadcasting Msg Type 0x81.
3. The MyAdmin API can now be used to produce CAN messages from the IOX-CAN as detailed in [Messages from MyGeotab](#messages-from-mygeotab)

## Messages from GO device

### Msg Type 0x02: Third-Party Data Acknowledge

Issued by the GO device on receipt of Third-Party Data from the External Device.

| CAN ID Breakdown | Value |
| --- | --- |
| Byte 1 | 0x00 |
| Byte 2 (Geotab PGN) | 0x0F |
| Byte 3 (Geotab PGN) | 0xDB |
| Byte 4 (Message Type) | 0x02 |
| Data Length |   |
| DLC | 1 |
| Data Breakdown |   |
| Data 1 | The Message Type acknowledged |

## Messages from External Device

### Msg Type 0x81: Third-Party Device ID

Issued by the external device on power-up every second until the Acknowledge message (Msg Type 0x02) is received.

| CAN ID Breakdown | Value |
| --- | --- |
| Byte 1 | 0x00 |
| Byte 2 (Geotab PGN) | 0x0F |
| Byte 3 (Geotab PGN) | 0xDB |
| Byte 4 (Message Type) | 0x81 |
| Data Length | Value |
| DLC | 2 |
| Data Breakdown | Value |
| Data 1–2 | Device ID (assigned by Geotab) |
| Reply: Third-Party Device ID Ack |

### Msg Type 0x80: Third-Party Data as Status Data

Issued by the external device whenever it wants Third-Party Data saved on the GO device.

| CAN ID Breakdown | Value |
| --- | --- |
| Byte 1 | 0x00 |
| Byte 2 (Geotab PGN) | 0x0F |
| Byte 3 (Geotab PGN) | 0xDB |
| Byte 4 (Message Type) | 0x80 |
| Data Length | Value |
| DLC | 6 |
| Data Breakdown | Value |
| Byte 1–2 | Status Data ID |
| Byte 3–6 | Status Data |
| Reply: Third-Party Data Ack (Msg Type 0x02) |

### Msg Type 0x82: Free Format Third-Party Data

Currently not implemented.

### Msg Type 0x87: Third-Party Data as Priority Status Data

Priority Status Data will follow an expedited processing workflow on the GoDevice but will otherwise be treated the same as the 0x80 Status Data message. It will also be logged using an Iridium modem connection if available.

| CAN ID Breakdown | Value |
| --- | --- |
| Byte 1 | 0x00 |
| Byte 2 (Geotab PGN) | 0x0F |
| Byte 3 (Geotab PGN) | 0xDB |
| Byte 4 (Message Type) | 0x87 |
| Data Length | Value |
| DLC | 6 |
| Data Breakdown | Value |
| Byte 1–2 | Status Data ID |
| Byte 3–6 | Status Data |
| Reply: Third-Party Data Ack (Msg Type 0x02) |

## Messages from MyGeotab

A [handshake](#handshake) must be completed before this functionality will work. To send messages from MyGeotab to the external device, please download the source code of the [Starter Kit](https://geotab.github.io/sdk/software/js-samples/#starter-kit) sample, and replace the [Sample API](https://github.com/Geotab/sdk/blob/master/src/software/js-samples/starterKit.html#L76) with the following script. The alternative is paste the script in the [Runner](https://geotab.github.io/sdk/software/api/runner.html).
```javascript
    api.call("Add", {
                "typeName": "TextMessage",
                "entity": {
                  "isDirectionToVehicle": true,
                  "activeFrom": "1986-01-01T00:00:00.000Z",
                  "activeTo": "2050-01-01T00:00:00.000Z",
                  "messageContent": {
                    "contentType": "CAN",  
                    "channel": 1,                   //Taken from Get<IoxAddOn> call
                    "arbitrationId":  217055107,    //Fixed value do not change
                    "isAcknowledgeRequired": true,
                    "extendedFrameFlag": true,
                    "data": base64_encoded_byte     //Replace with your data encoded in base64
                  },
                  "device": {
                    "id": device.id                 //Replace with device id of interest
                  }
                }
              }, function(result) {
                  console.log("Done: ", result);
              }, function(e) {
                  console.error("Failed:", e);
              });
```

## Appendix

### Appendix A: Raw Message Data Example for IOX-CAN

Third-Party Device ID from External Device (4208 is a test Device ID).

(Device ID: 4208 = 0x1070)

CAN ID: 0x000FDB81

DLC: 02

Data: 0x70, 0x10

Third-Party Device ID Acknowledge from GO device

CAN ID: 0x000FDB02

DLC: 01

Data: 0x81

…

Third-Party Data from External Device

(Status Data ID: 9999 = 0x270F, Data Value: 230 = 0x000000E6)

CAN ID: 0x000FDB80

DLC: 06

Data: 0x0F, 0x27, 0xE6, 0x00, 0x00, 0x00

Third-Party Data Acknowledge from GO device

CAN ID: 0x000FDB02

DLC: 01

Data: 0x80
