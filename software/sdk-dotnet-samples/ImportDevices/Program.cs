using System;
using System.Collections.Generic;
using System.IO;
using Geotab.Checkmate;
using Geotab.Checkmate.ObjectModel;

namespace Geotab.SDK.ImportDevices
{
    /// <summary>
    /// Main program
    /// </summary>
    static class Program
    {
        /// <summary>
        /// Checks if a device serial number exists in a collection of devices.
        /// </summary>
        /// <param name="deviceSerialNo">The device serial number.</param>
        /// <param name="devices">The collection of devices to search in.</param>
        /// <returns>True if device is found, False if not.</returns>
        static bool DeviceExists(string deviceSerialNo, IList<Device> devices)
        {
            for (int i = 0; i < devices.Count; i++)
            {
                Device device = devices[i];
                if (device.SerialNumber == deviceSerialNo.Replace("-", ""))
                {
                    return true;
                }
            }
            return false;
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
        /// Loads a csv file and processes rows into a collection of DeviceRow
        /// </summary>
        /// <param name="fileName">The csv file name</param>
        /// <returns>A collection of DeviceRow</returns>
        static List<DeviceRow> LoadDevicesFromCSV(string fileName)
        {
            List<DeviceRow> deviceRows = new List<DeviceRow>();
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
                        // Create DeviceRow from line columns
                        DeviceRow device = new DeviceRow();
                        string[] columns = line.Split(',');
                        device.Description = columns[0];
                        device.SerialNumber = columns[1];
                        device.NodeName = columns.Length > 2 ? columns[2] : "";
                        device.Vin = columns.Length > 3 ? columns[3] : "";
                        deviceRows.Add(device);
                        count++;
                    }
                    catch (Exception exception)
                    {
                        throw new Exception($"Invalid row: {count} {exception.Message}");
                    }
                }
            }
            return deviceRows;
        }

        /// <summary>
        /// This is a console example of importing devices from a .csv file.
        /// 1) Process command line arguments: Server, Database, Username, Password, Options and Load .csv file.
        /// Note: the .csv file in this project is a sample, you may need to change entries (such as group names) for the example to work.
        /// 2) Create Geotab API object and Authenticate.
        /// 3) Import devices into database.
        /// A complete Geotab API object and method reference is available at the Geotab Developer page.
        /// </summary>
        /// <param name="args">The command line arguments for the application. Note: When debugging these can be added by: Right click the project &gt; Properties &gt; Debug Tab &gt; Start Options: Command line arguments.</param>
        static void Main(string[] args)
        {
            try
            {
                if (args.Length != 5)
                {
                    Console.WriteLine();
                    Console.WriteLine("Command line parameters:");
                    Console.WriteLine("dotnet run <server> <database> <username> <password> <inputfile>");
                    Console.WriteLine();
                    Console.WriteLine("Command line:      dotnet run server database username password inputfile");
                    Console.WriteLine("server           - The server name (Example: my.geotab.com)");
                    Console.WriteLine("database         - The database name (Example: G560)");
                    Console.WriteLine("username         - The MyGeotab user name.");
                    Console.WriteLine("password         - The MyGeotab password.");
                    Console.WriteLine("inputfile        - File name of the CSV file to import.");
                    Console.WriteLine();
                    return;
                }

                // Process command line arguments
                string server = args[0];
                string database = args[1];
                string username = args[2];
                string password = args[3];
                string fileName = args[4];

                // Load DeviceRow collection from the given .csv file
                Console.WriteLine("Loading .csv file...");
                List<DeviceRow> deviceRows;
                try
                {
                    deviceRows = LoadDevicesFromCSV(fileName);
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
                User apiUser = api.Call<List<User>>("Get", typeof(User), new
                {
                    search = new UserSearch
                    {
                        Name = username
                    }
                })[0];

                // Start import
                Console.WriteLine("Importing...");

                IList<Device> existingDevices = api.Call<IList<Device>>("Get", typeof(Device)) ?? new List<Device>();
                IList<Group> groups = api.Call<IList<Group>>("Get", typeof(Group));

                // We only want to be able to assign Organization Group if the API user has this in their scope.
                bool hasOrgGroupScope = false;

                // See if the API user has Organization Group in their Groups
                foreach (Group group in apiUser.CompanyGroups)
                {
                    if (group is CompanyGroup || group is RootGroup)
                    {
                        hasOrgGroupScope = true;
                        break;
                    }
                }

                // Add devices
                foreach (DeviceRow device in deviceRows)
                {
                    bool deviceRejected = false;
                    IList<Group> deviceGroups = new List<Group>();

                    // A devices and nodes have a many to many relationship.
                    // In the .csv file if a device belongs to multiple nodes we separate with a pipe character.
                    string[] groupNames = (device.NodeName ?? "").Split('|');

                    // If there are no nodes for the device specified in the .csv we will try to assign to Organization
                    if (hasOrgGroupScope && string.IsNullOrEmpty(device.NodeName))
                    {
                        deviceGroups.Add(new CompanyGroup());
                    }

                    // Iterate through the group names and try to assign each group to the device looking it up from the allNodes collection.
                    foreach (string groupName in groupNames)
                    {
                        // Organization group.
                        if (hasOrgGroupScope && groupName.Trim().ToLowerInvariant() == "organization" || groupName.Trim().ToLowerInvariant() == "entire organization")
                        {
                            deviceGroups.Add(new CompanyGroup());
                        }
                        else
                        {
                            // Get the group from allNodes
                            Group group = GetGroup(groupName.Trim(), groups);
                            if (group == null)
                            {
                                Console.WriteLine($"Device Rejected: '{device.Description}'. Group: '{groupName}' does not exist.");
                                deviceRejected = true;
                                break;
                            }

                            // Add group to device nodes collection.
                            deviceGroups.Add(group);
                        }
                    }

                    // If the device is rejected, move on the the next device row.
                    if (deviceRejected)
                    {
                        continue;
                    }

                    // Check for an existing device.
                    if (DeviceExists(device.SerialNumber, existingDevices))
                    {
                        Console.WriteLine($"Device exists: '{device.Description}'.");
                        continue;
                    }

                    try
                    {
                        // Create the device object.
                        Device newDevice = Device.FromSerialNumber(device.SerialNumber);
                        newDevice.PopulateDefaults();
                        newDevice.Name = device.Description;
                        newDevice.Groups = deviceGroups;
                        newDevice.WorkTime = new WorkTimeStandardHours();

                        // Add the device.
                        api.Call<Id>("Add", typeof(Device), new { entity = newDevice });
                        Console.WriteLine($"Device: '{device.Description}' added");
                    }
                    catch (Exception ex)
                    {
                        // Catch and display any error that occur when adding the device
                        Console.WriteLine($"Error adding device: '{device.Description}'\n{ex.Message}");
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