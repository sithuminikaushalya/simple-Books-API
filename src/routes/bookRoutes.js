const express = require('express');
const { getBooks, getBookById, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const validateBook = require('../middlewares/validateBook');

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', validateBook, addBook);
router.put('/:id', validateBook, updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
