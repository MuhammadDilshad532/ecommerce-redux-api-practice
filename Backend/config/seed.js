const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const connectDB = require('./database');

const products = [
  {
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 999.99,
    category: 'Electronics',
    stock: 10,
    imageUrl: 'https://example.com/laptop.jpg',
  },
  {
    name: 'Phone',
    description: 'Smartphone',
    price: 599.99,
    category: 'Electronics',
    stock: 20,
    imageUrl: 'https://example.com/phone.jpg',
  },
  {
    name: 'Book',
    description: 'Programming book',
    price: 29.99,
    category: 'Books',
    stock: 50,
    imageUrl: 'https://example.com/book.jpg',
  },
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products seeded');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();