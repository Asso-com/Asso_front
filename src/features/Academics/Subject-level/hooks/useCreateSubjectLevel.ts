import { useMutation } from "@tanstack/react-query";
import SubjectLevelServiceApi from "../services/SubjectLevelServiceApi";
import type { CreateSubjectLevelDto } from "../services/SubjectLevelServiceApi";

type UseCreateSubjectLevelOptions = {
  onSuccess?: (data: any) => void;
  onError?: (message: string) => void;
};

const useCreateSubjectLevel = (options?: UseCreateSubjectLevelOptions) => {
  return useMutation({
    mutationFn: async (payload: CreateSubjectLevelDto) => {
      const response = await SubjectLevelServiceApi.create(payload);
      if (response.status === "error") {
        throw new Error(response.message ?? "Une erreur s'est produite");
      }
      return response.data;
    },
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error: Error) => {
      if (options?.onError) {
        options.onError(error.message);
      } else {
        console.error("Erreur lors de la création du niveau-matière :", error.message);
      }
    },
  });
};

export default useCreateSubjectLevel;