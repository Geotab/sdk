import React from "react";

// const link = `https://geotab.github.io/sdk/software/api/reference/${cref}`;

export default function RenderStringWithLinks(text: string) {
    const lines = text.split('\n');

    const renderedText: JSX.Element[] = [];
    let inList = false;
    let listItems: JSX.Element[] = [];

    lines.forEach((line, index) => {
        if (line.trim() === '') {
            return;
        }

        const seeTagRegex = /<see cref="([^"]*)"/g;
        const isListItem = line.trim().startsWith('- ');

        // Use a regular expression to remove the dashes
        const content = isListItem ? line.replace(/^\s*-\s*/, '') : line;

        let match;
        let currentIndex = 0;
        const segments: JSX.Element[] = [];

        while ((match = seeTagRegex.exec(content)) !== null) {
            segments.push(<span key={currentIndex++}>{content.slice(currentIndex, match.index)}</span>);
            const cref = match[1];
            const link = `/your-link-here/${cref}`; // Replace with your actual URL
            segments.push(<a key={currentIndex++} href={link}>{cref}</a>);
            currentIndex = seeTagRegex.lastIndex;
        }

        segments.push(<span key={currentIndex}>{content.slice(currentIndex) || ''}</span>);

        if (isListItem) {
            if (!inList) {
                inList = true;
                listItems = [];
            }
            listItems.push(<li key={listItems.length}>{segments}</li>);
        } else {
            inList = false;
            if (listItems.length > 0) {
                renderedText.push(
                <ul key={renderedText.length}>
                    {listItems}
                </ul>
                );
                listItems = [];
            }
            renderedText.push(<p key={index}>{segments}</p>);
        }
    });

    if (listItems.length > 0) {
        renderedText.push(
            <ul key={renderedText.length}>
                {listItems}
            </ul>
        );
    }

    return <div>{renderedText}</div>;
}