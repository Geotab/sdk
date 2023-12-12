import React from "react";
import { IconSearch } from "@geotab/react-component-library";
import SearchNotFoundGraphic from "./assets/SearchNotFoundGraphic.svg";
import "./SearchModal.scss";

interface AllTabContentProps {
    inputValue: string;
}

const AllTabContent = ({ inputValue }: AllTabContentProps) => {
    return (
        <div className="tab-container">
            <div className="tab-content">
                {inputValue === "" ? (
                    <>
                        <div className="tab-search-icon">
                            <IconSearch width="12px" height="12px" />
                        </div>
                        <span>Start typing to search</span>
                    </>
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

export default AllTabContent;
