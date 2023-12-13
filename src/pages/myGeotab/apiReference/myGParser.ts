import { OuterExpressionKinds } from "typescript";

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

export default function myGParser(xml: any, itemType: string, itemStrings: string[]) {
    let json: any = {};
    if (xml.hasChildNodes()) {
        if (xml.childNodes[0].nodeName === 'doc') {
            let item = xml.childNodes[0].childNodes;
            for (let i = 0; i < item.length; i++) {
                if (item[i].nodeName === "member") {
                    if (itemType === 'method' && itemStrings.some(method => item[i].attributes.name.nodeValue.includes(method))) {
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
                                                    summaryText += summaryChildren[k].childNodes[l].outerHTML;
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
                                                summaryText += summaryChildren[k].outerHTML;
                                            }
                                        }
                                    }
                                    json[methodName].description = summaryText.trimStart();
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
                                        descriptionText += item[i].childNodes[j].childNodes[k].outerHTML;
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
                            if (item[i].childNodes[j].nodeName === 'returns') {
                                let returnText: string = '';
                                for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                    if (item[i].childNodes[j].childNodes[k].nodeName === '#text') {
                                        returnText += item[i].childNodes[j].childNodes[k].nodeValue.replace(/\s+/g,  ' ');
                                    }
                                    if (item[i].childNodes[j].childNodes[k].nodeName === 'see') {
                                        returnText += item[i].childNodes[j].childNodes[k].outerHTML;
                                    }
                                }
                                json[methodName].returns = returnText.trimStart();
                            }
                            if (item[i].childNodes[j].nodeName === 'example') {
                                let codeText: string = '';
                                for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                    if (item[i].childNodes[j].childNodes[k].nodeName === 'code') {
                                        codeText += item[i].childNodes[j].childNodes[k].innerHTML;
                                    }
                                }
                                json[methodName].example = codeText.trimStart();
                            }
                        } 
                    }
                    if (itemType === 'object') {
                        // not all objects have basetype as a parameter in their tags
                        // perhaps the string needs to be hardcoded here in this file instead of passed in an array from the other file

                        if (itemStrings.some(object => item[i].attributes.name.nodeValue.includes('T:Geotab.Checkmate.ObjectModel'))) {
                            let tagName = item[i].attributes.name.nodeValue.split('.');
                            let objectName = tagName[tagName.length - 1].replace(/[^a-zA-Z]/g, '');
                            if (!json[objectName]) {
                                json[objectName] = {
                                    "description": "",
                                    "properties": []
                                }
                            }
                            for (let j = 0; j < item[i].childNodes.length; j++) {
                                if (item[i].childNodes[j].nodeName === 'summary') {
                                    if (item[i].childNodes[j].hasChildNodes()) {
                                        let summaryChildren = item[i].childNodes[j].childNodes;
                                        let summaryText: string = '';
                                        for (let k = 0; k < summaryChildren.length; k++) {
                                            if (summaryChildren[k].nodeName === 'text' || summaryChildren[k].nodeName === '#text') {
                                                summaryText += summaryChildren[k].nodeValue.replace(/\s+/g, ' ');
                                            }
                                            if (summaryChildren[k].nodeName === 'see' || summaryChildren[k].nodeName === 'a') {
                                                summaryText += summaryChildren[k].outerHTML;
                                            }
                                            if (summaryChildren[k].nodeName === 'para') {
                                                // console.log(summaryChildren[k].childNodes);
                                                for (let l = 0; l < summaryChildren[k].childNodes.length; l++) {
                                                    if (summaryChildren[k].childNodes[l].nodeName === '#text') {
                                                        summaryText += summaryChildren[k].childNodes[l].nodeValue.replace(/\s+/g, ' ');
                                                    }
                                                    if (summaryChildren[k].childNodes[l].nodeName === 'see') {
                                                        summaryText += summaryChildren[k].childNodes[l].outerHTML;
                                                    }
                                                }
                                                
                                                if (k !== summaryChildren.length - 1) {
                                                    summaryText += '\n';
                                                }
                                            }
                                            if (summaryChildren[k].nodeName === 'list') {
                                                // in lists we have item tags and each item tag has a description tag within it
                                                // console.log(summaryChildren[k].childNodes);
                                                let listItems = summaryChildren[k].childNodes;
                                                for (let l = 0; l < listItems.length; l++) {
                                                    if (listItems[l].hasChildNodes) {
                                                        for (let m = 0; m < listItems[l].childNodes.length; m++) {
                                                            if (listItems[l].childNodes[m].childNodes[0].nodeName === "see") {
                                                                summaryText += '\n' + '- ' + listItems[l].childNodes[m].childNodes[0].outerHTML;
                                                            } else {
                                                                summaryText += '\n' + '- ' + listItems[l].childNodes[m].childNodes[0].nodeValue.replace(/\s+/g,  ' ');
                                                            }   
                                                        }
                                                    }
                                                } 
                                            }
                                        }
                                        json[objectName].description = summaryText.trimStart();
                                    } 
                                }
                                
                            } 
                        } else if (itemStrings.some(object => item[i].attributes.name.nodeValue.includes('P:Geotab.Checkmate.ObjectModel'))) {
                            let tagName = item[i].attributes.name.nodeValue.split('.');
                            let objectName = tagName[tagName.length - 2].replace(/[^a-zA-Z]/g, '');
                            let propertyName = tagName[tagName.length - 1].replace(/[^a-zA-Z]/g, '');
                            if (json[objectName]) {
                                // console.log('----' + objectName + '----');
                                let propertyDict: any = {};
                                let descriptionText = '';
                                propertyDict['name'] = propertyName;
                                for (let j = 0; j < item[i].childNodes.length; j++) {
                                    if (item[i].childNodes[j].nodeName === 'summary') {
                                        for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                            if (item[i].childNodes[j].childNodes[k].nodeName === '#text') {
                                                descriptionText += item[i].childNodes[j].childNodes[k].nodeValue.replace(/\s+/g, ' ')
                                            }
                                            if (item[i].childNodes[j].childNodes[k].nodeName === 'see') {
                                                descriptionText += item[i].childNodes[j].childNodes[k].outerHTML;
                                            }
                                            if (item[i].childNodes[j].childNodes[k].nodeName === 'list') {
                                                let properyListItems = item[i].childNodes[j].childNodes[k].childNodes;
                                                for (let l = 0; l < properyListItems.length; l++) {
                                                    if (properyListItems[l].hasChildNodes) {
                                                        for (let m = 0; m < properyListItems[l].childNodes.length; m++) {
                                                            if (properyListItems[l].childNodes[m].childNodes[0].nodeName === "see") {
                                                                descriptionText += '\n' + '- ' + properyListItems[l].childNodes[m].childNodes[0].outerHTML;
                                                            } else {
                                                                descriptionText += '\n' + '- ' + properyListItems[l].childNodes[m].childNodes[0].nodeValue.replace(/\s+/g,  ' ');
                                                            }   
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (item[i].childNodes[j].nodeName === 'value') {
                                        
                                    }
                                }
                                propertyDict['description'] = descriptionText.trimStart();
                                json[objectName].properties.push(propertyDict);
                            }
                        }
                    }
                    // console.log(item[i].attributes.name.nodeValue.split('.')[-1]);
                    // if (itemType === 'object' && json.hasOwnProperty())
                }
            }
        }
    }
    console.log(json);
    return json;
}