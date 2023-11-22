import React, { useEffect, useRef, useState } from "react";
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
    const [activeSection, setActiveSection] = useState("");
    const observer = useRef() as React.MutableRefObject<IntersectionObserver>;

    // useEffect hook implementation copied from:
    // https://netacci.hashnode.dev/how-to-highlight-active-navigation-on-scroll-in-react#heading-intersection-observer-api
    useEffect(() => {
        //create new instance and pass a callback function
        observer.current = new IntersectionObserver((entries) => {
            const visibleSection = entries.find((entry) => entry.isIntersecting)?.target;
            //Update state with the visible section ID
            if (visibleSection) {
                setActiveSection(visibleSection.id);
            }
        });

        const sections = document.querySelectorAll('details div.paragraph');

        sections.forEach((section) => {
            observer.current.observe(section);
        });
        //Cleanup function to remove observer
        return () => {
            sections.forEach((section) => {
                observer.current.unobserve(section);
            });
        };
    }, []);

    return (
        <ul className="tableOfContents">
            <li className="tableOfContents__heading">
                Table of contents
            </li>
            {props.items.map((item: TableOfContentsItem) => {
                return (
                    <li key={item.elementId} className={activeSection === item.elementId ? "tableOfContents__item--active": ""}>
                        <a href={`#${item.elementId}`}>{item.summary}</a>
                    </li>
                );
            })}
        </ul>
    );
};