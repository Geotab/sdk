/* eslint-disable */
import { searchIndex } from "../../../../src/utils/searchIndex";
import { searchIndexId } from "../../../utils/searchIndexUtils";
import { removeHtmlAndSpecificTags } from "../../../utils/searchIndexUtils";
import { Page } from "../../../../src/utils/pageInterface";
import {miniSearch } from "../../SearchModal/SearchModal";

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


let buildMethodSearchIndex: Page[] = [];
let buildObjectSearchIndex: Page[] = [];

function extractSubstrings(input: string): string {
    const webMethodsMatch: RegExpMatchArray | null = input.match(/WebMethods\.([a-zA-Z]+)/);
    const dataStoreMatch: RegExpMatchArray | null = input.match(/DataStore\.([a-zA-Z]+)/);

    if (webMethodsMatch) {
        return webMethodsMatch[1];
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
                        
                        buildMethodSearchIndex.push({id: 0, title: "", headers: [], headerIds: [], content: "", link: "", breadCrumb: [], category: ""}); 
                        buildMethodSearchIndex[buildMethodSearchIndex.length - 1].id = searchIndexId(); 
                        buildMethodSearchIndex[buildMethodSearchIndex.length - 1].title = `${methodName} (...)`; 
                        buildMethodSearchIndex[buildMethodSearchIndex.length - 1].headers = ["Introduction", "Parameters", "Return value", "Code samples"]; 
                        buildMethodSearchIndex[buildMethodSearchIndex.length - 1].headerIds = ["introduction", "parameters", "return value", "code samples"]; 
                        buildMethodSearchIndex[buildMethodSearchIndex.length - 1].link= `/myGeotab/apiReference/methods/${methodName}`; 
                        buildMethodSearchIndex[buildMethodSearchIndex.length - 1].breadCrumb = ["MYG", "API Reference", "Methods", methodName + " (...)"]; 
                        buildMethodSearchIndex[buildMethodSearchIndex.length - 1].category = "reference"; 
                        let parametersHeaderAdded = false;
                        
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
                                    buildMethodSearchIndex[buildMethodSearchIndex.length - 1].content += `Introduction ${removeHtmlAndSpecificTags(summaryText.trimStart())}`; 
                                }
                            }
                            if (item[i].childNodes[j].nodeName === "param" && !(item[i].childNodes[j] as Element).attributes.hasOwnProperty("jsHide")) {
                                if (parametersHeaderAdded === false) {
                                    buildMethodSearchIndex[buildMethodSearchIndex.length - 1].content += " Parameters "; 
                                    parametersHeaderAdded  = true;
                                }
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
                                buildMethodSearchIndex[buildMethodSearchIndex.length - 1].content += `${paramDict.name} ${removeHtmlAndSpecificTags(paramDict.description)} `; 

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
                                buildMethodSearchIndex[buildMethodSearchIndex.length - 1].content += ` Return value ${removeHtmlAndSpecificTags(returnText.trimStart())}`; 
                            }
                            if (item[i].childNodes[j].nodeName === "example") {
                                let codeText = "";
                                for (let k = 0; k < item[i].childNodes[j].childNodes.length; k++) {
                                    if (item[i].childNodes[j].childNodes[k].nodeName === "code") {
                                        codeText += (item[i].childNodes[j].childNodes[k] as Element).innerHTML;
                                    }
                                }
                                (json[methodName] as MethodInfo).example = codeText.trimStart();
                                buildMethodSearchIndex[buildMethodSearchIndex.length - 1].content += ` Code samples ${codeText.trimStart()}`; 
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

                        buildObjectSearchIndex.push({id: 0, title: "", headers: [], headerIds: [], content: "", link: "", breadCrumb: [], category: ""}); 
                        buildObjectSearchIndex[buildObjectSearchIndex.length - 1].id = searchIndexId(); 
                        buildObjectSearchIndex[buildObjectSearchIndex.length - 1].title = `${objectName}`; 
                        buildObjectSearchIndex[buildObjectSearchIndex.length - 1].headers = ["Introduction", "Properties"]; 
                        buildObjectSearchIndex[buildObjectSearchIndex.length - 1].headerIds = ["introduction", "properties"]; 
                        buildObjectSearchIndex[buildObjectSearchIndex.length - 1].link= `/myGeotab/apiReference/objects/${objectName}`; 
                        buildObjectSearchIndex[buildObjectSearchIndex.length - 1].breadCrumb = ["MYG", "API Reference", "Objects", objectName]; 
                        buildObjectSearchIndex[buildObjectSearchIndex.length - 1].category = "reference"; 

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
                                    buildObjectSearchIndex[buildObjectSearchIndex.length - 1].content += `Introduction ${removeHtmlAndSpecificTags(summaryText.trimStart())}`; 
                                    buildObjectSearchIndex[buildObjectSearchIndex.length - 1].content += " Properties "; 
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
                            }
                            propertyDict["description"] = descriptionText.trimStart();
                            (json[objectName] as ObjectInfo).properties.push(propertyDict);
                            buildObjectSearchIndex[buildObjectSearchIndex.length - 1].content += `${propertyDict["name"]} ${removeHtmlAndSpecificTags(propertyDict["description"])} `; 
                        }
                    }
                }
            }
        }
    }

    if (buildMethodSearchIndex.length > 0 && buildObjectSearchIndex.length > 0) {
        searchIndex.push(...buildMethodSearchIndex);
        searchIndex.push(...buildObjectSearchIndex);
        miniSearch.addAll(buildMethodSearchIndex);
        miniSearch.addAll(buildObjectSearchIndex);
    }

    return json;
}