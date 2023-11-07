import { ReactNode, useState } from "react";
import { IconChevronUp, IconChevronDown } from "@geotab/react-component-library";
import "./accordion.scss";

interface AccordianContents {
    summary: string;
    p: ReactNode;
}

export default function Accordion(props: AccordianContents) {
    const [expanded, setExpanded] = useState<boolean>(true);

    let Icon: ReactNode = expanded ? <IconChevronDown className="icon-arrow"></IconChevronDown> : <IconChevronUp className="icon-arrow"></IconChevronUp>;

    function handleToggle(): void {
        setExpanded(!expanded);
    };

    return (<details open>
        <summary onClick={handleToggle}>
            {props.summary}
            {Icon}
        </summary>
        {props.p}
    </details>);
}