import type { AxiosError } from "axios";
import { axiosInstance } from "../../../../services/api-services/axiosInstance";


const StaffServiceApi = {

    getAll: async (associationId: number): Promise<any> => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/staff/association/${associationId}`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (staffId: string | number, data: any): Promise<any> => {
        try {
            const response = await axiosInstance.put(`/api/v1/staff/${staffId}`, data);
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            if (error.response?.status === 400) {
                const backendData = error.response.data as any;
                if (backendData.errors && typeof backendData.errors === "object") {
                    const validationErrors = backendData.errors as Record<string, string>;
                    const message = Object.values(validationErrors).join(", ");
                    throw new Error(message);
                }
                if (typeof backendData === "object") {
                    const message = Object.values(backendData).join(", ");
                    throw new Error(message);
                }
                throw new Error("Validation failed");
            }
            throw err;
        }
    },

    getCreateByAssociationId: async (associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/staff/association/${associationId}/created`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    create: async (data: any): Promise<any> => {
        try {
            const response = await axiosInstance.post(
                `/api/v1/staff`,
                data
            );
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            if (error.response?.status === 400) {
                const backendData = error.response.data as any;
                if (backendData.errors && typeof backendData.errors === 'object') {
                    const validationErrors = backendData.errors as Record<string, string>;
                    const message = Object.values(validationErrors).join(', ');
                    throw new Error(message);
                }
                if (typeof backendData === 'object') {
                    const message = Object.values(backendData).join(', ');
                    throw new Error(message);
                }
                throw new Error('Validation failed');
            }
            throw new Error('An unexpected error occurred.');

        }
    },


    delete: async (staffId: string | number, associationId: number): Promise<void> => {
        try {
            await axiosInstance.delete(
                `/api/v1/staff/${staffId}/association/${associationId}`
            );
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 400) {
                throw new Error('Invalid ID format sent to server');
            }
            throw error;
        }
    },
};

export default StaffServiceApi;