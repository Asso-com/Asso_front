import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/toastSlice';
import SessionServiceApi from '../services/SessionServiceApi';
import type { SessionFormData } from '../types/addsession.types';
import type { SessionResponse } from '../services/SessionServiceApi';
import { useNavigate } from 'react-router-dom';

const useCreateSession = (associationId: number) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation<SessionResponse, Error, SessionFormData>({
    mutationFn: (payload) => {
      return SessionServiceApi.create(payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions', associationId] });
      navigate(`/Sessions/listSessions`);
      dispatch(
        showToast({
          title: 'Success',
          message: 'Session created successfully.',
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

export default useCreateSession;