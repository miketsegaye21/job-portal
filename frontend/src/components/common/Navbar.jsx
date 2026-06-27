import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login');
    }

    function dashboardLink() {
        if (!user) return '/';
        if (user.role === 'seeker') return '/seeker/dashboard';
        if (user.role === 'employer') return '/employer/dashboard';
        if (user.role === 'admin') return '/admin/dashboard';
        return '/';
    }

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            background: 'white',
            borderBottom: '1px solid #e5e7eb'
        }}>
            <Link to="/" style={{ fontWeight: 700, fontSize: '18px' }}>Job Portal</Link>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Link to="/jobs">Browse Jobs</Link>

                {user ? (
                    <>
                        <Link to={dashboardLink()}>Dashboard</Link>
                        <span style={{ fontSize: '13px', color: '#6b7280' }}>
                            {user.name} ({user.role})
                        </span>
                        <button className="btn btn-secondary btn-small" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" className="btn btn-small">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}