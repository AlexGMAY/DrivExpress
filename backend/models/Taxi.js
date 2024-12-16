const mongoose = require('mongoose');

const taxiSchema = new mongoose.Schema({
  taxiID: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, enum: ['active', 'idle', 'unavailable'], default: 'idle' },
  currentRoute: { type: Array, default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Taxi', taxiSchema);
