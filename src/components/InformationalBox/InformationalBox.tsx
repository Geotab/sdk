import React, { ReactNode } from "react";
// TODO: change to new icon when available
import { IconException } from "@geotab/react-component-library";
import "./informationalBox.scss";

interface InformationalBoxProps {
    children: ReactNode;
}

export default function InformationalBox(props: InformationalBoxProps) {
    return (
        <div className="informational-box">
            <div className="icon-container">
                <IconException />
            </div>
            <div>{props.children}</div>
        </div>
    );
}
