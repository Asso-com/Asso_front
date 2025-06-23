import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import LessonServiceApi from "../services/LessonServiceApi";
import { showToast } from "@store/toastSlice";
import type { LessonUpdateDto, LessonSummary } from "../types/lesson.types";

const useReorderAndUpdateLesson = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload: LessonUpdateDto[]) =>
      LessonServiceApi.updateLessonsBatch(associationId, payload),

    onSuccess: (data: LessonSummary[]) => {
      queryClient.invalidateQueries({ queryKey: ["lessons", associationId] });

      dispatch(
        showToast({
          title: "Success",
          message: "Lessons reordered and updated successfully.",
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

export default useReorderAndUpdateLesson;
