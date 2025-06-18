import React from 'react';
import './ProductCard.css';
import { FaStar } from 'react-icons/fa'; 
import { useCart } from '../../Context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        loading="lazy"
      />
      <h3>{product.title}</h3>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>

     
      {product.rating && (
        <p className="product-rating">
          <FaStar className="star-icon" />
          {product.rating.rate.toFixed(1)} ({product.rating.count})
        </p>
      )}

      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
