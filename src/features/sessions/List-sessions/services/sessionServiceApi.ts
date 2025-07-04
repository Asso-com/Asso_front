import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";
import type { LessonWithTopicsDto, SessionSchedulesResponse ,SessionResponse } from "../types/session.types"; // Assure-toi que ces types existent

const SessionServiceApi = {
  getAllByAssociation: async (associationId: number): Promise<SessionResponse[]> => {
    try {
      const response = await axiosInstance.get<SessionResponse[]>(
        `/api/v1/sessions/associations/${associationId}/sessions`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  getLessonTopicsDetails: async (sessionId: number): Promise<LessonWithTopicsDto[]> => {
    try {
      const response = await axiosInstance.get<LessonWithTopicsDto[]>(
        `/api/v1/sessions/${sessionId}/lesson-topics-details`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  getSessionSchedules: async (sessionId: number): Promise<SessionSchedulesResponse[]> => {
    try {
      const response = await axiosInstance.get<SessionSchedulesResponse[]>(
        `/api/v1/sessions/${sessionId}/schedules`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  }
};

export default SessionServiceApi;
