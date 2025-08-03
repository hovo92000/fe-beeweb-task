import axios from 'axios';
import { getToken } from '../contexts/AuthContext';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const signup = payload => api.post('/auth/signup', payload);
export const login = payload => api.post('/auth/login', payload);

export const checkSlugAvailability = slug =>
   api.get(`/workspaces/slug?slug=${encodeURIComponent(slug)}`);

export const fetchWorkspaces = () => api.get('/workspaces');
export const createWorkspace = payload => api.post('/workspaces', payload);
export const updateWorkspace = (id, payload) =>
  api.put(`/workspaces/${id}`, payload);
export const deleteWorkspace = id => api.delete(`/workspaces/${id}`);