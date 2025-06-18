import React from 'react';
import ProductList from './ProductList';

function Home({ showFilter }) {
  return (
    <div>
      <ProductList showFilter={showFilter} />
    </div>
  );
}

export default Home;
