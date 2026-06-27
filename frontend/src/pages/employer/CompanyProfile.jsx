import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyCompany, createCompany, updateCompany } from '../../services/jobService';

export default function CompanyProfile() {
    const [form, setForm] = useState({ companyName: '', description: '', website: '' });
    const [exists, setExists] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getMyCompany().then((data) => {
            setForm({
                companyName: data.company.company_name,
                description: data.company.description || '',
                website: data.company.website || ''
            });
            setExists(true);
        }).catch(() => setExists(false));
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (exists) {
                await updateCompany(form);
            } else {
                await createCompany(form);
            }
            setMessage('Saved!');
            setTimeout(() => navigate('/employer/dashboard'), 1000);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to save');
        }
    }

    return (
        <div className="container" style={{ maxWidth: '500px' }}>
            <div className="card">
                <h2 style={{ marginBottom: '16px' }}>Company Profile</h2>
                {message && <p className="success-text">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Company Name</label>
                        <input name="companyName" value={form.companyName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" rows="3" value={form.description} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Website</label>
                        <input name="website" value={form.website} onChange={handleChange} />
                    </div>
                    <button className="btn" type="submit" style={{ width: '100%' }}>Save</button>
                </form>
            </div>
        </div>
    );
}