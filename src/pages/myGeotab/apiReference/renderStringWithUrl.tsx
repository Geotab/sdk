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
        console.log(content);
        while ((match = seeTagRegex.exec(content)) !== null) {
            const start = currentIndex;
            const end = match.index;
            if (start < end) {
                segments.push(<span key={`span-${currentIndex}`}>{content.slice(start, end)}</span>);
            }

            let cref = match[1].split('.');
            let linkText = cref[cref.length - 1].replace(/[^a-zA-Z]/g, '');
            const link = `#${linkText}`; // Replace with your actual URL
            segments.push(<a key={`a-${currentIndex}`} href={link}>{linkText}</a>);
            currentIndex = seeTagRegex.lastIndex;
        }

        // Handle the case where a dash follows a <see> tag
        if (isListItem && currentIndex < content.length && content[currentIndex] === '-') {
            currentIndex++; // Skip the dash
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