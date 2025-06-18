import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Cart from './Components/Cart/Cart';
import { CartProvider } from './Context/CartContext';

function App() {
  const [showFilter, setShowFilter] = useState(false);

  const handleToggleFilter = () => setShowFilter(prev => !prev);

  return (
    <CartProvider>
      <Header onToggleFilter={handleToggleFilter} />
      <Routes>
        <Route path="/" index exact element={<Home showFilter={showFilter} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
