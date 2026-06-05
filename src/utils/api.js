import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const generateRoadmap = (data) => API.post('/roadmap/generate', data);
export const uploadResume = (formData) => API.post('/resume/upload', formData);
export const getMyResumes = () => API.get('/resume/my');
export const getMyRoadmaps = () => API.get('/roadmap/my');
export const getAdminStats = () => API.get('/admin/stats');
export const getAdminUsers = () => API.get('/admin/users');
export const getAdminActivities = () => API.get('/admin/activities');

export default API;