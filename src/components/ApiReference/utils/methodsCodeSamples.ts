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
        "python": "",
        "java": "/* Work in progress - Coming soon */"
    },
    "Authenticate": {
        "javascript": "",
        "csharp": `API api = new API("user@example.com", "password", null, "database");
await api.AuthenticateAsync();`,
        "python": `api = mygeotab.API(username='user@example.com', password='password', database='database')
api.authenticate()`,
        "java": "/* Work in progress - Coming soon */"
    },
    "SetUserPassword": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "/* Work in progress - Coming soon */"
    },
    "GenerateCaptcha": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "/* Work in progress - Coming soon */"
    },


//     "api.call("Get",{"typeName":"Device",
//                "resultsLimit": 10,
//     "search": {
//         "fromDate": new Date().toISOString()
//     },
//     "propertySelector": {
//         "fields": ["id", "name"]
//     }
// });
// "
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
        "python": `api.call_async(
    "Get",
    typeName = "Device",
    resultsLimit = 10,
    search = { "fromDate": datetime.datetime.now() },
    propertySelector = { "fields": ["id", "name"] }
)
# OR
api.get_async(
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
        coordinates = 10,
        movingAddresses = true
    }
);`,
        "python": `api.call_async(
    "GetAddresses",
    coordinates = [{"x":"25.856667", "y":" -17.924444"}],
    movingAddresses = True
)`,
        "java": "/* Work in progress - Coming soon */"
    }
};