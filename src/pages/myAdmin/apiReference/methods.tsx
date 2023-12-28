import { Button } from '@geotab/react-component-library';
import myAParser from './myAParser';
import RenderStringWithUrl from './renderStringWithUrl';
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
    "title": "Methods",
    "breadCrumbItems": ["MYA", "API Reference", "Methods"]
};

const pageSections: TableOfContentsItem[] = [

];

const methods = Object.entries(myAParser(xml, "method", ["M:Geotab.Internal.MyAdmin.Api.Handlers.Legacy.MyAdminApiService"]));
console.log(methods);
console.log(sessionStorage);
const methodItems = methods.map((methodDetails: any) => {
    sessionStorage.setItem(methodDetails[0], JSON.stringify(methodDetails[1]));
    let pageSectionObject = {
        "elementId": methodDetails[0],
        "summary": methodDetails[0],
        "details": RenderStringWithUrl(methodDetails[1].description)
    };

    pageSections.push(pageSectionObject);

    return (
        <div className="paragraph" id={methodDetails[0]}>
            <h3 className="methods__method-title">
                {methodDetails[0]}
                <Link to={`/method/${methodDetails[0]}`} className="methods__view-button">
                    <Button>View</Button>
                </Link>
            </h3>
            <p>{RenderStringWithUrl(methodDetails[1].description)}</p>
        </div>
    );
});

export default function Methods() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            <div>Hi</div>
            {methodItems}
        </Page>
    );
};