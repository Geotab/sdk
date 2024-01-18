import { ReactNode } from "react";
import RenderStringWithUrl from "./utils/renderStringWithUrl";
import { useParams } from "react-router-dom";
import { Page } from "..";
import { PageTitleProps } from "../PageTitle/PageTitle";
import { HeaderSections } from "../Header/headerSectionsEnum";
import { TableOfContentsItem } from "../TableOfContents/TableOfContents";
import "./reference.scss";

interface ObjectProperty {
    name: string;
    description: string;
}

interface ObjectData {
    description: string;
    properties: ObjectProperty[];
}

export default function Object(): JSX.Element {
    const { objectId = "" } = useParams();
    const storedObjectData: ObjectData = JSON.parse(sessionStorage[objectId]);
    const objectDescription: string = storedObjectData.description;
    const properties: ObjectProperty[] = storedObjectData.properties;

    const introductionParagraph: ReactNode = <div className="paragraph">{RenderStringWithUrl(objectId, objectDescription)}</div>;

    const propertyParagraphs: ReactNode = (
        <div className="paragraph">
            {properties.map((property: ObjectProperty, index: number) => (
                <div key={`param-${index}`}>
                    <h2>{property.name}</h2>
                    {RenderStringWithUrl(property.name, property.description)}
                </div>
            ))}
        </div>
    );

    const pageTitle: PageTitleProps = {
        title: objectId,
        breadCrumbItems: ["MYG", "API Reference", "Objects", objectId]
    };

    const pageSections: TableOfContentsItem[] = [
        {
            elementId: "introduction",
            summary: "Introduction",
            details: introductionParagraph
        },
        {
            elementId: "properties",
            summary: "Properties",
            details: propertyParagraphs
        }
    ];

    return <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections} />;
}