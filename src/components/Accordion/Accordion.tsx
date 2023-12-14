import { ReactNode, useState } from "react";
import { IconChevronUp, IconChevronDown } from "@geotab/react-component-library";
import "./accordion.scss";
import { TableOfContentsItem } from "../TableOfContents/TableOfContents";

interface AccordionContents {
    summary: string;
    p: ReactNode;
    id: string;
}

export function createAccordions(pageSections: TableOfContentsItem[]) {
    return pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId} key={section.elementId} />);
}

export default function Accordion(props: AccordionContents) {
    const [expanded, setExpanded] = useState<boolean>(true);

    let Icon: ReactNode = expanded ? <IconChevronUp/> : <IconChevronDown/>;

    function handleToggle(e: React.ChangeEvent<HTMLDetailsElement>) {
        const detailsElement = e.target as HTMLDetailsElement;
        setExpanded(detailsElement.open);
    };

    return (<details onToggle={handleToggle} open>
        <summary id={props.id}>
            {props.summary}
            {Icon}
        </summary>
        {props.p}
    </details>);
}