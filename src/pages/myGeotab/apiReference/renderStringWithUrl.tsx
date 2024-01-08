import { HashLink } from 'react-router-hash-link';

export default function RenderStringWithLinks(text: string) {
    const lines = text.split('\n');

    const renderedText: JSX.Element[] = [];
    let inList = false;
    let listItems: JSX.Element[] = [];

    lines.forEach((line, index) => {
        if (line.trim() === '') {
            return;
        }

        const seeTagRegex = /<see cref="([^"]*)"[^>]*>/g;
        const isListItem = line.trim().startsWith('- ');

        const content = isListItem ? line.replace(/^\s*-\s*/, '') : line;

        let currentIndex = 0;
        const segments: JSX.Element[] = [];

        let match;
        while ((match = seeTagRegex.exec(content)) !== null) {
            const start = currentIndex;
            const end = match.index;
            if (start < end) {
                segments.push(<span key={`span-${currentIndex}`}>{content.slice(start, end)}</span>);
            }

            let cref = match[1].split('.');
            console.log(match);
            let linkText = cref[cref.length - 1].replace(/[^a-zA-Z]/g, '');
            // if (cref[cref.length - 2].replace())
            let link;
            if (cref.includes('ObjectModel')) {
                link = `/myGeotab/apiReference/objects#${linkText}`;
            } else {
                link = `#${linkText}`;
            }
            console.log(cref);
            
            segments.push(<HashLink to={link}>{linkText}</HashLink>);
            currentIndex = seeTagRegex.lastIndex;
        }

        // Handle the case where a dash follows a <see> tag
        if (isListItem && currentIndex < content.length && content[currentIndex] === '-') {
            currentIndex++; // Skip the dash
        }

        // Handle the case where the content contains an <a> tag
        const anchorTagRegex = /<a href="([^"]*)">(.*?)<\/a>/g;
        let anchorMatch;
        while ((anchorMatch = anchorTagRegex.exec(content)) !== null) {
            const start = currentIndex;
            const end = anchorMatch.index;
            if (start < end) {
                segments.push(<span key={`span-${currentIndex}`}>{content.slice(start, end)}</span>);
            }

            const link = anchorMatch[1];
            const linkText = anchorMatch[2];
            segments.push(<a key={`a-${currentIndex}`} href={link}>{linkText}</a>);
            currentIndex = anchorTagRegex.lastIndex;
        }

        const remainingText = content.slice(currentIndex).replace(/\/>/g, '');

        if (remainingText) {
            segments.push(<span key={`span-${currentIndex}`}>{remainingText}</span>);
        }

        if (isListItem) {
            if (!inList) {
                inList = true;
                listItems = [];
            }
            listItems.push(<li key={`li-${listItems.length}`}>{segments}</li>);
        } else {
            inList = false;
            if (listItems.length > 0) {
                renderedText.push(
                    <ul key={`ul-${renderedText.length}`}>
                        {listItems}
                    </ul>
                );
                listItems = [];
            }
            renderedText.push(<p key={`p-${index}`}>{segments}</p>);
        }
    });

    if (listItems.length > 0) {
        renderedText.push(
            <ul key={`ul-${renderedText.length}`}>
                {listItems}
            </ul>
        );
    }

    return <div>{renderedText}</div>;
};