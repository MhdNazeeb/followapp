import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toastError, toastSuccess } from "../../utils/toast";
import api from "../axios.interface";

const deleteAccount = async ({ userId }: { userId: any }): Promise<any> => {
       
    const response: AxiosResponse<any> = await api.delete(`delete_account/${userId}`);
    return response.data;
};

const useDeleteAccount = () => {
    const mutation = useMutation<any, AxiosError, { userId: any }>({
        mutationFn: deleteAccount,
        onSuccess: async (data) => {
            toastSuccess(data);
        },
        onError: (error) => {
            toastError(error);
        },
    });

    return {
        deleteAccount: mutation.mutateAsync,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
export default useDeleteAccount;