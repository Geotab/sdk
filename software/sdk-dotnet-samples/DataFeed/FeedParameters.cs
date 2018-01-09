using Geotab.Checkmate.ObjectModel;
using Geotab.Checkmate.ObjectModel.Engine;
using Geotab.Checkmate.ObjectModel.Exceptions;

namespace Geotab.SDK.DataFeed
{
    /// <summary>
    /// Contains latest data tokens and collections to populate during <see cref="FeedProcessor.Get"/> call.
    /// </summary>
    class FeedParameters
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="FeedParameters"/> class.
        /// </summary>
        /// <param name="lastGpsDataToken">The latest <see cref="LogRecord" /> token</param>
        /// <param name="lastStatusDataToken">The latest <see cref="StatusData" /> token</param>
        /// <param name="lastFaultDataToken">The latest <see cref="FaultData" /> token</param>
        /// <param name="lastTripToken">The latest <see cref="Trip" /> token</param>
        /// <param name="lastExceptionToken">The latest <see cref="ExceptionEvent" /> token</param>
        public FeedParameters(long? lastGpsDataToken, long? lastStatusDataToken, long? lastFaultDataToken, long? lastTripToken, long? lastExceptionToken)
        {
            LastGpsDataToken = lastGpsDataToken;
            LastStatusDataToken = lastStatusDataToken;
            LastFaultDataToken = lastFaultDataToken;
            LastTripToken = lastTripToken;
            LastExceptionToken = lastExceptionToken;
        }

        /// <summary>
        /// Gets or sets the latest <see cref="ExceptionEvent" /> token.
        /// </summary>
        /// <value>
        /// The last exception token.
        /// </value>
        public long? LastExceptionToken { get; set; }

        /// <summary>
        /// Gets or sets the latest <see cref="FaultData" /> token.
        /// </summary>
        /// <value>
        /// The last fault data token.
        /// </value>
        public long? LastFaultDataToken { get; set; }

        /// <summary>
        /// Gets or sets the latest <see cref="LogRecord" /> token.
        /// </summary>
        /// <value>
        /// The last GPS data token.
        /// </value>
        public long? LastGpsDataToken { get; set; }

        /// <summary>
        /// Gets or sets the latest <see cref="StatusData" /> token.
        /// </summary>
        /// <value>
        /// The last status data token.
        /// </value>
        public long? LastStatusDataToken { get; set; }

        /// <summary>
        /// Gets or sets the latest <see cref="Trip" /> token.
        /// </summary>
        /// <value>
        /// The last trip token.
        /// </value>
        public long? LastTripToken { get; set; }
    }
}
