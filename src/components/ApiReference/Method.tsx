import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { Page } from "..";
import { PageTitleProps } from "../PageTitle/PageTitle";
import { HeaderSections } from "../Header/headerSectionsEnum";
import { TableOfContentsItem } from "../TableOfContents/TableOfContents";
import RenderStringWithUrl from "./utils/renderStringWithUrl";
import "./reference.scss";
import { CodeSamples, CodeSamplesContainer } from "../CodeSamplesContainer";
import { methodsCodeSamples } from "./utils/methodsCodeSamples";

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
    const javascriptCodeSampleFromXML: string = storedMethodData.example;
    let codeSamples: CodeSamples = methodsCodeSamples[methodId];
    console.log(javascriptCodeSampleFromXML.replaceAll("               ", "\t").trim());
    if (javascriptCodeSampleFromXML !== "") {
        codeSamples.javascript = javascriptCodeSampleFromXML
            .replaceAll("               ", "    ")
            .replaceAll("             ", "    ")
            .replace(/(\s*)}\);/, "\n});")
            .trim();
    }

    const introductionParagraph: ReactNode = <div className="paragraph">{RenderStringWithUrl(methodId, JSON.parse(sessionStorage[methodId]).description)}</div>;

    const parameterParagraphs: ReactNode = (
        <div className="paragraph">
            {parameters.map((parameter: MethodParameter, index: number) => (
                <div key={`param-${index}`}>
                    <h2>{parameter.name}</h2>
                    {RenderStringWithUrl(parameter.name, parameter.description)}
                </div>
            ))}
        </div>
    );

    const returnDescription: ReactNode = <div className="paragraph">{RenderStringWithUrl(methodId, returnValueDescriptions)}</div>;

    const tryMeCodeBlock: ReactNode = (
        <div className="paragraph">
            <CodeSamplesContainer {...codeSamples} />
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