import { ReactNode } from "react";

import { Page } from "../../components";
import { PageTitleProps } from "../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../components/TableOfContents/TableOfContents";

import Accordion from "../../components/Accordion/Accordion";

const updateDecember042023: ReactNode = (
  <div className="paragraph">
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>ApiRatePlan</h2>
    <ul>
      <li>
        In September, we added two parameters (<code className="small-code-sample">isAutoActivated</code> and <code className="small-code-sample">billingStartDate</code>) to the <strong>GetDeviceContractsByPage</strong> and <strong>GetDeviceContracts</strong> methods. As a result, we will be deprecating the <code className="small-code-sample">isAutoActivated</code> property from the <strong>ApiRatePlan</strong> object.
      </li>
    </ul>
  </div>
);

const updateOctober042023: ReactNode = (
  <div className="paragraph">
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>PostOrder</h2>
    <ul>
      <li>
        Currently, for the <strong>PostOrder</strong> method, <strong>InvalidDataException</strong> is returned when there is an exception. In a future release, these exceptions will be returned as a <strong>MyAdminException</strong> instead.
      </li>
    </ul>
  </div>
);

const updateSeptember052023: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>GetDeviceContractsByPage & GetDeviceContracts</h2>
    <ul>
      <li>
        Along with the new <code className="small-code-sample">Auto-Activated</code> and <code className="small-code-sample">Billing Start Date</code> columns in Device Admin, we have added two new parameters to the <strong>GetDeviceContractsByPage</strong> and <strong>GetDeviceContracts</strong> methods:
      </li>
      <ul>
        <li>
          <code className="small-code-sample">isAutoActivated</code> — Returns a result that indicates whether the device was auto-activated by Geotab.
        </li>
        <ul>
          <li>
            <strong>true</strong> — The device was auto-activated by Geotab.
          </li>
          <li>
            <strong>false</strong> — The device has yet to be activated or was activated from being installed in an asset.
          </li>
        </ul>
        <li>
          <code className="small-code-sample">billingStartDate</code> — Returns the date when the device was activated.
        </li>
      </ul>
    </ul>
    <h2>CalculateVinOemEligibilitiesAsync and GetOemSupportEligibilityForMakeAsync</h2>
    <ul>
      <li>
        Together with the Vehicle / VIN Lookup page improvements, we've added the following APIs to allow you to confirm whether a vehicle or VIN is eligible for OEM connectivity services:
      </li>
      <ul>
        <li>
          <strong>CalculateVinOemEligibilitiesAsync</strong> — Returns a result that indicates whether a VIN in a specific region is eligible for OEM connectivity services.
        </li>
        <li>
          <strong>GetOemSupportEligibilityForMakeAsync</strong> — Returns a result that indicates whether a vehicle make and model in a specific region is eligible for OEM connectivity services.
        </li>
      </ul>
    </ul>
    <h2>GetOnlineOrderStatus</h2>
    <ul>
      <li>
        We have added a new <code className="small-code-sample">shippingCost</code> field as a return object to the <strong>GetOnlineOrderStatus</strong> method. This field will return the shipping cost at the time the order was placed.
      </li>
    </ul>
  </div>
);

const updateJuly292023: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>MyAdminAPIUser</h2>
    <ul>
      <li>
        We have deprecated the <strong>MyAdminApiUser</strong> role. This role was initially used to make MyAdmin API calls, but we confirmed that API calls are open to anyone with a MyAdmin account. As a result, we have deprecated the role to reduce confusion and simplify access to our API.
      </li>
    </ul>
    <h2>CalculateVinOemEligibilitiesAsync and GetOemSupportEligibilityForMakeAsync</h2>
    <ul>
      <li>
        Together with the Vehicle / VIN Lookup page improvements, we've added the following APIs to allow you to confirm whether a vehicle or VIN is eligible for OEM connectivity services:
      </li>
      <ul>
        <li>
          <strong>CalculateVinOemEligibilitiesAsync</strong> — Returns a result that indicates whether a VIN in a specific region is eligible for OEM connectivity services.
        </li>
        <li>
          <strong>GetOemSupportEligibilityForMakeAsync</strong> — Returns a result that indicates whether a vehicle make and model in a specific region is eligible for OEM connectivity services.
        </li>
      </ul>
    </ul>
    <h2>DatabaseExists</h2>
    <ul>
      <li>
        To save time when creating new databases, we've added a new <strong>DatabaseExists</strong> method that returns a true or false value to allow you to confirm whether a database name already exists:
      </li>
      <ul>
        <li>
          <strong>true</strong> — The database name already exists
        </li>
        <li>
          <strong>false</strong> — The database name does not exist
        </li>
      </ul>
    </ul>
  </div>
);

