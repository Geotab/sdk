import { CodeSamples } from "../../../components/CodeSamplesContainer";

export const methodsCodeExamples: Record<string, CodeSamples> =
{
    "GetCoordinates": {
        "javascript": "",
        "csharp": "",
        "python": "api.call('GetCoordinates', addresses= ['770 E Pilot Rd Suite A, Las Vegas, NV 89119', '2440 Winston Park Dr, Oakville, ON L6H 7V2, Canada'])",
        "java": ""
    },
    "GetCountOf": {
        "javascript": "",
        "csharp": "",
        "python": "api.call('GetCountOf', typeName = 'Device')",
        "java": ""
    },
    "GetDaylightSavingRules": {
        "javascript": "",
        "csharp": "",
        "python": "api.call('GetDaylightSavingRules', timeZoneId = 'America/ Toronto')",
        "java": ""
    },
    "GetDirections": {
        "javascript": "",
        "csharp": "",
        "python": "api.call('GetDirections', waypoints = [{ 'coordinate': { 'x': -115.1477861, 'y': 36.0632094 }, 'sequence': 0, 'description': 'A' }, { 'coordinate': { 'x': -79.6863441, 'y': 43.5153199 }, 'sequence': 1, 'description': 'B' }])",
        "java": ""
    },
    "GetFeed": {
        "javascript": "",
        "csharp": "",
        "python": "api.call('GetFeed', typeName = 'DutyStatusLog', fromVersion= '0')",
        "java": ""
    },
    "GetRoadMaxSpeeds": {
        "javascript": "",
        "csharp": "",
        "python": "api.call('GetRoadMaxSpeeds', deviceSearch = dict(id = 'b2'), fromDate= '2024-01-01T00:00:00.000Z', toDate= '2024-01-02T00:00:00.000Z')",
        "java": ""
    },
    "GetSystemTimeUtc": {
        "javascript": "",
        "csharp": "",
        "python": "api.call('GetSystemTimeUtc')",
        "java": ""
    },
};