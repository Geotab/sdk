import { searchIndex } from "../mockSearchData"

const EXCERPT_CHAR_LENGTH: number = 20;

const findStartingStringIndex = (numCharsAhead: number, numCharsAfter: number, remainingLength: number, foundIndex: number): number => {
    let half: number = Math.floor(remainingLength / 2);
    if (numCharsAhead < half) {
        return 0;
    }
    else if (numCharsAfter < half) {
        return foundIndex - remainingLength + numCharsAfter;
    }
    else {
        return foundIndex - half;
    }
};

export const pullText = (searchId: number, matchTerm: string): string => {
    let i: number = searchIndex.findIndex(page => page.id === searchId);
    let contentString: string = searchIndex[i].content;

    let stringIndex: number = contentString.indexOf(matchTerm);
    if (stringIndex >= 0) {
        let excerpt: string = "";
        let numRemainingChars: number = EXCERPT_CHAR_LENGTH - matchTerm.length;
        let numCharsAhead: number = contentString.substring(0, stringIndex).length;
        let numCharsAfter: number = contentString.substring(stringIndex + matchTerm.length).length;
        if (numCharsAhead + numCharsAfter <= numRemainingChars) {
            return contentString;
        }
        excerpt += contentString.substring(findStartingStringIndex(numCharsAhead, numCharsAfter, numRemainingChars, stringIndex), stringIndex);
        numRemainingChars -= excerpt.length;
        excerpt += matchTerm;
        excerpt += contentString.substring(stringIndex + matchTerm.length, numRemainingChars);
        return excerpt;
    }
    //if there's no match in the page content, return the first portion of the page
    console.log(contentString.substring(0, EXCERPT_CHAR_LENGTH));
    return contentString.substring(0, EXCERPT_CHAR_LENGTH);
};

