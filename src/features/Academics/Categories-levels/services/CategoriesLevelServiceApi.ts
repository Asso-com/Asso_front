import { axiosInstance } from "../../../../services/api-services/axiosInstance";


const CategoriesLevelServiceApi = {

    getAll: async (associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/level-categories/association/${associationId}`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default CategoriesLevelServiceApi;