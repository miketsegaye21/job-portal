const db = require('../config/db');

class User {
    static create({ name, email, hashedPassword, role }) {
        const stmt = db.prepare(`
            INSERT INTO users (name, email, password, role)
            VALUES (?, ?, ?, ?)
        `);
        const result = stmt.run(name, email, hashedPassword, role);
        return this.findById(result.lastInsertRowid);
    }

    static findByEmail(email) {
        return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    }

    static findById(id) {
        return db.prepare(
            'SELECT id, name, email, role, is_active, created_at FROM users WHERE id = ?'
        ).get(id);
    }

    static findAll() {
        return db.prepare(
            'SELECT id, name, email, role, is_active, created_at FROM users ORDER BY created_at DESC'
        ).all();
    }

    static updateStatus(id, isActive) {
        db.prepare('UPDATE users SET is_active = ? WHERE id = ?').run(isActive ? 1 : 0, id);
    }

    static delete(id) {
        db.prepare('DELETE FROM users WHERE id = ?').run(id);
    }
}

module.exports = User;