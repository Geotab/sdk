import { CodeSamples } from "../../../components/CodeSamplesContainer";

export const methodsCodeExamples: Record<string, CodeSamples> =
{
    "GetCoordinates": {
        "javascript": "",
        "csharp": "await api.CallAsync<Coordinate[]>(\"GetCoordinates\", new { addresses = new[] { \"770 E Pilot Rd Suite A, Las Vegas, NV 89119\", \"21-1075 North Service Rd W, Oakville, ON L6M 2G2, Canada\" } });",
        "python": "api.call(\"GetCoordinates\", addresses = [\"770 E Pilot Rd Suite A, Las Vegas, NV 89119\", \"2440 Winston Park Dr, Oakville, ON L6H 7V2, Canada\"])",
        "java": "/* Work in progress - Coming soon */"
    },
    "GetCountOf": {
        "javascript": "",
        "csharp": "await api.CallAsync<int?>(\"GetCountOf\", typeof(Device))",
        "python": "api.call(\"GetCountOf\", typeName = \"Device\")",
        "java": "/* Work in progress - Coming soon */"
    },
    "GetDaylightSavingRules": {
        "javascript": "",
        "csharp": "await api.CallAsync<TimeZoneInfoWithRules>(\"GetDaylightSavingRules\", new { timeZoneId = \"America/Toronto\" });",
        "python": "api.call(\"GetDaylightSavingRules\", timeZoneId = \"America/ Toronto\")",
        "java": "/* Work in progress - Coming soon */"
    },
    "GetDirections": {
        "javascript": "",
        "csharp": "await api.CallAsync<Directions>(\"GetDirections\", new { waypoints = new List<Waypoint> { new Waypoint { Coordinate = new Coordinate { X = -115.1477861, Y = 36.0632094 }, Sequence = 0, Description = \"A\" }, new Waypoint { Coordinate = new Coordinate { X = -79.6863441, Y = 43.5153199 }, Sequence = 1, Description = \"B\" } } });",
        "python": "api.call(\"GetDirections\", waypoints = [{ \"coordinate\": { \"x\": -115.1477861, \"y\": 36.0632094 }, \"sequence\": 0, \"description\": \"A\" }, { \"coordinate\": { \"x\": -79.6863441, \"y\": 43.5153199 }, \"sequence\": 1, \"description\": \"B\" }])",
        "java": "/* Work in progress - Coming soon */"
    },
    "GetFeed": {
        "javascript": "",
        "csharp": "await api.CallAsync<FeedResult<DutyStatusLog>>(\"GetFeed\", typeof(DutyStatusLog), new { fromVersion = 0L });",
        "python": "api.call(\"GetFeed\", typeName = \"DutyStatusLog\", fromVersion = \"0\")",
        "java": "/* Work in progress - Coming soon */"
    },
    "GetRoadMaxSpeeds": {
        "javascript": "",
        "csharp": "await api.CallAsync<Dictionary<DateTime, float>>(\"GetRoadMaxSpeeds\", new { deviceSearch = new DeviceSearch(Id.Create(\"b2\")), fromDate = new DateTime(2024, 01, 01, 00, 00, 00, DateTimeKind.Utc), toDate = new DateTime(2024, 01, 02, 00, 00, 00, DateTimeKind.Utc) });",
        "python": "api.call(\"GetRoadMaxSpeeds\", deviceSearch = dict(id = \"b2\"), fromDate = \"2024-01-01T00:00:00.000Z\", toDate = \"2024-01-02T00:00:00.000Z\")",
        "java": "/* Work in progress - Coming soon */"
    },
    "GetSystemTimeUtc": {
        "javascript": "",
        "csharp": "await api.CallAsync<DateTime>(\"GetSystemTimeUtc\")",
        "python": "api.call(\"GetSystemTimeUtc\")",
        "java": "/* Work in progress - Coming soon */"
    },
};