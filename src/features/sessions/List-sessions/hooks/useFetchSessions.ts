import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import SessionServiceApi from "../services/sessionServiceApi";
import type { SessionResponse } from "@features/sessions/Add-session/services/SessionServiceApi";

const useFetchSessionsByAssociation = (
  associationId: number
): UseQueryResult<SessionResponse[], Error> => {
  return useQuery<SessionResponse[], Error>({
    queryKey: ["sessions", associationId],
    queryFn: () => SessionServiceApi.getAllByAssociation(associationId),
    retry: false,
    enabled: associationId !== 0,
  });
};

export default useFetchSessionsByAssociation;
