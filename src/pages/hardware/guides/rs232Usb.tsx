import { ReactNode } from "react";
import CodeSample from "../../../components/CodeSamplesContainer/CodeSample";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import { Page } from "../../../components";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import Accordion from "../../../components/Accordion/Accordion";
import InformationalBox from "../../../components/InformationalBox/InformationalBox";

const specialRequirements: ReactNode = (
    <div className="paragraph">
        <h2>Enabling IOX-USB Data Transfer</h2>
        <p>To enable third-party data communication on the IOX-USB, apply the following custom parameter to the GO device through
            MyGeotab:</p>
        <code className="small-code-sample">{`<GoParameters><Parameter Description="Enable USB Data" Offset="164" Bytes="02"/>
        </GoParameters>`}</code>
        <InformationalBox>
            <p>The GO device will automatically upgrade to the ProPlus rate plan once third-party data transfer begins.</p>
        </InformationalBox>
        <h2>IOX-USB Communication Consideration</h2>
        <p>The IOX-USB operates as a USB 2.0 full-speed host. The maximum data transfer rate is 12 Mbit/s. The IOX-USB can use two
            methods to enumerate a USB device:</p>
        <ol>
            <li>The <a href="https://source.android.com/devices/accessories/protocol.html" target="_blank" rel="noopener noreferrer">
                Android Open Accessory protocol {"("}AOA{")"}</a>. This <a href="https://github.com/Geotab/android-external-device-example"
                    target="_blank" rel="noopener noreferrer" aria-label="Android Open Accessory Sample">sample project</a> can be used
                as a framework.</li>
            <li>USB-CDC {"("}Communications Device Class{")"}</li>
        </ol>
        <h2>Powering A Device Using The IOX-RS232 And IOX-USB</h2>
        <p>Both the IOX-USB and the IOX-RS232 can provide power to an Add-On Device.</p>
        <ul>
            <li>The IOX-USB can provide 1.5A at 5V as a power output.</li>
            <li>The IOX-RS232 supports 900mA at 12/24V to the external red {"("}power{")"} and black {"("}ground{")"} wires. However,
                it is not required to power the Add-On device using the IOX-RS232.</li>
        </ul>
        <h2>Grounding A Device</h2>href="#
        <p>Even if the Hardware Add-On has a separate connection to vehicle power and ground, it is still recommended to connect the
            Add-On ground to the ground wire of the IOX-RS232, as this improves signal integrity.</p>
        <h2>Serial Port Settings For Add-Ons</h2>
        <p>Geotab recommends that RS232/USB serial ports are programmed in accordance with the following specifications:</p>
        <ul>
            <li>Baud Rate: 9600 or 115200. Note: the device is equipped with autobaud detection, so other standard rates are
                acceptable.</li>
            <li>Parity: None</li>
            <li>Stop Bits: 1</li>
            <li>Flow Control: None</li>
        </ul>
    </div>
);

