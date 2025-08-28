import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import CategoriesLevelServiceApi from "../services/CategoriesLevelServiceApi";

const useDeleteCategory = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<void, Error, number>({
    mutationFn: (categoryId: number) =>
      CategoriesLevelServiceApi.delete(categoryId, associationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories", associationId],
      });

      dispatch(
        showToast({
          title: "Success",
          message: "Category level deleted successfully.",
          type: "success",
        })
      );
    },

    onError: (err) => {
      const error = err.message as string;
      dispatch(
        showToast({
          title: "Error",
          message: error,
          type: "error",
        })
      );
    },
  });
};

export default useDeleteCategory;
