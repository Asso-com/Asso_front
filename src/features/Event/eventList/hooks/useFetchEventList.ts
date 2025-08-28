import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';
import eventServiceApi from '../service/eventServiceApi';
import type { EventResponse } from '../types/event.types';

const useFetchEventList = (
  associationId: number
): UseQueryResult<EventResponse[], Error> => {
  return useQuery<EventResponse[], Error>({
    queryKey: ['events', associationId],
    queryFn: async () => {
      switchLoadingModal();
      try {
        const response = await eventServiceApi.getAllByAssociationId(associationId);
        return response;
      } catch (err) {
        console.error("Error fetching event list:", err);
        throw err;
      } finally {
        switchLoadingModal();
      }
    },
  });
};

export default useFetchEventList;
