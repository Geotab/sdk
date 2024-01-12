import { IconSearch } from "@geotab/react-component-library";
import SearchNotFoundGraphic from "./assets/SearchNotFoundGraphic.svg";
import "./SearchModal.scss";

interface GuidesTab {
    inputValue: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const APISearchResults = ({ inputValue }: GuidesTab) => (
    <div className="tab-container">
        <div className="tab-content">
            {inputValue === "" ? (
                <div className="empty-search-container">
                    <IconSearch />
                    <span>Start typing to search API Reference</span>
                </div>
            ) : (
                <div className="tab-search-not-found">
                    <img src={SearchNotFoundGraphic} alt="search not found" />
                    <p>
                        No results found for <strong>"{inputValue}"</strong>
                    </p>
                    <p>Try using different keywords, or broadening your search.</p>
                </div>
            )}
        </div>
    </div>
);

export default APISearchResults;