import React, { useState, useEffect } from 'react';
import ProductCard from '../Components/ProductCard/ProductCard';
import '../Styles/product.css'


function ProductList({ showFilter, searchQuery = '' }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products and categories
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('https://fakestoreapi.com/products').then(res => res.json()),
      fetch('https://fakestoreapi.com/products/categories').then(res => res.json())
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products.');
        setLoading(false);
      });
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedRating) {
      filtered = filtered.filter(p => Math.floor(p.rating?.rate || 0) >= Number(selectedRating));
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedRating, searchQuery, products]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

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