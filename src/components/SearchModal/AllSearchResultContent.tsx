import React, { useState, useEffect } from "react";
import { IconSearch } from "@geotab/react-component-library";
import { APIReferenceIcon } from "./assets/APIReferenceIcon";
import SearchNotFoundGraphic from "./assets/SearchNotFoundGraphic.svg";
import apiReferenceData from "./mockSearchData";
import "./SearchModal.scss";

interface ApiReferenceItem {
  id: number;
  title: string;
  group: string;
}

interface AllSearchResultContentProps {
  inputValue: string;
}

const highlightMatch = (text: string, query: string) => {
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <span className="search-result-match" key={index}>
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

const AllSearchResultContent = ({ inputValue }: AllSearchResultContentProps) => {
  const [hasResults, setHasResults] = useState(false);
  const [searchResults, setSearchResults] = useState<ApiReferenceItem[]>([]);

  const fetchSearchResults = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return apiReferenceData.filter((item) =>
      item.title.toLowerCase().includes(lowercaseQuery)
    );
  };

  useEffect(() => {
    const trimmedInputValue = inputValue.trim();
    if (trimmedInputValue === "") {
      setHasResults(false);
      setSearchResults([]);
    } else {
      const results = fetchSearchResults(trimmedInputValue);
      setHasResults(results.length > 0);
      setSearchResults(results);
    }
  }, [inputValue]);

  return (
    <div className={`tab-container ${hasResults ? "search-has-results" : ""}`}>
      <div className="tab-content">
        {inputValue === "" ? (
          <div className="empty-search-container">
              <IconSearch />
            <span>Start typing to search</span>
          </div>
        ) : hasResults ? (
          <div className="custom-styling-for-results">
            <ul className="horizontal-results-list">
              {searchResults.map((item) => (
                <div key={item.id} className="results-item-container">
                  <li>
                    <div className="results-icon-container">
                      <APIReferenceIcon />
                    </div>
                    <div className="result-search-name">
                      <span className="result-item-title">
                        {highlightMatch(item.title, inputValue)}
                      </span>
                      <span className="result-item-group">
                        {highlightMatch(item.group, inputValue)}
                      </span>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <div className="tab-search-not-found">
            <img src={SearchNotFoundGraphic} alt="Search not found graphic" />
            <p>
              No results found for <span className="search-not-found-text">"{inputValue}"</span>
            </p>
            <p>Try using different keywords, or broadening your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSearchResultContent;
