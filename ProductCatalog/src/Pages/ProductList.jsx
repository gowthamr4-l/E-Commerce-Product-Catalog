import React, { useState, useEffect } from 'react';
import '../Styles/Product.css';
import ProductCard from '../Components/ProductCard/ProductCard';

function ProductList({ showFilter }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products', {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (selectedCategory) {
      temp = temp.filter(p => p.category === selectedCategory);
    }

    if (selectedRating) {
      temp = temp.filter(p => p.rating && p.rating.rate >= Number(selectedRating));
    }

    setFilteredProducts(temp);
  }, [selectedCategory, selectedRating, products]);

  if (loading) return <div className="loader">Loading products...</div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="product-page">
      {showFilter && (
        <div className="filter-panel">
          <h3>Filter Products</h3>

          <div className="filter-group">
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Minimum Rating:</label>
            <select
              value={selectedRating}
              onChange={e => setSelectedRating(e.target.value)}
            >
              <option value="">Any</option>
              <option value="4">4 stars & up</option>
              <option value="3">3 stars & up</option>
              <option value="2">2 stars & up</option>
            </select>
          </div>

          <button
            className="clear-btn"
            onClick={() => {
              setSelectedCategory('');
              setSelectedRating('');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>No products match your filters.</p>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;
