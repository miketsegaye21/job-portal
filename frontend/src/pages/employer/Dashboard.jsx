import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import { getMyCompany } from '../../services/jobService';

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [company, setCompany] = useState(null);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        getMyCompany()
            .then((data) => setCompany(data.company))
            .catch(() => setCompany(null))
            .finally(() => setChecked(true));
    }, []);

    return (
        <div className="container">
            <h2>Welcome, {user?.name}</h2>

            {checked && !company && (
                <div className="card" style={{ background: '#fef3c7' }}>
                    <p>You need to create a company profile before posting jobs.</p>
                    <Link to="/employer/company" className="btn btn-small" style={{ marginTop: '8px', display: 'inline-block' }}>
                        Create Company Profile
                    </Link>
                </div>
            )}

            <div className="grid" style={{ marginTop: '20px' }}>
                <Link to="/employer/post-job" className="card">
                    <h3>Post a Job</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>Create a new job listing</p>
                </Link>
                <Link to="/employer/jobs" className="card">
                    <h3>Manage Jobs</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>View, edit, or delete your postings</p>
                </Link>
            </div>
        </div>
    );
}