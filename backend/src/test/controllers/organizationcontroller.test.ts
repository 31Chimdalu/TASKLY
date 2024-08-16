import request from 'supertest';
import app from '../../server';

describe('Organization Controller', () => {
    let token: string;

    beforeAll(async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpass' });
        token = response.body.token;
    });

    it('should create a new organization', async () => {
        const response = await request(app)
            .post('/api/organizations')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'New Organization' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'New Organization');
    });
});
