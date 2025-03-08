import axios from 'axios';
import { SERVER_URL } from '../config/server';

// Crear una instancia de axios con configuración base
const authApi = axios.create({
  baseURL: SERVER_URL || "http://localhost:3500/",
    headers: {
        "Content-Type": "application/json",
      },
  withCredentials: true, // Importante para enviar y recibir cookies
});
const attachTokenToRequests = (config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

export const login = async (user) => {
  return await authApi.post("/auth/login", user);
};


export const register = async (user) => {
  return await authApi.post("/auth/register", user);
};

export const logoutRequest = async () => {
  try {
     await authApi.post("/auth/logout");
     localStorage.removeitem('user')
  } catch (error) {
    console.log('Error durante el Logout',error)
  }
};

export const verifyTokenRequest = async () => {
  return await authApi.get("/auth/verifytoken");
};


// hay que agregar estos endpoints
export const getMe = () => {
    return axios.get("/me");
  };

export const getProfile = () => {
  return axios.get("/profile");
};

export const updateProfile = (data) => {
  return axios.put("/profile", data);
};


export default authApi;







