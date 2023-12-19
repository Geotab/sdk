import React from "react";
import Header from "../Header/Header";
import { Footer, PageTitle, TableOfContents } from "..";
import { PageTitleProps } from "../PageTitle/PageTitle";
import "./pageContent.scss";
import { TableOfContentsItem } from "../TableOfContents/TableOfContents";
import { createAccordions } from "../Accordion/Accordion";

interface PageContentProps {
    isLandingPage: boolean;
    pageTitle?: PageTitleProps;
    pageContent: React.ReactNode;
    tableOfContents?: TableOfContentsItem[];
}

export default function PageContent(props: PageContentProps) {
    return (
        <div className="pageContent__container">
            <Header isLandingPage={props.isLandingPage} />
            {props.pageTitle && <PageTitle title={props.pageTitle.title} breadCrumbItems={props.pageTitle.breadCrumbItems} /> }
            <div className={props.isLandingPage ? "pageContent__landing" : "pageContent"}>
                <div className={props.isLandingPage ? "" : "pageContent__scrollableArea"}>
                    {props.pageContent}
                    {!props.pageTitle?.title.toLowerCase().match(/^(methods|method|objects|object)$/) && createAccordions(props.tableOfContents || [])}
                </div>
                {props.tableOfContents && <TableOfContents items={props.tableOfContents} />}
            </div>
            <Footer />
        </div>
    );
}
