import { ReactNode } from "react";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import Accordion from "../../../components/Accordion/Accordion";
import hardwareSystemDesignIntroImage from "./../../../assets/images/hardwareDesignGuide/hardware-design-guide_0.png";
import hardwareConnectorImage from "./../../../assets/images/hardwareDesignGuide/hardware-design-guide_1.png";
import miniBUSBPlugInputImage from "./../../../assets/images/hardwareDesignGuide/hardware-design-guide_2.png";
import hardwareMechanicalSizeImage1 from "./../../../assets/images/hardwareDesignGuide/hardware-design-guide_4.png";
import hardwareMechanicalSizeImage2 from "./../../../assets/images/hardwareDesignGuide/hardware-design-guide_5.png";

const systemIntroduction: ReactNode = (
  <div className="paragraph">
    <p>
      The GO Device is a small yet extremely powerful telematics measurement device. It offers Geotab IOX® expandability for hardware Add-Ons, which could be provided by Geotab or a third party.
    </p>
    <p>
      This hardware design guide is suggested reading for any third-party manufacturer who wants to design and build devices that integrate with the GO Device. For more information on the IOX communication protocols, see the IOX Protocol document.
    </p>

    <img
      className="hardwareDesignGuide__hardwareDesignIMG"
      src={hardwareSystemDesignIntroImage}
      alt="Figure #1 - hardware system design intro."
    />
  </div>
);

const hardwareStructure: ReactNode = (
  <div className="paragraph">
    <p>
      The third-party device can get 12 V/24 V power from the GO Device, communicate with the GO Device through the CAN bus, and perform its specific service for end customers.
    </p>
    <p>
      The GO Device provides a mini-B USB receptacle for connecting IOXs and third-party devices. This USB receptacle does not carry USB signals or power, but does provide the CAN bus and power from the vehicle. Two small plastic guards are placed around this receptacle to prevent misinsertion of a real USB plug. The corresponding connector on an IOX or a third-party device should be a mini-B USB plug.
    </p>
    <img
      className="hardwareDesignGuide__hardwareDesignIMG"
      src={hardwareConnectorImage}
      alt="Figure #2 - hardware connector diagram."
    />
    <p>
      Multiple IOXs can be connected to the GO Device through a daisy chain configuration. The IOX device itself has a mini-B USB receptacle that can provide CAN bus and power from the vehicle to the next device in the chain.
    </p>
    <p>
      <strong>A mini-B USB receptacle needs to be added to a third-party device if this third-party device is not meant to be the last device in a daisy chain or if more than one third-party device will be used in the chain.</strong>
    </p>
  </div>
);

