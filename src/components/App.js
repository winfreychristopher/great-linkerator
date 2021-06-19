import React, { useState, useEffect } from "react";

import { fetchAllLinks } from "../api";
import SearchBar from "./SearchBar";
import LinkModal from "./LinkModal";
import SearchResults from "./SearchResults";
import Links from "./links";

import "./index.css";
import CreateLinks from "./addLink";

import linkIcon from "../Icon/Link.png";

const App = () => {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchAllLinks()
      .then((response) => {
        console.log(response);
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  });

  return (
    <>
      <div className="App">
        <div className="title-container">
          <img className="Icon" src={linkIcon} alt={""} />
          <h1 className="title">The Great Linkerator</h1>
        </div>
        <h2>{message}</h2>
        <SearchBar results={results} setResults={setResults} />
        <div className="modal-container">
          <button onClick={() => setIsOpen(true)}>Create Link</button>
          <LinkModal open={isOpen} onClose={() => setIsOpen(false)}>
            <CreateLinks />
          </LinkModal>
        </div>
        <SearchResults results={results} setResults={setResults} />
        <Links results={results} setResults={setResults} />
      </div>
    </>
  );
};

export default App;
