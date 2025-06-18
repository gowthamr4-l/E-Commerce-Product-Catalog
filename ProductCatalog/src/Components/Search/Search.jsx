import React from 'react';
import { FaSearch } from 'react-icons/fa'; // make sure you import this!

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <input
        type="search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default Search;
