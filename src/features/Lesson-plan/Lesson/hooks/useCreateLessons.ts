import { useMutation, useQueryClient } from "@tanstack/react-query";
import LessonServiceApi from "../services/LessonServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import type { LessonRequestDto } from "../services/LessonServiceApi";

const useCreateLessons = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload: LessonRequestDto) => LessonServiceApi.createLessons(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons', associationId] });

      dispatch(
        showToast({
          title: "Success",
          message: "Lessons created successfully.",
          type: "success",
        })
      );
    },

    onError: (err: Error) => {
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

export default useCreateLessons;
