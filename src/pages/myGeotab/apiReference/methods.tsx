import { Header, Button } from '@geotab/react-component-library';
import myGParser from './myGParser';
import RenderStringWithUrl from './renderStringWithUrl';
import { Link } from 'react-router-dom';
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";

//ToDo: Update URLs
let request = new XMLHttpRequest();
request.open("GET", "https://mypreview.geotab.com/sdk.xml", false);
request.send();
let xml: any = request.responseXML;

const pageTitle: PageTitleProps = {
    "title": "Methods",
    "breadCrumbItems": ["MYG", "API Reference", "Methods"]
};

const pageSections: TableOfContentsItem[] = [

];

const methods = Object.entries(myGParser(xml, 'method', ['M:CheckmateServer.Web.WebMethods', 'M:Geotab.Checkmate.Database.DataStore']));
const methodItems = methods.map((methodDetails: any) => {
    sessionStorage.setItem(methodDetails[0], JSON.stringify(methodDetails[1]));
    let pageSectionObject = {
        "elementId": methodDetails[0],
        "summary": methodDetails[0],
        "details": RenderStringWithUrl(methodDetails[1].description)
    };

    pageSections.push(pageSectionObject);

    return (
        <div id={methodDetails[0]}>
            <Header title={methodDetails[0]}>
                <Link to={`/myGeotab/apiReference/methods/${methodDetails[0]}`}>
                    <Button>View</Button>
                </Link>
            </Header>
            <p>{RenderStringWithUrl(methodDetails[1].description)}</p>
        </div>
    )
});

export default function Methods() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            {methodItems}
            {/* {pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId}></Accordion>)} */}
        </Page>
        // <div>
        //     <Header title="Methods"></Header>
        //     {methodItems}
        // </div>
    );
};