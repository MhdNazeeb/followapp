import { useQuery } from '@tanstack/react-query';
import api from '../axios.interface';
import { JobData } from '../../types/JobData';
import { AxiosResponse } from 'axios';

// fetcher accepts query param
const fetchJobs = async (query: string): Promise<JobData[]> => {

  const { data }: AxiosResponse<JobData[]> = await api.get("similar_jobs", {
    params: { id: query }
  });
  return data;
};


export const useSimilarJob = (query: string) => {
  return useQuery<JobData[], Error>({
    queryKey: ['similar_jobs', query],
    queryFn: () => fetchJobs(query),
    // enabled: !!query
  });
};
