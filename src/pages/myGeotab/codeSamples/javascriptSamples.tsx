import { ReactNode } from "react";

import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";

import InformationalBox from "../../../components/InformationalBox/InformationalBox";

const addDriver: ReactNode = (
    <div className="paragraph">
        <p>
            Demonstrates how to add Drivers to your database.
            <br />
            <a href="https://geotab.github.io/sdk/software/js-samples/addDriver.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for adding driver">
                Demo
            </a>{" "}
            /{" "}
            <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/addDriver.html" target="_blank" rel="noopener noreferrer" aria-label="Source for adding driver">
                Source
            </a>
        </p>
    </div>
);

const addZone: ReactNode = (
    <div className="paragraph">
        <p>
            Demonstrates how to add Zones (geofences) your database.
            <br />
            <a href="https://geotab.github.io/sdk/software/js-samples/addZone.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for adding zone">
                Demo
            </a>{" "}
            /{" "}
            <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/addZone.html" target="_blank" rel="noopener noreferrer" aria-label="Source for adding zone">
                Source
            </a>
        </p>
    </div>
);

const dataFeed: ReactNode = (
    <div className="paragraph">
        <p>
            How to use the GetFeed method and retrieve a continuous stream of GPS, Engine Status and Fault data. This is the most efficient and recommended way of getting an ongoing copy of the data
            reported by a vehicle.
            <br />
            <a href="https://geotab.github.io/sdk/software/js-samples/dataFeed.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for using datafeed">
                Demo
            </a>{" "}
            /{" "}
            <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/dataFeed.html" target="_blank" rel="noopener noreferrer" aria-label="Source for data feed">
                Source
            </a>
        </p>
    </div>
);

const displayOdometer: ReactNode = (
    <div className="paragraph">
        <p>
            Display a vehicle's odometer readings over time.
            <br />
            <a href="https://geotab.github.io/sdk/software/js-samples/displayOdometer.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for display odometer">
                Demo
            </a>{" "}
            /{" "}
            <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/displayOdometer.html" target="_blank" rel="noopener noreferrer" aria-label="Source for display odometer">
                Source
            </a>
        </p>
    </div>
);

const getCount: ReactNode = (
    <div className="paragraph">
        <p>This example demonstrates how to retrieve the number of vehicles and users in your database.</p>
        <InformationalBox>
            <p>This does not use API.js; it has been designed to show you a simple integration example.</p>
        </InformationalBox>
        <p>
            <a href="https://geotab.github.io/sdk/software/js-samples/getCount.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for using get count">
                Demo
            </a>{" "}
            /{" "}
            <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/getCount.html" target="_blank" rel="noopener noreferrer" aria-label="Source for get count">
                Source
            </a>
        </p>
    </div>
);

const getVehicleLocation: ReactNode = (
    <div className="paragraph">
        <p>
            This examples shows how to obtain the location of a vehicle.
            <br />
            <a href="https://geotab.github.io/sdk/software/js-samples/getLocation.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for get vehicle location">
                Demo
            </a>{" "}
            /{" "}
            <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/getLocation.html" target="_blank" rel="noopener noreferrer" aria-label="Source for get vehicle location">
                Source
            </a>
        </p>
    </div>
);

const importers: ReactNode = (
    <div className="paragraph">
        <p>Tools that demonstrate how to bulk import different entity types into your database via comma-delimited text values.</p>
        <ul>
            <li>
                Import Devices -{" "}
                <a href="https://geotab.github.io/sdk/software/js-samples/importDevices.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for importing devices">
                    Demo
                </a>{" "}
                /{" "}
                <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/importDevices.html" target="_blank" rel="noopener noreferrer" aria-label="Source for importing devices">
                    Source
                </a>
            </li>
            <li>
                Import Groups -{" "}
                <a href="https://geotab.github.io/sdk/software/js-samples/importGroups.html" aria-label="Demo for importing groups">
                    Demo
                </a>{" "}
                /{" "}
                <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/importGroups.html" target="_blank" rel="noopener noreferrer" aria-label="Source for importing groups">
                    Source
                </a>
            </li>
            <li>
                Import Hos Logs -{" "}
                <a href="https://geotab.github.io/sdk/software/js-samples/importHosLogs.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for importing hos logs">
                    Demo
                </a>{" "}
                /{" "}
                <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/importHosLogs.html" target="_blank" rel="noopener noreferrer" aria-label="Source for importing hos logs">
                    Source
                </a>
            </li>
            <li>
                Import Route Plan -{" "}
                <a href="https://geotab.github.io/sdk/software/js-samples/importRoutePlan.html" aria-label="Demo for importing route plan">
                    Demo
                </a>{" "}
                /{" "}
                <a
                    href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/importRoutePlan.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Source for importing route plan"
                >
                    Source
                </a>
            </li>
            <li>
                Import Routes -{" "}
                <a href="https://geotab.github.io/sdk/software/js-samples/importRoutes.html" aria-label="Demo for importing routes">
                    Demo
                </a>{" "}
                /{" "}
                <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/importRoutes.html" target="_blank" rel="noopener noreferrer" aria-label="Source for importing routes">
                    Source
                </a>
            </li>
            <li>
                Import Users -{" "}
                <a href="https://geotab.github.io/sdk/software/js-samples/importUsers.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for importing users">
                    Demo
                </a>{" "}
                /{" "}
                <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/importUsers.html" target="_blank" rel="noopener noreferrer" aria-label="Source for importing users">
                    Source
                </a>
            </li>
            <li>
                Import Zones -{" "}
                <a href="https://geotab.github.io/sdk/software/js-samples/importZones.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for importing zones">
                    Demo
                </a>{" "}
                /{" "}
                <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/importZones.html" target="_blank" rel="noopener noreferrer" aria-label="Source for importing zones">
                    Source
                </a>
            </li>
        </ul>
    </div>
);

