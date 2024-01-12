/* eslint-disable */
export const searchIndex = [
    {
        id: 1,
        title: "Storage API",
        headers:["What Is The Storage API?", "AddInId", "Creating An AddInData Object", "Retrieving Stored AddInData Content", "Updating Stored AddInData Content", "Deleting An AddInData Object", "Additional Notes And Limitations", "Additional Resources"],
        headerIds:["storage-add-in-API", "storage-add-in-id", "storage-add-in-creating", "storage-add-in-retrieving", "storage-add-in-updating", "storage-add-in-deleting", "storage-add-in-notes-and-limitations", "storage-add-in-resources"],
        content: "The Storage API allows an Add-In or integration to store records which contain generic data to a customer database. The AddInData object allows storage of structured JSON which can be searched for and retrieved using the API. An AddInId must be created before the Storage API methods can be used within your Add-In. This encoded GUID is used to register and identify which Add-In some data is associated. AddInId is a mandatory parameter when calling AddInData methods to Add and Get data. This allows each Add-In's data to be isolated from the data used by other Add-Ins. This allows multiple solutions to each have their own collection of AddInData objects in the same database without the collections mixing. To generate your own AddInId, please use the following",
        link: "/myGeotab/addIns/addInStorage", 
        breadCrumb: ["MYG", "Add-Ins", "Using Add-Ins for Data Storage"],
        category: "guide"
    },
    {
        id: 2,
        title: "Using In .NET",
        headers:["Nuget package", "API class", "Next steps"],
        headerIds:["nuget-package", "api-class", "next-steps"],
        content: "The nuget package is an SDK library for accessing MyGeotab customer databases. It is a convenient wrapper around Geotab's HTTP/JSON API to allow developers focus on writing code instead of moving data over the wire. It includes tools to assist authenticating against Geotab's servers, automatically serializing/deserializing JSON, and providing definitions for Checkmate object classes. Please remember to regularly check for Geotab.Checkmate.ObjectModel nuget package updates. Ideally, your integration should use the same Geotab.Checkmate.ObjectModel nuget package version as the one that your database is on.",
        link: "/myGeotab/guides/codeBase/usingInDotnet",
        breadCrumb: ["MYG", "Guides", "Code Base", "Using In .NET"],
        category: "guide"
    },
    {
        id: 3,
        title: "Concepts",
        headers:["HTTP POST Request", "Results & Errors", "Working With Dates", "Pagination"],
        headerIds:["myadmin-post-request", "myadmin-results-and-errors", "myadmin-working-with-dates", "myadmin-pagination"],
        content: "Version 3 of the API, e.g., /v3/MyAdminApi.ashx, introduces Pagination. Any method returning an array will be paginated, i.e., a limited number of results will be returned, along with other pagination information. v3 versions of endpoints/methods that do not yet support pagination <strong>will return an error when called</strong>. Pagination support will be indicated in the method's docs, for those methods that support it. Please use the v1 version of those endpoints until they can be updated to support pagination. Please contact your account manager to indicate the endpoint for which you would like pagination supported, and they will queue the work with our development team. Two kinds of pagination are supported: Offset-based pagination. This is the default method. Keyset-based pagination. Supported on some endpoints. This is faster and more efficient than offset-based pagination, and as such is recommended, where available. Offset-based Pagination This type of pagination breaks the result set into indexed pages, starting at 1. Specify the desired page and results per page by passing them in the request object, like so:",
        link: "/myAdmin/guides/concepts",
        breadCrumb: ["MYA", "Guides", "Concepts"],
        category: "guide"
    },
    {
        id: 4,
        title: "IOX Add-On Hardware Design Guide",
        headers:["System Introduction", "Hardware Structure", "Mini-B USB Plug Input", "Power Design", "CAN Bus Communication"],
        headerIds:["system-introduction", "hardware-structure", "mini-b-usb-plug-input", "power-design", "can-bus-communication"],
        content: "The suggested cable length is between 30 cm to 100 cm, which is based on the multiple devices in the daisy chain. The length of cable may be longer if the system of the application is with fewer devices. The positive and negative wire of the CAN bus need to be a twisted pair with inner shielding around just them, with a minimum twisting ratio is 1 twist every 25.4 mm.",
        link: "/hardware/guides/designGuide",
        breadCrumb: ["Hardware", "Guides", "Hardware Design Guide"],
        category: "guide"
    },
    {
        id: 5,
        title: "Concepts",
        headers:["Security", "Make Your First API Call", "Results And Errors", "Authentication", "HTTP Compression", "Limits", "Working With Dates", "Unit Of Measure", "Entities", "ID", "Building Block Approach", "PropertySelector BETA", "MultiCall"],
        headerIds:["security", "make-your-first-api-call", "result-and-errors", "authentication", "http-compression", "limits", "working-with-dates", "unit-of-measure", "entities", "id", "building-block-approach", "property-selector", "multicall"],
        content: "In a MultiCall, each request is run on the server synchronously. If one fails, the error results are returned immediately and <b>unreached calls are not run</b>. The error results includes the index of the call in the array that the exception occurred. Authentication and authorization is performed to obtain a session token (credentials). This token then confirms your identity for subsequent API operations. If the session expires, a new Authentication request must be made to get a new token. This approach encourages efficient use of Authentication requests, as shown in the Authentication example below.",
        link: "/myGeotab/guides/concepts",
        breadCrumb: ["MYG", "Guides", "Concepts"],
        category: "guide"
    },
    {
        id: 6,
        title: "Add",
        headers:["parameters", "return"],
        headerIds:["parameters", "return"],
        content: "Adds a new Entity to the database. This method is used to add the different entities to the database, for example Device, User or Zone. In addition to the credentials, the method will require a minimum of two parameters - the type of entity that is being added (typeName) and the entity itself. In most cases, the entity being added will need to be fully constructed. In other words, all its properties need to be defined. These requirements are defined in each of the entity definitions below.",
        link: "/myGeotab/guides/concepts",
        breadCrumb: ["MYG", "Methods", "Add"],
        category: "reference"
    },
    {
        id: 7,
        title: "Device",
        headers:["properties", "Rate Limit"],
        headerIds:["properties", "rate-limit"],
        content: "A Device represents the physical tracking device installed in the vehicle. A device and vehicle is typically synonymous since the GO tracking device is installed in a vehicle. In the case where there is no device; this is represented by 'NoDeviceId'. The device types that are supported are:.",
        link: "/myGeotab/guides/concepts",
        breadCrumb: ["MYG", "Objects", "Device"],
        category: "reference"
    },
    {
        id: 8,
        title: "User",
        headers:["properties", "Rate Limit"],
        headerIds:["properties", "rate-limit"],
        content: "A user of the system. A user can be a MyGeotab user or a user that is a Driver",
        link: "/myGeotab/guides/concepts",
        breadCrumb: ["MYG", "Objects", "User"],
        category: "reference"
    }
];

export default searchIndex;