import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";
import type { SessionStudentEnrollmentResponse  } from "../types/sessions.types";
const sessionServiceApi = {
    getSessionsWithEnrollmentsByAssociationId: async (
        associationId: number
    ): Promise<SessionStudentEnrollmentResponse[]> => {
        try {
            const response = await axiosInstance.get<SessionStudentEnrollmentResponse[]>(
                `/api/v1/sessions/enrollments/association/${associationId}`
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    },


};
export default sessionServiceApi;
