import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import LevelServiceApi from "../services/LevelServiceApi";

const useDeleteLevel = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation<void, Error, number>({
        mutationFn: (levelId) => LevelServiceApi.delete(levelId, associationId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['levels', associationId],
            });

            dispatch(
                showToast({
                    title: "Success",
                    message: `Level deleted successfully.`,
                    type: "success",
                })
            );
        },

        onError: (err) => {
            const error = err.message as string;
            dispatch(
                showToast({
                    title: 'Error',
                    message: error,
                    type: 'error',
                })
            );
        },
    });
};

export default useDeleteLevel;
