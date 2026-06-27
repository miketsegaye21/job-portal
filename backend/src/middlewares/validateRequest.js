// Simple reusable validators — expand as needed
function validateRegister(req, res, next) {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }
    if (!['seeker', 'employer'].includes(role)) {
        return res.status(400).json({ message: 'Role must be either seeker or employer' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    next();
}

function validateLogin(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    next();
}

function validateJob(req, res, next) {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }
    next();
}

module.exports = { validateRegister, validateLogin, validateJob };