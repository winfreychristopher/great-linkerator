import React, { useState } from "react";

import { fetchLinksByTag, fetchLinksByUrl } from "../api";

import "./SearchBar.css";

const SearchBar = ({ setResults }) => {
  const [text, setText] = useState("");
  const [urlText, setUrlText] = useState("")

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleTextChange2 = (event) => {
    setUrlText(event.target.value);
  };
  
  async function handleSubmit(event) {
    event.preventDefault();
    const links = await fetchLinksByTag(text);
    setResults(links);
  }

  async function handleSubmit2(event) {
    event.preventDefault()
    const urls = await fetchLinksByUrl(urlText)
    setResults(urls)
  }
  return (   

  <>
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
    <div>
      <h3>Look up Urls here...</h3>
      <form onSubmit={handleSubmit2}>
        <input
          id="search"
          type="text"
          placeholder="Search Urls.."
          value={urlText}
          onChange={handleTextChange2}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  </>
    
  );
};

export default SearchBar;
