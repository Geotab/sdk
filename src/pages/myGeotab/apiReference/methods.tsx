import React from 'react';
import { Header, Button } from '@geotab/react-component-library';
import myGParser from './myGParser';
import RenderStringWithUrl from './renderStringWithUrl';
import { Link } from 'react-router-dom';

let request = new XMLHttpRequest();
request.open("GET", "https://mypreview.geotab.com/sdk.xml", false);
request.send();
let xml: any = request.responseXML;

const methods = Object.entries(myGParser(xml, 'method', ['M:CheckmateServer.Web.WebMethods', 'M:Geotab.Checkmate.Database.DataStore']));
console.log(methods);
const methodItems = methods.map((d: any) => {
    sessionStorage.setItem(d[0], JSON.stringify(d[1]));
    return (
        <div id={d[0]}>
            <Header title={d[0]}>
                <Link to={`/method/${d[0]}`}>
                    <Button>View</Button>
                </Link>
            </Header>
            <p>{RenderStringWithUrl(d[1].description)}</p>
        </div>
    )
});

export default function Methods() {
    return (
        <div>
            <Header title="Methods"></Header>
            {methodItems}
        </div>
    );
};