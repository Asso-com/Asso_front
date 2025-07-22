import { axiosInstance } from "@services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";

const AnnonceServiceApi = {
  getAll: async (associationId: number) => {
    try {
      const params = new URLSearchParams({ associationId: associationId.toString() });
      const response = await axiosInstance.get(`/api/v1/annonces?${params}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  getById: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/api/v1/annonces/${id}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  create: async (data: any) => {
    try {
      const response = await axiosInstance.post("/api/v1/annonces", data);
      return response.data;
    } catch (error: any) {
      handleAxiosError(error);
    }
  },

  update: async (id: number, data: any) => {
    try {
      const response = await axiosInstance.put(`/api/v1/annonces/${id}`, data);
      return response.data;
    } catch (error: any) {
      handleAxiosError(error);
    }
  },

  delete: async (id: number) => {
    try {
      await axiosInstance.delete(`/api/v1/annonces/${id}`);
    } catch (error) {
      handleAxiosError(error);
    }

  },
};

export default AnnonceServiceApi;