const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  const userId = req.query.userId; // Extract userId from query parameters
  console.log("userid from cart", userId, req.query);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
  req.userId = userId;
  next();
};

// Get the cart for a user
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate('items.product');
    if (!cart) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a product to the cart
router.post('/add', isAuthenticated, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      cart = new Cart({ user: req.userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update the quantity of a product in the cart
router.put('/update', isAuthenticated, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find((item) => item.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: 'Cart updated' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
