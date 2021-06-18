import React, { useState } from "react";

import { fetchLinksByTag, fetchLinksByUrl } from "../api";

import "./SearchBar.css";

const SearchBar = ({ results, setResults }) => {
  const [text, setText] = useState("");
  const [urlText, setUrlText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
    setUrlText(event.target.value);
  };
  async function handleSubmit(event) {
    event.preventDefault();

    const links = await fetchLinksByTag(text);
    const urls = await fetchLinksByUrl(urlText);

    if (urls.length > 0) {
      setResults(urls);
      console.log(urls.id);
    } else if (links.length > 0) {
      setResults(links);
    } else {
      return alert("0 Results Found");
    }
  }

  async function handleReset(event) {
    event.preventDefault();
    setText("")
    setUrlText("")
    setResults([]);
  }

  async function handlePopularity(event) {
    event.preventDefault();
    if (results) {
      const urlCounter = [...results].sort(function (a, b) {
        return parseInt(b.click_count) - parseInt(a.click_count);
      });
      setResults(urlCounter);
    }
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
          <button
            className="search-btn"
            type="submit"
            onClick={handlePopularity}
          >
            Sort By Popularity
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
