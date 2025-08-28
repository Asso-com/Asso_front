import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import YearSettingsServiceApi from '../services/YearSettingsServiceApi';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';

const useFetchAcademicPeriods = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['academicPeriods', associationId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                return YearSettingsServiceApi.getAll(associationId);
            } catch (err) {
                console.error("Error fetching academicPeriods:", err);
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

export default useFetchAcademicPeriods;
