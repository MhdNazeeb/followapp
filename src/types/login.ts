export interface LoginCredentials {
    name: string,
    email: string;
    password: string;
    confirmPassword: string;
    token: string

}

export interface LoginResponse {
    token: string;
    id: string;
    name: string;
    email: string;
    joined: Date | string
 

}
export interface ResetPassword {
  password: string;
  confirmPassword: string;
}