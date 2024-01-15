export function removeHtmlAndSpecificTags(input: string): string {

    // Regular expression to match any HTML <see> tags with cref and extract the last word after the last period
    const regex = /<see cref="T:[\w.]+\.(\w+)"\/?>/g;

    // Replace HTML <see> tags with the captured last word
    const result = input.replace(regex, "$1");

    return result;
}