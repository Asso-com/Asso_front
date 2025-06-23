import { axiosInstance } from "@services/api-services/axiosInstance";
import type { PaternRequestDto } from "../types/AssociationType";
import handleAxiosError from "@utils/handleAxiosError";

const AssociationServiceApi = {
    getAll: async (): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>('/api/v1/associations');
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    createAssociation: async (associationData: PaternRequestDto): Promise<any> => {
        try {
            const response = await axiosInstance.post<any>('/api/v1/associations', associationData);
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
};

export default AssociationServiceApi;