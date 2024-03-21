export class LoginModel {
    username: string = '';
    password: string = '';
}

export interface TokenResponse {
    access: string,
    refresh: string
}

export class UserInfo {
    username: string;
    userId: number;
    roles: string[];
    permissions: string[];
}
