import type { AxiosError } from "axios";
import { axiosInstance } from "@services/api-services/axiosInstance";
import type { CoefficientType } from "../types";

const CoefficientServiceApi = {
  getAll: async (associationId: number): Promise<any[]> => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/coefficients/association/${associationId}`
      );
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching coefficients:", error);
      throw error;
    }
  },
  
  getById: async (id: number): Promise<any> => {
    try {
      const response = await axiosInstance.get(`/api/v1/coefficients/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching coefficient by id:", error);
      throw error;
    }
  },
  
  create: async (data: any): Promise<any> => {
    try {
      // Les données sont en snake_case, convertir en camelCase pour le backend
      const apiData = {
        associationId: data.association_id,
        assiduityCoefficient: Number(data.assiduity_coefficient),
        delayBeforeAttendance: Number(data.delay_before_attendance),
        participationCoefficient: Number(data.participation_coefficient),
        quizCoefficient: Number(data.quiz_coefficient)
      };
      
      console.log("Creating coefficient with data:", apiData);
      const response = await axiosInstance.post(
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
  
  update: async (id: number, data: any): Promise<any> => {
    try {
      // Les données sont en snake_case, convertir en camelCase pour le backend
      const apiData = {
        assiduityCoefficient: Number(data.assiduity_coefficient),
        delayBeforeAttendance: Number(data.delay_before_attendance),
        participationCoefficient: Number(data.participation_coefficient),
        quizCoefficient: Number(data.quiz_coefficient)
      };
      
      console.log("Updating coefficient with data:", apiData);
      const response = await axiosInstance.put(
        `/api/v1/coefficients/${id}`,
        apiData
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error updating coefficient:", error);
      throw error;
    }
  },
  
  delete: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/v1/coefficients/${id}`);
    } catch (error) {
      console.error("Error deleting coefficient:", error);
      throw error;
    }
  }
};

export default CoefficientServiceApi;