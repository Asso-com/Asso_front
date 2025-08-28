import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import SessionServiceApi from '../services/sessionServiceApi';
import type { StudentsEnrollmentRequest } from '../types/session.types';

const useAssignStudentsToSession = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<void, Error, StudentsEnrollmentRequest>({
    mutationFn: (request) =>
      SessionServiceApi.assignStudentToSession(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sessions', associationId],
      });

      dispatch(
        showToast({
          title: 'Success',
          message: 'Students have been successfully assigned to the session.',
          type: 'success',
        })
      );
    },

    onError: (err) => {
      dispatch(
        showToast({
          title: 'Error',
          message: err.message,
          type: 'error',
        })
      );
    },
  });
};

export default useAssignStudentsToSession;
