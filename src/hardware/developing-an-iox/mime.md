---
layout: page
permalink: /hardware/developing-an-iox/mime-protocol/
title: MIME Protocol
---

## MIME
The MIME protocol can be used to exchange data between MyGeotab and an external device when the total message size exceeds the packet.
* When sending messages from MyGeotab to the external device: MyGeotab will break the larger message into smaller packets for transmission.
* When sending messages from the external device to myGetoab: MyGeotab will reassemble the individual packets into the complete message.

## Prerequisites
* An external device must be connected, and its external device ID must be in the range of 4200-4299
  * This connection is established using IOX-specific messaging, such as [message 0x1D]({{site.baseurl}}/hardware/developing-an-iox/messaging-protocol/#iox-single-frame-log-data-0x1d) for custom IOX devices or [message 0x81]({{site.baseurl}}/hardware/addon-protocols/rs232-usb/#msg-type-0x81-handshake-confirmation) for IOX-RS232/USB
  * [Contact Solutions Engineering]({{site.baseurl}}/hardware/addon-protocols/rs232-usb/#contact-solutions-engineering) with integration details if you require an external device ID for your integration

### Protocol
The complete MIME message is broken into chunks and sent as binary data packets. The first byte within the message is a sequence counter. All the remaining bytes contain the MIME data.

#### Binary data packets
To accommodate external devices with memory constraints, the packet size is adjustable when sending messages to/from MyGeotab. The packets have a maximum size of 1000 bytes.
 
|   | Bytes | Position |
| --- | --- | --- |
| Sequence number [1] | 1 | 0 |
| MIME data | x |  1 |

[1] A sequence number of 0 is only used for the first packet. The sequence number increments by 1 for each subsequent packet. If the sequence number reaches 255 (0xFF) and more packets need to be sent, the sequence number must reset to a value of 1 and continue counting.

#### MIME data
 
|   | Bytes | Position |
| --- | --- | --- |
| MIME type length = x | 1 |  0 |
| MIME type in ASCII | x | 1 |
| Payload Length = y | 4 | 1 + x |
| Binary Payload| y | 5 + x |


#### Acknowledge message
When transferring MIME data from the external device to MyGeotab, once the complete message is received MyGeotab will reply with an acknowledge message indicating the total number of payload bytes received.
 
|   | Bytes | Position |
| --- | --- | --- |
| Sequence Number = 0 | 1 | 0 |
| MIME type length = 3 | 1 | 1 |
| MIME type in ASCII = ‘ACK’ | 3 | 2 |
| Payload Length | 4 | 5 |
| Total Number of Payload Bytes Received | x |  9 |

### Example
This is an example of binary data packets for image data transferred using the MIME type “image/jpeg”. The image size is 83000 bytes. The packet size is 235.

#### First packet:
 
|   | Bytes | Position |
| --- | --- | --- |
| Sequence number = 0 | 1 | 0 |
| MIME type length = 10 | 1 | 1 |
| MIME type (“image/jpeg”) | 10 | 2 |
| Payload Length = 83000 | 4 | 12 |
| Binary Payload (the first 219 bytes) |  219 | 16 |

#### Second packet:
 
|   | Bytes | Position |
| --- | --- | --- |
| Sequence number = 1 | 1 | 0 |
| Binary Payload (the next 234 bytes) | 234 | 1 |


### MyGeotab API
To send/receive messages between MyGeotab and the external device, please download the source code of the [Starter Kit]({{site.baseurl}}/software/js-samples/#starter-kit) sample, and replace the [Sample API](https://github.com/Geotab/sdk/blob/master/src/software/js-samples/starterKit.html) with the following script. The alternative is to paste the script in the [Runner]({{site.baseurl}}/software/api/runner.html). 

#### MIME messages from MyGeotab to the external device:
```javascript
api.call("Add", {
    "typeName": "TextMessage",
    "entity": {
        "device": {"id":device.id}, // Replace with device ID that should receive the data
        "messageContent": {
            "contentType": "MimeContent",
            "channelNumber": 1,
            "mimeType": "text", // Can be changed to any free format text value
            "binaryDataPacketDelay": "00:00:03.0000000", // Applies a configurable delay of up to 5 seconds in between each sequenced message of a multimessage MIME payload
            "data": base64_encoded_byte // Replace with your data encoded in base64
        },
    "isDirectionToVehicle": true,
    "messageSize": 235 // If unspecified defaults to 235. Max of 1000.
    },
}, function(result) {
    console.log("Done: ", result);
}, function(e) {
    console.error("Failed:", e);
});
```

#### Retrieving MIME data from MyGeotab:
Once the data has been sent to the cloud, you can use the MyGeotab SDK to pull the message content out of the target database. For each MIME payload, the data is stored within a single TextMessage Object and can be retrieved using the Get method (search criteria can be added):
```javascript
api.call("Get", {
    "typeName":"TextMessage",
    "resultsLimit":10
});
```

The payload is stored in MyGeotab in Base64 encoded format. Decoding this payload from Base64 to bytes should yield the expected content which was passed through. In the event that the database has multiple devices sending MIME data at different times, you may want to specify the originating device and/or filter by the time interval during which MIME data was sent:
```javascript
api.call("Get", { // First API call is to get the ID of a device given its serial number
    "typeName": "Device",
    "search": {
        "serialNumber": "G9##########" // Replace with your GO device serial number
    },
    "resultsLimit": 1
}, function(deviceResult) {
    console.log("Found device ID: ", deviceResult[0].id);
    api.call("Get", { // Second API call is to get all TextMessages sent to/from this device
        "typeName": "TextMessage",
        "search": {
            "deviceSearch": {"id": deviceResult[0].id }, // Optional: Return only TextMessages sent to/from this device
            "modifiedSinceDate": "2023-09-01T14:00:00.000Z", // Optional: Specify the minimum datetime for messages
            "toDate": "2023-09-20T18:30:00.000Z", // Optional: Specify the maximum datetime for messages
            "contentTypes": ["MimeContent"], // Optional: Return only MimeContent
            "isDirectionToVehicle": false // Optional: Return only messages sent from MyGeotab to IOX (true) or from IOX to MyGeotab (false)
        },
        "resultsLimit": 100
    }, function(textMessageResult) {
        console.log("TextMessages: ", textMessageResult);
        if (textMessageResult.length > 0) {
            console.log("base64 data for first TextMessage: ", textMessageResult[0].messageContent.data);
        }
    }, function(textMessageError) {
        console.error("TextMessage search failed: ", textMessageError);
    });
}, function(deviceError) {
    console.error("Device search failed:", deviceError);
});
```