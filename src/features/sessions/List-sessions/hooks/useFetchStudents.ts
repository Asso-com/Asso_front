import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import SessionServiceApi from "../services/sessionServiceApi";
import type { StudentEnrollmentResponse } from "../types/session.types";

const useFetchSessionEnrollmentStatus = (
  sessionId: number,
  associationId: number
): UseQueryResult<StudentEnrollmentResponse[], Error> => {
  return useQuery<StudentEnrollmentResponse[], Error>({
    queryKey: ["session-enrollment-status", sessionId, associationId],
    queryFn: () => SessionServiceApi.getSessionEnrollmentStatus(sessionId, associationId),
    retry: false,
    enabled: sessionId !== 0 && associationId !== 0,
  });
};

export default useFetchSessionEnrollmentStatus;