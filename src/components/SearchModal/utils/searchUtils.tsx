import { searchIndex } from "../mockSearchData"

const EXCERPT_CHAR_LENGTH: number = 200;

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
        let excerptStartingIndex: number = findStartingStringIndex(numCharsAhead, numCharsAfter, numRemainingChars, stringIndex);
        if (excerptStartingIndex > 0) {
            excerpt += "...";
        }
        excerpt += contentString.substring(excerptStartingIndex, stringIndex);
        numRemainingChars -= excerpt.length;
        excerpt += matchTerm;
        excerpt += contentString.substring(stringIndex + matchTerm.length, stringIndex + matchTerm.length + numRemainingChars);
        if (!(numCharsAhead < Math.floor((EXCERPT_CHAR_LENGTH - matchTerm.length) / 2))) {
            excerpt += "...";
        }
        return excerpt;
    }
    //if there's no match in the page content, return the first portion of the page
    return contentString.substring(0, EXCERPT_CHAR_LENGTH) + "...";
};

