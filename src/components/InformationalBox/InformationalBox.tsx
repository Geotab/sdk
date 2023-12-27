import React, { ReactNode } from "react";
import "./informationalBox.scss";
import { IconInformation } from "./icons";

interface InformationalBoxProps {
    children: ReactNode;
}

export default function InformationalBox(props: InformationalBoxProps) {
    return (
        <div className="informational-box">
            <div className="icon-container">
                <IconInformation />
            </div>
            <div>
                {props.children}
            </div>
        </div>
    );
}