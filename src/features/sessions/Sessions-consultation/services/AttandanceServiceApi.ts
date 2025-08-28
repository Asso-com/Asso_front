import { axiosInstance } from "@services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";

const AttendanceServiceApi = {
    getAttendanceBySessionScheduleDate: async <T = any>(
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

    deleteSessionScheduleDatesByPeriodWeeks: async (
        associationId: number,
        periodWeeksId: number
    ) => {
        try {
            await axiosInstance.delete(
                `/api/v1/session-schedule-dates/associations/${associationId}/period-weeks/${periodWeeksId}`
            );
        } catch (error) {
            handleAxiosError(error);
        }
    },

    updateSessionScheduleDate: async (
        sessionDateId: number,
        request: any
    ) => {
        try {
            const response = await axiosInstance.put(
                `/api/v1/session-schedule-dates/${sessionDateId}`,
                request
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    cancelSession: async (
        sessionDateId: number
    ) => {
        try {
            const response = await axiosInstance.patch(
                `/api/v1/session-schedule-dates/${sessionDateId}/cancel`
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    validateSession: async (
        sessionDateId: number
    ) => {
        try {
            const response = await axiosInstance.patch(
                `/api/v1/session-schedule-dates/${sessionDateId}/validate`
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },

    registerAttendance: async (
        sessionDateId: number
    ) => {
        try {
            const response = await axiosInstance.patch(
                `/api/v1/session-schedule-dates/${sessionDateId}/register-attendance`
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },
};

export default AttendanceServiceApi;