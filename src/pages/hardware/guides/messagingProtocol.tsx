import { ReactNode } from "react";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";

const generalDescription: ReactNode = (
    //ToDo: Update URL for mime protocol
    <div className="paragraph">
        <p>
            The GO device and Input-Output Expanders (IOX) are connected in a dedicated CAN network. All communication is between the GO device and any connected IOXs - in particular, IOXs do not
            communicate with other IOXs. The following communication scenarios exist: GO device to all connected IOXs; GO device to an individual IOX; and an individual IOX to GO device. Readers are
            encouraged to look at examples from{" "}
            <a href="https://docs.google.com/document/d/1BExcPst5bNzv-IZGX6ZbPeHK5MO1s2AI0rqzEhHbNZ4/edit?usp=sharing" target="_blank" rel="noreferrer">
                CAN IOX Sample Communication Session
            </a>{" "}
            as they read through the rest of this page.
        </p>
        <h2>Identification</h2>
        <p>This document describes the IO Expander Protocol version 1.2.</p>
        <p>All messages since IO Expander Protocol version 1.0 are supported, unless stated otherwise.</p>
        <h2>Interoperability</h2>
        <p>
            Third-party IOX Add-ons rely on the messages and protocols defined in this document to properly communicate with Geotab firmware. Geotab will endeavor to maintain support for the
            currently-documented messages and protocol. However, from time to time, Geotab may make changes to such messages and protocols which can potentially impact third-party IOX Add-on
            implementations. If Geotab makes any such changes, Geotab will use commercially reasonable efforts to provide partners with as much notice of the impending firmware changes as is
            practical given the circumstances. Geotab accepts no responsibility or liability for third party IOX Add-ons which fail to function properly, or at all, and any and all damages which
            arise, directly or indirectly, from such failures.
        </p>
        <p>
            Geotab recommends that all partners who develop their own IOX Add-ons ensure they have the ability to remotely update their firmware. This can be accomplished by sending an update to the
            IOX Add-on using the <a href="/sdk/hardware/developing-an-iox/mime-protocol/">MIME passthrough messages</a>.
        </p>
        <h2>Serial Number</h2>
        <p>
            Each custom IOX is assigned a 4-byte Serial Number by the integrators, similar to each car having its own VIN. The 2 Most Significant Bytes of the Serial Number are reported in bytes 3
            and 4 of the Poll Response (0x02). The 2 Least Significant Bytes are used to differentiate each IOX connected to the same CAN bus (attached to the same GO device) when the GO device is
            sending messages targeted for a specific IOX. In other words, the 2 LSB serve as the Address ID, and are included in bits 15 - 0 of the Arbitration ID.
        </p>
        <p>Integrators are free to leverage any mechanism for the Serial Number assignment to each individual IOX, but Geotab recommends following the process outlined below:</p>
        <ol>
            <li>Generate a random 4 byte value.</li>
            <li>Make sure that the 2 LSBs are not equal to '0000'.</li>
            <li>Make sure that you do not already have this value stored in your database of existing serial numbers.</li>
        </ol>
        <h2>Message Structure</h2>
        <p>Message identification is done with an arbitration ID.</p>
        <p>The Arbitration ID Field for IOX Messages:</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Bits</th>
                        <th>29 to 24</th>
                        <th>23 to 17</th>
                        <th>16 to 1</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Contents</td>
                        <td>Reserved: 0</td>
                        <td>Message: 0-127</td>
                        <td>
                            All IOXs: 0
                            <br />
                            Individual IOX Address ID: 1-65535
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>0x1F800000 IO_EXPANDER_RESERVED_MASK</p>
        <p>0x007F0000 IO_EXPANDER_COMMAND_MASK</p>
        <p>0x0000FFFF IO_EXPANDER_ID_MASK</p>
        <h2>Address ID</h2>
        <p>
            The last 2 bytes of the IOX Serial Number (MSB first) are used as the Address ID. This allows the GO device to identify the source of a message or, when the message is sent from the GO
            device, to identify the destination IOX.
        </p>
        <p>The GO device sends messages with ID 0x0000 meant for all IOXs, or with an ID between 0x0001 and 0xFFFF when it is targeted at a specific IOX.</p>
        <p>IOXs always use their own ID when sending messages. They never send 0x0000. For this reason, IOXs are not produced with Serial Numbers ending in 0x0000.</p>
        <h2>IOX ID</h2>
        <p>
            Each model of IOX is assigned an IOX ID by Geotab, similar to each model of car having a model name. Integrators shall contact Geotab to get an IOX ID assigned. The IOX ID does not need
            to be included in the IOX Serial Number. Integrators shall report the IOX ID in byte 7 of the Poll Response (0x02).
        </p>
        <h2>Acknowledge Process</h2>
        <ol>
            <li>
                Each IOX should receive an ACK from the GO device for every message sent. If an ACK is not received within 150 ms, the IOX should repeat the message before sending anything else.
            </li>
            <li>The IOX must respond to the poll request within 500 ms.</li>
        </ol>
    </div>
);

