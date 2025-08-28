import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";
import type { EventResponse } from "../types/event.types";

const eventServiceApi = {
  create: async (formData: FormData): Promise<EventResponse> => {
    try {
      const response = await axiosInstance.post("/api/v1/events", formData);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  getById: async (id: number): Promise<EventResponse> => {
    try {
      const response = await axiosInstance.get(`/api/v1/events/${id}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  getAllByAssociationId: async (
    associationId: number
  ): Promise<EventResponse[]> => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/events/association/${associationId}`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  update: async (id: number, formData: FormData): Promise<EventResponse> => {
    try {
      const response = await axiosInstance.put(`/api/v1/events/${id}`, formData);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/v1/events/${id}`);
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },
};

export default eventServiceApi;