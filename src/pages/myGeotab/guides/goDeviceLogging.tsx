import { ReactNode } from "react";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import loggingAccuratelyGraph from "../../../assets/images/myGeotab/goDeviceLogging/go-device-logging_0.png";

const loggingAccurately: ReactNode = (
    <div className="paragraph">
        <p>
            The main concept behind GO device logging is to produce an accurate representation of the original data by logging the essential points on a graph and discarding redundant points. We
            sometimes refer to this as curve-based logging. This is best illustrated by example:
        </p>
        <br></br>
        <img src={loggingAccuratelyGraph} alt="logging accurately graph" /> {/*TODO: what do we want to do with alt?*/}
        <p>
            In this graph, the actual trip is represented by the blue curve. The red dots represent a simple time-based sampling where a speed value is recorded at regularly spaced time intervals.
            Notice how some high points and low points are missed by this approach. Also notice that, even when the speed does not change, the time-based approach continues reading the same value.
        </p>
        <p>
            The green dots represent a more accurate record of the data by establishing the ideal way to reproduce the data with the fewest number of data points. This is the basic principle that
            underpins the intelligent logging of the GO device.
        </p>
        <h2>Position and Speed</h2>
        <p>
            The GO device monitors both position and speed at the same time, using the approach discussed above, to log the data. By doing so, the speed profile can be very accurately reproduced and
            the location of the device determined. This also means the trip will be logged properly around corners (yielding a very accurate mileage calculation).
        </p>
        <h2>Engine Diagnostics</h2>
        <p>
            The GO device also monitors key engine diagnostic values and applies the approach above to log these values (data such as RPM curve, fuel level and many other parameters) in an optimized
            manner that allows an accurate reproduction of events without the drawbacks associated with time- or distance-based logging.
        </p>
        <p>
            Note: The intelligent logging approach means the rate at which the data is logged will vary; we cannot specify a fixed logging rate such as “x times per hour” because the logging rate
            depends on the driving behaviour of the vehicle. The GO device will log as as many times as required to accurately represent the data being recorded while minimizing redundant data.
        </p>
    </div>
);

