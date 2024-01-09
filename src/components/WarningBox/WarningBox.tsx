import React, { ReactNode } from "react";
// TODO: change to new icon when available
import { IconException } from "@geotab/react-component-library";
import "./warningBox.scss";

interface warningBoxProps {
    children: ReactNode;
}

export default function WarningBox (props: warningBoxProps) {
    return (
        <div className="warning-box">
            <div className="icon-container">
                <IconException />
            </div>
            <div>{props.children}</div>
        </div>
    );
}
