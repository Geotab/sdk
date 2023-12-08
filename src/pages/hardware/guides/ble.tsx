import { ReactNode } from "react";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import { Page } from "../../../components";
import Accordion from "../../../components/Accordion/Accordion";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";

const advertisingPacket: ReactNode = (
    <div className="paragraph">
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Offset</th>
                        <th>Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>0x02</td>
                        <td>AD length</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>0x01</td>
                        <td>Flags</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>0x06</td>
                        <td>-LE General Discoverable Mode-BR/EDR Not Supported</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>0x06 +Optional Length</td>
                        <td>AD length</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>0xFF</td>
                        <td>Manufacturer Specific Data</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>0x0275</td>
                        <td>Geotab's Company ID</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>0x00</td>
                        <td>Advertising packet version number</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>0xXX</td>
                        <td>Tx Power Level</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>0xXX</td>
                        <td>Battery Level</td>
                    </tr>
                    <tr>
                        <td>Optional Length{"("}11 to 31{")"}</td>
                        <td>0xXX</td>
                        <td>Optional Information identifier</td>
                    </tr>
                    <tr>
                        <td>3 bytes</td>
                        <td>Optional Information data</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>…</td>
                        <td>…</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>0xXX</td>
                        <td>Optional Information identifier</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>X bytes</td>
                        <td>Optional Information data</td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Required Data Types</h2>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Unit type</th>
                        <th>Range</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tx Power Level</td>
                        <td>Sint 8</td>
                        <td>Resolution: 1 dBmMin: -100 dBmMax: 20 dBm</td>
                    </tr>
                    <tr>
                        <td>Battery Level</td>
                        <td>Uint 8</td>
                        <td>Resolution: 1 %Min: 0%Max: 100%</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Optional Information Types</h2>
        <p>These information types are optional and are not part of the required packet structure. Each entry must be preceded by the corresponding information identifier byte. If multiple information
            entries are used in the same advertisement packet, they should be arranged in an incrementing order based on their information identifier. The currently defined identifiers are listed in the
            table below. Geotab will define new identifiers for any new sensors, as required. You must use the IDs as defined by Geotab. If there is undefined data, contact us via the Help Desk and we will
            define the data and send you the required ID.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Information identifier</th>
                        <th>Description</th>
                        <th>Unit type</th>
                        <th>Length {"("}bytes{")"}</th>
                        <th>Units</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0 to 4</td>
                        <td>Reserved</td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Firmware Version</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>None</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Accelerometer Event Counter</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>None</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>Temperature</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Degrees Celsius {"("}°C{")"}</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>Illuminance</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Lux {"("}lx{")"}</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>Relative Humidity</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Percent {"("}%{")"}</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>Barometric Pressure</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Pascals {"("}Pa{")"}</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>Altitude</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Meters {"("}m{")"}</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>Particulate Matter {"("}less than 1 µm{")"}</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Micrograms per cubic meter {"("}µg/m3{")"}</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>Particulate Matter {"("}less than 2.5 µm{")"}</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Micrograms per cubic meter {"("}µg/m3{")"}</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td>Particulate Matter {"("}less than 10 µm{")"}</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Micrograms per cubic meter {"("}µg/m3{")"}</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>Nitric Oxide</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Parts per million {"("}ppm{")"}</td>
                    </tr>
                    <tr>
                        <td>16</td>
                        <td>Nitrogen Dioxide</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Parts per million {"("}ppm{")"}</td>
                    </tr>
                    <tr>
                        <td>17</td>
                        <td>Carbon Monoxide</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Parts per million {"("}ppm{")"}</td>
                    </tr>
                    <tr>
                        <td>18</td>
                        <td>Ammonia</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Parts per million {"("}ppm{")"}</td>
                    </tr>
                    <tr>
                        <td>19</td>
                        <td>Methane</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Parts per million {"("}ppm{")"}</td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td>Ethanol</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Parts per million {"("}ppm{")"}</td>
                    </tr>
                    <tr>
                        <td>21</td>
                        <td>Hydrogen</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Parts per million {"("}ppm{")"}</td>
                    </tr>
                    <tr>
                        <td>22</td>
                        <td>Carbon Dioxide</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Parts per million {"("}ppm{")"}</td>
                    </tr>
                    <tr>
                        <td>23</td>
                        <td>Fuel Level</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td>Percent {"("}%{")"}</td>
                    </tr>
                    <tr>
                        <td>24 to 199</td>
                        <td>Reserved{"("}for future data types{")"}</td>
                        <td>FP24</td>
                        <td>3</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>200 to 229</td>
                        <td>Reserved</td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>230 to 239</td>
                        <td>Generic Byte {"("}1 to 10{")"}</td>
                        <td>UINT8</td>
                        <td>1</td>
                        <td>None</td>
                    </tr>
                    <tr>
                        <td>240 to 249</td>
                        <td>Generic Timer {"("}1 to 10{")"}</td>
                        <td>UINT8UINT16</td>
                        <td>12</td>
                        <td>Event CounterUnits Of Time</td>
                    </tr>
                    <tr>
                        <td>250 to 253</td>
                        <td>Reserved</td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>254</td>
                        <td>Wakeup Event</td>
                        <td>UINT8</td>
                        <td>1</td>
                        <td>None</td>
                    </tr>
                    <tr>
                        <td>255</td>
                        <td>Custom Data</td>
                        <td>UINT8</td>
                        <td>X</td>
                        <td>None</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>FP24 {"("}Floating Point 24 bit{")"}</h2>
        <p>Same as FP32 but the 8 least-significant bits dropped.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>S</th>
                        <th>E</th>
                        <th>E</th>
                        <th>E</th>
                        <th>E</th>
                        <th>E</th>
                        <th>E</th>
                        <th>E</th>
                        <th>E</th>
                        <th>F</th>
                        <th>F</th>
                        <th>F</th>
                        <th>F</th>
                        <th>F</th>
                        <th>F</th>
                        <th>F</th>
                        <th>F</th>
                        <th>F</th>
                        <th>F</th>
                        <th>F</th>
                        <th>F</th>
                        <th>F</th>
                        <th>F</th>
                        <th>F</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>23</td>
                        <td>22</td>
                        <td>21</td>
                        <td>20</td>
                        <td>19</td>
                        <td>18</td>
                        <td>17</td>
                        <td>16</td>
                        <td>15</td>
                        <td>14</td>
                        <td>13</td>
                        <td>12</td>
                        <td>11</td>
                        <td>10</td>
                        <td>9</td>
                        <td>8</td>
                        <td>7</td>
                        <td>6</td>
                        <td>5</td>
                        <td>4</td>
                        <td>3</td>
                        <td>2</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>{"["} -2^16, 2^16 {"]"} can be exactly represented</p>
        <p>{"["} -2^17, -2^16 -1 {"]"} or {"["} 2^16 +1, 2^17 {"]"} rounded to a multiple of 2</p>
        <p>{"["} -2^18, -2^17 -1 {"]"} or {"["} 2^17 +1 2^18 {"]"} rounded to a multiple of 4</p>
        <p>…</p>
        <p>Infinity at: 2^128</p>
        <h2>FP24 Conversions:</h2>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Store</td>
                        <td>Convert to FP32FP24 = FP32 » 8</td>
                    </tr>
                    <tr>
                        <td>Read</td>
                        <td>FP32 = FP24 « 8Read as FP32</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>Note:</p>
        <p>For all information types that use the FP24 format, a new log will be generated for any change in the data. For example, a change in temperature from 2°C to 2.000061°C would trigger a new log.
            Some implementations may only require a reporting resolution of 1°C. If an excessive number of logs are generated, we will disable reporting on BLE data. The onus is on the implementer to choose
            an appropriate reporting resolution for their data.</p>
        <h2>Generic Byte</h2>
        <p>The Generic Byte type can store one byte of data {"("}0 to 255{")"}. It can be used to count the number of times a button is pressed, or simply store the state of a toggle switch {"("}0 or 1{")"}. Any data
            changes will generate a new log.</p>
        <h2>Generic Timer</h2>
        <p>The Generic Timer allows keeping track of an elapsed time. The Units Of Time are not specifically defined and can be chosen by the implementor. It may make sense to measure some durations in
            hours, while others may warrant seconds. The Units Of Time may continuously increment. A new log will not be saved until a new event counter value is reported. The Generic Timer can be
            associated with other data types. For example, you can associate Generic Timer 1 with temperature to indicate the time when a chosen temperature threshold was exceeded.</p>
        <h2>Wakeup Event</h2>
        <p>A custom parameter is used to configure the IOX-BT to wake up periodically to check for any wakeup events from beacons within range. The wakeup duration is 1s every 30s while sleeping. This
            periodic wakeup can be enabled using the following custom parameter:</p>
        <code className="small-code-sample">{`<Parameter Description='Enable Periodic Bluetooth Wakeup' Offset='167' Bytes='80' IsEnabled='true'/>`}</code>
        <p>The implementor of this protocol should increase the frequency of advertisements sent during an attempted wakeup event. We recommend a 100ms advertisement interval that persists for a minimum of
            1 minute.</p>
        <p>When sending the wakeup event as part of the advertisement data, a value of 0x00 means “no event”. Anything greater than 0 that has not already been reported will cause the GO device to wake up
            and report on the beacon advertisements. The event is only used as an indication for reporting any changes in the rest of the advertisement data. The actual contents of the alert event byte will
            not be sent/reported.</p>
        <h2>Custom Data</h2>
        <p>Arbitrary data can be placed in the custom data segment. The data will not be interpreted by MyGeotab, but will be accessible through the API. The onus is on the implementor to extract and
            interpret the data. The data must be preceded by the length. The length is limited by the amount of data that can fit in the optional information section. The maximum custom data length is 18
            bytes. Any data changes will generate a new log.</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Offset</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Length</td>
                    </tr>
                    <tr>
                        <td>2 to Length</td>
                        <td>Custom Data</td>
                    </tr>
                </tbody>
            </table>
            <p>Example:</p>
        </div>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Length</th>
                        <th>Data</th>
                        <th> </th>
                        <th> </th>
                        <th> </th>
                        <th> </th>
                        <th> </th>
                        <th> </th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>255</td>
                        <td>8</td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Message Interleaving</h2>
        <p>Message interleaving is not supported. The data types in the packet must remain consistent between advertisements.</p>
        <h2>Example Packets</h2>
        <p>Reporting temperature</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Offset</th>
                        <th>Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>0x02</td>
                        <td>AD length</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>0x01</td>
                        <td>Flags</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>0x06</td>
                        <td>-LE General Discoverable Mode-BR/EDR Not Supported</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>0x0A</td>
                        <td>AD length</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>0xFF</td>
                        <td>Manufacturer Specific Data</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>0x0275</td>
                        <td>Geotab's Company ID</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>0x00</td>
                        <td>Advertising packet version number</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>0xC6</td>
                        <td>Tx Power Level {"("}-58dBm{")"}</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>0x64</td>
                        <td>Battery Level {"("}100%{")"}</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>0x07</td>
                        <td>Temperature</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>0x00</td>
                        <td>0x412000 FP24 = 10°C</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>0x20</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td>0x41</td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>Reporting a timer</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Offset</th>
                        <th>Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>0x02</td>
                        <td>AD length</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>0x01</td>
                        <td>Flags</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>0x06</td>
                        <td>-LE General Discoverable Mode-BR/EDR Not Supported</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>0x0A</td>
                        <td>AD length</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>0xFF</td>
                        <td>Manufacturer Specific Data</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>0x0275</td>
                        <td>Geotab's Company ID</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>0x00</td>
                        <td>Advertising packet version number</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>0xC6</td>
                        <td>Tx Power Level {"("}-58dBm{")"}</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>0x64</td>
                        <td>Battery Level {"("}100%{")"}</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>0xF1</td>
                        <td>Generic Timer 2</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>0x03</td>
                        <td>Event</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>0xF4</td>
                        <td>0x01F4 = 500 minutes</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td>0x01</td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>Reporting temperature and a timer</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Offset</th>
                        <th>Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>0x02</td>
                        <td>AD length</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>0x01</td>
                        <td>Flags</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>0x06</td>
                        <td>-LE General Discoverable Mode-BR/EDR Not Supported</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>0x0E</td>
                        <td>AD length</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>0xFF</td>
                        <td>Manufacturer Specific Data</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>0x0275</td>
                        <td>Geotab's Company ID</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>0x00</td>
                        <td>Advertising packet version number</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>0xC6</td>
                        <td>Tx Power Level {"("}-58dBm{")"}</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>0x64</td>
                        <td>Battery Level {"("}100%{")"}</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>0x07</td>
                        <td>Temperature</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>0x00</td>
                        <td>0x412000 FP24 = 10°C</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>0x20</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td>0x41</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>0xF1</td>
                        <td>Generic Timer 2</td>
                    </tr>
                    <tr>
                        <td>16</td>
                        <td>0x03</td>
                        <td>Event</td>
                    </tr>
                    <tr>
                        <td>17</td>
                        <td>0xF4</td>
                        <td>0x01F4 = 500 minutes</td>
                    </tr>
                    <tr>
                        <td>18</td>
                        <td>0x01</td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>Reporting custom data</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Offset</th>
                        <th>Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>0x02</td>
                        <td>AD length</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>0x01</td>
                        <td>Flags</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>0x06</td>
                        <td>-LE General Discoverable Mode-BR/EDR Not Supported</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>0x0F</td>
                        <td>AD length</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>0xFF</td>
                        <td>Manufacturer Specific Data</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>0x0275</td>
                        <td>Geotab's Company ID</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>0x00</td>
                        <td>Advertising packet version number</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>0xC6</td>
                        <td>Tx Power Level {"("}-58dBm{")"}</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>0x64</td>
                        <td>Battery Level {"("}100%{")"}</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>0xFF</td>
                        <td>Custom Data</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>0x07</td>
                        <td>Length</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>0x42</td>
                        <td>Custom data”Beacon1” in ASCII</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td>0x65</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>0x61</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>16</td>
                        <td>0x63</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>17</td>
                        <td>0x6F</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>18</td>
                        <td>0x6E</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>19</td>
                        <td>0x31</td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>Reporting temperature + counter + timer + custom data</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Offset</th>
                        <th>Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>0x02</td>
                        <td>AD length</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>0x01</td>
                        <td>Flags</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>0x06</td>
                        <td>-LE General Discoverable Mode-BR/EDR Not Supported</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>0x19</td>
                        <td>AD length</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>0xFF</td>
                        <td>Manufacturer Specific Data</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>0x0275</td>
                        <td>Geotab's Company ID</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>0x00</td>
                        <td>Advertising packet version number</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>0xC6</td>
                        <td>Tx Power Level {"("}-58dBm{")"}</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>0x64</td>
                        <td>Battery Level {"("}100%{")"}</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>0x07</td>
                        <td>Temperature</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>0x00</td>
                        <td>0x412000 FP24 = 10°C</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>0x20</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td>0x41</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>0xE6</td>
                        <td>Generic Counter 1</td>
                    </tr>
                    <tr>
                        <td>16</td>
                        <td>0x08</td>
                        <td>Count</td>
                    </tr>
                    <tr>
                        <td>17</td>
                        <td>0xF1</td>
                        <td>Generic Timer 2</td>
                    </tr>
                    <tr>
                        <td>18</td>
                        <td>0x03</td>
                        <td>Event</td>
                    </tr>
                    <tr>
                        <td>19</td>
                        <td>0xF4</td>
                        <td>0x01F4 = 500 minutes</td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td>0x01</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>21</td>
                        <td>0xFF</td>
                        <td>Custom Data</td>
                    </tr>
                    <tr>
                        <td>22</td>
                        <td>0x07</td>
                        <td>Length</td>
                    </tr>
                    <tr>
                        <td>23</td>
                        <td>0x42</td>
                        <td>Custom data”Beacon1” in ASCII</td>
                    </tr>
                    <tr>
                        <td>24</td>
                        <td>0x65</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>25</td>
                        <td>0x61</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>26</td>
                        <td>0x63</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>27</td>
                        <td>0x6F</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>28</td>
                        <td>0x6E</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>29</td>
                        <td>0x31</td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const pageTitle: PageTitleProps = {
    "title": "Add-On Protocol - BLE",
    "breadCrumbItems": ["Hardware", "Protocols", "BLE"]
};

const pageSections: TableOfContentsItem[] = [
    {
        "elementId": "advertising-packet",
        "summary": "Advertising Packet",
        "details": advertisingPacket
    }
];

export default function Ble() {
    return (
        <Page section={HeaderSections.Hardware} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                <p>External devices can communicate with the Geotab GO device through the Third-Party Bluetooth Low Energy {"("}BLE
                    {")"} protocol described on this page. The hardware interface is the <a target="_blank" rel="noopener noreferrer"
                        href="https://support.geotab.com/ioxs/installation/doc/iox-bt">IOX-BT</a>.</p>
                <p>The IOX-BT is a read-only BLE sensor hub that supports up to 200 in-range beacons and will detect in/out of range
                    for any Bluetooth beacon with a public MAC Address. However, sending any other data points requires the beacon to
                    conform to the specified Geotab BLE protocol. Rate limit is 1200 logs per 10 minutes. If you exceed the rate limit,
                    the GO device will stop taking data from the IOX.</p>
                <p>Because it can only read packets, no handshake is required. Two-way communication and device pairings are not possible.</p>
            </div>

            {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId} />)}
        </Page>
    );
};