const polling: ReactNode = (
    <div className="paragraph">
        <p>
            After powering up, the GO device will poll all IOXs every 7 seconds. Each IOX must respond to this poll by obeying the ACK rules. Unless otherwise described, most commands can only be
            sent after the first poll (handshake) is completed with the GO device.
        </p>
        <h2>Device Removed</h2>
        <p>
            If the GO device fails to detect an IOX that used to be connected (that is, the IOX was disconnected), the GO device will remove the IOX from its internal database after 5 attempts (35
            seconds) and will make the slot available for a new IOX that can be connected at any time.
        </p>
        <h2>New Device</h2>
        <p>Any IOX that is connected to the GO device must respond to the poll request. The GO device will notice the new IOXs and add them to its internal database.</p>
        <h2>Undocumented Messages</h2>
        <p>An IOX could receive messages from the GO device that are not documented here. The IOX must be capable of handling this situation by ignoring/discarding the unknown messages.</p>
    </div>
);

const wakingUpTheGoDevice: ReactNode = (
    //ToDo: Update URLs
    <div className="paragraph">
        <p>
            Every 1 second, the GO wakes up for 2 ms to look for CAN activity on the IOX bus. The IOX can wake up the GO by sending an <a href="#rx-data-0x0c">RX Data (0x0C)</a> message every 1 ms
            until the GO device notices the activity and sends the <a href="#wakeup-0x04">Wakeup (0x04)</a> message to the IOX.
        </p>
    </div>
);

