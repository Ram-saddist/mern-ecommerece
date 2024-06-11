import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const userId = localStorage.getItem('userId'); // Get userId from localStorage

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart?userId=${userId}`);
        setCartItems(response.data.items);
      } catch (error) {
        setMessage('Failed to load cart items');
        console.error('Error fetching cart items', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleAddToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/add`, {
        userId,
        productId,
        quantity
      });
      setMessage(response.data.message);
      fetchCartItems(); // Refresh cart items
    } catch (error) {
      setMessage('Failed to add item to cart');
      console.error('Error adding item to cart', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart?userId=${userId}`);
      setCartItems(response.data.items);
    } catch (error) {
      setMessage('Failed to load cart items');
      console.error('Error fetching cart items', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading cart items...</p>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {message && <p>{message}</p>}
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.product._id} className="cart-item">
              <h3>{item.product.name}</h3>
              <p>{item.product.description}</p>
              <p>Price: ${item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;