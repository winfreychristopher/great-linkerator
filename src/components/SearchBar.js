import React, { useState } from "react";

import { fetchLinksByTag } from "../api";

import "./SearchBar.css";

const SearchBar = ({ setResults }) => {
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const links = await fetchLinksByTag(text);
    setResults(links);
  }

  return (
    <div id="search-container">
      <h3>Look up links here...</h3>
      <form onSubmit={handleSubmit}>
        <input
          id="search"
          type="text"
          placeholder="Search links.."
          value={text}
          onChange={handleTextChange}
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
