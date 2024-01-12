/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { HashLink } from "react-router-hash-link";

export default function RenderStringWithUrl(name: string, text: string): JSX.Element {
    const lines: string[] = text.split("\n");

    const renderedText: JSX.Element[] = [];
    let inList = false;
    let listItems: JSX.Element[] = [];

    lines.forEach((line: string, index: number) => {
        if (line.trim() === "") {
            return;
        }

        const seeTagRegex = /<see cref="([^"]*)"[^>]*>/g;
        const isListItem: boolean = line.trim().startsWith("- ");

        const content: string = isListItem ? line.replace(/^\s*-\s*/, "") : line;

        let currentIndex = 0;
        const segments: JSX.Element[] = [];

        let match;
        while ((match = seeTagRegex.exec(content)) !== null) {
            const start: number = currentIndex;
            const end: number = match.index;
            if (start < end) {
                segments.push(<span key={`span-${index}-${start}`}>{content.slice(start, end)}</span>);
            }

            let cref: string[] = match[1].split(".");
            let linkText: string = cref[cref.length - 1].replace(/[^a-zA-Z\d]/g, "");
            let link;
            if (cref.includes("ObjectModel")) {
                link = `/myGeotab/apiReference/objects#${linkText}`;
            } else {
                link = `#${linkText}`;
            }

            segments.push(
                <HashLink key={`hashlink-${index}-${currentIndex}`} to={link}>
                    {linkText}
                </HashLink>
            );
            currentIndex = seeTagRegex.lastIndex;
        }

        // Handle the case where a dash follows a <see> tag
        if (isListItem && currentIndex < content.length && content[currentIndex] === "-") {
            currentIndex++; // Skip the dash
        }

        // Handle the case where the content contains an <a> tag
        const anchorTagRegex = /<a href="([^"]*)">(.*?)<\/a>/g;
        let anchorMatch;
        while ((anchorMatch = anchorTagRegex.exec(content)) !== null) {
            const start: number = currentIndex;
            const end: number = anchorMatch.index;
            if (start < end) {
                segments.push(<span key={`span-${currentIndex}`}>{content.slice(start, end)}</span>);
            }

            const link: string = anchorMatch[1];
            const linkText: string = anchorMatch[2];
            segments.push(
                <a key={`a-${index}-${currentIndex}`} href={link}>
                    {linkText}
                </a>
            );
            currentIndex = anchorTagRegex.lastIndex;
        }

        const remainingText: string = content.slice(currentIndex).replace(/\/>/g, "");

        if (remainingText) {
            segments.push(<span key={`span-${currentIndex}`}>{remainingText}</span>);
        }

        if (isListItem) {
            if (!inList) {
                inList = true;
                listItems = [];
            }
            // console.log(`li-${name}-${index}-${segments[0].props.children}`);
            listItems.push(<li key={`li-${name}-${index}-${segments[0].props.children}}`}>{segments}</li>);
        } else {
            inList = false;
            if (listItems.length > 0) {
                renderedText.push(<ul key={`ul-${renderedText.length}`}>{listItems}</ul>);
                listItems = [];
            }
            renderedText.push(<p key={`p-${index}`}>{segments}</p>);
        }
    });

    if (listItems.length > 0) {
        renderedText.push(<ul key={`ul-${renderedText.length}`}>{listItems}</ul>);
    }

    return <div>{renderedText}</div>;
}