import { ReactNode } from "react";
import { Page } from "../../../components";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { CodeSample } from "../../../components/CodeSamplesContainer";

const integrationProcess: ReactNode = (
    <div className="paragraph">
        <p>The following process should be followed when integrating a third-party device with the GO device using our Third-Party Data CAN Protocol:</p>
        <h2>1 - Request external device ID</h2>
        <p>
            Contact{" "}
            <a href="mailto:soleng@geotab.com" target="_blank" rel="noopener noreferrer">
                Geotab Solution Engineering team
            </a>{" "}
            to obtain an External Device ID for your third-party device. This will allow us to uniquely identify your device when it connects to a GO device. Thereafter, any connection established
            by that type of external device will be recorded as Status Data in MyGeotab under the naming format "[External device name] device connected".
        </p>
        <h2>2 - Request status data IDs</h2>
        <p>
            There is an extensively defined Status Data ID list which can be found at{" "}
            <a href="https://docs.google.com/spreadsheets/d/1sy7IOhWmFoo40_I-ruOJO8bVTMLXqHa11d0oJtaoIcE/edit#gid=1133172080" target="_blank" rel="noopener noreferrer">
                MyGeotab Diagnostics
            </a>
            . Specifics regarding Status Data ID implementations can be found on the README sheet.{" "}
        </p>
        <h2>3 - Implement the third-party CAN protocol</h2>
        <p>
            Implement the Third-Party CAN Protocol in the external device as described below. The CAN speed to be used will be 250K or 500K, and the external device should have its CAN transceiver
            set to normal mode. The IOX CAN will auto-baud between 250K and 500K.
        </p>
        <h2>CAN ID</h2>
        <p>
            The CAN ID is an extended frame message (29-bit) and is broken down into 4 bytes, with the most significant byte (MSB) (byte 1) containing 5 bits to make up the 29-bit ID header. A
            breakdown of the CAN ID is shown below:
        </p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte</th>
                        <th>Description</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Byte 1</td>
                        <td>MSB, 5 bits</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Byte 2 and 3</td>
                        <td>Geotab's Parameter Group Number (PGN)</td>
                        <td>0x0FDB</td>
                    </tr>
                    <tr>
                        <td>Byte 4</td>
                        <td>Message Type</td>
                        <td>Varied</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Data length (DLC)</h3>
        <p>Indicates how many bytes of data are being sent (up to a maximum of 8).</p>
        <h3>Data</h3>
        <p>All values must be sent with the least significant byte first.</p>
        <p>Each piece of information related to the third-party device must be sent individually and have its own Status Data ID as part of the message.</p>
        <p>
            Note: See <a href="#appendix-a-raw-message-data-example-for-iox-can">Appendix A</a> for an example of raw message data.
        </p>
        <h3 id="handshake">Handshake</h3>
        <p>
            An initial Handshake <strong>is required</strong> in order for the GO device to accept MyGeotab API calls to produce CAN messages from the IOX-CAN. Vehicle ignition must be on during the
            handshake process.
        </p>
        <ol>
            <li>
                After powering up, the GO device will enter an external device detection cycle. The GO device will listen for a <a href="#msg-type-0x81-third-party-device-id">Msg Type 0x81</a> from
                the external device. This message is used to indicate that an external device is present.
                <ul>
                    <li>The external device must send this message once per second.</li>
                </ul>
            </li>
            <li>
                The GO device will reply with a <a href="#msg-type-0x02-third-party-data-acknowledge">Msg Type 0x02</a> to acknowledge it has received the external device ID. After detecting this
                response, the external device may stop broadcasting Msg Type 0x81.
            </li>
            <li>
                The MyAdmin API can now be used to produce CAN messages from the IOX-CAN as described in <a href="#messages-from-mygeotab">Messages from MyGeotab</a>
            </li>
        </ol>
    </div>
);

