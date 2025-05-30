import { axiosInstance } from "./axiosInstance";
import type { AuthResponse, LoginRequest } from "../../types/authTypes";

const AuthServiceApi = {
    userLogin: async (credentials: LoginRequest): Promise<AuthResponse> => {
        try {
            const response = await axiosInstance.post<AuthResponse>(
                '/api/v1/auth/login',
                credentials
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    refreshToken: async (): Promise<{ accessToken: string }> => {
        try {
            const response = await axiosInstance.post<{ accessToken: string }>(
                '/api/v1/auth/refresh-token'
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: async (): Promise<void> => {
        try {
            await axiosInstance.post('/api/v1/auth/logout');
        } catch (error) {
            throw error;
        }
    },
};

export default AuthServiceApi;