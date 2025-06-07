 export interface LoginCredentials {
    fullName:string,
    email: string;
    password: string;
    confirmPassword:string;

}

export interface LoginResponse {
    token: string;
    
        id: string;
        name: string;
        email: string;
        joind:Date|string
    
}