import { MatchInfo } from "minisearch";
import { searchIndex } from "../mockSearchData";

const EXCERPT_CHAR_LENGTH = 200;

interface Page {
    id: number;
    title: string;
    headers: string[];
    headerIds: string[];
    content: string;
    link: string;
    breadCrumb: string[];
    category: string;
}

const findStartingStringIndex = (numCharsAhead: number, numCharsAfter: number, remainingLength: number, foundIndex: number): number => {
    let half: number = Math.floor(remainingLength / 2);
    if (numCharsAhead < half) {
        return 0;
    } else if (numCharsAfter < half) {
        return foundIndex - remainingLength + numCharsAfter;
    } else {
        return foundIndex - half;
    }
};

export const pullText = (searchId: number, matchTerm: string): string => {
    let i: number = searchIndex.findIndex((page: Page) => page.id === searchId);
    let contentString: string = searchIndex[i].content;

    let stringIndex: number = contentString.indexOf(matchTerm);
    if (stringIndex >= 0) {
        let excerpt = "";
        let numRemainingChars: number = EXCERPT_CHAR_LENGTH - matchTerm.length;
        let numCharsAhead: number = contentString.substring(0, stringIndex).length;
        let numCharsAfter: number = contentString.substring(stringIndex + matchTerm.length).length;
        if (numCharsAhead + numCharsAfter <= numRemainingChars) {
            return contentString;
        }
        let excerptStartingIndex: number = findStartingStringIndex(numCharsAhead, numCharsAfter, numRemainingChars, stringIndex);
        excerpt += contentString.substring(excerptStartingIndex, stringIndex);
        numRemainingChars -= excerpt.length;
        if (excerptStartingIndex > 0) {
            excerpt = "..." + excerpt;
        }
        excerpt += matchTerm;
        excerpt += contentString.substring(stringIndex + matchTerm.length, stringIndex + matchTerm.length + numRemainingChars);
        if (excerpt.length - excerpt.indexOf(matchTerm) - matchTerm.length !== numCharsAfter) {
            excerpt += "...";
        }
        return excerpt;
    }
    //if there's no match in the page content, return the first portion of the page
    return contentString.substring(0, EXCERPT_CHAR_LENGTH) + "...";
};

export const findHeaderId = (searchId: number, matchTerms: MatchInfo): string | null => {
    let isHeaderLink = false;
    let headerMatch = "";
    for (const term in matchTerms) {
        if (matchTerms[term].includes("headers")) {
            isHeaderLink = true;
            headerMatch = term;
            break;
        }
    }
    if (isHeaderLink) {
        let i: number = searchIndex.findIndex((page: Page) => page.id === searchId);
        let pageHeaders: string[] = searchIndex[i].headers;
        let headerIndex = pageHeaders.findIndex((header) => header.toLowerCase().includes(headerMatch));
        return searchIndex[i].headerIds[headerIndex];
    }
    return null;
};
