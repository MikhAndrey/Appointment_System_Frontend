import {JwtService} from "./jwt.service";
import {Constants} from "../models/constants";

export class AccountService {
    public static logout() {
        JwtService.removeJwt();
        Constants.userInfo = undefined;
    }
}