const technicalDetails: ReactNode = (
    <div className="paragraph">
        <p>
            The methodology used to determine the optimal time to log GPS points is a curve-based algorithm that utilizes the Ramer-Douglas-Peucker (RDP) algorithm. The purpose of the RDP algorithm
            is to create a simplified curve compared to the original data. This is done by removing trivial and redundant data points, and keeping only the relevant data points within the allowable
            error limit. The curve-based algorithm is used to determine which of the second-by-second GPS points need to be saved and transmitted to MyGeotab. The curve logging algorithm allows the
            GO device to keep only the points that are necessary in order to provide an accurate representation of the events logged. Accuracy is dictated by the predetermined allowable curve error
            values.
        </p>
        <p>
            When the algorithm runs on the set of data points, it starts with the first and last points in the data set and automatically marks these as to-be-saved. It then considers the points
            between the first and last points; the data points will be continually divided until a line segment within the allowable error limit is obtained; this point will then be marked as
            to-be-saved. The algorithm will then run again for any points between the first point and the new point as well as any points between the new point and the last point.
        </p>
        <p>
            The curve-based algorithm is run first on Latitude vs. Longitude and then on Speed vs. Time. The curve algorithm is run on speed values between the to-be-saved points predetermined by
            running the curve on position.
        </p>
        <p>
            Based on the curve reduction method and the chosen allowed error values, the requirement is that the data between two saved GPS points will be acceptably linear in both position and
            speed.
        </p>
        <h2>GPS Logging</h2>
        <p>The curve algorithm is run on the data in the following cases:</p>
        <ul>
            <li>The curve buffer becomes full.</li>
            <li>The actual position of the GO device differed excessively from the predicted position of the GO device.</li>
            <li>Another event triggered the running of the curve.</li>
        </ul>
        <p>Below is a list of parameters that utilize the curve algorithm for data logging.</p>
        <h2>Engine Data Logging</h2>
        <h3>Curve Logging On Engine Data</h3>
        <p>Where appropriate engine data is logged using the curve-based algorithm. The following is a list of the engine data now logged using the curve-based logic:</p>
        <ul>
            <li>Battery Temperature</li>
            <li>Brake Lining Remaining</li>
            <li>Brake Temperature</li>
            <li>Cab Interior Temperature</li>
            <li>Charge State</li>
            <li>Coolant Level</li>
            <li>Coolant Temperature</li>
            <li>Cruise High Speed Limit</li>
            <li>Engine Cooling Fan Speed</li>
            <li>Engine Oil Level</li>
            <li>Engine Oil Life Remaining</li>
            <li>Engine Oil Pressure</li>
            <li>Engine Oil Temperature</li>
            <li>Engine Speed</li>
            <li>Fuel Alcohol Composition</li>
            <li>Fuel Filter Life Remaining</li>
            <li>Fuel Level</li>
            <li>Maximum Rpad Speed Limit</li>
            <li>Outside Temperature</li>
            <li>Starter Brush Life Remaining</li>
            <li>Starter Current</li>
            <li>Tire Pressure</li>
            <li>Transmission Oil Level</li>
            <li>Transmission Oil Temperature</li>
            <li>Washer Fluid Level</li>
        </ul>
        <p>Vehicles will not necessarily return all of the above information; the list is based on all the supported engine protocols.</p>
        <h3>Total Fuel Used</h3>
        <p>
            “Total fuel used (since telematics device install)” is generic status data. No matter how fuel information is received from a particular vehicle, be it OBD2, J1708, J1939 or another
            diagnostic standard, a generic Total Fuel Used record will be saved after ignition off. An additional record, “Total fuel used while idling (since telematics device install)”, which is
            the fuel used while road speed is 0, is also saved on ignition off. “Total fuel used (since telematics device install)” (<a hrefLang="../api/reference/#KnownId">KnownId</a>{" "}
            {/* TODO: Need to replace this with routing to KnownId page*/} <code className="small-code-sample">DiagnosticDeviceTotalFuelId</code>) and “Total fuel used while idling (since telematics
            device install)” <code className="small-code-sample">DiagnosticDeviceTotalIdleFuelId</code> are the diagnostics used to track fuel consumption.
        </p>
        <h3>Seat Belt And Odometer</h3>
        <p>
            Seat belt and odometer requests are proprietary on most passenger cars. It is Geotab's goal to support seat belt and odometer across all the major vehicle manufacturers. If you are
            unable to obtain seatbelt or odometer requests for your vehicle, please contact Geotab Support. You can query the percentage of seat belt, odometer and other engine based data is
            supported for different vehicle types via MyAdmin.
        </p>
        <p>
            Seat belt use is logged on status change: a value of 1 represents the seat belt unbuckled, while a value of 0 represents the seat belt buckled. Odometer is logged both on ignition on and
            ignition off and every hour.
        </p>
        <h3>Engine Hours</h3>
        <p>
            It is often important in fleet tracking to look at a vehicle's engine hours. While Geotab strives to support this data on as many vehicles as possible, it is sometimes not possible. As a
            workaround, Geotab provides two types of engine hours StatusData. It is important to distinguish between the two in order to utilize them appropriately.
        </p>
        <p>
            DiagnosticEngineHoursId:
            <br></br>
            This is the engine hours provided by the ECU in the vehicle as read by the GoDevice. This is reported every hour and at ignition OFF.
        </p>
        <p>
            DiagnosticEngineHoursAdjustmentId:
            <br></br>
            Records the GPS travel time for vehicles which do not report engine hours from their ECU. An engine hours record can also be manually added which will then report as total GPS travel
            time added to the manually entered value. When the manual engine hours entry is updated, the total GPS travel time used in the calculation is reset to zero before continuing to
            increment.
        </p>
        <p>
            Add{"<"}StatusData{">"}
            {"<"}DiagnosticEngineHoursAdjustmentId{">"} is used to add manual engine hours entries.
            <br></br>
            Get{"<"}StatusData{">"}
            {"<"}DiagnosticEngineHoursAdjustmentId{">"} returns a calculated engine hours value based on GPS Travel time and the last reported engine hours value (either reported by the GoDevice or
            manually entered).
        </p>
        <h3>Odometer</h3>
        <p>
            It is often important in fleet management to track a vehicle's odometer. While Geotab strives to report data as frequently and on as many vehicles as possible, this is not always
            possible. As a workaround, Geotab provides three types of Odometer StatusData. It is important to distinguish between the three in order to utilize them appropriately.
        </p>
        <h4>Odometer Status Data:</h4>
        <p>
            DiagnosticOdometerAdjustmentId:
            <br></br>
            This is calculated 2 ways based on whether the vehicle is reporting ECM Odometer or not.
        </p>
        <ul>
            <li>
                ECM Based Odometer:
                <br></br>
                Calculated as the ECM odometer reading, plus the GPS distance recorded since ECM odometer was last reported.
            </li>
            <li>
                GPS Based Odometer:
                <br></br>
                When no ECM odometer data is being recorded, Odometer Adjustment will be reported as the GPS odometer reading.
            </li>
        </ul>
        <p>
            Add{"<"}StatusData{">"}
            {"<"}DiagnosticOdometerAdjustmentId{">"} is used to add manual Odometer entries.
            <br></br>
            Get{"<"}StatusData{">"}
            {"<"}DiagnosticOdometerAdjustmentId{">"} Is used as shown below:
        </p>
        <ul>
            <li>If an individual device Id is provided, this returns a calculated Odometer value based on the last known DiagnosticOdometerId or Diagnostic OdometerAdjustmentId + GPS Distance.</li>
            <li>If no device Id is specified, this returns all DiagnosticOdometerAdjustmentId records in the date range (if provided).</li>
        </ul>
        <p>
            DiagnosticRawOdometerId:
            <br></br>
            This is the raw value of odometer as reported by the vehicles ECU. When possible, this is reported every Ignition ON, Ignition OFF, and every 2km in between.
        </p>
        <p>
            DiagnosticOdometerId:
            <br></br>
            This is a corrected odometer reading based on the raw odometer value and the odometer manipulators. It is calculated as Odometer = [Raw Odometer * Odometer Factor] + Odometer Offset.
        </p>
        <h4>Odometer Manipulators:</h4>
        <p>
            Note: If applied, these manipulators will only affect future DiagnosticOdometerId records. They cannot correct existing records.
            <br></br>
            Odometer Factor:
            <br></br>
            Used as a multiplier to correct raw odometer. As default this is set to 1 and can only be changed via the API. This variable is rarely used.
        </p>
        <p>
            Odometer Offset:
            <br></br>
            This value gets added to Raw Odometer before it is saved as a DiagnosticOdometerId record. It can be set directly via the API, or MyGeotab can calculate it automatically if an odometer
            value is entered on the Vehicle Edit page.
        </p>
    </div>
);

