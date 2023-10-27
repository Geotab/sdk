import React from 'react';
import { Header, Button } from '@geotab/react-component-library';
import myGParser from './myGParser';
import createString from './createString';

let request = new XMLHttpRequest();
request.open("GET", "https://mypreview.geotab.com/sdk.xml", false);
request.send();
let xml: any = request.responseXML;

const objects = Object.entries(myGParser(xml, 'object', ['T:Geotab.Checkmate.ObjectModel', 'P:Geotab.Checkmate.ObjectModel']));
const objectItems = objects.map((d: any) => <div><Header title={d[0]}><Button>View</Button></Header><p>{createString(d[1].description)}</p></div>);

export default function Objects() {
    return (
        <div>
            <Header title="Objects"></Header>
            {objectItems}
        </div>
    );
};