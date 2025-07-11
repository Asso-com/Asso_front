import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import sessionServiceApi from '../services/sessionServiceApi';
import type { EventResponse } from '../types/session.types';

const useFetchEventsByAssociation = (
  associationId?: number
): UseQueryResult<EventResponse[], Error> => {
  return useQuery<EventResponse[], Error>({
    queryKey: ['events', associationId],
    enabled: !!associationId,
    retry: false,
    queryFn: async () => {
      switchLoadingModal();
      try {
        const events = await sessionServiceApi.getAllByAssociationId(associationId!);
        return events;
      } catch (error) {
        console.error("Erreur lors du fetch des événements :", error);
        throw error;
      } finally {
        switchLoadingModal();
      }
    },
  });
};

export default useFetchEventsByAssociation;
