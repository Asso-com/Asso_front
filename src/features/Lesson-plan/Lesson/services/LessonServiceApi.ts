import handleAxiosError from "@utils/handleAxiosError";
import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import type { LessonSummary } from "../types/lesson.types.ts";
export type LessonRequestDto = {
  levelSubjectId: number;
  lessonNames: string[];
};

const LessonServiceApi = {
  // GET /lessons/association/{associationId}
  getByAssociationId: async (associationId: number): Promise<LessonSummary[]> => {
    try {
      const response = await axiosInstance.get<LessonSummary[]>(
        `/api/v1/lessons/association/${associationId}`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return [];
    }
  },

  // POST /lessons
  createLessons: async (payload: LessonRequestDto): Promise<LessonSummary[]> => {
    try {
      const response = await axiosInstance.post<LessonSummary[]>(
        `/api/v1/lessons`,
        payload
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return [];
    }
  },

  // PUT /lessons
  updateLessons: async (payload: LessonRequestDto): Promise<LessonSummary[]> => {
    try {
      const response = await axiosInstance.put<LessonSummary[]>(
        `/api/v1/lessons`,
        payload
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return [];
    }
  },

  // DELETE /lessons/{lessonId}
  deleteLessonById: async (lessonId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/v1/lessons/${lessonId}`);
    } catch (error) {
      handleAxiosError(error);
    }
  },

  // DELETE /lessons
  deleteLessonsByIds: async (lessonIds: number[]): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/v1/lessons`, { data: lessonIds });
    } catch (error) {
      handleAxiosError(error);
    }
  },

  // DELETE /lessons/association/{associationId}
  deleteLessonsByAssociation: async (associationId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/v1/lessons/association/${associationId}`);
    } catch (error) {
      handleAxiosError(error);
    }
  }
};

export default LessonServiceApi;
