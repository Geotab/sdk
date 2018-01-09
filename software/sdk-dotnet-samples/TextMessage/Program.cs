using System;
using System.Collections.Generic;
using Geotab.Checkmate;
using Geotab.Checkmate.ObjectModel;

namespace Geotab.SDK.SendTextMessage
{
    /// <summary>
    /// Program to send text message
    /// </summary>
    static class Program
    {
        /// <summary>
        /// This is a Geotab API console example of sending text messages. It illustrates how to send a basic message, canned response message and location message.
        ///
        /// Steps:
        /// 1) Process command line arguments: Server, Database, Username and Password.
        /// 2) Create Geotab API object and Authenticate.
        /// 3) Send a basic text message.
        /// 4) Send a canned response Text Message.
        /// 5) Get a Text Message reply.
        /// 6) Send an GPS location Text Message.
        ///
        /// A complete Geotab API object and method reference is available at the Geotab SDK page.
        /// </summary>
        /// <param name="args">The command line arguments for the application. Note: When debugging these can be added by: Right click the project > Properties > Debug Tab > Start Options: Command line arguments.</param>
        static void Main(string[] args)
        {
            if (args.Length != 4)
            {
                Console.WriteLine();
                Console.WriteLine("Command line parameters:");
                Console.WriteLine("dotnet run <server> <database> <username> <password>");
                Console.WriteLine();
                Console.WriteLine("Command line:   dotnet run server database username password");
                Console.WriteLine("server        - The server name (Example: my.geotab.com)");
                Console.WriteLine("database      - The database name (Example: G560)");
                Console.WriteLine("username      - Geotab user name (Example: username@geotab.com)");
                Console.WriteLine("password      - Geotab password");
                return;
            }

            // Process command line augments
            string server = args[0];
            string database = args[1];
            string username = args[2];
            string password = args[3];

            try
            {
                // Create Geotab API object
                API api = new API(username, password, null, database, server);

                // Authenticate
                Console.WriteLine("Authenticating...");
                api.Authenticate();

                // Get a device to send text messages to.
                IList<Device> devices = api.Call<IList<Device>>("Get", typeof(Device), new { resultsLimit = 1 });

                // Make sure we have a device
                if (devices == null || devices.Count == 0)
                {
                    throw new InvalidOperationException("Datastore does not contain any devices");
                }

                Device messageRecipient = devices[0];

                Console.WriteLine("Messages will be send to: " + messageRecipient.Name);

                // Get the User who the messages will be sent from
                UserSearch userSearch = new UserSearch
                {
                    Name = username
                };
                IList<User> users = api.Call<List<User>>("Get", typeof(User), new { search = userSearch });
                if (users == null || users.Count == 0)
                {
                    throw new InvalidOperationException("Could not find the user you are authenticated in as");
                }
                User user = users[0];

                Console.WriteLine("Messages will be sent from: " + user.Name);

                /*
                 * Basic Message
                 * A basic text message with a string message.
                 */

                // Set up the message content
                TextContent messageContent = new TextContent("Testing: Geotab API example text message", false);

                // Construct the text message
                DateTime utcNow = DateTime.UtcNow;
                TextMessage basicTextMessage = new TextMessage(null, utcNow, utcNow, messageRecipient, user, messageContent, true, true, null, null, null);

                // Add the text message. MyGeotab will take care of the actual sending.
                basicTextMessage.Id = api.Call<Id>("Add", typeof(TextMessage), new { entity = basicTextMessage });

                /*
                 * Canned Response Message
                 * A canned response message is a text message with a list of predetermined responses the receiver can select from.
                 */

                // Example of sending a text message with canned a response.
                // Set up message and response options.
                CannedResponseContent cannedResponseContent = new CannedResponseContent
                {
                    Message = "Testing: Geotab API example text message with response options"
                };
                cannedResponseContent.CannedResponseOptions.Add(new CannedResponseOption("Ok"));

                // Construct the text message.
                TextMessage textMessageWithResponses = new TextMessage(messageRecipient, null, cannedResponseContent, true);

                // Add the text message, Geotab will take care of the sending process.
                textMessageWithResponses.Id = api.Call<Id>("Add", typeof(TextMessage), new { entity = textMessageWithResponses });
                Console.WriteLine("Text message sent");

                // Keep track of our last "known" sent date. We will send another message but for the purpose of this example we are going to pretend it's from a Device.
                DateTime lastKnownSentDate = DateTime.Now;

                //-------
                // START: MOCK A DEVICE REPLY.
                // **FOR EXAMPLE PURPOSES ONLY.**
                // THIS LOGIC IS HANDELED BY THE MYGEOTAB SYSTEM. YOU WOULD NOT NORMALLY DO THIS IN A WORKING ENVIRONMENT.
                //-------

                // Here we are adding a new text message with "isDirectionToVehicle = false", this means the message came from the device.
                // Normally, these will be sent by the Garmin device. This is just to show how to search for new responses.
                TextMessage textMessageFromDevice = new TextMessage(null, utcNow, utcNow, messageRecipient, user, new TextContent(cannedResponseContent.CannedResponseOptions[0].Text, false), false, true, null, null, textMessageWithResponses);
                textMessageFromDevice.Id = api.Call<Id>("Add", typeof(TextMessage), new { entity = textMessageFromDevice });

                Console.WriteLine("Response Sent");

                //-------
                // END: MOCK A DEVICE REPLY
                //-------

                // Request any messages that have been delivered/sent/read since the date provided.
                IList<TextMessage> textMessages = api.Call<IList<TextMessage>>("Get", typeof(TextMessage), new { search = new TextMessageSearch(ToDate(lastKnownSentDate)) });

                Console.WriteLine($"{textMessages.Count} delivered/sent/read");

                /*
                 * Location Message
                 * A location message is a message with a location. A series of location messages can be sent in succession to comprise a route.
                 * A clear message can be sent to clear any previous location messages.
                 */

                // Example of sending a text message with a GPS location

                // Set up message and GPS location
                LocationContent clearStopsContent = new LocationContent("Testing: Geotab API example clear all stops message", "Reset Stops", 0, 0);

                // Construct a "Clear Previous Stops" message
                TextMessage clearMessage = new TextMessage(messageRecipient, user, clearStopsContent, true);

                // Add the clear stops text message, Geotab will take care of the sending process.
                clearMessage.Id = api.Call<Id>("Add", typeof(TextMessage), new { entity = clearMessage });

                Console.WriteLine("Clear Stops Message sent");

                // Set up message and GPS location
                LocationContent withGPSLocation = new LocationContent("Testing: Geotab API example location message", "Geotab", 43.452879, -79.701648);

                // Construct the location text message.
                TextMessage locationMessage = new TextMessage(messageRecipient, user, withGPSLocation, true);

                // Add the text message, Geotab will take care of the sending process.
                locationMessage.Id = api.Call<Id>("Add", typeof(TextMessage), new { entity = locationMessage });

                Console.WriteLine("Address Message sent");
            }
            catch (Exception ex)
            {
                // Write any errors to the Console.
                Console.WriteLine(ex);
            }
        }

        static DateTime? ToDate(DateTime dateTime)
        {
            if (dateTime == DateTime.MinValue)
            {
                return DateTime.MinValue;
            }
            if (dateTime == DateTime.MaxValue)
            {
                return DateTime.MaxValue;
            }
            return dateTime;
        }
    }
}
