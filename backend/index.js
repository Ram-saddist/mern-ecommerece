const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://sivaram:sivaram@cluster0.0u7y0h0.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart'); // Import cart routes

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); // Use cart routes


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
