
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        console.log(`[REQUEST] ${config.method.toUpperCase()} ${config.url}`);

        config.headers.Authorization = "Bearer demo-token";
        return config;
    },
    (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    },
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log(`[RESPONSE] ${response.status} ${response.config.url}`);

        return response;
    },
    (error) => {
        if (error.response) {
            console.error("Api error:", error.response.status, error.response.data);
        } else if (error.request) {
            console.error("Network Error:", error.message);
        }

        return Promise.reject(error);
    },
);

export default api;
