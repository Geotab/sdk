import React, { useState, useEffect } from "react";
import { IconSearch } from "@geotab/react-component-library";
import SearchNotFoundGraphic from "./assets/SearchNotFoundGraphic.svg";
import { APIReferenceIcon } from "./assets/APIReferenceIcon";
import apiReferenceData from "./mockSearchData";
import "./SearchModal.scss";

interface ApiReferenceItem {
  id: number;
  title: string;
  group: string;
}

interface AllTabContentProps {
  inputValue: string;
}

const AllTabContent = ({ inputValue }: AllTabContentProps) => {
  const [hasResults, setHasResults] = useState(false);
  const [searchResults, setSearchResults] = useState<ApiReferenceItem[]>([]);

  // Function to fetch search results
  const fetchSearchResults = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return apiReferenceData.filter((item) =>
      item.title.toLowerCase().includes(lowercaseQuery)
    );
  };

  useEffect(() => {
    if (inputValue.trim() !== "") { // Check if input is not empty or just spaces
      const results = fetchSearchResults(inputValue);
      setHasResults(results.length > 0);
      setSearchResults(results);
    } else {
      setHasResults(false);
      setSearchResults([]); // Clear results when input is empty
    }
  }, [inputValue]);

  return (
    <div className={`tab-container ${hasResults ? "has-results" : ""}`}>
      <div className="tab-content">
        {inputValue === "" ? (
          <>
            <div className="tab-search-icon">
              <IconSearch width="13px" height="12px" />
            </div>
            <span>Start typing to search</span>
          </>
        ) : (
          <>
            {hasResults ? (
              <div className="custom-styling-for-results">
                {/* Render custom styling when there are results */}
                <ul className="horizontal-results-list">
                  {searchResults.map((item) => (
                    <div className="results-item-container">
                      <li key={item.id}>
                        <div className="results-icon-container">
                          <APIReferenceIcon />
                        </div>
                        <div className="result-search-name">
                          <span className='result-item-title'>{item.title}</span>
                          <span className='result-item-group'>{item.group}</span>
                        </div>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="tab-search-not-found">
                {/* Render the "tab-search-not-found" when there are no results */}
                <img
                  src={SearchNotFoundGraphic}
                  alt="Search not found graphic"
                />
                <p>
                  No results found for <strong>"{inputValue}"</strong>
                </p>
                <p>Try using different keywords, or broadening your search.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllTabContent;
