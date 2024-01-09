import { CodeSamples } from "../../../components/CodeSamplesContainer";

export const methodsCodeSamples: Record<string, CodeSamples> = {
    "Add": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "",
    },
    "Authenticate": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "",
    },
    "SetUserPassword": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "",
    },
    "GenerateCaptcha": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "",
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
        "csharp": "await api.CallAsync<List<Device>>(\"Get\", typeof(Device), new { resultsLimit = 10 });",
        "python": "api.get('Device', resultsLimit=10)",
        "java": "",
    },
    "GetAddresses": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "",
    },

    "GetTimeZones": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "",
    },
    "GetVersion": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "",
    },
    "GetVersionInformation": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "",
    },
    "OptimizeWaypoints": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "",
    },
    "Remove": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "",
    },
    "Set": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "",
    },
    "UploadMediaFile": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "",
    },
    "DownloadMediaFile": {
        "javascript": "",
        "csharp": "",
        "python": "",
        "java": "",
    }

};