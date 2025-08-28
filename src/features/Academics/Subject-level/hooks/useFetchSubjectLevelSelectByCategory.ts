// Dans useFetchSubjectLevelSelectByCategory.ts
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { switchLoadingModal } from "@components/shared/modal-overlay/ModalLoading";
import SubjectLevelServiceApi from "../services/SubjectLevelServiceApi";
import type { SubjectLevelSelectOption } from "../services/SubjectLevelServiceApi";

const useFetchSubjectLevelSelectByCategory = (
  associationId: number | string,
  categoryId: number | string | undefined
): UseQueryResult<SubjectLevelSelectOption[], Error> => {
  return useQuery<SubjectLevelSelectOption[], Error>({
    queryKey: ["subject-levels-select-category", associationId, categoryId],
    queryFn: async (): Promise<SubjectLevelSelectOption[]> => {
      switchLoadingModal();
      try {
        return await SubjectLevelServiceApi.getSelectOptionsByCategory(
          associationId,
          categoryId!  
        );
      } catch (err) {
        console.error("Fetch error:", err);
        throw err;
      } finally {
        switchLoadingModal();
      }
    },
    staleTime: 0,
    gcTime: 0,
    retry: false,
    enabled: !!associationId && !!categoryId, 
  });
};
export default useFetchSubjectLevelSelectByCategory;
