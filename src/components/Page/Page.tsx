import React from "react";
import Navbar from "../Navbar/Navbar";
import PageContent from "../PageContent/PageContent";
import "./Page.scss";

export default function Page(props: any) {
    return (
        <div className="page">
            {props.section !== "Landing" && <Navbar section={props.section} />}
            <PageContent isLandingPage={props.section === "Landing"}>{props.children}</PageContent>
        </div>
    );
}
