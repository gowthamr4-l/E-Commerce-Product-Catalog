import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaSearch, FaShoppingCart, FaFilter, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../../Context/CartContext';

function Header({ onToggleFilter }) {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Shop<span>Nest</span></h1>
      </div>


      {/* Hamburger for mobile */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Nav links */}
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <button className="filter-btn" onClick={onToggleFilter}>
          <FaFilter /> Filter
        </button>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/about" onClick={toggleMenu}>About Us</Link>
        <Link to="/contact" onClick={toggleMenu}>Contact Us</Link>
        <Link to="/cart" className="cart-link" onClick={toggleMenu}>
          <FaShoppingCart className="cart-icon" />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          Cart
        </Link>
      </nav>
    </header>
  );
}

export default Header;
