import { useState, useEffect } from 'react';
import { getAllUsers, toggleUserStatus, deleteUser } from '../../services/jobService';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchUsers(); }, []);

    function fetchUsers() {
        setLoading(true);
        getAllUsers().then((data) => setUsers(data.users)).finally(() => setLoading(false));
    }

    async function handleToggle(id, currentStatus) {
        await toggleUserStatus(id, currentStatus ? 0 : 1);
        fetchUsers();
    }

    async function handleDelete(id) {
        if (!confirm('Delete this user permanently?')) return;
        await deleteUser(id);
        fetchUsers();
    }

    if (loading) return <div className="container"><p>Loading...</p></div>;

    return (
        <div className="container">
            <h2 style={{ marginBottom: '16px' }}>Manage Users</h2>
            {users.map((u) => (
                <div key={u.id} className="card flex-between">
                    <div>
                        <h3>{u.name}</h3>
                        <p style={{ color: '#6b7280', fontSize: '14px' }}>{u.email} — {u.role}</p>
                        <span className={`badge ${u.is_active ? 'badge-approved' : 'badge-rejected'}`}>
                            {u.is_active ? 'Active' : 'Deactivated'}
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-small btn-secondary" onClick={() => handleToggle(u.id, u.is_active)}>
                            {u.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button className="btn btn-small btn-danger" onClick={() => handleDelete(u.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}