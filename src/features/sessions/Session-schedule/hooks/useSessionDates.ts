import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import SessionScheduleDatesApi from '../services/SessionScheduleDatesApi';
import type { SessionSchuduleDate } from '../types';

const useSessionDates = (associationId: number, periodWeeksId: number): UseQueryResult<any, Error> => {
    return useQuery<SessionSchuduleDate[], Error>({
        queryKey: ['session-dates', associationId, periodWeeksId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                const response = await SessionScheduleDatesApi.getAllSessionScheduleDates(associationId, periodWeeksId);
                return response;
            } catch (err) {
                console.error("Error fetching department:", err);
                throw err;
            } finally {
                switchLoadingModal();
            }
        },
        gcTime: 1000 * 60 * 3,  // cache garbage collection time
        staleTime: 1000 * 60 * 2, // data considered fresh for 2 min
        enabled: !!associationId && !!periodWeeksId,
        retry: false
    });
};

export default useSessionDates;
