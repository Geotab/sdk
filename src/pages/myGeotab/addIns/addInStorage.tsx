import { ReactNode } from "react";
import { IconChevronRightSmall } from "@geotab/react-component-library";
import Accordion from "../../../components/Accordion/Accordion";
import CodeSample from "../../../components/CodeSamplesContainer/CodeSample";
import InformationalBox from "../../../components/InformationalBox/InformationalBox";

// 
const StorageAPI: ReactNode = <div className="paragraph">
    <p>The Storage API allows an Add-In or integration to store records which contain generic data to a customer database. The <code className="small-code-sample">AddInData</code> object allows storage of structured JSON which can be searched for and retrieved using the API.</p>

    <h3>Sample JSON</h3>

    <InformationalBox>
        <p>Following sections will refer to this example JSON:</p>
    </InformationalBox>

    <CodeSample
        language="json"
        code={`{
    "date": "2016-01-01T00:00:00.000Z",
    "items": [{
        "name": "bottles",
        "price": 12
    }, {
        "name": "caps",
        "price": 20
    }],
    "customer": {
        "name": "joesmith",
        "email": "joe@smith.com"
    }
}`} />
</div>;

//
const CreatingAddInDataObject: ReactNode = <div className="paragraph">
    <p>An AddInData object must first be created in a database. The properties of AddInData are as follows:</p>
    <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><a href="{{site.baseurl}}/software/api/reference/#Id">Id</a></td>
                    <td>The standard Id for any Entity.</td>
                </tr>
                <tr>
                    <td><a href="{{site.baseurl}}/software/api/reference/#Id">AddInId</a></td>
                    <td>Used to identify the Add-In Solution to which this AddInData belongs. Add-Ins cannot see data from other Add-Ins. Must be provided when searching for or adding AddInData. Consider this a Serial Number for the solution that uses the Storage API.</td>
                </tr>
                <tr>
                    <td><a href="{{site.baseurl}}/software/api/reference/#Group">Groups</a></td>
                    <td>Used to define the scope required to interact with the Add-In data. (<strong><em>Optional</em></strong>)</td>
                </tr>
                <tr>
                    <td>Details</td>
                    <td>The JSON data. May be whole or partial depending on the action (Add vs. Set) or the filtering provided when calling <code className="small-code-sample">Get</code>.</td>
                </tr>
            </tbody>
        </table>
    </div>
    <p>As an example, you can use the <a href="https://geotab.github.io/sdk/software/api/runner.html">API Runner tool</a> to create an AddInData object that's not limited to any groups using the following operation:</p>
    <CodeSample
        language="javascript"
        code={`api.call("Add",
{
    "typeName": "AddInData",
    "entity": {
        "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
        "details": {
            "date": "2016-01-01T00:00:00.000Z",
            "items": [
                {
                    "name": "bottles",
                    "price": 12
                }, {
                    "name": "caps",
                    "price": 20
                }
            ],
            "customer": {
                "name": "joesmith",
                "email": "joe@smith.com"
            }
        }
    }
});`} />

    <p>The same example with the addition of the <strong>Groups</strong> parameter would result in limiting the data to the specified groups, in this case the driver activity group:</p>
    <CodeSample
        language="javascript"
        code={`api.call("Add",
{
  "typeName": "AddInData",
  "entity": {
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "groups": [{
        "id": "GroupDriverActivityGroupId"
      }
    ],
    "details": {
        "date": "2016-01-01T00:00:00.000Z",
        "items": [{
              "name": "bottles",
              "price": 12
          }, {
              "name": "caps",
              "price": 20
          }
        ],
        "customer": {
            "name": "joesmith",
            "email": "joe@smith.com"
        }
    }
  }
});`} />

    <h3>Important Notes</h3>
    <p>Each invocation of the Add operation will create a new AddInData object with a unique Id bound to the entered AddInId. The Id of the AddInData object is required to remove the object with the <code className="small-code-sample">Remove</code> method. See below for an example.</p>
    <h3>Example 1</h3>
    <p>This method call will correctly save the sample JSON and associate it to the Add-In with the AddInId of <code className="small-code-sample">a2C4ABQuLFkepPVf6-4OKAQ</code>.</p>
    <p><strong>Request</strong></p>
    <CodeSample
        language="javascript"
        code={`api.call("Add",
{
    "typeName": "AddInData",
    "entity": {
        "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
        "groups": [{
            "id": "GroupCompanyId"
        }],
        "details": {
            "date": "2016-01-01T00:00:00.000Z",
            "items": [{
                "name": "bottles",
                "price": 12
            }],
            "customer": {
                "name": "joesmith",
                "email": "joe@smith.com"
            }
        }
    }
});` } />

    <h3>Response</h3>
    <CodeSample
        language="json"
        code={`{"id": "b1"}`} />
