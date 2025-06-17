import { useMutation, useQueryClient } from "@tanstack/react-query";
import LessonServiceApi from "../services/LessonServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import type { LessonRequestDto } from "../services/LessonServiceApi";

const useUpdateLessons = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload: LessonRequestDto) => LessonServiceApi.updateLessons(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons', associationId] });

      dispatch(
        showToast({
          title: "Success",
          message: "Lessons updated successfully.",
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

export default useUpdateLessons;
