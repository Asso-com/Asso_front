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
            throw error;
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
            throw error;
        }
    }
};

export default SubjectServiceApi;
