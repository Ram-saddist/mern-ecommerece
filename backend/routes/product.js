const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  const { role } = req.body;
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only admins can add products.' });
  }
  next();
};

// Add a new product
router.post('/add', isAdmin, async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
    });
    console.log("new product",newProduct)
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
