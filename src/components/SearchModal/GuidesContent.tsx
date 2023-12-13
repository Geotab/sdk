import React from "react";
import { IconSearch } from "@geotab/react-component-library";
import SearchNotFoundGraphic from "./assets/SearchNotFoundGraphic.svg";
import "./SearchModal.scss";

interface GuidesTab {
  inputValue: string;
}

const GuidesContent = ({ inputValue }: GuidesTab) => {
  return (
    <div className="tab-container">
      <div className="tab-content">
        {inputValue === "" ? (
          <div className="empty-search-container">
            <IconSearch width="13px" height="12px" />
            <span>Start typing to search guides</span>
          </div>
        ) : (
          <div className="tab-search-not-found">
            <img src={SearchNotFoundGraphic} alt="Search not found graphic" />
            <p>No results found for <strong>"{inputValue}"</strong></p>
            <p>Try using different keywords, or broadening your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidesContent;
