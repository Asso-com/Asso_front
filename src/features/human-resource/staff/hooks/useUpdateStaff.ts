import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '@store/toastSlice';
import StaffServiceApi from '../services/StaffServiceApi';
import type { RootState } from '@store/index';

interface StaffUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  state?: string;
  comment?: string;
  basicSalary?: number;
  jobCategory?: string;
  isActive?: boolean;
}

const useUpdateStaff = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  return useMutation({
    mutationFn: async ({ staffId, data }: { staffId: number; data: StaffUpdateData }) => {
      if (!associationId || isNaN(associationId)) {
        throw new Error("L'ID de l'association est manquant ou invalide");
      }
      if (!data || Object.keys(data).length === 0) {
        throw new Error("Les données de mise à jour sont vides");
      }

      const updateData = {
        ...data,
        associationId,
      };

      return StaffServiceApi.update(staffId, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['staff', associationId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ['department-by-association', associationId],
        exact: true,
      });

      dispatch(
        showToast({
          title: 'Succès',
          message: 'Le membre du personnel a été mis à jour avec succès',
          type: 'success',
        })
      );
    },
    onError: (error: Error) => {
      const message = error.message || "Échec de la mise à jour du membre du personnel";
      dispatch(
        showToast({
          title: 'Erreur',
          message,
          type: 'error',
        })
      );
    },
  });
};

export default useUpdateStaff;