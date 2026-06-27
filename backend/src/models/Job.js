const db = require('../config/db');

class Job {
    static create({ companyId, title, description, location, jobType, salaryMin, salaryMax }) {
        const stmt = db.prepare(`
            INSERT INTO jobs (company_id, title, description, location, job_type, salary_min, salary_max)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(
            companyId, title, description, location || null,
            jobType || 'full-time', salaryMin || null, salaryMax || null
        );
        return this.findById(result.lastInsertRowid);
    }

    static findAllApproved({ location, jobType } = {}) {
        let query = `
            SELECT j.*, c.company_name, c.logo_url
            FROM jobs j
            JOIN companies c ON j.company_id = c.id
            WHERE j.status = 'approved'
        `;
        const params = [];

        if (location) {
            query += ' AND j.location LIKE ?';
            params.push(`%${location}%`);
        }
        if (jobType) {
            query += ' AND j.job_type = ?';
            params.push(jobType);
        }
        query += ' ORDER BY j.created_at DESC';

        return db.prepare(query).all(...params);
    }

    static findById(id) {
        return db.prepare(`
            SELECT j.*, c.company_name, c.logo_url, c.employer_id
            FROM jobs j
            JOIN companies c ON j.company_id = c.id
            WHERE j.id = ?
        `).get(id);
    }

    static findByCompanyId(companyId) {
        return db.prepare(
            'SELECT * FROM jobs WHERE company_id = ? ORDER BY created_at DESC'
        ).all(companyId);
    }

    static findByStatus(status) {
        return db.prepare(`
            SELECT j.*, c.company_name
            FROM jobs j
            JOIN companies c ON j.company_id = c.id
            WHERE j.status = ?
            ORDER BY j.created_at ASC
        `).all(status);
    }

    static updateStatus(id, status) {
        db.prepare(
            "UPDATE jobs SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        ).run(status, id);
    }

    static update(id, { title, description, location, jobType, salaryMin, salaryMax }) {
        db.prepare(`
            UPDATE jobs
            SET title = ?, description = ?, location = ?, job_type = ?,
                salary_min = ?, salary_max = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `).run(title, description, location || null, jobType, salaryMin || null, salaryMax || null, id);
    }

    static delete(id) {
        db.prepare('DELETE FROM jobs WHERE id = ?').run(id);
    }
}

module.exports = Job;