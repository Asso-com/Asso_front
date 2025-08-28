import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import VerificationServiceApi from '../services/VerificationServiceApi';
import { switchLoadingModal } from '@components/shared/modal-overlay/ModalLoading';

const useFetchVerificationCode = (associationId: number): UseQueryResult<any[], Error> => {
  return useQuery<any[], Error>({
    queryKey: ['otp-codes', associationId],
    queryFn: async () => {
      switchLoadingModal();
      try {
        const result = await VerificationServiceApi.getAllOtpCodes(associationId);
        return result || [];
      } catch (err) {
        console.error("❌ Error fetching OTP codes:", err);
        throw err;
      } finally {
        switchLoadingModal();
      }
    },
    retry: false,
    enabled: !!associationId, 
  });
};

export default useFetchVerificationCode;
