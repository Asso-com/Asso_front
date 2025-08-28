import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import ReunionServiceApi from "../services/ReunionServiceApi";

interface ReunionUpdateData {
  date?: string;
  topic?: string;
  description?: string;
  familyIds?: string[];
  associationId?: number;
}

export const useUpdateReunion = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({
      reunionId,
      data,
    }: {
      reunionId: string;
      data: ReunionUpdateData;
    }) => {
      return ReunionServiceApi.update(reunionId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reunions"] });
      dispatch(
        showToast({
          title: "Succès",
          message: "Réunion mise à jour avec succès.",
          type: "success",
        })
      );
    },

    onError: (err: any) => {
      dispatch(
        showToast({
          title: "Erreur",
          message: err.message || "Erreur inconnue",
          type: "error",
        })
      );
    },
  });
};