const updateJuly102023: ReactNode = (
  <div className="paragraph">
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>GetOnlineOrderStatus</h2>
    <ul>
      <li>
        In a future release, we will be adding a new <code className="small-code-sample">shippingCost</code> field as a return object to the <strong>GetOnlineOrderStatus</strong> method. This field will return the shipping cost at the time the order was placed.
      </li>
      <li>
        In a future release, the <strong>GetOnlineOrderStatus</strong> method will add a default date range and return order data from the last month if the following parameters are sent as null:
      </li>
      <ul>
        <li>
          purchaseOrderNo
        </li>
        <li>
          orderNo
        </li>
        <li>
          orderDateFrom
        </li>
        <li>
          orderDateTo
        </li>
      </ul>
      <li>
        There will also be a limit of 5000 orders that can be retrieved in a single request.
      </li>
    </ul>
  </div>
);

const updateJuly012023: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>ProvisionDevicesBulk</h2>
    <ul>
      <li>
        Currently, <strong>ProvisionDevice</strong> and <strong>ProvisionDeviceToAccount</strong> methods are available to provision a single third-party custom telematics or OEM device (via the serial number).
      </li>
      <li>
        To help you manage large quantities of devices, we've added a new <strong>ProvisionDevicesBulk</strong> method to provision multiple third-party custom telematics devices or OEM in bulk with an optional quantity field.
      </li>
    </ul>
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>GetDeviceContractsByPage and GetDeviceContracts</h2>
    <ul>
      <li>
        In a future release, we will be adding two new columns to Device Admin: <code className="small-code-sample">Auto-Activated</code> and <code className="small-code-sample">Billing Start Date</code> to improve visibility of auto-activation events, as well as the actual start of billing for a device.
      </li>
      <li>
        The <code className="small-code-sample">Auto-Activated</code> column will help you identify whether a device has been automatically activated by Geotab, and display the following values:
      </li>
      <ul>
        <li>
          <strong>Yes</strong> — The device was automatically activated by Geotab.
        </li>
        <li>
          <strong>No</strong> — The device was activated by installation.
        </li>
        <li>
          <strong>Not Available</strong> — The device has been shipped, but has not been installed, or auto-activated.
          <br />
          <strong>NOTE</strong>: For devices shipped prior to the release of this feature, <strong>Not Available</strong> will be displayed.
        </li>
      </ul>
    </ul>
    <ul>
      <li>
        The <code className="small-code-sample">Billing Start Date</code> column will help you determine when billing started for a device. This column will display one of the following values:
      </li>
      <ul>
        <li>
          <strong>Date</strong> — Displays the date that the device was auto - activated, installed, or transferred from another Partner.
          <br />
          <strong>NOTE</strong>: Plan changes for devices will not impact this date.
        </li>
        <li>
          <strong>Not Available</strong> — Indicates that a device has been shipped, but has not been installed, or auto - activated.
          <br />
          <strong>NOTE</strong>: For devices shipped prior to the release of this feature, <strong>Not Available</strong> will be displayed.
        </li>
      </ul>
      <li>
        Therefore, we will also be making data points of <code className="small-code-sample">Auto-Activated</code> and <code className="small-code-sample">Billing Start Date</code> available through the < strong> GetDeviceContractsByPage</strong> and < strong> GetDeviceContracts</strong> APIs in a future release.We will provide more details closer to the release date.
      </li>
    </ul>

    <h2>GetOnlineOrderStatus</h2>
    <ul>
      <li>
        In an upcoming release, we will be adding the following parameters to the <strong>GetOnlineOrderStatus</strong> API:
      </li>
      <li>
        <code className="small-code-sample">promoCode</code> — Returns the promo code used when the order was placed, if applicable.
      </li>
      <li>
        <code className="small-code-sample">rateCode</code> — Returns the promo code used for a monthly Rate Plan subscription when the order was placed, if applicable.
      </li>
    </ul>
  </div>
);

