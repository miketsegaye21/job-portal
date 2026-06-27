const express = require('express');
const router = express.Router();
const {
    createCompanyProfile,
    getMyCompanyProfile,
    updateCompanyProfile
} = require('../controllers/employerController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

router.use(authenticate, authorize('employer'));

router.post('/company', createCompanyProfile);
router.get('/company', getMyCompanyProfile);
router.put('/company', updateCompanyProfile);

module.exports = router;