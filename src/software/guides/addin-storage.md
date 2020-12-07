---
layout: page
permalink: /software/guides/addin-storage/
---
# The Geotab Storage API for Add-In Developers

This page provides an overview of the Geotab Storage API and describes its use within Add-Ins intended to be deployed on the Geotab Marketplace.

## What is the Storage API?

The Storage API allows an Add-In to store records of arbitrary data within a MyGeotab database. The AddInData object has been added to the Geotab API to allow for storage of properly-formatted JSON.

### **Sample JSON**

The following sections will refer to this example JSON:
```json
{
  "date": "2016-01-01T00:00:00.000Z",
  "items": [
    {"name": "bottles", "price": 12},
    {"name": "caps", "price": 20}
  ],
  "customer": {"name": "joesmith", "email": "joe@smith.com"}
}
```

## The purpose for and getting an AddInData GUID

An AddInData GUID must be created before the Storage API methods can be used within your Add-In. This GUID is used to register and identify which AddInData implementation is associated with a given Add-In solution within Geotab.

The AddInData GUID is a mandatory parameter when calling the AddInData method.
 This allows each Add-In&#39;s data to be isolated from the data used by other Add-Ins.
**Consider the AddInId GUID the "serial number" for your solution.**

The AddInData GUID allows multiple solutions to each have their own collection of AddInData objects in the same database without the collections mixing. To generate your own GUID, please click on the following [example]({{site.baseurl}}/software/api/runner.html#sample:generate-addin-guid).

## Creating an AddInData Object

An AddInData object must first be created in a database. The properties of AddInData are as follows:

| **Properties** |
| --- |
| [Id]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Id): The standard Id for any Entity. |
| [AddInId]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Id): Used to identify the Add-In Solution to which this AddInData belongs. Add-Ins cannot see data from other Add-Ins. Must be provided when searching for AddInData. Consider this a Serial Number for this Solution that uses the Storage API. |
| [Groups]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Group): Used to define the scope of a row of Add-In data. Works the same as any other ObjectModel Entity. Refer to the MyGeotab SDK [What&#39;s New](https://geotab.github.io/sdk/resources/new/) page for more information regarding the transition of this property from being required to optional. |
| Details (String): The JSON data. May be whole or partial depending on the action (Add vs. Set) or the filtering provided when calling Get.|

As an example, you can use the [API Runner tool](https://geotab.github.io/sdk/api/apiRunner.html) to create an AddInData object using the following operation:

```javascript
api.call("Add",
{
  "typeName": "AddInData",
  "entity": {
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "groups": [
      {
        "id": "GroupCompanyId"
      }
    ],
    "details": 
    {
        "date": "2016-01-01T00:00:00.000Z",
        "items": [
          {
              "name": "bottles",
              "price": 12
          },
          {
              "name": "caps",
              "price": 20
          }
        ],
        "customer": 
        {
            "name": "joesmith",
            "email": "joe@smith.com"
        }
    }
  }
});
```

**Important Notes**

Each invocation of the Add operation will create a new AddInData object with a unique Id bound to the entered AddInData GUID. The Id of the AddInData object is required to remove the object with the **Remove** method. See below for an example.

**Example 1** : This method call will correctly save the sample JSON and associate it to the Add-In with the GUID of a2C4ABQuLFkepPVf6-4OKAQ.

```javascript
api.call("Add",
{
  "typeName": "AddInData",
  "entity": {
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "groups": [{
        "id": "GroupCompanyId"
    }],
    "details": 
    {
        "date": "2016-01-01T00:00:00.000Z",
        "items": [
          {
              "name": "bottles",
              "price": 12
          },
        ],
        "customer": 
        {
            "name": "joesmith",
            "email": "joe@smith.com"
        }
    }
  }
});
```

## Retrieving Stored AddInData Content

AddInData uses a search object to query specific data using an object&#39;s path in the JSON.

The AddInDataSearch properties are as follows:

| **Properties** |
| --- |
| [Id]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Id): The standard Id for any Entity. |
| [AddInId]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Id): Can be optionally provided when searching for AddInData that belongs to a specific AddInData GUID. |
| [Groups]({{site.baseurl}}/software/api/reference/#T:Geotab.Checkmate.ObjectModel.Group): Used to define the scope of a row of Add-In data. Works the same as any other ObjectModel Entity. |
| SelectClause (String): Used to filter the resulting rows based on the JSON content of the row. Works with the object path notation described in usage. Independent of WhereClause. |
| WhereClause (String): Used to filter the resulting rows based on the JSON content of the row. Works with the object path and operator notation described in usage. Independent of SelectClause. |

As an example, you can use the [API Runner tool](https://geotab.github.io/sdk/api/apiRunner.html) to perform GET operations that return one or more AddInData objects:

**Example**  **2** : Get the emails of all customers who have an item with a price less than 15

```javascript
api.call("Get",
{
  "typeName": "AddInData",
  "search": {
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "selectClause": "customer.email",
    "whereClause": "items.[].price < 15"
  }
});
```

This method call will return an array with a single AddInData object:

```json
"result": [
  {
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "id": "afLvRdUtXrE2D-XLwvqAgZQ"
    "groups": [{"children": [], "id": "GroupCompanyId"}],
    "details": "joe@smith.com",
  }
]
```

**Example**  **3** : Get all item names for user with the email **joe@smith.com**

```javascript
api.call("Get",
{
  "typeName": "AddInData",
  "search": {
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "selectClause": "items.[].name",
    "whereClause": "customer.email = \"joe@smith.com\""
  }
});
```
This method call will return an array with multiple AddInData objects that satisfy both the select and where clauses.

```json
"result": [
  {
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "id": "afLvRdUtXrE2D-XLwvqAgZQ",
    "groups": [{"children": [], "id": "GroupCompanyId"}],
    "details": "bottles"
  },
  {
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "id": "afLvRdUtXrE2D-XLwvqAgZQ",
    "groups": [{"children": [], "id": "GroupCompanyId"}],
    "details": "caps"
  }
]
```
**Note** : Both returned AddInData objects will have the same Id because they come from the same object in the database.

**Example**  **4** : Get all data

```javascript
api.call("Get",
{
  "typeName": "AddInData",
  "search": {
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ"
  }
});
```

This method call will return an array with an AddInData object containing all the data stored in the AddInData object with the Id of a2C4ABQuLFkepPVf6-4OKAQ.

```json
"result": [
  {
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "id": "afLvRdUtXrE2D-XLwvqAgZQ",
    "groups": [{"children": [], "id": "GroupCompanyId"}],
    "details":
        "date": "2016-01-01T00:00:00.000Z"
        "customer": {"email": "joe@smith.com", "name": "joesmith"}
        "items":[{"name": "bottles", "price": 12}, {"name": "caps", "price": 20}]
  }
]
```
### **Object Path Notation**

The SELECT and WHERE clauses of the AddInDataSearch object use a special notation to describe an object path.

If we wanted to modify the call in Example 4 to retrieve just the customer name from the AddInData object, we would add the following path notation to the SELECT clause of the AddInDataSearch object:

**customer.name**

```javascript
api.call("Get",
{
  "typeName": "AddInData",
  "search": {
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "selectClause": "customer.name"
  }
});
```

The returned AddInData object will contain a value of "joesmith" in itsdata property.

If you have an array in the path, it must be indicated by a [] after the name of the array property.

For example, if you wanted to modify Example 4 to select all item names, we would add the following to the SELECT clause of the AddInDataSearch object:

**items.[].name**

```javascript
api.call("Get",
{
  "typeName": "AddInData",
  "search": {
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "selectClause": "items.[].name"
  }
});
```

The same notation is used for the WHERE clause. This notation can be used to drill down to as many objects as you want.

### **Operators and Arguments**

The WHERE clause of the AddInDataSearch object supports the following operators:

| = | Equal to |
| --- | --- |
| \&lt; | Less than |
| \&gt; | Greater than |
| \&lt;= | Less than or equal to |
| \&gt;= | Greater than or equal to |

These can be used with the object path notation explained above.

For example, if you want to get all items with a price less than 20, the appropriate WHERE clause will be:

**items.[].price \&lt; 20**

**Note** : The data type of the value on the right side of the operator is important. String values will need to be enclosed in quotation marks and properly escaped.

To get all customers with the name "joesmith", the appropriate WHERE clause will be:

**customer.name = "joesmith"**

### **Important Operation Notes for Using the Get.AddInData**

- The SELECT clause must be included if the WHERE clause is specified, otherwise the entire data object will be returned.
- The GET operation always returnsan Array of AddInData objects, each with a unique value in the data property.
- Search matching is case sensitive. In the examples above, searching for customer.name = "JoeSmith" will not return any results
- Results returned by the SELECT and WHERE clauses will be in the scope of the entire AddInData object.To have a search return separate matches, the independent pieces of content must be added to separate AddInData objects using the ADD operation.

## Updating Stored AddInData Content

To update stored content, use the SET method on a AddInData object while specifying its GUID and ID. The return value is always null.

As an example, use the [API Runner tool](https://geotab.github.io/sdk/api/apiRunner.html) to perform the following operation:

```javascript
api.call("Set",
{
  "typeName": "AddInData",
  "entity": {
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "id": "a6tClQu4iFkuroNPqOQsydg",
    "groups": [{
        "id": "GroupCompanyId"
    }],
    "details": 
    {
        "date": "2016-01-01T00:00:00.000Z",
        "items": [
          {
              "name": "bottles",
              "price": 12
          },
        ],
        "customer": 
        {
            "name": "joesmith",
            "email": "joe@smith.com"
        }
    }
  }
});
```
An efficient way to perform an update in your Add-In&#39;s Javascript code would be as follows:

```javascript
var myAddInObj = getMyAddInDataFunction();

var myData = myAddInObj.data;
myData.customer.name = "john";
myData.customer.email = "johndoe@company.com";
myAddInObj.data = myData;

api.call("Set",
{
  "typeName": "AddInData",
  "entity": myAddInObj
},
function (result) {
  // Set operation should return value of null in result
  // ..Continue
});
```

## Deleting an AddInData Object

An AddInData object is deleted when you specify its ID. The return value is always null.

```javascript
api.call("Remove",
{
  "typeName": "AddInData",
  "entity": {
    "id": "a6tClQu4iFkuroNPqOQsydg"
  }
});
```

### **AddInData JSON Restrictions**

The following are the only restrictions on the JSON stored within AddInData objects:
1. The JSON data for an AddInData object must be 10,000 characters or less.
2. No property in the JSON data can have the format "geotabXYZ". This naming format is reserved for Geotab use.

### **Additional Notes and Limitations**
- **Legacy property 'Data'**
    The AddInData object has been available as a beta feature through several releases and as such, we've made improvements through time. Now that we are officially releasing this feature in 2101, a legacy property we are looking to get rid of is the 'Data' property. This is a string property that is not deserialized as an object when sent over JSON. The newer property, 'Details', deserializes as an object and should be used instead (you do not need to call JSON.parse() on this property). **Partners that have designed their applications to work with the 'Data' property should transition to using 'Details'. In a future release, the 'Data' property will be completely removed.**
- **Cannot delete properties of objects**
    
    All objects properties stored in the JSON can be modified but not deleted.
    Example:
        Replacing
        <br><br>
        ```
        "customer": {"name": "joe", "email": "joe@smith.com"}
        ```
        <br><br>
        With
        <br><br>
        ```
        "customer": {"apple": "fruit", "salmon": "meat"}
        ```
        <br><br>
        Results in a merged dataset instead of a deletion of the previous content
        <br><br>
        ```
        "customer": {"name": "joe", "email": "joe@smith.com", "apple": "fruit", "salmon": "meat"}
        ```

    Workarounds to this issue would be to either:
    1. Use arrays as a property of an object as they can be modified and resized without issue.
        ```javascript
            "customer":[
                {"apple": "fruit"}, 
                {"salmon": "meat"}
            ]
        ```
    2. Make two calls: first to change the "customer" value to an empty string, then a second call to set new data.

- **No LIKE statement**:
    Currently there is no support for fuzzy string matching.
- **No AND/OR statements**:
    The WHERE clause cannot perform conjunctions or disjunctions.
- **Security Clearance Matters**:
    Security Clearance limitations allow the following API methods:
    1. **Administrator, Supervisor, Default User, Drive App User** => "Add/Set/Get/Remove"
    2. **ViewOnly** => "Get"
    3. **Nothing** => None