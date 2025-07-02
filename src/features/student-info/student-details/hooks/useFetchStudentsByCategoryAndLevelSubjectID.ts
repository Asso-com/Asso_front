import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import StudentServiceApi from '../services/StudentServiceApi';

const useFetchStudentsByCategoryAndLevelSubjectID = (
    associationId: number,
    categoryId: number,
    levelSubjectId: number
): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['studentsByFilters', associationId, categoryId, levelSubjectId],
        queryFn: async () => {
            switchLoadingModal();
            try {
                const response = await StudentServiceApi.getByAssociationCategoryAndLevelSubject(
                    associationId,
                    categoryId,
                    levelSubjectId
                );
                return response;
            } catch (err) {
                console.error("Error fetching filtered students:", err);
                throw err; 
            } finally {
                switchLoadingModal();
            }
        },
        gcTime: 1000 * 60 * 10,
        staleTime: 1000 * 60 * 5,
        enabled: !!associationId && !!categoryId && !!levelSubjectId,
        retry: false
    });
};

export default useFetchStudentsByCategoryAndLevelSubjectID;