const updateMay292023: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>GetPartnerDeviceContractsAsync</h2>
    <ul>
      <li>
        To help you find devices faster, we've updated the <strong>GetPartnerDeviceContractsAsync</strong> API to include a database search parameter (<code className="small-code-sample">databaseFilter</code>). This parameter allows you to retrieve a list of devices that are owned by the specified database.
      </li>
    </ul>
  </div>
);

const updateMarch272023: ReactNode = (
  <div className="paragraph">
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>ApiDeviceContract</h2>
    <ul>
      <li>
        In an upcoming release, we will use the gateway's activation date as the source for <code className="small-code-sample">FirstDeviceActivationDate</code> when returning an <strong>ApiDeviceContract</strong> object (for example, by calling <strong>GetDeviceContractsByPage</strong>) to align with the Device Admin page
      </li>
    </ul>
  </div>
);

const updateMarch062023: ReactNode = (
  <div className="paragraph">
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>ApiDeviceContract</h2>
    <ul>
      <li>
        In an upcoming release, we will use the gateway's activation date as the source for <code className="small-code-sample">FirstDeviceActivationDate</code> when returning an <strong>ApiDeviceContract</strong> object (for example, by calling <strong>GetDeviceContractsByPage</strong>) to align with the Device Admin page
      </li>
    </ul>
  </div>
);

const updateFebruary132023: ReactNode = (
  <div className="paragraph">
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>GetPartnerDeviceContractsAsync</h2>
    <ul>
      <li>
        Currently, the <strong>GetPartnerDeviceContractsAsync</strong> method allows you to return a list of third-party devices under your account.
      </li>
      <li>
        In a future release, we'll enhance the <strong>GetPartnerDeviceContractsAsync</strong> method to return a list that includes all device types, including GO devices.
      </li>
    </ul>
  </div>
);

const updateJanuary232023: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>EditUserContact</h2>
    <ul>
      <li>
        To ensure that Customers receive their orders in a timely manner, we've updated the  <strong>EditUserContact</strong> method to validate provided addresses with the option to override invalid addresses if the user has the <code className="small-code-sample">Contact-Override</code> role.
      </li>
      <li>
        The API call will now match how shipping contacts are validated in checkout.
      </li>
    </ul>
  </div>
);

const updateDecember122022: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>DeviceContractsByPage</h2>
    <ul>
      <li>
        The <code className="small-code-sample">fromdate</code> and <code className="small-code-sample">todate</code> parameters are now optional in the GetDeviceContractsByPage API, so more records can be retrieved.
      </li>
    </ul>
    <h2>OnlineOrderStatus</h2>
    <ul>
      <li>
        A new <code className="small-code-sample">OrderSource</code> parameter has been added to the GetOnlineOrderStatus method.
      </li>
      <li>
        The <code className="small-code-sample">OrderSource</code> parameter allows you to view a list of orders based on the channel used to place the order: MyAdmin, Marketplace, or API.
      </li>
    </ul>
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>EditUserContact</h2>
    <ul>
      <li>
        In an upcoming release, we will update the <strong>EditUserContact</strong> method logic to validate provided addresses, and provide the option to override invalid addresses, if the user has the <code className="small-code-sample">Contact-Override</code> role.
      </li>
    </ul>
  </div>
);

const updateDecember052022: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>DeviceContractTransactions</h2>
    <ul>
      <li>
        When calling <strong>GetDeviceContractTransactions</strong>, you will now see a new property in the returned <strong>DeviceContractTransactions</strong> object: int <code className="small-code-sample">UserContactId</code>
      </li>
      <li>
        If null, <code className="small-code-sample">UserContactId</code> will return -1
      </li>
      <li>
        Else, it will return the unique ID that belongs to the user contact
      </li>
      <li>
        This ID can be leveraged alongside <strong>GetUserContacts</strong> to return all the contact details of the user contact (currently <strong>DeviceContractTransactions</strong> only returns <code className="small-code-sample">UserContactName</code>)
      </li>
    </ul>
    <h2>ForceChangePasswordForUsersAsync</h2>
    <ul>
      <li>
        The <strong>ForceChangePasswordForUsersAsync</strong> method now allows you to toggle on 'Force Password Change' for user accounts so that you can decide how often users are resetting their passwords
      </li>
      <li>
        The <strong>ForceChangePasswordForUsersAysync</strong> requires the <code className="small-code-sample">apikey</code>, <code className="small-code-sample">sessionID</code>, and a list of usernames <code className="small-code-sample">userNames</code>, and you must toggle <code className="small-code-sample">forceChangePassword</code> to True or False.
      </li>
    </ul>
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>EditUserContact</h2>
    <ul>
      <li>
        In an upcoming release, we will update the <strong>EditUserContact</strong> method logic to validate provided addresses, and provide the option to override invalid addresses, if the user has the <code className="small-code-sample">Contact-Override</code> role.
      </li>
    </ul>
  </div>
);

