import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyJobs, deleteJob } from '../../services/jobService';

export default function ManageJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchJobs(); }, []);

    function fetchJobs() {
        setLoading(true);
        getMyJobs().then((data) => setJobs(data.jobs)).finally(() => setLoading(false));
    }

    async function handleDelete(id) {
        if (!confirm('Delete this job posting?')) return;
        await deleteJob(id);
        fetchJobs();
    }

    if (loading) return <div className="container"><p>Loading...</p></div>;

    return (
        <div className="container">
            <h2 style={{ marginBottom: '16px' }}>Manage Jobs</h2>
            {jobs.length === 0 && <p>You haven't posted any jobs yet.</p>}
            {jobs.map((job) => (
                <div key={job.id} className="card flex-between">
                    <div>
                        <h3>{job.title}</h3>
                        <p style={{ color: '#6b7280', fontSize: '14px' }}>{job.location} — {job.job_type}</p>
                        <span className={`badge badge-${job.status}`}>{job.status}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Link to={`/employer/jobs/${job.id}/applicants`} className="btn btn-small btn-secondary">
                            View Applicants
                        </Link>
                        <button className="btn btn-small btn-danger" onClick={() => handleDelete(job.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}