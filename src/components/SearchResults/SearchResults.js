import React from "react";
import TrackList from "../TrackList/TrackList";

import "./SearchResults.css";
const SearchResults = ({ searchResults, onAdd }) => {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      {/* Add a TrackList component */}
      <TrackList playList={searchResults} isRemoval={false} onAdd={onAdd} />
    </div>
  );
};

export default SearchResults;
