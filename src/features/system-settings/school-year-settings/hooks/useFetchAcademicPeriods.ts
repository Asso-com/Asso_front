import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import YearSettingsServiceApi from '../services/YearSettingsServiceApi';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';

const useFetchAcademicPeriods = (): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['academicPeriods'],
        queryFn: async () => {
            switchLoadingModal();
            try {
                return YearSettingsServiceApi.getAll();
            } catch (err) {
                console.error("Error fetching academicPeriods:", err);
                throw err;
            } finally {
                switchLoadingModal();
            }
        },
        gcTime: 1000 * 60 * 10,
        staleTime: 1000 * 60 * 5,
    });
};

export default useFetchAcademicPeriods;
