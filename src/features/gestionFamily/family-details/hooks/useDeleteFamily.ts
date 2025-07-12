import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import FamilyServiceApi from "../services/FamilyServiceApi";

const useDeleteFamily = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!id) throw new Error("Invalid Family ID");
      return await FamilyServiceApi.delete(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["families"] });
      dispatch(
        showToast({
          title: "Success",
          message: "Family deleted successfully.",
          type: "success",
        })
      );
    },

    onError: (err: any) => {
      const errorMsg = err?.message || "Error deleting family.";
      dispatch(
        showToast({
          title: "Error",
          message: errorMsg,
          type: "error",
        })
      );
    },
  });
};

export default useDeleteFamily;
