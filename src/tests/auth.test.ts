import request from 'supertest';
import app from "../index";

const testEmail = `user${Date.now()}@test.com`;

describe('Auth API', () => {
  describe('Signup', () => {
    it('should create user successfully', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        fullname: 'Test User',
        email: testEmail,
        password: 'Test@1234',
        confirmPassword: 'Test@1234',
        gender: 'Male',
        mobile: '9876543210'
      });

      expect(res.status).toBe(201);
      expect(res.body.data.token).toBeDefined();
    });

    it('should fail with missing fields', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        fullname: '',
        email: "",
        password: '',
        confirmPassword: '',
        gender: '',
        mobile: ''
      });
      expect(res.status).toBe(400);
    });

    it('should fail with invalid email or mobile', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        fullname: 'Test User',
        email: 'bademail',
        password: 'Test@1234',
        confirmPassword: 'Test@1234',
        gender: 'Male',
        mobile: '0000000000'
      });
      expect(res.status).toBe(400);
    });
  });


  describe('Login', () => {
    it('should authenticate valid user', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: testEmail,
        password: 'Test@1234'
      });

      expect(res.status).toBe(200);
      expect(res.body.data.token).toBeDefined();
    });

    it('should fail with wrong credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: testEmail,
        password: 'WrongPassword'
      });

      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/Invalid credentials/);
    });

    it('should fail if fields are missing', async () => {
      const res = await request(app).post('/api/auth/login').send({});
      expect(res.status).toBe(400);
    });
  });
});
