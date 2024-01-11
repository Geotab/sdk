import { Button } from '@geotab/react-component-library';
import myGParser from './utils/myGParser';
import RenderStringWithUrl from './utils/renderStringWithUrl';
import sortAlphabetical from './utils/sortAlphabetical';
import { Link } from 'react-router-dom';
import { Page } from "..";
import { PageTitleProps } from "../PageTitle/PageTitle";
import { HeaderSections } from "../Header/headerSectionsEnum";
import { TableOfContentsItem } from "../TableOfContents/TableOfContents";

interface PropertyDescription {
    name: string, 
    description: string
};

interface ObjectDetails {
    description: string,
    properties: PropertyDescription[]
};

type ObjectEntry = [string, ObjectDetails];

let request: XMLHttpRequest = new XMLHttpRequest();
request.open("GET", "https://mypreview.geotab.com/sdk.xml", false);
request.send();
let xml: Document | null = request.responseXML;

const pageTitle: PageTitleProps = {
    "title": "Objects",
    "breadCrumbItems": ["MYG", "API Reference", "Objects"]
};

const pageSections: TableOfContentsItem[] = [

];

const objects: ObjectEntry[] = Object.entries(myGParser(xml, 'object', ['T:Geotab.Checkmate.ObjectModel', 'T:Geotab.Checkmate.API', 'P:Geotab.Checkmate.ObjectModel', 'M:Geotab.Checkmate.API.#ctor', 'F:Geotab.Checkmate.ObjectModel']) as { [key: string]: ObjectDetails }).sort(sortAlphabetical);
const objectItems: JSX.Element[] = objects.map((objectDetails: ObjectEntry) => {
    sessionStorage.setItem(objectDetails[0], JSON.stringify(objectDetails[1]));
    let pageSectionObject: TableOfContentsItem = {
        "elementId": objectDetails[0],
        "summary": objectDetails[0],
        "details": RenderStringWithUrl(objectDetails[1].description)
    };

    pageSections.push(pageSectionObject);

    return ( 
        <div className="paragraph" id={objectDetails[0]}>
            <h3 className="objects__object-title">
                {objectDetails[0]}
                <Link to={`./${objectDetails[0]}`} className="objects__view-button">
                    <Button>View</Button>
                </Link>
            </h3>
            <p>{RenderStringWithUrl(objectDetails[1].description)}</p>
        </div>
    )
});

export default function Objects(): JSX.Element {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            {objectItems}
        </Page>
    );
};