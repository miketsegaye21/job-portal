const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    toggleUserStatus,
    deleteUser,
    getPendingJobs,
    getAllJobsAdmin,
    reviewJob
} = require('../controllers/adminController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

router.use(authenticate, authorize('admin'));

router.get('/users', getAllUsers);
router.patch('/users/:id/status', toggleUserStatus);
router.delete('/users/:id', deleteUser);

router.get('/jobs/pending', getPendingJobs);
router.get('/jobs', getAllJobsAdmin);
router.patch('/jobs/:id/review', reviewJob);

module.exports = router;