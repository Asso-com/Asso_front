import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import SubjectServiceApi from '../services/SubjectServiceApi';

const useFetchSubjects = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['subjects', associationId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                return SubjectServiceApi.getAll(associationId);
            } catch (err) {
                console.error("Error fetching academicPeriods:", err);
                throw err;
            } finally {
                switchLoadingModal();
            }
        },
        enabled: !!associationId,
        retry: false
    });
};

export default useFetchSubjects;
