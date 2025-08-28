import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";

const FamilyServiceApi = {
  getAllFamilies: async (associationId: number): Promise<any[]> => {
    try {
      const response = await axiosInstance.get<any[]>(`/api/v1/families`, {
        params: { associationId },
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  getFamilyById: async (id: string): Promise<any> => {
    try {
      const response = await axiosInstance.get<any>(`/api/v1/families/${id}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  update: async (id: string, body: any) => {
    try {
      const response = await axiosInstance.put(`/api/v1/families/${id}`, body);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  delete: async (id: string) => {
    try {
      await axiosInstance.delete(`/api/v1/families/${id}`);
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },
};

export default FamilyServiceApi;
