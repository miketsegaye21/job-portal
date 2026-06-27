const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/generateToken');
const logger = require('../utils/logger');

async function register(req, res) {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ name, email, hashedPassword, role });

        logger.info(`New user registered: ${email} (${role})`);

        res.status(201).json({
            message: 'Registration successful',
            user: newUser
        });
    } catch (err) {
        logger.error(`Register error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong during registration' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.is_active) {
            return res.status(403).json({ message: 'Your account has been deactivated. Contact admin.' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        logger.info(`User logged in: ${email}`);

        res.json({
            message: 'Login successful',
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        logger.error(`Login error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong during login' });
    }
}

async function refreshToken(req, res) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token required' });
        }

        const decoded = verifyRefreshToken(refreshToken);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const newAccessToken = generateAccessToken(user);
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
}

async function getProfile(req, res) {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    } catch (err) {
        logger.error(`Get profile error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = { register, login, refreshToken, getProfile };