import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import type { CreateSubjectLevelDto } from "../services/SubjectLevelServiceApi"
import SubjectLevelServiceApi from "../services/SubjectLevelServiceApi";

export function useEditSubjectLevel() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: CreateSubjectLevelDto) =>
      SubjectLevelServiceApi.updateSubjects(payload),

    onSuccess: (response) => {
      if (response.status === "success") {
        toast({
          title: "Matières mises à jour avec succès.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["subject-levels", response.data?.associationId],
        });
      } else {
        toast({
          title: "Échec de la mise à jour",
          description: response.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },

    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur réseau s'est produite.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
}
