
import React, { useState, useEffect } from "react";

import { fetchAllLinks } from "../api";
import SearchBar from "./SearchBar";
import LinkModal from "./LinkModal";
import SearchResults from "./SearchResults";

import "./index.css";


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
        <h1>The Great Linkerator</h1>
        <h2>{message}</h2>
        <SearchBar setResults={setResults} />
        <SearchResults results={results} />
      </div>
      <div className="modal-container">
        <button onClick={() => setIsOpen(true)}>Create Link</button>
        <LinkModal open={isOpen} onClose={() => setIsOpen(false)}>
          Test
        </LinkModal>
      </div>
    </>

  );
};

export default App;
