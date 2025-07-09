
import { axiosInstance } from "@services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";


const BookServiceApi = {

    getAll: async (associationId: number): Promise<any> => {
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/books/association/${associationId}`
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
}

export default BookServiceApi