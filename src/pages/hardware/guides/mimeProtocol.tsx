import { ReactNode } from "react";
import CodeSample from "../../../components/CodeSamplesContainer/CodeSample";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import { HashLink } from "react-router-hash-link";

const mime: ReactNode = (
    <div className="paragraph">
        <p>The MIME protocol can be used to exchange data between MyGeotab and an external device when the total message size exceeds the packet.</p>
        <ul>
            <li>When sending messages from MyGeotab to the external device: MyGeotab will break the larger message into smaller packets for transmission.</li>
            <li>When sending messages from the external device to myGetoab: MyGeotab will reassemble the individual packets into the complete message.</li>
        </ul>
    </div>
);

//ToDo: Update URLs
const prerequisites: ReactNode = (
    <div className="paragraph">
        <ul>
            <li>
                An external device must be connected, and its external device ID must be in the range of 4200-4299
                <ul>
                    <li>
                        This connection is established using IOX-specific messaging, such as <HashLink to="/hardware/guides/messagingProtocol#iox-single-frame-log-data-0x1d">message 0x1D</HashLink> for custom IOX devices or <HashLink to="/hardware/protocolReference/rs232-usb#msg-type-0x81-handshake-confirmation">message 0x81</HashLink> for IOX-RS232/USB
                    </li>
                    <li>
                        <HashLink to="/hardware/protocolReference/rs232-usb#contact-solutions-engineering">Contact Solutions Engineering</HashLink> with integration details if you require an external device ID for your integration
                    </li>
                </ul>
            </li>
        </ul>
        <h3>Protocol</h3>
        <p>
            The complete MIME message is broken into chunks and sent as binary data packets. The first byte within the message is a sequence counter. All the remaining bytes contain the MIME data.
        </p>
        <h4>Binary data packets</h4>
        <p>To accommodate external devices with memory constraints, the packet size is adjustable when sending messages to/from MyGeotab. The packets have a maximum size of 1000 bytes.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>{""}</th>
                        <th>Bytes</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sequence number [1]</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>MIME data</td>
                        <td>x</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>
            [1] A sequence number of 0 is only used for the first packet. The sequence number increments by 1 for each subsequent packet. If the sequence number reaches 255 (0xFF) and more packets
            need to be sent, the sequence number must reset to a value of 1 and continue counting.
        </p>
        <h4>MIME data</h4>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>{""}</th>
                        <th>Bytes</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>MIME type length = x</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>MIME type in ASCII</td>
                        <td>x</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Payload Length = y</td>
                        <td>4</td>
                        <td>1 + x</td>
                    </tr>
                    <tr>
                        <td>Binary Payload</td>
                        <td>y</td>
                        <td>5 + x</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h4>Acknowledge message</h4>
        <p>
            When transferring MIME data from the external device to MyGeotab, once the complete message is received MyGeotab will reply with an acknowledge message indicating the total number of
            payload bytes received.
        </p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>{""}</th>
                        <th>Bytes</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sequence Number = 0</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>MIME type length = 3</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>MIME type in ASCII = 'ACK'</td>
                        <td>3</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Payload Length</td>
                        <td>4</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Total Number of Payload Bytes Received</td>
                        <td>x</td>
                        <td>9</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Example</h3>
        <p>This is an example of binary data packets for image data transferred using the MIME type “image/jpeg”. The image size is 83000 bytes. The packet size is 235.</p>
        <h4>First packet:</h4>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>{""}</th>
                        <th>Bytes</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sequence number = 0</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>MIME type length = 10</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>MIME type (“image/jpeg”)</td>
                        <td>10</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Payload Length = 83000</td>
                        <td>4</td>
                        <td>12</td>
                    </tr>
                    <tr>
                        <td>Binary Payload (the first 219 bytes)</td>
                        <td>219</td>
                        <td>16</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h4>Second packet:</h4>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>{""}</th>
                        <th>Bytes</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sequence number = 1</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Binary Payload (the next 234 bytes)</td>
                        <td>234</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>MyGeotab API</h3>
        <p>To send/receive messages between MyGeotab and the external device, please download the source code of the <HashLink to="/myGeotab/codeSamples/javascriptSamples#javascript-example-starter-kit">Starter Kit</HashLink> sample, and replace the <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/starterKit.html" target="_blank" rel="noreferrer">Sample API</a> with the following script. The alternative is to paste the script in the <a href="https://geotab.github.io/sdk/software/api/runner.html" target="_blank" rel="noreferrer">Runner</a>.</p>
        <h4>MIME messages from MyGeotab to the external device:</h4>
        <CodeSample
            language="javascript"
            code={`api.call("Add", {
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
`}
        />
        <h3>Retrieving MIME data from MyGeotab:</h3>
        <p>
            Once the data has been sent to the cloud, you can use the MyGeotab SDK to pull the message content out of the target database. For each MIME payload, the data is stored within a single
            TextMessage Object and can be retrieved using the Get method (search criteria can be added):
        </p>
        <CodeSample
            language="javascript"
            code={`api.call("Get", {
    "typeName":"TextMessage",
    "resultsLimit":10
});
`}
        />
        <p>
            The payload is stored in MyGeotab in Base64 encoded format. Decoding this payload from Base64 to bytes should yield the expected content which was passed through. In the event that the
            database has multiple devices sending MIME data at different times, you may want to specify the originating device and/or filter by the time interval during which MIME data was sent:
        </p>
        <CodeSample
            language="javascript"
            code={`api.call("Get", { // First API call is to get the ID of a device given its serial number
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
`}
        />
    </div>
);

const pageTitle: PageTitleProps = {
    title: "MIME Protocol",
    breadCrumbItems: ["Hardware", "Guides", "MIME Protocol"]
};

const pageSections: TableOfContentsItem[] = [
    {
        elementId: "mime",
        summary: "MIME",
        details: mime
    },
    {
        elementId: "prerequisites",
        summary: "Prerequisites",
        details: prerequisites
    }
];

export default function MimeProtocol() {
    return <Page section={HeaderSections.Hardware} pageTitle={pageTitle} tableOfContents={pageSections} />;
}
