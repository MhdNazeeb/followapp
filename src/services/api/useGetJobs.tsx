import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../axios.interface';
import { JobData } from '../../types/JobData';
import { AxiosResponse } from 'axios';
import { getItem } from '../../utils/storage';

interface JobsResponse {
    jobs: JobData[];
    nextCursor: number | null;
    hasMore: boolean;
    total: number;
    currentCursor: number;
    limit: number;
}

interface FetchJobsParams {
    cursor?: number;
    limit?: number;
}

const fetchJobs = async ({ cursor = 0, limit = 20 }: FetchJobsParams): Promise<JobsResponse> => {
    const userId = await getItem('userId');
    const { data }: AxiosResponse<JobsResponse> = await api.get(`jobs/${userId}`, {
        params: {
            cursor,
            limit,
        },
    });
    
    return data;
};

export const useJobs = (limit: number = 20) => {
    return useInfiniteQuery<JobsResponse, Error>({
        queryKey: ['jobs', limit],
        queryFn: ({ pageParam = 0 }) => fetchJobs({ cursor: pageParam as number, limit }),
        getNextPageParam: (lastPage) => {
            // Return nextCursor if there's more data, otherwise return undefined to stop fetching
            return lastPage.hasMore ? lastPage.nextCursor : undefined;
        },
        initialPageParam: 0,
    });
};