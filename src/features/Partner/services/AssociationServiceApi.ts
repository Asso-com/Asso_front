import { axiosInstance } from "@services/api-services/axiosInstance";
import type { PaternRequestDto } from "../list-partner/types/AssociationType";
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
    getOnlyActives: async (): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>('/api/v1/associations/active');
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
    toggelAssociation: async (associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.patch<any>(`/api/v1/associations/${associationId}/toggle-active`);
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
    updateAssocationSettings: async (associationId: number, data: any): Promise<any> => {
        try {
            const response = await axiosInstance.put<any>(`/api/v1/associations/${associationId}/settings`, data);
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