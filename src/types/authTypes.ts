export interface LoginRequest {
    email: string;
    password: string;
}

export type Role = 'ADMIN' | 'USER' | 'MODERATOR';

export interface UserData {
    email: string;
    role: Role;
    id: string;
    isFirstLogin: boolean;
}

export interface AuthResponse {
    accessToken: string;
    userData: UserData;
}

export interface RefreshTokenResponse {
    accessToken: string;
}