const integrationProcess: ReactNode = (
    <div className="paragraph">
        <p>The following process should be followed when integrating a third-party device with the GO device using our Third-Party
            Data Protocol:</p>
        <h2>Contact Solutions Engineering</h2>
        <p>Contact the <a href="mailto:soleng@geotab.com" target="_blank">Geotab Solutions Engineering team</a> with a detailed
            integration proposal, which should include:</p>
        <ul>
            <li>A name for the integration</li>
            <li>The interfacing hardware</li>
            <li>Data types that will be sent to MyGeotab</li>
            <li>The required Status Data</li>
            <li>Direction of data transfer</li>
            <li>Expected timelines for integrating</li>
        </ul>
        <p>The Solutions Engineering team will respond with followup questions to define the integration, and assign an External
            device ID and any Status Data IDs that would be required. </p>
        <p>An additional resource is the <a target="_blank" rel="noopener noreferrer"
            href="https://docs.google.com/presentation/d/1nkmDYw2tscZxKaezFm5sR3jLItI3IRJTS6JIhgg0rFU/edit#slide=id.g625282e7fc_0_0">
            Hardware Integration Toolkit</a> with integration walkthrough.</p>
        <h2>Using Status Data IDs</h2>
        <p>There is an extensively defined Status Data ID list which can be found at <a target="_blank" rel="noopener noreferrer"
            href="https://docs.google.com/spreadsheets/d/1sy7IOhWmFoo40_I-ruOJO8bVTMLXqHa11d0oJtaoIcE/edit#gid=1133172080">MyGeotab
            Diagnostics</a>. Specifics regarding Status Data ID implementations can be found on the README sheet.</p>
        <h2>Handshake</h2>
        <p>An initial Handshake <strong>is required</strong> in order for the GO device to accept third-party data. Vehicle ignition must be on during the handshake process.</p>
        <ol>
            <li>
                After powering up, the GO device will enter an external device detection cycle. The external device will be powered for 72 seconds. In this interval, the GO device will
                listen for a <a href="#handshake-sync-auto-baud-detect-for-rs232">Handshake Sync</a> from the external device. The Handshake Sync is used to indicate that an external device is present.
                For implementations using the IOX-RS232, the Handshake Sync is also used to detect baud rate.
                <ul>
                    <li>The external device must send the Handshake Sync message once per second.</li>
                    <li>If a Handshake Sync message is not detected from the external device after 72 seconds, the external device is powered down for 5 seconds, then powered up again to restart the
                        detection cycle.</li>
                </ul>
            </li>
            <li>The GO device will reply to a Handshake Sync with a <a href="#msg-type-0x01-handshake-request">Handshake Request</a>.</li>
            <li>The external device must reply with a <a href="#msg-type-0x81-handshake-confirmation">Handshake Confirmation</a> message within 2 seconds. If the external device would like an
                acknowledgment from the GO device that it received the Handshake Confirmation message, the corresponding flag in the Handshake Confirmation message may be set.</li>
            <li>
                After sending the Handshake Confirmation message, the external device can begin to send third-party data as required. For every <a href="#msg-type-0x80-third-party-data-as-status-data">
                    Third-Party Data Message</a> sent, the GO device will reply with a <a href="#msg-type-0x02-third-party-data-acknowledge">Data Acknowledge message</a>.
                <ul>
                    <li>If the external device receives no response to a Third-Party Data message, it must restart the handshake process — returning to step 1 above.</li>
                </ul>
            </li>
            <li>The GO device may send a Handshake Request message at any time after the initial handshake. The external device must respond with a Handshake Confirmation message. If the external device
                does not respond, it must restart the handshake process — returning to step 1 above.</li>
        </ol>
        <h2>Checksum</h2>
        <p>Each message contains a 2-byte Fletcher's Checksum calculated across all the bytes of the message except the checksum itself. The checksum values are bytes, and as such overflow from 255
            {"("}0xFF{")"} to 0 {"("}0x00{")"}. The bytes used for the checksum calculation are all the bytes up to the checksum byte, including STX, LEN, TYPE, but not including ETX.</p>
        <p>Checksum calculation pseudocode:</p>
        <CodeSample
            language="javascript"
            code={
                `byte ChkA = 0;
byte ChkB = 0;
// n is the number of bytes in the message
// up to, but not including, the checksum
for {"("}i = 0; i < n; i++{")"} {
    ChkA = ChkA + MsgBuffer[i];
    ChkB = ChkB + ChkA;
}
// ChkA precedes ChkB in the message`
            }
        />
        <h2>Data Endianness</h2>
        <p>All values must be sent using Little-Endian Byte Order, meaning the least significant byte is first.</p>
    </div>
);

