import api from './api';

export async function applyToJob(data) {
    const res = await api.post('/applications', data);
    return res.data;
}

export async function getMyApplications() {
    const res = await api.get('/applications/mine');
    return res.data;
}

export async function getApplicantsForJob(jobId) {
    const res = await api.get(`/applications/job/${jobId}`);
    return res.data;
}

export async function updateApplicationStatus(id, status) {
    const res = await api.patch(`/applications/${id}/status`, { status });
    return res.data;
}