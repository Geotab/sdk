import { CodeSamples } from "../../../components/CodeSamplesContainer";

export const methodsCodeSamples: Record<string, CodeSamples> = {
  Add: {
    javascript: "",
    csharp: "",
    python: "",
    java: "",
  },
  Authenticate: {
    javascript: "",
    csharp: "",
    python: "",
    java: "",
  },
  SetUserPassword: {
    javascript: "",
    csharp: "",
    python: "",
    java: "",
  },
  GenerateCaptcha: {
    javascript: "",
    csharp: "",
    python: "",
    java: "",
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
  Get: {
    javascript: "",
    csharp:
      'await api.CallAsync<List<Device>>("Get", typeof(Device), new { resultsLimit = 10 });',
    python: "api.get('Device', resultsLimit=10)",
    java: "",
  },
  GetAddresses: {
    javascript: "",
    csharp: "",
    python: "",
    java: "",
  },

  GetTimeZones: {
    javascript: "",
    csharp: "",
    python: "api.call('GetTimeZones')",
    java: "",
  },
  GetVersion: {
    javascript: "",
    csharp: "",
    python: "api.call('GetVersion')",
    java: "",
  },
  GetVersionInformation: {
    javascript: "",
    csharp: "",
    python: "api.call('GetVersionInformation')",
    java: "",
  },
  OptimizeWaypoints: {
    javascript: "",
    csharp: "",
    python: `api.call("OptimizeWaypoints", waypoints=[
            {
                "coordinate": {"x": -79.78167419433593, "y": 43.51832580566406},
                "sequence": 0,
                "description": "A"
            },
            {
                "coordinate": {"x": -79.8455322265625, "y": 43.51230010986328},
                "sequence": 1,
                "description": "B"
            },
            {
                "coordinate": {"x": -79.968017578125, "y": 43.42531967163086},
                "sequence": 2,
                "description": "C"
            },
            {
                "coordinate": {"x": -79.96439819335937, "y": 43.47275924682617},
                "sequence": 3,
                "description": "D"
            },
            {
                "coordinate": {"x": -79.78167419433593, "y": 43.51832580566406},
                "sequence": 4,
                "description": "E"
            }
          ])`,
    java: "",
  },
  Remove: {
    javascript: "",
    csharp: "",
    python: `zone_name = input("Enter the name of the zone that you want to remove: ")

        zones_response = api.get("Zone", name= "%" + zone_name + "%")
        
        if zones_response:
            remove_response = api.remove("Zone",entity = {"id": zones_response[0]["id"]})
        else:
            print("There is no zone with such name.")`,
    java: "",
  },
  Set: {
    javascript: "",
    csharp: "",
    python: `current_zone_name = input("Enter current zone name: ")
        new_zone_name = input("Enter new zone name: ")
      
        zones_response = api.get("Zone", name="%" + current_zone_name + "%")
        if zones_response:
          zone = zones_response[0]
          zone["name"] = new_zone_name
          api.set("Zone", entity=zone)
        else:
          print("There is no zone with such name.")`,
    java: "",
  },
  UploadMediaFile: {
    javascript: `
        import axios from "axios";

        const solutionId = prompt("Enter the unique identifier of the solution (solutionId/AddInId): ")
        const mediaFileName = prompt("Enter the name of the file (must have extension): ")
    
        let mediaFileId = await api.call(
            "Add", {
            typeName: "MediaFile",
            entity: {
                solutionId: solutionId,
                name: mediaFileName
            }
        })
    
        const requestParams = {
            method: "UploadMediaFile",
            params: {
                mediaFile: {
                    id: mediaFileId
                },
                credentials: {
                    database: session.database,
                    sessionId: session.sessionId,
                    userName: session.userName
                }
            }
        };
    
        let formData = new FormData();
        formData.append("JSON-RPC", encodeURIComponent(JSON.stringify(requestParams)));
    
        // Dummy "file" creation
        // Create a simple 10x10 black square image
        let canvas = document.createElement("canvas");
        canvas.width = 10;
        canvas.height = 10;
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        canvas.toBlob(blob => {
            // Append our image file to the form data
            formData.append("file", blob, mediaFileName);
            axios.post(api_path, formData)
                .then(response => {
                    console.log("Success:", response.data);
                })
                .catch(error => {
                    console.error("Error:", error.response ? error.response.data : error.message);
                });
        },);        
        `,
    csharp: "",
    python: `
        from PIL import Image
        import requests
        from io import BytesIO
        import json

        solutionId = input("Enter the unique identifier of the solution (solutionId/AddInId): ")
        mediaFileName =  input("Enter the name of the file (must have extension): ")
      
        mediaFileId = api.add("MediaFile", entity={"solutionId": solutionId, "name": mediaFileName})
      
        if mediaFileId:
            # Dummy 'file' creation
            # Create a simple 10x10 black square image, saved into a BytesIO object to simulate a file
            with BytesIO() as buffer:
                with Image.new("RGB", (10, 10), "black") as img:
                    img.save(buffer, format="PNG")
                    buffer.seek(0)
                    file = buffer.read()
        
            files = {
                'file': (mediaFileName, file, 'image/png')
            }

            api_path = "https://my.geotab.com/apiv1"
            
            request_params = {
                "method": "UploadMediaFile",
                "params": {
                    "mediaFile": {
                        "id": mediaFileId,
                    },
                    # Replace credentials (instead of password, sessionID can be used as well)
                    "credentials": {
                        "database": database,
                        "password": password, 
                        "userName": userName
                    }
                }
              }
            
            data = {
                "JSON-RPC": json.dumps(request_params)
            }
        
            response = requests.post(api_path, data=data, files=files)
        
            # Check the response
            print(response.status_code)
            if response.ok:
                print("Success") 
            else:
                print("Error:", response.text)
        `,
    java: "",
  },
  DownloadMediaFile: {
    javascript: `
    import axios from "axios";

    const mediaFileId = prompt("Enter the id of the media file: ")

    const requestParams = {
        method: "DownloadMediaFile",
        params: {
            mediaFile: {
                id: mediaFileId
            },
            credentials: {
                database: session.database,
                sessionId: session.sessionId,
                userName: session.userName
            }
        }
    };

    axios.post(api_path, requestParams, { responseType: "blob" })
        .then(response => {
            console.log("Success:", response.data);
        })
        .catch(error => {
            console.error("Error:", error.response ? error.response.data : error.message);
        });

    `,
    csharp: "",
    python: `
        mediaFileId = input("Enter the id of the media file: ")

        request_params = {
          "method": "DownloadMediaFile",
              "params": {
                  "mediaFile": {
                      "id": mediaFileId,
                  },
                  # Replace credentials (instead of password, sessionID can be used as well)
                  "credentials": {
                      "database": database,
                      "password": password, 
                      "userName": userName
                  }
               }
        }
        
        api_path = "https://my.geotab.com/apiv1"
    
        response = requests.post(api_path, json=request_params, stream=True)
    
        if response.status_code == 200:
          print("Success! Response received.")
          filename = f"downloaded_media_{mediaFileId}.png"  # Adjust extension as needed
    
          # Stream the content to a file
          with open(filename, 'wb') as file:
              for chunk in response.iter_content(chunk_size=1024 * 1024):  # Chunks of 1 MB
                  # Filter out keep-alive new chunks
                  if chunk:
                      file.write(chunk)
    
          print(f"File downloaded and saved as {filename}.")
        `,
    java: "",
  },
};
