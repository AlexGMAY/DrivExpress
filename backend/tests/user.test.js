// const request = require('supertest');
// const app = require('../app');
// const mongoose = require('mongoose');
// require('dotenv').config();

// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGO_URI);
// });

// afterAll(async () => {
//   await mongoose.disconnect();
// });

// describe('User Authentication', () => {
//     let token; // Store token for protected route tests
  
//     it('Should register a user', async () => {
//       const res = await request(app).post('/api/users/register').send({
//         name: 'John Doe',
//         email: 'john@example.com',
//         password: '123456',
//         role: 'employee',
//       });
//       expect(res.statusCode).toBe(201);
//       expect(res.body.user).toHaveProperty('email', 'john@example.com');
//     });
  
//     it('Should login a user and return a token', async () => {
//       const res = await request(app).post('/api/users/login').send({
//         email: 'john@example.com',
//         password: '123456',
//       });
//       expect(res.statusCode).toBe(200);
//       expect(res.body).toHaveProperty('token');
//       token = res.body.token; // Save token for further tests
//     });
  
//     it('Should fetch user profile with a valid token', async () => {
//         const res = await request(app)
//           .get('/api/users/profile')
//           .set('Authorization', `Bearer ${token}`); // Add 'Bearer ' prefix before token
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('email', 'john@example.com');
//       });      
// });
  
