import request from 'supertest';
import app from '../../server';

describe('Board Controller', () => {
    let token: string;

    beforeAll(async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpass' });
        token = response.body.token;
    });

    it('should get boards', async () => {
        const response = await request(app)
            .get('/api/boards')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should create a new board', async () => {
        const response = await request(app)
            .post('/api/boards')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'New Board' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'New Board');
    });
});
