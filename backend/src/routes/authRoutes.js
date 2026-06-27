const express = require('express');
const router = express.Router();
const { register, login, refreshToken, getProfile } = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');
const { validateRegister, validateLogin } = require('../middlewares/validateRequest');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/refresh', refreshToken);
router.get('/me', authenticate, getProfile);

module.exports = router;