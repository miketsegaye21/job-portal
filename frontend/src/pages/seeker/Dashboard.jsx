import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function Dashboard() {
    const { user } = useContext(AuthContext);

    return (
        <div className="container">
            <h2>Welcome, {user?.name}</h2>
            <div className="grid" style={{ marginTop: '20px' }}>
                <Link to="/jobs" className="card">
                    <h3>Browse Jobs</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>Find and apply to open positions</p>
                </Link>
                <Link to="/seeker/applications" className="card">
                    <h3>My Applications</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>Track the status of your applications</p>
                </Link>
                <Link to="/seeker/profile" className="card">
                    <h3>My Profile</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>View your account details</p>
                </Link>
            </div>
        </div>
    );
}