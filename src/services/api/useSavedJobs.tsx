import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import api from "../axios.interface";
import { LoginCredentials, LoginResponse } from "../../types/login";
import { setItem, setMultipleItems } from "../../utils/storage";
import { toastSuccess } from "../../utils/toast";




type data_type = {
    jobid: string,
    userid: string
    status:boolean
    
}
const savedJobs = async (data: data_type): Promise<any[]> => {
    const response: AxiosResponse<any> = await api.post('saved_jobs', { data })
    return response?.data
}

const useSavedJobs = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<any, AxiosError, data_type>({
        mutationFn: savedJobs,
        onSuccess: async (data) => {      
            console.log(data,'done invalidate');
                               
            queryClient.invalidateQueries({ queryKey: ['saved_jobs'] });
            queryClient.invalidateQueries({ queryKey: ['jobs'] });

            toastSuccess(data)
        },
        onError: (error) => {
            console.log(error, 'hiiiii');
        },
     
    });

    return {
        saved_jobs: mutation.mutateAsync,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};



export default useSavedJobs;
