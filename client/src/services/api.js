import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
if (typeof API_URL === 'string' && API_URL.includes('VITE_API_URL=')) {
    API_URL = API_URL.split('VITE_API_URL=')[1];
}

const api = axios.create({
    baseURL: `${API_URL}/api`,
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;