const updateNovember142022: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>ApiOnlineOrder</h2>
    <ul>
      <li>
        A new source parameter has been added to the <code className="small-code-sample">ApiOnlineOrder</code> object: <code className="small-code-sample">OrderSource.</code>
      </li>
      <li>
        The Order source parameter allows you to determine the channel used to place the order: MyAdmin, Marketplace, or API.
      </li>
    </ul>
    <h2>MyInstallLogs</h2>
    <ul>
      <li>
        A new <strong>GetMyInstallLogs</strong> method has been added to allow you to easily retrieve your installation record information.
      </li>
    </ul>
    <h2>CreateExternalVendorDeviceBulkAsync</h2>
    <ul>
      <li>
        A new method, <strong>CreateExternalVendorDeviceBulkAsync</strong>, has been added to make it easier for Marketplace Partners to offer products that do not connect to Geotab gateways.
      </li>
      <li>
        The <strong>CreateExternalVendorDeviceBulkAsync</strong> method allows Marketplace Partners to register devices using serial numbers, as well as the option to include IMEI and SIM numbers, so they show up in MyAdmin.
      </li>
      <li>
        To use this method, you must have the <code className="small-code-sample">DeviceRegister-Bulk</code> role.
      </li>
    </ul>
  </div>
);

const updateSeptember192022: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>ApiDeviceContract</h2>
    <ul>
      <li>
        <strong>ApiDeviceContract</strong> has been updated with a boolean value for the <code className="small-code-sample">isAutoActivated</code> parameter to indicate whether a device was auto-activated by Geotab using True or False.
      </li>
      <li>
        The True label indicates the device was auto-activated by Geotab.
      </li>
    </ul>
    <h2>AccountsFromSerialsAsync</h2>
    <ul>
      <li>
        A new API, <strong>GetAccountsFromSerialsAsync</strong>, has been added to allow our Partners with multiple accounts identify the account associated with a specified device, and facilitates the use of other MyAdmin APIs that require account information.
      </li>
    </ul>
    <h2>OnlineOrderStatus</h2>
    <ul>
      <li>
        A new parameter, <code className="small-code-sample">poExactMatch</code>, has been added to <strong>GetOnlineOrderStatus</strong> to allow youto search for orders that match a specific PO number.
      </li>
      <li>
        To search for orders that match an exact PO number, use double quotation marks.
      </li>
    </ul>
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>End of Life — MyAdmin APIs for Third-party Device Data Ingestion</h2>
    <ul>
      <li>
        On September 30, 2022, the MyAdmin APIs for third-party device data ingestion into MyGeotab will be permanently discontinued. After this date, MyGeotab will be unable to receive data from any devices that have not migrated to DIG.
      </li>
      <li>
        For more information, refer to the{" "}
        <a
          href="https://docs.google.com/document/d/1hJj2CEMJlgbXHjF-it8Gey8b5_EnUDCqqhS8jRtxGyw/edit#heading=h.dzk3awl3nlud"
          aria-label="Migrating to DIG from MyAdmin API/SDK guide"
          target="_blank"
          rel="noopener noreferrer">
          Migrating to DIG from MyAdmin API/SDK guide
        </a>
        .
      </li>
      <li>
        If you're a new Partner with a standalone telematics device, refer to the{" "}
        <a
          href="https://geotab.github.io/sdk/software/guides/custom-telematics-devices/"
          aria-label="Using Custom Telematics Devices"
          target="_blank"
          rel="noopener noreferrer">
          Using Custom Telematics Devices
        </a>{" "}
        section in the MyGeotab SDK.
      </li>
    </ul>
  </div>
);

