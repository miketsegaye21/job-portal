import Profile from '../pages/seeker/Profile.jsx';
import CompanyProfile from '../pages/employer/CompanyProfile.jsx';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute.jsx';

import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';

import JobBrowse from '../pages/seeker/JobBrowse.jsx';
import SeekerDashboard from '../pages/seeker/Dashboard.jsx';
import MyApplications from '../pages/seeker/MyApplications.jsx';

import EmployerDashboard from '../pages/employer/Dashboard.jsx';
import PostJob from '../pages/employer/PostJob.jsx';
import ManageJobs from '../pages/employer/ManageJobs.jsx';
import ViewApplicants from '../pages/employer/ViewApplicants.jsx';

import AdminDashboard from '../pages/admin/Dashboard.jsx';
import ManageUsers from '../pages/admin/ManageUsers.jsx';
import ManageJobPostings from '../pages/admin/ManageJobPostings.jsx';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/employer/company" element={
    <ProtectedRoute roles={['employer']}><CompanyProfile /></ProtectedRoute>
} />
<Route path="/seeker/profile" element={
    <ProtectedRoute roles={['seeker']}><Profile /></ProtectedRoute>
} />
            <Route path="/" element={<JobBrowse />} />
            <Route path="/jobs" element={<JobBrowse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/seeker/dashboard" element={
                <ProtectedRoute roles={['seeker']}><SeekerDashboard /></ProtectedRoute>
            } />
            <Route path="/seeker/applications" element={
                <ProtectedRoute roles={['seeker']}><MyApplications /></ProtectedRoute>
            } />

            <Route path="/employer/dashboard" element={
                <ProtectedRoute roles={['employer']}><EmployerDashboard /></ProtectedRoute>
            } />
            <Route path="/employer/post-job" element={
                <ProtectedRoute roles={['employer']}><PostJob /></ProtectedRoute>
            } />
            <Route path="/employer/jobs" element={
                <ProtectedRoute roles={['employer']}><ManageJobs /></ProtectedRoute>
            } />
            <Route path="/employer/jobs/:jobId/applicants" element={
                <ProtectedRoute roles={['employer']}><ViewApplicants /></ProtectedRoute>
            } />

            <Route path="/admin/dashboard" element={
                <ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>
            } />
            <Route path="/admin/users" element={
                <ProtectedRoute roles={['admin']}><ManageUsers /></ProtectedRoute>
            } />
            <Route path="/admin/jobs" element={
                <ProtectedRoute roles={['admin']}><ManageJobPostings /></ProtectedRoute>
            } />
        </Routes>
    );
}