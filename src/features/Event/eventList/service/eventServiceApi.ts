import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import handleAxiosError from "@utils/handleAxiosError";
import type { EventRequest, EventResponse } from "../types/event.types";

const eventServiceApi = {
  create: async (payload: EventRequest): Promise<void> => {
    try {
      await axiosInstance.post("/api/v1/events", payload);
    } catch (error) {
      handleAxiosError(error);
    }
  },

  getAllByAssociationId: async (
    associationId: number
  ): Promise<EventResponse[]> => {
    try {
      const response = await axiosInstance.get<EventResponse[]>(
        `/api/v1/events/association/${associationId}`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
};

export default eventServiceApi;
