const db = require('../config/db');

class Application {
    static create({ jobId, seekerId, resumeUrl, coverLetter }) {
        const stmt = db.prepare(`
            INSERT INTO applications (job_id, seeker_id, resume_url, cover_letter)
            VALUES (?, ?, ?, ?)
        `);
        const result = stmt.run(jobId, seekerId, resumeUrl || null, coverLetter || null);
        return this.findById(result.lastInsertRowid);
    }

    static findByseekerId(seekerId) {
        return db.prepare(`
            SELECT a.*, j.title, j.location, c.company_name
            FROM applications a
            JOIN jobs j ON a.job_id = j.id
            JOIN companies c ON j.company_id = c.id
            WHERE a.seeker_id = ?
            ORDER BY a.applied_at DESC
        `).all(seekerId);
    }

    static findByJobId(jobId) {
        return db.prepare(`
            SELECT a.*, u.name AS seeker_name, u.email AS seeker_email
            FROM applications a
            JOIN users u ON a.seeker_id = u.id
            WHERE a.job_id = ?
            ORDER BY a.applied_at DESC
        `).all(jobId);
    }

    static findExisting(jobId, seekerId) {
        return db.prepare(
            'SELECT * FROM applications WHERE job_id = ? AND seeker_id = ?'
        ).get(jobId, seekerId);
    }

    static updateStatus(id, status) {
        db.prepare(
            "UPDATE applications SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        ).run(status, id);
    }

    static findById(id) {
        return db.prepare('SELECT * FROM applications WHERE id = ?').get(id);
    }
}

module.exports = Application;