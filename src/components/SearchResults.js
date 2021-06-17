import React from "react";
import LinkCard from "./LinkCard";

const SearchResults = ({ results }) => {
  console.log(results, 'THIS IS RESULTS')
  return (
    <div id="results">
      <h3>Found {results.length} link(s):</h3>
      <div className="Link-list">
        {results.map((result) => (
          <LinkCard key={result.id} {...result} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
