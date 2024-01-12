import { ReactNode, useState } from "react";
import { IconChevronUp, IconChevronDown } from "@geotab/react-component-library";
import { TableOfContentsItem } from "../TableOfContents/TableOfContents";
import "./accordion.scss";

interface AccordionProps {
    summary: string;
    p: ReactNode;
    id: string;
}

export function createAccordions(pageSections: TableOfContentsItem[]): JSX.Element[] {
    return pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId} key={section.elementId} />);
}

export default function Accordion(props: AccordionProps) {
    const [expanded, setExpanded] = useState<boolean>(true);

    let icon: JSX.Element = expanded ? <IconChevronUp /> : <IconChevronDown />;

    function handleToggle(e: React.ChangeEvent<HTMLDetailsElement>) {
        const detailsElement = e.target as HTMLDetailsElement;
        setExpanded(detailsElement.open);
    }

    return (
        <details onToggle={handleToggle} open>
            <summary id={props.id}>
                {props.summary}
                {icon}
            </summary>
            <div className="detailsContent" id={props.id}>
                {props.p}
            </div>
        </details>
    );
}
