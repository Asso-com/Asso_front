// useFetchAttandance.ts
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import AttandanceServiceApi from "../services/AttandanceServiceApi";
import type { Attendance } from "../types";

export interface FetchAttandanceParams {
    sessionScheduleDateId: number;
    attendances: Attendance[];
}

const useFetchAttandance = (
    sessionScheduleDateId: number
): UseQueryResult<FetchAttandanceParams, Error> => {
    return useQuery<FetchAttandanceParams, Error>({
        queryKey: ["attandance-session-date", sessionScheduleDateId],
        queryFn: () =>
            AttandanceServiceApi.getAttandanceBySessionScheduleDate<FetchAttandanceParams>(
                sessionScheduleDateId
            ),
        staleTime: 5 * 60 * 1000,
        retry: false,
        enabled: !!sessionScheduleDateId,
    });
};

export default useFetchAttandance;
