import { ReactNode, useState } from "react";
import { IconChevronUp, IconChevronDown } from "@geotab/react-component-library";
import "./accordion.scss";

interface AccordianContents {
    summary: string;
    p: ReactNode;
}

export default function Accordion(props: AccordianContents) {
    const [expanded, setExpanded] = useState<boolean>(true);

    let Icon: ReactNode = expanded ? <IconChevronDown></IconChevronDown> : <IconChevronUp></IconChevronUp>;

    function handleToggle(): void {
        setExpanded(!expanded);
    };

    return (<details>
        <summary onClick={handleToggle}>
            {props.summary}
            {Icon}
        </summary>
        {props.p}
    </details>);
}