const messagesFromGoDevice: ReactNode = (
    <div className="paragraph">
        <h2 id="msg-type-0x01-handshake-request">Msg Type 0x01: Handshake Request</h2>
        <p>Issued by the GO device upon receipt of the Handshake Sync, and periodically re-sent to confirm that the external device is still connected.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>Bytes</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>STX {"("}0x02{")"}</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x01</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = 0</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>ETX {"("}0x03{")"}</td>
                        <td>1</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Reply: Handshake Confirmation {"("}<a href="#msg-type-0x81-handshake-confirmation">Msg Type 0x81</a>{")"}</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2 id="msg-type-0x02-third-party-data-acknowledge">Msg Type 0x02: Third-Party Data Acknowledge</h2>
        <p>Issued by the GO device upon receipt of Third-Party Data from the External Device.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>Bytes</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>STX {"("}0x02{")"}</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x02</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = 0</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>ETX {"("}0x03{")"}</td>
                        <td>1</td>
                        <td>5</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg Type 0x21: GO Device Data</h2>
        <p>Issued by the GO device every 2 seconds to a connected Enhanced Hours Of Service Device {"("}ID: 4141{")"}, or periodically when a 0x85 request message is received.</p>
        <ul>
            <li>An Enhanced Hours Of Service Device must ACK this message with a 0x84 message.</li>
            <li>If the data is requested periodically using the 0x85 message, the ACK is optional.</li>
        </ul>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>Bytes</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>STX {"("}0x02{")"}</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x21</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length &gt;= 52 {"["}1{"]"}</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Date / Time {"["}2{"]"}</td>
                        <td>4</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Latitude</td>
                        <td>4</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>Longitude</td>
                        <td>4</td>
                        <td>11</td>
                    </tr>
                    <tr>
                        <td>Road Speed {"["}3{"]"}</td>
                        <td>1</td>
                        <td>15</td>
                    </tr>
                    <tr>
                        <td>RPM</td>
                        <td>2</td>
                        <td>16</td>
                    </tr>
                    <tr>
                        <td>Odometer {"["}4{"]"}</td>
                        <td>4</td>
                        <td>18</td>
                    </tr>
                    <tr>
                        <td>Status Flags {"("}from LSB{")"}:<br />1st bit: 1 = GPS Valid<br />2nd bit: 1 = Ignition On<br />3rd bit: 1 = Engine Bus Activity<br />4th bit: 1 = Date/Time Valid<br />
                            5th bit: 1 = Speed From Engine<br />6th bit: 1 = Odometer From Engine</td>
                        <td>1</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td>Trip Odometer {"["}4{"]"}</td>
                        <td>4</td>
                        <td>23</td>
                    </tr>
                    <tr>
                        <td>Total Engine Hours</td>
                        <td>4</td>
                        <td>27</td>
                    </tr>
                    <tr>
                        <td>Trip Duration {"["}5{"]"}</td>
                        <td>4</td>
                        <td>31</td>
                    </tr>
                    <tr>
                        <td>Deprecated = 0</td>
                        <td>4</td>
                        <td>35</td>
                    </tr>
                    <tr>
                        <td>Driver ID {"["}6{"]"}</td>
                        <td>4</td>
                        <td>39</td>
                    </tr>
                    <tr>
                        <td>GO Device Serial Number</td>
                        <td>12</td>
                        <td>43</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>Length + 3</td>
                    </tr>
                    <tr>
                        <td>ETX {"("}0x03{")"}</td>
                        <td>1</td>
                        <td>Length + 5</td>
                    </tr>
                    <tr>
                        <td>Reply: Device Data Ack {"("}<a href="#msg-type-0x84-device-data-ack">Msg Type 0x84</a>{")"}</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ol>
            <li>All implementations of this message must cater for the message length increasing in the future.</li>
            <li>“Date/Time” is a 'seconds' counter starting from 1st of January 2002.</li>
            <li>If Road Speed from the engine is not available, GPS speed is used.</li>
            <li>Increase of odometer since the most recent ignition on. If Odometer is not available, GPS device distance is used.</li>
            <li>Time passed since the most recent ignition on.</li>
            <li>Driver ID is only available when using the IOX-NFC.</li>
        </ol>
        <h3>Conversions</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th><strong>Data</strong></th>
                        <th><strong>Conversion</strong></th>
                        <th><strong>Units</strong></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Engine Road Speed</td>
                        <td>1</td>
                        <td>km/h</td>
                    </tr>
                    <tr>
                        <td>Odometer</td>
                        <td>0.1</td>
                        <td>km</td>
                    </tr>
                    <tr>
                        <td>RPM</td>
                        <td>0.25</td>
                        <td>RPM</td>
                    </tr>
                    <tr>
                        <td>Lat/Long</td>
                        <td>1e-7</td>
                        <td>degrees</td>
                    </tr>
                    <tr>
                        <td>Engine Hours</td>
                        <td>0.1</td>
                        <td>h</td>
                    </tr>
                    <tr>
                        <td>Trip Duration</td>
                        <td>1</td>
                        <td>s</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg Type 0x22: Binary Data Response</h2>
        <p>Issued by the GO device upon acceptance or rejection of either a Binary Data {"("}0x86{")"}, an Extended Application Specific Data {"("}0x88{")"}, or an Extended Binary Data {"("}0x8A{")"} message from the external device.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>Bytes</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>STX {"("}0x02{")"}</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x22</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = 4</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Binary data transmission success<br />0 = Rejected<br />1 = Accepted</td>
                        <td>1</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Reserved</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>ETX {"("}0x03{")"}</td>
                        <td>1</td>
                        <td>9</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg Type 0x23: Binary Data Packet</h2>
        <p>Issued by the GO device upon receipt of a Binary Data packet of 255 bytes or less from MyGeotab destined for the external device. This message format is only used if the corresponding “Binary Data Packet Wrapping” flag has been set by the external device during the Handshake Confirmation. The payload of the binary data packet message will be the raw bytes sent from MyGeotab.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>Bytes</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>STX {"("}0x02{")"}</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x23</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = x {"("}0 - 255{")"}</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Binary Data</td>
                        <td>x</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>3+x</td>
                    </tr>
                    <tr>
                        <td>ETX {"("}0x03{")"}</td>
                        <td>1</td>
                        <td>5+x</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg Type 0x24: Extended application specific data to external device</h2>
        <p>Sent by the GO device to the external device. Can be in response to a 0x88 message and used for payloads larger than 1 byte. Currently only used for Keyless.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>Bytes</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>STX {"("}0x02{")"}</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x24</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = x</td>
                        <td>2</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Binary Data</td>
                        <td>x</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>4+x</td>
                    </tr>
                    <tr>
                        <td>ETX {"("}0x03{")"}</td>
                        <td>1</td>
                        <td>6+x</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg Type 0x25: Extended binary data packet</h2>
        <p>Issued by the GO device upon receipt of a Binary Data packet of 256 bytes or more from MyGeotab destined for the external device This message format will only be used if the corresponding “Binary Data Packet Wrapping” flag has been set by the external device during the Handshake Confirmation. The payload of the binary data packet message will be the raw bytes as sent from MyGeotab. The maximum length currently supported by the GO is 1000 bytes.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>Bytes</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>STX {"("}0x02{")"}</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x25</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = x {"("}256 - 1000{")"}</td>
                        <td>2</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Binary Data</td>
                        <td>x</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>4+x</td>
                    </tr>
                    <tr>
                        <td>ETX {"("}0x03{")"}</td>
                        <td>1</td>
                        <td>6+x</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg Type 0x26: Protobuf data packet</h2>
        <p>Available with add-on protocol versions 1.2 and later. Issued by the GO device in response to 0x8C. Also issued by the GO device to publish information for the topics subscribed by the Add-On
            device.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>Bytes</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>STX {"("}0x02{")"}</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x26</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = x {"("}1 - 255{")"}</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Data Payload Protobuf {"("}1-255{")"}</td>
                        <td>x</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>3+x</td>
                    </tr>
                    <tr>
                        <td>ETX {"("}0x03{")"}</td>
                        <td>1</td>
                        <td>5+x</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>The payload is protobuf-encoded. Please see <a href="https://github.com/Geotab/android-external-device-example/blob/master/app/src/main/proto/iox_messaging.proto"
            target="_blank" rel="noopener noreferrer">Protobuf Schema</a> for details.</p>
        <h2>Msg Type 0x27: Add-On protocol version to external device</h2>
        <p>Sent by the GO device to an external device as a reply to the Add-On protocol version request {"("}0x8B{")"}.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>Bytes</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>STX {"("}0x02{")"}</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x27</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = 4</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Protocol major version</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Protocol minor version</td>
                        <td>2</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>ETX {"("}0x03{")"}</td>
                        <td>1</td>
                        <td>9</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const pageTitle: PageTitleProps = {
    "title": "Add-On Protocol - RS232 & USB",
    "breadCrumbItems": ["Hardware", "Guides", "RS232 & USB"]
};

const pageSections: TableOfContentsItem[] = [
    {
        "elementId": "special-requirements",
        "summary": "Special Requirements",
        "details": specialRequirements
    },
    {
        "elementId": "integration-process",
        "summary": "Integration Process",
        "details": integrationProcess
    },
    {
        "elementId": "messages-go-device",
        "summary": "Messages from the GO device",
        "details": messagesFromGoDevice
    },
    {
        "elementId": "next-steps",
        "summary": "Next Steps",
        "details": nextSteps
    },
    {
        "elementId": "next-steps",
        "summary": "Next Steps",
        "details": nextSteps
    }
];

export default function Rs232Usb() {
    return (
        <Page section={HeaderSections.Hardware} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                External devices can communicate with a Geotab GO device through the Third-Party RS232 and USB protocols linked below. Two-way communication is supported, allowing a MyGeotab API call to
                produce messages from the IOX device to reach the external device. The hardware interface is one of the following:
                <ul>
                    <li><a href="https://www.geotab.com/documentation/iox-rs232/" target="_blank" rel="noopener noreferrer" aria-label="IOX-RS232 Support Documentation">IOX-RS232 F/M</a></li>
                    <li><a href="https://www.geotab.com/documentation/iox-usb/" target="_blank" rel="noopener noreferrer" aria-label="IOX-USB Support Documentation">IOX-USB</a></li>
                </ul>
            </div>

            {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId} />)}
        </Page>
    );
};