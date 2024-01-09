interface PropertyDescription {
    name: string;
    description: string;
}

interface ParameterDescription extends PropertyDescription {
    required: boolean;
}

interface MethodInfo {
    description: string;
    parameters: ParameterDescription[];
    returns: string;
    example: string;
}

interface ObjectInfo {
    description: string;
    properties: PropertyDescription[];
}

interface ParserOutput {
    [name: string]: MethodInfo | ObjectInfo;
}

function extractSubstrings (input: string): string {
    const webMethodsMatch: RegExpMatchArray | null = input.match(/WebMethods\.([a-zA-Z]+)/);
    const dataStoreMatch: RegExpMatchArray | null = input.match(/DataStore\.([a-zA-Z]+)/);

    if (webMethodsMatch) {
        return webMethodsMatch[1];
    }
    if (dataStoreMatch) {
        return dataStoreMatch[1];
    }
    return "";
}

export default function myGParser (xml: any, itemType: string, itemStrings: string[]): ParserOutput {
    let json: any = {};
    if (xml.hasChildNodes()) {
        if (xml.childNodes[0].nodeName === "doc") {
            let item = xml.childNodes[0].childNodes;
            for (let i = 0; i < item.length; i++) {
                if (item[i].nodeName === "member") {
                    if (itemType === "method" && itemStrings.some((method) => item[i].attributes.name.nodeValue.includes(method))) {
                        let methodName: string = extractSubstrings(item[i].attributes.name.nodeValue).replace(/Async$/, "");
                        if (!json[methodName]) {
                            json[methodName] = {
                                description: "",
                                param: [],
                                returns: "",
                                example: ""
                            };
                        }
                        for (let j = 0; j < item[i].childNodes.length; j++) {
                            if (item[i].childNodes[j].nodeName === "summary") {
                                if (item[i].childNodes[j].hasChildNodes()) {
                                    // if there are child nodes here then we loop through them.
                                    let summaryChildren = item[i].childNodes[j].childNodes;
                                    let summaryText = "";
                                    for (let k = 0; k < summaryChildren.length; k++) {
                                        if (summaryChildren[k].nodeName === "para") {
                                            for (let l = 0; l < summaryChildren[k].childNodes.length; l++) {
                                                if (summaryChildren[k].childNodes[l].nodeName === "#text") {
                                                    summaryText += summaryChildren[k].childNodes[l].nodeValue.replace(/\s+/g, " ");
                                                }
                                                if (summaryChildren[k].childNodes[l].nodeName === "see") {
                                                    summaryText += summaryChildren[k].childNodes[l].outerHTML;
                                                }
                                                if (summaryChildren[k].childNodes[l].nodeName === "list") {
                                                    let listItems = summaryChildren[k].childNodes[l];
                                                    if (listItems.hasChildNodes) {
                                                        for (let m = 0; m < listItems.childNodes.length; m++) {
                                                            summaryText += "\n" + "- " + listItems.childNodes[m].childNodes[0].innerHTML;
                                                        }
                                                    }
                                                }
                                            }

                                            if (k !== summaryChildren.length - 1) {
                                                summaryText += "\n";
                                            }
                                        } else {
                                            if (summaryChildren[k].nodeName === "#text") {
                                                summaryText += summaryChildren[k].nodeValue.replace(/\s+/g, " ");
                                            }
                                            if (summaryChildren[k].nodeName === "see") {
                                                summaryText += summaryChildren[k].outerHTML;
                                            }
                                        }
                                    }
                                    json[methodName].description = summaryText.trimStart();
                                }
                            }
                            if (item[i].childNodes[j].nodeName === "param" && !item[i].childNodes[j].attributes.hasOwnProperty("jsHide")) {
                                let paramDict: any = {};
                                let descriptionText = "";
                                for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                    if (item[i].childNodes[j].childNodes[k].nodeName === "#text") {
                                        descriptionText += item[i].childNodes[j].childNodes[k].nodeValue.replace(/\s+/g, " ");
                                    }
                                    if (item[i].childNodes[j].childNodes[k].nodeName === "see") {
                                        descriptionText += item[i].childNodes[j].childNodes[k].outerHTML;
                                    }
                                }
                                paramDict["name"] = item[i].childNodes[j].attributes.name.nodeValue;
                                paramDict["description"] = descriptionText; //trimstart and remove the extra space for the see stuff todooooooooo
                                if (item[i].childNodes[j].attributes.hasOwnProperty("required")) {
                                    paramDict["required"] = true;
                                }
                                json[methodName].param.push(paramDict);
                            }
                            if (item[i].childNodes[j].nodeName === "returns") {
                                let returnText = "";
                                for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                    if (item[i].childNodes[j].childNodes[k].nodeName === "#text") {
                                        returnText += item[i].childNodes[j].childNodes[k].nodeValue.replace(/\s+/g, " ");
                                    }
                                    if (item[i].childNodes[j].childNodes[k].nodeName === "see") {
                                        returnText += item[i].childNodes[j].childNodes[k].outerHTML;
                                    }
                                }
                                json[methodName].returns = returnText.trimStart();
                            }
                            if (item[i].childNodes[j].nodeName === "example") {
                                let codeText = "";
                                for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                    if (item[i].childNodes[j].childNodes[k].nodeName === "code") {
                                        codeText += item[i].childNodes[j].childNodes[k].innerHTML;
                                    }
                                }
                                json[methodName].example = codeText.trimStart();
                            }
                        }
                    }

                    if (
                        itemType === "object" &&
                        (itemStrings.some((object) => item[i].attributes.name.nodeValue.includes("T:Geotab.Checkmate.ObjectModel")) ||
                            itemStrings.some((object) => item[i].attributes.name.nodeValue.includes("T:Geotab.Checkmate.API")))
                    ) {
                        let tagName: string = item[i].attributes.name.nodeValue.split(".");
                        let objectName: string = tagName[tagName.length - 1].replace(/[^a-zA-Z\d]/g, "");

                        if (!json[objectName]) {
                            json[objectName] = {
                                description: "",
                                properties: []
                            };
                        }
                        for (let j = 0; j < item[i].childNodes.length; j++) {
                            if (item[i].childNodes[j].nodeName === "summary") {
                                if (item[i].childNodes[j].hasChildNodes()) {
                                    let summaryChildren = item[i].childNodes[j].childNodes;
                                    let summaryText = "";
                                    for (let k = 0; k < summaryChildren.length; k++) {
                                        if (summaryChildren[k].nodeName === "text" || summaryChildren[k].nodeName === "#text") {
                                            summaryText += summaryChildren[k].nodeValue.replace(/\s+/g, " ");
                                        }
                                        if (summaryChildren[k].nodeName === "see" || summaryChildren[k].nodeName === "a") {
                                            summaryText += summaryChildren[k].outerHTML;
                                        }
                                        if (summaryChildren[k].nodeName === "para") {
                                            for (let l = 0; l < summaryChildren[k].childNodes.length; l++) {
                                                if (summaryChildren[k].childNodes[l].nodeName === "#text") {
                                                    summaryText += summaryChildren[k].childNodes[l].nodeValue.replace(/\s+/g, " ");
                                                }
                                                if (summaryChildren[k].childNodes[l].nodeName === "see") {
                                                    summaryText += summaryChildren[k].childNodes[l].outerHTML;
                                                }
                                            }

                                            if (k !== summaryChildren.length - 1) {
                                                summaryText += "\n";
                                            }
                                        }
                                        if (summaryChildren[k].nodeName === "list") {
                                            let listItems = summaryChildren[k].childNodes;
                                            for (let l = 0; l < listItems.length; l++) {
                                                if (listItems[l].hasChildNodes) {
                                                    for (let m = 0; m < listItems[l].childNodes.length; m++) {
                                                        if (listItems[l].childNodes[m].childNodes[0].nodeName === "see") {
                                                            summaryText += "\n" + "- " + listItems[l].childNodes[m].childNodes[0].outerHTML;
                                                        } else {
                                                            summaryText += "\n" + "- " + listItems[l].childNodes[m].childNodes[0].nodeValue.replace(/\s+/g, " ");
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
                    } else if (
                        itemType === "object" &&
                        (itemStrings.some((object) => item[i].attributes.name.nodeValue.includes("P:Geotab.Checkmate.ObjectModel")) ||
                            itemStrings.some((object) => item[i].attributes.name.nodeValue.includes("P:Geotab.Checkmate")) ||
                            itemStrings.some((object) => item[i].attributes.name.nodeValue.includes("F:Geotab.Checkmate.ObjectModel")))
                    ) {
                        let tagName: string = item[i].attributes.name.nodeValue.split(".");
                        let objectName: string = tagName[tagName.length - 2].replace(/[^a-zA-Z]/g, "");
                        let propertyName: string = tagName[tagName.length - 1].replace(/[^a-zA-Z]/g, "");
                        if (json[objectName]) {
                            let propertyDict: any = {};
                            let descriptionText = "";
                            propertyDict["name"] = propertyName;
                            for (let j = 0; j < item[i].childNodes.length; j++) {
                                if (item[i].childNodes[j].nodeName === "summary") {
                                    for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                        if (item[i].childNodes[j].childNodes[k].nodeName === "#text") {
                                            descriptionText += item[i].childNodes[j].childNodes[k].nodeValue.replace(/\s+/g, " ");
                                        }
                                        if (item[i].childNodes[j].childNodes[k].nodeName === "see") {
                                            descriptionText += item[i].childNodes[j].childNodes[k].outerHTML;
                                        }
                                        if (item[i].childNodes[j].childNodes[k].nodeName === "list") {
                                            let properyListItems = item[i].childNodes[j].childNodes[k].childNodes;
                                            for (let l = 0; l < properyListItems.length; l++) {
                                                if (properyListItems[l].hasChildNodes) {
                                                    for (let m = 0; m < properyListItems[l].childNodes.length; m++) {
                                                        if (properyListItems[l].childNodes[m].childNodes[0].nodeName === "see") {
                                                            descriptionText += "\n" + "- " + properyListItems[l].childNodes[m].childNodes[0].outerHTML;
                                                        } else {
                                                            descriptionText += "\n" + "- " + properyListItems[l].childNodes[m].childNodes[0].nodeValue.replace(/\s+/g, " ");
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (item[i].childNodes[j].nodeName === "value") {
                                }
                            }
                            propertyDict["description"] = descriptionText.trimStart();
                            json[objectName].properties.push(propertyDict);
                        }
                    }
                }
            }
        }
    }
    return json;
}