const updateSeptember122022: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>GetDeviceContracts</h2>
    <ul>
      <li>
        <strong>GetDeviceContracts</strong> has been updated for Partners that closely integrate their billing with MyAdmin
      </li>
      <li>
        The API now identifies the Rate Plan of a specific device in real time, as opposed to only the deivce mode
      </li>
    </ul>
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>Moving the MyAdmin SDK Site</h2>
    <ul>
      <li>
        On September 17, 2022, the current MyAdmin SDK site will be deprecated, and the MyAdmin SDK will be merged with the MyGeotab SDK site to create a centralized point of information related to integrating with Geotab.
      </li>
    </ul>
    <h2>End of Life — MyAdmin APIs for Third-party Device Data Ingestion</h2>
    <ul>
      <li>
        On September 30, 2022, the MyAdmin APIs for third-party device data ingestion into MyGeotab will be permanently discontinued. After this date, MyGeotab will be unable to receive data from any devices that have not migrated to DIG.
      </li>
      <li>
        For more information, refer to the{" "}
        <a
          href="https://docs.google.com/document/d/1hJj2CEMJlgbXHjF-it8Gey8b5_EnUDCqqhS8jRtxGyw/edit#heading=h.dzk3awl3nlud"
          aria-label="Migrating to DIG from MyAdmin API/SDK guide"
          target="_blank"
          rel="noopener noreferrer">
          Migrating to DIG from MyAdmin API/SDK guide
        </a>
        .
      </li>
      <li>
        If you're a new Partner with a standalone telematics device, refer to the{" "}
        <a
          href="https://geotab.github.io/sdk/software/guides/custom-telematics-devices/"
          aria-label="Using Custom Telematics Devices"
          target="_blank"
          rel="noopener noreferrer">
          Using Custom Telematics Devices
        </a>{" "}
        section in the MyGeotab SDK.
      </li>
    </ul>
  </div>
);

const updateAugust172022: ReactNode = (
  <div className="paragraph">
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>Moving the MyAdmin SDK Site</h2>
    <ul>
      <li>
        On September 17, 2022, the current MyAdmin SDK site will be deprecated, and the MyAdmin SDK will be merged with the MyGeotab SDK site to create a centralized point of information related to integrating with Geotab.
      </li>
    </ul>
    <h2>End of Life — MyAdmin APIs for Third-party Device Data Ingestion</h2>
    <ul>
      <li>
        On September 30, 2022, the MyAdmin APIs for third-party device data ingestion into MyGeotab will be permanently discontinued. After this date, MyGeotab will be unable to receive data from any devices that have not migrated to DIG.
      </li>
      <li>
        For more information, refer to the{" "}
        <a
          href="https://docs.google.com/document/d/1hJj2CEMJlgbXHjF-it8Gey8b5_EnUDCqqhS8jRtxGyw/edit#heading=h.dzk3awl3nlud"
          aria-label="Migrating to DIG from MyAdmin API/SDK guide"
          target="_blank"
          rel="noopener noreferrer">
          Migrating to DIG from MyAdmin API/SDK guide
        </a>
        .
      </li>
      <li>
        If you're a new Partner with a standalone telematics device, refer to the{" "}
        <a
          href="https://geotab.github.io/sdk/software/guides/custom-telematics-devices/"
          aria-label="Using Custom Telematics Devices"
          target="_blank"
          rel="noopener noreferrer">
          Using Custom Telematics Devices
        </a>{" "}
        section in the MyGeotab SDK.
      </li>
    </ul>
  </div>
);

