import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";

const CategoriesLevelServiceApi = {
  getAll: async (associationId: number): Promise<any> => {
    try {
      const response = await axiosInstance.get<any>(
        `/api/v1/level-categories/association/${associationId}`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  getCreateByAssociationId: async (associationId: number): Promise<any> => {
    try {
      const response = await axiosInstance.get<any>(
        `/api/v1/level-categories/association/${associationId}/created`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  toggelStatus: async (associationId: number, categoryId: number): Promise<any> => {
    try {
      const response = await axiosInstance.patch<any>(
        `/api/v1/level-categories/association/${associationId}/category/${categoryId}/toggle`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  update: async (id: number, associationId: number, data: any): Promise<any> => {
    try {
      const response = await axiosInstance.put<any>(
        `/api/v1/level-categories/association/${associationId}/category/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  delete: async (id: number, associationId: number): Promise<any> => {
    try {
      const response = await axiosInstance.delete<any>(
        `/api/v1/level-categories/association/${associationId}/category/${id}`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  create: async (data: any, associationId: number): Promise<any> => {
    try {
      const response = await axiosInstance.post<any>(
        `/api/v1/level-categories/association/${associationId}`,
        data
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
};

export default CategoriesLevelServiceApi;