</div>;


const RetrievingAddInData: ReactNode = <div className="paragraph">
    <p>AddInData uses a search object to query specific data using an object's path in the JSON.</p>
    <p>The AddInDataSearch properties are as follows:</p>
    <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><a href="{{site.baseurl}}/software/api/reference/#Id">Id</a></td>
                    <td>The standard Id for any Entity.</td>
                </tr>
                <tr>
                    <td><a href="{{site.baseurl}}/software/api/reference/#AddInId">AddInId</a></td>
                    <td>Can be optionally provided when searching for AddInData that belongs to a specific AddInData.</td>
                </tr>
                <tr>
                    <td><a href="{{site.baseurl}}/software/api/reference/#Group">Groups</a></td>
                    <td>Used to define the scope of a row of Add-In data. Works the same as any other ObjectModel Entity.</td>
                </tr>
                <tr>
                    <td>SelectClause (String)</td>
                    <td>Used to filter the resulting rows based on the JSON content of the row. Works with the object path notation described in usage. Independent of WhereClause.</td>
                </tr>
                <tr>
                    <td>WhereClause (String)</td>
                    <td>Used to filter the resulting rows based on the JSON content of the row. Works with the object path and operator notation described in usage. Independent of SelectClause.</td>
                </tr>
            </tbody>
        </table>
    </div>
    <p>As an example, you can use the <a href="https://geotab.github.io/sdk/software/api/runner.html">API Runner tool</a> to perform GET operations that return one or more AddInData objects:</p>
    <h3>Example 2</h3>
    <p>Get the emails of all customers who have an item with a price less than 15. This method call will return an array with a single AddInData object.</p>
    <p><strong>Request:</strong></p>
    <CodeSample
        language="javascript"
        code={`api.call("Get",
{
    "typeName": "AddInData",
    "search": {
        "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
        "selectClause": "customer.email",
        "whereClause": "items.[].price < 15"
    }
});`} />

    <p><strong>Response:</strong></p>
    <CodeSample
        language="json"
        code={`[{
    "id": "afLvRdUtXrE2D-XLwvqAgZQ",
    "groups": [{"id": "GroupCompanyId"}],
    "details": "joe@smith.com"
}]`} />

    <h3>Example 3</h3>
    <p>Get all item names for a user with the email <strong>joe@smith.com</strong>. This method call will return an array with multiple AddInData objects that satisfy both the select and where clauses.</p>
    <p><strong>Request:</strong></p>
    <CodeSample
        language="javascript"
        code={`api.call("Get",
{
    "typeName": "AddInData",
    "search": {
        "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
        "selectClause": "items.[].name",
        "whereClause": "customer.email = \\"joe@smith.com\\""
    }
});`} />

    <p><strong>Response:</strong></p>
    <CodeSample
        language="json"
        code={`[{
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "id": "afLvRdUtXrE2D-XLwvqAgZQ",
    "groups": [{"id": "GroupCompanyId"}],
    "details": "bottles"
}, {
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "id": "afLvRdUtXrE2D-XLwvqAgZQ",
    "groups": [{"id": "GroupCompanyId"}],
    "details": "caps"
}]`} />

    <p><strong>Note</strong>: Both returned AddInData objects will have the same Id because they come from the same object in the database.</p>
    <h3>Example 4</h3>
    <p>Get all data</p>
    <p><strong>Request:</strong></p>
    <CodeSample
        language="javascript"
        code={`api.call("Get",
{
    "typeName": "AddInData",
    "search": {
        "addInId": "a2C4ABQuLFkepPVf6-4OKAQ"
    }
});`} />

    <p><strong>Response:</strong></p>
    <CodeSample
        language="json"
        code={`[{
    "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
    "id": "afLvRdUtXrE2D-XLwvqAgZQ",
    "groups": [{"id": "GroupCompanyId"}],
    "details": {
        "date": "2016-01-01T00:00:00.000Z",
        "customer": {
            "email": "joe@smith.com",
            "name": "joesmith"
        }, 
        "items":[
            {
                "name": "bottles",
                "price": 12
            }, {
                "name": "caps",
                "price": 20
            }
        ]
    }
}]`} />

    <h3>Object Path Notation</h3>
    <p>The <code className="small-code-sample">SELECT</code> and <code className="small-code-sample">WHERE</code> clauses of the AddInDataSearch object use a special notation to describe an object path. If we wanted to modify the call in Example 4 to retrieve just the customer name from the AddInData object, we would add the following path notation to the <code className="small-code-sample">SELECT</code> clause of the AddInDataSearch object:</p><p><code className="small-code-sample">customer.name</code></p><CodeSample
        language="javascript"
        code={`api.call("Get",
{
    "typeName": "AddInData",
    "search": {
        "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
        "selectClause": "customer.name"
    }
});`} />

    <p>The returned AddInData object will contain a value of "joesmith" in its data property.</p>
    <p>If you have an array in the path, it must be indicated by a [] after the name of the array property.</p>
    <p>For example, if you wanted to modify Example 4 to select all item names, we would add the following to the <code className="small-code-sample">SELECT</code> clause of the AddInDataSearch object:</p>
    <p><code className="small-code-sample">items.[].name</code></p>
    <CodeSample
        language="javascript"
        code={`api.call("Get",
{
    "typeName": "AddInData",
    "search": {
        "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
        "selectClause": "items.[].name"
    }
});`} />

    <p>The same notation is used for the <code className="small-code-sample">WHERE</code> clause. This notation can be used to drill down to as many objects as you want.</p>
    <h3>Operators and Arguments</h3>
    <p>The <code className="small-code-sample">WHERE</code> clause of the AddInDataSearch object supports the following operators:</p>
    <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th>Operator</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>=</td>
                    <td>Equal to</td>
                </tr>
                <tr>
                    <td>{`<`}</td>
                    <td>Less than</td>
                </tr>
                <tr>
                    <td>{`>`}</td>
                    <td>Greater than</td>
                </tr>
                <tr>
                    <td>{`<=`}</td>
                    <td>Less than or equal to</td>
                </tr>
                <tr>
                    <td>{`>=`}</td>
                    <td>Greater than or equal to</td>
                </tr>
            </tbody>
        </table>
    </div>
    <p>These can be used with the object path notation explained above.</p>
    <p>For example, if you want to get all items with a price less than 20, the appropriate <code className="small-code-sample">WHERE</code> clause will be:</p>
    <code className="small-code-sample">{`items.[].price < 20`}</code>
    <p><strong>Note</strong>: The data type of the value on the right side of the operator is important. String values will need to be enclosed in quotation marks and properly escaped.</p>
    <p>To get all customers with the name "joesmith", the appropriate <code className="small-code-sample">WHERE</code> clause will be:</p>
    <code className="small-code-sample">customer.name = "joesmith"</code>
    <h3>Important Operation Notes for Using Get</h3>
    <ul>
        <li>The <code className="small-code-sample">SELECT</code> clause must be included if the <code className="small-code-sample">WHERE</code>  clause is specified, otherwise the entire data object will be returned. </li>
        <li>The <code className="small-code-sample">GET</code> operation always returns an Array of AddInData objects, each with a unique value in the data property.</li>
        <li>Search matching is case-sensitive. In the examples above, searching for <code className="small-code-sample">customer.name = "JoeSmith"</code> will not return any results.</li>
        <li>Results returned by the <code className="small-code-sample">SELECT</code> and <code className="small-code-sample">WHERE</code> clauses will be in the scope of the entire AddInData object. To have a search return separate matches, the independent pieces of content must be added to separate AddInData objects using the <code className="small-code-sample">ADD</code> operation.</li>
    </ul>
