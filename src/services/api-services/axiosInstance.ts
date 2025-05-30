
import axios from "axios";

export const baseURL = "http://localhost:8080";

export const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});