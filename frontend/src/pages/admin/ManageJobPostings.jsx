import { useState, useEffect } from 'react';
import { getAllJobsAdmin, reviewJob } from '../../services/jobService';

export default function ManageJobPostings() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchJobs(); }, []);

    function fetchJobs() {
        setLoading(true);
        getAllJobsAdmin().then((data) => setJobs(data.jobs)).finally(() => setLoading(false));
    }

    async function handleReview(id, status) {
        await reviewJob(id, status);
        fetchJobs();
    }

    if (loading) return <div className="container"><p>Loading...</p></div>;

    return (
        <div className="container">
            <h2 style={{ marginBottom: '16px' }}>Manage Job Postings</h2>
            {jobs.length === 0 && <p>No job postings yet.</p>}
            {jobs.map((job) => (
                <div key={job.id} className="card flex-between">
                    <div>
                        <h3>{job.title}</h3>
                        <p style={{ color: '#6b7280', fontSize: '14px' }}>{job.company_name}</p>
                        <span className={`badge badge-${job.status}`}>{job.status}</span>
                    </div>
                    {job.status === 'pending' && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-small" onClick={() => handleReview(job.id, 'approved')}>
                                Approve
                            </button>
                            <button className="btn btn-small btn-danger" onClick={() => handleReview(job.id, 'rejected')}>
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}