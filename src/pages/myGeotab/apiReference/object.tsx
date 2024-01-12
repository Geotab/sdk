import { ReactNode } from "react";
import RenderStringWithUrl from "./renderStringWithUrl";
import { useParams } from "react-router-dom";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
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

    const introductionParagraph: ReactNode = <div className="paragraph">{RenderStringWithUrl(objectDescription)}</div>;

    const propertyParagaphs: ReactNode = (
        <div className="paragraph">
            {properties.map((property: any) => (
                // TODO: fix missing "key" prop for element in iterator
                // eslint-disable-next-line react/jsx-key
                <div>
                    <h3>{property.name}</h3>
                    <p>{RenderStringWithUrl(property.description)}</p>
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
            details: propertyParagaphs
        }
    ];

    return <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections} />;
}
