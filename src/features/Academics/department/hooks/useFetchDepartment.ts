import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import DepartmentServiceApi from '../services/DepartmentServiceApi';

const useFetchDepartment = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['department', associationId],
        queryFn: async () => {
            switchLoadingModal(); // show loading modal
            try {
                const response = await DepartmentServiceApi.getAll(associationId);
                return response;
            } catch (err) {
                console.error("Error fetching department:", err);
                throw err;
            } finally {
                switchLoadingModal(); // hide loading modal
            }
        },
        gcTime: 1000 * 60 * 10,  // cache garbage collection time
        staleTime: 1000 * 60 * 5, // data considered fresh for 5 min
        enabled: !!associationId, // only run if associationId is valid
        retry: false
    });
};

export default useFetchDepartment;
