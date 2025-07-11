import { useQuery } from '@tanstack/react-query';
import api from '../axios.interface';
import { JobData } from '../../types/JobData';
import { AxiosResponse } from 'axios';



const fetchJobs = async (): Promise<JobData[]> => {
    const {data}: AxiosResponse<JobData[]> = await api.get("jobs");    
    
    return data;
};

export const useJobs = () => {
    return useQuery<JobData[], Error>({
        queryKey: ['jobs'],
        queryFn: fetchJobs,
        // enabled: true
    });
    
};
