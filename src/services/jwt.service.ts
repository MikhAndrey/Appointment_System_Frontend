import {UserInfo} from "../models/account.model";
import {TokenResponse} from "../models/account.model";

export class JwtService {

    private static _accessTokenAlias: string = "accessToken";
    private static _refreshTokenAlias: string = "refreshToken";

    public static setTokens(model: TokenResponse): void {
        localStorage.setItem(JwtService._accessTokenAlias, model.access);
        localStorage.setItem(JwtService._refreshTokenAlias, model.refresh);
    }

    public static removeTokens(): void {
        localStorage.removeItem(JwtService._accessTokenAlias);
        localStorage.removeItem(JwtService._refreshTokenAlias);
    }

    public static getJwt(): string | null {
        return localStorage.getItem(JwtService._accessTokenAlias);
    }

    public static getParsedTokenInfo(): UserInfo | undefined {
        const token: string | null = JwtService.getJwt();
        if (token != null)
            return JSON.parse(atob(token.split('.')[1]));
        return undefined;
    }
}
