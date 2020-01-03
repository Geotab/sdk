---
layout: page
permalink: /hardware/samples/python/
title: Python Code Samples
--- 

All Python sample code was tested using Python 3.5.2 (64-bit) running under Windows 10. You will need to install pySerial to test these samples.

`pip install pyserial`

## Spoof an External Device

Run this python script while connected to a GO device via an IOX-RS232

```py
import serial
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
  #send the handshake response
  deviceID = 4108 #device id of Geotab app launcher device
  handshakeResponse = createMessage(bytes([0x81, 4, deviceID%256, (deviceID >> 8)%256, 0, 0]))
  print("sending handshake response")
  print([hex(b) for b in handshakeResponse])
  tester.write(handshakeResponse)
  time.sleep(1)
  # send some status data
  statusDataID = 34801 #status data id of Air Temperature
  dataValue = 200 #temperature value of 20C (because of the conversion factor of 0.1)

  dataMessage = createMessage(bytes([0x80, 6, statusDataID%256, (statusDataID >> 8)%256, dataValue%256, (dataValue >> 8)%256, 0, 0]))

  print("sending status data")
  print([hex(b) for b in dataMessage])
  tester.write(dataMessage)
  print("waiting for data ACK...")
  readback = tester.read(6)

  print([hex(b) for b in readback])

  if len(readback) == 6 and readback[1] == 2:
   print("data ACK received")
 Else:
  print("invalid response")
```

If the script executes successfully against an awake (ideally with Ignition On) GO device, the output should resemble:

```py
# sending sync char
['0x55']

# waiting for handshake request…
['0x2', '0x1', '0x0', '0x3', '0x8', '0x3']

# handshake request received
# sending handshake response
['0x2', '0x81', '0x4', '0xc', '0x10', '0x0', '0x0', '0xa3', '0x88', '0x3']

# sending status data
['0x2', '0x80', '0x6', '0x35', '0x0', '0x3c', '0x0', '0x0', '0x0', '0xf9', '0x6a', '0x3']

# waiting for data ACK…
['0x2', '0x2', '0x0', '0x4', '0xa', '0x3']

# data ACK received
```

## Spoof a GO device
Run this Python script to emulate a GO device while your external device is connected via the RS232 port:

```py
import serial
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
     break
```