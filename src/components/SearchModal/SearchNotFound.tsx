import {GraphicSearchNotFound} from "./assets/GraphicSearchNotFound";

export default function SearchNotFound(props: {searchString: string}) {
    return (
        <div className="tab-search-not-found">
            <GraphicSearchNotFound />
            <p>No results found for <strong>"{props.searchString}"</strong></p>
            <p>Try using different keywords, or broadening your search.</p>
        </div>
    );
};