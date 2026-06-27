import { useState, useEffect, useContext } from 'react';
import { getAllJobs } from '../../services/jobService';
import { applyToJob } from '../../services/applicationService';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function JobBrowse() {
    const [jobs, setJobs] = useState([]);
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => { fetchJobs(); }, []);

    async function fetchJobs() {
        setLoading(true);
        try {
            const data = await getAllJobs({ location, jobType });
            setJobs(data.jobs);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleApply(jobId) {
        setMessage('');
        try {
            await applyToJob({ jobId });
            setMessage('Application submitted!');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to apply');
        }
    }

    return (
        <div className="container">
            <h2 style={{ marginBottom: '16px' }}>Browse Jobs</h2>

            <div className="card" style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                    <label>Location</label>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Addis Ababa" style={{ marginBottom: 0 }} />
                </div>
                <div style={{ flex: 1 }}>
                    <label>Job Type</label>
                    <select value={jobType} onChange={(e) => setJobType(e.target.value)} style={{ marginBottom: 0 }}>
                        <option value="">All</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                    </select>
                </div>
                <button className="btn" onClick={fetchJobs}>Search</button>
            </div>

            {message && <p className="success-text">{message}</p>}

            {loading ? <p>Loading jobs...</p> : (
                <div className="grid">
                    {jobs.length === 0 && <p>No jobs found.</p>}
                    {jobs.map((job) => (
                        <div key={job.id} className="card">
                            <h3>{job.title}</h3>
                            <p style={{ color: '#6b7280', fontSize: '14px' }}>{job.company_name} — {job.location}</p>
                            <p style={{ margin: '8px 0', fontSize: '14px' }}>{job.description.slice(0, 100)}...</p>
                            <span className="badge badge-approved">{job.job_type}</span>
                            {job.salary_min && (
                                <p style={{ marginTop: '8px', fontSize: '13px' }}>
                                    ${job.salary_min} - ${job.salary_max}
                                </p>
                            )}
                            {user?.role === 'seeker' && (
                                <button className="btn btn-small" style={{ marginTop: '12px' }} onClick={() => handleApply(job.id)}>
                                    Apply Now
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}