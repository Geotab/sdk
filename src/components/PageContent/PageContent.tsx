import React from "react";
import Header from "../Header/Header";

export default function PageContent(props: any) {
    return (
        <div>
            <Header isLandingPage={props.isLandingPage} />
            <div className="grayBackground pageContent">{props.children}</div>
        </div>
    );
}
