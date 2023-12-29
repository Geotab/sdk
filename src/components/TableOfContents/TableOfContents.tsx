import React, { useEffect, useRef, useState } from "react";
import "./tableOfContents.scss";
import { HashLink } from "react-router-hash-link";

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
        // Create new instance and pass a callback function
        observer.current = new IntersectionObserver((entries) => {
            const visibleSection = entries.find((entry) => entry.isIntersecting)?.target;
            // Update state with the visible section ID & scroll to that section in the Table of Contents
            if (visibleSection) {
                setActiveSection(visibleSection.id);

                let tableOfContentsContainerViewport = document.querySelector('.tableOfContents')?.getBoundingClientRect();
                let activeTableOfContentsItem = document.querySelector('li.tableOfContents__item--active');
                let activeTableOfContentsItemViewport = activeTableOfContentsItem?.getBoundingClientRect();

                // If the active table of contents item is not in the viewport, scroll to it
                if (activeTableOfContentsItemViewport?.top! < tableOfContentsContainerViewport?.top! || activeTableOfContentsItemViewport?.bottom! > tableOfContentsContainerViewport?.bottom!) {
                    activeTableOfContentsItem?.scrollIntoView({ block: "end" });
                }
            }
        }, {
            // Set the threshold to 0.4 so that the active section changes when the section is 40% in the viewport
            // threshold: 0.25,
        });

        const sections = document.querySelectorAll('details summary, details div.detailsContent');

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
                    <li key={item.elementId} className={activeSection === item.elementId ? "tableOfContents__item--active" : ""}>
                        <HashLink to={`#${item.elementId}`}>{item.summary}</HashLink>
                    </li>
                );
            })}
        </ul>
    );
};