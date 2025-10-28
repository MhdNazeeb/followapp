import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import api from "../axios.interface";
import { LoginCredentials, LoginResponse, ResetPassword } from "../../types/login";
import { setItem, setMultipleItems } from "../../utils/storage";
import { toastError, toastSuccess } from "../../utils/toast";



const resetPassword = async (credentials: ResetPassword): Promise<any> => {
    console.log(credentials,'dsfds');
    const response: AxiosResponse<any> = await api.post("/reset_password", credentials);
    return response.data;
};

const useResetPassword = () => {
    
    const mutation = useMutation<any, AxiosError, ResetPassword>({
        mutationFn: resetPassword,
        onSuccess: async (data) => {
            toastSuccess(data)
        },
        onError: (error) => {
           toastError(error)
        },
    });

    return {
        resetPassword: mutation.mutateAsync,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};



export default useResetPassword;
