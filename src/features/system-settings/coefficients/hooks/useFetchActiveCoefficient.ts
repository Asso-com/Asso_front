import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import CoefficientServiceApi from "../services/CoefficientServiceApi";

const useFetchActiveCoefficient = (associationId: number): UseQueryResult<any, Error> => {
  return useQuery<any, Error>({
    queryKey: ["coefficientsActive", associationId],
    queryFn: async () => {
      try {
        const data = await CoefficientServiceApi.getById(associationId); 
        return data.find((item: any) => item.active);
      } catch (err) {
        console.error("Error fetching active coefficient:", err);
        throw err;
      }
    },
    enabled: !!associationId,
    retry: false,
  });
};

export default useFetchActiveCoefficient;