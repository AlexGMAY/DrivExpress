const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taxiRoutes = require('./routes/taxiRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const { authMiddleware } = require('./middlewares/authMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/taxis',  authMiddleware, taxiRoutes);
app.use('/api/bookings',  authMiddleware, bookingRoutes);

module.exports = app;
