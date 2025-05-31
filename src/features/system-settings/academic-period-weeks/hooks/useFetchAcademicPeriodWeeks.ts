import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import AcademicPeriodWeekServiceApi from '../services/AcademicPeriodWeekServiceApi';

const useFetchAcademicPeriodWeeks = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['academicPeriodsWeeks', associationId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                return AcademicPeriodWeekServiceApi.getActiveWeeksByAssociationId(associationId);
            } catch (err) {
                console.error("Error fetching academicPeriodWeeks:", err);
                throw err;
            } finally {
                switchLoadingModal();
            }
        },
        gcTime: 1000 * 60 * 10,
        staleTime: 1000 * 60 * 5,
        enabled: !!associationId,
        retry: false
    });
};

export default useFetchAcademicPeriodWeeks;
