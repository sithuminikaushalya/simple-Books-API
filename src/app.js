const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bookRoutes = require('./routes/bookRoutes');

const app = express(); // Create the Express application

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(helmet()); // Add security headers to responses
app.use(express.json());

// Define the routes
app.use('/books', bookRoutes);

// A simple test route for checking if the server is running
app.get('/', (req, res) => res.send('Books API is running'));

module.exports = app;
