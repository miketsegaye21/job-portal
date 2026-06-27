const Company = require('../models/Company');
const logger = require('../utils/logger');

async function createCompanyProfile(req, res) {
    try {
        const existing = await Company.findByEmployerId(req.user.id);
        if (existing) {
            return res.status(409).json({ message: 'Company profile already exists' });
        }

        const { companyName, description, website } = req.body;
        if (!companyName) {
            return res.status(400).json({ message: 'Company name is required' });
        }

        const company = await Company.create({
            employerId: req.user.id,
            companyName,
            description,
            website
        });

        logger.info(`Company profile created by ${req.user.email}`);
        res.status(201).json({ message: 'Company profile created', company });
    } catch (err) {
        logger.error(`Create company error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong creating company profile' });
    }
}

async function getMyCompanyProfile(req, res) {
    try {
        const company = await Company.findByEmployerId(req.user.id);
        if (!company) {
            return res.status(404).json({ message: 'No company profile found' });
        }
        res.json({ company });
    } catch (err) {
        logger.error(`Get company error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong fetching company profile' });
    }
}

async function updateCompanyProfile(req, res) {
    try {
        const company = await Company.findByEmployerId(req.user.id);
        if (!company) {
            return res.status(404).json({ message: 'No company profile found' });
        }

        const { companyName, description, website } = req.body;
        await Company.update(company.id, { companyName, description, website });

        logger.info(`Company profile updated by ${req.user.email}`);
        res.json({ message: 'Company profile updated' });
    } catch (err) {
        logger.error(`Update company error: ${err.message}`);
        res.status(500).json({ message: 'Something went wrong updating company profile' });
    }
}

module.exports = { createCompanyProfile, getMyCompanyProfile, updateCompanyProfile };