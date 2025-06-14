import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";


const DepartmentServiceApi = {

    getAll: async (associationId: number): Promise<any> => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/departements/association/${associationId}`,
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
    delete: async (id: number, associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.delete<any>(
                `/api/v1/departements/association/${associationId}/department/${id}`,
            );
            return response.data;
        } catch (error: any) {
            handleAxiosError(error);
        }
    },

    update: async (id: number, associationId: number, data: any): Promise<any> => {
        try {
            const response = await axiosInstance.put<any>(
                `/api/v1/departements/association/${associationId}/department/${id}`,
                data
            );
            return response.data;
        } catch (error: any) {
            handleAxiosError(error);
        }
    },

    getCreateByAssociationId: async (associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/departements/association/${associationId}/created`,
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    toggelStatus: async (associationId: number, departementId: number): Promise<any> => {
        try {
            const response = await axiosInstance.put<any>(
                `/api/v1/departements/association/${associationId}/department/${departementId}/toggle`,
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    create: async (data: any, associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.post<unknown>(
                `/api/v1/departements/association/${associationId}`,
                data
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
};
export default DepartmentServiceApi;