import { ReactNode } from "react";

import { Page } from "./../../../components";
import { PageTitleProps } from "./../../../components/PageTitle/PageTitle";
import { HeaderSections } from "./../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "./../../../components/TableOfContents/TableOfContents";

import Accordion from "../../../components/Accordion/Accordion";
import CodeSample from "../../../components/CodeSamplesContainer/CodeSample";
import InformationalBox from "../../../components/InformationalBox/InformationalBox";

import navigationMenuImage from "./../../../assets/images/developingAddIns/developing-addins_0.png";
import navigationSubmenuImage from "./../../../assets/images/developingAddIns/developing-addins_1.png";
import flowChartImage from "./../../../assets/images/developingAddIns/developing-addins_2.png";
import mapImage from "./../../../assets/images/developingAddIns/developing-addins_3.png";

const addInTypes: ReactNode = (
    <div className="paragraph">
        <h2>Pages</h2>
        <p>
            A custom page Add-In can be thought of as a complete web application inside your Geotab account. A custom page Add-In has access to the MyGeotab API and the current page state. With custom pages you can develop business-aware Add-Ins by combining MyGeotab data with your own APIs.
        </p>
        <h2>Buttons</h2>
        <p>
            Custom button Add-Ins can be included to perform different functions. Additional navigational buttons can be dynamically inserted inside certain areas of the MyGeotab user interface. This allows custom button Add-Ins to provide a simple way for users to reach your custom page Add-In (see Image 1).  Buttons can also be placed on pages to execute functions for automation of routine tasks, such as report generation (see Image 3).
        </p>
    </div>
);

const useCases: ReactNode = (
    <div className="paragraph">
        <p>
            Consider a manager who regularly performs similar tasks each day. Their workflow may consist of comparing fleet metrics with local data from your software. By creating a custom page Add-In, you can combine both of these tasks into one easy-to-use page where all the information is readily available.
        </p>
        <p>
            Another example is to quickly navigate between different areas of Geotab. A simple-to-use one-click button Add-In can be made for most pages. The button will guide the user between areas, and can optionally use the page state to automatically fill in URL parameters to run reports with a single click.
        </p>
    </div>
);

const requirements: ReactNode = (
    <div className="paragraph">
        <p>
            The Add-Ins created must have their source code stored externally using your own hosting provider or your own servers.
        </p>
        <InformationalBox>
            <p>
                Referenced files must be publicly accessible via HTTPS and all hosted resources must be on a server that supports TLS 1.2 or higher.
            </p>
        </InformationalBox>
    </div>
);

const addInConfiguration: ReactNode = (
    <div className="paragraph">
        <p>
            Each Add-In created will have one configuration file. The configuration file is a JSON file (
            <a href="http://www.json.org"
                target="_blank"
                rel="noreferrer"
                aria-label="JSON website">
                http://www.json.org
            </a>
            ) of keys and values which describes the Add-In, who is responsible for it, what source code it contains, and a digital security signature.
        </p>
        <h2>Table 1 — Add-In Configuration File Keys/Values</h2>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Required Version</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>name</td>
                        <td>The name of this Add-In</td>
                        <td>String</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>supportEmail</td>
                        <td>Email address for support related to this Add-In</td>
                        <td>String</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>items</td>
                        <td>Array of custom pages and/or buttons (External references)</td>
                        <td>Array</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>files</td>
                        <td>Custom pages and/or buttons (Embedded code)</td>
                        <td>Object</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>key</td>
                        <td>Unique MyGeotab Marketplace Add-In key assigned by Geotab. If there's no plan to get your Add-In to the Marketplace, you can leave out the key/value pair from the Configuration File</td>
                        <td>String</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>signature</td>
                        <td>Digital signature of the Add-In</td>
                        <td>String</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>version</td>
                        <td>The version of the add-in</td>
                        <td>String</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>enableViewSecurityId</td>
                        <td>If true, a "View {`{ADDIN_NAME}`} add-in" security clearance feature is created that must be enabled for users to be able to view the Add-in.</td>
                        <td>Boolean</td>
                        <td>MyGeotab v9.0+</td>
                    </tr>
                    <tr>
                        <td>securityIds</td>
                        <td>
                            An array of custom security IDs that are added to the list of features available when editing clearances. These definitions can support multiple languages. e.g.{" "}
                            <code className="small-code-sample">{"“securityIds”: [{“name”: “ExampleSecurityIdentifier1”, “en”: “Example Security Identifier 1”}, {“name”: “ExampleSecurityIdentifier2”, “en”: “Example Security Identifier 2”}]"}</code>
                        </td>
                        <td>Array</td>
                        <td>MyGeotab v9.0+</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <InformationalBox>
            <p>
                If you do not know your MyGeotab Add-In key, please contact your authorized Geotab reseller for support.
            </p>
        </InformationalBox>
        <p>
            The Add-In configuration file can specify the contents using either the Items, Files property, or a combination of both. It is recommended to use Items and externally referencing the source code to make development and debugging easier. When ready, the code can be embedded directly on Geotab's servers.
        </p>
    </div>
);

