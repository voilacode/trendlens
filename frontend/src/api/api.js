import axios from 'axios';

// Base URL for API
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Interceptor to add Authorization header with token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Function to analyze sentiment
export async function analyzeSentiment(payload) {
    try {
        const response = await API.post('/analyze', payload);
        return response.data;
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        throw error;
    }
}

export default API;
