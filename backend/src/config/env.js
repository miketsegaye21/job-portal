require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5050,
    nodeEnv: process.env.NODE_ENV || 'development',
    dbPath: process.env.DB_PATH || './data/job_portal.db',
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    }
};