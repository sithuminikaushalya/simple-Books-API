const { getBooks, getBookById, addBook, updateBook, deleteBook } = require('../src/controllers/bookController');
const books = require('../src/models/bookModel');

// Mock the books array
jest.mock('../src/models/bookModel', () => ({
    slice: jest.fn(),
    find: jest.fn(),
    findIndex: jest.fn(),
    push: jest.fn(),
    splice: jest.fn()  
}));

describe('Book Controller', () => {
    
    describe('getBooks', () => {
        it('should return a paginated list of books', () => {
            const req = { query: { page: 1, limit: 2 } };
            const res = { json: jest.fn() };

            // Mock books data
            books.slice.mockReturnValueOnce([{ id: 1, name: 'Book 1', author: 'Author 1' }]);

            getBooks(req, res);

            expect(books.slice).toHaveBeenCalledWith(0, 2);
            expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Book 1', author: 'Author 1' }]);
        });
    });

    describe('getBookById', () => {
        it('should return a book by ID', () => {
            const req = { params: { id: 1 } };
            const res = { json: jest.fn() };

            // Mock book data
            books.find.mockReturnValueOnce({ id: 1, name: 'Book 1', author: 'Author 1' });

            getBookById(req, res);

            expect(books.find).toHaveBeenCalledWith(expect.any(Function));
            expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Book 1', author: 'Author 1' });
        });

        it('should return a 404 error if book not found', () => {
            const req = { params: { id: 999 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Mocking the case when no book is found
            books.find.mockReturnValueOnce(undefined);

            getBookById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
        });
    });

    describe('addBook', () => {
        it('should add a new book', () => {
            const req = { body: { name: 'Book 2', author: 'Author 2', publishedYear: 2023 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Mock the new book addition
            books.push.mockImplementationOnce((book) => books.push(book));

            addBook(req, res);

            expect(books.push).toHaveBeenCalledWith(expect.objectContaining({
                name: 'Book 2',
                author: 'Author 2',
                publishedYear: 2023
            }));
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                name: 'Book 2',
                author: 'Author 2',
                publishedYear: 2023
            }));
        });
    });

    describe('updateBook', () => {
        it('should update an existing book', () => {
            const req = { params: { id: 1 }, body: { name: 'Updated Book' } };
            const res = { json: jest.fn() };

            // Mock the book to update
            books.find.mockReturnValueOnce({ id: 1, name: 'Book 1', author: 'Author 1' });

            updateBook(req, res);

            expect(books.find).toHaveBeenCalledWith(expect.any(Function));
            expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Updated Book', author: 'Author 1' });
        });

        it('should return a 404 error if book not found to update', () => {
            const req = { params: { id: 999 }, body: { name: 'Updated Book' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Mock the case when no book is found
            books.find.mockReturnValueOnce(undefined);

            updateBook(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
        });
    });

    describe('deleteBook', () => {
        it('should delete a book by ID', () => {
            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            // Mocking the find and splice operations
            books.findIndex.mockReturnValueOnce(0);
            books.splice.mockImplementationOnce(() => {});  // Mocking the splice behavior

            deleteBook(req, res);

            expect(books.findIndex).toHaveBeenCalledWith(expect.any(Function));
            expect(books.splice).toHaveBeenCalledWith(0, 1);  // Check splice usage
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });

        it('should return a 404 error if book not found to delete', () => {
            const req = { params: { id: 999 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Mocking the case when no book is found
            books.findIndex.mockReturnValueOnce(-1);

            deleteBook(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
        });
    });
});
