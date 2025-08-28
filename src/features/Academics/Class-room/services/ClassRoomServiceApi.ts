import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";


const ClassRoomServiceApi = {

    getAll: async (associationId: number): Promise<any> => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/class-rooms/association/${associationId}`,
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    toggleStatus: async (classRoomId: number): Promise<{ success: boolean; message?: string }> => {
        try {
            const response = await axiosInstance.patch(
                `/api/v1/class-rooms/${classRoomId}/toggle-status`
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
                `/api/v1/class-rooms`,
                payload
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    update: async (id: number, data: {
        name: string;
        capacity: number;
        description: string;
    }): Promise<any> => {
        try {
            const response = await axiosInstance.put(
                `/api/v1/class-rooms/${id}`,
                {
                    name: data.name,
                    capacity: data.capacity,
                    description: data.description
                }
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
    delete: async (classroomId: string | number): Promise<void> => {
        try {
            await axiosInstance.delete(
                `/api/v1/class-rooms/${classroomId}`
            );
        } catch (error) {
            handleAxiosError(error);
        }
    },

};

export default ClassRoomServiceApi;