
import axios from "axios";

export const baseURL = import.meta.env.VITE_APP_API
    ? import.meta.env.VITE_APP_API
    : "/backend"

export const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});