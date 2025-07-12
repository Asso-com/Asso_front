import { axiosInstance } from "@services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";

const ReunionServiceApi = {
  getAll: async (associationId?: number): Promise<any[]> => {
    try {
      const response = await axiosInstance.get<any[]>(
        "/api/v1/family-reunion-sessions",
        {
          params: associationId ? { associationId } : undefined,
        }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  create: async (data: any) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/family-reunion-sessions",
        data
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  update: async (id: string, data: any) => {
    try {
      const response = await axiosInstance.put(
        `/api/v1/family-reunion-sessions/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  getFamilies: async (associationId: number) => {
    try {
      const response = await axiosInstance.get("/api/v1/families", {
        params: { associationId },
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      await axiosInstance.delete(`/api/v1/family-reunion-sessions/${id}`);
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },
};

export default ReunionServiceApi;
