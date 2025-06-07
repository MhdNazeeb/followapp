import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import api from "../axios.interface";
import { LoginCredentials, LoginResponse } from "../../types/login";
import Toast from "react-native-toast-message";
import { toastError, toastSuccess } from "../../utils/toast";



const signup = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response: AxiosResponse<LoginResponse> = await api.post("/signup", credentials);

    return response.data;
};

const useSignup = () => {

    const mutation = useMutation<LoginResponse, AxiosError, LoginCredentials>({
        mutationFn: signup,
        onSuccess: (data) => {
            toastSuccess(data)
           
        },
        onError: (error) => {
            console.error("Signup failed:", error.response?.data || error.message);

            toastError(error.response?.data)
        }

    });

    return {
        signup: mutation.mutateAsync,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};



export default useSignup;
