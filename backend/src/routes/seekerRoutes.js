const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/seekerController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

router.get('/profile', authenticate, authorize('seeker'), getProfile);

module.exports = router;