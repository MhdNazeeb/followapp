import Toast from "react-native-toast-message";

export const toastError = (error: Error | string | any) => {
    console.error(error);

    let errorMessage = "An unexpected error occurred";

    if (typeof error?.response?.data?.message === "string") {
        errorMessage = error.response.data.message;
    } else if (typeof error?.message === "string") {
        errorMessage = error.message;
    } else if (typeof error === "string") {
        errorMessage = error;
    }

    Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
        position: "bottom",
        autoHide: true,
        visibilityTime: 2000,
    });
};

export const toastSuccess = (success: any) => {
    let successMessage = "Operation successful";

    if (typeof success?.data?.message === "string") {
        successMessage = success.data.message;
    } else if (typeof success?.message === "string") {
        successMessage = success.message;
    } else if (typeof success === "string") {
        successMessage = success;
    }

    Toast.show({
        type: "success",
        text1: "Success",
        text2: successMessage,
        position: "top",
        autoHide: true,
        visibilityTime: 2000,
    });
};

