import { useMutation, useQueryClient } from "@tanstack/react-query";
import LessonServiceApi from "../services/LessonServiceApi";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";

const useDeleteLessonsByIds = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (lessonIds: number[]) => LessonServiceApi.deleteLessonsByIds(lessonIds),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons', associationId] });

      dispatch(
        showToast({
          title: "Success",
          message: "Lessons deleted successfully.",
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

export default useDeleteLessonsByIds;
