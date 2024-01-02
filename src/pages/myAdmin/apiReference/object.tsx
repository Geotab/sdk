import { ReactNode } from "react";
import RenderStringWithUrl from './renderStringWithUrl';
import { useParams } from 'react-router-dom';
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
// import "./reference.scss";

export default function Object() {
    const { objectId = "" } = useParams();
    const storedObjectData = JSON.parse(sessionStorage[objectId]);
    const objectDescription = storedObjectData.description;
    const objectProperties = storedObjectData.properties;


    const objectDescriptionParagaph: ReactNode = (
        <div className="paragraph">
            {RenderStringWithUrl(objectDescription)}
        </div>
    )

    const propertyParagaphs: ReactNode = (
        <div className="paragraph">
            {objectProperties.map((property: any) =>
                <div>
                    <h3>{property.name}</h3>
                    <p>{RenderStringWithUrl(property.description)}</p>
                </div>
            )}
        </div>
    );

    const pageTitle: PageTitleProps = {
        "title": objectId,
        "breadCrumbItems": ["MYA", "API Reference", "Objects", objectId]
    };

    const pageSections: TableOfContentsItem[] = [
        {
            "elementId": "introduction",
            "summary": "Introduction",
            "details": objectDescriptionParagaph
        },
        {
            "elementId": "parameters",
            "summary": "Parameters",
            "details": propertyParagaphs
        }
    ];
    
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>

        </Page>
    );
};