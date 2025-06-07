import { useQuery } from '@tanstack/react-query';
import api from '../axios.interface';
import { JobData } from '../../types/JobData';
import { AxiosResponse } from 'axios';



import { QueryFunction } from '@tanstack/react-query';

const fetchJobs: QueryFunction<any> = async ({ queryKey }) => {
    console.log(queryKey, 'Query Key Log');

    if (!Array.isArray(queryKey) || queryKey.length < 2) {
        throw new Error('Invalid queryKey format');
    }

    const [, userid] = queryKey;
    if (!userid) return [];     
    const { data }: AxiosResponse<any> = await api.get('saved_jobs', { params: { userid } });    
    console.log(data,'this is the dat beo');
        
    return data;
};



export const useGetSaved = (userid?: string) => {
    
    return useQuery<any, Error>({
        queryKey: userid ? ['saved_jobs', userid] : ['saved_jobs'],
        queryFn: fetchJobs,
        enabled: !!userid,
    });
};
