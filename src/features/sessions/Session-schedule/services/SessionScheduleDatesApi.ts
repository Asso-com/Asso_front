import { axiosInstance } from "@services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";

const SessionScheduleDatesApi = {

    //   / api / v1 / session - schedule - dates / by - period - weeks ? periodWeeksId = 1 & associationId=1'
    getAllSessionScheduleDates: async (associationId: number, periodWeeksId: number) => {
        try {
            const response = await axiosInstance.get<any>(
                `/api/v1/session-schedule-dates/by-period-weeks?periodWeeksId=${periodWeeksId}&associationId=${associationId}`,
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
    createSessionDates: async (associationId: number, periodWeeksId: number) => {
        try {
            const response = await axiosInstance.post<any>(
                `/api/v1/session-schedule-dates/create?associationId=${associationId}&periodWeeksId=${periodWeeksId}`,
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
    deleteSessionDates: async (associationId: number, periodWeeksId: number) => {
        try {
            const response = await axiosInstance.delete<any>(
                `/api/v1/session-schedule-dates/associations/${associationId}/period-weeks/${periodWeeksId}`,
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }

}
export default SessionScheduleDatesApi