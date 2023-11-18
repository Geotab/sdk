import React from "react";
import Header from "../Header/Header";
import { PageTitle, TableOfContents } from "..";
import { PageTitleProps } from "../PageTitle/PageTitle";
import "./pageContent.scss";

interface PageContentProps {
    isLandingPage: boolean;
    pageTitle?: PageTitleProps;
    pageContent: React.ReactNode;
}

export default function PageContent(props: PageContentProps) {
    return (
        <div>
            <Header isLandingPage={props.isLandingPage} />
            {props.pageTitle && <PageTitle title={props.pageTitle.title} breadCrumbItems={props.pageTitle.breadCrumbItems} /> }
            <div className="pageContent">
                <div>
                    {props.pageContent}
                </div>
                <TableOfContents />
            </div>
        </div>
    );
}
