using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using DotNetOpenAuth.OAuth2;
using Google.Apis.Authentication.OAuth2;
using Google.Apis.Authentication.OAuth2.DotNetOpenAuth;
using Google.Apis.Bigquery.v2;
using Google.Apis.Bigquery.v2.Data;
using Google.Apis.Services;
using Google.Apis.Util;

namespace Geotab.SDK.DataFeed
{
    /// <summary>
    /// An object that creates a feed to bigquery
    /// </summary>
    public class FeedToBigquery
    {
        const string DatasetId = "NathanTest";
        const string ProjectNumber = "494655200415";
        readonly Job faultJobTemplate;
        readonly string folderPath;
        readonly Job gpsJobTemplate;
        readonly string refreshTokenFile;
        readonly BigqueryService service;
        readonly Job statusJobTemplate;

        /// <summary>
        /// Initializes a new instance of the <see cref="FeedToBigquery"/> class.
        /// </summary>
        /// <param name="folderPath">The folder path.</param>
        /// <exception cref="System.ArgumentNullException">Exception if the argument for path is null</exception>
        public FeedToBigquery(string folderPath)
        {
            if (string.IsNullOrEmpty(folderPath))
            {
                throw new ArgumentNullException(nameof(folderPath));
            }
            this.folderPath = folderPath;
            refreshTokenFile = Path.Combine(this.folderPath, "refreshToken.txt");
            if (!Directory.Exists(this.folderPath))
            {
                Directory.CreateDirectory(this.folderPath);
            }
            service = CreateBigqueryService();
            gpsJobTemplate = GetTemplateJob();
            statusJobTemplate = GetTemplateJob();
            faultJobTemplate = GetTemplateJob();
            gpsJobTemplate.Configuration.Load.DestinationTable.TableId = FeedToCsv.GpsPrefix;
            gpsJobTemplate.Configuration.Load.Schema.Fields = GetTableFields(FeedToCsv.GpsDataHeader);
            statusJobTemplate.Configuration.Load.DestinationTable.TableId = FeedToCsv.StatusPrefix;
            statusJobTemplate.Configuration.Load.Schema.Fields = GetTableFields(FeedToCsv.StatusDataHeader);
            faultJobTemplate.Configuration.Load.DestinationTable.TableId = FeedToCsv.FaultPrefix;
            faultJobTemplate.Configuration.Load.Schema.Fields = GetTableFields(FeedToCsv.FaultDataHeader);
        }

        /// <summary>
        /// Runs the feed.
        /// </summary>
        public void Run()
        {
            IList<string> filePaths = GetFiles();
            foreach (string filePath in filePaths)
            {
                Job jobToUse = null;
                if (filePath.Contains(FeedToCsv.GpsPrefix))
                {
                    jobToUse = gpsJobTemplate;
                }
                else if (filePath.Contains(FeedToCsv.StatusPrefix))
                {
                    jobToUse = statusJobTemplate;
                }
                else if (filePath.Contains(FeedToCsv.FaultPrefix))
                {
                    jobToUse = faultJobTemplate;
                }
                using (Stream stream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
                {
                    service.Jobs.Insert(jobToUse, ProjectNumber, stream, "application/octet-stream").Upload();
                }
                File.Delete(filePath);
            }
        }

        static string GetDataType(char type)
        {
            switch (type)
            {
                case 'i':
                    return "integer";

                case 's':
                    return "string";

                case 'd':
                    return "float";

                case 'b':
                    return "boolean";
            }
            throw new ArgumentException("Unknown type " + type);
        }

        static IList<TableFieldSchema> GetTableFields(string fieldString)
        {
            IList<TableFieldSchema> fields = new List<TableFieldSchema>();
            foreach (string fieldName in fieldString.Split(','))
            {
                char type = fieldName[0];
                fields.Add(new TableFieldSchema
                {
                    Name = fieldName.Substring(1).Replace(" ", ""),
                    Type = GetDataType(type)
                });
            }
            return fields;
        }

        static Job GetTemplateJob() => new Job
        {
            Configuration = new JobConfiguration
            {
                Load = new JobConfigurationLoad
                {
                    DestinationTable = new TableReference
                    {
                        ProjectId = ProjectNumber,
                        DatasetId = DatasetId
                    },
                    Schema = new TableSchema(),
                    SkipLeadingRows = 1,
                    Encoding = "UTF-8"
                }
            }
        };

        BigqueryService CreateBigqueryService() => new BigqueryService(new BaseClientService.Initializer
        {
            Authenticator = new OAuth2Authenticator<NativeApplicationClient>(
        new NativeApplicationClient(GoogleAuthenticationServer.Description)
        {
            ClientIdentifier = "494655200415.apps.googleusercontent.com",
            ClientSecret = "GuTyB9W2LIp0lXSD_fNTlqLL"
        }, GetAuthorization)
        });

        IAuthorizationState GetAuthorization(NativeApplicationClient arg)
        {
            IAuthorizationState state = new AuthorizationState(new[] { BigqueryService.Scopes.Bigquery.GetStringValue() })
            {
                Callback = new Uri(NativeApplicationClient.OutOfBandCallbackUrl)
            };
            string authToken = GetRefreshToken();
            if (!string.IsNullOrEmpty(authToken))
            {
                state.RefreshToken = authToken;
                if (arg.RefreshToken(state))
                {
                    return state;
                }
            }
            authToken = GetAuthorizationCodeFromUser(arg, state);
            arg.ProcessUserAuthorization(authToken, state);
            SaveNewRefreshToken(state);
            return state;
        }

        string GetAuthorizationCodeFromUser(NativeApplicationClient arg, IAuthorizationState state)
        {
            ProcessStartInfo startInfo = new ProcessStartInfo("IExplore.exe", arg.RequestUserAuthorization(state).ToString());
            Process.Start(startInfo);
            Console.WriteLine("Please login to the web page that has opened and enter the provided authorization code into the console: ");
            return Console.ReadLine();
        }

        IList<string> GetFiles()
        {
            List<string> files = new List<string>(Directory.EnumerateFiles(folderPath, FeedToCsv.GpsPrefix + "*"));
            files.AddRange(Directory.EnumerateFiles(folderPath, FeedToCsv.StatusPrefix + "*"));
            files.AddRange(Directory.EnumerateFiles(folderPath, FeedToCsv.FaultPrefix + "*"));
            return files;
        }

        string GetRefreshToken()
        {
            string code = null;
            if (File.Exists(refreshTokenFile))
            {
                using (StreamReader reader = new StreamReader(refreshTokenFile))
                {
                    code = reader.ReadLine();
                }
            }
            return code;
        }

        void SaveNewRefreshToken(IAuthorizationState state)
        {
            if (File.Exists(refreshTokenFile))
            {
                File.Delete(refreshTokenFile);
            }
            using (StreamWriter writer = new StreamWriter(refreshTokenFile))
            {
                writer.WriteLine(state.RefreshToken);
            }
        }
    }
}