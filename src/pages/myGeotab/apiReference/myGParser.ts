
function extractSubstrings(input: string): string {
    const webMethodsMatch = input.match(/WebMethods\.([a-zA-Z]+)/);
    const dataStoreMatch = input.match(/DataStore\.([a-zA-Z]+)/);
  
    if (webMethodsMatch) {
        return webMethodsMatch[1];
    } else if (dataStoreMatch) {
        return dataStoreMatch[1];
    } else {
        return '';
    }
}

export default function myGParser(xml: any) {
    let json: any = {};
    // const methodStrings: string[] = ['M:CheckmateServer.Web.WebMethods', 'M:Geotab.Checkmate.Database.DataStore'];
    // have an input that tells us what method string we are looking for
    if (xml.hasChildNodes()) {
        if (xml.childNodes[0].nodeName === 'doc') {
            let item = xml.childNodes[0].childNodes;
            for (let i = 0; i < item.length; i++) {
                if (item[i].nodeName === "member") {
                    if (item[i].attributes.name.nodeValue.includes('M:CheckmateServer.Web.WebMethods') || item[i].attributes.name.nodeValue.includes('M:Geotab.Checkmate.Database.DataStore')) {
                        console.log(item[i].childNodes);
                        let methodName = extractSubstrings(item[i].attributes.name.nodeValue);
                        if (!json[methodName]) {
                            json[methodName] = {
                                "description": "",
                                "param": [],
                                "returns": "",
                                "example": ""
                            }
                        }
                        for (let j = 0; j < item[i].childNodes.length; j++) {
                            if (item[i].childNodes[j].nodeName === "summary") {
                                // within the summary there will be para elements for paragraphs, list elements for lists
                                // will have to check for childnodes as not all summary elements have childnodes
                                // GetVersion call is an example of this.
                                // not all calls have para tags
                                if (item[i].childNodes[j].hasChildNodes()) {
                                    // if there are child nodes here then we loop through them.
                                    let summaryChildren = item[i].childNodes[j].childNodes;
                                    let summaryText: string = '';
                                    for (let k = 0; k < summaryChildren.length; k++) {
                                        if (summaryChildren[k].nodeName === "para") {
                                            // need to insert newlines between each new para element
                                            for (let l = 0; l < summaryChildren[k].childNodes.length; l++) {
                                                if (summaryChildren[k].childNodes[l].nodeName === '#text') {
                                                    summaryText += summaryChildren[k].childNodes[l].nodeValue.replace(/\s+/g, ' ');
                                                }
                                                if (summaryChildren[k].childNodes[l].nodeName === 'see') {
                                                    summaryText += ' ' + summaryChildren[k].childNodes[l].outerHTML;
                                                }
                                                if (summaryChildren[k].childNodes[l].nodeName === 'list') {
                                                    // in lists we have item tags and each item tag has a description tag within it
                                                    let listItems = summaryChildren[k].childNodes[l];
                                                    if (listItems.hasChildNodes) {
                                                        for (let m = 0; m < listItems.childNodes.length; m++) {
                                                            summaryText += '\n' + '- ' + listItems.childNodes[m].childNodes[0].innerHTML;
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            if (k !== summaryChildren.length - 1) {
                                                summaryText += '\n';
                                            }
                                        } else {
                                            if (summaryChildren[k].nodeName === '#text') {
                                                summaryText += summaryChildren[k].nodeValue.replace(/\s+/g, ' ');
                                            }
                                            if (summaryChildren[k].nodeName === 'see') {
                                                summaryText += ' ' + summaryChildren[k].outerHTML;
                                            }
                                        }
                                        // here we will expect para nodes
                                        // we can also expect the summary node to have text in it that includes <see> nodes alongside the para nodes.
                                        // will need statements for para, see, and somehow also deal with plain text within the nodes
                                        // if (summaryChildren[k].hasChildNodes()) {
                                        //     console.log("We might find para and other nodes in the summary nodes...");
                                        // }
                                        // for (let l = 0; l < summaryChildren[k].childNodes) {

                                        // }
                                    }
                                    console.log(methodName);
                                    json[methodName].description = summaryText;
                                } 
                            }
                            if (item[i].childNodes[j].nodeName === "param" && !item[i].childNodes[j].attributes.hasOwnProperty('jsHide')) {
                                let paramDict: any = {};
                                let descriptionText: string = '';
                                for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                    if (item[i].childNodes[j].childNodes[k].nodeName === '#text') {
                                        descriptionText += item[i].childNodes[j].childNodes[k].nodeValue.replace(/\s+/g,  ' ');
                                    }
                                    if (item[i].childNodes[j].childNodes[k].nodeName === 'see') {
                                        descriptionText += ' ' + item[i].childNodes[j].childNodes[k].outerHTML;
                                    }
                                }
                                paramDict['name'] = item[i].childNodes[j].attributes.name.nodeValue;
                                paramDict['description'] = descriptionText; //trimstart and remove the extra space for the see stuff todooooooooo
                                if (item[i].childNodes[j].attributes.hasOwnProperty('required')) {
                                    paramDict['required'] = true;
                                }
                                json[methodName].param.push(paramDict);
                                // have a dictionary with key as name, required property, jsHide property and a description property
                                // the dicitionary will be pushed into an array in the json obj so we have an array of dictionaries
                            }
                        } 
                    }
                    
                }
            }
        }
    }
    console.log(json);

}

