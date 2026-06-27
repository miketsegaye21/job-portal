import { Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div className="container">
            <h2>Admin Dashboard</h2>
            <div className="grid" style={{ marginTop: '20px' }}>
                <Link to="/admin/users" className="card">
                    <h3>Manage Users</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>View, activate, deactivate, or remove users</p>
                </Link>
                <Link to="/admin/jobs" className="card">
                    <h3>Manage Job Postings</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>Approve or reject employer job listings</p>
                </Link>
            </div>
        </div>
    );
}