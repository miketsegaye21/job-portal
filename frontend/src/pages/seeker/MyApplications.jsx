import { useState, useEffect } from 'react';
import { getMyApplications } from '../../services/applicationService';

export default function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyApplications()
            .then((data) => setApplications(data.applications))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="container"><p>Loading...</p></div>;

    return (
        <div className="container">
            <h2 style={{ marginBottom: '16px' }}>My Applications</h2>
            {applications.length === 0 && <p>You haven't applied to any jobs yet.</p>}
            {applications.map((app) => (
                <div key={app.id} className="card flex-between">
                    <div>
                        <h3>{app.title}</h3>
                        <p style={{ color: '#6b7280', fontSize: '14px' }}>{app.company_name} — {app.location}</p>
                        <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                            Applied {new Date(app.applied_at).toLocaleDateString()}
                        </p>
                    </div>
                    <span className={`badge badge-${app.status}`}>{app.status}</span>
                </div>
            ))}
        </div>
    );
}