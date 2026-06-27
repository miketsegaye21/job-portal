const User = require('../models/User');
const logger = require('../utils/logger');

// Placeholder for seeker-specific profile fields beyond the base user record.
// Extend later with resume upload, skills, etc.
async function getProfile(req, res) {
    try {
        const user = await User.findById(req.user.id);
        res.json({ user });
    } catch (err) {
        logger.error(`Seeker get profile error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong fetching profile' });
    }
}

module.exports = { getProfile };