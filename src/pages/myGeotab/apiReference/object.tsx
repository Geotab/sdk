import { ReactNode } from "react";
import RenderStringWithUrl from './renderStringWithUrl';
import { useParams } from "react-router-dom";
import Accordion from "../../../components/Accordion/Accordion";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import "./reference.scss";

export default function Object() {
    const { objectId = "" } = useParams();
    const storedObjectData = JSON.parse(sessionStorage[objectId]);
    const objectDescription = storedObjectData.description;
    const properties = storedObjectData.properties;

    const propertyParagaphs: ReactNode = (
        <div className="paragraph">
            {properties.map((property: any) =>
                <div>
                    <h3>{property.name}</h3>
                    <p>{RenderStringWithUrl(property.description)}</p>
                </div>
            )}
        </div>
    );

    const pageTitle: PageTitleProps = {
        "title": objectId,
        "breadCrumbItems": ["MYG", "API Reference", "Objects", objectId]
    };

    const pageSections: TableOfContentsItem[] = [
        {
            "elementId": "introduction",
            "summary": "Introduction"
        }, 
        {
            "elementId": "properties",
            "summary": "Properties",
            "details": propertyParagaphs
        }
    ];

    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div>
                <summary className="heading" id="introduction">Introduction</summary>
                <div className="paragraph">
                    {RenderStringWithUrl(objectDescription)}
                </div>
            </div>
            <Accordion summary={pageSections[1].summary} p={pageSections[1].details} id={pageSections[1].elementId}/>
        </Page>
    )
};