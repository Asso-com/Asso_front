import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import SubjectLevelServiceApi from '../services/SubjectLevelServiceApi';

interface DeleteSubjectLevelPayload {
  levelId: number;
  subjectId: number;
  subjectName?: string; // Optional for clearer error messages
}

interface DeleteSubjectLevelOptions {
  onSuccess?: (data: void, variables: DeleteSubjectLevelPayload) => void;
  onError?: (error: Error, variables: DeleteSubjectLevelPayload) => void;
}

const useDeleteSubjectLevel = (
  associationId: number, // Always a number for consistency
  options: DeleteSubjectLevelOptions = {}
) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<void, Error, DeleteSubjectLevelPayload>({
    mutationFn: async ({ levelId, subjectId }: DeleteSubjectLevelPayload) => {
      // Use associationId from hook argument directly in the closure
      return SubjectLevelServiceApi.delete(levelId, subjectId, associationId);
    },

    onSuccess: (data, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["subject-levels", associationId],
      });

      // Optionally invalidate other queries
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      queryClient.invalidateQueries({ queryKey: ["levels"] });

      // Optimistic update to cache for instant UI feedback
      queryClient.setQueryData(['subject-levels', associationId], (oldData: any) => {
        if (!oldData) return oldData;
        
        return oldData.map((level: any) => ({
          ...level,
          subjects: level.subjects.filter((subject: any) => 
            subject.id !== variables.subjectId
          )
        }));
      });

      const subjectName = variables.subjectName ?? 'Subject';
      dispatch(
        showToast({
          title: 'Success',
          message: `The subject "${subjectName}" was deleted successfully.`,
          type: 'success',
        })
      );

      // Call custom onSuccess callback if provided
      options.onSuccess?.(data, variables);
    },

    onError: (error, variables) => {
      const subjectName = variables.subjectName ?? 'the subject';
      
      // Better error messages depending on type
      let errorMessage = `Failed to delete ${subjectName}`;
      
      if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message.includes('permission')) {
        errorMessage = 'You do not have the required permissions to delete this subject.';
      } else if (error.message.includes('not found')) {
        errorMessage = 'The subject no longer exists.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      dispatch(
        showToast({
          title: 'Error',
          message: errorMessage,
          type: 'error',
        })
      );

      // Call custom onError callback if provided
      options.onError?.(error, variables);
    },

    // Retry logic: skip retry for client-side errors
    retry: (failureCount, error) => {
      if (error.message.includes('permission') || error.message.includes('not found')) {
        return false;
      }
      return failureCount < 2;
    },

    // Set garbage collection timeout for cached data
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default useDeleteSubjectLevel;
