const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, 'app.log');

function writeLog(level, message) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
    fs.appendFile(logFile, line, (err) => {
        if (err) console.error('Failed to write log:', err);
    });
    console.log(line.trim());
}

module.exports = {
    info: (msg) => writeLog('info', msg),
    error: (msg) => writeLog('error', msg),
    warn: (msg) => writeLog('warn', msg)
};