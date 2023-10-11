import { ReactNode, useState } from "react";
import { IconArrowTop, IconChevronDown } from "@geotab/react-component-library";
import "./accordion.scss";

interface AccordianContents {
    summary: string;
    p: ReactNode;
}

export default function Accordion(props: AccordianContents) {
    const [expanded, setExpanded] = useState<boolean>(true);

    let Icon: ReactNode = expanded ? <IconChevronDown></IconChevronDown> : <IconArrowTop></IconArrowTop>;

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