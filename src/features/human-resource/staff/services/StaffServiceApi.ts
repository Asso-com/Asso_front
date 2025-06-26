import handleAxiosError from "@utils/handleAxiosError";
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
          handleAxiosError(error);
        }
    },

    update: async (staffId: string | number, data: any): Promise<any> => {
        try {
            const response = await axiosInstance.put(`/api/v1/staff/${staffId}`, data);
            return response.data;
        } catch (error) {
           handleAxiosError(error);
        }
    },

    getCreateByAssociationId: async (associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/staff/association/${associationId}/created`,
            );
            return response.data;
        } catch (error) {
          handleAxiosError(error);
        }
    },

    create: async (data: any): Promise<any> => {
        try {
            const response = await axiosInstance.post(
                `/api/v1/staff`,
                data
            );
            return response.data;
        } catch (error) {
           handleAxiosError(error);

        }
    },


    delete: async (staffId: string | number, associationId: number): Promise<void> => {
        try {
            await axiosInstance.delete(
                `/api/v1/staff/${staffId}/association/${associationId}`
            );
        } catch (error) {
            handleAxiosError(error);
        }
    },
};

export default StaffServiceApi;