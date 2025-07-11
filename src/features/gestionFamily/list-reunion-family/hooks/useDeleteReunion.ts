import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import ReunionServiceApi from "../services/ReunionServiceApi";

export const useDeleteReunion = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (reunionId: string) =>
      ReunionServiceApi.delete(reunionId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reunions"] });

      dispatch(
        showToast({
          title: "Succès",
          message: "Réunion supprimée avec succès.",
          type: "success",
        })
      );
    },

    onError: (err) => {
      const error = err.message as string;
      dispatch(
        showToast({
          title: "Erreur",
          message: error,
          type: "error",
        })
      );
    },
  });
};
