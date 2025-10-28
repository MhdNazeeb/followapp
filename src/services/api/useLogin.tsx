import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import api from "../axios.interface";
import { LoginCredentials, LoginResponse } from "../../types/login";
import { setItem, setMultipleItems } from "../../utils/storage";
import { toastError } from "../../utils/toast";



const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response: AxiosResponse<LoginResponse> = await api.post("/login", credentials);
    return response.data;
};

const useLogin = () => {
    
    const mutation = useMutation<LoginResponse, AxiosError, LoginCredentials>({
        mutationFn: login,
        onSuccess: async (data) => {
            
            await setMultipleItems({
                token: data?.token,
                userName: data?.name,
                userId: data?.id,
                email: data?.email,
                joind: data?.joined
            });
        },
        onError: (error) => {
            toastError(error)
        },
    });

    return {
        login: mutation.mutateAsync,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};



export default useLogin;
