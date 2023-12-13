export default function sortAlphabetical(a: any, b: any) {
    if (a[0] < b[0]) {
        return -1
    }
    
    if (a[0] > b[0]) {
        return 1;
    }

    return 0;
};