// useGetJobById.ts
import { useQuery } from '@tanstack/react-query';
import api from '../axios.interface';
import { JobData } from '../../types/JobData';
import { AxiosResponse } from 'axios';

const fetchJob = async (jobid: string): Promise<JobData> => {
  
    
    const { data }: AxiosResponse<JobData> = await api.get(`job_by_id/${jobid}`);
    return data; 
};

export const useGetJobById = (jobid: string) => {
    return useQuery<JobData, Error>({
        queryKey: ['job', jobid],
        queryFn: () => fetchJob(jobid),
        enabled: !!jobid,
    });
};