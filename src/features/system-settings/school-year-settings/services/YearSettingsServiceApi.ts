import { axiosInstance } from "../../../../services/api-services/axiosInstance";


const YearSettingsServiceApi = {

    getAll: async (): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>(
                '/api/v1/academicPeriod',
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default YearSettingsServiceApi;