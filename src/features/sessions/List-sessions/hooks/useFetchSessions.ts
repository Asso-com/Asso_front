import { useQuery } from '@tanstack/react-query';
import type { Session } from '../data';
import fakeSessions from '../data';

const fetchSessions = (): Promise<Session[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeSessions);
        }, 1000);
    });
};

const useFetchSessions = () => {
    return useQuery<Session[]>({
        queryKey: ['sessions'],
        queryFn: fetchSessions,
    });
};

export default useFetchSessions;