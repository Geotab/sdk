import { ReactNode } from "react";
import RenderStringWithUrl from './renderStringWithUrl';
import { useParams } from "react-router-dom";
import CodeSample from "../../../components/CodeSamplesContainer/CodeSample";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import "./reference.scss";

export default function Method() {
    const { methodId = "" } = useParams();
    const storedMethodData = JSON.parse(sessionStorage[methodId]);
    const parameters = storedMethodData.param;
    const returnValueDescriptions = storedMethodData.returns;
    const codeSample = storedMethodData.example;
    
    const introductionParagraph: ReactNode = (
        <div>
            <div className="paragraph">
                {RenderStringWithUrl(JSON.parse(sessionStorage[methodId]).description)}
            </div>
        </div>
    );

    const parameterParagaphs: ReactNode = (
        <div className="paragraph">
            {parameters.map((parameter: any) =>
                <div>
                    <h3>{parameter.name}</h3>
                    <p>{RenderStringWithUrl(parameter.description)}</p>
                </div>
            )}
        </div>
    );

    const returnDescription: ReactNode = (
        <div className="paragraph">
            <p>{RenderStringWithUrl(returnValueDescriptions)}</p>
        </div>
    );

    const tryMeCodeBlock: ReactNode = (
        <div className="paragraph">
            <CodeSample
            language="javascript"
            code={codeSample}></CodeSample>
        </div>
    );

    const pageTitle: PageTitleProps = {
        "title": methodId.toUpperCase() + " (...)",
        "breadCrumbItems": ["MYG", "API REFERENCE", "METHODS", methodId.toUpperCase() + " (...)"]
    };

    const pageSections: TableOfContentsItem[] = [
        {
            "elementId": "introduction",
            "summary": "Introduction",
            "details": introductionParagraph
        },
        {
            "elementId": "parameters",
            "summary": "Parameters",
            "details": parameterParagaphs
        },
        {
            "elementId": "returnValue",
            "summary": "Return Value",
            "details": returnDescription
        },
        {
            "elementId": "codeSample",
            "summary": "Try Me",
            "details": tryMeCodeBlock
        }
    ];

    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>

        </Page>
    );
}; 