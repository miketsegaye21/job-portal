import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import Loader from './Loader.jsx';

// Usage: <ProtectedRoute roles={['employer']}><PostJob /></ProtectedRoute>
export default function ProtectedRoute({ children, roles }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <Loader />;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}