const commands: ReactNode = (
    //ToDo: Update URLs
    <div className="paragraph">
        <h2>Reset (0x00)</h2>
        <p>
            Directed to all devices. Instructs all devices to reset and behave as if they have just powered up. IOXs should discard any setup information they might have received, de-assert hardware
            control lines, and open their relays.
        </p>
        <h2>Poll (0x01)</h2>
        <p>Sent by the GO device in a broadcast fashion to all units to check if they are there.</p>
        <h2>Poll Response (0x02)</h2>
        <p>
            Sent by an IOX when a poll is received. The ACK procedure must be obeyed. The first poll response after powerup (when Byte 0 Bit 0 is 1) contains all 8 bytes. All subsequent poll
            responses (when Byte 0 Bit 0 is 0) only contain the first byte.
        </p>
        <h3>Payload - Poll Response</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0 - Bit 0</td>
                        <td>
                            0 = Have been polled before.
                            <br />1 = First poll after power up.
                        </td>
                    </tr>
                    <tr>
                        <td>0 - Bit 1</td>
                        <td>
                            0 = Not Going to Sleep.
                            <br />1 = Going to Sleep.
                        </td>
                    </tr>
                    <tr>
                        <td>0 - Bit 2</td>
                        <td>
                            0 = Normal reply.
                            <br />1 = First poll response after wake up.
                        </td>
                    </tr>
                    <tr>
                        <td>0 - Bit 3-7</td>
                        <td>Reserved</td>
                    </tr>
                    <tr>
                        <td>{""}</td>
                        <td>The following Bytes are sent only on first poll-response</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Firmware Version Major</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Firmware Version Minor</td>
                    </tr>
                    <tr>
                        <td>3-4</td>
                        <td>2 Most significant bytes of Serial Number</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>
                            Reset Reason
                            <br />
                            0 = Power On Reset
                            <br />
                            1 = Reset Command
                            <br />
                            2 = New Firmware
                            <br />
                            All others reserved.
                        </td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Reserved</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>
                            150 to 199
                            <br />
                            IOX ID. Please contact Geotab to get one assigned.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>
            When the "Go to Sleep" command is received, but before actually going to sleep, the devices will indicate they are going to sleep through the indicated bit. This bit is cleared on
            wakeup.
        </p>
        <h2>Additional Info (0x03)</h2>
        <p>
            Sent by the IOX after an ACK for the first poll is received. This message is not strictly required for operation. However, sending of this message is required if any version information
            is to be reported, including: Product, Hardware, Firmware Major, Firmware Minor, or Version Control.
        </p>
        <h3>Payload - Additional Info</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-3</td>
                        <td>Software Version Control Number(Ex: SVN Version, Git SHA)</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Product Version</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Reserved</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>
                            Error Condition
                            <br />
                            0 = No error
                            <br />1 = Memory allocation error
                        </td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>Hardware Version</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Wakeup (0x04)</h2>
        <p>Wakes up all the IOXs from Sleep Mode. Is sent by the GO at least twice within a space of 50 ms. Currently the GO device sends this message 5 times with 10 ms intervals.</p>
        <h2>Sleep (0x05)</h2>
        <p>
            Causes all IOXs to go into Sleep Mode. Devices will enter Sleep Mode no sooner than 2 seconds, and not more than 20 seconds, after receiving this command. In the meantime, they will
            report through the poll response that they are going to sleep.
        </p>
        <h2>TX Data (0x0B)</h2>
        <p>
            Data sent from the GO device to the addressed IOX. The contents of this payload may follow a higher level protocol structure such as{" "}
            <a href="/sdk/hardware/developing-an-iox/mime-protocol/">MIME</a>.
        </p>
        <h3>Payload - TX Data</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-7</td>
                        <td>Data to transmit</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>RX Data (0x0C)</h2>
        <p>
            Data sent from an IOX to the GO device. The GO will reply with an ACK. The contents of this payload may follow a higher level protocol structure such as{" "}
            <a href="/sdk/hardware/developing-an-iox/mime-protocol/">MIME</a>. The 0x0C message series start and end with a Information Type 1 - Packet Wrapper{" "}
            <a href="#iox-requeststatus-0x25">0x25 message</a>.
        </p>
        <h3>Payload - RX Data</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-7</td>
                        <td>Received data</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Acknowledge (0x14)</h2>
        <p>
            Sent by the GO to indicate that a message is being acknowledged. The ACK to an RX Data message (0x0C) could include 1 byte of data. This data is used for streaming flow control. When the
            80% watermark of the receive buffer has been reached, the flow control bit will tell the IOX to hold off sending for 50 ms. The IOX will send the next frame at the end of this period
            and, depending on the flow control bit of the ACK, it will either continue sending or delay another 50 ms, thus repeating the process. The GO device will clear the flow control bit
            whenever the buffer is below the 20% watermark. If transferring data as part of a wrapped packet exchange, the streaming watermark can be ignored. The buffers will not overflow so long
            as the length limit and the modem result are honored. This byte is only sent when needed.
        </p>
        <h3>Payload</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0 - Bit 0</td>
                        <td>
                            0 = Clear to send more RX Data.
                            <br />1 = Stop sending UART Data. Buffer 80% full, withhold next frame 50 ms.
                        </td>
                    </tr>
                    <tr>
                        <td>1 - Bit 1-7</td>
                        <td>Reserved</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Application Specific Data (0x1C)</h2>
        <p>
            Sent by the GO device after a packet wrapped passthrough message attempt to the server. A 'rejected' response from the modem typically means it is not connected. If the message is
            'accepted', this means it was added to the modem's TCP socket buffer. It is NOT a confirmation that the message was successfully sent.
        </p>
        <h3>Type 0: Modem Transmission Result</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>
                            <strong>Byte #</strong>
                        </th>
                        <th>
                            <strong>Byte Description</strong>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>Log Type</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>
                            0 = Rejected
                            <br />1 = Accepted
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>IOX Single Frame Log Data (0x1D)</h2>
        <p>
            Sent from the IOX to the GO device when the IOX wants to create a log that can fit into a single CAN frame. Rate limit is 100 logs per 10 minutes. If you exceed the rate limit, the GO
            device will stop taking data from the IOX.
        </p>
        <h3>Payload</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>Log Type</td>
                    </tr>
                    <tr>
                        <td>1-7</td>
                        <td>Data</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Log Type: 0 (GenericDataRecord)</h3>
        <p>Used to request the GO log normal status data.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1-2</td>
                        <td>Data ID</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Data Length</td>
                    </tr>
                    <tr>
                        <td>4-7</td>
                        <td>Data</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Log Type: 3 (PriorityDataRecord)</h3>
        <p>Used to request the GO log status data and also send via Iridium, if available.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1-2</td>
                        <td>Data ID</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Data Length</td>
                    </tr>
                    <tr>
                        <td>4-7</td>
                        <td>Data</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Log Type: 1 (ExternalDeviceConnectionStatus)</h3>
        <p>Used to identify the service running on the IOX. Required to use the passthrough channel to communicate with MyGeotab.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>
                            Connected = 1
                            <br />
                            Disconnected = 0
                        </td>
                    </tr>
                    <tr>
                        <td>2-3</td>
                        <td>External Device ID</td>
                    </tr>
                    <tr>
                        <td>4-5</td>
                        <td>Connection flags</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br />
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Bits</th>
                        <th>Connection flags</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>Reserved</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Binary Data Packet Wrapping</td>
                    </tr>
                    <tr>
                        <td>2 - 15</td>
                        <td>Reserved</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>
            Binary Data Packet Wrapping: 0: The passthrough data from MyGeotab will be passed to the external device without modification. 1: The passthrough data from MyGeotab will be wrapped in a
            serial protocol before being sent to the external device. Note: If sending large payloads of variable sizes, it is recommended to use the binary wrapping flag to allow the device to
            distinguish and accommodate different packet sizes. The device should implement support for both 0x23 and 0x25 message formats as the GO will dynamically select which one to use based on
            the amount of data within each packet received from MyGeotab. The maximum packet size currently supported is 1000 bytes.
        </p>
        <p>
            For payloads with a length of 0 - 255 bytes, this format is used: | | Bytes | Position | | — | — | — | | STX (0x02) | 1 | 0 | | Message Type = 0x23 | 1 | 1 | | Message Body Length = x |
            1 | 2 | | Binary Data | x | 3 | | Checksum | 2 | 3+x | | ETX (0x03) | 1 | 5+x |
        </p>
        <p>
            For payloads with a length of 256 - 1000 bytes, this format is used: | | Bytes | Position | | — | — | — | | STX (0x02) | 1 | 0 | | Message Type = 0x25 | 1 | 1 | | Message Body Length = x
            | 2 | 2 | | Binary Data | x | 4 | | Checksum | 2 | 4+x | | ETX (0x03) | 1 | 6+x |
        </p>
        <p>
            More details on the checksum can be found here: <a href="/sdk/hardware/addon-protocols/rs232-usb/#checksum">Add-On Protocol - RS232 {"&"} USB</a>
        </p>
        <h3>Log Type: 2 (GenericFaultRecord)</h3>
        <p>Typically used to log a fault condition that needs to be escalated to a supervisor for human intervention.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1-2</td>
                        <td>Fault code</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>
                            Fault = 1
                            <br />
                            Information = 0
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>
                            Log Once Per Trip = 1
                            <br />
                            Log Every Fault = 0
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>IOX Multi-Frame Log Data (0x1E)</h2>
        <p>
            Sent from the IOX to the GO device when the IOX wants create a log that cannot fit into a single CAN frame. The first frame contains the Type and Length. All frames start with a Frame
            Counter that is an incrementing sequence number. The first frame always starts with 0x00.
        </p>
        <h3>Payload First Frame</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>Frame Counter (0x00)</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Log Type</td>
                    </tr>
                    <tr>
                        <td>2-3</td>
                        <td>Data Length</td>
                    </tr>
                    <tr>
                        <td>4-7</td>
                        <td>Data</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Payload Subsequent Frames</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>Frame Counter</td>
                    </tr>
                    <tr>
                        <td>1-7</td>
                        <td>Data</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Log Types</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>Third Party Free Format Data</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Reserved</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Bluetooth Record</td>
                    </tr>
                    <tr>
                        <td>3-9</td>
                        <td>Reserved</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>Driver ID</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>Curve Logging</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>Logging With Timestamp</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>Protobuf Data</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Type 0 Third Party Free Format Data</h3>
        <p>The maximum size is 27 bytes. Rate limit is 500 logs per 10 minutes. If you exceed the rate limit, the GO device will stop taking data from the IOX.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Driver ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-27</td>
                        <td>Data</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Type 2 Bluetooth Record</h3>
        <p>Rate limit is 1200 logs per 10 minutes. If you exceed the rate limit, the GO device will stop taking data from the IOX.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Bluetooth Record</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-6</td>
                        <td>MAC Address</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Data Type</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>FP24 Value</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>
            Further details can be found here: <a href="/sdk/hardware/addon-protocols/ble/">Add-On Protocol - BLE</a>
        </p>
        <h3>Type 11 Curve Logging</h3>
        <p>
            This message can be used to send the 4-byte (int32_t) data that is curve logged by the GO. Additional information about curve logging can be found here:{" "}
            <a href="https://github.com/Geotab/curve" target="_blank" rel="noreferrer">
                Curve Logging
            </a>
        </p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Curve Logging</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>Curve Function</td>
                    </tr>
                    <tr>
                        <td>1-2</td>
                        <td>Status Data ID</td>
                    </tr>
                    <tr>
                        <td>3-7</td>
                        <td>Data (signed 32bit)</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>Data Length</td>
                    </tr>
                    <tr>
                        <td>9-10</td>
                        <td>Allowed Error</td>
                    </tr>
                    <tr>
                        <td>11-12</td>
                        <td>Estimate Error</td>
                    </tr>
                    <tr>
                        <td>12-13</td>
                        <td>Deprecated = 0</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td>Smoothing Coefficient</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br />
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Curve Function</td>
                        <td>
                            2 = Add Point
                            <br />3 = Save Curve
                        </td>
                    </tr>
                    <tr>
                        <td>Allowed Error</td>
                        <td>
                            Vertical distance threshold (must be {">"} 0). All points with their vertical distance {">"} threshold are declared as significant points and saved.
                        </td>
                    </tr>
                    <tr>
                        <td>Estimate Error</td>
                        <td>
                            If EstimateError {">"} 0 and the new point deviated from estimated value {">"} EstimateError, we will reduce/save the curve.
                        </td>
                    </tr>
                    <tr>
                        <td>Smoothing Coefficient</td>
                        <td>
                            Applies a low pass filter to the data.
                            <br />
                            0 = No filtering
                            <br />
                            1-254 = Smoothing coefficient magnitude
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Type 12 Logging With Timestamp</h3>
        <p>This message can be used to send status data with a timestamp. Possible use cases:</p>
        <ol>
            <li>Store data in the IOX while the GO device is asleep and send all data after waking up</li>
            <li>
                Run the curve logging algorithm in the IOX and send those points to be transmitted to MyGeotab.
                <br />
                Additional information about curve logging can be found here:{" "}
                <a href="https://github.com/Geotab/curve" target="_blank" rel="noreferrer">
                    Curve Logging
                </a>
            </li>
        </ol>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Curve Logging</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-1</td>
                        <td>Status Data ID</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Data Length</td>
                    </tr>
                    <tr>
                        <td>3-6</td>
                        <td>Data (unsigned 32bit)</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>Timestamp (# secs since 2002-01-01)</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>Milliseconds</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Type 13 Protobuf Data</h3>
        <p>Supported from Add-On protocol version 1.2.</p>
        <p>
            This message allows an IOX to send a protobuf-encoded payload to the GO device. It supports a publish/subscribe model of vehicle status information. The GO device responds with GO
            Multi-Frame Data (0x27) - Type 13.{" "}
            <a href="https://github.com/Geotab/android-external-device-example/blob/master/app/src/main/proto/iox_messaging.proto" target="_blank" rel="noreferrer">
                Protobuf Schema
            </a>
            . The currently supported topics are:
        </p>
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
        <h2>Buzzer Beep (0x24)</h2>
        <p>Sent from an IOX to the GO device to request the buzzer beep with the given parameters.</p>
        <h3>Payload</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>Number of Beeps</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Duration (Multiple of 56ms)</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Delay Between Beeps (Multiple of 56ms)</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>IOX Request/Status (0x25)</h2>
        <p>Sent from the IOX to the GO device to inform the GO device of events or status changes.</p>
        <h3>Payload</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-1</td>
                        <td>Information Type</td>
                    </tr>
                    <tr>
                        <td>2-7</td>
                        <td>Optional bytes that depend on the type</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Information Type 0 - Busy</h2>
        <p>
            This message indicates to the GO device that the issuing IOX is busy with a critical task and that the GO should not enter the sleep state. The IOX should send this message again to
            release the GO device once it has completed its critical tasks.
        </p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-1</td>
                        <td>0x0000</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>
                            0 = Not busy
                            <br />1 = Busy
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Information Type 1 - Packet Wrapper</h2>
        <p>This is used to send a packet of up to 1023 bytes of binary data through the GO device to MyGeotab.</p>
        <p>Use cases:</p>
        <ol>
            <li>Send Packet Wrapper - Beginning of data packet (0).</li>
            <li>
                Multiple RX Data (0x0C) messages until the entire bypass binary data is sent. Pay attention to the Acknowledge (0x14) message responded from GO if the GO Receive-Buffer is ready to
                accept the next RX Data (0x0C) message. The streaming flow control bit in the ACK is not relevant for this type of exchange and can be ignored.
            </li>
            <li>Send Packet Wrapper - End of data packet (1).</li>
            <li>
                At the end, GO sends confirmation with a Application Specific Data (0x1C) Type 0 (Modem transmission result) message to indicate if the packet has been accepted within 6 seconds.
            </li>
        </ol>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-1</td>
                        <td>0x0001</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>
                            0 = Beginning of data packet
                            <br />1 = End of data packet{" "}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Information Type 2 - Request GO Device Data Message</h2>
        <p>This message is used by an IOX which requires vehicle information from the GO device. The GO device responds with a GO Multi-Frame Data (0x27) - Type 2 message.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-1</td>
                        <td>0x0002</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Message Version = 2</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Information Type 3 - Connect And Send Records</h2>
        <p>This message requests the GO modem initiate a connection to the server.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-1</td>
                        <td>0x0003</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Unused</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Information Type 4 - Request VIN Message</h2>
        <p>An IOX uses this message to request the vehicle's VIN from the GO device. The GO device responds with a GO Multi-frame Data (0x27) - Type 3 message.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-1</td>
                        <td>0x0004</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Unused</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Information Type 12 - Request Identification Of Go Device, Versions</h2>
        <p>Supported from protocol version 1.1.</p>
        <p>Sent from the IOX to the GO device requesting the identification information. The GO device responds with a GO Multi-Frame Data (0x27) - Type 12 message.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-1</td>
                        <td>0x000C</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>
                            Request info:
                            <br />
                            0 = GO serial number
                            <br />
                            1 = GO firmware version
                            <br />2 = IOX protocol version
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>GO Status Information (0x26)</h2>
        <p>Sent from the GO device to the IOX to pass information the IOX may need. This is a broadcast message. It is sent once any corresponding information type changes.</p>
        <h3>Payload</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-1</td>
                        <td>Information Type</td>
                    </tr>
                    <tr>
                        <td>2-7</td>
                        <td>Optional bytes that depend on the type</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Information Type 0 - Ignition</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-1</td>
                        <td>0x0000</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>
                            0 = Ignition Off
                            <br />1 = Ignition On
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Information Type 1 - Modem Availability</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-1</td>
                        <td>0x0000</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>
                            0 = Modem is not ready
                            <br />1 = Modem is available
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>GO Multi-Frame Data (0x27)</h2>
        <p>
            Sent from the GO device to the IOX when the GO device wants to transfer data that does not fit into a single CAN frame. The first frame contains the Type and Length. All frames start
            with a Frame Counter that is an incrementing sequence number. The first frame always starts with 0x00.
        </p>
        <h3>Payload First Frame</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>Frame Counter (0x00)</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Info Type</td>
                    </tr>
                    <tr>
                        <td>2-3</td>
                        <td>Data Length</td>
                    </tr>
                    <tr>
                        <td>4-7</td>
                        <td>Data</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Payload Subsequent Frames</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte #</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>Frame Counter</td>
                    </tr>
                    <tr>
                        <td>1-7</td>
                        <td>Data</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Info Types</h3>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Parameter Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>Reserved</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Reserved</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>GO device data packet</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>VIN</td>
                    </tr>
                    <tr>
                        <td>4-11</td>
                        <td>Reserved</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>GO info</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>Protobuf Data</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Type 2 GO Device Data</h3>
        <p>Sent in response to an IOX Request(0x25) message with a Type Request GO Device Data Message (0x02).</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Bytes</th>
                        <th>GO Device Data</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-3</td>
                        <td>Timestamp (# secs since 2002-01-01)</td>
                    </tr>
                    <tr>
                        <td>4-7</td>
                        <td>Latitude (1E-7 deg/bit)</td>
                    </tr>
                    <tr>
                        <td>8-11</td>
                        <td>Longitude (1E-7 deg/bit)</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>Road Speed (km/hr)</td>
                    </tr>
                    <tr>
                        <td>13-14</td>
                        <td>RPM</td>
                    </tr>
                    <tr>
                        <td>15-18</td>
                        <td>Odometer (0.1 Km/bit)</td>
                    </tr>
                    <tr>
                        <td>19</td>
                        <td>
                            Status Flags (from LSB):
                            <br />
                            1st bit: 1 = GPS Valid
                            <br />
                            2nd bit: 1 = Ignition On
                            <br />
                            3rd bit: 1 = Engine Bus Activity
                            <br />
                            4th bit: 1 = Date/Time Valid
                            <br />
                            5th bit: 1 = Speed From Engine
                            <br />
                            6th bit: 1 = Odometer From Engine
                        </td>
                    </tr>
                    <tr>
                        <td>20-23</td>
                        <td>Trip Odometer (0.1 Km/bit)</td>
                    </tr>
                    <tr>
                        <td>24-27</td>
                        <td>Total Engine Hours (0.1 hours/bit)</td>
                    </tr>
                    <tr>
                        <td>28-31</td>
                        <td>Trip Duration (1 second/bit)</td>
                    </tr>
                    <tr>
                        <td>32-35</td>
                        <td>Deprecated</td>
                    </tr>
                    <tr>
                        <td>36-39</td>
                        <td>Driver ID</td>
                    </tr>
                    <tr>
                        <td>40-51</td>
                        <td>GO Device Serial Number</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Type 3 VIN</h3>
        <p>Sent in response to an IOX Request(0x25) message with Type Request VIN (0x04).</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Bytes</th>
                        <th>GO Device Data</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0-16</td>
                        <td>VIN</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Type 12 GO Info</h3>
        <p>Supported from protocol version 1.1. Sent in response to IOX Request/Status (0x25) - Type 12.</p>
        <h5>Payload Id = 0</h5>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>=0 for payload is GO serial number.</td>
                    </tr>
                    <tr>
                        <td>1-12</td>
                        <td>GO serial number</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h5>Payload Id = 1</h5>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>=1 for payload is GO firmware version number.</td>
                    </tr>
                    <tr>
                        <td>1-2</td>
                        <td>GO firmware version: Product</td>
                    </tr>
                    <tr>
                        <td>3-4</td>
                        <td>GO firmware version: Major</td>
                    </tr>
                    <tr>
                        <td>5-6</td>
                        <td>GO firmware version: Minor</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h5>Payload Id = 2</h5>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Byte</th>
                        <th>Byte Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>=2 for payload is IOX protocol version number.</td>
                    </tr>
                    <tr>
                        <td>1-2</td>
                        <td>GO firmware version: Major</td>
                    </tr>
                    <tr>
                        <td>3-4</td>
                        <td>GO firmware version: Minor</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Type 13 Protobuf Data</h3>
        <p>Supported from protocol version 1.2.</p>
        <p>
            This message allows a GO device to send a protobuf-encoded payload to the IOX. It supports a publish/subscribe model of vehicle status information. It is a response to GO Multi-Frame
            Data (0x1E) - Type 13.{" "}
            <a href="https://github.com/Geotab/android-external-device-example/blob/master/app/src/main/proto/iox_messaging.proto" target="_blank" rel="noreferrer">
                Protobuf Schema
            </a>
            .
        </p>
    </div>
);

const sequenceDiagrams: ReactNode = (
    <div className="paragraph">
        <h2>Handshake</h2>
        <p>
            <img src="https://geotab.github.io/sdk/hardware/developing-an-iox/uml_handshake.png" alt="" />
        </p>
        <h2>Sleep/Wake</h2>
        <p>
            <img src="https://geotab.github.io/sdk/hardware/developing-an-iox/uml_sleep_wake.png" alt="" />
        </p>
        <h2>Data Logging</h2>
        <p>
            <img src="https://geotab.github.io/sdk/hardware/developing-an-iox/uml_data_logging.png" alt="" />
        </p>
        <h2>GO Info</h2>
        <p>
            <img src="https://geotab.github.io/sdk/hardware/developing-an-iox/uml_go_info.png" alt="" />
        </p>
        <h2>PubSub</h2>
        <p>
            <img src="https://geotab.github.io/sdk/hardware/developing-an-iox/uml_pubsub.png" alt="" />
        </p>
        <h2>MIME</h2>
        <p>
            <img src="https://geotab.github.io/sdk/hardware/developing-an-iox/uml_mime.png" alt="" />
        </p>
    </div>
);

const pageTitle: PageTitleProps = {
    title: "IO Expander Protocol",
    breadCrumbItems: ["Hardware", "Guides", "IO Expander Protocol"]
};

const pageSections: TableOfContentsItem[] = [
    {
        elementId: "general-description",
        summary: "General Description",
        details: generalDescription
    },
    {
        elementId: "polling",
        summary: "Polling",
        details: polling
    },
    {
        elementId: "waking-up-the-go-device",
        summary: "Waking Up The Go Device",
        details: wakingUpTheGoDevice
    },
    {
        elementId: "commands",
        summary: "Commands",
        details: commands
    },
    {
        elementId: "sequence-diagrams",
        summary: "Sequence Diagrams",
        details: sequenceDiagrams
    }
];

export default function MessagingProtocol() {
    return <Page section={HeaderSections.Hardware} pageTitle={pageTitle} tableOfContents={pageSections} />;
}
