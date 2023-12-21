import { ReactNode } from "react";
import CodeSample from "../../../components/CodeSamplesContainer/CodeSample";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import { Page } from "../../../components";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import InformationalBox from "../../../components/InformationalBox/InformationalBox";
import messageFlowDiagram from "../../../assets/images/hardware/rs232Usb/rs232-usb_0.png";
import { Link } from "react-router-dom";

const specialRequirements: ReactNode = (
    <div className="paragraph">
        <h2>Enabling IOX-USB data transfer</h2>
        <p>To enable third-party data communication on the IOX-USB, apply the following custom parameter to the GO device through
            MyGeotab:</p>
        <code className="small-code-sample">{`<GoParameters><Parameter Description="Enable USB Data" Offset="164" Bytes="02"/>
        </GoParameters>`}</code>
        <InformationalBox>
            <p>The GO device will automatically upgrade to the ProPlus rate plan once third-party data transfer begins.</p>
        </InformationalBox>
        <h2>IOX-USB communication consideration</h2>
        <p>The IOX-USB operates as a USB 2.0 full-speed host. The maximum data transfer rate is 12 Mbit/s. The IOX-USB can use two
            methods to enumerate a USB device:</p>
        <ol>
            <li>The <a href="https://source.android.com/devices/accessories/protocol.html" target="_blank" rel="noopener noreferrer">
                Android Open Accessory protocol (AOA)</a>. This <a href="https://github.com/Geotab/android-external-device-example"
                    target="_blank" rel="noopener noreferrer" aria-label="Android Open Accessory Sample">sample project</a> can be used
                as a framework.</li>
            <li>USB-CDC (Communications Device Class)</li>
        </ol>
        <h2>Powering a device using the IOX-RS232 and IOX-USB</h2>
        <p>Both the IOX-USB and the IOX-RS232 can provide power to an Add-On Device.</p>
        <ul>
            <li>The IOX-USB can provide 1.5A at 5V as a power output.</li>
            <li>The IOX-RS232 supports 900mA at 12/24V to the external red (power) and black (ground) wires. However,
                it is not required to power the Add-On device using the IOX-RS232.</li>
        </ul>
        <h2>Grounding a device</h2>
        <p>Even if the Hardware Add-On has a separate connection to vehicle power and ground, it is still recommended to connect the
            Add-On ground to the ground wire of the IOX-RS232, as this improves signal integrity.</p>
        <h2>Serial port settings for Add-Ons</h2>
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
        <h2>Contact solutions engineering</h2>
        <p>Contact the <a href="mailto:soleng@geotab.com" target="_blank" rel="noopener noreferrer">Geotab Solutions Engineering team
        </a> with a detailed integration proposal, which should include:</p>
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
        <h2>Using status data IDs</h2>
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
            (0xFF) to 0 (0x00). The bytes used for the checksum calculation are all the bytes up to the checksum byte, including STX, LEN, TYPE, but not including ETX.</p>
        <p>Checksum calculation pseudocode:</p>
        <CodeSample
            language="javascript"
            code={
                `byte ChkA = 0;
byte ChkB = 0;
// n is the number of bytes in the message
// up to, but not including, the checksum
for (i = 0; i < n; i++) {
    ChkA = ChkA + MsgBuffer[i];
    ChkB = ChkB + ChkA;
}
// ChkA precedes ChkB in the message`
            }
        />
        <h2>Data endianness</h2>
        <p>All values must be sent using Little-Endian Byte Order, meaning the least significant byte is first.</p>
    </div>
);

