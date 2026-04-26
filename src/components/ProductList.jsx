import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartSlice';

const ProductList = ({ onViewCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  // State to track if product is added
  const isAdded = (productName) => addedToCart[productName];

  // Handle Add to Cart
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  // Sample plant data (you can replace with your actual data)
  const plants = [
    // Aromatic Plants
    { id: 1, name: 'Lavender', price: 15.99, image: '/images/lavender.jpg', category: 'Aromatic' },
    { id: 2, name: 'Rosemary', price: 12.99, image: '/images/rosemary.jpg', category: 'Aromatic' },
    { id: 3, name: 'Mint', price: 8.99, image: '/images/mint.jpg', category: 'Aromatic' },
    { id: 4, name: 'Basil', price: 9.99, image: '/images/basil.jpg', category: 'Aromatic' },
    { id: 5, name: 'Thyme', price: 10.99, image: '/images/thyme.jpg', category: 'Aromatic' },
    { id: 6, name: 'Sage', price: 11.99, image: '/images/sage.jpg', category: 'Aromatic' },
    // Medicinal Plants
    { id: 7, name: 'Aloe Vera', price: 18.99, image: '/images/aloe.jpg', category: 'Medicinal' },
    { id: 8, name: 'Tulsi', price: 14.99, image: '/images/tulsi.jpg', category: 'Medicinal' },
    { id: 9, name: 'Echinacea', price: 16.99, image: '/images/echinacea.jpg', category: 'Medicinal' },
    // Succulents
    { id: 10, name: 'Jade Plant', price: 19.99, image: '/images/jade.jpg', category: 'Succulents' },
    { id: 11, name: "Burro's Tail", price: 13.99, image: '/images/burros-tail.jpg', category: 'Succulents' },
    { id: 12, name: 'Echeveria', price: 11.99, image: '/images/echeveria.jpg', category: 'Succulents' },
  ];

  // Group plants by category
  const categories = [...new Set(plants.map(p => p.category))];

  return (
    <div>
      {/* Header with Cart Icon */}
      <div className="product-header">
        <h1>Paradise Nursery</h1>
        <button onClick={onViewCart} className="cart-icon-btn">
          🛒 Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
        </button>
      </div>

      <div className="products-container">
        {categories.map(category => (
          <div key={category} className="category-section">
            <h2>{category} Plants</h2>
            <div className="products-grid">
              {plants
                .filter(plant => plant.category === category)
                .map(plant => (
                  <div key={plant.id} className="product-card">
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>${plant.price.toFixed(2)}</p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAdded(plant.name)}
                      className={isAdded(plant.name) ? 'added-btn' : 'add-btn'}
                    >
                      {isAdded(plant.name) ? '✓ Added to Cart' : 'Add to Cart'}
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
