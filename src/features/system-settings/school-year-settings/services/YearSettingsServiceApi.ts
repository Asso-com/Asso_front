import type { AxiosError } from "axios";
import { axiosInstance } from "../../../../services/api-services/axiosInstance";


const YearSettingsServiceApi = {
    
    getActivePeriodByAssociationId: async (associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/academicPeriod/association/${associationId}/active`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAll: async (associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/academicPeriod/association/${associationId}`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    activateOrDeactivateAcademicPeriod: async (periodId: number, associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.put<any>(
                `/api/v1/academicPeriod/${periodId}/activate/${associationId}`,
                //'/api/v1/academicPeriod',
            );
            return response.data;
        } catch (error) {https://typescript-eslint.io/rules/no-explicit-any
            throw error;
        }
    },
    create: async (data: any): Promise<any> => {
        try {
            const response = await axiosInstance.post<any>(
                '/api/v1/academicPeriod',
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

export default YearSettingsServiceApi;