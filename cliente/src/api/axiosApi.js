import axios from 'axios';
import { SERVER_URL } from '../config/server';

const api = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
});

export default api;