import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateQuantity, removeItem } from '../redux/cartSlice';
import Navbar from './Navbar';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector(state => state.cart);
  
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };
  
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };
  
  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };
  
  const handleCheckout = () => {
    alert('Coming Soon! Checkout functionality will be available soon.');
  };
  
  if (items.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <Link to="/products">
            <button className="continue-btn">Continue Shopping</button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price.toFixed(2)}</p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
                <button onClick={() => handleDelete(item.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
          <p>Total Items: {totalQuantity}</p>
          <div className="cart-buttons">
            <Link to="/products">
              <button className="continue-btn">Continue Shopping</button>
            </Link>
            <button onClick={handleCheckout} className="checkout-btn">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