const exampleAddInConfiguration: ReactNode = (
    <div className="paragraph">
        <p>
            The Add-In configuration file below demonstrates how to define a simple Add-In which references an HTML page specified by its URL. Any CSS or JavaScript which is required by the Add-In would be specified in the referenced HTML.
        </p>
        <h2>Listing 1 — A Simple Add-In Configuration JSON File</h2>
        <CodeSample
            language="json"
            code={`{
    "name": "My First Geotab Add-In",
    "supportEmail": "myname@mycompany.com",
    "version": "1.0",
    "items": [{
        "url":"https://my3.geotab.com/g560/customerPage1.html",
        "path": "ActivityLink",
        "svgIcon":"https://www.geotab.com/geoimages/home/icon-solutions.svg",
        "menuName": {
            "en": "English Menu Text",
            "fr": "French Menu Text"
        }
    }],
    "files": { }
}`} />
        <p>
            Test the example above by navigating to Administration → System → System Settings → Add-Ins. Select New Add-In and paste the example in the configuration tab. Be sure to select save then refresh the page.
        </p>
        <p>
            Each Add-In can create a navigation entry in the left hand side menu. This allows quick and easy access to all of the Add-Ins. The placement of the navigation entry for the Add-In is specified in the configuration file, relative to another built-in navigation entry. In the section below, a navigation entry is placed directly after the Activity entry. A user with English as their interface language will see "English Menu Text" as the label. Note that we show only two properties for brevity.
        </p>
        <CodeSample
            language="json"
            code={`{
    "path": "ActivityLink/",
    "menuName": {
        "en": "English Menu Text",
        "fr": "French Menu Text"
    }
}`} />

        <figure>
            <img src={navigationMenuImage} alt="Image 1 — Modified left-hand-side menu" />
            <figcaption>Image 1 — Modified left-hand-side menu</figcaption>
        </figure>
        <p>
            The Add-In navigation entry can be placed after any of the following built-in values:
        </p>
        <ul>
            <li><code className="small-code-sample">GettingStartedLink</code></li>
            <li><code className="small-code-sample">ActivityLink</code></li>
            <li><code className="small-code-sample">EngineMaintenanceLink</code></li>
            <li><code className="small-code-sample">ZoneAndMessagesLink</code></li>
            <li><code className="small-code-sample">RuleAndGroupsLink</code></li>
            <li><code className="small-code-sample">AdministrationLink</code></li>
        </ul>
        <p>
            To place the navigation entry as a sub-menu entry in one of the main entries, place a slash (<code className="small-code-sample">/</code>) character after the name. The custom entry will be the first item inside the sub-menu.
        </p>
        <p>
            For example, by changing <code className="small-code-sample">"ZoneAndMessagesLink/"</code> as the value for the <code className="small-code-sample">"path"</code> key:
        </p>
        <code className="small-code-sample">"path": "ZoneAndMessagesLink/",</code>
        <p>
            This will insert the custom navigation entry as follows:
        </p>
        <figure>
            <img src={navigationSubmenuImage} alt="Navigation entry after ZoneAndMessagesLink" />
            <figcaption>Image 4 — Navigation entry after ZoneAndMessagesLink</figcaption>
        </figure>
        <p>
            Navigation entries cannot be set at the third level (sub-sub-menu) and below. If done so by the steps outlined above, the entry will simply appear as a non-formatted bullet point in the menu.
        </p>
        <InformationalBox>
            <p>
                A user may not have access to some entries of the left hand side menu. The custom navigation entry will be shown after the nearest entry which is accessible to them.
            </p>
        </InformationalBox>
        <h2>Table 2 — Menu Item</h2>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>URL</td>
                        <td>A URL to the HTML page to load when clicking on this menu item.</td>
                        <td>String</td>
                    </tr>
                    <tr>
                        <td>path</td>
                        <td>Specifies where in the menu hierarchy this menu item should reside. It will follow the menuId specified or become a child item if a trailing slash is provided, such as <code className="small-code-sample">"ActivityLink/"</code>.</td>
                        <td>String</td>
                    </tr>
                    <tr>
                        <td>menuName</td>
                        <td>An object containing key value pairs for the text that appears on the menu item. The key is the language and the value is the text, for example: <code className="small-code-sample">{`{"EN", "New menu item"}`}</code>.</td>
                        <td>Object</td>
                    </tr>
                    <tr>
                        <td>icon</td>
                        <td>(To be deprecated June 04, 2021) A URL to the image (svg, png, jpg, etc.) that is placed in front of the menu item. Note that the current image size is 32x32 but it is recommended that SVG icons are used to allow for scaling. This property is to be deprecated and replaced by svgIcon for versions 2102 onward. During the transition period, if both icon and svgIcon exist, svgIcon will have higher priority (
                            <a href="https://www.geotab.com/blog/mygeotab-add-in-icons-specs/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="MyGeotab Add-In Icons Specifications">
                                details here
                            </a>
                            ).</td>
                        <td>String</td>
                    </tr>
                    <tr>
                        <td>svgIcon</td>
                        <td>A URL to the svg image that is placed in front of the menu item. Since the image file type is a vector, you only need to submit one file in any color. The icon file will be updated to the appropriate colors (
                            <a href="https://www.geotab.com/blog/mygeotab-add-in-icons-specs/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="MyGeotab Add-In Icons Specifications">
                                details here
                            </a>{" "}
                            ). A validator is available{" "}
                            <a href="#geotab-add-in-icon-validator"
                                rel="noreferrer"
                                aria-label="Scroll to Add-In Icon Validator">
                                here
                            </a>
                            .</td>
                        <td>String</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Table 3 — Parent Menu Item</h2>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>menuId</td>
                        <td>A unique identifier for this menu. This string value of your choice but should be unique. See built-in ones above <code className="small-code-sample">"GettingStartedLink"</code>, <code className="small-code-sample">"ActivityLink"</code>, etc.</td>
                        <td>String</td>
                    </tr>
                    <tr>
                        <td>path</td>
                        <td>Specifies where in the menu hierarchy this menu item should reside. It will follow the menuId specified or become a child item if a trailing slash is provided, such as <code className="small-code-sample">"ActivityLink/"</code>.</td>
                        <td>String</td>
                    </tr>
                    <tr>
                        <td>menuName</td>
                        <td>An object containing key-value pairs for the text that appears on the menu item. The key is the language and the value is the text, for example: <code className="small-code-sample">{`{"EN", "New menu item"}`}</code>.</td>
                        <td>Object</td>
                    </tr>
                    <tr>
                        <td>icon</td>
                        <td>(To be deprecated June 04, 2021) A URL to the image (svg, png, jpg, etc.) that is placed in front of the menu item. Note that the current image size is 32x32 but it is recommended that SVG icons are used to allow for scaling. This property is to be deprecated and replaced by svgIcon for versions 2102 onward. During the transition period, if both icon and svgIcon exist, svgIcon will have higher priority (
                            <a href="https://www.geotab.com/blog/mygeotab-add-in-icons-specs/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="MyGeotab Add-In Icons Specifications">
                                details here
                            </a>
                            )
                            .</td>
                        <td>String</td>
                    </tr>
                    <tr>
                        <td>svgIcon</td>
                        <td>A URL to the svg image that is placed in front of the menu item. Since the image file type is a vector, you only need to submit one file in any color. The icon file will be updated to the appropriate colors (
                            <a href="https://www.geotab.com/blog/mygeotab-add-in-icons-specs/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="MyGeotab Add-In Icons Specifications">
                                details here
                            </a>{" "}
                            ). A validator is available{" "}
                            <a href="#geotab-add-in-icon-validator"
                                rel="noreferrer"
                                aria-label="Scroll to Add-In Icon Validator">
                                here
                            </a>
                            .</td>
                        <td>String</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const creatingSubmenu: ReactNode = (
    <div className="paragraph">
        <p>
            To create a sub-menu, add to the items array a special JSON object that looks nearly identical to the page item — with the exception of the URL property.
        </p>
        <p>
            The process consists in creating a{" "}
            <a href="#table-3--parent-menu-item"
                rel="noreferrer"
                aria-label="">
                parent menu item
            </a>{" "}
            with the menuName for the submenu item, a menuId, icon, and a path for one of the build-in path navigation values  (<em>GettingStartedLink</em>, <em>ActivityLink</em>, <em>EngineMaintenanceLink</em>, <em>ZoneAndMessagesLink</em>, <em>RuleAndGroupsLink</em>, <em>AdministrationLink</em>).
        </p>
        <p>
            To place a{" "}
            <a href="#table-2--menu-item"
                rel="noreferrer"
                aria-label="">
                menu item
            </a>{" "}
            under a parent menu item you will use the unique ID of the submenu as a path for the item. This is illustrated in the sample configuration below:
        </p>
        <CodeSample
            language="json"
            code={`{
    "name": "Submenu Add-In",
    "supportEmail": "support@mycompany.com",
    "version": "1.0",
    "items": [{
        "path": "ActivityLink/",
        "menuId": "SubmenuContainer1",
        "menuName": {
            "en": "Submenu"
        },
        "icon": "images/icon.svg"
    }, {
        "url": "submenu-addin/submenu-addin.html",
        "path": "SubmenuContainer1/",
        "menuName": {
            "en": "Submenu Add-In"
        },
        "icon": "images/icon.svg"
    }]
}`} />
        <h2>Referencing Source Items</h2>
        <p>
            Each Add-In can define zero or more <em>items</em> as part of its configuration file. An item is a collection of keys and values which represent a page or a button.
        </p>
        <h2>Table 4 — Button Item</h2>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>page</td>
                        <td>Which built-in page to place the button on. Possible values: <em>'map', 'tripsHistory', 'devices', 'device', 'zones', 'users', 'user', 'rules', 'rule', 'exceptions', 'customReports', 'customReport', 'engineFaults', 'speedProfile', 'hosLogs', 'hosLog', 'groupsTree', 'routes', 'fuelUsage',</em> and <em>'engineMeasurements'</em>.</td>
                        <td>String</td>
                    </tr>
                    <tr>
                        <td>click</td>
                        <td>A URL to a JavaScript file which is executed when the button is clicked.</td>
                        <td>String</td>
                    </tr>
                    <tr>
                        <td>buttonName</td>
                        <td>An object containing key value pairs for the text that appears on the button. The key is the language, and the value is the text, for example <code className="small-code-sample">{`{"EN", "New menu item"}`}</code>.</td>
                        <td>Object</td>
                    </tr>
                    <tr>
                        <td>icon</td>
                        <td>(To be deprecated June 04, 2021) for placing it in the button label. This property is to be deprecated and replaced by svgIcon for versions 2102 onward. During the transition period, if both icon and svgIcon exist, svgIcon will have higher priority (
                            <a href="https://www.geotab.com/blog/mygeotab-add-in-icons-specs/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="MyGeotab Add-In Icons Specifications">
                                details here
                            </a>
                            ).</td>
                        <td>String</td>
                    </tr>
                    <tr>
                        <td>svgIcon</td>
                        <td>A URL Reference to the svg image for placing it in the button label. Since the image file type is a vector, you only need to submit one file in any color. The icon file will be updated to the appropriate colors (
                            <a href="https://www.geotab.com/blog/mygeotab-add-in-icons-specs/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="MyGeotab Add-In Icons Specifications">
                                details here
                            </a>{" "}
                            ). A validator is available{" "}
                            <a href="#geotab-add-in-icon-validator"
                                rel="noreferrer"
                                aria-label="Scroll to Add-In Icon Validator">
                                here
                            </a>
                            .</td>
                        <td>String</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>
            At least one language is required in each item definition. The following language options are currently supported in MyGeotab: English (<code className="small-code-sample">"en"</code>),
            French (<code className="small-code-sample">"fr"</code>),
            German (<code className="small-code-sample">"de"</code>),
            Spanish (<code className="small-code-sample">"es"</code>),
            Japanese (<code className="small-code-sample">"ja"</code>),
            Polish (<code className="small-code-sample">"pl"</code>),
            Brazilian Portuguese (<code className="small-code-sample">"pt-BR"</code>),
            Dutch (<code className="small-code-sample">"nl"</code>),
            Italian (<code className="small-code-sample">"it"</code>),
            Simplified Chinese (<code className="small-code-sample">"zh-Hans"</code>),
            Thai (<code className="small-code-sample">"th"</code>),
            Indonesian (<code className="small-code-sample">"id"</code>),
            Czech (<code className="small-code-sample">"cs"</code>),
            Swedish (<code className="small-code-sample">"sv"</code>),
            Turkish (<code className="small-code-sample">"tr"</code>),
            Malay (<code className="small-code-sample">"ms"</code>),
            and French France (<code className="small-code-sample">"fr-FR"</code>).
        </p>
        <InformationalBox>
            <p>
                Reference to the image can be an external URL such as: <code className="small-code-sample">
                    https://mysite.com/images/icon.png;</code> or a link to the image from the images folder of your Add-In.
            </p>
        </InformationalBox>
        <p>
            When using the items property to include your source code exclusively, you can set the files property an empty object using <code className="small-code-sample">
                {`{ }`}</code> as seen in Listing 1.
        </p>
        <p>
            Every Add-In has a JavaScript object which is set in your main.js file. For example, the Add-In class name "myaddin" is provided by the following JavaScript entry point:
        </p>
        <CodeSample
            language="javascript"
            code={`geotab.addin.myaddin = () => { 
    ... 
}`} />
        <p>
            The name you provide should be unique for each Add-In and should take care to avoid including invalid characters in the name. Additionally, when referencing Add-Ins hosted externally, the absolute path to the Add-In should not include the following characters anywhere in their URL:
        </p>
        <ul>
            <li>"-" The dash symbol</li>
            <li>"@" The "at" symbol</li>
            <li>"#" The hash symbol</li>
        </ul>
        <p>
            For example, the following is an invalid absolute URL due to its dashes and will not be loaded correctly by MyGeotab:
        </p>
        <InformationalBox>
            <code className="small-code-sample">https://my-web-server.com/pathToAddIn/index.html</code>
        </InformationalBox>
        <h2>Embedding Source Code</h2>
        <p>
            When developing a custom page or button Add-In, you have the option to embed the source code for your project in the JSON configuration file. When using this method, there is no requirement to host your own HTML, CSS, or JavaScript files as they will be converted into strings and written inside the configuration file itself.
        </p>
        <h2>Listing 3 — Add-In Configuration File Using Embedded Source Code</h2>
        <CodeSample
            language="json"
            code={`{
    "name": "Example Embedded Add-In",
    "supportEmail": "myname@mycompany.com",
    "version": "1.0",
    "items": [],
    "files": {
        "customPage.html": "<html><head> **...** </head><body> **...** </body></html>",
        "js": {
                "customScript1.js": "alert('Embedded Add-In');",
                "customScript2.js": "var e = 2.718;"
        },
        "css": {
                "customStyles.css": "#customDiv{color:#ff0;}"
        }
    }
}`} />

        <InformationalBox>
            <p>
                Please be aware that some characters may need to use HTML escape characters (
                <a href="http://www.w3schools.com/charsets/ref_html_8859.asp"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="HTML ISO-8859-1 Reference">
                    HTML ISO-8859-1 Reference
                </a>
                ) and{" "}
                <a href="http://dev.w3.org/html5/html-author/charref"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="HTML named character references">
                    Character Reference
                </a>{" "}
                for the overall JSON object to be validated.
            </p>
        </InformationalBox>
        <p>
            By reproducing the previous example, there would be two folders, one named "js" and the other "css". Inside the folders are two JavaScript files and one CSS stylesheet; respectively.
        </p>
        <p>
            The user experience of your custom Add-In can be enhanced by including images in the configuration file. This can be performed in two ways; see Listings 4, 5, and 6 below.
        </p>
        <h2>Listing 4 — Absolute Path to Image in HTML</h2>
        <p>
            Referencing an external image using an absolute URL in the HTML or CSS.
        </p>
        <CodeSample
            language="html"
            code={`<img src="https://mycompany.com/images/customImage.png" alt="CustomImage" />`} />
        <h2>Listing 5 — Absolute Path to Image in CSS</h2>
        <CodeSample
            language="css"
            code={`#customImage {
    background: url('https://mycompany.com/images/customImage.png') no-repeat; 
}`} />
        <h2>Listing 6 — Add-In Configuration File with Base64 Encoded Image</h2>
        <p>
            The other method is to embed the images along with the rest of the source code in the markup. First, the images will need to be encoded using{" "}
            <a href="http://en.wikipedia.org/wiki/Base64"
                target="_blank"
                rel="noreferrer"
                aria-label="Base64">
                Base64 encoding
            </a>
            , then the references to the image files replaced with the encoded version directly in the HTML or CSS.
        </p>
        <CodeSample
            language="json" code={`{
    "files": {
        "customPage.html": "<html><head>...</head><body>...</body></html>",
        "css": {
            "customStyles.css": "#customDiv{background:url('images/img.png);}"
        },
        "images": {
            "img.png": ["PD94bWdG3sN1M..."]
        }
        ...
    }
}`} />
    </div>
);

const thirdPartyLibraries: ReactNode = (
    <div className="paragraph">
        <p>
            Add-Ins can include references to external libraries that have been custom developed or to existing libraries such as jQuery. This is performed in the traditional way by including a <code className="small-code-sample">{"<"}script{">"}</code> tag to the URL of the file.
        </p>
        <h2>Listing 7 — Referencing jQuery from an Add-In</h2>
        <CodeSample
            language="html"
            code={`<!DOCTYPE html>
<html>
    <head>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js">
        </script>
    </head>`} />
        <p>
            Keep in mind that the end-user using the Add-In will be viewing your Add-In from a Geotab server. The files referenced must be publicly available on the Internet. Firewalls cannot be configured with a specific IP address for the Geotab server as the address may change in the future.
        </p>
        <p>
            References to external source files can either be absolute URLs such as the example in Listing 7 or can be relative references to local files as demonstrated in Listing 3.
        </p>
        <h2>Listing 8 — Avoiding CSS Naming Conflicts</h2>
        <p>
            When referencing the CSS files, keep in mind that naming conflicts are possible. Geotab's outer framework defines a number of CSS styles for common HTML tags which the custom Add-In may inherit. When designing HTML tags, it is recommended to prefix the HTML tags with a common name when they are stylized with the CSS.
        </p>
        <CodeSample
            language="html"
            code={`<div id="myaddin-menu"><a href="#" id="myaddin-refreshButton">Refresh</a></div>`} />
        <br></br>
        <CodeSample
            language="css"
            code={`#myaddin-menu {
    position: absolute;
    background-color: #99cc00;
}
#myaddin-refreshButton {
    text-decoration: none;
}`} />
    </div>
);

const pageLifecycle: ReactNode = (
    <div className="paragraph">
        <p>
            When designing a custom page Add-In, it is important to understand the JavaScript events that take place on Geotab's servers. The user-defined JavaScript code must supply an entry point object which will be created with a predefined parameter signature. From these parameters, a signed-in Geotab API object will be received, along with the page state and a callback synchronization function.
        </p>
        <p>
            Every page on Geotab's servers, including custom page Add-Ins, have the following three methods called during their lifecycle:
        </p>
        <p>Table 5 — Add-In lifecycle methods</p>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>Description</th>
                        <th>Signature</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>initialize</td>
                        <td>Called only once when your custom page is first accessed. Use this method to initialize variables required by your Add-In.</td>
                        <td><code className="small-code-sample">
                            function(api, state, callback) {`{... }`}</code></td>
                    </tr>
                    <tr>
                        <td>focus</td>
                        <td>This method is called after the user interface has loaded or the state of the organization filter is changed. Use this method for initial interactions with the user or elements on the page.</td>
                        <td><code className="small-code-sample">
                            function(api, state) {`{... }`}</code></td>
                    </tr>
                    <tr>
                        <td>blur</td>
                        <td>This method is called when the user is navigating away from your page. Use this method to save any required state.</td>
                        <td><code className="small-code-sample">
                            function(api, state) {`{... }`}</code></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>Visual Diagram</h2>
        <p>
            Understanding the workflow and methods called will help you design a responsive custom page Add-In. Keep in mind that your initialize method will only be called once, unless the user explicitly refreshes their web browser. When the user interface is ready, the <code className="small-code-sample">focus</code> method will be called. Finally, when the user is navigating away from your custom page Add-In, the <code className="small-code-sample">blur</code> method will be called, completing the Add-In lifecycle.
        </p>
        <InformationalBox>
            <p>
                It's important to call the <code className="small-code-sample">callback</code> passed into <code className="small-code-sample">initialize</code> <em>after</em> all work is complete. Keep in mind the asynchronous nature of JavaScript.
            </p>
        </InformationalBox>
        <figure>
            <img src={flowChartImage} alt="Image 2 — Add-In lifecycle workflow diagram" />
            <figcaption>Image 2 — Add-In lifecycle workflow diagram</figcaption>
        </figure>
        <h2>Lifecycle Implementation</h2>
        <p>
            The following code can be used as a starting point for a custom page Add-In. All of the lifecycle methods are defined, and the optional <code className="small-code-sample">focus</code> and <code className="small-code-sample">blur</code> methods will be called due to the <code className="small-code-sample">
                callback</code> method being called in the <code className="small-code-sample">
                initialize</code> method.
        </p>
        <p>
            Use the commented area to define and then assign variables in the scope of the Add-In. Each of the Add-Ins will need to define its own unique namespace with the prefix <code className="small-code-sample">
                geotab.addin</code> (note that the namespace is not hyphenated). In the example below, the full namespace is <code className="small-code-sample">geotab.addin.myCustomPage1</code>.
        </p>
        <h2>Listing 9 — HTML and JavaScript Entry Point Example</h2>
        <CodeSample
            language="html"
            code={`<!DOCTYPE html>
<html>
<head>
    <title>Custom Page Add-In</title>
    <script>
        geotab.addin.myCustomPage1 = () => {
        // Initialize required Add-In variables
        // Example:
        // var element = document.getElementById("myButton");
        // if (element) {
        //     element.addEventListener("click", function (event) {
        //         event.preventDefault();
        //         alert("Action performed");
        //     });
        // }
        return {
            initialize(api, state, callback) {
                callback();
                },
                focus(api, state) {
                // User interface is available
                },
                blur(api, state) {
                // Save any Add-In state
                }
            };
        };
    </script>
</head>
<body>
    <button id="myButton">Do Action</button>
</body>
</html>`} />
    </div>
);

const customButtonAddIns: ReactNode = (
    <div className="paragraph">
        <p>
            Custom button Add-Ins allow you to extend the capabilities of a built-in Geotab page by appending a new button to the top menu of the page. When a user clicks the custom button Add-In, the JavaScript method that has been defined will be called. This JavaScript method has access to the event which was generated by the click, the Geotab API under the credentials of the current user, and the page state variables.
        </p>
        <h2>Button Add-In Configuration File</h2>
        <p>
            The following example adds a custom button Add-In to the live map page. When clicked, the button will redirect the user to the vehicles page. Use this example as a starting point for creating your own custom button Add-Ins.
        </p>
        <p>
            The exact position of the custom button Add-In within a built-in page is defined by the developer. For instance, in Image 3, a new button labeled <em>Perform Action</em> is added to the toolbar of the live map page.
        </p>
        <InformationalBox>
            <p>
                This example uses external references to the source code. Similar to custom page Add-Ins, the Files property of the configuration file can be used to embed the source code on the Geotab servers.
            </p>
        </InformationalBox>
        <figure>
            <img src={mapImage} alt="Image 3 — Custom button Add-In on the live map page" />
            <figcaption>Image 3 — Custom button Add-In on the live map page</figcaption>
        </figure>
        <h2>Use Cases</h2>
        <p>
            The action your custom button Add-In performs is decided by your specific business requirement. The following are example actions that can be implemented:
        </p>
        <ul>
            <li>One-click navigation between maps and reports</li>
            <li>Call an API to alert for driver proximity</li>
            <li>Create a new zone at the current location</li>
            <li>Automated execution of a sequence of actions</li>
        </ul>
        <h2>Listing 10 — Custom Button Add-In Configuration File</h2>
        <p>
            Almost any page is available to have a custom button Add-In added to it. Use a web browser's address bar to find the correct value for the Page property. Geotab pages will have a trailing hash (“#”) symbol followed by the page name. Determine the page name and then set the “page” value of your custom button Add-In configuration file to that value.
        </p>
        <CodeSample
            language="json"
            code={`{
    "name": "Custom Button Add-In Example",
    "supportEmail": "myname@mycompany.com",
    "version": "1.0",
    "items": [{
        "page": "map",
        "click": "https://www.hosting.com/mycompany/customButton.js",
        "buttonName": {
            "en": "English Button",
            "fr": "French Button"
        }
    }],
    "files": { }
}`} />
    </div>
);

const javaScriptButtonAction: ReactNode = (
    <div className="paragraph">
        <p>
            When a custom button Add-In is clicked by a user, it will execute a predefined method from the JavaScript file referenced. This method provides the button action with access to the generated event, the Geotab API as the signed-in user, and the page state.
        </p>
        <InformationalBox>
            <p>
                To avoid conflicts with multiple Add-Ins enabled on an account, be certain to create unique namespaces for each Add-In.
            </p>
        </InformationalBox>
        <h2>Listing 12 — Custom Button Click Method</h2>
        <CodeSample
            language="javascript"
            code={`geotab.customButtons.customExample1 = (event, api, state) => {
    alert("Custom button Add-In clicked!");
    state.gotoPage("map");
};`} />
        <p>
            The state object is a powerful tool for creating navigational components by changing the current page state. The state object has access to a number of methods as follows:
        </p>
        <h2>Table 6 - Geotab Page State Methods</h2>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>Description</th>
                        <th>Parameters</th>
                        <th>Return Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code className="small-code-sample">
                            getState</code></td>
                        <td>Gets an object that represents the current URL state</td>
                        <td>None</td>
                        <td>Object</td>
                    </tr>
                    <tr>
                        <td><code className="small-code-sample">
                            setState</code></td>
                        <td>Sets the current URL state. The object parameter is a modified state retrieved from <code className="small-code-sample">
                            getState</code></td>
                        <td>Object</td>
                        <td>Void</td>
                    </tr>
                    <tr>
                        <td><code className="small-code-sample">
                            gotoPage</code></td>
                        <td>Redirects the user to another page with optional parameters. Example: <code className="small-code-sample">
                            state.gotoPage("map", {`{someParameter1: true, someParameter2: 5 }`});</code></td>
                        <td>String, [Object]</td>
                        <td>Void</td>
                    </tr>
                    <tr>
                        <td><code className="small-code-sample">
                            hasAccessToPage</code></td>
                        <td>Checks whether the current user has the security clearance to view a page by its <code className="small-code-sample">
                            #</code> (hash) value. Example: <code className="small-code-sample">
                                var result = state.hasAccessToPage("map");</code></td>
                        <td>String</td>
                        <td>Boolean</td>
                    </tr>
                    <tr>
                        <td><code className="small-code-sample">
                            getGroupFilter</code></td>
                        <td>Gets an array with ids of the selected groups in the organization filter. Example: <code className="small-code-sample">
                            var result = state.getGroupFilter();</code></td>
                        <td>None</td>
                        <td>Array</td>
                    </tr>
                    <tr>
                        <td><code className="small-code-sample">
                            getAdvancedGroupFilter</code></td>
                        <td>Gets an object with a <em>relation</em> property and a <em>groupFilterConditions</em> array of the selected groups in the organization filter. Example: <code className="small-code-sample">
                            var result = state.getAdvancedGroupFilter();</code></td>
                        <td>None</td>
                        <td>Object</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <InformationalBox>
            <p>
                The second parameter to the <code className="small-code-sample">gotoPage</code> method is optional and is used for query string parameters.
            </p>
        </InformationalBox>
    </div>
);

const completeIntegrationExample: ReactNode = (
    <div className="paragraph">
        <p>
            Using all the concepts outlined in this document, the following is a complete integration example which creates a custom page Add-In with real-world functionality. In this example, the custom page has JavaScript methods that make requests using the Geotab API to retrieve the current vehicles on your account. The result of the API request is shown on the custom page in a list. Finally, when the user leaves the page, the custom page performs cleanup during the lifecycle methods.
        </p>
        <InformationalBox>
            <p>
                For the purpose of this example, the integrationExample.css and integrationExample.js are empty files.
            </p>
        </InformationalBox>
        <h2>Source Code</h2>
        <h2>Listing 13 — HTML and JavaScript code for integration example</h2>
        <CodeSample
            language="html"
            code={`<!DOCTYPE html>
<html>
    <head>
        <title>Custom Integration Example</title>
        <link rel="stylesheet" href="integrationExample.css" />
        <script>
            geotab.addin.integrationExample = function(api, state) {
                var center = document.getElementById("center"),
                listCreator = function(entities) {
                    var listElement = document.createElement("ul");
                    listElement.appendChild(entities.reduce(function(frag, entity) {
                        var element = document.createElement("li");
                        element.textContent = entity.name;
                        element.setAttribute("data-id", entity.id);
                        frag.appendChild(element);
                        return frag;
                    };
                    document.createDocumentFragment()));
                    return listElement;
                },
                goToVehicles = function(event) {
                    var id = event.target.getAttribute("data-id");
                    if (id) {
                        state.gotoPage("device", {
                            id: id
                        });
                    }
                },
                refreshPage = function() {
                    api.call("Get", {
                        typeName: "Device"
                    }, function (result) {
                        center.addEventListener("click", goToVehicles, false);
                        center.appendChild(listCreator(result));
                    }, function (error) {
                        console.log(error.message);
                    });
                },
                clearOnLeaving = function() {
                    center.removeEventListener("click", goToVehicles, false);
                    center.innerHTML = "";
                };
                return {
                    initialize: function(api, state, callback) {
                        document.getElementById("vehiclesButton").addEventListener("click", function () {
                            state.gotoPage("devices");
                        }, false);
                        callback();
                    },
                    focus: function(api, state) {
                        refreshPage();
                    },
                    blur: function(api, state) {
                        clearOnLeaving();
                    }
                }
            };
        </script>
    </head>
    <body>
        <div id="center">
        
            <button id="vehiclesButton">
            Go to vehicles page</button>
        </div>
    </body>
</html>`} />
        <h3>Listing 14 — Configuration file for integration example</h3>
        <CodeSample
            language="json"
            code={`{
    "name": "Integration Example",
    "supportEmail": "myname@mycompany.com",
    "items": [{
        "version": "1.0",
        "url": "https://app.geotab.com/GeotabApps/SDKIntegrationExample/IntegrationExample.html",
        "path": "ActivityLink",
        "menuName": {
            "en": "English Label",
            "fr": "French Label"
        }
    }],
    "key": "123456-MYKEY",
    "signature": "12345-MYSIGNATURE",
    "isSigned": false
}`} />
    </div>
);

const troubleshootingAndDebugging: ReactNode = (
    <div className="paragraph">
        <p>
            When developing Add-Ins, the use of Google Chrome and its Developer Tools window is recommended. To open the Chrome Developer Tools on Windows, press CTRL + SHIFT + I; on a Mac, press CMD + OPTION + I.
        </p>
        <p>
            The contents of <code className="small-code-sample">console.log("...")</code> statements can be examined using the Developer Tools, the timeline of XML HTTP requests can be viewed, and breakpoints to step through the JavaScript source code can be created.
        </p>

        <p>
            It is also recommended to read Google's extensive learning resources available on using{" "}
            <a href="https://developers.google.com/chrome-developer-tools/"
                target="_blank"
                rel="noreferrer"
                aria-label="Chrome Developer Tools">
                Chrome Developer Tools
            </a>{" "}
            to get started debugging or learn about the advanced features they have available.
        </p>
        <p>
            <strong>Note:</strong> Add-Ins that were locally added to a database in the past (recommended approach is to host on a server externally) might throw the error message <strong>"Add-In threw an error. Please contact your administrator."</strong> To further confirm, the following error will appear in the browser console (found by hitting CTRL+SHIFT+I): <strong>Error: Add-In files: {"<"}add-in file name{">"} couldn't be loaded. Probably they were moved to another location or removed.</strong> This could be linked to a server maintenance/migration event. The workaround would be to re-upload the files for the Add-Ins back to the database, while the resolution would be to externally host the source code as per the requirements listed{" "}
            <a href="#geotab-add-in-requirements"
                rel="noreferrer"
                aria-label="Scroll to requirements">
                here
            </a>
            .
        </p>
    </div>
);


const addInIconValidator: ReactNode = (
    <div className="paragraph">
        <p>
            The Add-In Icon Validator tests uploaded SVG files against{" "}
            <a href="https://www.geotab.com/blog/mygeotab-add-in-icons-specs/"
                target="_blank"
                rel="noreferrer"
                aria-label="MyGeotab Add-In Icons Specifications">
                Geotab's requirements
            </a>{" "}
            and displays them in the reformatted colors and style that will be displayed in MyGeotab.{" "}
            {/* TODO: update link */}
            <a href="https://geotab.github.io/sdk/software/guides/developing-addins/addin-icon-validator.html"
                target="_blank"
                rel="noreferrer"
                aria-label="">
                Launch the validator
            </a>
            .
        </p>
    </div>
);

const pageTitle: PageTitleProps = {
    "title": "Developing Add-Ins",
    "breadCrumbItems": ["MYG", "Add-Ins", "Developing Add-Ins"]
};

const pageSections: TableOfContentsItem[] = [
    {
        "elementId": "geotab-add-in-types",
        "summary": "Geotab Add-Ins Can Be of Two Types",
        "details": addInTypes
    }, {
        "elementId": "geotab-add-in-use-cases",
        "summary": "Use Cases",
        "details": useCases
    }, {
        "elementId": "geotab-add-in-requirements",
        "summary": "Requirements",
        "details": requirements
    }, {
        "elementId": "geotab-add-in-configuration",
        "summary": "Add-In Configuration Files",
        "details": addInConfiguration
    }, {
        "elementId": "geotab-add-in-configuration-example",
        "summary": "Example Add-In Configuration File",
        "details": exampleAddInConfiguration
    }, {
        "elementId": "geotab-add-in-submenu",
        "summary": "Listing 2 — Creating Submenu Items",
        "details": creatingSubmenu
    }, {
        "elementId": "geotab-add-in-third-party-libraries",
        "summary": "Using Third-Party Libraries",
        "details": thirdPartyLibraries
    }, {
        "elementId": "geotab-add-in-page-life-cycle",
        "summary": "Page Lifecycle",
        "details": pageLifecycle
    }, {
        "elementId": "geotab-add-in-custom-button-add-ins",
        "summary": "Custom Button Add-Ins",
        "details": customButtonAddIns
    }, {
        "elementId": "geotab-add-in-js-action-button",
        "summary": "JavaScript Button Action",
        "details": javaScriptButtonAction
    }, {
        "elementId": "geotab-add-in-integration-example",
        "summary": "Complete Integration Example",
        "details": completeIntegrationExample
    }, {
        "elementId": "geotab-add-in-troubleshooting-and-debugging",
        "summary": "Troubleshooting and Debugging",
        "details": troubleshootingAndDebugging
    }, {
        "elementId": "geotab-add-in-icon-validator",
        "summary": "Add-In Icon Validator",
        "details": addInIconValidator
    }
];

export default function DevelopingAddIns() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div className="paragraph">
                <p>
                    Add-Ins are used to extend the functionality provided by MyGeotab and Geotab Drive. An Add-In is JavaScript, HTML and CSS loaded into the MyGeotab or Geotab Drive portal and resides directly inside the user interface. This allows third-parties to create a seamless user experience and provide solutions that would otherwise require the user to visit a different website altogether.{" "}
                    <a href="https://github.com/Geotab/sdk-addin-samples"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Geotab SDK samples">
                        Click here
                    </a>{" "}
                    to find the sample Add-Ins.
                </p>
                <InformationalBox>
                    <p>
                        The add-in generator is a great developer tool that allows integrators to create scaffolded add-in projects. You can learn more about the generator and all of its features by going into the{" "}
                        <a href="https://github.com/Geotab/generator-addin"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Geotab add-in generator repository">
                            generator-addin repository
                        </a>
                        .
                    </p>
                </InformationalBox>
            </div>
            {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId} />)}
        </Page>
    );
};
