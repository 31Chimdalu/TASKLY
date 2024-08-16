import request from 'supertest';
import app from '../../server';

describe('Notification Controller', () => {
    let token: string;

    beforeAll(async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpass' });
        token = response.body.token;
    });

    it('should get notifications', async () => {
        const response = await request(app)
            .get('/api/notifications')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
