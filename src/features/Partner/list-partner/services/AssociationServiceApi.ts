import { axiosInstance } from "@services/api-services/axiosInstance";


const AssociationServiceApi = {

    getAll: async (): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>(
                '/api/v1/associations',
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default AssociationServiceApi;