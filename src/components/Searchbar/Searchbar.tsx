import React, { useState, ChangeEvent } from "react";
import "./searchbar.scss";

export default function SearchBar(props: any) {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="search-bar-input"
      />
    </div>
  );
}
