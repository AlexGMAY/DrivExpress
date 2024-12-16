const express = require('express');
const { createTaxi, getAllTaxis } = require('../controllers/taxiController');

const router = express.Router();

// Taxi Routes
router.post('/new', createTaxi); 
router.get('/all', getAllTaxis);

module.exports = router;
