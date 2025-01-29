const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/books', bookRoutes);

app.get('/', (req, res) => res.send('Books API is running'));

module.exports = app;
