import type { AxiosError } from "axios";
import { axiosInstance } from "../../../../services/api-services/axiosInstance";


const LevelServiceApi = {

    getAll: async (associationId: number): Promise<any> => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/level/association/${associationId}`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

 toggleStatus: async (
    associationId: number, 
    classRoomId: number
): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await axiosInstance.put(
            `/api/v1/class-rooms/association/${associationId}/class-rooms/${classRoomId}/toggle`
        );
        return {
            success: true,
            ...response.data
        };
    } catch (error) {
        const axiosError = error as AxiosError<{
            message?: string;
            errors?: Record<string, string>;
        }>;
        
        if (axiosError.response) {
            // Erreur avec réponse du serveur
            const serverMessage = axiosError.response.data?.message || 
                               (typeof axiosError.response.data === 'string' ? axiosError.response.data : undefined);
            
            throw new Error(
                serverMessage || 
                `Failed to toggle class room status (HTTP ${axiosError.response.status})`
            );
        }
        
        throw new Error('Network error while toggling class room status');
    }
},

    create: async (data: any, associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.post<unknown>(
                `/api/v1/level/associatio/${associationId}`,
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
};

export default LevelServiceApi;