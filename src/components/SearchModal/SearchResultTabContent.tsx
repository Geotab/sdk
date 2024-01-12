import SearchNotFound from "./SearchNotFound";
import SearchPrompt from "./SearchPrompt";
import ResultsList from "./ResultsList";
import { SearchResult } from "minisearch";
import { SearchSections } from "./searchSectionsEnum";

import "./searchModal.scss";

interface TabContent {
    inputValue: string;
    tab: string;
    searchResults: SearchResult[];
}

const resultSwitch = (tab: string, results: SearchResult[]): SearchResult[] => {
    switch (tab) {
        case SearchSections.APIReference:
            return results.filter((result) => result.category === "reference");
        case SearchSections.Guides:
            return results.filter((result) => result.category === "guide");
        case SearchSections.All:
        default:
            return results;
    }
};

const showContent = (inputString: string, results: SearchResult[]): JSX.Element => {
    if (inputString === "") {
        return <SearchPrompt />;
    } else if (results.length === 0) {
        return <SearchNotFound searchString={inputString} />;
    } else {
        return <ResultsList results={results} />;
    }
};

export default function SearchResultTabContent(props: TabContent): JSX.Element {
    let filteredResults: SearchResult[] = resultSwitch(props.tab, props.searchResults);
    return (
        <div className={props.searchResults.length > 0 ? "tab-container search-results-container" : "tab-container"}>
            <div>{showContent(props.inputValue, filteredResults)}</div>
        </div>
    );
}