const miniBUSBPlugInput: ReactNode = (
  <div className="paragraph">
    <p>
      The diagram and table below provides pin numbering and definitions.
    </p>
    <img
      className="hardwareDesignGuide__hardwareDesignIMG"
      src={miniBUSBPlugInputImage}
      alt="Figure #3 - Mini-B USB Plug Input diagram"
    />
    <br></br>
    <div className="hardwareDesignGuide__table-container">
      <table className="hardwareDesignGuide__table">
        <thead>
          <tr>
            <th>Pin No.</th>
            <th>Definition</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>NC</td>
            <td>This pin must be left unconnected</td>
          </tr>
          <tr>
            <td>2</td>
            <td>CAN-</td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>CAN+</td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td>GND</td>
            <td></td>
          </tr>
          <tr>
            <td>5</td>
            <td>Power</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const powerDesign: ReactNode = (
  <div className="paragraph">
    <p>
      The GO Device provides overvoltage protection, undervoltage protection, and overcurrent protection for the battery power supply to the IOX interface.
    </p>
    <p>
      The third-party device must work properly with a power input voltage range between 6 V and 33 V.
    </p>
    <p>
      A current of up to 3 A could be supplied from the GO Device to be shared by all the IOX devices in the daisy chain. It is suggested that the current consumption be limited to 2.5 A for one third-party device if the device is the only one connected to the GO Device. The maximum current should be calculated during hardware design if more than one devices is intended to be in the daisy chain. The GO Device will cut off power if the current exceeds 3 A for more than 18.6 ms {"("}minimum{")"}.
    </p>
    <p>
      Reverse current to the power line must be prevented, for which a diode on the power input would be sufficient.
    </p>
    <p>
      The third-party device must enter Sleep Mode when notified by the GO Device or when it fails to communicate with the GO Device after a reset. The current of the device in Sleep Mode should not exceed 2 mA at 12 V. The preferred Sleep Mode current is below 0.4 mA.
    </p>
  </div>
);

const canBusCommunication: ReactNode = (
  <div className="paragraph">
    <p>The CAN controller should support CAN 2.0B @ 500 kbps.</p>
    <p>The CAN transceiver must be compatible with ISO 11898. SAE J2284 and GMW3122 are optional, but better to have. Suggested parts at the time of writing are Atmel ATA6561, NXP TJA1042TK/3, Microchip MCP2562T and TI TCAN1042.</p>
    <p>The CAN transceiver should enter Standby Mode to save power when the device is in Sleep Mode. In Standby Mode, the receiver either remains active or RXD is with Wake-Up Request function {"("}A wake-up request is output to RXD {"("}driven low{")"} for any dominant bus transmissions longer than a filter time.{")"} Correspondingly, the MCU should have ability to be woken up by a CAN message or an external interrupt.</p>
    <p>A 120-ohm differential impedance must be implemented for the CAN bus in the design of the PCB. If the third-party device is designed without a USB receptacle, a 120-ohm terminal resistor should be added to the CAN bus, otherwise the CAN bus terminal resistor is not allowed on the board.
    </p>
  </div>
);

const mechanicalDesign: ReactNode = (
  <div className="paragraph">
    <p>Below is the mechanical size for a USB mini-B plug of the IOX device. All dimensions are given in mm.</p>
    <img
      className="hardwareDesignGuide__hardwareDesignIMG"
      src={hardwareMechanicalSizeImage1}
      alt="Figure #4 - USB mini-B plug IOX mechanical design diagram overview."
    />
    <p>The suggested cable length is between 30 cm to 100 cm, which is based on the multiple devices in the daisy chain. The length of cable may be longer if the system of the application is with fewer devices. The positive and negative wire of the CAN bus need to be a twisted pair with inner shielding around just them, with a  minimum twisting ratio is 1 twist every 25.4 mm.</p>
    <p>It is suggested that you shield the whole wires and that you short the drain wires of both shields {"("}the shield for whole wires and the shield for the CAN bus{")"} to the metal body of the USB plug.</p>
    <p>Below is the mechanical size for a USB mini-B socket of the IOX device. All dimensions are given in mm.</p>
    <img
      className="hardwareDesignGuide__hardwareDesignIMG"
      src={hardwareMechanicalSizeImage2}
      alt="Figure #5 - USB mini-B plug IOX mechanical size."
    />
    <p>It is suggested that an IOX socket is included where possible so additional IOX devices can be daisy chained.</p>
  </div>
);

const pageTitle: PageTitleProps = {
  "title": "IOX Add-On Hardware Design Guide",
  "breadCrumbItems": ["Hardware", "Developing an IOX", "Hardware Design Guide"]
};

const pageSections: TableOfContentsItem[] = [
  {
    "elementId": "system-introduction",
    "summary": "System Introduction",
    "details": systemIntroduction
  },
  {
    "elementId": "hardware-structure",
    "summary": "Hardware Structure",
    "details": hardwareStructure
  },
  {
    "elementId": "mini-b-usb-plug-input",
    "summary": "Mini-B USB Plug Input",
    "details": miniBUSBPlugInput
  },
  {
    "elementId": "power-design",
    "summary": "Power Design",
    "details": powerDesign
  },
  {
    "elementId": "can-bus-communication",
    "summary": "CAN Bus Communication",
    "details": canBusCommunication
  },
  {
    "elementId": "mechanical-design",
    "summary": "Mechanical Design",
    "details": mechanicalDesign
  },
];

export default function HardwareDesignGuide() {
  return (
    <Page section={HeaderSections.Hardware} pageTitle={pageTitle} tableOfContents={pageSections}>
      {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId} />)}
    </Page>
  );
}
