using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Thread = System.Threading.Thread;

namespace Geotab.SDK.DataFeed
{
    /// <summary>
    /// Main program
    /// </summary>
    static class Program
    {
        /// <summary>
        /// This is a console example of obtaining the data feed from the server.
        /// 1) Process command line arguments: Server, Database, User, Password, Options, File Path and Continuous Feed option.
        /// 2) Collect data via download to csv.
        /// 3) Disable comments to enable feed to console and/or feed to BigQuery options and rerun.
        /// A complete Geotab API object and method reference is available at the Geotab Developer page.
        /// </summary>
        /// <param name="args">The command line arguments for the application. Note: When debugging these can be added by: Right click the project &gt; Properties &gt; Debug Tab &gt; Start Options: Command line arguments.</param>
        static void Main(string[] args)
        {
            const string Command = "> dotnet run --s {0} --d {1} --u {2} --p {3} --gt {4} --st {5} --ft {6} --tt {7} --et {8} --f {9} --c";
            if (args.Length > 0)
            {
                IList<string> arguments = new List<string>();
                foreach (string s in args)
                {
                    arguments.Add(s.ToLowerInvariant());
                }
                int index = arguments.IndexOf("--u");
                if (index >= 0 && index < args.Length - 1)
                {
                    string user = args[index + 1];
                    index = arguments.IndexOf("--p");
                    if (index >= 0 && index < args.Length - 1)
                    {
                        string password = args[index + 1];
                        index = arguments.IndexOf("--s");
                        if (index >= 0 && index < args.Length - 1)
                        {
                            string server = args[index + 1];
                            index = arguments.IndexOf("--d");
                            if (index >= 0 && index < args.Length - 1)
                            {
                                string database = index >= 0 && index < args.Length - 1 ? args[index + 1] : null;
                                index = arguments.IndexOf("--gt");
                                long? gpsToken = index >= 0 && index < args.Length - 1 ? (long?)long.Parse(args[index + 1]) : null;
                                index = arguments.IndexOf("--st");
                                long? statusToken = index >= 0 && index < args.Length - 1 ? (long?)long.Parse(args[index + 1]) : null;
                                index = arguments.IndexOf("--ft");
                                long? faultToken = index >= 0 && index < args.Length - 1 ? (long?)long.Parse(args[index + 1]) : null;
                                index = arguments.IndexOf("--tt");
                                long? tripToken = index >= 0 && index < args.Length - 1 ? (long?)long.Parse(args[index + 1]) : null;
                                index = arguments.IndexOf("--et");
                                long? exceptionToken = index >= 0 && index < args.Length - 1 ? (long?)long.Parse(args[index + 1]) : null;
                                index = arguments.IndexOf("--f");
                                string path = index >= 0 && index < args.Length - 1 ? args[index + 1] : Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                                bool continuous = arguments.IndexOf("--c") >= 0;
                                bool federation = string.IsNullOrEmpty(database);
                                Worker worker = new DatabaseWorker(user, password, database, server, gpsToken, statusToken, faultToken, tripToken, exceptionToken, path);
                                Thread thread = new Thread(worker.DoWork);
                                thread.Start(continuous);
                                if (continuous && Console.ReadLine() != null)
                                {
                                    worker.RequestStop();
                                }
                                thread.Join();
                                Console.WriteLine();
                                Console.WriteLine("******************************************************");
                                Console.WriteLine("Finished receiving data from " + server + (federation ? "" : "/" + database));
                                Console.WriteLine("******************************************************");
                                Console.WriteLine("Press ENTER to quit.");
                                Console.ReadLine();
                                return;
                            }
                        }
                    }
                }
            }
            Console.WriteLine("Usage:\n");
            Console.WriteLine(Command, "server", "database", "user", "password", "nnn", "nnn", "nnn", "nnn", "nnn", "file path");
            Console.WriteLine("--s  The Server");
            Console.WriteLine("--d  The Database");
            Console.WriteLine("--u  The User");
            Console.WriteLine("--p  The Password");
            Console.WriteLine("--gt The last known gps data token");
            Console.WriteLine("--st The last known status data token");
            Console.WriteLine("--ft The last known fault data token");
            Console.WriteLine("--tt The last known trip token");
            Console.WriteLine("--et The last known exception token");
            Console.WriteLine("--f  The folder to save any output files to, if applicable. Defaults to the current directory.");
            Console.WriteLine("--c  Run the feed continuously.");
            Console.ReadLine();
        }
    }
}
