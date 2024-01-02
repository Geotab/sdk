import { ReactNode } from "react";
import RenderStringWithUrl from './renderStringWithUrl';
import sortAlphabetical from './sortAlphabetical';
import { Link, useParams } from 'react-router-dom';
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
// import "./reference.scss";

export default function Method() {
    const { methodId = "" } = useParams();
    const storedMethodData = JSON.parse(sessionStorage[methodId]);
    const methodDescription = storedMethodData.description;
    const methodRemarks = storedMethodData.remarks;
    const parameters = storedMethodData.param;
    const returnValueDescriptions = storedMethodData.returns;

    const parameterParagaphs: ReactNode = (
        <div className="paragraph">
            {parameters.map((property: any) =>
                <div>
                    <h3>{property.name}</h3>
                    <p>{RenderStringWithUrl(property.description)}</p>
                </div>
            )}
        </div>
    );

    const pageTitle: PageTitleProps = {
        "title": methodId,
        "breadCrumbItems": ["MYA", "API Reference", "Methods", methodId + " (...)"]
    };

    const pageSections: TableOfContentsItem[] = [
        {
            "elementId": "introduction",
            "summary": "Introduction"
        },
        {
            "elementId": "parameters",
            "summary": "Parameters",
            "details": parameterParagaphs
        }
    ];
    
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div>
                <summary className="heading" id="introduction">Introduction</summary>
                <div className="paragraph">
                    {RenderStringWithUrl(methodDescription)}
                </div>
            </div>
        </Page>
    );
};