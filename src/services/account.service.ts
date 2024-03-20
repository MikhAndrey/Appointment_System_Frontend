import {JwtService} from "./jwt.service";
import {BaseApiService} from "./baseApi.service";
import {AxiosResponse} from "axios";
import http from "../models/http";
import {LoginModel, TokenResponse} from "../models/account.model";

export class AccountService extends BaseApiService {
    apiUrl = this.baseApiUrl + 'token';
    
    public logout() {
        JwtService.removeTokens();
    }
    
    public login(model: LoginModel) : Promise<AxiosResponse<TokenResponse>> {
            return http.post<TokenResponse>(`${this.apiUrl}`, model);
    }
}
