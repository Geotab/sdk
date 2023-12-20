import { ReactNode } from "react";
import RenderStringWithUrl from './renderStringWithUrl';
import { useParams } from "react-router-dom";
import Accordion from "../../../components/Accordion/Accordion";
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
    
    const paramTable: ReactNode = ( 
    <div className="paragraph">
            <table className="table-container">
                <tbody>
                        {parameters.map((parameter: any) => 
                            <tr>
                                <td>{parameter.name}</td>
                                <td>{RenderStringWithUrl(parameter.description)}</td>
                            </tr>
                        )}
                </tbody>
            </table>
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
        "title": methodId + " (...)",
        "breadCrumbItems": ["MYG", "API Reference", "Methods", methodId + " (...)"]
    };

    const pageSections: TableOfContentsItem[] = [
        {
            "elementId": "introduction",
            "summary": "Introduction"
        },
        {
            "elementId": "parameters",
            "summary": "Parameters",
            "details": paramTable
        },
        {
            "elementId": "returnValue",
            "summary": "Return Value",
            "details": returnDescription
        },
        {
            "elementId": "codeSample",
            "summary": "Try Me"
        }
    ];

    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div>
                <summary className="heading" id="introduction">Introduction</summary>
                <div className="paragraph">
                    {RenderStringWithUrl(JSON.parse(sessionStorage[methodId]).description)}
                </div>
            </div>
            <Accordion summary={pageSections[1].summary} p={pageSections[1].details} id={pageSections[1].elementId}/>
            <Accordion summary={pageSections[2].summary} p={pageSections[2].details} id={pageSections[2].elementId}/>
            <div>
                <summary className="heading" id="codeSample">Try Me</summary>
                {tryMeCodeBlock}
            </div>
        </Page>
    );
}; 