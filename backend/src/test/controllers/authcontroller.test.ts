import request from 'supertest';
import app from '../../server'; // Ensure you export the express app in server.ts

describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
      organization: 'TestOrg',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('email');
  });

  it('should login a user', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
