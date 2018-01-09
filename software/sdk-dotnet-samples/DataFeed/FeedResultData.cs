using System.Collections.Generic;
using Geotab.Checkmate.ObjectModel;
using Geotab.Checkmate.ObjectModel.Engine;
using Geotab.Checkmate.ObjectModel.Exceptions;

namespace Geotab.SDK.DataFeed
{
    /// <summary>
    /// The result of a Feed call.
    /// </summary>
    class FeedResultData
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="FeedResultData"/> class.
        /// </summary>
        public FeedResultData()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="FeedResultData"/> class.
        /// </summary>
        /// <param name="gpsRecords">The <see cref="LogRecord" />s returned by the server.</param>
        /// <param name="statusData">The <see cref="StatusData" /> returned by the server.</param>
        /// <param name="faultData">The <see cref="FaultData" /> returned by the server.</param>
        /// <param name="trips">The <see cref="Trip" /> returned by the server.</param>
        /// <param name="exceptionEvents">The <see cref="ExceptionEvent" /> returned by the server.</param>
        public FeedResultData(IList<LogRecord> gpsRecords, IList<StatusData> statusData, IList<FaultData> faultData, IList<Trip> trips, IList<ExceptionEvent> exceptionEvents)
        {
            GpsRecords = gpsRecords;
            StatusData = statusData;
            FaultData = faultData;
            Trips = trips;
            ExceptionEvents = exceptionEvents;
        }

        /// <summary>
        /// Gets or sets the <see cref="ExceptionEvent" /> collection.
        /// </summary>
        /// <value>
        /// The exception events.
        /// </value>
        public IList<ExceptionEvent> ExceptionEvents { get; set; }

        /// <summary>
        /// Gets or sets the <see cref="FaultData" /> collection.
        /// </summary>
        /// <value>
        /// The fault data.
        /// </value>
        public IList<FaultData> FaultData { get; set; }

        /// <summary>
        /// Gets or sets the <see cref="LogRecord"/> collection.
        /// </summary>
        public IList<LogRecord> GpsRecords { get; set; }

        /// <summary>
        /// Gets or sets the <see cref="StatusData" /> collection.
        /// </summary>
        /// <value>
        /// The status data.
        /// </value>
        public IList<StatusData> StatusData { get; set; }

        /// <summary>
        /// Gets or sets the <see cref="Trip" /> collection.
        /// </summary>
        /// <value>
        /// The trips.
        /// </value>
        public IList<Trip> Trips { get; set; }
    }
}