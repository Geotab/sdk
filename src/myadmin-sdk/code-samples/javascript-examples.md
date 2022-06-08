---
layout: page
permalink: /myadmin-sdk/code-samples/javascript-examples/
title: JavaScript Examples
---
The example below demonstrates a simple JavaScript application that authenticates with the MyAdmin API, then calls `GetDevicePlans` and `LookupDevice`.
```html
<html>
  <body>
    <h1>Device Plans</h1>
    <ul id="devicePlanList">
    </ul>
    <h1>Device Details</h1>
    <div>
      <div id="firmwareElement"></div>
      <div id="commentsElement"></div>
      <div id="lastCommElement"></div>
      <div id="possibleIssuesElement"></div>
    </div>
    <script type="text/javascript" src="myAdminApi.js"></script>


    <script type="text/javascript">
      var apiKey,
        sessionId,
        logonParams = {
          username: 'user@geotab.com',
          password: '<password>'
      };


      myAdminApi().call('Authenticate', logonParams, function(user) {
        apiKey = user.userId;
        sessionId = user.sessionId;
        var deviceIdx,
            listHtml = '',
            devicePlanList = document.getElementById('devicePlanList'),
            devicePlanParams = {
              apiKey: apiKey,
              sessionId: sessionId
            },


            lookupDeviceParams = {
              apiKey: apiKey,
              sessionId: sessionId,
              serialNo: 'G6XXX0XXXD08'
            };


        myAdminApi().call('GetDevicePlans', devicePlanParams, function(devicePlans) {
          for (deviceIdx in devicePlans) {
            listHtml += '<li>' + devicePlans[deviceIdx].name + '</li>';
          }
          devicePlanList.innerHTML = listHtml;
          myAdminApi().call('LookupDevice', lookupDeviceParams, function(device) {


            document.getElementById('firmwareElement').innerText = "Firmware: " + device.firmwareVersion;
            document.getElementById('commentsElement').innerText = "Comments: " + device.comments;
            document.getElementById('lastCommElement').innerText = "Last Communication: " + device.lastServerCommunication;
            document.getElementById('possibleIssuesElement').innerText = "Possible Issues: " + device.possibleIssues;
          });
        });
      }, function(errorMessage, error){
        var errorIdx, alertMsg = 'Error Message: ' + errorMessage;
        if (error && error.errors) {
          alertMsg += '\n\nThe following errors occurred:\n';
          for (errorIdx in error.errors) {
            alertMsg += error.errors[errorIdx].name + '\n';
          }
        }
        alert(alertMsg);
      });


    </script>
  </body>
</html>
```
The `call` method uses the following parameters:
* Method name;
* Parameters;
* Success callback; and
* Error callback (optional).

<strong>Note</strong>: The Success callback receives the object returned by the API as a parameter. The [Reference](../../api/reference) page provides details about the objects returned by each method. In the example above, the error callback is called if the login fails. The error callback receives two parameters: an error message and an “errors” object that contains an array of individual errors that occurred. In the example above, the devicePlans object — returned by GetDevicePlans — is an array of ApiDevicePlans. The device object, returned by LookupDevice, is an ApiDeviceInstallResult. For more information, see [Reference](../../api/reference).
<img src="../myadminApiExample.png" alt="MyAdmin Api Example">