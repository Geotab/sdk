import { searchIndex } from "./searchIndex";

export const searchIndexId = (() => {
    let isFirstCall = true;
    let lastItemIndex = searchIndex[searchIndex.length - 1].id + 1;

    return () => {
        if (isFirstCall) {
            isFirstCall = false;
        } else {
            lastItemIndex++;
        }
        return lastItemIndex;
    };
})();

