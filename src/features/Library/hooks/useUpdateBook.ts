import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import BookServiceApi from "../service/BookServiceApi";
import type { BookRequest } from "../types";

interface UpdateBookPayload {
  bookId: number;
  data: BookRequest;
}

export const useUpdateBook = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<void, Error, UpdateBookPayload>({
    mutationFn: ({ bookId, data }) => BookServiceApi.update(bookId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books", associationId] });
      dispatch(
        showToast({
          title: "Success",
          message: "The book has been updated successfully.",
          type: "success",
        })
      );
    },

    onError: (error) => {
      dispatch(
        showToast({
          title: "Error",
          message: error.message || "Failed to update book",
          type: "error",
        })
      );
    },
  });
};