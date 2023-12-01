import React from 'react';
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
    "title": "Objects",
    "breadCrumbItems": ["MYG", "API Reference", "Objects"]
};

const pageSections: TableOfContentsItem[] = [

];

const objects = Object.entries(myGParser(xml, 'object', ['T:Geotab.Checkmate.ObjectModel', 'P:Geotab.Checkmate.ObjectModel']));
const objectItems = objects.map((objectDetails: any) => {
    sessionStorage.setItem(objectDetails[0], JSON.stringify(objectDetails[1]));
    let pageSectionObject = {
        "elementId": objectDetails[0],
        "summary": objectDetails[0],
        "details": RenderStringWithUrl(objectDetails[1].description)
    };

    pageSections.push(pageSectionObject);

    return ( 
        <div id={objectDetails[0]}>
            <Header title={objectDetails[0]}>
                <Button>View</Button>
            </Header>
            <p>{RenderStringWithUrl(objectDetails[1].description)}</p>
        </div>
    )
})


export default function Objects() {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            {objectItems}
        </Page>
        // <div>
        //     <Header title="Objects"></Header>
        //     {objectItems}
        // </div>
    );
};