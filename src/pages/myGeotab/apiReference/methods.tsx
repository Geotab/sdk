import React from 'react';
import { Header, Button } from '@geotab/react-component-library';
import myGParser from './myGParser';
import RenderStringWithUrl from './renderStringWithUrl';

let request = new XMLHttpRequest();
request.open("GET", "https://mypreview.geotab.com/sdk.xml", false);
request.send();
let xml: any = request.responseXML;

const methods = Object.entries(myGParser(xml, 'method', ['M:CheckmateServer.Web.WebMethods', 'M:Geotab.Checkmate.Database.DataStore']));
const methodItems = methods.map((d: any) => <div id={d[0]}><Header title={d[0]}><Button>View</Button></Header><p>{RenderStringWithUrl(d[1].description)}</p></div>);

export default function Methods() {
    return (
        <div>
            <Header title="Methods"></Header>
            {methodItems}
        </div>
    );
};