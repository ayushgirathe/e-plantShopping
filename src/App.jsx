import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function App() {
  // State to manage which page to display
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'products', 'cart'

  // Handle Get Started button click - sets state to show product list
  const handleGetStarted = () => {
    setCurrentPage('products');
  };

  // Navigate to products page
  const handleShowProducts = () => {
    setCurrentPage('products');
  };

  // Navigate to cart page
  const handleShowCart = () => {
    setCurrentPage('cart');
  };

  // Landing Page Component
  const LandingPage = () => (
    <div className="landing-container hero-section">
      <div className="hero-content">
        <h1>Welcome to Paradise Nursery</h1>
        <p>Your one-stop shop for beautiful houseplants and gardening essentials</p>
        <button 
          onClick={handleGetStarted} 
          className="get-started-btn"
        >
          Get Started
        </button>
      </div>
    </div>
  );

  // Render based on current page state
  if (currentPage === 'landing') {
    return <LandingPage />;
  }

  if (currentPage === 'cart') {
    return <Cart onBackToProducts={handleShowProducts} />;
  }

  // Default: show product list
  return <ProductList onViewCart={handleShowCart} />;
}

export default App;
