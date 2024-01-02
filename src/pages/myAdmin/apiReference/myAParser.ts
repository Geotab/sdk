function extractSubstrings(input: string): string {
    const webMethodsMatch = input.match(/MyAdminApiService\.([a-zA-Z]+)/);
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
                if (item[i].nodeName === "members") {
                    for (let j = 0; j < item[i].childNodes.length; j++) {
                        if (item[i].childNodes[j].nodeName === "member") {
                            if (itemType === 'method' && itemStrings.some(method => item[i].childNodes[j].attributes.name.nodeValue.includes(method)) && item[i].childNodes[j].getElementsByTagName('isSupported').length > 0) {
                                const isSupported = item[i].childNodes[j].getElementsByTagName('isSupported')[0];
                                if (isSupported.textContent === "true") {
                                    let methodName = extractSubstrings(item[i].childNodes[j].attributes.name.nodeValue);
                                    if (!json[methodName]) {
                                        json[methodName] = {
                                            "description": "",
                                            "remarks": "",
                                            "param": [],
                                            "returns": "",
                                            "example": ""
                                        }
                                    }
                                    for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                        if (item[i].childNodes[j].childNodes[k].nodeName === "summary") {
                                            if (item[i].childNodes[j].childNodes[k].hasChildNodes()) {
                                                let summaryChildren = item[i].childNodes[j].childNodes[k];
                                                let summaryText: string = '';

                                                for (let l = 0; l < summaryChildren.childNodes.length; l++) {
                                                    if (summaryChildren.childNodes[l].nodeName === '#text') {
                                                        summaryText += summaryChildren.childNodes[l].nodeValue.replace(/\s+/g, ' ');
                                                    }
                                                    if (summaryChildren.childNodes[l].nodeName === 'see') {
                                                        summaryText += summaryChildren.childNodes[l].outerHTML;
                                                    }
                                                    if (summaryChildren.childNodes[l].nodeName === 'list') {
                                                        // in lists we have item tags and each item tag has a description tag within it
                                                        let listItems = summaryChildren.childNodes[l];
                                                        if (listItems.hasChildNodes) {
                                                            for (let m = 0; m < listItems.childNodes.length; m++) {
                                                                summaryText += '\n' + '- ' + listItems.childNodes[m].childNodes[0].innerHTML;
                                                            }
                                                        }
                                                    }
                                                }
                                                
                                                // if (k !== summaryChildren.length - 1) {
                                                //     summaryText += '\n';
                                                // }
                                                json[methodName].description = summaryText.trimStart();
                                            } 
                                        }
                                        if (item[i].childNodes[j].childNodes[k].nodeName === "remarks") {
                                            if (item[i].childNodes[j].childNodes[k].hasChildNodes()) {
                                                let remarksChildren = item[i].childNodes[j].childNodes[k];
                                                let remarksText: string = '';

                                                for (let l = 0; l < remarksChildren.childNodes.length; l++) {
                                                    if (remarksChildren.childNodes[l].nodeName === '#text') {
                                                        remarksText += remarksChildren.childNodes[l].nodeValue.replace(/\s+/g, ' ');
                                                    }
                                                }

                                                json[methodName].remarks = remarksText.trimStart();
                                            }
                                        }
                                        if (item[i].childNodes[j].childNodes[k].nodeName === "param") {
                                            let paramDict: any = {};
                                            let descriptionText: string = '';
                                            for (let l = 0; l < item[i].childNodes[j].childNodes[k].childNodes.length; l++) {
                                                if (item[i].childNodes[j].childNodes[k].childNodes[l].nodeName === '#text') {
                                                    descriptionText += item[i].childNodes[j].childNodes[k].childNodes[l].nodeValue.replace(/\s+/g,  ' ');
                                                }
                                                if (item[i].childNodes[j].childNodes[k].childNodes[l].nodeName === 'see') {
                                                    descriptionText += item[i].childNodes[j].childNodes[k].childNodes[l].outerHTML;
                                                }
                                            }
                                            paramDict['name'] = item[i].childNodes[j].childNodes[k].attributes.name.nodeValue;
                                            paramDict['description'] = descriptionText; //trimstart and remove the extra space for the see stuff todooooooooo
                                            if (item[i].childNodes[j].childNodes[k].attributes.hasOwnProperty('required')) {
                                                paramDict['required'] = true;
                                            } else {
                                                paramDict['required'] = false;
                                            }
                                            json[methodName].param.push(paramDict);
                                            // have a dictionary with key as name, required property, jsHide property and a description property
                                            // the dicitionary will be pushed into an array in the json obj so we have an array of dictionaries
                                        }
                                        if (item[i].childNodes[j].childNodes[k].nodeName === 'returns') {
                                            let returnText: string = '';
                                            for (let l = 0; l < item[i].childNodes[j].childNodes[k].childNodes.length; l++) {
                                                if (item[i].childNodes[j].childNodes[k].childNodes[l].nodeName === '#text') {
                                                    returnText += item[i].childNodes[j].childNodes[k].childNodes[l].nodeValue.replace(/\s+/g,  ' ');
                                                }
                                                if (item[i].childNodes[j].childNodes[k].childNodes[l].nodeName === 'see') {
                                                    returnText += item[i].childNodes[j].childNodes[k].childNodes[l].outerHTML;
                                                }
                                            }
                                            json[methodName].returns = returnText.trimStart();
                                        }
                                    } 
                                }
                            }

                            if (itemType === 'object' && (itemStrings.some(object => item[i].childNodes[j].attributes.name.nodeValue.includes('T:MyAdminApiLib.Geotab.MyAdmin.MyAdminApi.ObjectModel'))) && item[i].childNodes[j].getElementsByTagName('isSupported').length > 0) {
                                const isSupported = item[i].childNodes[j].getElementsByTagName('isSupported')[0];
                                if (isSupported.textContent === "true") {
                                    let tagName = item[i].childNodes[j].attributes.name.nodeValue.split('.');
                                    let objectName = tagName[tagName.length - 1].replace(/[^a-zA-Z\d]/g, '');
            
                                    if (!json[objectName]) {
                                        json[objectName] = {
                                            "description": "",
                                            "properties": []
                                        }
                                    }

                                    for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                        if (item[i].childNodes[j].childNodes[k].nodeName === 'summary') {
                                            if (item[i].childNodes[j].childNodes[k].hasChildNodes()) {
                                                let summaryChildren = item[i].childNodes[j].childNodes[k].childNodes;
                                                let summaryText: string = '';
                                                for (let l = 0; l < summaryChildren.length; l++) {
                                                    if (summaryChildren[l].nodeName === 'text' || summaryChildren[l].nodeName === '#text') {
                                                        summaryText += summaryChildren[l].nodeValue.replace(/\s+/g, ' ');
                                                    }
                                                    if (summaryChildren[l].nodeName === 'see' || summaryChildren[l].nodeName === 'a') {
                                                        summaryText += summaryChildren[l].outerHTML;
                                                    }
                                                    if (summaryChildren[l].nodeName === 'para') {
                                                        for (let m = 0; m < summaryChildren[l].childNodes.length; m++) {
                                                            if (summaryChildren[l].childNodes[m].nodeName === '#text') {
                                                                summaryText += summaryChildren[l].childNodes[m].nodeValue.replace(/\s+/g, ' ');
                                                            }
                                                            if (summaryChildren[l].childNodes[m].nodeName === 'see') {
                                                                summaryText += summaryChildren[l].childNodes[m].outerHTML;
                                                            }
                                                        }
                                                        
                                                        if (l !== summaryChildren.length - 1) {
                                                            summaryText += '\n';
                                                        }
                                                    }
                                                    if (summaryChildren[l].nodeName === 'list') {
                                                        let listItems = summaryChildren[l].childNodes;
                                                        for (let m = 0; m < listItems.length; m++) {
                                                            if (listItems[m].hasChildNodes) {
                                                                for (let n = 0; n < listItems[m].childNodes.length; n++) {
                                                                    if (listItems[m].childNodes[n].childNodes[0].nodeName === "see") {
                                                                        summaryText += '\n' + '- ' + listItems[m].childNodes[n].childNodes[0].outerHTML;
                                                                    } else {
                                                                        summaryText += '\n' + '- ' + listItems[m].childNodes[n].childNodes[0].nodeValue.replace(/\s+/g,  ' ');
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
                                } 
                            } 
                            else if (itemType === 'object' && (itemStrings.some(object => item[i].childNodes[j].attributes.name.nodeValue.includes('P:MyAdminApiLib.Geotab.MyAdmin.MyAdminApi.ObjectModel')))) {
                                let tagName = item[i].childNodes[j].attributes.name.nodeValue.split('.');
                                let objectName = tagName[tagName.length - 2].replace(/[^a-zA-Z]/g, '');
                                let propertyName = tagName[tagName.length - 1].replace(/[^a-zA-Z]/g, '');
                                if (json[objectName]) {
                                    let propertyDict: any = {};
                                    let descriptionText = '';
                                    propertyDict['name'] = propertyName;
                                    for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                        if (item[i].childNodes[j].childNodes[k].nodeName === 'summary') {
                                            for (let l = 0; l < item[i].childNodes[j].childNodes[k].childNodes.length; l++) {
                                                if (item[i].childNodes[j].childNodes[k].childNodes[l].nodeName === '#text') {
                                                    descriptionText += item[i].childNodes[j].childNodes[k].childNodes[l].nodeValue.replace(/\s+/g, ' ')
                                                }
                                                if (item[i].childNodes[j].childNodes[k].childNodes[l].nodeName === 'see') {
                                                    descriptionText += item[i].childNodes[j].childNodes[k].childNodes[l].outerHTML;
                                                }
                                                if (item[i].childNodes[j].childNodes[k].childNodes[l].nodeName === 'list') {
                                                    let properyListItems = item[i].childNodes[j].childNodes[k].childNodes[l].childNodes;
                                                    for (let m = 0; m < properyListItems.length; m++) {
                                                        if (properyListItems[m].hasChildNodes) {
                                                            for (let n = 0; n < properyListItems[m].childNodes.length; n++) {
                                                                if (properyListItems[m].childNodes[n].childNodes[0].nodeName === "see") {
                                                                    descriptionText += '\n' + '- ' + properyListItems[m].childNodes[n].childNodes[0].outerHTML;
                                                                } else {
                                                                    descriptionText += '\n' + '- ' + properyListItems[m].childNodes[n].childNodes[0].nodeValue.replace(/\s+/g,  ' ');
                                                                }   
                                                            }
                                                        }
                                                    }
                                                }
                                                
                                            }                                            
                                        }
                                    }
                                    propertyDict['description'] = descriptionText.trimStart();
                                    json[objectName].properties.push(propertyDict);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(json);
    return json;
}