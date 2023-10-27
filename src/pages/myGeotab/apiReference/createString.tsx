import React from 'react';

export default function createString(inputString: string) {
    const lines = inputString.split('\n');
    const content: JSX.Element[] = [];
    let listItems: JSX.Element[] = [];
    let inList = false;

    lines.forEach((line, index) => {
        if (line.trim().startsWith('- ')) {
        // Start or continue a bullet point list
            if (!inList) {
                inList = true;
                listItems = [];
            }
            listItems.push(<li key={index}>{line.trim().substring(2)}</li>);
        } else {
            // Treat as a paragraph
            if (inList) {
                // If we were in a list, wrap it up
                content.push(
                    <ul key={`ul-${index}`}>
                        {listItems.map((item, itemIndex) => (
                            <React.Fragment key={`li-${itemIndex}`}>{item}</React.Fragment>
                        ))}
                    </ul>
                );
                inList = false;
            }
            content.push(<p key={index}>{line}</p>);
        }
    });

    // Check if there are remaining list items
    if (inList && listItems.length > 0) {
        content.push(
            <ul key="remaining-list-items">
                {listItems.map((item, itemIndex) => (
                    <React.Fragment key={`remaining-li-${itemIndex}`}>{item}</React.Fragment>
                ))}
            </ul>
        );
    }

    return <div>{content}</div>;
}