import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob, createCompany, getMyCompany } from '../../services/jobService';

export default function PostJob() {
    const [form, setForm] = useState({
        title: '', description: '', location: '', jobType: 'full-time', salaryMin: '', salaryMax: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        try {
            await getMyCompany();
        } catch {
            setError('Create a company profile first before posting a job.');
            return;
        }
        try {
            await createJob(form);
            setSuccess('Job posted! Awaiting admin approval.');
            setTimeout(() => navigate('/employer/jobs'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post job');
        }
    }

    return (
        <div className="container" style={{ maxWidth: '500px' }}>
            <div className="card">
                <h2 style={{ marginBottom: '16px' }}>Post a New Job</h2>
                {error && <p className="error-text">{error}</p>}
                {success && <p className="success-text">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input name="title" value={form.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" rows="4" value={form.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input name="location" value={form.location} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Job Type</label>
                        <select name="jobType" value={form.jobType} onChange={handleChange}>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Salary Min</label>
                            <input type="number" name="salaryMin" value={form.salaryMin} onChange={handleChange} />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Salary Max</label>
                            <input type="number" name="salaryMax" value={form.salaryMax} onChange={handleChange} />
                        </div>
                    </div>
                    <button className="btn" type="submit" style={{ width: '100%' }}>Post Job</button>
                </form>
            </div>
        </div>
    );
}