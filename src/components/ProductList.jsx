import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import Navbar from './Navbar';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});
  
  const categories = [...new Set(plants.map(p => p.category))];
  
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };
  
  const isAdded = (plantName) => addedToCart[plantName];
  
  return (
    <div>
      <Navbar />
      <div className="products-container">
        {categories.map(category => (
          <div key={category} className="category-section">
            <h2>{category} Plants</h2>
            <div className="products-grid">
              {plants.filter(p => p.category === category).map(plant => (
                <div key={plant.id} className="product-card">
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>${plant.price.toFixed(2)}</p>
                  <button 
                    onClick={() => handleAddToCart(plant)}
                    disabled={isAdded(plant.name)}
                  >
                    {isAdded(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
