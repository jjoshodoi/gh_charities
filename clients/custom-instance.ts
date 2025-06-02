import axios from 'axios';

export const customInstance = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:3000', // or import from env/config
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.request.use((config) => {
        // Add auth token, logs, etc
        // config.headers.Authorization = `Bearer ${getToken()}`
        return config;
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error('Request failed:', error);
            return Promise.reject(error);
        }
    );

    return instance;
};
