const express = require('express');
const { 
    createBooking, 
    getAllBookings, 
    getEmployeeBookings, 
    updateBooking, 
    cancelBooking 
} = require('../controllers/bookingController');

const router = express.Router();

// Booking Routes
router.post('/new', createBooking); // Create a new booking
router.get('/all', getAllBookings); // Get all bookings
router.get('/:employeeId', getEmployeeBookings); // Get bookings for a specific employee
router.put('/:id', updateBooking); // Update an existing booking
router.delete('/:id', cancelBooking); // Cancel a booking

module.exports = router;
