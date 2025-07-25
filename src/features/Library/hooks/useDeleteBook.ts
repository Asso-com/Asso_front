import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import BookServiceApi from "../service/BookServiceApi";

export const useDeleteBook = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<void, Error, number>({
    mutationFn: (id) => BookServiceApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books", associationId] });

      dispatch(
        showToast({
          title: "Success",
          message: "The book has been deleted successfully.",
          type: "success",
        })
      );
    },

    onError: (err) => {
      dispatch(
        showToast({
          title: "Error",
          message: err.message,
          type: "error",
        })
      );
    },
  });
};
