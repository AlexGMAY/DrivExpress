const request = require('supertest');
const app = require('../app'); 
const mongoose = require('mongoose');
require('dotenv').config();

let token; // Store token for protected routes
let taxiId; // Store taxi ID for booking

beforeAll(async () => {
  // Log in to get the token
  const loginResponse = await request(app).post('/api/users/login').send({
    email: 'john@example.com', // Use a valid email from your test users
    password: '123456', // Use the valid password
  });
  token = loginResponse.body.token; // Save the token for later use

  // Create a taxi for testing
  const taxiRes = await request(app)
    .post('/api/taxis')
    .set('Authorization', `Bearer ${token}`) // Include the token here
    .send({
      driverName: 'Jane Doe',
      taxiNumber: 'ABC 5678',
      phoneNumber: '0987654321',
      status: 'available',
    });
  taxiId = taxiRes.body._id; // Store the taxi ID for booking
});

afterAll(async () => {
  // Disconnect from the database
  await mongoose.disconnect();
});

describe('Booking API', () => {
  it('Should create a booking', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`) // Include the token here
      .send({
        customerName: 'Alice',
        pickupLocation: '123 Main St',
        dropoffLocation: '456 Elm St',
        taxiId: taxiId, // Use the taxiId from above
        bookingTime: new Date().toISOString(),
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('customerName', 'Alice');
    expect(res.body).toHaveProperty('pickupLocation', '123 Main St');
    expect(res.body).toHaveProperty('dropoffLocation', '456 Elm St');
    expect(res.body).toHaveProperty('status', 'pending'); // Assuming default status
  });

  it('Should fetch booking details', async () => {
    const bookingRes = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`) // Include the token here
      .send({
        customerName: 'Bob',
        pickupLocation: '789 Oak St',
        dropoffLocation: '321 Pine St',
        taxiId: taxiId,
        bookingTime: new Date().toISOString(),
      });

    const bookingId = bookingRes.body._id; // Get booking ID from response

    const res = await request(app)
      .get(`/api/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${token}`); // Include the token here

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('customerName', 'Bob');
    expect(res.body).toHaveProperty('pickupLocation', '789 Oak St');
  });

  it('Should return 404 for a non-existent booking', async () => {
    const res = await request(app)
      .get('/api/bookings/nonexistentbookingid')
      .set('Authorization', `Bearer ${token}`); // Include the token here
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Booking not found');
  });
});

