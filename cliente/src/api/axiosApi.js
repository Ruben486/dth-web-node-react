import axios from 'axios';
import { SERVER_URL } from '../config/server';

const api = axios.create({
    baseURL: SERVER_URL,
});

export default api;