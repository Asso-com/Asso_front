import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { switchLoadingModal } from "@components/shared/modal-overlay/ModalLoading";
import SubjectLevelServiceApi from "../services/SubjectLevelServiceApi";
import type { SubjectLevelSelectOption } from "../services/SubjectLevelServiceApi";

const useFetchNotAcademicLevelSubjects = (
    associationId: number): UseQueryResult<SubjectLevelSelectOption[], Error> => {
    return useQuery<SubjectLevelSelectOption[], Error>({
        queryKey: ["subject-levels-not-academic", associationId],
        queryFn: async (): Promise<SubjectLevelSelectOption[]> => {
            switchLoadingModal();
            try {
                return await SubjectLevelServiceApi.getSelectNoAcademicByAssociation(
                    associationId,
                );
            } catch (err) {
                console.error("Fetch error:", err);
                throw err;
            } finally {
                switchLoadingModal();
            }
        },
        retry: false,
        enabled: !!associationId,
    });
};
export default useFetchNotAcademicLevelSubjects;
