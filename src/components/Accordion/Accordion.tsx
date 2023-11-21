import { ReactNode, useState } from "react";
import { IconChevronUp, IconChevronDown } from "@geotab/react-component-library";
import "./accordion.scss";

interface AccordianContents {
    summary: string;
    p: ReactNode;
}

export default function Accordion(props: AccordianContents) {
    const [expanded, setExpanded] = useState<boolean>(true);

    let Icon: ReactNode = expanded ? <IconChevronUp className="icon-arrow"></IconChevronUp> : <IconChevronDown className="icon-arrow"></IconChevronDown>;

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