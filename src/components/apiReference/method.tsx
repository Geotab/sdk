import { ReactNode } from "react";
import RenderStringWithUrl from './renderStringWithUrl';
import { useParams } from "react-router-dom";
import CodeSample from "../CodeSamplesContainer/CodeSample";
import { Page } from "..";
import { PageTitleProps } from "../PageTitle/PageTitle";
import { HeaderSections } from "../Header/headerSectionsEnum";
import { TableOfContentsItem } from "../TableOfContents/TableOfContents";
import "./reference.scss";

interface MethodParameter {
    name: string,
    description: string,
    required: boolean
};

interface MethodData {
    description: string,
    param: MethodParameter[],
    returns: string,
    example: string
};

export default function Method(): JSX.Element {
    const { methodId = "" } = useParams();
    const storedMethodData: MethodData = JSON.parse(sessionStorage[methodId]);
    const parameters: MethodParameter[] = storedMethodData.param;
    const returnValueDescriptions: string = storedMethodData.returns;
    const codeSample: string = storedMethodData.example;
    
    const introductionParagraph: ReactNode = (
        <div className="paragraph">
            {RenderStringWithUrl(JSON.parse(sessionStorage[methodId]).description)}
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
            code={codeSample} />
        </div>
    );

    const pageTitle: PageTitleProps = {
        "title": methodId + " (...)",
        "breadCrumbItems": ["MYG", "API Reference", "Methods", methodId + " (...)"]
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
            "summary": "Return value",
            "details": returnDescription
        },
        {
            "elementId": "codeSample",
            "summary": "Code samples",
            "details": tryMeCodeBlock
        }
    ];

    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections} />
    );
}; 