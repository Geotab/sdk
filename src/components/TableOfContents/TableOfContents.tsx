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

export default function TableOfContents({ items }: TableOfContentsProps): JSX.Element {
    const [activeSection, setActiveSection] = useState("");
    const pageContentScrollObserver = useRef() as React.MutableRefObject<IntersectionObserver>;

    const tableOfContentsIsStickyObserver = useRef() as React.MutableRefObject<IntersectionObserver>;
    const tableOfContentsRef = useRef() as React.MutableRefObject<HTMLUListElement>;
    const activeListItemRef = useRef() as React.MutableRefObject<HTMLLIElement>;

    const TOC_HEADING_OFFSET = 46; // 46px is the total height of the header including padding/margin

    // useEffect hook implementation copied from:
    // https://netacci.hashnode.dev/how-to-highlight-active-navigation-on-scroll-in-react#heading-intersection-observer-api
    useEffect((): { (): void } => {
        let tableOfContentsElement = tableOfContentsRef.current;
        
        // Create an observer to monitor when the page content scrolls so that the table of contents reflects what the user is looking at
        pageContentScrollObserver.current = new IntersectionObserver((entries) => {
            const visibleSection = entries.find((entry): boolean => entry.isIntersecting)?.target;

            tableOfContentsElement = tableOfContentsRef.current;
            let tocContainer = tableOfContentsElement?.getBoundingClientRect();
            let activeListItemElement = activeListItemRef.current;
            let activeItemContainer = activeListItemElement?.getBoundingClientRect();

            // Update state with the visible section ID & scroll to that section in the Table of Contents
            if (visibleSection) {
                setActiveSection(visibleSection.id);

                // If the active table of contents item is not in the viewport, scroll to it
                if (
                    (activeItemContainer?.top! < (tocContainer?.top! + TOC_HEADING_OFFSET))
                    ||
                    (activeItemContainer?.bottom! >= tocContainer?.bottom!)
                ) {
                    activeListItemElement.scrollIntoView({ block: "center", inline: "nearest" });
                } else if (
                    activeItemContainer?.top! >= tocContainer?.top!
                    &&
                    activeItemContainer?.bottom! < tocContainer?.bottom!
                ) {
                    // Using "nearest" instead of any other block option, because other options will cause the main page to scroll unintentionally
                    activeListItemElement.scrollIntoView({ block: "nearest", inline: "nearest" });
                }
            }
        }, {
            // Set the threshold to 0.4 so that the active section changes when the section is 40% visible in the viewport
            threshold: 0.4
        });

        const pageSections = document.querySelectorAll('details summary, details div.detailsContent');

        pageSections.forEach((section): void => {
            pageContentScrollObserver.current.observe(section);
        });

        // Create an observer to monitor when the table of contents is sticky so that its height adjusts accordingly
        tableOfContentsIsStickyObserver.current = new IntersectionObserver(
            ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
            { threshold: [1] }
        );
        tableOfContentsIsStickyObserver.current.observe(tableOfContentsElement);

        //Cleanup function to remove observers
        return () => {
            pageSections.forEach((section): void => {
                pageContentScrollObserver.current.unobserve(section);
            });
            tableOfContentsIsStickyObserver.current.unobserve(tableOfContentsElement);
        };
    }, []);

    return (
        <ul className="tableOfContents" ref={tableOfContentsRef}>
            {items.map((item: TableOfContentsItem): JSX.Element => {
                return (
                    <li key={item.elementId}
                        className={activeSection === item.elementId ? "tableOfContents__item--active" : ""}
                        ref={activeSection === item.elementId ? activeListItemRef : undefined}>
                        <HashLink to={`#${item.elementId}`}>{item.summary}</HashLink>
                    </li>
                );
            })}
        </ul>
    );
};