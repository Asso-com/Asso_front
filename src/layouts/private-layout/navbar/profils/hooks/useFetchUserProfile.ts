import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import UserServiceApi from "../services/userServiceApi";

export interface UserProfile {
    id: string; // UUID
    email: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    imageUrl: string;
    address: string;
    city: string;
    zipCode: string;
    comment: string;
}

const useFetchUserProfile = (): UseQueryResult<UserProfile, Error> => {
    return useQuery<UserProfile, Error>({
        queryKey: ["user-profile"],
        queryFn: () => UserServiceApi.getCurrentUserProfile<UserProfile>(),
        staleTime: 5 * 60 * 1000, 
        retry: false,
    });
};

export default useFetchUserProfile;
