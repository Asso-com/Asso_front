import type { AxiosError } from "axios";
import { axiosInstance } from "@services/api-services/axiosInstance";

const CoefficientServiceApi = {
  getAll: async (associationId: number): Promise<any[]> => {
    try {
      const response = await axiosInstance.get<any[]>(
        `/api/v1/coefficients/association/${associationId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getById: async (id: number): Promise<any> => {
    try {
      const response = await axiosInstance.get<any>(
        `/api/v1/coefficients/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  create: async (data: any): Promise<any> => {
    try {
      // Convertir du format snake_case au format camelCase pour l'API
      const apiData = {
        associationId: data.association_id,
        assiduityCoefficient: Number(data.assiduity_coefficient),
        delayBeforeAttendance: Number(data.delay_before_attendance),
        participationCoefficient: Number(data.participation_coefficient),
        quizCoefficient: Number(data.quiz_coefficient)
      };

      const response = await axiosInstance.post<any>(
        '/api/v1/coefficients',
        apiData
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      
      // Gestion des erreurs de validation
      if (error.response?.status === 400) {
        const backendData = error.response.data as any;
        if (backendData.errors && typeof backendData.errors === 'object') {
          const validationErrors = backendData.errors as Record<string, string>;
          const message = Object.values(validationErrors).join(', ');
          throw new Error(message);
        }
        if (typeof backendData === 'object') {
          const message = Object.values(backendData).join(', ');
          throw new Error(message);
        }
        throw new Error('Validation failed');
      }
      
      // Gestion des conflits - coefficient existant déjà
      if (error.response?.status === 409) {
        try {
          const associationId = data.association_id;
          const existingCoefs = await CoefficientServiceApi.getAll(associationId);
          
          if (existingCoefs && existingCoefs.length > 0) {
            // Utiliser l'ID existant pour mettre à jour au lieu de créer
            const updatedData = await CoefficientServiceApi.update(existingCoefs[0].id, apiData);
            return updatedData;
          }
        } catch (updateError) {
          console.error("Failed to update existing coefficient:", updateError);
          throw new Error("Un coefficient existe déjà ");
        }
      }
      
      throw error;
    }
  },
  
  update: async (id: number, data: any): Promise<any> => {
    try {
      // Si les données sont déjà en camelCase, les utiliser directement
      // Sinon, les convertir
      const apiData = data.assiduityCoefficient ? data : {
        assiduityCoefficient: Number(data.assiduity_coefficient),
        delayBeforeAttendance: Number(data.delay_before_attendance),
        participationCoefficient: Number(data.participation_coefficient),
        quizCoefficient: Number(data.quiz_coefficient)
      };
      
      const response = await axiosInstance.put<any>(
        `/api/v1/coefficients/${id}`,
        apiData
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      
      if (error.response?.status === 400) {
        const backendData = error.response.data as any;
        if (backendData.errors && typeof backendData.errors === 'object') {
          const validationErrors = backendData.errors as Record<string, string>;
          const message = Object.values(validationErrors).join(', ');
          throw new Error(message);
        }
        if (typeof backendData === 'object') {
          const message = Object.values(backendData).join(', ');
          throw new Error(message);
        }
        throw new Error('Validation failed');
      }
      
      throw error;
    }
  },
  
  delete: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete<void>(
        `/api/v1/coefficients/${id}`
      );
    } catch (error) {
      throw error;
    }
  }
};

export default CoefficientServiceApi;