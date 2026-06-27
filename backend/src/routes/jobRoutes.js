const express = require('express');
const router = express.Router();
const { getAllJobs, getJobById, createJob, getMyJobs, updateJob, deleteJob } = require('../controllers/jobController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');
const { validateJob } = require('../middlewares/validateRequest');

// Public
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Employer only
router.post('/', authenticate, authorize('employer'), validateJob, createJob);
router.get('/employer/mine', authenticate, authorize('employer'), getMyJobs);
router.put('/:id', authenticate, authorize('employer'), updateJob);
router.delete('/:id', authenticate, authorize('employer'), deleteJob);

module.exports = router;