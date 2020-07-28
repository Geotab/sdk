---
layout: page
permalink: /software/guides/developing-addins/
title: Developing Add-ins
---

Add-Ins are used to extend the functionality provided by MyGeotab and Geotab Drive. An Add-In is JavaScript, HTML and CSS loaded into the MyGeotab or Geotab Drive portal and resides directly inside the user interface. This allows third-parties to create a seamless user experience and provide solutions that would otherwise require the user to visit a different website altogether. [Click here](https://github.com/Geotab/sdk-addin-samples) to find the sample Add-Ins.

## Geotab Add-Ins can be of two types:

#### Pages

A custom page Add-In can be thought of as a complete web application inside your Geotab account. A custom page Add-In has access to the MyGeotab API and the current page state. With custom pages you can develop business-aware Add-Ins by combining MyGeotab data with your own APIs.

#### Buttons

Custom button Add-Ins can be included to perform different functions.  Additional navigational buttons can be dynamically inserted inside certain areas of the MyGeotab user interface. This allows custom button Add-Ins to provide a simple way for users to reach your custom page Add-In (see Image 1).  Buttons can also be placed on pages to execute functions for automation of routine tasks, such as report generation (see Image 3).

## Use cases

Consider a manager who regularly performs similar tasks each day. Their workflow may consist of comparing fleet metrics with local data from your software. By creating a custom page Add-In, you can combine both of these tasks into one easy-to-use page where all the information is readily available.

Another example is to quickly navigate between different areas of Geotab. A simple-to-use one-click button Add-In can be made for most pages. The button will guide the user between areas, and can optionally use the page state to automatically fill in URL parameters to run reports with a single click.

### Requirements

The Add-Ins created must have their source code stored externally using your own hosting provider or your own servers.

> Referenced files must be publicly accessible via HTTPS and all hosted resources must be on a server that supports TLS 1.2 or higher.

## Add-In configuration files

Each Add-In created will have one configuration file. The configuration file is a JSON file ([http://www.json.org](http://www.json.org)) of keys and values which describes the Add-In, who is responsible for it, what source code it contains, and a digital security signature.

### Table 1 — Add-In configuration file keys/values

| **Property** | **Description** | **Type** |
| --- | --- | --- |
| name | The name of this Add-In | String |
| supportEmail | Email address for support related to this Add-In | String |
| items | Array of custom pages and/or buttons (External references) | Array |
| files | Custom pages and/or buttons (Embedded code) | Object |
| key | Unique MyGeotab Add-In key assigned by Geotab | String |
| signature | Digital signature of the Add-In | String |
| version | Which Geotab API version to use | String |

> If you do not know your MyGeotab Add-In key, please contact your authorized Geotab reseller for support.

The Add-In configuration file can specify the contents using either the Items, Files property, or a combination of both. It is recommended to use Items and externally referencing the source code to make development and debugging easier. When ready, the code can be embedded directly on Geotab's servers.

## Example Add-In configuration file

The Add-In configuration file below demonstrates how to define a simple Add-In which references an HTML page specified by its URL. Any CSS or JavaScript which is required by the Add-In would be specified in the referenced HTML.

### Listing 1 — A simple Add-In configuration JSON file
```json
{
        "name": "My First Geotab Add-In",
        "supportEmail": "myname@mycompany.com",
        "version": "1.0",
        "items": [{
                "url":"https://my3.geotab.com/g560/customerPage1.html",
                "path": "ActivityLink",
                "icon":"https://www.geotab.com/geoimages/home/icon-solutions.png",
                "menuName": {
                        "en": "English Menu Text",
                        "fr": "French Menu Text"
                }
        }],
        "files": { }
}
```

Test the example above by navigating to Administration → System → System Settings → Add-Ins. Select New Add-In and paste the example in the configuration tab. Be sure to select save then refresh the page.

Each Add-In can create a navigation entry in the left hand side menu. This allows quick and easy access to all of the Add-Ins. The placement of the navigation entry for the Add-In is specified in the configuration file, relative to another built-in navigation entry. In the section below, a navigation entry is placed directly after the Activity entry. A user with English as their interface language will see "English Menu Text" as the label. Note that we show only two properties for brevity.

```json
{
    "path": "ActivityLink/",
    "menuName": {
        "en": "English Menu Text",
        "fr": "French Menu Text"
    }
}
```

![]({{site.baseurl}}/software/guides/developing-addins_0.png)
Image 1 — Modified left-hand-side menu

The Add-In navigation entry can be placed after any of the following built-in values:

- `GettingStartedLink`
- `ActivityLink`
- `EngineMaintenanceLink`
- `ZoneAndMessagesLink`
- `RuleAndGroupsLink`
- `AdministrationLink`

To place the navigation entry as a sub-menu entry in one of the main entries place a slash (`/`) character after the name. The custom entry will be the first item inside the sub-menu.

For example, by changing `"ZoneAndMessagesLink/"` as the value for the `"path"` key:

`"path": "ZoneAndMessagesLink/",`

 This will insert the custom navigation entry as follows:

 ![]({{site.baseurl}}/software/guides/developing-addins_1.png)

Navigation entries cannot be set at the third level (sub-sub-menu) and below. If done so by the steps outlined above, the entry will simply appear as a non-formatted bullet point in the menu.

> A user may not have access to some entries of the left hand side menu. The custom navigation entry will be shown after the nearest entry which is accessible to them.

## Listing 2 — Add-In configuration section for submenu

To create a sub-menu, add to the items array a special JSON object that looks nearly identical to the page item — with the exception of the URL property.

To place buttons inside a new sub-menu, use subMenuPath property as illustrated in Listing 3. This sub-menu will be shown only if there are at least two items inside it. The sub-menu items appear in reverse order of the JSON entered below.

```json
{
 "name": "My First Geotab Add-In",
 "supportEmail": "myname@mycompany.com",
 "version": "1.0",
 "items": [{
        "url": "https://cdn.jsdelivr.net/gh/Geotab/sdk-addin-samples@master/addin-heatmap/dist/heatmap.html",
        "path": "sdkAddinsLink/",
        "menuName": {
            "en": "Heat Map"
        },
        "icon": "https://cdn.jsdelivr.net/gh/Geotab/sdk-addin-samples@master/addin-heatmap/dist/images/icon.svg"
    }, {
        "page": "device",
        "click": "https://cdn.jsdelivr.net/gh/Geotab/sdk-addin-samples@master/addin-engine-data-button/dist/scripts/engineDataButton.js",
        "buttonName": {
            "en": "Engine Data Profile",
            "fr": "Profil des données-moteur",
            "es": "Perfil de datos de motor",
            "ja": "エンジンデータプロフィール"
        },
        "icon": "https://cdn.jsdelivr.net/gh/Geotab/sdk-addin-samples@master/addin-engine-data-button/dist/images/icon.svg"
    }],
 "isSigned": false
}
```

### Referencing source items

Each Add-In can define zero or more _items_ as part of its configuration file. An item is a collection of keys and values which represent a page or a button.

### Table 2 — Parent menu item

A parent menu item defines a new menu item and where it should reside within the menu hierarchy. It does not have a URL that activates a page and serves only as the container for sub-menu items.

| **Name** | **Description** | **Type** |
| --- | --- | --- |
| menuId | A unique identifier for this menu. This string value of your choice but should be unique. See built-in ones above `"GettingStartedLink"`, `"ActivityLink"`, etc. | String |
| path | Specifies where in the menu hierarchy this menu item should reside. It will follow the menuId specified or become a child item if a trailing slash is provided, such as `"ActivityLink/"`. | String |
| menuName | An object containing key-value pairs for the text that appears on the menu item. The key is the language and the value is the text, for example: `{"EN", "New menu item"}`. | Object |
| icon | A URL to the image (svg, png, jpg, etc.) that is placed in front of the menu item. Note that the current image size is 32x32 but it is recommended that SVG icons are used to allow for scaling. | String |

### Table 3 — Menu item

| **Name** | **Description** | **Type** |
| --- | --- | --- |
| URL | A URL to the HTML page to load when clicking on this menu item. | String |
| path | Specifies where in the menu hierarchy this menu item should reside. It will follow the menuId specified or become a child item if a trailing slash is provided, such as `"ActivityLink/"`. | String |
| menuName | An object containing key value pairs for the text that appears on the menu item. The key is the language and the value is the text, for example: `{"EN", "New menu item"}`. | Object |
| icon | A URL to the image (svg, png, jpg, etc.) that is placed in front of the menu item. Note that the current image size is 32x32 but it is recommended that SVG icons are used to allow for scaling. | String |

### Table 4 — Button item

| **Name** | **Description** | **Type** |
| --- | --- | --- |
| page | Which built-in page to place the button on | String |
| click | A URL to a JavaScript file which is executed when the button is clicked | String |
| buttonName | An object containing key value pairs for the text that appears on the button. The key is the language and the value is the text, for example `{"EN", "New menu item"}` | Object |
| icon | Reference to the image for placing it in the button label | String |

At least one language is required in each item definition. The following language options are currently supported in MyGeotab: English (`"en"`), French (`"fr"`), German (`"de"`), Spanish (`"es"`), Japanese (`"ja"`), Polish (`"pl"`) Brazilian Portuguese (`"bp"`), Dutch (`"nl"`) and Italian (`"it"`).

> Reference to the image can be an external URL such as: `https://mysite.com/images/icon.png;` or a link to the image from the images folder of your Add-In_._

When using the items property to include your source code exclusively, you can set the files property an empty object using `{ }` as seen in Listing 1.

Every Add-In has a JavaScript object which is set in your main.js file. For example, the Add-In class name "myaddin" is provided by the following JavaScript entry point:

```javascript
geotab.addin.myaddin = () => {
 ...
}
```

The name you provide should be unique for each Add-In and should take care to avoid including invalid characters in the name. Additionally, when referencing Add-Ins hosted externally, the absolute path to the Add-In should not include the following characters anywhere in their URL:

- "-" The dash symbol
- "@" The "at" symbol
- "#" The hash symbol

For example, the following is an invalid absolute URL due to its dashes and will not be loaded correctly by MyGeotab:

`https://my-web-server.com/pathToAddIn/index.html`

### Embedding source code

When developing a custom page or button Add-In, you have the option to embed the source code for your project in the JSON configuration file. When using this method, there is no requirement to host your own HTML, CSS or JavaScript files as they will be converted into strings and written inside the configuration file itself.

### Listing 3 — Add-In configuration file using embedded source code

```json
{
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
}
```

> Please be aware that some characters may need to use HTML escape characters ( [HTML ISO-8859-1 Reference](http://www.w3schools.com/charsets/ref_html_8859.asp)) and [Character Reference](http://dev.w3.org/html5/html-author/charref) for the overall JSON object to be validated.

By reproducing the previous example, there would be two folders, one named "js" and the other "css". Inside the folders are two JavaScript files and one CSS stylesheet; respectively.

The user experience of your custom Add-In can be enhanced by including images in the configuration file. This can be performed in two ways; see Listings 4, 5, and 6 below.

### Listing 4 — Absolute path to image in HTML

Referencing an external image using an absolute URL in the HTML or CSS.

```html
<img src="https://mycompany.com/images/customImage.png" alt="CustomImage" />
```

### Listing 5 — Absolute path to image in CSS

```css
#customImage {
 background: url('https://mycompany.com/images/customImage.png') no-repeat;
}
```

### Listing 6 — Add-In configuration file with Base64 encoded image

The other method is to embed the images along with the rest of the source code in the markup. First the images will need to be encoded using [Base64 encoding](http://en.wikipedia.org/wiki/Base64), then the references to the image files replaced with the encoded version directly in the HTML or CSS.

```javascript
 "files": {
  "customPage.html": "<html><head>...</head><body>...</body></html>",
  "css": {
   "customStyles.css": "#customDiv{background:url('images/img.png);}"
  }
  "images": {
   "img.png": ["PD94bWdG3sN1M..."]
  }
  ...
 }
 ```

## Using third-party libraries

Add-Ins can include references to external libraries that have been custom developed or to existing libraries such as jQuery. This is performed in the traditional way by including a `<script>` tag to the URL of the file.

### Listing 7 — Referencing jQuery from an Add-In

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
  </head>
```

Keep in mind that the end-user using the Add-In will be viewing your Add-In from a Geotab server. The files referenced must be publicly available on the Internet. Firewalls cannot be configured with a specific IP address for the Geotab server as the address may change in the future.

References to external source files can either be absolute URLs such as the example in Listing 7 or can be relative references to local files as demonstrated in Listing 3.

### Listing 8 — Avoiding CSS naming conflicts

When referencing the CSS files, keep in mind that naming conflicts are possible. Geotab's outer framework defines a number of CSS styles for common HTML tags which the custom Add-In may inherit. When designing HTML tags, it is recommended to prefix the HTML tags with a common name when they are stylized with the CSS.

```html
<div id="myaddin-menu">
  <a href="#" id="myaddin-refreshButton">Refresh</a>
</div>
```
```css
#myaddin-menu {
  position: absolute;
  background-color: #99cc00;
}
#myaddin-refreshButton {
  text-decoration: none;
}
```

## Page lifecycle

When designing a custom page Add-In, it is important to understand the JavaScript events that take place on Geotab's servers. The user-defined JavaScript code must supply an entry point object which will be created with a predefined parameter signature. From these parameters a signed-in Geotab API object will be received, along with the page state and a callback synchronization function.

Every page on Geotab's servers, including custom page Add-Ins, have the following three methods called during their lifecycle:

Table 5 — Add-In lifecycle methods

| **Method** | **Description** | **Signature** |
| --- | --- | --- |
| initialize | Called only once when your custom page is first accessed. Use this method to initialize variables required by your Add-In. | `function(api, state, callback) { ... }` |
| focus | This method is called after the user interface has loaded or the state of the organization filter is changed. Use this method for initial interactions with the user or elements on the page. | `function(api, state) { ... }` |
| blur | This method is called when the user is navigating away from your page. Use this method to save any required state. | `function(api, state) { ... }` |

### Visual diagram

Understanding the workflow and methods called will help you design a responsive custom page Add-In. Keep in mind that your initialize method will only be called once, unless the user explicitly refreshes their web browser. When the user interface is ready, the _focus_ method will be called. Finally, when the user is navigating away from your custom page Add-In, the _blur_ method will be called, completing the Add-In lifecycle.

> It's impportant to call the `callback` passed into `intialize` _after_ all work is complete. Keep in mind the asynchrosous nature of JavaScript.

![]({{site.baseurl}}/software/guides/developing-addins_2.png)
Image 2 — Add-In lifecycle workflow diagram

### Lifecycle implementation

The following code can be used as a starting point for a custom page Add-In. All of the lifecycle methods are defined and the optional focus and blur methods will be called due to the callback method being called in the initialize method.

Use the commented area to define and then assign variables in the scope of the Add-In. Each of the Add-Ins will need to define its own unique namespace with the prefix geotab.addin (note that the namespace is not hyphenated). In the example below the full namespace is geotab.addin.myCustomPage1.

### Listing 9 — HTML and JavaScript entry point example

```html
<!DOCTYPE html>
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
</html>
```

## Custom button Add-Ins

Custom button Add-Ins allow you to extend the capabilities of a built-in Geotab page by appending a new button to the top menu of the page. When a user clicks the custom button Add-In, the JavaScript method that has been defined will be called. This JavaScript method has access to the event which was generated by the click, the Geotab API under the credentials of the current user and the page state variables.

### Button Add-In configuration file

The following example adds a custom button Add-In to the live map page. When clicked, the button will redirect the user to the vehicles page. Use this example as a starting point for creating your own custom button Add-Ins.

The exact position of the custom button Add-In within a built-in page is defined by the developer. For instance, in Image 3, a new button labelled _Perform Action_ is added to the toolbar of the live map page.

> This example uses external references to the source code. Similar to custom page Add-Ins, the Files property of the configuration file can be used to embed the source code on the Geotab servers.

 ![]({{site.baseurl}}/software/guides/developing-addins_3.png)
 Image 3 — Custom button Add-In on live map page

### Use cases

The action your custom button Add-In performs is decided by your specific business requirement.The following are example actions that can be implemented:

- One-click navigation between maps and reports
- Call an API to alert for driver proximity
- Create a new zone at the current location
- Automated execution of a sequence of actions

### Listing 10 — Custom button Add-In configuration file

Almost any page is available to have a custom button Add-In added to it. Use a web browser's address bar to find the correct value for the Page property. Geotab pages will have a trailing hash ("#") symbol followed by the page name. Determine the page name and then set the "page" value of your custom button Add-In configuration file to that value.

```json
{
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
}
```

## JavaScript Button Action

When a custom button Add-In is clicked by a user, it will execute a predefined method from the JavaScript file referenced. This method provides the button action with access to the generated event, the Geotab API as the signed-in user, and the page state.

> To avoid conflicts with multiple Add-Ins enabled on an account, be certain to create unique namespaces for each Add-In.

### Listing 12 — Custom button click method

```javascript
geotab.customButtons.customExample1 = (event, api, state) => {
        alert("Custom button Add-In clicked!");
        state.gotoPage("map");
};
```

The state object is a powerful tool for creating navigational components by changing the current page state. The state object has access to a number of methods as follows:

### Table 6 - Geotab page state methods

| **Method** | **Description** | **Parameters** | **Return Type** |
| --- | --- | --- | --- |
| `getState` | Gets an object that represents the current URL state | None | Object |
| `setState` | Sets the current URL state. The object parameter is a modified state retrieved from _getState_. | Object | Void |
| `gotoPage` | Redirects the user to another page with optional parameters. `Example:state.gotoPage("map", { someParameter1: true, someParameter2: 5 });` | String, [Object] | Void |
| `hasAccessToPage` | Checks whether the current user has the security clearance to view a page by its `#` (hash) value. Example: `var result =    state.hasAccessToPage("map");` | String | Boolean |
| `getGroupFilter` | Gets an array with ids of the selected groups in the organization filter. Example: `var result = state.getGroupFilter();` | None | Array |

> The second parameter to the gotoPage method is optional and is used for query string parameters.

## Complete integration example

Using all the concepts outlined in this document, the following is a complete integration example which creates a custom page Add-In with real-world functionality. In this example, the custom page has JavaScript methods that make requests using the Geotab API to retrieve the current vehicles on your account. The result of the API request is shown on the custom page in a list. Finally, when the user leaves the page, the custom page performs cleanup during the lifecycle methods.

> For the purpose of this example, the integrationExample.css and integrationExample.js are empty files.

### Source code

### Listing 13 — HTML and JavaScript code for integration example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Custom Integration Example</title>
    <link rel="stylesheet" href="integrationExample.css" />
    <script>
        geotab.addin.integrationExample = function(api, state) {
            var center = document.getElementById("center"),
                listCreator = function(entities) {
                    var listElement = document.createElement("UL");
                    listElement.appendChild(entities.reduce(function(frag, entity) {
                        var element = document.createElement("LI");
                        element.textContent = entity.name;
                        element.setAttribute("data-id", entity.id);
                        frag.appendChild(element);
                        return frag;
                    }, document.createDocumentFragment()));
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
                    }, function(result) {
                        center.addEventListener("click", goToVehicles, false);
                        center.appendChild(listCreator(result));
                    }, function(error) {
                        console.log(error.message);
                    });
                },
                clearOnLeaving = function() {
                    center.removeEventListener("click", goToVehicles, false);
                    center.innerHTML = "";
                };

            return {
                initialize: (api, state, callback) {
                    document.getElementById("vehiclesButton")
                        .addEventListener("click", function() {
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
        <button id="vehiclesButton">Go to vehicles page</button>
    </div>
</body>
</html>
```

### Listing 14 — Configuration file for integration example
```json
{
  "name": "Integration Example",
  "supportEmail": "myname@mycompany.com",
  "items": [
    {
      "version": "1.0",
      "url": "https://app.geotab.com/GeotabApps/SDKIntegrationExample/IntegrationExample.html",
      "path": "ActivityLink",
      "menuName": {
        "en": "English Label",
        "fr": "French Label"
      }
    }
  ],
  "key": "123456-MYKEY",
  "signature": "12345-MYSIGNATURE",
  "isSigned": false
}
```

## Troubleshooting and debugging

When developing Add-Ins, the use of Google Chrome and its Developer Tools window is recommended. To open the Chrome Developer Tools on Windows, press CTRL + SHIFT + I; on a Mac, press CMD + OPTION + I.

The contents of `console.log("...")` statements can be examined using the Developer Tools, the timeline of XML HTTP requests can be viewed, and breakpoints to step through the JavaScript source code can be created.

It is also recommended to read Google's extensive learning resources available on using [Chrome Developer Tools](https://developers.google.com/chrome-developer-tools/) to get started debugging or learn about the advanced features they have available.