const updateJuly112022: ReactNode = (
  <div className="paragraph">
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>Moving the MyAdmin SDK Site</h2>
    <ul>
      <li>
        On August 29, 2022, the current MyAdmin SDK site will be deprecated, and the MyAdmin SDK will be merged with the MyGeotab SDK site to create a centralized point of information related to integrating with Geotab.
      </li>
    </ul>
    <h2>End of Life — MyAdmin APIs for Third-party Device Data Ingestion</h2>
    <ul>
      <li>
        On September 30, 2022, the MyAdmin APIs for third-party device data ingestion into MyGeotab will be permanently discontinued. After this date, MyGeotab will be unable to receive data from any devices that have not migrated to DIG.
      </li>
      <li>
        For more information, refer to the{" "}
        <a
          href="https://docs.google.com/document/d/1hJj2CEMJlgbXHjF-it8Gey8b5_EnUDCqqhS8jRtxGyw/edit#heading=h.dzk3awl3nlud"
          aria-label="Migrating to DIG from MyAdmin API/SDK guide"
          target="_blank"
          rel="noopener noreferrer">
          Migrating to DIG from MyAdmin API/SDK guide
        </a>
        .
      </li>
      <li>
        If you're a new Partner with a standalone telematics device, refer to the{" "}
        <a
          href="Using Custom Telematics Devices"
          aria-label="https://geotab.github.io/sdk/software/guides/custom-telematics-devices/"
          target="_blank"
          rel="noopener noreferrer">
          Using Custom Telematics Devices
        </a>{" "}
        section in the MyGeotab SDK.
      </li>
    </ul>
  </div>
);

const updateJune202022: ReactNode = (
  <div className="paragraph">
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>Orders</h2>
    <ul>
      <li>
        Currently, MyAdmin does not require a zip code or postal code for shipments. As a result, shipments may be delayed due to blank or invalid zip or postal codes, and require verification before the order can be shipped.
      </li>
      <li>
        To ensure we can get your order shipped as quickly as possible, the Zip Code/Postal Code field will be required, and we're adding the functionality to validate the zip or postal code during the checkout process.
      </li>
    </ul>
  </div>
);

const updateJune062022: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>ApiOrderHeader</h2>
    <ul>
      <li>
        An optional parameter <code className="small-code-sample">Requested Delivery Date</code> is going to be added to <strong>ApiOrderHeader</strong> object, so Partners can request a specific delivery date for orders placed through the API.
      </li>
    </ul>
    <h2>GetDeviceContracts</h2>
    <ul>
      <li>
        We've added two new parameters — <code className="small-code-sample">ordersAddedFrom</code> and <code className="small-code-sample">ordersAddedTo</code> — to the <strong>GetDeviceContracts</strong> method, so you can retrieve a list of OEM Purchase Order(PO) numbers added during the specific date range.
      </li>
      <li>
        When using these parameters, the other two parameters — <code className="small-code-sample">fromDate</code> and <code className="small-code-sample">toDate</code> — are not required.
      </li>
    </ul>
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>Monthly Billing</h2>
    <ul>
      <li>
        In an upcoming release, we're adding an Extended from Database column on the Monthly Billing page for clarity and to improve the Monthly Billing reports for Extendable Services.
      </li>
      <li>
        The Extended from Database column displays the names of the originating databases, when a device has extended services from a database in the selected billing period. We are also renaming the Database column to Database Billed to more accurately describe what this column represents.
      </li>
      <li>
        Please take note of this if your integration uses column names rather than column numbers.
      </li>
    </ul>
    <h2>Orders</h2>
    <ul>
      <li>
        Currently, MyAdmin does not require a zip code or postal code for shipments. As a result, shipments may be delayed due to blank or invalid zip or postal codes, and require verification before the order can be shipped.
      </li>
      <li>
        To ensure we can get your order shipped as quickly as possible, the Zip Code/Postal Code field will be required, and we're adding the functionality to validate the zip or postal code during the checkout process.
      </li>
    </ul>
  </div>
);

const updateMay162022: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>OnlineOrderStatus</h2>
    <ul>
      <li>
        The <strong>GetOnlineOrderStatus</strong> API has been updated to include a new parameter, <code className="small-code-sample">includeCancelledOrders</code>, which allows you to include cancelled orders in the search results.
      </li>
    </ul>
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>ApiOrderHeader</h2>
    <ul>
      <li>
        An optional parameter <code className="small-code-sample">Requested Delivery Date</code> is going to be added to < strong> ApiOrderHeader</strong> object, so Partners can request a specific delivery date for orders placed through the API.
      </li>
    </ul>
    <h2>Monthly Billing</h2>
    <ul>
      <li>
        In an upcoming release, we're adding an Extended from Database column on the Monthly Billing page for clarity and to improve the Monthly Billing reports for Extendable Services.
      </li>
      <li>
        The Extended from Database column displays the names of the originating databases, when a device has extended services from a database in the selected billing period. We are also renaming the Database column to Database Billed to more accurately describe what this column represents.
      </li>
      <li>
        Please take note of this if your integration uses column names rather than column numbers.
      </li>
    </ul>
    <h2>Orders</h2>
    <ul>
      <li>
        Currently, MyAdmin does not require a zip code or postal code for shipments. As a result, shipments may be delayed due to blank or invalid zip or postal codes, and require verification before the order can be shipped.
      </li>
      <li>
        To ensure we can get your order shipped as quickly as possible, the Zip Code/Postal Code field will be required, and we're adding the functionality to validate the zip or postal code during the checkout process.
      </li>
    </ul>
  </div>
);

