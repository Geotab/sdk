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
            "770 E Pilot Rd Suite A, Las Vegas, NV 89119", 
            "21-1075 North Service Rd W, Oakville, ON L6M 2G2, Canada" 
        } 
    }
);`,
        "python": `await api.call_async(
    "GetCoordinates", 
    addresses = ["770 E Pilot Rd Suite A, Las Vegas, NV 89119", "2440 Winston Park Dr, Oakville, ON L6H 7V2, Canada"]
    )`,
        "java": `/* Work in progress - Coming soon */`
    },
    "GetCountOf": {
        "javascript": ``,
        "csharp": `await api.CallAsync<int?>("GetCountOf", typeof(Zone))`,
        "python": `await api.call_async("GetCountOf", typeName = "Zone")`,
        "java": `/* Work in progress - Coming soon */`
    },
    "GetDaylightSavingRules": {
        "javascript": ``,
        "csharp": `await api.CallAsync<TimeZoneInfoWithRules>("GetDaylightSavingRules", new { timeZoneId = "America/Toronto" });`,
        "python": `await api.call_async("GetDaylightSavingRules", timeZoneId = "America/Toronto")`,
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
                    X = -115.1477861, 
                    Y = 36.0632094 
                }, 
                Sequence = 0, 
                Description = "A" 
            }, 
            new Waypoint 
            { 
                Coordinate = new Coordinate 
                { 
                    X = -79.6863441, 
                    Y = 43.5153199 
                }, 
                Sequence = 1, 
                Description = "B" 
            }, 
            new Waypoint 
            { 
                Coordinate = new Coordinate 
                { 
                    X = -99.163876, 
                    Y = 19.4305696 
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
        { "coordinate": { "x": -115.1477861, "y": 36.0632094 }, "sequence": 0, "description": "A" }, 
        { "coordinate": { "x": -79.6863441, "y": 43.5153199 }, "sequence": 1, "description": "B" }, 
        { "coordinate": { "x": -99.163876, "y": 19.4305696 }, "sequence": 2, "description": "C" }
    ]
)`,
        "java": `/* Work in progress - Coming soon */`
    },
    "GetFeed": {
        "javascript": ``,
        "csharp": `await api.CallAsync<FeedResult<StatusData>>("GetFeed", typeof(StatusData), new { fromVersion = 0L });`,
        "python": `await api.call_async("GetFeed", typeName = "StatusData", fromVersion = "0")`,
        "java": `/* Work in progress - Coming soon */`
    },
    "GetRoadMaxSpeeds": {
        "javascript": ``,
        "csharp": `await api.CallAsync<Dictionary<DateTime, float>>(
    "GetRoadMaxSpeeds", 
    new 
    { 
        deviceSearch = new DeviceSearch(Id.Create("<enter desired id>")), 
        fromDate = new DateTime(2024, 01, 01, 00, 00, 00, DateTimeKind.Utc), 
        toDate = new DateTime(2024, 01, 02, 00, 00, 00, DateTimeKind.Utc) 
    }
);`,
        "python": `await api.call_async(
    "GetRoadMaxSpeeds", 
    deviceSearch = dict(id = "<enter desired id>"), 
    fromDate = "2024-01-01T00:00:00.000Z", 
    toDate = "2024-01-02T00:00:00.000Z"
)`,
        "java": `/* Work in progress - Coming soon */`
    },
    "GetSystemTimeUtc": {
        "javascript": ``,
        "csharp": `await api.CallAsync<DateTime>("GetSystemTimeUtc")`,
        "python": `await api.call_async("GetSystemTimeUtc")`,
        "java": `/* Work in progress - Coming soon */`
    }
};