import { useRef, useEffect, useCallback, useState } from "react";
import { IconSearch, IconClipboard, IconServer, Tabs } from "@geotab/react-component-library";
import { IconClearSearch } from "./icons/IconClearSearch";
import AllSearchResultContent from "./AllSearchResultContent";
import APISearchResults from "./APISearchResults";
import GuidesSearchResult from "./GuidesSearchResult";
import apiReferenceData from "./mockSearchData";
import MiniSearch from "minisearch";

import "./SearchModal.scss";


let miniSearch = new MiniSearch({
  fields: ["title"], // fields to index for full-text search
  storeFields: ["title", "category"], // fields to return with search results
  searchOptions: {
    fuzzy: 0.2,
    prefix: true
  }
});
miniSearch.addAll(apiReferenceData);

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
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
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    let results = miniSearch.search(e.currentTarget.value);
    console.log(results);
  };

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

  return (
    <div
      className={`search-modal-backdrop ${isOpen ? "" : "hidden"}`}
      role="button"
      aria-labelledby="search-modal"
    >
      <div className="search-modal-container" ref={modalRef}>
        <div className="search-modal-header-container">
          <div className="search-modal-input-field-container">
            <div
              className={`search-modal-input-field ${inputValue && "search-has-value"
                }`}
            >
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
            defaultTab=""
            tabs={[
              {
                name: "All",
                content: <AllSearchResultContent inputValue={inputValue} />,
                icon: IconSearch,
                disabled: false,
              },
              {
                name: "API Reference",
                content: <APISearchResults inputValue={inputValue} />,
                icon: IconServer,
                disabled: false,
              },
              {
                name: "Guides",
                content: <GuidesSearchResult inputValue={inputValue} tab="tabname" />,
                icon: IconClipboard,
                disabled: false,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
