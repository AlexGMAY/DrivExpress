const Booking = require('../models/Booking');
const Taxi = require('../models/Taxi');

// Create a booking
const createBooking = async (req, res) => {
    try {
        const { employeeId, taxiId, pickupLocation, dropOffLocation, pickupTime } = req.body;

        // Check if taxi exists
        const taxi = await Taxi.findById(taxiId);
        if (!taxi) {
            return res.status(404).json({ message: 'Taxi not found' });
        }

        // Create the booking
        const booking = await Booking.create({
            employeeId,
            taxiId,
            pickupLocation,
            dropOffLocation,
            pickupTime,
        });

        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('taxiId employeeId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};

// Get bookings for a specific employee
const getEmployeeBookings = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const bookings = await Booking.find({ employeeId }).populate('taxiId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee bookings', error: error.message });
    }
};

// Update a booking
const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const booking = await Booking.findByIdAndUpdate(id, updatedData, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking updated successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndDelete(id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling booking', error: error.message });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getEmployeeBookings,
    updateBooking,
    cancelBooking,
};
