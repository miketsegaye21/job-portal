const db = require('../config/db');

class Company {
    static create({ employerId, companyName, description, website }) {
        const stmt = db.prepare(`
            INSERT INTO companies (employer_id, company_name, description, website)
            VALUES (?, ?, ?, ?)
        `);
        const result = stmt.run(employerId, companyName, description || null, website || null);
        return this.findById(result.lastInsertRowid);
    }

    static findByEmployerId(employerId) {
        return db.prepare('SELECT * FROM companies WHERE employer_id = ?').get(employerId);
    }

    static findById(id) {
        return db.prepare('SELECT * FROM companies WHERE id = ?').get(id);
    }

    static update(id, { companyName, description, website }) {
        db.prepare(`
            UPDATE companies
            SET company_name = ?, description = ?, website = ?
            WHERE id = ?
        `).run(companyName, description || null, website || null, id);
    }
}

module.exports = Company;