const messagesFromGoDevice: ReactNode = (
    <div className="paragraph">
        <h2 id="msg-type-0x01-handshake-request">Msg type 0x01: handshake request</h2>
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
                        <td>STX (0x02)</td>
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
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Reply: Handshake Confirmation (<a href="#msg-type-0x81-handshake-confirmation">Msg Type 0x81</a>)</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2 id="msg-type-0x02-third-party-data-acknowledge">Msg type 0x02: third-party data acknowledge</h2>
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
                        <td>STX (0x02)</td>
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
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>5</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2 id="msg-type-0x21-go-device-data">Msg type 0x21: GO device data</h2>
        <p>Issued by the GO device every 2 seconds to a connected Enhanced Hours Of Service Device (ID: 4141), or periodically when a 0x85 request message is received.</p>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x21</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length &gt;= 52 [1]</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Date / Time [2]</td>
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
                        <td>Road Speed [3]</td>
                        <td>1</td>
                        <td>15</td>
                    </tr>
                    <tr>
                        <td>RPM</td>
                        <td>2</td>
                        <td>16</td>
                    </tr>
                    <tr>
                        <td>Odometer [4]</td>
                        <td>4</td>
                        <td>18</td>
                    </tr>
                    <tr>
                        <td>Status Flags (from LSB):<br />1st bit: 1 = GPS Valid<br />2nd bit: 1 = Ignition On<br />3rd bit: 1 = Engine Bus Activity<br />4th bit: 1 = Date/Time Valid<br />
                            5th bit: 1 = Speed From Engine<br />6th bit: 1 = Odometer From Engine</td>
                        <td>1</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td>Trip Odometer [4]</td>
                        <td>4</td>
                        <td>23</td>
                    </tr>
                    <tr>
                        <td>Total Engine Hours</td>
                        <td>4</td>
                        <td>27</td>
                    </tr>
                    <tr>
                        <td>Trip Duration [5]</td>
                        <td>4</td>
                        <td>31</td>
                    </tr>
                    <tr>
                        <td>Deprecated = 0</td>
                        <td>4</td>
                        <td>35</td>
                    </tr>
                    <tr>
                        <td>Driver ID [6]</td>
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
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>Length + 5</td>
                    </tr>
                    <tr>
                        <td>Reply: Device Data Ack (<a href="#msg-type-0x84-device-data-ack">Msg type 0x84</a>)</td>
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
        <h2 id="msg-type-0x22-binary-data-response">Msg type 0x22: binary data response</h2>
        <p>Issued by the GO device upon acceptance or rejection of either a Binary Data (0x86), an Extended Application Specific Data (0x88), or an Extended Binary Data (0x8A) message from the external device.</p>
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
                        <td>STX (0x02)</td>
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
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>9</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg type 0x23: binary data packet</h2>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x23</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = x (0 - 255)</td>
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
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>5+x</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg type 0x24: extended application specific data To external device</h2>
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
                        <td>STX (0x02)</td>
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
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>6+x</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg type 0x25: extended binary data packet</h2>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x25</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = x (256 - 1000)</td>
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
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>6+x</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2 id="msg-type-0x26-Protobuf-data-packet">Msg type 0x26: protobuf data packet</h2>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x26</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = x (1 - 255)</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Data Payload Protobuf (1-255)</td>
                        <td>x</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>3+x</td>
                    </tr>
                    <tr>
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>5+x</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>The payload is protobuf-encoded. Please see <a href="https://github.com/Geotab/android-external-device-example/blob/master/app/src/main/proto/iox_messaging.proto"
            target="_blank" rel="noopener noreferrer">Protobuf Schema</a> for details.</p>
        <h2 id="msg-type-0x27-add-on-version-to-external-device">Msg type 0x27: Add-On protocol version to external device</h2>
        <p>Sent by the GO device to an external device as a reply to the Add-On protocol version request (0x8B).</p>
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
                        <td>STX (0x02)</td>
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
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>9</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const messagesFromExternalDevice: ReactNode = (
    <div className="paragraph">
        <h2>Handshake sync (auto-BAUD detect for RS232)</h2>
        <p>Issued by an external device every second until the Handshake Request is received.</p>
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
                        <td>Sync Char (0x55)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Reply: Handshake Request (<a href="#msg-type-0x01-handshake-request">Msg Type 0x01</a>)</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2 id="msg-type-0x81-handshake-confirmation">Msg type 0x81: handshake confirmation</h2>
        <p>Issued by the external device when it receives the Handshake Request.</p>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x81</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = 4</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>External Device ID (assigned by Geotab)</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Flags<br />1st bit: Handshake Confirmation ACK<br />2nd bit: Binary Data Packet Wrapping<br />3rd bit: Self Powered External Device<br />All other bits:Reserved for
                            future implementation, must be set to 0</td>
                        <td>2</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>9</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>Handshake Confirmation ACK:</p>
        <ul>
            <li>0: No Ack to Handshake Confirmation message will be sent by the GO device.</li>
            <li>1: The Handshake Confirmation is to be acknowledged with a Third-Party Data Acknowledge message.</li>
        </ul>
        <p>Binary Data Packet Wrapping:</p>
        <ul>
            <li>0: The passthrough data from the server will be passed to the external device without modification.</li>
            <li>1: The passthrough data from the server will be wrapped in a Binary Data Packet message before being sent to the external device.</li>
        </ul>
        <p>Self-Powered External Device:</p>
        <ul>
            <li>0: The External Device receives power from the IOX. After waking up, the IOX will restore power to the External Device and wait for the handshake to complete.</li>
            <li>1: The External Device has its own power source. The IOX will not wait for the handshake and will assume it can initiate communication with the External Device immediately after waking up.</li>
        </ul>
        <h2 id="msg-type-0x80-third-party-data-as-status-data">Msg type 0x80: third-party data as status data</h2>
        <p>Issued by the external device whenever it requires Third-Party Data to be saved on the GO device as Status Data. Rate limit is 100 logs per 10 minutes. If you exceed the rate limit, the GO
            device will stop taking data from the IOX.</p>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x80</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = 6</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Data ID (assigned by Geotab)</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Data</td>
                        <td>4</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>11</td>
                    </tr>
                    <tr>
                        <td>Reply: Third-Party Data Ack (<a href="#msg-type-0x02-third-party-data-acknowledge">Msg Type 0x02</a>)</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg type 0x82: free format third-party data</h2>
        <p>Issued by the external device whenever it wants Third-Party Data to be saved on the GO device in a free format (1 to 27 bytes) that will be saved in MyGeotab as Custom Data.
            Rate limit is 500 logs per 10 minutes. If you exceed the rate limit, the GO device will stop taking data from the IOX.</p>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x82</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = x (1 to 27)</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Data</td>
                        <td>x</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>3 + x</td>
                    </tr>
                    <tr>
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>5 + x</td>
                    </tr>
                    <tr>
                        <td>Reply: Third-Party Data Ack (<a href="#msg-type-0x02-third-party-data-acknowledge">Msg Type 0x02</a>)</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2 id="msg-type-0x84-device-data-ack">Msg type 0x84: device data ACK</h2>
        <p>Issued by the External Device on receipt of the GO Device Data message.</p>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x84</td>
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
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>5</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>For the purpose of acknowledging the GO Device Data message when connected as an Enhanced Hours Of Service Device:</p>
        <ul>
            <li>The GO device will keep streaming the GO Device Data messages for up to 30 seconds, even if no ACK is received.</li>
            <li>If no ACK is received in that time frame, the GO Device will send an External Device Disconnected record to the server and will wait for a new Handshake Sync request from the External Device.</li>
            <li>If the ACK message is received within the 30 seconds, the counter is re-initialized.</li>
        </ul>
        <h2>Msg type 0x85: request device data message</h2>
        <p>This is a request-response message. It can be issued by the External Device whenever it wishes to receive the Device Data Info Message (0x21).</p>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x85</td>
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
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Reply: GO Device Data (<a href="#msg-type-0x21-go-device-data">Msg Type 0x21</a>)</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg type 0x86: binary data packet</h2>
        <p>Sent by the external device when sending messages with less than or equal to 255 bytes of data content to MyGeotab. The GO device will respond with the Binary Data Response message indicating
            whether the data was accepted into the modem's socket buffer.</p>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x86</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = x (0 - 255)</td>
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
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>5+x</td>
                    </tr>
                    <tr>
                        <td>Reply: Binary Data Response (<a href="#msg-type-0x22-binary-data-response">Msg Type 0x22</a>)</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>The payload of the binary data needs to adhere to protocols understood by MyGeotab. MIME protocol is one of these protocols. Please see {" "}
            <a href="#appendix-c-using-binary-data-messages-to-transfer-mime-data">Appendix C</a> for implementation details.</p>
        <h2>Msg type 0x87: third-party data as priority status data</h2>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x87</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = 6</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Data ID (assigned by Geotab)</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Data</td>
                        <td>4</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>11</td>
                    </tr>
                    <tr>
                        <td>Reply: Third-Party Data Ack (<a href="#msg-type-0x02-third-party-data-acknowledge">Msg Type 0x02</a>)</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg type 0x88: extended application specific data from external device</h2>
        <p>Extended application-specific data from external device is sent by the external device to the GO device. Can be used for payloads larger than 1 byte. There must be an associated service
            running on the GO device that is looking for these messages. Currently only used for Keyless.</p>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x88</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = x (1 to 1024)</td>
                        <td>2</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Data Payload</td>
                        <td>x</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>4+x</td>
                    </tr>
                    <tr>
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>6+x</td>
                    </tr>
                    <tr>
                        <td>Reply: Binary Data Response (<a href="#msg-type-0x22-binary-data-response">Msg Type 0x22</a>)</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg type 0x89: ping</h2>
        <p>After handshaking, this message can be issued periodically by the external device to check that the GO device is active and ready. The GO device will normally reply with the Third-Party Data
            Ack (Msg Type 0x02). If this reply is not received, the external device should reset and begin sending the Handshake Sync (0x55).</p>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x89</td>
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
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Reply: Third-Party Data Ack (<a href="#msg-type-0x02-third-party-data-acknowledge">Msg Type 0x02</a>)</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg type 0x8a: extended binary data packet</h2>
        <p>Sent by the external device when sending messages with {"<"}= 1000 bytes of data content to MyGeotab. The GO device will respond with the Binary Data Response message indicating whether the
            data was accepted into the modem's socket buffer.</p>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x86</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = x (0 - 1000)</td>
                        <td>2</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Extended_binary_data</td>
                        <td>x</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>4+x</td>
                    </tr>
                    <tr>
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>6+x</td>
                    </tr>
                    <tr>
                        <td>Reply: Binary Data Response (<a href="#msg-type-0x22-binary-data-response">Msg Type 0x22</a>)</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>The payload of the binary data needs to adhere to protocols understood by the Geotab servers. MIME protocol is one of these protocols. Please see
            <a href="#appendix-c-using-binary-data-messages-to-transfer-mime-data">Appendix C</a> for implementation details.</p>
        <h2>Msg type 0x8b: add-on protocol version request</h2>
        <p>Sent by the external device when requesting the Add-On protocol version number. Once the GO device receives this request, it will reply with 0x27.</p>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x8B</td>
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
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Reply: Third-Party version Ack Reply (<a href="#msg-type-0x27-add-on-version-to-external-device">Msg Type 0x27</a>)</td>
                        <td> </td>
                        <td> </td>S
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Msg type 0x8c: protobuf data packet</h2>
        <p>Available with Add-On protocol versions 1.2 and later. Sent by the external device to subscribe to various topics/information. The GO device will respond with 0x26 ACK.</p>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x8C</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = x(1-255)</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Data Payload Protobuf (message_body) = x (1 to 255)</td>
                        <td>x</td>
                        <td>3</td>
                    </tr>
                    <tr>blank
                        <td>Checksum</td>
                        <td>2</td>
                        <td>3 + x</td>
                    </tr>
                    <tr>
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>5 + x</td>
                    </tr>
                    <tr>
                        <td>Reply: Protobuf data packet (<a href="#msg-type-0x26-Protobuf-data-packet">Msg Type 0x26</a>)</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>The payload is protobuf-encoded. Please see <a href="https://github.com/Geotab/android-external-device-example/blob/master/app/src/main/proto/iox_messaging.proto"
            target="_blank" rel="noopener noreferrer">Protobuf Schema</a> for details. The currently supported topics are:</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Topic</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>TOPIC_VIN</td>
                    </tr>
                    <tr>
                        <td>TOPIC_GEAR</td>
                    </tr>
                    <tr>
                        <td>TOPIC_ENGINE_SPEED</td>
                    </tr>
                    <tr>
                        <td>TOPIC_ENGINE_LOAD</td>
                    </tr>
                    <tr>
                        <td>TOPIC_ODOMETER</td>
                    </tr>
                    <tr>
                        <td>TOPIC_ACCEL_PEDAL_PERCENTAGE</td>
                    </tr>
                    <tr>
                        <td>TOPIC_COOLANT_TEMP</td>
                    </tr>
                    <tr>
                        <td>TOPIC_DOC_INTAKE_GAS_TEMP</td>
                    </tr>
                    <tr>
                        <td>TOPIC_DOC_OUTLET_GAS_TEMP</td>
                    </tr>
                    <tr>
                        <td>TOPIC_FUELTANK1_UNITS</td>
                    </tr>
                    <tr>
                        <td>TOPIC_FUELTANK2_UNITS</td>
                    </tr>
                    <tr>
                        <td>TOPIC_FUELTANK1_PERCENT</td>
                    </tr>
                    <tr>
                        <td>TOPIC_FUELTANK2_PERCENT</td>
                    </tr>
                    <tr>
                        <td>TOPIC_STATE_OF_CHARGE</td>
                    </tr>
                    <tr>
                        <td>TOPIC_ENGINE_ROAD_SPEED</td>
                    </tr>
                    <tr>
                        <td>TOPIC_VEHICLE_ACTIVE</td>
                    </tr>
                    <tr>
                        <td>TOPIC_DRIVER_SEATBELT</td>
                    </tr>
                    <tr>
                        <td>TOPIC_LEFT_TURN_SIGNAL</td>
                    </tr>
                    <tr>
                        <td>TOPIC_RIGHT_TURN_SIGNAL</td>
                    </tr>
                    <tr>
                        <td>TOPIC_EV_CHARGING_STATE</td>
                    </tr>
                    <tr>
                        <td>TOPIC_PARK_BRAKE</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const appendices: ReactNode = (
    <div className="paragraph">
        <h2>Appendix A: raw message data example for IOX-USB & IOX-RS232</h2>
        <code className="small-code-sample">Handshake Sync from External Device<br />
            0x55... 0x55... 0x55<br /><br />
            Handshake Request from GO device<br />
            0x02, 0x01, 0x00, 0x03, 0x08, 0x03<br /><br />
            Handshake Confirmation from External Device (4208 is a test Device ID)<br />
            (Device ID: 4208 = 0x00001070)<br />
            0x02, 0x81, 0x04, 0x70, 0x10, 0x00, 0x00, 0x07, 0x18, 0x03<br /><br />

            Third-Party Data from External Device<br />
            (Status Data ID: 35349 = 0x8A15, Data Value: 200 = 0x000000C8)<br />
            0x02, 0x80, 0x06, 0x15, 0x8A, 0xC8, 0x00, 0x00, 0x00, 0xEF, 0x8C, 0x03<br /><br />
            Third-Party Data Acknowledge from GO device<br />
            0x02, 0x02, 0x00, 0x04, 0x0A, 0x03<br />
        </code>
        <h2 id="appendix-b-sample-message-flow-for-iox-usb--iox-rs232">Appendix B: sample message flow for IOX-USB & IOX-RS232</h2>
        <img src={messageFlowDiagram} alt=""></img>
        <h2 id="appendix-c-using-binary-data-messages-to-transfer-mime-data">Appendix C: using binary data messages to transfer MIME data</h2>
        <p>MIME-type data can be transferred from an external device to the server via the GO device. The protocol is described in <Link to="/hardware/guides/mimeProtocol">MIME passthrough messages</Link>.</p>
        <p>The Message Flow is similar to that outlined in <a href="#appendix-b-sample-message-flow-for-iox-usb--iox-rs232">Appendix B</a>, with the following variations:</p>
        <ol>
            <li>Third-Party Data Message is instantiated as Binary Data Packet Containing MIME Type Data, whose format is <a href="#binary-data-packets-containing-mime-type-data">such</a></li>
            <li>Data Acknowledge Message is instantiated as Binary Data Response (0x22)</li>
            <li>After the last Binary Data Response, add a Binary Data Packet Containing MIME Type Acknowledge, whose format is <a href="#binary-data-packet-containing-mime-type-acknowledge">such</a>. Once the complete payload of the MIME message is successfully received by MyGeotab, a MIME ACK will be sent back from MyGeotab.</li>
        </ol>
        <p>Readers are encouraged to also read the <a href="https://docs.google.com/document/d/1a8XCgpmEEbx6KxnFxhu40XULWr2uZeAG_5aKkm-Mjnw/edit?usp=sharing"
            target="_blank" rel="noopener noreferrer">Geotab MIME Data Exchange Example IOX-RS232</a> to better understand of the protocol.</p>
        <h3 id="binary-data-packets-containing-mime-type-data">Binary data packets containing MIME type data</h3>
        <p>This is an example of binary data packets for image data transferred using the MIME type "image/jpeg". The image size is 83000 bytes. The packet size is 250.</p>
        <p><strong>First packet:</strong></p>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x86</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = 250</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td><strong>Sequence number = 0</strong></td>
                        <td><strong>1</strong></td>
                        <td><strong>3</strong></td>
                    </tr>
                    <tr>
                        <td><strong>MIME type length = 10</strong></td>
                        <td><strong>1</strong></td>
                        <td><strong>4</strong></td>
                    </tr>
                    <tr>
                        <td><strong>MIME type (“image/jpeg”)</strong></td>
                        <td><strong>10</strong></td>
                        <td><strong>5</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Payload Length = 83000</strong></td>
                        <td><strong>4</strong></td>
                        <td><strong>15</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Binary Payload (the first 234 bytes)</strong></td>
                        <td><strong>234</strong></td>
                        <td><strong>19</strong></td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>253</td>
                    </tr>
                    <tr>
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>255</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p><strong>Second packet:</strong></p>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x86</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = 250</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td><strong>Sequence number = 1</strong>*</td>
                        <td><strong>1</strong></td>
                        <td><strong>3</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Binary Payload (the next 249 bytes)</strong></td>
                        <td><strong>249</strong></td>
                        <td><strong>4</strong></td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>253</td>
                    </tr>
                    <tr>
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>255</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3 id="binary-data-packet-containing-mime-type-acknowledge">Binary data packet containing MIME type acknowledge</h3>
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
                        <td>STX (0x02)</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Message Type = 0x23</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Message Body Length = 9+x</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Sequence Number = 0</td>
                        <td>1</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>MIME type length = 3</td>
                        <td>1</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>MIME type in ASCII = 'ACK'</td>
                        <td>3</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Payload Length = x</td>
                        <td>4</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>Total Number of Payload Bytes Received</td>
                        <td>x</td>
                        <td>12</td>
                    </tr>
                    <tr>
                        <td>Checksum</td>
                        <td>2</td>
                        <td>12+x</td>
                    </tr>
                    <tr>
                        <td>ETX (0x03)</td>
                        <td>1</td>
                        <td>14+x</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const pageTitle: PageTitleProps = {
    "title": "Add-On Protocol - RS232 & USB",
    "breadCrumbItems": ["Hardware", "Protocol Reference", "RS232 & USB"]
};

const pageSections: TableOfContentsItem[] = [
    {
        "elementId": "special-requirements",
        "summary": "Special requirements",
        "details": specialRequirements
    },
    {
        "elementId": "integration-process",
        "summary": "Integration process",
        "details": integrationProcess
    },
    {
        "elementId": "messages-go-device",
        "summary": "Messages from the GO device",
        "details": messagesFromGoDevice
    },
    {
        "elementId": "messages-from-external-device",
        "summary": "Messages from external device",
        "details": messagesFromExternalDevice
    },
    {
        "elementId": "appendices",
        "summary": "Appendices",
        "details": appendices
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
        </Page>
    );
};