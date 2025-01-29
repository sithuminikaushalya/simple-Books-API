const request = require('supertest');
const app = require('../src/app');

describe('Books API', () => {
    it('should return an empty array initially', async () => {
        const res = await request(app).get('/books');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('should add a book', async () => {
        const res = await request(app)
            .post('/books')
            .send({ name: 'Book 1', author: 'Author 1', publishedYear: 2022 });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Book 1');
    });

    it('should return 404 for a non-existing book', async () => {
        const res = await request(app).get('/books/999');
        expect(res.status).toBe(404);
    });
});
