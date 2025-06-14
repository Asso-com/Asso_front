import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";


const LevelServiceApi = {

    getAll: async (associationId: number): Promise<any> => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/level/association/${associationId}`,
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    update: async (id: number, associationId: number, data: any): Promise<any> => {
        try {
            const response = await axiosInstance.put<any>(
                `/api/v1/level/${id}/association/${associationId}`,
                data
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    delete: async (id: number, associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.delete<any>(
                `/api/v1/level/${id}/association/${associationId}`,
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    create: async (data: any): Promise<any> => {
        try {
            const response = await axiosInstance.post<unknown>(
                `/api/v1/level`,
                data
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
};

export default LevelServiceApi;