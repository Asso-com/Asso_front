// services/SessionServiceApi.ts
import handleAxiosError from "@utils/handleAxiosError";
import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import type { SessionFormData } from "../types/addsession.types";

export type SessionResponse = {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  associationId: number;
};

const SessionServiceApi = {
  create: async (payload: SessionFormData): Promise<SessionResponse> => {
    try {
      // Transform payload to match backend expectations
      const { categoryId, sessionSchedules, ...rest } = payload;
      const transformedPayload = {
        ...rest,
        sessionSchedules: sessionSchedules.map((schedule) => ({
          ...schedule,
          sessionType: payload.sessionType, // Add sessionType to each schedule
        })),
      };

      const response = await axiosInstance.post<SessionResponse>(
        `/api/v1/sessions`,
        transformedPayload
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },
};

export default SessionServiceApi;
