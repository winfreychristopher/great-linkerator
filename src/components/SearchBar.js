import React, { useState } from "react";

import { fetchLinksByTag, fetchLinksByUrl } from "../api";

import "./SearchBar.css";

const SearchBar = ({ setResults }) => {
  const [text, setText] = useState("");
  const [urlText, setUrlText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
    setUrlText(event.target.value)
  };
  async function handleSubmit(event) {
    event.preventDefault();
    
    const links = await fetchLinksByTag(text);
    const urls = await fetchLinksByUrl(urlText);

    if (urls.length > 0) {
      setResults(urls)
    } else if (links.length > 0) {
      setResults(links);
    } else {
      return alert("0 Results Found")
    }
    
  }

  async function handleReset(event) {
    event.preventDefault()
    setResults([])
  }

  return (
    <>
      <div id="search-container">
        <h3 className="search-title">Look up links here...</h3>
        <form className="search-bar" onSubmit={handleSubmit}>
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
          <button className="search-btn" type="submit" onClick={handleReset}>
            RESET
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
