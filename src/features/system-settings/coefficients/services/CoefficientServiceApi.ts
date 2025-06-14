import type { AxiosError } from "axios";
import { axiosInstance } from "@services/api-services/axiosInstance";

const CoefficientServiceApi = {
  getAll: async (associationId: number): Promise<any[]> => {
    try {
      const response = await axiosInstance.get<any[]>(`/api/v1/coefficients/association/${associationId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getById: async (id: number): Promise<any> => {
    try {
      const response = await axiosInstance.get<any>(`/api/v1/coefficients/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  create: async (data: any): Promise<any> => {
    try {
      const apiData = {
        associationId: data.associationId,
        assiduityCoefficient: Number(data.assiduity_coefficient),
        delayBeforeAttendance: Number(data.delay_before_attendance),
        participationCoefficient: Number(data.participation_coefficient),
        quizCoefficient: Number(data.quiz_coefficient),
      };
      const response = await axiosInstance.post<any>("/api/v1/coefficients", apiData);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        const backendData = error.response.data as any;
        if (backendData.errors && typeof backendData.errors === "object") {
          const validationErrors = backendData.errors as Record<string, string>;
          const message = Object.values(validationErrors).join(", ");
          throw new Error(message);
        }
        throw new Error("Validation failed");
      }
      if (error.response?.status === 409) {
        throw new Error("A coefficient already exists");
      }
      throw error;
    }
  },
  update: async (id: number, data: any): Promise<any> => {
    try {
      const apiData = {
        assiduityCoefficient: Number(data.assiduityCoefficient),
        delayBeforeAttendance: Number(data.delayBeforeAttendance),
        participationCoefficient: Number(data.participationCoefficient),
        quizCoefficient: Number(data.quizCoefficient),
      };
      const response = await axiosInstance.put<any>(`/api/v1/coefficients/${id}`, apiData);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        const backendData = error.response.data as any;
        if (backendData.errors && typeof backendData.errors === "object") {
          const validationErrors = backendData.errors as Record<string, string>;
          const message = Object.values(validationErrors).join(", ");
          throw new Error(message);
        }
        throw new Error("Validation failed");
      }
      throw error;
    }
  },
  delete: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete<void>(`/api/v1/coefficients/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default CoefficientServiceApi;