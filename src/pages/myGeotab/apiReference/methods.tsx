import { Button } from '@geotab/react-component-library';
import myGParser from './myGParser';
import RenderStringWithUrl from './renderStringWithUrl';
import sortAlphabetical from './sortAlphabetical';
import { Link } from 'react-router-dom';
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";

interface ParameterDescription {
    name: string;
    description: string;
    required: boolean;
}

interface MethodDetails {
    description: string;
    parameters: ParameterDescription[];
    example: string;
    returns: string;
};

type MethodEntry = [string, MethodDetails];

let methodItems: JSX.Element[];
let request: XMLHttpRequest = new XMLHttpRequest();
request.open("GET", "https://mypreview.geotab.com/sdk.xml", false);
request.send();
let xml: Document | null = request.responseXML;

const pageTitle: PageTitleProps = {
    title: "Methods",
    breadCrumbItems: ["MYG", "API Reference", "Methods"]
};

const pageSections: TableOfContentsItem[] = [];

if (xml === null) {
    console.log('');
} else {
    const methods: MethodEntry[] = Object.entries(myGParser(xml, 'method', ['M:CheckmateServer.Web.WebMethods', 'M:Geotab.Checkmate.Database.DataStore']) as { [key: string]: MethodDetails }).sort(sortAlphabetical);
    methodItems = methods.map((methodDetails: MethodEntry) => {
        sessionStorage.setItem(methodDetails[0], JSON.stringify(methodDetails[1]));
        let pageSectionObject: TableOfContentsItem = {
            "elementId": methodDetails[0],
            "summary": methodDetails[0]
        };

        pageSections.push(pageSectionObject);

        return (
            <div key={methodDetails[0]} className="paragraph" id={methodDetails[0]}>
                <h3 className="methods__method-title">
                    {methodDetails[0] + " (...)"}
                    <Link to={`./${methodDetails[0]}`} className="methods__view-button">
                        <Button>View</Button>
                    </Link>
                </h3>
                {RenderStringWithUrl(methodDetails[0], methodDetails[1].description)}
            </div>
        )
    });
}



export default function Methods(): JSX.Element {
    return (
        <Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
            {methodItems}
        </Page>
    );
}
