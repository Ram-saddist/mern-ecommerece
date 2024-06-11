import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole'); // Get user role from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, description, price, category, stock, role: userRole };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products/add`, productData);
      if (response.status === 201) {
        setMessage('Product added successfully');
        navigate('/'); // Navigate to the homepage or another page after successful product addition
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response.data.message || 'Something went wrong');
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
