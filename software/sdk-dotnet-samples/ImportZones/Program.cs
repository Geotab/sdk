using System;
using System.Collections.Generic;
using System.IO;
using Geotab.Checkmate;
using Geotab.Checkmate.ObjectModel;
using Color = Geotab.Drawing.Color;

namespace Geotab.SDK.ImportZones
{
    /// <summary>
    /// Main Program
    /// </summary>
    static class Program
    {
        // The default colors of Geotab zone types
        static readonly Color customerZoneColor = new Color(255, 0, 0, 192);

        static readonly Color homeZoneColor = new Color(0, 128, 0, 192);
        static readonly Color officeZoneColor = new Color(255, 165, 0, 192);

        /// <summary>
        /// Checks if a zone exists in a collection of zones based on it's name and group name.
        /// </summary>
        /// <param name="zoneName">The zone name.</param>
        /// <param name="groupName">The zone group name.</param>
        /// <param name="zones">The collection of zones to search in.</param>
        /// <returns>True if zone is found, False if not.</returns>
        public static bool ZoneExists(string zoneName, string groupName, IList<Zone> zones)
        {
            for (int i = 0; i < zones.Count; i++)
            {
                Zone zone = zones[i];
                if (zone.Name.Equals(zoneName, StringComparison.OrdinalIgnoreCase))
                {
                    if (groupName.Length == 0 && (zone.Groups[0] is CompanyGroup || zone.Groups[0] is RootGroup))
                    {
                        return true;
                    }
                    if (groupName.Equals(zone.Groups[0].Name, StringComparison.OrdinalIgnoreCase))
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        /// <summary>
        /// Create a new circle zone.
        /// </summary>
        /// <param name="name">The zone name.</param>
        /// <param name="comment">The zone comment.</param>
        /// <param name="longitude">The longitude of the center point of the zone.</param>
        /// <param name="latitude">The latitude of the center point of the zone.</param>
        /// <param name="size">The size.</param>
        /// <param name="polygonSides">The number of polygon sides.</param>
        /// <param name="zoneTypes">The zone types.</param>
        /// <param name="color">The color.</param>
        /// <param name="groups">The nodes.</param>
        /// <returns>
        /// A new zone.
        /// </returns>
        static Zone CreateCircleZone(string name, string comment, double longitude, double latitude, double size, int polygonSides, IList<ZoneType> zoneTypes, Color color, IList<Group> groups)
        {
            double diagonal = 0.001F * size;
            IList<ISimpleCoordinate> circleCoordinates = GetCircleCoordinates(new Coordinate(longitude, latitude), diagonal / 2, polygonSides);

            return new Zone(null, name, comment, true, zoneTypes, circleCoordinates, DateTime.MinValue, System.TimeZoneInfo.ConvertTimeToUtc(DateTime.MaxValue), color, true, groups);
        }

        /// <summary>
        /// Gets new collection of coordinated for a circle in a given coordinate space, size and precision.
        /// </summary>
        /// <param name="centroid">Center point.</param>
        /// <param name="radius">Radius in kilometers for the Earth space or in pixels for the Device space.</param>
        /// <param name="numberOfPoints">Precision as a number of circle contour points.</param>
        /// <returns>A list of <see cref="ISimpleCoordinate"/>.</returns>
        static IList<ISimpleCoordinate> GetCircleCoordinates(ISimpleCoordinate centroid, double radius, int numberOfPoints)
        {
            IList<ISimpleCoordinate> circleCoordinates = new List<ISimpleCoordinate>();

            // Draw a circular zone.
            double pointAngle = Math.PI / numberOfPoints * 2;

            // Radius in degrees along latitude or longitude at Equator;
            // 20037 = Half of EarthDistance along the equator in kilometers
            radius /= 20037.707072954225 / 180;

            for (int i = 0; i < numberOfPoints; i++)
            {
                float y = (float)(Math.Cos(i * pointAngle) * radius + centroid.Y);
                float xOffset = (float)(Math.Sin(i * pointAngle) * radius);

                // Mind that we are not at Equator.
                xOffset = (float)(xOffset / Math.Abs(Math.Cos(y * Math.PI / 180)));
                float x = xOffset + (float)centroid.X;
                circleCoordinates.Add(new Coordinate(x, y));
            }
            return circleCoordinates;
        }

        /// <summary>
        /// Searches for and returns a group from a flat list of groups.
        /// </summary>
        /// <param name="name">The group name to search for.</param>
        /// <param name="groups">The group collection to search in.</param>
        /// <returns>The found group or null if not found.</returns>
        static Group GetGroup(string name, IList<Group> groups)
        {
            for (int i = 0; i < groups.Count; i++)
            {
                Group group = groups[i];
                if (group.Name.Equals(name, StringComparison.OrdinalIgnoreCase))
                {
                    return group;
                }
            }
            return null;
        }

        /// <summary>
        /// Loads a csv file and processes rows into a collection of ZoneRow.
        /// </summary>
        /// <param name="fileName">The csv file name.</param>
        /// <returns>A collection of ZoneRow</returns>
        static List<ZoneRow> LoadZonesFromCSV(string fileName)
        {
            List<ZoneRow> customers = new List<ZoneRow>();
            int count = 0;
            using (StreamReader streamReader = new StreamReader(fileName))
            {
                string line;
                while ((line = streamReader.ReadLine()) != null)
                {
                    // Consider lines starting with # to be comments
                    if (line.StartsWith("#", StringComparison.Ordinal))
                    {
                        count++;
                        continue;
                    }

                    try
                    {
                        // Create ZoneRow from line columns
                        ZoneRow zoneRow = new ZoneRow();
                        string[] columns = line.Split(',');
                        zoneRow.Name = columns[0];
                        zoneRow.Longitude = float.Parse(columns[1]);
                        zoneRow.Latitude = float.Parse(columns[2]);
                        zoneRow.Size = float.Parse(columns[3]);
                        zoneRow.NodeName = columns[4];
                        customers.Add(zoneRow);
                        count++;
                    }
                    catch (Exception exception)
                    {
                        throw new Exception($"Invalid row: {count} {exception.Message}");
                    }
                }
            }
            return customers;
        }

        /// <summary>
        /// This is a console example of importing Zones from a .csv file.
        ///
        /// 1) Process command line arguments: Server, Database, Username, Password, Options and Load .csv file.
        ///    Note: the .csv file in this project is a sample, you may need to change entries (such as group names) for the example to work.
        /// 2) Create Geotab API object and Authenticate.
        /// 3) Import zones into database.
        ///
        /// A complete Geotab API object and method reference is available at the Geotab Developer page.
        /// </summary>
        /// <param name="args">The command line arguments for the application. Note: When debugging these can be added by: Right click the project > Properties > Debug Tab > Start Options: Command line arguments.</param>
        static void Main(string[] args)
        {
            try
            {
                if (args.Length < 5)
                {
                    Console.WriteLine();
                    Console.WriteLine("Command line parameters:");
                    Console.WriteLine("dotnet run <server> <database> <username> <password> [-poly=<##>] [-type=<name>] <inputfile>");
                    Console.WriteLine();
                    Console.WriteLine("Command line:      dotnet run server database username password -poly=6 -type=home inputfile");
                    Console.WriteLine("server             - The server name (Example: my.geotab.com)");
                    Console.WriteLine("database           - The database name (Example: G560)");
                    Console.WriteLine("username           - The Geotab user name");
                    Console.WriteLine("password           - The Geotab password");
                    Console.WriteLine("--poly=##           - Optional - Draw the zone as an N-sided polygon. (Default: 4)");
                    Console.WriteLine("--type=<name>       - Optional - Specify zone type as customer, home, or office. (Default: customer)");
                    Console.WriteLine("inputfile          - File name of the CSV file to import.");
                    Console.WriteLine();
                    return;
                }

                // Variables from command line
                int last = args.Length - 1;
                string server = args[0];
                string database = args[1];
                string username = args[2];
                string password = args[3];
                string filename = args[last];
                int polygonSides = 4;

                IList<ZoneType> zoneTypes = new List<ZoneType>();

                // Options from args
                for (int i = 4; i < last; i++)
                {
                    string option = args[i].ToLowerInvariant();

                    // Poly sides option
                    if (option.Contains("poly"))
                    {
                        int index = option.IndexOf('=');
                        if (index >= 0 && option.Length > index + 1)
                        {
                            if (int.TryParse(option.Substring(index + 1), out int value) && value > 2)
                            {
                                polygonSides = value;
                            }
                        }
                    }

                    // Zone type option
                    else if (option.Contains("type"))
                    {
                        int index = option.IndexOf('=');
                        if (index >= 0 && option.Length > index + 1)
                        {
                            string value = option.Substring(index + 1).ToLowerInvariant();
                            ZoneType zoneType = null;
                            if (value.Contains("customer"))
                            {
                                zoneType = ZoneTypeCustomer.Value;
                            }
                            else if (value.Contains("home"))
                            {
                                zoneType = ZoneTypeHome.Value;
                            }
                            else if (value.Contains("office"))
                            {
                                zoneType = ZoneTypeOffice.Value;
                            }
                            if (zoneType != null && !zoneTypes.Contains(zoneType))
                            {
                                zoneTypes.Add(zoneType);
                            }
                        }
                    }
                }

                // Use Customer Zone Type for default.
                if (zoneTypes.Count == 0)
                {
                    zoneTypes.Add(ZoneTypeCustomer.Value);
                }

                // Load .csv file entries into a collection of customers
                Console.WriteLine("Loading CSV file...");
                List<ZoneRow> zoneRows;
                try
                {
                    zoneRows = LoadZonesFromCSV(filename);
                }
                catch (Exception exception)
                {
                    Console.WriteLine($"Could not load CSV file: {exception.Message}");
                    return;
                }

                // Create Geotab API object
                API api = new API(username, password, null, database, server);

                // Authenticate
                Console.WriteLine("Authenticating...");
                api.Authenticate();

                // Get user
                User user = api.Call<User>("RefreshUser");

                // Start import
                Console.WriteLine("Importing...");

                IList<Zone> zones = api.Call<IList<Zone>>("Get", typeof(Zone));
                IList<Group> allGroups = api.Call<IList<Group>>("Get", typeof(Group));

                // We only want to be able to assign Organization Group if the API user has this in their scope.
                bool hasOrgGroupScope = false;

                // See if the API user has Organization Group in their Groups
                foreach (Group group in user.CompanyGroups)
                {
                    if (group is CompanyGroup || group is RootGroup)
                    {
                        hasOrgGroupScope = true;
                        break;
                    }
                }

                // Set the zone color based on type.
                // Geotab uses standard colors for the stock zone types. Colors are noted at the top of this class.
                Color zoneColor = customerZoneColor;
                if (zoneTypes.Count > 0)
                {
                    ZoneType type = zoneTypes[0];
                    if (type is ZoneTypeHome)
                    {
                        zoneColor = homeZoneColor;
                    }
                    else if (type is ZoneTypeOffice)
                    {
                        zoneColor = officeZoneColor;
                    }
                }

                // Add zones
                foreach (ZoneRow zoneRow in zoneRows)
                {
                    Group group;

                    // If there are no nodes for the zone specified in the .csv we will try to assign to Organization
                    if (hasOrgGroupScope && string.IsNullOrEmpty(zoneRow.NodeName))
                    {
                        group = new CompanyGroup();
                    }

                    // Organization group
                    else if (hasOrgGroupScope && zoneRow.NodeName.Trim().ToLowerInvariant() == "organization" || zoneRow.NodeName.Trim().ToLowerInvariant() == "entire organization")
                    {
                        group = new CompanyGroup();
                    }
                    else
                    {
                        // Get the group from allGroups
                        group = GetGroup(zoneRow.NodeName.Trim(), allGroups);
                        if (group == null)
                        {
                            Console.WriteLine($"Zone Rejected: '{zoneRow.Name}'. Group: '{zoneRow.NodeName}' does not exist.");
                            continue;
                        }
                    }

                    // Check for an existing zone
                    if (ZoneExists(zoneRow.Name, zoneRow.NodeName, zones))
                    {
                        Console.WriteLine($"Zone exists: '{zoneRow.Name}'.");
                        continue;
                    }

                    // Check for an existing zone
                    try
                    {
                        // Create a new zone object
                        Zone zone = CreateCircleZone(zoneRow.Name, "", zoneRow.Latitude, zoneRow.Longitude, zoneRow.Size, polygonSides, zoneTypes, zoneColor, new List<Group> { group });
                        api.Call<Id>("Add", typeof(Zone), new { entity = zone });
                        Console.WriteLine($"Zone: '{zoneRow.Name}' added");
                    }
                    catch (Exception ex)
                    {
                        // Catch and display any error that occur when adding the zone
                        Console.WriteLine($"Error adding zone: '{zoneRow.Name}'\n{ex.Message}");
                    }
                }
            }
            catch (Exception ex)
            {
                // Show miscellaneous exceptions
                Console.WriteLine($"Error: {ex.Message}\n{ex.StackTrace}");
            }
            finally
            {
                Console.WriteLine("Press any key to continue...");
                Console.ReadKey(true);
            }
        }
    }
}
