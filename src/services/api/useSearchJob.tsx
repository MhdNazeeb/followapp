import { useQuery } from '@tanstack/react-query';
import api from '../axios.interface';
import { JobData } from '../../types/JobData';
import { AxiosResponse } from 'axios';

const searchJob = async (searchText: string): Promise<JobData[]> => {
    
    const { data }: AxiosResponse<JobData[]> = await api.get("search_jobs", {
        params: { searchText },
    });    
    return data;
};

export const useSearchJob = (query: string,enable:boolean) => {
      
    return useQuery<JobData[], Error>({
        queryKey: ['searchjobs', query],
        queryFn: () => searchJob(query),
        // enabled:enable,
    });
};
