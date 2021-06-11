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
    <div id="search">
      <h3>Look up links here...</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search links.."
          value={text}
          onChange={handleTextChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
