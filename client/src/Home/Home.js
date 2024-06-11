import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false); // Set loading to false after fetch is done
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please log in to add products to the cart.',
      });
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/add`, { productId, quantity: 1 }, {
        params: { userId } // Pass userId as a query parameter
      });
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product added to cart successfully',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error adding product to cart',
      });
      console.error('Error adding product to cart', error);
    }
  };

  return (
    <div className="home-container">
      <h2>Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-item">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: Rs.{product.price}</p>
                <p>Category: {product.category}</p>
                <p>Stock: {product.stock}</p>
                <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}
    </div>
  );
};
export default Home;