const updateApril112022: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>PartnerDeviceContractsAsync</h2>
    <ul>
      <li>
        A new API, <strong>GetPartnerDeviceContractsAsync</strong>, has been added to allow Marketplace Partners and Integration Partners to retrieve a list of active devices they've produced, as well as the database each device is connected to.
      </li>
      <li>
        With this API, these Partners can set up, service, and support their products, as well as ensure their products are properly functioning.
      </li>
      <li>
        The <code className="small-code-sample">ThirdPartyPartner-Admin</code> role is required to access the <strong>GetPartnerDeviceContractsAsync</strong> API.
      </li>
      <li>
        To use this API, input <code className="small-code-sample">sessionID</code> in addition to the <strong>GetPartnerDeviceContractsAsync</strong> method. Once this is complete, the API call retrieves the list of devices including the Serial Number, Database, and Product Code.
      </li>
      <li>
        This API is for Partners who produce third-party products only.
      </li>
    </ul>
    <h2>Shutdown Complete — Disabled GET Requests Used for Authentication</h2>
    <ul>
      <li>
        For several months, we have communicated that we will disable <strong>Authenticate</strong> and <strong>RegisterNewUser</strong> GET requests to the MyAdmin API for increased security.
      </li>
      <li>
        As mentioned, effective March 31, 2022, GET requests have been disabled. POST requests will continue to be supported.
      </li>
      <li>
        If GET requests are used for authentication purposes, users will receive the following error message: “405 Method Not Allowed.”
      </li>
    </ul>
  </div>
);

const updateMarch252022: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>Updated Character Limit for Reseller Reference</h2>
    <ul>
      <li>
        We've made changes to our current character limit for the Reseller Reference field. We have increased the limit from 250 characters to 500 characters.
      </li>
    </ul>
    <h2>Shutdown Imminent — Disable GET Requests Used for Authentication</h2>
    <ul>
      <li>
        Effective March 31, 2022, GET requests will be disabled. POST requests will continue to be supported. If GET requests are used for authentication purposes, users will receive the following error message: “405 Method Not Allowed.”
      </li>
    </ul>
  </div>
);

const updateFebruary282022: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>DeviceContracts</h2>
    <ul>
      <li>
        The <strong>GetDeviceContracts</strong> method search functionality has been updated to support searching for OEM devices based on full or partial Purchase Order (PO) numbers.
      </li>
    </ul>
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>Disable GET Requests Used for Authentication</h2>
    <ul>
      <li>
        In an upcoming release, <strong>Authenticate</strong> and <strong>RegisterNewUser</strong> GET requests will be disabled to the MyAdmin API for increased security.
      </li>
      <li>
        POST requests will continue to be supported. If GET requests are used for authentication purposes, users will receive the following error message: “405 Method Not Allowed.”
      </li>
    </ul>
  </div>
);

const updateJanuary312022: ReactNode = (
  <div className="paragraph">
    <p className="tag__updates">Updates</p>
    <h2>Generate Serial Numbers in Bulk</h2>
    <ul>
      <li>
        Serial numbers can now be requested for up to 1000 custom telematics devices (with the same product code) at a time.
      </li>
      <li>
        Previously, the functionality only supported one custom telematics device at a time.
      </li>
    </ul>
    <h2>Update to the NuGet Package</h2>
    <ul>
      <li>
        The NuGet package now includes common elements from the MyGeotab SDK. We leverage .NET Core instructions, so in order to use the new package any integrations using the old .NET Framework instructions must be updated.
      </li>
    </ul>
    <p className="tag__coming-soon">Coming Soon</p>
    <h2>Disable GET Requests Used for Authentication</h2>
    <ul>
      <li>
        In an upcoming release, <strong>Authenticate</strong> and <strong>RegisterNewUser</strong> GET requests will be disabled to the MyAdmin API for increased security.
      </li>
      <li>
        POST requests will continue to be supported. If GET requests are used for authentication purposes, users will receive the following error message: “405 Method Not Allowed.”
      </li>
    </ul>
  </div>
);
const pageTitle: PageTitleProps = {
  "title": "Release Notes",
  "breadCrumbItems":
    ["MYA", "Release Notes"]
};

