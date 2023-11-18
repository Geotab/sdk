import React from "react";
import "./tableOfContents.scss";

export interface TableOfContentsItem {
    summary: string;
    elementId: string;
    details?: React.ReactNode;
}

interface TableOfContentsProps {
    items: TableOfContentsItem[];
}

export default function TableOfContents(props: TableOfContentsProps) {
    return (
        <ul className="tableOfContents">
            <li className="tableOfContents__heading">
                Table of contents
            </li>
            {props.items.map((item: TableOfContentsItem) => {
                return (
                    <li key={item.elementId}>
                        <a href={`#${item.elementId}`}>{item.summary}</a>
                    </li>
                );
            })}
        </ul>
    );
};