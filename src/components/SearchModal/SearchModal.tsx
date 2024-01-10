import { useRef, useEffect, useCallback, useState, ComponentType } from "react";
import { IconSearch, IconClipboard, IconServer, Tabs, TabConfig, IconProps } from "@geotab/react-component-library";
import { IconClearSearch } from "./icons/IconClearSearch";
import SearchResultTabContent from "./SearchResultTabContent";
import searchIndex from "./mockSearchData";
import MiniSearch, { SearchResult } from "minisearch";
import { SearchSections } from "./searchSectionsEnum";

import "./SearchModal.scss";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEARCH_RESULTS_LIMIT: number = 50;

const resultCategories: Record<string, ComponentType<IconProps>> = {
  [SearchSections.All]: IconSearch,
  [SearchSections.APIReference]: IconServer,
  [SearchSections.Guides]: IconClipboard,
}

let miniSearch: MiniSearch = new MiniSearch({
  fields: ["title", "content", "headers"], // fields to index for full-text search
  storeFields: ["title", "category", "breadCrumb", "link"], // fields to return with search results
  searchOptions: {
    fuzzy: 0.2,
    prefix: true,
    boost: {
      "title": 3,
      "headers": 2
    }
  }
});
miniSearch.addAll(searchIndex); //TODO: should we do this asynchronously? how do we handle the UI until it's ready

export default function SearchModal({ isOpen, onClose }: SearchModalProps): JSX.Element | null {
  const modalRef: React.MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
  const inputRef: React.MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleOutsideClick = useCallback(
    (event: MouseEvent): void => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setInputValue("");
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setInputValue("");
        onClose();
      }
    },
    [onClose]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value.trim());
  };

  //debounce for search bar
  useEffect(() => {
    const getSearchResults = setTimeout(() => {
      setSearchResults(miniSearch.search(inputValue).slice(0, SEARCH_RESULTS_LIMIT));
    }, 400);
    return () => clearTimeout(getSearchResults);
  }, [inputValue]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("mousedown", handleOutsideClick);
      inputRef.current?.focus();
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick, handleKeyDown]);

  if (!isOpen) return null;

  let tabsArray: TabConfig[] = Object.keys(resultCategories).map(category => {
    return ({
      name: category,
      content: <SearchResultTabContent
        inputValue={inputValue}
        tab={category}
        searchResults={searchResults} />,
      icon: resultCategories[category]
    });
  });

  return (
    <div
      className={`search-modal-backdrop ${isOpen ? "" : "hidden"}`}
      role="button"
      aria-labelledby="search-modal"
    >
      <div className="search-modal-container" ref={modalRef}>
        <div className="search-modal-header-container">
          <div className="search-modal-input-field-container">
            <div className={`search-modal-input-field ${inputValue && "search-has-value"}`}>
              <div className="modal-search-icon">
                <IconSearch />
              </div>
              <input
                ref={inputRef}
                className="modal-search-input"
                type="search"
                placeholder="Search"
                value={inputValue}
                onChange={handleChange}
              />
              {inputValue && (
                <button
                  className="clear-search-button"
                  onClick={() => setInputValue("")}
                >
                  <IconClearSearch />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="search-modal-tabs-container">
          <Tabs
            tabs={tabsArray}
          />
        </div>
      </div>
    </div>
  );
}
