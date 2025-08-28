import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";

const YearSettingsServiceApi = {

    getActivePeriodByAssociationId: async (associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/academicPeriod/association/${associationId}/active`,
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    updateDescriptionAndExtendEndDate: async (periodId: number, data: any): Promise<any> => {
        try {
            const response = await axiosInstance.put<any>(
                `/api/v1/academicPeriod/${periodId}/extend`,
                data
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    getAll: async (associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/academicPeriod/association/${associationId}`,
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    activateOrDeactivateAcademicPeriod: async (periodId: number, associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.patch<any>(
                `/api/v1/academicPeriod/${periodId}/activate/${associationId}`,
                //'/api/v1/academicPeriod',
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
    create: async (data: any): Promise<any> => {
        try {
            const response = await axiosInstance.post<any>(
                '/api/v1/academicPeriod',
                data
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
};

export default YearSettingsServiceApi;