const moveAZone: ReactNode = (
    <div className="paragraph">
        <p>
            Shows how to move an existing zone (geofence) to a new address using reverse geocoding.
            <br />
            <a href="https://geotab.github.io/sdk/software/js-samples/moveZone.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for moving zone">
                Demo
            </a>{" "}
            /{" "}
            <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/moveZone.html" target="_blank" rel="noopener noreferrer" aria-label="Source for moving zone">
                Source
            </a>
        </p>
    </div>
);

const pollForTextMessages: ReactNode = (
    <div className="paragraph">
        <p>
            This example illustrates how to poll the system for new text messages to and from compatible GO devices equipped with Garmin navigation systems.
            <br />
            <a href="https://geotab.github.io/sdk/software/js-samples/pollTextMessages.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for poll text messages">
                Demo
            </a>{" "}
            /{" "}
            <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/pollTextMessages.html" target="_blank" rel="noopener noreferrer" aria-label="Source for poll text messages">
                Source
            </a>
        </p>
    </div>
);

const sendATextMessage: ReactNode = (
    <div className="paragraph">
        <p>
            This example demonstrates how to send text messages to compatible GO devices equipped with Garmin navigation systems.
            <br />
            <a href="https://geotab.github.io/sdk/software/js-samples/sendTextMessage.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for sending text messages">
                Demo
            </a>{" "}
            /{" "}
            <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/sendTextMessage.html" target="_blank" rel="noopener noreferrer" aria-label="Source for sending text messages">
                Source
            </a>
        </p>
    </div>
);

const showVehicleTripsOnMap: ReactNode = (
    <div className="paragraph">
        <p>
            Building upon the showVehicleToday.html example, this demonstrates some of the features of MyGeotab. You will learn how to retrieve vehicles and their trips for any date and show the
            trips on a map.
            <br />
            <a href="https://geotab.github.io/sdk/software/js-samples/showTrips.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for showing trips">
                Demo
            </a>{" "}
            /{" "}
            <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/showTrips.html" target="_blank" rel="noopener noreferrer" aria-label="Source for showing trips">
                Source
            </a>
        </p>
    </div>
);

const EmbeddedURLs: ReactNode = (
    <div className="paragraph">
        <p>
            This example demonstrates how you can embed MyGeotab functionality into your existing web applications. This is an excellent way to see how to embed your own vehicles on a map inside
            your projects.
            <br />
            <a href="https://geotab.github.io/sdk/software/js-samples/singleSignOn.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for single sign on">
                Demo
            </a>{" "}
            /{" "}
            <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/singleSignOn.html" target="_blank" rel="noopener noreferrer" aria-label="Source for single sign on">
                Source
            </a>
        </p>
    </div>
);

const statusDataSampler: ReactNode = (
    <div className="paragraph">
        <p>
            Shows how to retrieve the status data (engine data) for a vehicle.
            <br />
            <a href="https://geotab.github.io/sdk/software/js-samples/statusDataSampler.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for retrieving status data">
                Demo
            </a>{" "}
            /{" "}
            <a
                href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/statusDataSampler.html"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Source for retrieving status data"
            >
                Source
            </a>
        </p>
    </div>
);

const starterKit: ReactNode = (
    <div className="paragraph">
        <p>
            This is where we recommend you begin your projects. Use the starter kit to learn how to authenticate with Geotab and how to create simple API calls to retrieve information about your
            fleet. This example can be used as a base to continue building on or starting your own custom projects.
            <br />
            <a href="https://geotab.github.io/sdk/software/js-samples/starterKit.html" target="_blank" rel="noopener noreferrer" aria-label="Demo for starter kit">
                Demo
            </a>{" "}
            /{" "}
            <a href="https://github.com/Geotab/sdk/blob/master/src/software/js-samples/starterKit.html" target="_blank" rel="noopener noreferrer" aria-label="Source for starter kit">
                Source
            </a>
        </p>
    </div>
);

