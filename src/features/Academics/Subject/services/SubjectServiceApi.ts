import handleAxiosError from "@utils/handleAxiosError";
import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import type { SubjectRequest } from "../types";


const SubjectServiceApi = {
    getAll: async (associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/subjects/association/${associationId}`
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    create: async (subject: SubjectRequest): Promise<any> => {
        try {
            const response = await axiosInstance.post<any>(
                `/api/v1/subjects`,
                subject
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },


    update: async (id: number, associationId: number, data: any): Promise<any> => {
        try {
            const response = await axiosInstance.put<any>(
                `/api/v1/subjects/${id}/association/${associationId}`,
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
                `/api/v1/subjects/${id}/association/${associationId}`,
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
};

export default SubjectServiceApi;