</div>


const UpdatingAddInData: ReactNode = <div className="paragraph">
    <p>To update stored content, use the <code>SET</code> method on an AddInData object while specifying its AddInId ID. The return value is always <code>null</code>.</p>
    <p>As an example, use the <a href="https://geotab.github.io/sdk/software/api/runner.html">API Runner tool</a> to perform the following operation:</p>
    <div className="code-sample">
        <CodeSample
            language="javascript"
            code={`api.call("Set",
{
    "typeName": "AddInData",
    "entity": {
        "addInId": "a2C4ABQuLFkepPVf6-4OKAQ",
        "id": "a6tClQu4iFkuroNPqOQsydg",
        "groups": [{
            "id": "GroupCompanyId"
        }],
        "details": {
            "date": "2016-01-01T00:00:00.000Z",
            "items": [{
                "name": "bottles",
                "price": 12
            }],
            "customer": {
                "name": "joesmith",
                "email": "joe@smith.com"
            }
        }
    }
});`} />
    </div>
</div>;


const DeletingAddInData: ReactNode = <div className="paragraph">
    <p>An AddInData object is deleted when you specify its ID. The return value is always <code>null</code>.</p>
    <div className="code-sample">
        <CodeSample
            language="javascript"
            code={`api.call("Remove", {
    "typeName": "AddInData",
    "entity": {
        "id": "a6tClQu4iFkuroNPqOQsydg"
    }
});`} />
    </div>
    <h3>AddInData JSON Restrictions</h3>
    <p>The following are the only restrictions on the JSON stored within AddInData objects:</p>
    <ol>
        <li>The JSON data for an AddInData object must be 10,000 characters or less.</li>
        <li>No property in the JSON data can have the format "geotabXYZ". This naming format is reserved for Geotab use.</li>
    </ol>
