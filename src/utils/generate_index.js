import React from "react";

import MyGeotabIntroduction from "../pages/myGeotab/introduction";
import { useMiniSearch } from "react-minisearch";
import apiReferenceData from "../components/SearchModal/mockSearchData";

const documents = [
    { id: 1, name: 'Agata' },
    { id: 2, name: 'Finn' },
    // …etc
]

const miniSearchOptions = {
    fields: ["title"],
  };

export function useSearchTest() {
    //const { search, searchResults } = useMiniSearch(apiReferenceData, miniSearchOptions);
    //console.log("in search!");
    //console.log(searchIndex);
}