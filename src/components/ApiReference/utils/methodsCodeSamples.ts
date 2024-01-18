import { CodeSamples } from "../../../components/CodeSamplesContainer";

export const methodsCodeSamples: Record<string, CodeSamples> = {
    "Add": {
        "javascript": "",
        "csharp": `IList<ZoneType>  zoneTypes = new List<ZoneType> { ZoneTypeOffice.Value };
IList<ISimpleCoordinate> points = new List<ISimpleCoordinate> {
    new Coordinate(x: -79.712318, y: 43.438266),
    new Coordinate(x: -79.711181, y: 43.437461),
    new Coordinate(x: -79.712677, y: 43.436168),
    new Coordinate(x: -79.713966, y: 43.437107),
    new Coordinate(x: -79.712318, y: 43.438266)
};
Geotab.Drawing.Color zoneColor = new Geotab.Drawing.Color(255, 165, 0, 191);
IList<Group> groups = new List<Group> { new CompanyGroup() };

Zone zone = new Zone(null, null, "Example zone " + DateTime.Now, null, true, zoneTypes, points, new DateTime(1986, 01, 01), new DateTime(2055, 01, 01), zoneColor, true, groups);

await api.CallAsync<Id>(
    "Add",
    typeof(Zone),
    new
    {
        entity = zone
    }
);`,
        "python": `await api.add_async(
    "Zone",
    entity={
        "name": "Example zone " + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S:%s"),
        "mustIdentifyStops": True,
        "displayed": True,
        "activeFrom": "1986-01-01T00:00:00.000Z",
        "activeTo": "2050-01-01T00:00:00.000Z",
        "zoneTypes": ["ZoneTypeOfficeId"],
        "fillColor": {"r": 255, "g": 165, "b": 0, "a": 191},
        "points": [
            {"x": -79.712318, "y": 43.438266},
            {"x": -79.711181, "y": 43.437461},
            {"x": -79.712677, "y": 43.436168},
            {"x": -79.713966, "y": 43.437107},
            {"x": -79.712318, "y": 43.438266}
        ],
        "groups": [{"id": "GroupCompanyId"}]
    }
)`,
        "java": "/* Work in progress - Coming soon */"
    },
    "Authenticate": {
        "javascript": "",
        "csharp": `API api = new API("user@example.com", "password", null, "database");
await api.AuthenticateAsync();`,
        "python": `api = mygeotab.API(username="user@example.com", password="password", database="database")
api.authenticate()`,
        "java": "/* Work in progress - Coming soon */"
    },
    "SetUserPassword": {
        "javascript": `api.call("SetUserPassword", {
    "newPassword": "<new password for the current user>"
});`,
        "csharp": `await api.CallAsync<Task>("SetUserPassword", new { newPassword = "<new password for the current user>" });`,
        "python": `await api.call_async("SetUserPassword", newPassword = "<new password for the current user>")`,
        "java": "/* Work in progress - Coming soon */"
    },
    // TODO: Add C# & Python of GenerateCaptcha after consulting team SDK
    "GenerateCaptcha": {
        "javascript": "",
        "csharp": "/* Work in progress - Coming soon */",
        "python": "# Work in progress - Coming soon",
        "java": "/* Work in progress - Coming soon */"
    },
    "Get": {
        "javascript": "",
        "csharp": `await api.CallAsync<List<Device>>(
    "Get",
    typeof(Device),
    new
    {
        resultsLimit = 10,
        search = new DeviceSearch { FromDate = DateTime.UtcNow },
        propertySelector = new PropertySelector
        {
            Fields = new List<string>
            {
                nameof(Device.Id),
                nameof(Device.Name)
            },
            IsIncluded = true
        }
    }
);`,
        "python": `api.get_async(
    "Device",
    resultsLimit = 10,
    search = { "fromDate": datetime.datetime.now() },
    propertySelector = { "fields": ["id", "name"] }
)`,
        "java": "/* Work in progress - Coming soon */"
    },
    "GetAddresses": {
        "javascript": "",
        "csharp": `await api.CallAsync<List<ReverseGeocodeAddress>>(
    "GetAddresses",
    new
    {
        coordinates = new List<Coordinate> { new Coordinate(x: 25.856667, y: -17.924444) },
        movingAddresses = true
    }
);`,
        "python": `await api.call_async(
    "GetAddresses",
    coordinates = [{"x":"25.856667", "y":" -17.924444"}],
    movingAddresses = True
)`,
        "java": "/* Work in progress - Coming soon */"
    },
    "GetCoordinates": {
        "javascript": ``,
        "csharp": `await api.CallAsync<List<Coordinate>>(
    "GetCoordinates", 
    new 
    { 
        addresses = new List<string> 
        { 
            "New York City, NY, USA" 
        } 
    }
);`,
        "python": `await api.call_async(
    "GetCoordinates", 
    addresses = ["New York City, NY, USA"]
)`,
        "java": `/* Work in progress - Coming soon */`
    },
    "GetCountOf": {
        "javascript": ``,
        "csharp": `await api.CallAsync<int>("GetCountOf", typeof(Zone))`,
        "python": `await api.call_async("GetCountOf", typeName = "Zone")`,
        "java": `/* Work in progress - Coming soon */`
    },
    "GetDaylightSavingRules": {
        "javascript": ``,
        "csharp": `await api.CallAsync<TimeZoneInfoWithRules>(
    "GetDaylightSavingRules", 
    new 
    { 
        timeZoneId = "America/Toronto",
        minYear = 1990
    }
);`,
        "python": `await api.call_async(
    "GetDaylightSavingRules", 
    timeZoneId = "America/Toronto",
    minYear = 1990
)`,
        "java": `/* Work in progress - Coming soon */`
    },
    "GetDirections": {
        "javascript": ``,
        "csharp": `await api.CallAsync<Directions>(
    "GetDirections", 
    new 
    { 
        waypoints = new List<Waypoint> 
        { 
            new Waypoint 
            { 
                Coordinate = new Coordinate 
                { 
                    X = -79.38424129999999, 
                    Y = 43.65411539999999 
                }, 
                Sequence = 0, 
                Description = "A" 
            }, 
            new Waypoint 
            { 
                Coordinate = new Coordinate 
                { 
                    X = -79.38931020000001, 
                    Y = 43.640473 
                }, 
                Sequence = 1, 
                Description = "B" 
            }, 
            new Waypoint 
            { 
                Coordinate = new Coordinate 
                { 
                    X = -79.38424129999999, 
                    Y = 43.65411539999999 
                }, 
                Sequence = 2, 
                Description = "C" 
            } 
        } 
    }
);`,
        "python": `await api.call_async(
    "GetDirections", 
    waypoints = [
        { "coordinate": { "x": -79.38424129999999, "y": 43.65411539999999 }, "sequence": 0, "description": "A" }, 
        { "coordinate": { "x": -79.38931020000001, "y": 43.640473 }, "sequence": 1, "description": "B" }, 
        { "coordinate": { "x": -79.38424129999999, "y": 43.65411539999999 }, "sequence": 2, "description": "C" }
    ]
)`,
        "java": `/* Work in progress - Coming soon */`
    },
    "GetFeed": {
        "javascript": ``,
        "csharp": `await api.CallAsync<FeedResult<StatusData>>(
    "GetFeed", 
    typeof(StatusData), 
    new 
    { 
        resultsLimit = 10, 
        fromVersion = 0L 
    }
);`,
        "python": `await api.call_async(
    "GetFeed", 
    typeName = "StatusData", 
    resultsLimit = 10, 
    fromVersion = "0"
)`,
        "java": `/* Work in progress - Coming soon */`
    },
    "GetRoadMaxSpeeds": {
        "javascript": ``,
        "csharp": `await api.CallAsync<Dictionary<DateTime, float>>(
    "GetRoadMaxSpeeds", 
    new 
    { 
        deviceSearch = new DeviceSearch(Id.Create("<enter desired id>")), 
        fromDate = DateTime.UtcNow.AddDays(-7), 
        toDate = DateTime.UtcNow 
    }
);`,
        "python": `await api.call_async(
    "GetRoadMaxSpeeds", 
    deviceSearch=dict(id="<enter desired id>"), 
    fromDate=(datetime.datetime.now() - timedelta(days=7)), 
    toDate=datetime.datetime.now()
)`,
        "java": `/* Work in progress - Coming soon */`
    },
    "GetSystemTimeUtc": {
        "javascript": ``,
        "csharp": `await api.CallAsync<DateTime>("GetSystemTimeUtc")`,
        "python": `await api.call_async("GetSystemTimeUtc")`,
        "java": `/* Work in progress - Coming soon */`
    },
    "GetTimeZones": {
        "javascript": "",
        "csharp": `await api.CallAsync<List<TimeZoneInfo>>("GetTimeZones");`,
        "python": `await api.call_async("GetTimeZones")`,
        "java": "/* Work in progress - Coming soon */"
    },
    "GetVersion": {
        "javascript": "",
        "csharp": `await api.CallAsync<string>("GetVersion");`,
        "python": `await api.call_async("GetVersion")`,
        "java": "/* Work in progress - Coming soon */"
    },
    "GetVersionInformation": {
        "javascript": "",
        "csharp": `await api.CallAsync<VersionInformation>("GetVersionInformation");`,
        "python": `await api.call_async("GetVersionInformation")`,
        "java": "/* Work in progress - Coming soon */"
    },
    "OptimizeWaypoints": {
        "javascript": "",
        "csharp": `IList<Waypoint>  waypointsList = new List<Waypoint> {
    new Waypoint(new Coordinate(-79.78167419433593, 43.51832580566406), 0, "A"),
    new Waypoint(new Coordinate(-79.8455322265625, 43.51230010986328), 1, "B"),
    new Waypoint(new Coordinate(-79.968017578125, 43.42531967163086), 2 , "C"),
    new Waypoint(new Coordinate(-79.96439819335937, 43.47275924682617), 3 , "D"),
    new Waypoint(new Coordinate(-79.78167419433593, 43.51832580566406), 4 , "E")
};
        
await api.CallAsync<List<Waypoint>>("OptimizeWaypoints", new {waypoints = waypointsList});`,
        "python": `await api.call_async("OptimizeWaypoints", waypoints=[
    {
       "coordinate": {"x": -79.78167419433593, "y": 43.51832580566406},
       "sequence": 0,
       "description": "A"
    },
    {
        "coordinate": {"x": -79.8455322265625, "y": 43.51230010986328},
        "sequence": 1,
        "description": "B"
    },
    {
        "coordinate": {"x": -79.968017578125, "y": 43.42531967163086},
        "sequence": 2,
        "description": "C"
    },
    {
        "coordinate": {"x": -79.96439819335937, "y": 43.47275924682617},
        "sequence": 3,
        "description": "D"
    },
    {
        "coordinate": {"x": -79.78167419433593, "y": 43.51832580566406},
        "sequence": 4,
        "description": "E"
    }
])`,
        "java": "/* Work in progress - Coming soon */"
    },
    "Remove": {
        "javascript": "",
        "csharp": `Console.WriteLine("Enter the name of the zone that you want to remove:");
string zoneName = Console.ReadLine();
IList<Zone> = await api.CallAsync<List<Zone>>("Get", typeof(Zone), new { search = new { name = $"%{zoneName}%"}});
if (zones.Count > 0) {
    await api.CallAsync<Zone>("Remove", typeof(Zone), new { entity = new { id = zones[0].Id } });
} else {
    Console.WriteLine("There is no zone with such name");
}`,
        "python": `zone_name = input("Enter the name of the zone that you want to remove: ")
zones_response = await api.get_async("Zone", name= "%" + zone_name + "%")
if zones_response:
    remove_response = await api.remove_async("Zone",entity = {"id": zones_response[0]["id"]})
else:
    print("There is no zone with such name.")`,
        "java": "/* Work in progress - Coming soon */"
    },
    "Set": {
        "javascript": "",
        "csharp": `Console.WriteLine("Enter current zone name: ");
string currentZoneName = Console.ReadLine();
Console.WriteLine("Enter new zone name: ");
string newZoneName = Console.ReadLine();
        
IList<Zone> zones = await api.CallAsync<List<Zone>>("Get", typeof(Zone), new { search = new { name = $"%{currentZoneName}%"}});

if (zones.Count > 0) {
    Zone zone = zones[0];
    zone.Name = newZoneName;
            
    await api.CallAsync<Zone>("Set", typeof(Zone), new { entity = zone });
}`,
        "python": `current_zone_name = input("Enter current zone name: ")
new_zone_name = input("Enter new zone name: ")
        
zones_response = await api.get_async("Zone", name="%" + current_zone_name + "%")

if zones_response:
    zone = zones_response[0]
    zone["name"] = new_zone_name
    await api.set_async("Zone", entity=zone)
else:
    print("There is no zone with such name.")`,
        "java": "/* Work in progress - Coming soon */"
    },
    "UploadMediaFile": {
        "javascript": `import axios from "axios";
        
const solutionId = "<your solutionId here>";
const mediaFileName = "<your media file name here>";
        
let mediaFileId = await api.call( "Add", { typeName: "MediaFile",
    entity: {
        solutionId: solutionId,
        name: mediaFileName
});

const requestParams = {
    method: "UploadMediaFile",
    params: {
        mediaFile: {
            id: mediaFileId
        },
        credentials: {
            database: session.database,
            sessionId: session.sessionId,
            userName: session.userName
        }
    }
};

let api_path = "https://my.geotab.com/apiv1"
let formData = new FormData();
formData.append("JSON-RPC", encodeURIComponent(JSON.stringify(requestParams)));
        
let imgFile = "<your file here>"; // blob

formData.append("file", imgFile, mediaFileName);
axios.post(api_path, formData)
.then(response => {
    console.log("Success:", response.data);
})
.catch(error => {
    console.error("Error:", error.response ? error.response.data : error.message);
});`,
        "csharp": `Id solutionId = Id.Create(Guid.NewGuid()); // the unique solution ID of the integration
        
Console.WriteLine("Enter the name of the file (must have extension): ");
string mediaFileName = Console.ReadLine();
        
// -- Add a media file object which describes the binary file
MediaFile mediaFile = new MediaFile {
    Name = mediaFileName, // the name of the file
    Tags = new List<Tag> { new Tag { Name = "SDK Example" } }, // the tags used as media qualifiers
    SolutionId = solutionId, // the unique solution ID of the integration
    FromDate = DateTime.UtcNow,
    ToDate = DateTime.UtcNow,
    Device = null, // possible to link to a device
    Driver = null, // possible to link to a driver
    Thumbnails = null // media files can serve as thumbnails for other media files
};
        
mediaFile.Id = await api.CallAsync<Id>("Add", typeof(MediaFile), new { entity = mediaFile});
        
// Upload the media file binary
Console.WriteLine("Uploading file...");
        
string inputfile = "<your media file here>"; // the path to the file to upload
FileInfo file = new FileInfo(inputfile);
await using (var inputStream = File.OpenRead(file.FullName)) {
    await api.UploadAsync(inputStream , mediaFile);
    Console.WriteLine($"Uploading file complete.");
}`,
        "python": `import requests
import json
        
solutionId = "<your solutionId here>";
mediaFileName = "<your media file name here>";
      
mediaFileId = await api.add_async("MediaFile", entity={"solutionId": solutionId, "name": mediaFileName})
      
if mediaFileId:
    file = "<your media file here>"
    files = {
        "file": (mediaFileName, file, "image/png")
    }

    api_path = "https://my.geotab.com/apiv1"
            
    request_params = {
        "method": "UploadMediaFile",
        "params": {
            "mediaFile": {
                "id": mediaFileId,
            },
            "credentials": {
                "database": database,
                "sessionId": sessionId, 
                "userName": userName
            }
        }
    }
            
    data = {
        "JSON-RPC": json.dumps(request_params)
    }
            
    response = requests.post(api_path, data=data, files=files)

    print(response.status_code)
    if response.ok:
        print("Success") 
    else:
        print("Error:", response.text)`,
        "java": "/* Work in progress - Coming soon */"
    },
    "DownloadMediaFile": {
        "javascript": `import axios from "axios";
const mediaFileId = prompt("Enter the id of the media file: ")
const requestParams = {
    method: "DownloadMediaFile",
    params: {
        mediaFile: {
            id: mediaFileId
        },
        credentials: {
            database: session.database,
            sessionId: session.sessionId,
            userName: session.userName
        }
    }
};

let api_path = "https://my.geotab.com/apiv1"

axios.post(api_path, requestParams, { responseType: "blob" })
    .then(response => {
        console.log("Success:", response.data);
    })
    .catch(error => {
        console.error("Error:", error.response ? error.response.data : error.message);
    });`,
        "csharp": `Console.WriteLine("Enter the id of the media file:");
Id mediafileId = Id.Create(Console.ReadLine());

MediaFile mediaFile = (await api.CallAsync<IEnumerable<MediaFile>>("Get", typeof(MediaFile), new { search = new MediaFileSearch(mediafileId) })).FirstOrDefault();

Console.WriteLine("Downloading file...");

// Set the directory to the user's download directory
string userProfileDirectory = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
string downloadDirectory = Path.Combine(userProfileDirectory, "Downloads");
Directory.CreateDirectory(downloadDirectory);

var outputFile = Path.Combine(downloadDirectory, $"{Path.GetRandomFileName()}{mediaFile.Name}");

await using (var outputStream = File.OpenWrite(outputFile)) {
    await api.DownloadAsync(outputStream, mediaFile);
}

Console.WriteLine($"Downloading file complete: {outputFile}.{Environment.NewLine}");`,
        "python": `mediaFileId = input("Enter the id of the media file: ")
request_params = {
    "method": "DownloadMediaFile",
    "params": {
        "mediaFile": {
           "id": mediaFileId,
        },
        "credentials": {
            "database": database,
            "sessionId": sessionId, 
            "userName": userName
        }
    }
}
        
api_path = "https://my.geotab.com/apiv1"
    
response = requests.post(api_path, json=request_params, stream=True)
    
if response.status_code == 200:
    print("Success! Response received.")
    filename = f"downloaded_media_{mediaFileId}.png"  
    
    # Stream the content to a file
    with open(filename, "wb") as file:
        for chunk in response.iter_content(chunk_size=1024 * 1024): 
            if chunk:
                file.write(chunk)
                        
    print(f"File downloaded and saved as {filename}.")`,
        "java": "/* Work in progress - Coming soon */"
    }
};
