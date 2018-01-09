using Thread = System.Threading.Thread;

namespace Geotab.SDK.DataFeed
{
    /// <summary>
    /// Worker base class
    /// </summary>
    abstract class Worker
    {
        readonly string path;
        bool stop;

        /// <summary>
        /// Initializes a new instance of the <see cref="Worker"/> class.
        /// </summary>
        /// <param name="path">The path.</param>
        internal Worker(string path)
        {
            this.path = path;
        }

        /// <summary>
        /// Displays the feed results.
        /// </summary>
        /// <param name="results">The results.</param>
        public void DisplayFeedResults(FeedResultData results)
        {
            // Output to console
            // new FeedToConsole(results.GpsRecords, results.StatusData, results.FaultData).Run();
            // Optionally we can output to csv or google doc:
            new FeedToCsv(path, results.GpsRecords, results.StatusData, results.FaultData, results.Trips, results.ExceptionEvents).Run();

            // new FeedToBigquery(path).Run();
            Thread.Sleep(1000);
        }

        /// <summary>
        /// Do the work.
        /// </summary>
        /// <param name="obj">The object.</param>
        public void DoWork(object obj)
        {
            bool continuous = (bool)obj;
            do
            {
                WorkAction();
            }
            while (continuous && !stop);
        }

        /// <summary>
        /// Requests to stop.
        /// </summary>
        public void RequestStop()
        {
            stop = true;
        }

        /// <summary>
        /// The work action.
        /// </summary>
        public abstract void WorkAction();
    }
}