const messagesFromGoDevice: ReactNode = (
    <div className="paragraph">
        <h2 id="msg-type-0x02-third-party-data-acknowledge">Msg type 0x02: Third-party data acknowledge</h2>
        <p>Issued by the GO device upon receipt of Third-Party Data from the external device.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>CAN ID Breakdown</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Byte 1</td>
                        <td>0x00</td>
                    </tr>
                    <tr>
                        <td>Byte 2 (Geotab PGN)</td>
                        <td>0x0F</td>
                    </tr>
                    <tr>
                        <td>Byte 3 (Geotab PGN)</td>
                        <td>0xDB</td>
                    </tr>
                    <tr>
                        <td>Byte 4 (Message Type)</td>
                        <td>0x02</td>
                    </tr>
                    <tr>
                        <td>Data Length</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>DLC</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Data Breakdown</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>Data 1</td>
                        <td>The Message Type acknowledged</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const messagesFromExternalDevice: ReactNode = (
    <div className="paragraph">
        <h2 id="msg-type-0x81-third-party-device-id">Msg type 0x81: Third-party device ID</h2>
        <p>Issued by the external device upon powerup once every second until an Acknowledge message (Msg Type 0x02) is received.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>CAN ID Breakdown</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Byte 1</td>
                        <td>0x00</td>
                    </tr>
                    <tr>
                        <td>Byte 2 (Geotab PGN)</td>
                        <td>0x0F</td>
                    </tr>
                    <tr>
                        <td>Byte 3 (Geotab PGN)</td>
                        <td>0xDB</td>
                    </tr>
                    <tr>
                        <td>Byte 4 (Message Type)</td>
                        <td>0x81</td>
                    </tr>
                    <tr>
                        <td>Data Length</td>
                        <td>Value</td>
                    </tr>
                    <tr>
                        <td>DLC</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Data Breakdown</td>
                        <td>Value</td>
                    </tr>
                    <tr>
                        <td>Data 1-2</td>
                        <td>Device ID (assigned by Geotab)</td>
                    </tr>
                    <tr>
                        <td>Reply: Third-Party Device ID Ack</td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2 id="msg-type-0x80-third-party-data-as-status-data">Msg type 0x80: Third-party data as status data</h2>
        <p>
            Issued by the external device whenever it wants Third-Party Data saved on the GO device. Rate limit is 100 logs per 10 minutes. If you exceed the rate limit, the GO device will stop
            taking data from the IOX.
        </p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>CAN ID Breakdown</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Byte 1</td>
                        <td>0x00</td>
                    </tr>
                    <tr>
                        <td>Byte 2 (Geotab PGN)</td>
                        <td>0x0F</td>
                    </tr>
                    <tr>
                        <td>Byte 3 (Geotab PGN)</td>
                        <td>0xDB</td>
                    </tr>
                    <tr>
                        <td>Byte 4 (Message Type)</td>
                        <td>0x80</td>
                    </tr>
                    <tr>
                        <td>Data Length</td>
                        <td>Value</td>
                    </tr>
                    <tr>
                        <td>DLC</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>Data Breakdown</td>
                        <td>Value</td>
                    </tr>
                    <tr>
                        <td>Byte 1-2</td>
                        <td>Status Data ID</td>
                    </tr>
                    <tr>
                        <td>Byte 3-6</td>
                        <td>Status Data</td>
                    </tr>
                    <tr>
                        <td>Reply: Third-Party Data Ack (Msg Type 0x02)</td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2 id="msg-type-0x82-free-format-third-party-data">Msg type 0x82: Free format third-party data</h2>
        <p>Currently not implemented.</p>
        <h2 id="msg-type-0x87-third-party-data-as-priority-status-data">Msg type 0x87: Third-party data as priority status data</h2>
        <p>
            Priority Status Data follows an expedited processing workflow on the GO device, but will otherwise be treated the same as the 0x80 Status Data message. It will also be logged using an
            Iridium modem connection, if available.
        </p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>CAN ID Breakdown</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Byte 1</td>
                        <td>0x00</td>
                    </tr>
                    <tr>
                        <td>Byte 2 (Geotab PGN)</td>
                        <td>0x0F</td>
                    </tr>
                    <tr>
                        <td>Byte 3 (Geotab PGN)</td>
                        <td>0xDB</td>
                    </tr>
                    <tr>
                        <td>Byte 4 (Message Type)</td>
                        <td>0x87</td>
                    </tr>
                    <tr>
                        <td>Data Length</td>
                        <td>Value</td>
                    </tr>
                    <tr>
                        <td>DLC</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>Data Breakdown</td>
                        <td>Value</td>
                    </tr>
                    <tr>
                        <td>Byte 1-2</td>
                        <td>Status Data ID</td>
                    </tr>
                    <tr>
                        <td>Byte 3-6</td>
                        <td>Status Data</td>
                    </tr>
                    <tr>
                        <td>Reply: Third-Party Data Ack (Msg Type 0x02)</td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const messagesFromMyGeotab: ReactNode = (
    <div className="paragraph">
        <p>
            A <a href="#handshake">handshake</a> must be completed before this functionality will work. To send messages from MyGeotab to the external device, download the source code of the{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://geotab.github.io/sdk/software/js-samples/#starter-kit">
                Starter Kit
            </a>{" "}
            sample, and replace the{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/starterKit.html#L76">
                Sample API
            </a>{" "}
            with the following script. The alternative is to paste the script in the{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://geotab.github.io/sdk/software/api/runner.html">
                Runner
            </a>
            .
        </p>
        <CodeSample
            language="javascript"
            code={`api.call("Add", {
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
});`}
        />
    </div>
);

const appendix: ReactNode = (
    <div className="paragraph">
        <h2 id="appendix-a-raw-message-data-example-for-iox-can">Appendix A: Raw message data example for IOX-CAN</h2>
        <code className="small-code-sample">
            Third-Party Device ID from external device (4208 is a test Device ID).
            <br />
            (Device ID: 4208 = 0x1070)
            <br />
            CAN ID: 0x000FDB81
            <br />
            DLC: 02
            <br />
            Data: 0x70, 0x10
            <br />
            <br />
            Third-Party Device ID Acknowledge from GO device
            <br />
            CAN ID: 0x000FDB02
            <br />
            DLC: 01
            <br />
            Data: 0x81
            <br />
            …<br />
            <br />
            Third-Party Data from External Device
            <br />
            (Status Data ID: 9999 = 0x270F, Data Value: 230 = 0x000000E6)
            <br />
            CAN ID: 0x000FDB80
            <br />
            DLC: 06
            <br />
            Data: 0x0F, 0x27, 0xE6, 0x00, 0x00, 0x00
            <br />
            <br />
            Third-Party Data Acknowledge from GO device
            <br />
            CAN ID: 0x000FDB02
            <br />
            DLC: 01
            <br />
            Data: 0x80
            <br />
        </code>
    </div>
);

const pageTitle: PageTitleProps = {
    title: "Add-On Protocol - CAN",
    breadCrumbItems: ["Hardware", "Protocol Reference", "CAN"]
};

const pageSections: TableOfContentsItem[] = [
    {
        elementId: "integration-process",
        summary: "Integration process",
        details: integrationProcess
    },
    {
        elementId: "messages-from-go-device",
        summary: "Messages from GO device",
        details: messagesFromGoDevice
    },
    {
        elementId: "messages-from-external-device",
        summary: "Messages from external device",
        details: messagesFromExternalDevice
    },
    {
        elementId: "messages-from-mygeotab",
        summary: "Messages from MyGeotab",
        details: messagesFromMyGeotab
    },
    {
        elementId: "appendix",
        summary: "Appendix",
        details: appendix
    }
];

export default function Can() {
    return (
        <Page section={HeaderSections.Hardware} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                <p>
                    External devices can communicate with the Geotab GO device through the revised Third-Party Data CAN protocol. The hardware interface will be the{" "}
                    <a target="_blank" rel="noopener noreferrer" href="https://www.geotab.com/documentation/iox-can/">
                        IOX-CAN
                    </a>
                    . Two-way communication is supported, allowing a MyGeotab API call to produce messages on the connected CAN network using the IOX-CAN. An initial handshake is required before
                    messages can be produced using the IOX-CAN.
                </p>
                <p>The GO device will start processing third-party data if it is properly formatted. Once processed, the third-party data will be saved and sent to MyGeotab as Status Data.</p>
            </div>
        </Page>
    );
}
