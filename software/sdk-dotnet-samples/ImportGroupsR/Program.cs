using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Geotab.Checkmate;
using Geotab.Checkmate.ObjectModel;

namespace Geotab.SDK.ImportGroupsR
{
    static class Program
    {
        static bool deleteEmptyGroups;
        static bool isVerboseMode;
        static bool moveAssetsUp;
        static string rootGroupSreference;
        static StreamWriter sw;

        static void CloseLogFileWriter()
        {
            if (sw == null)
            {
                return;
            }
            Console.Out.Flush();
            sw.Close();
            sw = null;
        }

        static List<Group> ExtractGroupsFromInputFile(API api, string fileName, out Group firstLineParentGroupParsed, out Group firstLineParentGroupFromDB, out IDictionary<string, Group> groupLookupFromDB, out IDictionary<string, Group> groupLookupParsed)
        {
            List<Group> groups;
            try
            {
                var parser = new ImportGroupParser(api, rootGroupSreference);
                parser.RowParsed += Parser_RowParsed;

                using (FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.Read))
                {
                    groups = parser.Parse(stream);
                }
                firstLineParentGroupParsed = parser.FirstLineParentGroupParsed;
                firstLineParentGroupFromDB = parser.FirstLineParentGroupFromDB;
                groupLookupFromDB = parser.GroupLookupFromDB;
                groupLookupParsed = parser.GroupLookupParsed;
            }
            catch (Exception exception)
            {
                Console.WriteLine("Parsing failed, exception: {0}", exception.Message);
                throw;
            }
            return groups;
        }

        static void Importer_GroupImported(object sender, EntityImportedEventArgs<GroupImporter.GroupWithLoggingData> e)
        {
            GroupImporter.GroupImportedHandler(sender, e, Console.WriteLine, isVerboseMode, true);
        }

        static void ImportGroups(API api, Group firstLineParentGroupParsed, Group firstLineParentGroupFromDB, int parsedGroupCount, IDictionary<string, Group> groupLookupFromDB, IDictionary<string, Group> groupLookupParsed, bool deleteEmptyGroups1, bool moveAssetsUp)
        {
            try
            {
                var importer = new GroupImporter(api, firstLineParentGroupParsed, firstLineParentGroupFromDB, parsedGroupCount, groupLookupParsed, groupLookupFromDB, deleteEmptyGroups1, moveAssetsUp);
                importer.EntityImported += Importer_GroupImported;
                importer.DetermineDispositionAndImportGroups();
            }
            catch (Exception exception)
            {
                Console.WriteLine($"Import failed, exception: {exception.Message}.{Environment.NewLine}Call stack: {exception.StackTrace}");
            }
        }

        static void Main(string[] args)
        {
            if (args.Length < 5)
            {
                ShowHelp();
                return;
            }
            var server = args[0];
            var database = args[1];
            var inputFilePath = args[2];
            var userName = args[3];
            var password = args[4];
            isVerboseMode = Array.IndexOf(args, "--v") >= 0;
            var parameterIndex = Array.IndexOf(args, "--f");
            if (parameterIndex >= 0)
            {
                if (parameterIndex == args.Length - 1)
                {
                    Console.WriteLine("--f argument must be followed by file name");
                    ShowHelp();
                    return;
                }
                string outputFileName = args[parameterIndex + 1];
                try
                {
                    sw = new StreamWriter(outputFileName);
                    Console.SetOut(sw);
                }
                catch (IOException ioException)
                {
                    Console.WriteLine("Unable to redirect output to file: " + ioException.Message);
                }
            }
            parameterIndex = Array.IndexOf(args, "--r");
            if (parameterIndex >= 0)
            {
                if (parameterIndex == args.Length - 1)
                {
                    Console.WriteLine("--r argument must be followed by Root Group sReference");
                }
                rootGroupSreference = args[parameterIndex + 1];
            }
            deleteEmptyGroups = Array.IndexOf(args, "--d") >= 0;
            moveAssetsUp = Array.IndexOf(args, "--m") >= 0;

            API api;
            try
            {
                // MD_temporary, set WebRequest.Timeout in msec to 24 hours for debugging
                //api = new API(userName, password, null, database, server)
                //{
                //    Timeout = 86400000
                //};

                api = new API(userName, password, null, database, server);
                api.Authenticate();
            }
            catch (Exception exception)
            {
                Console.WriteLine($"Datetime UTC: {DateTime.UtcNow} Exception: ({exception})");
                CloseLogFileWriter();
                return;
            }

            try
            {
                var groups = ExtractGroupsFromInputFile(api, inputFilePath, out Group firstLineParentGroupParsed, out Group firstLineParentGroupFromDB, out IDictionary<string, Group> groupLookupFromDB, out IDictionary<string, Group> groupLookupParsed);
                if (groups?.Count > 0)
                {
                    ImportGroups(api, firstLineParentGroupParsed, firstLineParentGroupFromDB, groups.Count, groupLookupFromDB, groupLookupParsed, deleteEmptyGroups, moveAssetsUp);
                }
                else
                {
                    Console.WriteLine("Parsed 0 groups, exception: nothing to import.");
                }
            }
            catch (Exception /*ex*/)
            {
                // keeping existing logic not to proceed with the import of parsed districts
                // whenever parsing threw an unhandled exception
            }
            finally
            {
                CloseLogFileWriter();
            }
        }

        static void Parser_RowParsed(object sender, RowParsedEventArgs<Group> e)
        {
            ImportGroupParser.RowParsedHandler(sender, e, Console.WriteLine, isVerboseMode, true);
        }

        static void ShowHelp()
        {
            var helpBuffer = $@"
GEOTAB Checkmate Import Groups Utility v{Assembly.GetExecutingAssembly().GetName().Version}
Command line:           dotnet run Server Database InputFilePath UserName Password [--f LogFilePath] [--v]
                        [--r RouteGroupReference] [--d]
Server                  - The server name or IP address of the SQL Server containing
                          the Checkmate database (for example 127.0.0.1)
Database                - The Checkmate database name (for example GEOTAB1)
InputFilePath           - Full path to the CSV file to import
Username                - Geotab user name (Example: username@geotab.com)
Pasword                 - Geotab password
--f OutputFilePath      - File name of the output file
--v                     - Output in verbose mode
--r RootGroupSreference - Route Group sReference
--d                     - Delete non-empty groups that are not in the InputFile from the Database
";
            Console.Write(helpBuffer);
        }
    }
}
