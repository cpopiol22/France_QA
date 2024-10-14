import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const register = (userData: any) => api.post('/users/register', userData);
export const login = (credentials: any) => api.post('/users/login', credentials);
export const getUserProfile = () => api.get('/users/profile');
export const updateUserProfile = (profileData: any) => api.put('/users/profile', profileData);

export const getJobs = () => api.get('/jobs');
export const getJobById = (id: string) => api.get(`/jobs/${id}`);
export const createJob = (jobData: any) => api.post('/jobs', jobData);
export const updateJob = (id: string, jobData: any) => api.put(`/jobs/${id}`, jobData);
export const deleteJob = (id: string) => api.delete(`/jobs/${id}`);

export const getApplicationsForJob = (jobId: string) => api.get(`/applications/job/${jobId}`);
export const getUserApplications = () => api.get('/applications/user');
export const createApplication = (jobId: string) => api.post('/applications', { jobId });
export const updateApplicationStatus = (id: string, status: string) => api.put(`/applications/${id}`, { status });

export default api;