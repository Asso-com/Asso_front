import handleAxiosError from "@utils/handleAxiosError";
import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import type { SubjectLevelItem } from "../types/subject.types.ts";

export type CreateSubjectLevelDto = {
  levelId: number | string;
  associationId: number | string;
  subjectIds: (number | string)[];
};

export type SubjectLevelSelectOption = {
  value: number | string;
  label: string;
};

const SubjectLevelServiceApi = {
  getAll: async (associationId: number): Promise<SubjectLevelItem[]> => {
    try {
      const response = await axiosInstance.get<SubjectLevelItem[]>(
        `/api/v1/level-subjects/association/${associationId}`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  getSelectOptions: async (associationId: number): Promise<SubjectLevelSelectOption[]> => {
    try {
      const response = await axiosInstance.get<SubjectLevelSelectOption[]>(
        `/api/v1/level-subjects/select/association/${associationId}`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return []; // Par sécurité pour éviter undefined
    }
  },

  create: async (payload: CreateSubjectLevelDto): Promise<any> => {
    try {
      const response = await axiosInstance.post<any>(
        `/api/v1/level-subjects`,
        payload
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  updateSubjects: async (payload: CreateSubjectLevelDto): Promise<any> => {
    try {
      const response = await axiosInstance.put<any>(
        `/api/v1/level-subjects/by-level-and-association`,
        payload
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  delete: async (
    levelId: number | string,
    subjectId: number | string,
    associationId: number | string
  ): Promise<any> => {
    try {
      const response = await axiosInstance.delete<any>(
        `/api/v1/level-subjects/level/${levelId}/subject/${subjectId}/association/${associationId}`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
};

export default SubjectLevelServiceApi;
