import { Button } from '@geotab/react-component-library';
import myAParser from './myAParser';
import RenderStringWithUrl from './renderStringWithUrl';
import sortAlphabetical from './sortAlphabetical';
import { Link } from 'react-router-dom';
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";

let request = new XMLHttpRequest();
request.open("GET", "/sdk-xml/MyAdminAPI.xml", false);
request.send();
let xml: any = request.responseXML;

const pageTitle: PageTitleProps = {
    "title": "Objects",
    "breadCrumbItems": ["MYA", "API Reference", "Objects"]
};

const pageSections: TableOfContentsItem[] = [

];

const objects = Object.entries(myAParser(xml, 'object', ["T:MyAdminApiLib.Geotab.MyAdmin.MyAdminApi.ObjectModel", "P:MyAdminApiLib.Geotab.MyAdmin.MyAdminApi.ObjectModel"])).sort(sortAlphabetical);
console.log(objects);
const objectItems = objects.map((objectDetails: any) => {
    sessionStorage.setItem(objectDetails[0], JSON.stringify(objectDetails[1]));
    let pageSectionObject = {
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

export default function Objects() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            {objectItems}
        </Page>
    );
};