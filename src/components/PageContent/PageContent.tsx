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

export default function PageContent({ isLandingPage, pageTitle, pageContent, tableOfContents }: PageContentProps): JSX.Element {
    return (
        <div className="pageContent__container">
            <Header isLandingPage={isLandingPage} />
            {pageTitle && <PageTitle title={pageTitle.title} breadCrumbItems={pageTitle.breadCrumbItems} />}
            <div className={isLandingPage ? "pageContent__landing" : "pageContent"}>
                <div className={isLandingPage ? "" : "pageContent__scrollableArea"}>
                    {pageContent}
                    {!pageTitle?.title.toLowerCase().match(/^(methods|method|objects|object)$/) && createAccordions(tableOfContents || [])}
                </div>
                {tableOfContents && <TableOfContents items={tableOfContents} />}
            </div>
            <Footer />
        </div>
    );
}
