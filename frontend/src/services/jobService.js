import api from './api';

export async function getAllJobs(filters = {}) {
    const res = await api.get('/jobs', { params: filters });
    return res.data;
}

export async function getJobById(id) {
    const res = await api.get(`/jobs/${id}`);
    return res.data;
}

export async function createJob(data) {
    const res = await api.post('/jobs', data);
    return res.data;
}

export async function getMyJobs() {
    const res = await api.get('/jobs/employer/mine');
    return res.data;
}

export async function updateJob(id, data) {
    const res = await api.put(`/jobs/${id}`, data);
    return res.data;
}

export async function deleteJob(id) {
    const res = await api.delete(`/jobs/${id}`);
    return res.data;
}

// Employer company profile
export async function getMyCompany() {
    const res = await api.get('/employer/company');
    return res.data;
}

export async function createCompany(data) {
    const res = await api.post('/employer/company', data);
    return res.data;
}

export async function updateCompany(data) {
    const res = await api.put('/employer/company', data);
    return res.data;
}

// Admin
export async function getAllUsers() {
    const res = await api.get('/admin/users');
    return res.data;
}

export async function toggleUserStatus(id, isActive) {
    const res = await api.patch(`/admin/users/${id}/status`, { isActive });
    return res.data;
}

export async function deleteUser(id) {
    const res = await api.delete(`/admin/users/${id}`);
    return res.data;
}

export async function getPendingJobs() {
    const res = await api.get('/admin/jobs/pending');
    return res.data;
}

export async function getAllJobsAdmin() {
    const res = await api.get('/admin/jobs');
    return res.data;
}

export async function reviewJob(id, status) {
    const res = await api.patch(`/admin/jobs/${id}/review`, { status });
    return res.data;
}