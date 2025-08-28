import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import YearSettingsServiceApi from '../services/YearSettingsServiceApi';

const useFetchActivePeriod = (associationId: number): UseQueryResult<any, Error> => {
    return useQuery<any, Error>({
        queryKey: ['academicPeriodsActive', associationId],
        queryFn: async () => {

            try {
                return YearSettingsServiceApi.getActivePeriodByAssociationId(associationId);
            } catch (err) {
                console.error("Error fetching academicPeriods active:", err);
                throw err;
            }
        },
        enabled: !!associationId,
        retry: false
    });
};

export default useFetchActivePeriod;