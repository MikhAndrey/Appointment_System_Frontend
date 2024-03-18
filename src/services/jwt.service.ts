import {Constants} from "../models/constants";
import {UserInfo} from "../models/userInfo";

export class JwtService {

    private static jwtAlias: string = "accessToken";

    public static parseJwtResponse(token: string): void {
        JwtService.setUserInfoFromToken(token);
        localStorage.setItem(JwtService.jwtAlias, token);
    }

    public static removeJwt(): void {
        localStorage.removeItem(JwtService.jwtAlias);
    }

    public static getJwt(): string | null {
        return localStorage.getItem(JwtService.jwtAlias);
    }

    private static getParsedToken(token: string): UserInfo {
        return JSON.parse(atob(token.split('.')[1]));
    }

    private static setUserInfoFromToken(token: string): void {
        const parsedToken = JwtService.getParsedToken(token);
        if (parsedToken) {
            Constants.userInfo = parsedToken;
        }
    }

    public static initialize (): void {
        const jwtToken: string | null = JwtService.getJwt();
        if (jwtToken != null) {
            JwtService.setUserInfoFromToken(jwtToken);
        }
    };
}