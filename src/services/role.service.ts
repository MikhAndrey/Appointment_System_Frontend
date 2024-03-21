import {BaseApiService} from "./baseApi.service";
import {AxiosResponse} from "axios";
import {Response} from "../models/response";
import http from "../models/http";

export class RoleService extends BaseApiService {
    apiUrl = this.baseApiUrl + 'groups';

    public getAll()
        : Promise<AxiosResponse<Response<{name: string}[]>>> {
        return http.get<Response<{name: string}[]>>(`${this.apiUrl}/list`);
    }
}
