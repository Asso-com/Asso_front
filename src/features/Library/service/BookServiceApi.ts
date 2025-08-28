import { axiosInstance } from "@services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";
import type { BookRequest,Book } from "@features/Library/types";

const BookServiceApi = {
  getAll: async (associationId: number): Promise<Book[]> => {
    try {
      const response = await axiosInstance.get(`/api/v1/books/association/${associationId}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return []; // fallback value
    }
  },

  getById: async (id: number): Promise<Book | undefined> => {
    try {
      const response = await axiosInstance.get(`/api/v1/books/${id}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  create: async (data: BookRequest): Promise<void> => {
    try {
      await axiosInstance.post(`/api/v1/books/create`, data);
    } catch (error) {
      handleAxiosError(error);
    }
  },

  update: async (id: number, data: BookRequest): Promise<void> => {
    try {
      await axiosInstance.put(`/api/v1/books/update/${id}`, data);
    } catch (error) {
      handleAxiosError(error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/v1/books/delete/${id}`);
    } catch (error) {
      handleAxiosError(error);
    }
  },
};

export default BookServiceApi;
