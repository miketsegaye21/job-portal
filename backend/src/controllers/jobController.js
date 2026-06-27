const Job = require('../models/Job');
const Company = require('../models/Company');
const logger = require('../utils/logger');

// Public/Seeker — browse approved jobs, with optional filters
async function getAllJobs(req, res) {
    try {
        const { location, jobType } = req.query;
        const jobs = await Job.findAllApproved({ location, jobType });
        res.json({ jobs });
    } catch (err) {
        logger.error(`Get all jobs error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong fetching jobs' });
    }
}

// Anyone — view single job details
async function getJobById(req, res) {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ job });
    } catch (err) {
        logger.error(`Get job by id error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong fetching the job' });
    }
}

// Employer — create a job posting (goes in as 'pending' until admin approves)
async function createJob(req, res) {
    try {
        const company = await Company.findByEmployerId(req.user.id);
        if (!company) {
            return res.status(400).json({ message: 'You must create a company profile before posting jobs' });
        }

        const { title, description, location, jobType, salaryMin, salaryMax } = req.body;

        const job = await Job.create({
            companyId: company.id,
            title,
            description,
            location,
            jobType,
            salaryMin,
            salaryMax
        });

        logger.info(`Job created: "${title}" by employer ${req.user.email}`);
        res.status(201).json({ message: 'Job posted, awaiting admin approval', job });
    } catch (err) {
        logger.error(`Create job error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong creating the job' });
    }
}

// Employer — view their own posted jobs
async function getMyJobs(req, res) {
    try {
        const company = await Company.findByEmployerId(req.user.id);
        if (!company) {
            return res.json({ jobs: [] });
        }
        const jobs = await Job.findByCompanyId(company.id);
        res.json({ jobs });
    } catch (err) {
        logger.error(`Get my jobs error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong fetching your jobs' });
    }
}

// Employer — update their own job (ownership checked)
async function updateJob(req, res) {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        if (job.employer_id !== req.user.id) {
            return res.status(403).json({ message: 'You do not own this job posting' });
        }

        await Job.update(req.params.id, req.body);
        logger.info(`Job updated: ${req.params.id} by employer ${req.user.email}`);
        res.json({ message: 'Job updated successfully' });
    } catch (err) {
        logger.error(`Update job error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong updating the job' });
    }
}

// Employer — delete their own job
async function deleteJob(req, res) {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        if (job.employer_id !== req.user.id) {
            return res.status(403).json({ message: 'You do not own this job posting' });
        }

        await Job.delete(req.params.id);
        logger.info(`Job deleted: ${req.params.id} by employer ${req.user.email}`);
        res.json({ message: 'Job deleted successfully' });
    } catch (err) {
        logger.error(`Delete job error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong deleting the job' });
    }
}

module.exports = { getAllJobs, getJobById, createJob, getMyJobs, updateJob, deleteJob };