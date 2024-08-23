import request from 'supertest';
import app from '../index.js'; // Import your Express app

describe('User API', () => {
    it('should get all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    // Add more tests as needed
});


