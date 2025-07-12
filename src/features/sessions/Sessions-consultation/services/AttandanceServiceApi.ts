// AttandanceServiceApi.ts
import { axiosInstance } from "@services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";

const AttandanceServiceApi = {
    getAttandanceBySessionScheduleDate: async <T = any>(
        sessionScheduleDateId: number
    ): Promise<T> => {
        try {
            const response = await axiosInstance.get<T>(
                `/api/v1/attendances/session-date/${sessionScheduleDateId}`
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
};

export default AttandanceServiceApi;
