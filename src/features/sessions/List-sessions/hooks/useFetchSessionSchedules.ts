import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import SessionServiceApi from "../services/sessionServiceApi";
import type { SessionSchedulesResponse } from "../types/session.types";

const useFetchSessionSchedules = (
  sessionId: number
): UseQueryResult<SessionSchedulesResponse[], Error> => {
  return useQuery<SessionSchedulesResponse[], Error>({
    queryKey: ["session-schedules", sessionId],
    queryFn: () => SessionServiceApi.getSessionSchedules(sessionId),
    staleTime: 5 * 60 * 1000,
    retry: false,
    enabled: sessionId !== 0,
  });
};

export default useFetchSessionSchedules;
