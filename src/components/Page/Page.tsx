import React from "react";
import Navbar from "../Navbar/Navbar";
import PageContent from "../PageContent/PageContent";
import { PageTitleProps } from "../PageTitle/PageTitle";
import "./Page.scss";
import { HeaderSections } from "../Header/headerSectionsEnum";
import { TableOfContentsItem } from "../TableOfContents/TableOfContents";

interface PageProps {
    section: string;
    pageTitle?: PageTitleProps;
    tableOfContents?: TableOfContentsItem[];
    children: React.ReactNode;
}

export default function Page(props: PageProps) {
    const isLandingPage: boolean = props.section === HeaderSections.Landing;

    return (
        <div className={!isLandingPage ? "page" : ""}>
            {!isLandingPage && <Navbar section={props.section} />}
            <PageContent isLandingPage={isLandingPage} pageTitle={props.pageTitle} pageContent={props.children} tableOfContents={props.tableOfContents} />
        </div>
    );
}