const customerRegistration: ReactNode = (
    <div className="paragraph">
        <p>
            This example illustrates how to create a custom registration page. With this example, you will be able to: determine if a database name is available; register a new database; perform
            post-registration setup on the new database; send a confirmation email; and redirect a user to the new database. This is an advanced example and is designed for resellers.
            <br />
            <a href="https://github.com/Geotab/sample-registration" target="_blank" rel="noopener noreferrer" aria-label="Source for sample customer registration">
                Source
            </a>
        </p>
    </div>
);

const pageTitle: PageTitleProps = {
    title: "JavaScript Samples",
    breadCrumbItems: ["MYG", "Code Samples", "JavaScript Samples"]
};

const pageSections: TableOfContentsItem[] = [
    {
        elementId: "javascript-example-add-driver",
        summary: "Add Driver",
        details: addDriver
    },
    {
        elementId: "javascript-example-add-zone",
        summary: "Add Zone",
        details: addZone
    },
    {
        elementId: "javascript-example-data-feed",
        summary: "Data Feed",
        details: dataFeed
    },
    {
        elementId: "javascript-example-display-odometer",
        summary: "Display Odometer",
        details: displayOdometer
    },
    {
        elementId: "javascript-example-get-count",
        summary: "Get Count",
        details: getCount
    },
    {
        elementId: "javascript-example-get-vehicle-location",
        summary: "Get Vehicle Location",
        details: getVehicleLocation
    },
    {
        elementId: "javascript-example-importers",
        summary: "Importers",
        details: importers
    },
    {
        elementId: "javascript-example-move-a-zone",
        summary: "Move a Zone",
        details: moveAZone
    },
    {
        elementId: "javascript-example-poll-for-text-messages",
        summary: "Poll for Text Messages",
        details: pollForTextMessages
    },
    {
        elementId: "javascript-example-send-a-text-message",
        summary: "Send a Text Message",
        details: sendATextMessage
    },
    {
        elementId: "javascript-example-show-vehicle-trips-on-map",
        summary: "Show Vehicle Trips on Map",
        details: showVehicleTripsOnMap
    },
    {
        elementId: "javascript-example-embedded-urls",
        summary: "Embedded URLs",
        details: EmbeddedURLs
    },
    {
        elementId: "javascript-example-status-data-sampler",
        summary: "Status Data Sampler",
        details: statusDataSampler
    },
    {
        elementId: "javascript-example-starter-kit",
        summary: "Starter Kit",
        details: starterKit
    },
    {
        elementId: "javascript-example-customer-registration",
        summary: "Customer Registration",
        details: customerRegistration
    }
];

export default function AddInStorage() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                <p>
                    The following examples show common usages of the SDK using JavaScript. We recommend that you examine the examples in the following order to learn more about building great web
                    applications using the Geotab JavaScript API. These examples are stand-alone HTML, JavaScript and CSS written so you can extract them and "run" them without having your own Web
                    server.
                </p>
                <p>
                    You can also use the{" "}
                    <a href="https://geotab.github.io/sdk/software/api/runner.html" target="_blank" rel="noreferrer" aria-label="MyGeotab API Runner">
                        API Runner tool
                    </a>{" "}
                    to run code snippets that you can run directly against a database. The runner has code snippets that demonstrate:
                </p>
                <ul>
                    <li>Adding a driver</li>
                    <li>Adding a driver with 'View Nothing' clearance</li>
                    <li>Bare bones API request</li>
                    <li>Calculate vehicle fuel usage</li>
                    <li>Create 10 groups and add devices</li>
                    <li>Get vehicle location and driving status</li>
                    <li>Get vehicle location</li>
                    <li>Get DVIR unrepaired defects for last month</li>
                    <li>Filtering out invalid position log records</li>
                    <li>Find current live address of a driver</li>
                    <li>Find the month with longest distance driven</li>
                    <li>Get all unbroken exceptions for the last week</li>
                    <li>Get the count of stops at a customer (zone)</li>
                    <li>Get vehicle speed and posted road speed</li>
                    <li>Get the odometer and VIN for all vehicles in a group</li>
                    <li>Get zone stop exceptions</li>
                    <li>HOS availability search</li>
                    <li>Import USA states as zones</li>
                    <li>Edit a user</li>
                    <li>Change vehicle group and enable in vehicle speed warning</li>
                    <li>Replace existing device with new device</li>
                </ul>
            </div>
        </Page>
    );
}