const pageSections: TableOfContentsItem[] =
  [
    {
      "elementId": "myadmin-december-4-2023",
      "summary": "December 4, 2023",
      "details": updateDecember042023,
    }, {
      "elementId": "myadmin-october-4-2023",
      "summary": "October 4, 2023",
      "details": updateOctober042023,
    }, {
      "elementId": "myadmin-september-5-2023",
      "summary": "September 5, 2023",
      "details": updateSeptember052023,
    }, {
      "elementId": "myadmin-july-29-2023",
      "summary": "July 29, 2023",
      "details": updateJuly292023,
    }, {
      "elementId": "myadmin-july-10-2023",
      "summary": "July 10, 2023",
      "details": updateJuly102023,
    }, {
      "elementId": "myadmin-july-1-2023",
      "summary": "July 1, 2023",
      "details": updateJuly012023,
    }, {
      "elementId": "myadmin-may-29-2023",
      "summary": "May 29, 2023",
      "details": updateMay292023,
    }, {
      "elementId": "myadmin-march-27-2023",
      "summary": "March 27, 2023",
      "details": updateMarch272023,
    }, {
      "elementId": "myadmin-march-6-2023",
      "summary": "March 6, 2023",
      "details": updateMarch062023,
    }, {
      "elementId": "myadmin-february-13-2023",
      "summary": "February 13, 2023",
      "details": updateFebruary132023,
    }, {
      "elementId": "myadmin-january-23-2023",
      "summary": "January 23, 2023",
      "details": updateJanuary232023,
    }, {
      "elementId": "myadmin-december-12-2022",
      "summary": "December 12, 2022",
      "details": updateDecember122022,
    }, {
      "elementId": "myadmin-december-5-2022",
      "summary": "December 5, 2022",
      "details": updateDecember052022,
    }, {
      "elementId": "myadmin-november-14-2022",
      "summary": "November 14, 2022",
      "details": updateNovember142022,
    }, {
      "elementId": "myadmin-september-19-2022",
      "summary": "September 19, 2022",
      "details": updateSeptember192022,
    }, {
      "elementId": "myadmin-september-12-2022",
      "summary": "September 12, 2022",
      "details": updateSeptember122022,
    }, {
      "elementId": "myadmin-august-17-2022",
      "summary": "August 17, 2022",
      "details": updateAugust172022,
    }, {
      "elementId": "myadmin-july-11-2022",
      "summary": "July 11, 2022",
      "details": updateJuly112022,
    }, {
      "elementId": "myadmin-june-20-2022",
      "summary": "June 20, 2022",
      "details": updateJune202022,
    }, {
      "elementId": "myadmin-june-6-2022",
      "summary": "June 6, 2022",
      "details": updateJune062022,
    }, {
      "elementId": "myadmin-may-16-2022",
      "summary": "May 16, 2022",
      "details": updateMay162022,
    }, {
      "elementId": "myadmin-april-11-2022",
      "summary": "April 11, 2022",
      "details": updateApril112022,
    }, {
      "elementId": "myadmin-march-25-2022",
      "summary": "March 25, 2022",
      "details": updateMarch252022,
    }, {
      "elementId": "myadmin-february-28-2022",
      "summary": "February 28, 2022",
      "details": updateFebruary282022,
    }, {
      "elementId": "myadmin-january-31-2022",
      "summary": "January 31, 2022",
      "details": updateJanuary312022,
    }
  ];

export default function ReleaseNotes() {
  return (
    <Page section={HeaderSections.MyAdmin} pageTitle={pageTitle} tableOfContents={pageSections}>
      <div className="paragraph">
        {/*  */}
      </div>
      {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId} />)}
    </Page>
  );
};
