import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">Paradise Nursery</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Plants</Link>
        <Link to="/cart" className="cart-link">
          Cart 
          {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
