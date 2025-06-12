import type { AxiosError } from "axios";
import { axiosInstance } from "@services/api-services/axiosInstance";
import type { CoefficientType, CoefficientApiType } from "../types";

const CoefficientServiceApi = {
  getAll: async (associationId: number): Promise<CoefficientApiType[]> => {
    try {
      const response = await axiosInstance.get<CoefficientApiType[]>(
        `/api/v1/coefficients/association/${associationId}`
      );
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching coefficients:", error);
      throw error;
    }
  },
  
  create: async (data: Partial<CoefficientType>): Promise<CoefficientApiType> => {
    try {
      const apiData = {
        associationId: data.association_id,
        assiduityCoefficient: data.assiduity_coefficient,
        delayBeforeAttendance: data.delay_before_attendance,
        participationCoefficient: data.participation_coefficient,
        quizCoefficient: data.quiz_coefficient
      };
      
      const response = await axiosInstance.post<CoefficientApiType>(
        '/api/v1/coefficients',
        apiData
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error creating coefficient:", error);
      throw error;
    }
  },
  
  update: async (id: number, data: Partial<CoefficientType>): Promise<CoefficientApiType> => {
    try {
      const apiData = {
        assiduityCoefficient: data.assiduity_coefficient,
        delayBeforeAttendance: data.delay_before_attendance,
        participationCoefficient: data.participation_coefficient,
        quizCoefficient: data.quiz_coefficient
      };
      
      const response = await axiosInstance.put<CoefficientApiType>(
        `/api/v1/coefficients/${id}`,
        apiData
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error updating coefficient:", error);
      throw error;
    }
  }
};

export default CoefficientServiceApi;