const pageTitle: PageTitleProps = {
    title: "GO Device logging",
    breadCrumbItems: ["MYG", "Guides", "GO Device logging"]
};

const pageSections: TableOfContentsItem[] = [
    {
        elementId: "logging-accurately",
        summary: "Logging accurately",
        details: loggingAccurately
    },
    {
        elementId: "technical-details",
        summary: "Technical Details",
        details: technicalDetails
    }
];

export default function GoDeviceLogging() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                GO devices use intelligent patented logging algorithms to decide when to record speed, position, and other engine information. The device is constantly monitoring various inputs, for
                example: second-by-second GPS data, hundreds of accelerometer readings per second, and engine diagnostic inputs. The device monitors the data and determines the appropriate time to
                store a value.
            </div>
            <br></br>
            <div className="paragraph">
                Various data loggers exist on the market today that use a simple time- or distance-based logging algorithm. These approaches, though simple, have significant drawbacks:
                <ul>
                    <li>Important high or low values for speed (or other metrics) could be missed.</li>
                    <li>Positions during cornering are missed (producing inaccurate mileage or poor display on map).</li>
                    <li>Increased data costs by logging redundant information (for example, recording data for a vehicle that is not moving or moving in a straight line at a constant speed).</li>
                </ul>
            </div>
        </Page>
    );
}
