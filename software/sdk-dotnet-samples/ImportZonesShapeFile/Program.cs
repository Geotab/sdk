using System;
using System.Collections.Generic;
using System.IO;
using Geotab.Checkmate;
using Geotab.Checkmate.ObjectModel;
using Geotab.Geographical;
using Geotab.Geographical.MapLayers;
using Geotab.Geographical.MapLayers.DataFormats;
using Color = Geotab.Drawing.Color;
using Exception = System.Exception;
using Math = System.Math;

namespace Geotab.SDK.ImportZonesShapeFile
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
        /// Gets the distance squared between 2 points.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <param name="destination">The destination.</param>
        /// <returns>distance</returns>
        static double GetDistanceSquared(ISimpleCoordinate source, ISimpleCoordinate destination) => (destination.X - source.X) * (destination.X - source.X) + (destination.Y - source.Y) * (destination.Y - source.Y);

        /// <summary>
        /// Gets the name attribute index from a shape file layer.
        /// If the value of nameAttribute is not provided, will use the first attribute with the word 'name' in it.
        /// </summary>
        /// <param name="layer">The shape file layer.</param>
        /// <param name="nameAttribute">The name attribute.</param>
        /// <returns>The index or -1 if not found.</returns>
        static int GetNameAttributeIndex(ShapeFileLayer layer, ref string nameAttribute)
        {
            string[] attributes = layer.FieldNames;
            List<string> list = new List<string>();
            foreach (string s in attributes)
            {
                list.Add(s.ToLowerInvariant());
            }
            attributes = list.ToArray();

            if (!string.IsNullOrEmpty(nameAttribute))
            {
                int nameAttributeIndex = Array.IndexOf(attributes, nameAttribute);

                if (nameAttributeIndex != -1)
                {
                    return nameAttributeIndex;
                }
                return -1;
            }

            // No valid attribute name was supplied, will use the first attribute with the word 'name' in it.
            int currentIndex = 0;
            foreach (string attribute in attributes)
            {
                if (attribute.Contains("name"))
                {
                    nameAttribute = attributes[currentIndex];
                    return currentIndex;
                }
                currentIndex++;
            }

            return -1;
        }

        static ZoneType GetZoneType(string value, List<ZoneType> availableZoneTypes)
        {
            foreach (ZoneType availableZoneType in availableZoneTypes)
            {
                if (availableZoneType.Name.ToLowerInvariant().Contains(value))
                {
                    return availableZoneType;
                }
            }
            return null;
        }

        /// <summary>
        /// This is a console example of importing zones of a specified type from a shape file set (.shp, .shx, .dbf) or csv file into a specified database.
        /// Included in this project is are sample shape files: owensboro
        ///
        /// 1) Process command line arguments: Server, Database, User name, Password, Options and load the specified shape/csv file set.
        /// 2) Process the shapes present in the shape file, using the Geotab.Geographical components to create zones from the shape points and names.
        /// 3) Create Geotab API object and Authenticate.
        /// 4) Import created zones into the database.
        /// The format of csv file is next:
        /// [Zone_name]
        /// [polygon_point_x], [polygon_point_y]
        /// [polygon_point_x], [polygon_point_y]
        /// .
        /// .
        /// [polygon_point_x], [polygon_point_y]
        /// [Zone_name]
        /// [polygon_point_x], [polygon_point_y]
        /// .
        /// .
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
                    Console.WriteLine("dotnet run <server> <database> <login> <password> [--nameAttr=<attr>] [--namePrefix=<prefix>] [--type=<name>] <inputfile>");
                    Console.WriteLine();
                    Console.WriteLine("Command line:             dotnet run server database username password --nameAttr=name --namePrefix=CA --type=home inputfile.shp");
                    Console.WriteLine("server                   - The server name (Example: my.geotab.com)");
                    Console.WriteLine("database                 - The database name (Example: G560)");
                    Console.WriteLine("username                 - The Geotab user name");
                    Console.WriteLine("password                 - The Geotab password");
                    Console.WriteLine("[--nameAttr=<attr>]      - Optional - Name of the shape's attribute to use as");
                    Console.WriteLine("                           the zone name. (Default: first attribute containing");
                    Console.WriteLine("                           the word 'name')");
                    Console.WriteLine("[--namePrefix=<prefix>]  - Optional - The name prefix. (Example: prefix + Name)");
                    Console.WriteLine("[--type=<name>]          - Optional - Specify zone type (Default: customer)");
                    Console.WriteLine("[--threshold=<number>]   - Optional - Simplify zones by removing redundant");
                    Console.WriteLine("                           points. Any point within approximately <threshold>");
                    Console.WriteLine("                           meters of a line connecting its neighbors will be");
                    Console.WriteLine("                           removed.");
                    Console.WriteLine("inputfile                - File name of the Shape file containing the shapes to");
                    Console.WriteLine("                           import with extension. (.shp, .shx, .dbf)");
                    Console.WriteLine();
                    return;
                }

                // Variables from command line
                int last = args.Length - 1;
                string server = args[0];
                string database = args[1];
                string username = args[2];
                string password = args[3];
                List<ZoneType> zoneTypes = new List<ZoneType>();
                string fileName = args[last];
                string nameAttribute = null;
                string prefix = "";
                double distanceSquaredError = -1;
                Color zonesColour = customerZoneColor;

                // Create Geotab API object
                API api = new API(username, password, null, database, server);

                // Authenticate
                Console.WriteLine("Authenticating...");
                api.Authenticate();

                Console.WriteLine("Getting current user...");
                List<User> users = api.Call<List<User>>("Get", typeof(User), new { search = new UserSearch { Name = api.UserName } });
                if (users.Count != 1)
                {
                    Console.WriteLine($"Found {users.Count} users with name {api.UserName}.");
                    return;
                }

                // the user's groups will be used when creating the zones
                var groups = users[0].CompanyGroups;

                Console.WriteLine("Getting available zone types...");
                List<ZoneType> availableZoneTypes = api.Call<List<ZoneType>>("Get", typeof(ZoneType));

                // Options from args
                for (int i = 4; i < last; i++)
                {
                    string option = args[i].ToLowerInvariant();
                    int index = option.IndexOf('=');

                    // Check the option is in the established format
                    if (index >= 0 && option.Length > index + 1)
                    {
                        // Grab the value of the optional argument
                        string value = option.Substring(index + 1).ToLowerInvariant();

                        // Zone type option
                        if (option.Contains("type"))
                        {
                            ZoneType zoneType = GetZoneType(value, availableZoneTypes);

                            if (zoneType != null && !zoneTypes.Contains(zoneType))
                            {
                                // Setting a default colour
                                switch (zoneType.Name)
                                {
                                    case "**Customer Zone":
                                        zonesColour = customerZoneColor;
                                        break;

                                    case "**Home Zone":
                                        zonesColour = homeZoneColor;
                                        break;

                                    case "**Office Zone":
                                        zonesColour = officeZoneColor;
                                        break;
                                }

                                zoneTypes.Add(zoneType);
                            }
                        }

                        // Name attribute option
                        else if (option.Contains("nameattr"))
                        {
                            nameAttribute = value;
                        }

                        // Name prefix option
                        else if (option.Contains("prefix"))
                        {
                            prefix = value.ToUpperInvariant();
                        }

                        // Zone shape simplification threshold option
                        else if (option.Contains("threshold"))
                        {
                            if (!double.TryParse(value, out double threshold))
                            {
                                Console.WriteLine("Threshold must be a number. Example: 2.5");
                            }
                            else
                            {
                                distanceSquaredError = Math.Pow(1e-5 * threshold, 2);
                            }
                        }

                        else
                        {
                            Console.WriteLine($"Unknown optional argument: {option}");
                        }
                    }
                    else
                    {
                        Console.WriteLine($"Unknown format for optional argument: {option}");
                    }
                }

                // Use Customer Zone Type for default.
                if (zoneTypes.Count < 1)
                {
                    zoneTypes.Add(ZoneTypeCustomer.Value);
                }

                IList<ISimpleCoordinate> coordinates = new List<ISimpleCoordinate>();
                IList<Zone> zones = new List<Zone>();

                // Initialize variables to hold the shape file
                DateTime maxValue = System.TimeZoneInfo.ConvertTimeToUtc(DateTime.MaxValue);
                DateTime minValue = DateTime.MinValue;
                if (!string.IsNullOrEmpty(fileName) && Path.GetExtension(fileName).ToLower().Contains("csv"))
                {
                    if (!File.Exists(fileName))
                    {
                        Console.WriteLine($"The file {fileName} does not exist.");
                        return;
                    }
                    Console.WriteLine("Loading csv file...");
                    using (StreamReader reader = File.OpenText(fileName))
                    {
                        string line;
                        string zoneName = string.Empty;
                        while (!string.IsNullOrEmpty(line = reader.ReadLine()))
                        {
                            string[] values = line.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                            if (values.Length == 0 || values.Length == 1 && string.IsNullOrWhiteSpace(values[0]))
                            {
                                continue;
                            }
                            switch (values.Length)
                            {
                                case 1:
                                    if (!string.IsNullOrEmpty(values[0]))
                                    {
                                        if (!string.IsNullOrEmpty(zoneName))
                                        {
                                            // Simplify the zone shape. This is an important step. Polygon complexity can drastically impact performance when loading/rendering zones.
                                            coordinates = SimplifyPolygon(coordinates, distanceSquaredError);

                                            // Create the zone object to be inserted later on
                                            zones.Add(new Zone(null, (string.IsNullOrEmpty(prefix) ? "" : prefix + " ") + zoneName, "", true, zoneTypes, coordinates, minValue, maxValue, zonesColour, true, groups));
                                        }
                                        coordinates = new List<ISimpleCoordinate>();
                                        zoneName = values[0];
                                    }
                                    break;

                                case 2:

                                    // read coordinates line by line
                                    if (double.TryParse(values[0], out var xCoord) && double.TryParse(values[1], out var yCoord))
                                    {
                                        coordinates.Add(new Coordinate(xCoord, yCoord));
                                    }
                                    break;

                                default:
                                    Console.WriteLine($"Skipping a line with text '{line}'");
                                    break;
                            }
                        }
                        if (!string.IsNullOrEmpty(zoneName))
                        {
                            coordinates = SimplifyPolygon(coordinates, distanceSquaredError);
                            zones.Add(new Zone(null, (string.IsNullOrEmpty(prefix) ? "" : prefix + " ") + zoneName, "", true, zoneTypes, coordinates, minValue, maxValue, zonesColour, true, groups));
                        }
                    }
                }
                else
                {
                    FileInfo shapeFile = new FileInfo(fileName);
                    FileMapLayerFactory factory = new FileMapLayerFactory(shapeFile);
                    ShapeFileLayer layer;

                    // Try to load the shape file
                    Console.WriteLine("Loading shape file...");
                    try
                    {
                        layer = (ShapeFileLayer)factory.GetMapLayer();
                    }
                    catch (Exception exception)
                    {
                        Console.WriteLine($"Could not load shape file: {exception.Message}");
                        return;
                    }

                    // Get the index of the feature attribute that holds the zone name
                    Console.WriteLine("__ " + nameAttribute);
                    int nameAttributeIndex = GetNameAttributeIndex(layer, ref nameAttribute);
                    if (nameAttributeIndex == -1)
                    {
                        Console.WriteLine("Could not find a valid attribute to use for naming the zones.");
                        return;
                    }

                    // Process shapes into zones
                    int featureIndex = 0;
                    for (int k = 0; k < layer.Features.Count; k++)
                    {
                        IEarthFeature earthFeature = layer.Features[k];

                        // Get the data we are interested in for the zone
                        IEarthPolygon polygon = earthFeature as IEarthPolygon;
                        string zoneName = layer.GetFeatureField(featureIndex, nameAttributeIndex).ToString();

                        // Filter out non-polygons and unnamed shapes
                        if (polygon == null || string.IsNullOrEmpty(zoneName))
                        {
                            featureIndex++;
                            continue;
                        }

                        // Get the points that define the polygon
                        coordinates = new List<ISimpleCoordinate>();
                        for (int i = 0; i < polygon.Count; i++)
                        {
                            EarthPoint earthPoint = (EarthPoint)polygon[i];
                            ISimpleCoordinate coordinate = new Coordinate(earthPoint.X, earthPoint.Y);
                            coordinates.Add(coordinate);
                        }

                        // Simplify the polygon. This is an important step. Polygon complexity can drastically impact performance when loading/rendering zones.
                        coordinates = SimplifyPolygon(coordinates, distanceSquaredError);

                        zones.Add(new Zone(null, (string.IsNullOrEmpty(prefix) ? "" : prefix + " ") + zoneName, "", true, zoneTypes, coordinates, minValue, maxValue, zonesColour, true, groups));
                        featureIndex++;
                    }
                }

                Console.WriteLine($"Found {zones.Count} zones to import");

                if (zones.Count < 1)
                {
                    return;
                }

                // Start import
                Console.WriteLine("Importing zones...");

                foreach (Zone zone in zones)
                {
                    try
                    {
                        // Add the zone
                        api.Call<Id>("Add", typeof(Zone), new { entity = zone });
                        Console.WriteLine($"Zone: '{zone.Name}' added");
                    }
                    catch (Exception exception)
                    {
                        // Catch and display any error that occur when adding the zone
                        Console.WriteLine($"Error adding zone: '{zone.Name}'\n{exception.Message}");
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

        /// <summary>
        /// Simplifies a polygon.
        /// </summary>
        /// <param name="polygon">The polygon.</param>
        /// <param name="distanceSquaredError">A threshold used to simplify polygon segments to linear.</param>
        /// <returns>A simplified polygon.</returns>
        static IList<ISimpleCoordinate> SimplifyPolygon(IList<ISimpleCoordinate> polygon, double distanceSquaredError)
        {
            if (distanceSquaredError < 0)
            {
                return polygon;
            }

            IList<ISimpleCoordinate> result = new List<ISimpleCoordinate>();

            // No simplification necessary, so return what was passed in
            if (polygon.Count < 3)
            {
                return polygon;
            }

            double currentSegmentsDistanceSquared = 0;  // Holds the sum of square distances of the current simplified segment
            int startIndex = 0;  // Start index of the current simplified segment
            result.Add(polygon[startIndex]);

            for (int currentIndex = 1; currentIndex < polygon.Count; currentIndex++)
            {
                // Square distance of last piece to be added to our current simplified segment
                double lastSegmentDistanceSquared = GetDistanceSquared(polygon[currentIndex - 1], polygon[currentIndex]);

                // Total square distance of candidate line
                double totalSegmentDistanceSquared = GetDistanceSquared(polygon[startIndex], polygon[currentIndex]);

                // Term used in calculating total squared distance from two squared distances
                double sumOfTwoSquaresTerm = 2 * Math.Sqrt(currentSegmentsDistanceSquared * lastSegmentDistanceSquared);

                // Check if the square distance taken by the actual perimeter is within threshold of a straight line
                if (Math.Abs(sumOfTwoSquaresTerm + currentSegmentsDistanceSquared + lastSegmentDistanceSquared - totalSegmentDistanceSquared) < distanceSquaredError)
                {
                    currentSegmentsDistanceSquared += lastSegmentDistanceSquared + sumOfTwoSquaresTerm;
                }
                else
                {
                    currentSegmentsDistanceSquared = lastSegmentDistanceSquared;
                    startIndex = currentIndex - 1;
                    result.Add(polygon[startIndex]);
                }
            }

            // Don't forget the last point
            result.Add(polygon[polygon.Count - 1]);

            return result;
        }
    }
}
