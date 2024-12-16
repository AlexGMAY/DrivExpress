const express = require('express');
const { registerUser, loginUser, userProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, userProfile);




module.exports = router;
