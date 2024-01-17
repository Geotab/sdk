import { IconSearch } from "@geotab/react-component-library";

export default function SearchPrompt(): JSX.Element {
    return (
        <div className="empty-search-container">
            <IconSearch />
            <span>Start typing to search</span>
        </div>
    );
}