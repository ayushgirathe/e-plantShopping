import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from '../redux/cartSlice';

const CartItem = () => {
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

  const handleContinueShopping = () => {
    window.location.href = '/products';
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={handleContinueShopping} className="continue-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            {/* Item image, name, unit price */}
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Unit Price: ${item.price.toFixed(2)}</p>
              {/* Total cost for each item */}
              <p className="item-total">Item Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            
            {/* Quantity controls */}
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
      
      {/* Total cart amount */}
      <div className="cart-summary">
        <h2>Total Cart Amount: ${totalAmount.toFixed(2)}</h2>
        <p>Total Items: {totalQuantity}</p>
        
        <div className="cart-buttons">
          <button onClick={handleContinueShopping} className="continue-btn">
            Continue Shopping
          </button>
          <button onClick={handleCheckout} className="checkout-btn">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
