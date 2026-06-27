import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'seeker' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            await register(form);
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container" style={{ maxWidth: '400px' }}>
            <div className="card">
                <h2 style={{ marginBottom: '20px' }}>Create an Account</h2>

                {error && <p className="error-text">{error}</p>}
                {success && <p className="success-text">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input name="name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} />
                    </div>
                    <div className="form-group">
                        <label>I am a</label>
                        <select name="role" value={form.role} onChange={handleChange}>
                            <option value="seeker">Job Seeker</option>
                            <option value="employer">Employer</option>
                        </select>
                    </div>
                    <button className="btn" type="submit" disabled={loading} style={{ width: '100%' }}>
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <p style={{ marginTop: '16px', fontSize: '14px' }}>
                    Already have an account? <Link to="/login" style={{ color: '#2563eb' }}>Login</Link>
                </p>
            </div>
        </div>
    );
}