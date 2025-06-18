import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaSearch, FaShoppingCart, FaFilter } from 'react-icons/fa';
import { useCart } from '../../Context/CartContext';


function Header({ onToggleFilter }) {

  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="header">
      <div className="logo">
        <h1>Shop<span>Nest</span></h1>
      </div>
      <div className="serch"></div>


      <div className="nav">
        <button className="filter-btn" onClick={onToggleFilter}>
          <FaFilter /> Filter
        </button>
        <Link to="/">Home</Link>
        <Link to="/about">About US</Link>
        <Link to="/contact">Contact US</Link>
        <Link to="/cart" className="cart-link">
          <FaShoppingCart className="cart-icon" />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          Cart
        </Link>
      </div>
    </div>
  );
}

export default Header;
