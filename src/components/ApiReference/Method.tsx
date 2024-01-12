import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import CodeSample from "../CodeSamplesContainer/CodeSample";
import { Page } from "..";
import { PageTitleProps } from "../PageTitle/PageTitle";
import { HeaderSections } from "../Header/headerSectionsEnum";
import { TableOfContentsItem } from "../TableOfContents/TableOfContents";
import RenderStringWithUrl from "./utils/renderStringWithUrl";
import "./reference.scss";

interface MethodParameter {
    name: string;
    description: string;
    required: boolean;
}

interface MethodData {
    description: string;
    parameters: MethodParameter[];
    returns: string;
    example: string;
}

export default function Method(): JSX.Element {
    const { methodId = "" } = useParams();
    const storedMethodData: MethodData = JSON.parse(sessionStorage[methodId]);
    const parameters: MethodParameter[] = storedMethodData.parameters;
    const returnValueDescriptions: string = storedMethodData.returns;
    const codeSample: string = storedMethodData.example;

    const introductionParagraph: ReactNode = <div className="paragraph">{RenderStringWithUrl(methodId, JSON.parse(sessionStorage[methodId]).description)}</div>;

    const parameterParagraphs: ReactNode = (
        <div className="paragraph">
            {parameters.map((parameter: MethodParameter) => (
                <div key={parameter.name}>
                    <h3>{parameter.name}</h3>
                    {RenderStringWithUrl(parameter.name, parameter.description)}
                </div>
            ))}
        </div>
    );

    const returnDescription: ReactNode = <div className="paragraph">{RenderStringWithUrl(methodId, returnValueDescriptions)}</div>;

    const tryMeCodeBlock: ReactNode = (
        <div className="paragraph">
            <CodeSample language="javascript" code={codeSample} />
        </div>
    );

    const pageTitle: PageTitleProps = {
        title: methodId + " (...)",
        breadCrumbItems: ["MYG", "API Reference", "Methods", methodId + " (...)"]
    };

    const pageSections: TableOfContentsItem[] = [
        {
            elementId: "introduction",
            summary: "Introduction",
            details: introductionParagraph
        },
        {
            elementId: "parameters",
            summary: "Parameters",
            details: parameterParagraphs
        },
        {
            elementId: "returnValue",
            summary: "Return value",
            details: returnDescription
        },
        {
            elementId: "codeSample",
            summary: "Code samples",
            details: tryMeCodeBlock
        }
    ];

    return <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections} />;
}