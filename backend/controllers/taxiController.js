const Taxi = require('../models/Taxi');

// Create Taxi
exports.createTaxi = async (req, res) => {
  try {
    const { taxiID, driverName, capacity } = req.body;
    const taxi = await Taxi.create({ taxiID, driverName, capacity });
    res.status(201).json({ message: 'Taxi created successfully', taxi });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch All Taxis
exports.getAllTaxis = async (req, res) => {
    try {
      const taxis = await Taxi.find(); // Fetch all taxis from the database
      if (!taxis || taxis.length === 0) {
        return res.status(404).json({ message: 'No taxis found' });
      }
      res.status(200).json(taxis);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  