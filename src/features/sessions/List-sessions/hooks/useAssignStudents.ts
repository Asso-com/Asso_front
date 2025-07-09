import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import SessionServiceApi from '../services/sessionServiceApi';
import type { StudentsEnrollmentRequest } from '../types/session.types';

const useAssignStudentsToSession = (sessionId: number, associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<void, Error, StudentsEnrollmentRequest>({
    mutationFn: (request) =>
      SessionServiceApi.assignStudentToSession(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['session-enrollment-status', sessionId, associationId],
      });

      dispatch(
        showToast({
          title: 'Succès',
          message: 'Les étudiants ont été assignés à la session avec succès.',
          type: 'success',
        })
      );
    },

    onError: (err) => {
      dispatch(
        showToast({
          title: 'Erreur',
          message: err.message,
          type: 'error',
        })
      );
    },
  });
};

export default useAssignStudentsToSession;
