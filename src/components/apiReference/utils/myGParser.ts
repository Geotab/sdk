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

type ParserOutput = {
    [name: string]: MethodInfo | ObjectInfo;
};

function extractSubstrings(input: string): string {
    const webMethodsMatch: RegExpMatchArray | null = input.match(/WebMethods\.([a-zA-Z]+)/);
    const dataStoreMatch: RegExpMatchArray | null = input.match(/DataStore\.([a-zA-Z]+)/);

    if (webMethodsMatch) {
        return webMethodsMatch[1];
    } else if (dataStoreMatch) {
    } else if (dataStoreMatch) {
        return dataStoreMatch[1];
    } else {
        return "";
    }
}

export default function myGParser(xml: XMLDocument, itemType: string, itemStrings: string[]): ParserOutput {
    let json: { [key: string]: MethodInfo | ObjectInfo } = {};
    if (xml.hasChildNodes()) {
        if (xml.childNodes[0].nodeName === "doc") {
            let item: NodeListOf<ChildNode> = xml.childNodes[0].childNodes;
            for (let i = 0; i < item.length; i++) {
                if (item[i].nodeName === "member") {
                    if (itemType === "method" && itemStrings.some((method) => (item[i] as Element).attributes.getNamedItem("name")?.nodeValue?.includes(method))) {
                        let methodName: string = extractSubstrings((item[i] as Element).attributes.getNamedItem("name")?.nodeValue ?? "").replace(/Async$/, "");
                        if (!json[methodName]) {
                            json[methodName] = {
                                description: "",
                                parameters: [],
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
                                                    summaryText += summaryChildren[k].childNodes[l].nodeValue?.replace(/\s+/g, " ");
                                                }
                                                if (summaryChildren[k].childNodes[l].nodeName === "see") {
                                                    summaryText += (summaryChildren[k].childNodes[l] as Element).outerHTML;
                                                }
                                                if (summaryChildren[k].childNodes[l].nodeName === "list") {
                                                    let listItems = summaryChildren[k].childNodes[l];
                                                    for (let m = 0; m < listItems.childNodes.length; m++) {
                                                        summaryText += "\n" + "- " + (listItems.childNodes[m].childNodes[0] as Element).innerHTML;
                                                    }
                                                }
                                            }

                                            if (k !== summaryChildren.length - 1) {
                                                summaryText += "\n";
                                            }
                                        } else {
                                            if (summaryChildren[k].nodeName === "#text") {
                                                summaryText += summaryChildren[k].nodeValue?.replace(/\s+/g, " ");
                                            }
                                            if (summaryChildren[k].nodeName === "see") {
                                                summaryText += (summaryChildren[k] as Element).outerHTML;
                                            }
                                        }
                                    }
                                    json[methodName].description = summaryText.trimStart();
                                }
                            }
                            if (item[i].childNodes[j].nodeName === "param" && !(item[i].childNodes[j] as Element).attributes.hasOwnProperty("jsHide")) {
                                let paramDict: any = {};
                                let descriptionText = "";
                                for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                    if (item[i].childNodes[j].childNodes[k].nodeName === "#text") {
                                        descriptionText += item[i].childNodes[j].childNodes[k].nodeValue?.replace(/\s+/g, " ");
                                    }
                                    if (item[i].childNodes[j].childNodes[k].nodeName === "see") {
                                        descriptionText += (item[i].childNodes[j].childNodes[k] as Element).outerHTML;
                                    }
                                }
                                paramDict["name"] = (item[i].childNodes[j] as Element).attributes.getNamedItem("name")?.nodeValue;
                                paramDict["description"] = descriptionText; //trimstart and remove the extra space for the see stuff todooooooooo
                                if ((item[i].childNodes[j] as Element).attributes.hasOwnProperty("required")) {
                                    paramDict["required"] = true;
                                }
                                (json[methodName] as MethodInfo).parameters.push(paramDict);
                            }
                            if (item[i].childNodes[j].nodeName === "returns") {
                                let returnText = "";
                                for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                    if (item[i].childNodes[j].childNodes[k].nodeName === "#text") {
                                        returnText += (item[i].childNodes[j].childNodes[k] as Element).nodeValue?.replace(/\s+/g, " ");
                                    }
                                    if (item[i].childNodes[j].childNodes[k].nodeName === "see") {
                                        returnText += (item[i].childNodes[j].childNodes[k] as Element).outerHTML;
                                    }
                                }
                                (json[methodName] as MethodInfo).returns = returnText.trimStart();
                            }
                            if (item[i].childNodes[j].nodeName === "example") {
                                let codeText = "";
                                for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                    if (item[i].childNodes[j].childNodes[k].nodeName === "code") {
                                        codeText += (item[i].childNodes[j].childNodes[k] as Element).innerHTML;
                                    }
                                }
                                (json[methodName] as MethodInfo).example = codeText.trimStart();
                            }
                        }
                    }

                    if (
                        itemType === "object" &&
                        (itemStrings.some((object) => (item[i] as Element).attributes.getNamedItem("name")?.nodeValue?.includes("T:Geotab.Checkmate.ObjectModel")) ||
                            itemStrings.some((object) => (item[i] as Element).attributes.getNamedItem("name")?.nodeValue?.includes("T:Geotab.Checkmate.API")))
                    ) {
                        let tagName: string[] = (item[i] as Element).attributes.getNamedItem("name")?.nodeValue?.split(".") ?? [];
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
                                    let summaryText: string = "";
                                    for (let k = 0; k < summaryChildren.length; k++) {
                                        if (summaryChildren[k].nodeName === "text" || summaryChildren[k].nodeName === "#text") {
                                            summaryText += summaryChildren[k].nodeValue?.replace(/\s+/g, " ");
                                        }
                                        if (summaryChildren[k].nodeName === "see" || summaryChildren[k].nodeName === "a") {
                                            summaryText += (summaryChildren[k] as Element).outerHTML;
                                        }
                                        if (summaryChildren[k].nodeName === "para") {
                                            for (let l = 0; l < summaryChildren[k].childNodes.length; l++) {
                                                if (summaryChildren[k].childNodes[l].nodeName === "#text") {
                                                    summaryText += summaryChildren[k].childNodes[l].nodeValue?.replace(/\s+/g, " ");
                                                }
                                                if (summaryChildren[k].childNodes[l].nodeName === "see") {
                                                    summaryText += (summaryChildren[k].childNodes[l] as Element).outerHTML;
                                                }
                                            }

                                            if (k !== summaryChildren.length - 1) {
                                                summaryText += "\n";
                                            }
                                        }
                                        if (summaryChildren[k].nodeName === "list") {
                                            let listItems = summaryChildren[k].childNodes;
                                            for (let l = 0; l < listItems.length; l++) {
                                                for (let m = 0; m < listItems[l].childNodes.length; m++) {
                                                    if (listItems[l].childNodes[m].childNodes[0].nodeName === "see") {
                                                        summaryText += "\n" + "- " + (listItems[l].childNodes[m].childNodes[0] as Element).outerHTML;
                                                    } else {
                                                        summaryText += "\n" + "- " + listItems[l].childNodes[m].childNodes[0].nodeValue?.replace(/\s+/g, " ");
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
                        (itemStrings.some((object) => (item[i] as Element).attributes.getNamedItem("name")?.nodeValue?.includes("P:Geotab.Checkmate.ObjectModel")) ||
                            itemStrings.some((object) => (item[i] as Element).attributes.getNamedItem("name")?.nodeValue?.includes("P:Geotab.Checkmate")) ||
                            itemStrings.some((object) => (item[i] as Element).attributes.getNamedItem("name")?.nodeValue?.includes("F:Geotab.Checkmate.ObjectModel")))
                    ) {
                        let tagName: string[] = (item[i] as Element).attributes.getNamedItem("name")?.nodeValue?.split(".") || [];
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
                                            descriptionText += (item[i].childNodes[j].childNodes[k] as Element).nodeValue?.replace(/\s+/g, " ");
                                        }
                                        if (item[i].childNodes[j].childNodes[k].nodeName === "see") {
                                            descriptionText += (item[i].childNodes[j].childNodes[k] as Element).outerHTML;
                                        }
                                        if (item[i].childNodes[j].childNodes[k].nodeName === "list") {
                                            let properyListItems = item[i].childNodes[j].childNodes[k].childNodes;
                                            for (let l = 0; l < properyListItems.length; l++) {
                                                for (let m = 0; m < properyListItems[l].childNodes.length; m++) {
                                                    if (properyListItems[l].childNodes[m].childNodes[0].nodeName === "see") {
                                                        descriptionText += "\n" + "- " + (properyListItems[l].childNodes[m].childNodes[0] as Element).outerHTML;
                                                    } else {
                                                        descriptionText += "\n" + "- " + (properyListItems[l].childNodes[m].childNodes[0] as Element).nodeValue?.replace(/\s+/g, " ");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (item[i].childNodes[j].nodeName === "value") {
                                }
                                if (item[i].childNodes[j].nodeName === "value") {
                                }
                            }
                            propertyDict["description"] = descriptionText.trimStart();
                            (json[objectName] as ObjectInfo).properties.push(propertyDict);
                        }
                    }
                }
            }
        }
    }
    return json;
}
/* eslint-enable */
