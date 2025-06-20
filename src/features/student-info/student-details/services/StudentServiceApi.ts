import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";


const StudentServiceApi = {

    getAll: async (associationId: number): Promise<any> => {
        
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/student/association/${associationId}`,
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    

    create: async (associationId: number, data: any): Promise<any> => {
        try {
            const payload = {
                ...data,
                associationId
            };
            const response = await axiosInstance.post<unknown>(
                `/api/v1/student`,
                payload
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    update: async (id: number, data: {
         /* data */
    }): Promise<any> => {
        try {
            const response = await axiosInstance.put(
                `/api/v1/student/${id}`,
                {
                   /* data */
                }
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
    delete: async (StudentId: string | number): Promise<void> => {
        try {
            await axiosInstance.delete(
                `/api/v1/student/${StudentId}`
            );
        } catch (error) {
            handleAxiosError(error);
        }
    },

};

export default StudentServiceApi;