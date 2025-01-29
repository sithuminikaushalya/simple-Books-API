const books = require('../models/bookModel');

// Get all books (with optional pagination)
const getBooks = (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + Number(limit);
    res.json(books.slice(startIndex, endIndex));
};

// Get a book by ID
const getBookById = (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
};

// Add a new book
const addBook = (req, res) => {
    const { name, author, publishedYear } = req.body;
    const newBook = { id: books.length + 1, name, author, publishedYear };
    books.push(newBook);
    res.status(201).json(newBook);
};

// Update a book
const updateBook = (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    Object.assign(book, req.body);
    res.json(book);
};

// Delete a book
const deleteBook = (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Book not found" });

    books.splice(index, 1);
    res.status(204).send();
};

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook };
