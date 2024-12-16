const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taxi: { type: mongoose.Schema.Types.ObjectId, ref: 'Taxi', required: true },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
  bookingDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
