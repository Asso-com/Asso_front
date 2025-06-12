import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import SubjectLevelServiceApi from '../services/SubjectLevelServiceApi';
import type { AxiosError } from 'axios';

const useDeleteSubjectLevel = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation<null, AxiosError, number>({
    mutationFn: async (subjectLevelId: number) => {
      const response = await SubjectLevelServiceApi.delete(subjectLevelId);
      
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      
      return null;
    },

    onSuccess: () => {
      toast({
        title: 'Association supprimée',
        description: 'La matière a été supprimée du niveau avec succès.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      queryClient.invalidateQueries({ queryKey: ['subject-levels'] });
    },

    onError: (error) => {
      toast({
        title: 'Erreur lors de la suppression',
        description: error.message || 'Impossible de supprimer la matière.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });
};

export default useDeleteSubjectLevel;
