import type { AxiosError } from "axios";
import { axiosInstance } from "../../../../services/api-services/axiosInstance";

const CategoriesLevelServiceApi = {
  getAll: async (associationId: number): Promise<any> => {
    try {
      const response = await axiosInstance.get<any>(
        `/api/v1/level-categories/association/${associationId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (data: any, associationId: number): Promise<any> => {
    try {
      const response = await axiosInstance.post<any>(
        `/api/v1/level-categories/association/${associationId}`,
        data
      );
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

        if (typeof backendData === "object") {
          const message = Object.values(backendData).join(", ");
          throw new Error(message);
        }

        throw new Error("Validation failed");
      }

      console.error("API Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  },
};

export default CategoriesLevelServiceApi;
