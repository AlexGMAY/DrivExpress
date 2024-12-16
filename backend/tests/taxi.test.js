const request = require('supertest');
const app = require('../app'); // Assuming app.js is your main file
const mongoose = require('mongoose');
require('dotenv').config();

let token; // Store the token for protected routes

beforeAll(async () => {
  // Connect to the database
  await mongoose.connect(process.env.MONGO_URI);

  // Register and log in a user to get the token (you can adjust this based on your routes and requirements)
  const loginResponse = await request(app).post('/api/users/login').send({
    email: 'john@example.com',
    password: '123456',
  });
  token = loginResponse.body.token; // Save the token for later use
});

afterAll(async () => {
  // Disconnect from the database
  await mongoose.disconnect();
});

describe('Taxi API', () => {
  it('Should create a new taxi', async () => {
    const res = await request(app)
      .post('/api/taxis/new')
      .set('Authorization', `Bearer ${token}`) // Include the token here
      .send({
        driverName: 'John Doe',
        taxiNumber: 'XYZ 1234',
        phoneNumber: '1234567890',
        status: 'available',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('taxiNumber', 'XYZ 1234');
    expect(res.body).toHaveProperty('status', 'available');
  });

  it('Should fetch all taxis', async () => {
    const res = await request(app)
      .get('/api/taxis/all')
      .set('Authorization', `Bearer ${token}`); // Include the token here

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