</div>;


const AdditionalNotes: ReactNode = <div className="paragraph">
    <div className="paragraph">
        <h3>Legacy Property 'Data'</h3>
        <p>The AddInData object has been available as a beta feature through several releases and as such, we've made improvements through time. Now that we are officially releasing this feature in 2101, a legacy property we are looking to get rid of is the 'Data' property. This is a string property that is not deserialized as an object when sent over JSON. The newer property, 'Details', deserializes as an object and should be used instead (you do not need to call JSON.parse() on this property). <strong>Partners that have designed their applications to work with the 'Data' property should transition to using 'Details'. In a future release, the 'Data' property will be completely removed.</strong></p>

        <h3>Cannot Delete Properties of Objects</h3>
        <p>All objects properties stored in the JSON can be modified but not deleted.</p>
        <p>Example (Replacing):</p>
        <CodeSample
            language="json"
            code={`{"customer": {"name": "joe", "email": "joe@smith.com"}}`} />
        <p>With</p>
        <CodeSample
            language="json"
            code={`{"customer": {"apple": "fruit", "salmon": "meat"}}`}
        />
        <p>Results in a merged dataset instead of a deletion of the previous content</p>
        <CodeSample
            language="json"
            code={`{"customer": {"name": "joe", "email": "joe@smith.com", "apple": "fruit", "salmon": "meat"}}`}
        />
        <p>Workarounds to this issue would be to either:</p>
        <ol>
            <li>Use arrays as a property of an object as they can be modified and resized without issue.</li>
            <li>Make two calls: first to change the "customer" value to an empty string, then a second call to set new data.</li>
        </ol>

        <h3>No LIKE Statement</h3>
        <p>Currently there is no support for fuzzy string matching.</p>

        <h3>No AND/OR Statements</h3>
        <p>The <code className="small-code-sample">WHERE</code> clause cannot perform conjunctions or disjunctions.</p>

        <h3>Security Clearance Matters</h3>
        <p>Security Clearance limitations allow the following API methods:</p>
        <ol>
            <li><strong>Administrator, Supervisor, Default User, Drive App User</strong> {`=>`} "Add/Set/Get/Remove"</li>
            <li><strong>ViewOnly</strong> {`=>`} "Get"</li>
            <li><strong>Nothing</strong> {`=>`} None</li>
        </ol>

        <h3>Small vs Large</h3>
        <p>While it's possible to create a single AddInData object with an array of details, this approach is less scalable. First is contending with the mandatory limit of 10,000 characters. Second is that it can cause unduly large objects to deal with which can be less memory efficient. Third is that if there is an array of entries and you need to remove one, you will have to remove the whole object and add a new one with the updated list of details. In general, we have found it more useful to treat the AddInData as a simple object which there can be many of.</p>
    </div>
    <h2>Additional Resources</h2>
    <ul>
        <li><a href="https://github.com/Geotab/sdk-addin-samples/tree/master/storage-api-sample">Storage API Add-in Sample</a></li>
    </ul>
