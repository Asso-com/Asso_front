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

   toggelStatus: async (associationId: number, departementId: number): Promise<any> => {
        try {
            const response = await axiosInstance.put<any>(
                `/api/v1/departements/association/${associationId}/Level/${departementId}/toggle`,
            );
            return response.data;
        } catch (error) {
            throw error;
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
            console.log(err);
        }
    },
};

export default LevelServiceApi;