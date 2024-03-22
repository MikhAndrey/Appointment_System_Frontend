import {JwtService} from "./jwt.service";
import {BaseApiService} from "./baseApi.service";
import {AxiosResponse} from "axios";
import http from "../models/http";
import {LoginModel, TokenResponse} from "../models/account.model";

export class AccountService extends BaseApiService {
    apiUrl = this.baseApiUrl + 'token';
    
    public logout() {
        const refreshToken: string | null = JwtService.getRefresh();
        JwtService.removeTokens();
        return http.post<TokenResponse>(`${this.apiUrl}/remove`, {refresh: refreshToken});
    }
    
    public login(model: LoginModel) : Promise<AxiosResponse<TokenResponse>> {
        return http.post<TokenResponse>(`${this.apiUrl}`, model);
    }
    
    public refreshTokens(refreshToken: string) : Promise<AxiosResponse<TokenResponse>> {
        return http.post<TokenResponse>(`${this.apiUrl}/refresh`, {refresh: refreshToken});
    }
}
