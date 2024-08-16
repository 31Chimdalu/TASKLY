import request from 'supertest';
import app from '../../server';

describe('Task Controller', () => {
    let token: string;
    let boardId: string;

    beforeAll(async () => {
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpass' });
        token = loginResponse.body.token;

        const boardResponse = await request(app)
            .post('/api/boards')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Board' });
        boardId = boardResponse.body.id;
    });

    it('should get tasks', async () => {
        const response = await request(app)
            .get(`/api/tasks/${boardId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should create a new task', async () => {
        const response = await request(app)
            .post(`/api/tasks/${boardId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'New Task', description: 'Task description' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', 'New Task');
    });
});

