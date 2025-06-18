import handleAxiosError from "@utils/handleAxiosError";
import { axiosInstance } from "../../../../services/api-services/axiosInstance";
import type { TopicSummary, TopicRequestDto } from "../types/topic.types.ts";

const TopicServiceApi = {
  // GET /topics/association/{associationId}
  getByAssociationId: async (associationId: number): Promise<TopicSummary[]> => {
    try {
      const response = await axiosInstance.get<TopicSummary[]>(
        `/api/v1/topics/association/${associationId}`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return [];
    }
  },

  // POST /topics
  createTopics: async (payload: TopicRequestDto): Promise<TopicSummary[]> => {
    try {
      const response = await axiosInstance.post<TopicSummary[]>(
        `/api/v1/topics`,
        payload
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return [];
    }
  },

  // PUT /topics
  updateTopics: async (payload: TopicRequestDto): Promise<TopicSummary[]> => {
    try {
      const response = await axiosInstance.put<TopicSummary[]>(
        `/api/v1/topics`,
        payload
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return [];
    }
  },

  // DELETE /topics/{topicId}
  deleteTopicById: async (topicId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/v1/topics/${topicId}`);
    } catch (error) {
      handleAxiosError(error);
    }
  },

  // DELETE /topics
  deleteTopicsByIds: async (topicIds: number[]): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/v1/topics`, { data: topicIds });
    } catch (error) {
      handleAxiosError(error);
    }
  },

  // DELETE /topics/association/{associationId}
  deleteTopicsByAssociation: async (associationId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/v1/topics/association/${associationId}`);
    } catch (error) {
      handleAxiosError(error);
    }
  }
};

export default TopicServiceApi;
