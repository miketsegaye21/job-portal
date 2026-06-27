const User = require('../models/User');
const Job = require('../models/Job');
const logger = require('../utils/logger');

async function getAllUsers(req, res) {
    try {
        const users = await User.findAll();
        res.json({ users });
    } catch (err) {
        logger.error(`Admin get users error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong fetching users' });
    }
}

async function toggleUserStatus(req, res) {
    try {
        const { isActive } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.updateStatus(req.params.id, isActive);
        logger.info(`Admin ${req.user.email} set user ${req.params.id} active=${isActive}`);
        res.json({ message: 'User status updated' });
    } catch (err) {
        logger.error(`Admin toggle user error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong updating user status' });
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await User.delete(req.params.id);
        logger.info(`Admin ${req.user.email} deleted user ${req.params.id}`);
        res.json({ message: 'User deleted' });
    } catch (err) {
        logger.error(`Admin delete user error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong deleting user' });
    }
}

// Jobs pending approval
async function getPendingJobs(req, res) {
    try {
        const jobs = await Job.findByStatus('pending');
        res.json({ jobs });
    } catch (err) {
        logger.error(`Admin get pending jobs error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong fetching pending jobs' });
    }
}

async function getAllJobsAdmin(req, res) {
    try {
        const pending = await Job.findByStatus('pending');
        const approved = await Job.findByStatus('approved');
        const rejected = await Job.findByStatus('rejected');
        const closed = await Job.findByStatus('closed');
        res.json({ jobs: [...pending, ...approved, ...rejected, ...closed] });
    } catch (err) {
        logger.error(`Admin get all jobs error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong fetching jobs' });
    }
}

async function reviewJob(req, res) {
    try {
        const { status } = req.body; // 'approved' or 'rejected'
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Status must be approved or rejected' });
        }

        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        await Job.updateStatus(req.params.id, status);
        logger.info(`Admin ${req.user.email} set job ${req.params.id} to ${status}`);
        res.json({ message: `Job ${status}` });
    } catch (err) {
        logger.error(`Admin review job error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong reviewing the job' });
    }
}

module.exports = {
    getAllUsers,
    toggleUserStatus,
    deleteUser,
    getPendingJobs,
    getAllJobsAdmin,
    reviewJob
};