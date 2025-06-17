import { useMutation, useQueryClient } from "@tanstack/react-query";
import LessonServiceApi from "../services/LessonServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";

const useDeleteLessonById = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (lessonId: number) => LessonServiceApi.deleteLessonById(lessonId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons', associationId] });

      dispatch(
        showToast({
          title: "Success",
          message: "Lesson deleted successfully.",
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

export default useDeleteLessonById;
