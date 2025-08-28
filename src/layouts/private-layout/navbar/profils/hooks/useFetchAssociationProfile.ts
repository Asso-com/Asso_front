
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import UserServiceApi from "../services/userServiceApi";

export interface AssociationDetailResponse {
  id: number;
  associationIdentifier: string;
  name: string;
  email: string;
  phone: string;
address: string;
logoUrl: string;
}


const useFetchAssociationProfile = (
  id: number
): UseQueryResult<AssociationDetailResponse, Error> => {
  return useQuery<AssociationDetailResponse, Error>({
    queryKey: ["association-profile", id],
    queryFn: () => UserServiceApi.getAssociationProfile<AssociationDetailResponse>(id),
    staleTime: 5 * 60 * 1000, 
    retry: false,
    enabled: !!id, 
  });
};

export default useFetchAssociationProfile;
