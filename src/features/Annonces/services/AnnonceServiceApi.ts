import { axiosInstance } from "@services/api-services/axiosInstance";

const AnnonceServiceApi = {
  getAll: async (associationId: number, type?: string) => {
    try {
      const params = new URLSearchParams({ associationId: associationId.toString() });
      if (type) params.append("type", type);
      
      const response = await axiosInstance.get(`/api/v1/annonces?${params}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/api/v1/annonces/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (data: any) => {
    try {
      const response = await axiosInstance.post("/api/v1/annonces", data);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error("Validation failed");
      }
      if (error.response?.status === 409) {
        throw new Error("Une annonce avec ce titre existe déjà");
      }
      throw error;
    }
  },

  update: async (id: number, data: any) => {
    try {
      const response = await axiosInstance.put(`/api/v1/annonces/${id}`, data);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error("Validation failed");
      }
      if (error.response?.status === 404) {
        throw new Error("Annonce not found");
      }
      throw error;
    }
  },

  delete: async (id: number) => {
    await axiosInstance.delete(`/api/v1/annonces/${id}`);
  },
};

export default AnnonceServiceApi;