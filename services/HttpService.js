import axios from 'axios';

export default class HttpService {
    constructor() {
        this.axios = axios.create({
            //baseURL: 'http://localhost:3001/api'
            baseURL: process.env.NEXT_PUBLIC_API_URL
        });

        this.axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            return config;
        })
    }

    async post(url, data) {
        return await this.axios.post(url, data);
    }

    async get(url) {
        return await this.axios.get(url)
    }

    async put(url, data) {
        return await this.axios.put(url, data);
    }
}   