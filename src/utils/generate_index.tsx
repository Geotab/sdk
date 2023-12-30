import React from "react";
import MiniSearch from "minisearch";

import MyGeotabIntroduction from "../pages/myGeotab/introduction";

const documents = [
    { id: 1, name: 'Agata' },
    { id: 2, name: 'Finn' },
    // …etc
]
const miniSearchOptions = { fields: ['name'] }

export async function searchTest(): Promise<void> {
    const searchIndex = await fetch("../pages/myGeotab/introduction").then(response => response.text() );
    console.log("in search!");
    console.log(searchIndex);
}