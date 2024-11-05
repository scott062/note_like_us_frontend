import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Move to env file
  headers: {
    'Content-Type': 'application/json',
  },
  // Do not use withCredentials without reverse proxy setup
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Note 'Bearer', modify API settings.py for other naming convention ex. JWT, TOKEN, etc.
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response.status === 401 && !original._retry) {
      original._retry = true; // Set retry attr to avoid recursive loop
      const refresh = localStorage.getItem('refresh_token');
      if (refresh) {
        try {
          const response = await api.post('/api/token/refresh/', { refresh: refresh });
          localStorage.setItem('access_token', response.data.access);
          api.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
          return api(original);
        } catch (refreshError) {
          console.error('Refresh failed:', refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);
export default api;

