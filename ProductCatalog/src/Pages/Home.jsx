import React from 'react';
import ProductList from '../Pages/ProductList';

function Home({ searchQuery, showFilter }) {
  return (
    <ProductList 
      showFilter={showFilter}
      searchQuery={searchQuery}
    />
  );
}

export default Home;