</div>;


const AddInId: ReactNode = <div className="paragraph">
    <p>An AddInId must be created before the Storage API methods can be used within your Add-In. This encoded GUID is used to register and identify which Add-In some data is associated. AddInId is a mandatory parameter when calling AddInData methods to Add and Get data. This allows each Add-In's data to be isolated from the data used by other Add-Ins. This allows multiple solutions to each have their own collection of AddInData objects in the same database without the collections mixing. To generate your own AddInId, please use the following <a href="https://geotab.github.io/sdk/software/api/runner.html#sample:generate-addin-guid">example</a>.</p>
</div>;

export default function AddInStorage() {
    return (
        <div className="pageContent">
            <div className="grayBackground">
                <div className="breadCrumb">
                    <span>MYG</span>
                    <IconChevronRightSmall></IconChevronRightSmall>
                    <span>Add-Ins</span>
                    <IconChevronRightSmall></IconChevronRightSmall>
                    <span>Add-In for Data Storage</span>
                </div>
                <h1 className="title">Add-In for Data Storage</h1>
            </div>
            <div className="paragraph">
                <p>This page provides an overview of the storage (AddInData) API and describes its use within Add-Ins.</p>
                <InformationalBox>
                    <p>For a sample add-in that uses the storage API go to this <a href="https://github.com/Geotab/sdk-addin-samples/tree/master/storage-api-sample">link</a>.</p>
                </InformationalBox>
            </div>
            <Accordion summary="What is the Storage API?" p={StorageAPI}></Accordion>
            <Accordion summary="AddInId" p={AddInId}></Accordion>
            <Accordion summary="Creating an AddInData Object" p={CreatingAddInDataObject}></Accordion>
            <Accordion summary="Retrieving Stored AddInData Content" p={RetrievingAddInData}></Accordion>
            <Accordion summary="Updating Stored AddInData Content" p={UpdatingAddInData}></Accordion>
            <Accordion summary="Deleting an AddInData Object" p={DeletingAddInData}></Accordion>
            <Accordion summary="Additional Notes and Limitations" p={AdditionalNotes}></Accordion>
        </div>
    );
};