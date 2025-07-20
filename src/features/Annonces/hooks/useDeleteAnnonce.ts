import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import AnnonceServiceApi from "../services/AnnonceServiceApi";

const useDeleteAnnonce = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (annonceId: number) => AnnonceServiceApi.delete(annonceId),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["annonces", associationId] });
      dispatch(showToast({
        title: "Success",
        message: "Annonce deleted successfully.",
        type: "success",
      }));
    },
    
    onError: (error: any) => {
      dispatch(showToast({
        title: "Error",
        message: error?.response?.data?.message || "Failed to delete annonce.",
        type: "error",
      }));
    },
  });
};

export default useDeleteAnnonce;