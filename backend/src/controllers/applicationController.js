const Application = require('../models/Application');
const Job = require('../models/Job');
const logger = require('../utils/logger');

// Seeker — apply to a job
async function applyToJob(req, res) {
    try {
        const { jobId, resumeUrl, coverLetter } = req.body;

        const job = await Job.findById(jobId);
        if (!job || job.status !== 'approved') {
            return res.status(404).json({ message: 'Job not found or not accepting applications' });
        }

        const existing = await Application.findExisting(jobId, req.user.id);
        if (existing) {
            return res.status(409).json({ message: 'You already applied to this job' });
        }

        const application = await Application.create({
            jobId,
            seekerId: req.user.id,
            resumeUrl,
            coverLetter
        });

        logger.info(`Application created: seeker ${req.user.email} -> job ${jobId}`);
        res.status(201).json({ message: 'Application submitted', application });
    } catch (err) {
        logger.error(`Apply to job error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong submitting your application' });
    }
}

// Seeker — view their own applications
async function getMyApplications(req, res) {
    try {
        const applications = await Application.findByseekerId(req.user.id);
        res.json({ applications });
    } catch (err) {
        logger.error(`Get my applications error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong fetching your applications' });
    }
}

// Employer — view applicants for one of their jobs
async function getApplicantsForJob(req, res) {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        if (job.employer_id !== req.user.id) {
            return res.status(403).json({ message: 'You do not own this job posting' });
        }

        const applications = await Application.findByJobId(req.params.jobId);
        res.json({ applications });
    } catch (err) {
        logger.error(`Get applicants error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong fetching applicants' });
    }
}

// Employer — update an applicant's status (reviewed, interview, hired, rejected)
async function updateApplicationStatus(req, res) {
    try {
        const { status } = req.body;
        const validStatuses = ['applied', 'reviewed', 'interview', 'hired', 'rejected'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        const job = await Job.findById(application.job_id);
        if (job.employer_id !== req.user.id) {
            return res.status(403).json({ message: 'You do not own the job for this application' });
        }

        await Application.updateStatus(req.params.id, status);
        logger.info(`Application ${req.params.id} status updated to ${status} by ${req.user.email}`);
        res.json({ message: 'Application status updated' });
    } catch (err) {
        logger.error(`Update application status error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong updating the application' });
    }
}

module.exports = { applyToJob, getMyApplications, getApplicantsForJob, updateApplicationStatus };