import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function Profile() {
    const { user } = useContext(AuthContext);

    return (
        <div className="container" style={{ maxWidth: '500px' }}>
            <div className="card">
                <h2 style={{ marginBottom: '16px' }}>My Profile</h2>
                <div className="form-group">
                    <label>Name</label>
                    <p>{user?.name}</p>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <p>{user?.email}</p>
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <p style={{ textTransform: 'capitalize' }}>{user?.role}</p>
                </div>
            </div>
        </div>
    );
}