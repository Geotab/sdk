import { ReactNode } from "react";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import Accordion from "../../../components/Accordion/Accordion";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import { CodeSample } from "../../../components/CodeSamplesContainer";

const spoofAnExternalDevice: ReactNode = (
  <div className="paragraph">
    <p>
      Run this python script while connected to a GO device via an IOX-RS232
    </p>
    <CodeSample
      language="python"
      code={
`import serial
import time
      
def checksum(message):
 b0 = 0
 b1 = 0   
 for i in range(0, len(message)):
  b0 += int(message[i])
  b1 += b0
 return bytes([b0%256, b1%256])
      
def createMessage(message):
 message = bytes([0x02]) + message
 check = checksum(message)
 message = message + check + bytes([0x03])
 return message
      
# look for ttyUSB in Linux (ls /dev/tty\*)
# with serial.Serial(port="/dev/ttyUSB0", baudrate = 9600, timeout=1) as tester:
# Use COMx in windows
# with serial.Serial(port="COM4", baudrate = 9600, timeout = 10) as tester:
      
# send sync char
print("sending sync char")
print("['0x55']")
tester.write(bytes([0x55]))
print("waiting for handshake request...")
readback = tester.read(6)
      
print([hex(b) for b in readback])
      
if len(readback) == 6 and readback[1] == 1:
 print("handshake request received")
 # send the handshake response
 deviceID = 4208 #4208 is a test Device ID
 handshakeResponse = createMessage(bytes([0x81, 4, deviceID%256, (deviceID >> 8)%256, 0, 0]))
 print("sending handshake response")
 print([hex(b) for b in handshakeResponse])
 tester.write(handshakeResponse)
 time.sleep(1)
 # send some status data
 statusDataID = 35349 #status data id of "Test engine measurement / fake data"
 dataValue = 200 #data value of 10 will show on MyGeotab (because of the conversion factor of 0.1 and offset of -10)
      
 dataMessage = createMessage(bytes([0x80, 6, statusDataID%256, (statusDataID >> 8)%256, dataValue%256, (dataValue >> 8)%256, 0, 0]))
      
 print("sending status data")
 print([hex(b) for b in dataMessage])
 tester.write(dataMessage)
 print("waiting for data ACK...")
 readback = tester.read(6)
      
 print([hex(b) for b in readback])
      
 if len(readback) == 6 and readback[1] == 2:
  print("data ACK received")
else:
  print("invalid response")`}
    />
    <p>If the script executes successfully against an awake (ideally with Ignition On) GO device, the output should resemble:</p>
    <CodeSample
      language="python"
      code={
`# sending sync char
['0x55']

# waiting for handshake request…
['0x2', '0x1', '0x0', '0x3', '0x8', '0x3']

# handshake request received
# sending handshake response
['0x2', '0x81', '0x4', '0x70', '0x10', '0x0', '0x0', '0x07', '0x18', '0x3']

# sending status data
['0x2', '0x80', '0x6', '0x15', '0x8a', '0xc8', '0x0', '0x0', '0x0', '0xef', '0x8c', '0x3']

# waiting for data ACK…
['0x2', '0x2', '0x0', '0x4', '0xa', '0x3']

# data ACK received`}
    />
  </div>
);

const spoofAGODevice: ReactNode = (
  <div className="paragraph">
    <p>Run this Python script to emulate a GO device while your external device is connected via the RS232 port:</p>
    <CodeSample
      language="python"
      code={
`import serial
import time

def checksum(message):
 b0 = 0
 b1 = 0
 for i in range(0, len(message)):
  b0 += int(message[i])
  b1 += b0
 return bytes([b0%256, b1%256])

def createMessage(message):
 message = bytes([0x02]) + message
 check = checksum(message)
 message = message + check + bytes([0x03])
 return message

# look for ttyUSB in Linux (ls /dev/tty\*)
# with serial.Serial(port="/dev/ttyUSB1", baudrate = 9600, timeout = 60) as tester:
# Use COMx in windows
# with serial.Serial(port="COM7", baudrate = 9600, timeout = 60) as tester:

# read sync char
print("waiting for sync char...")
readback = tester.read(1)

if len(readback) and readback[0] == 0x55:
 print("sync char received")
 print([hex(b) for b in readback])

 handshakeRequest = createMessage(bytes([0x1, 0]))
 print("sending handshake request")
 print([hex(b) for b in handshakeRequest])
 tester.write(handshakeRequest)

 print("waiting for handshake response...")
 readback = tester.read(10)
 print([hex(b) for b in readback])

 if len(readback) == 10 and readback[1] == 0x81:
  print("handshake response received")

  while(1):
   print("waiting for status data...")
   readback = tester.read(12)
   print([hex(b) for b in readback])

   if len(readback) == 12 and readback[1] == 0x80:
    print("status data received")
    statusDataID = readback[3] + (readback[4] << 8)
    dataValue = readback[5] + (readback[6] << 8)

    print("status data id: " + str(statusDataID) + ", value: " + str(dataValue))
    ackMessage = createMessage(bytes([0x2, 0x0]))
    print("sending ack")
    print([hex(b) for b in ackMessage])
    tester.write(ackMessage)
    break`}
     />
  </div>
);

const pageTitle: PageTitleProps = {
  title: "Python Code Samples",
  breadCrumbItems: ["Hardware", "Code Samples", "Python"],
};

const pageSections: TableOfContentsItem[] = [
  {
    elementId: "spoof-an-external-device",
    summary: "Spoof an external Device",
    details: spoofAnExternalDevice,
  },
  {
    elementId: "spoof-a-go-device",
    summary: "Spoof a Go Device",
    details: spoofAGODevice,
  },
];

export default function Python() {
  return (
    <Page
      section={HeaderSections.MyGeotab}
      pageTitle={pageTitle}
      tableOfContents={pageSections}
    >
      <div className="paragraph">
        <p>
          All Python sample code was tested using Python 3.5.2 (64-bit) running
          under Windows 10. You will need to install pySerial to test these
          samples.
        </p>
        <code className="small-code-sample">{`pip install pyserial`}</code>
      </div>

      {pageSections.map((section) => (
        <Accordion
          summary={section.summary}
          p={section.details}
          id={section.elementId}
        />
      ))}
    </Page>
  );
}
