import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicantsForJob, updateApplicationStatus } from '../../services/applicationService';

export default function ViewApplicants() {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchApplicants(); }, [jobId]);

    function fetchApplicants() {
        setLoading(true);
        getApplicantsForJob(jobId).then((data) => setApplicants(data.applications)).finally(() => setLoading(false));
    }

    async function handleStatusChange(id, status) {
        await updateApplicationStatus(id, status);
        fetchApplicants();
    }

    if (loading) return <div className="container"><p>Loading...</p></div>;

    return (
        <div className="container">
            <h2 style={{ marginBottom: '16px' }}>Applicants</h2>
            {applicants.length === 0 && <p>No applicants yet.</p>}
            {applicants.map((app) => (
                <div key={app.id} className="card flex-between">
                    <div>
                        <h3>{app.seeker_name}</h3>
                        <p style={{ color: '#6b7280', fontSize: '14px' }}>{app.seeker_email}</p>
                        <span className={`badge badge-${app.status}`}>{app.status}</span>
                    </div>
                    <select value={app.status} onChange={(e) => handleStatusChange(app.id, e.target.value)} style={{ width: 'auto', marginBottom: 0 }}>
                        <option value="applied">Applied</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="interview">Interview</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            ))}
        </div>
    );
}