const express = require('express');
const router = express.Router();
const {
    applyToJob,
    getMyApplications,
    getApplicantsForJob,
    updateApplicationStatus
} = require('../controllers/applicationController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

// Seeker
router.post('/', authenticate, authorize('seeker'), applyToJob);
router.get('/mine', authenticate, authorize('seeker'), getMyApplications);

// Employer
router.get('/job/:jobId', authenticate, authorize('employer'), getApplicantsForJob);
router.patch('/:id/status', authenticate, authorize('employer'), updateApplicationStatus);

module.exports = router;