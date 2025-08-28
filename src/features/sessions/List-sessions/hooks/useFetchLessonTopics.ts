import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import SessionServiceApi from "../services/sessionServiceApi";
import type { LessonWithTopicsDto } from "../types/session.types";

const useFetchLessonTopics = (
  sessionId: number
): UseQueryResult<LessonWithTopicsDto[], Error> => {
  return useQuery<LessonWithTopicsDto[], Error>({
    queryKey: ["lesson-topics", sessionId],
    queryFn: () => SessionServiceApi.getLessonTopicsDetails(sessionId),
    staleTime: 2 * 60 * 1000,
    retry: false,
    enabled: sessionId !== 0,
  });
};

export default useFetchLessonTopics;
