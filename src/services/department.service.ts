import {BaseApiService} from "./baseApi.service";
import {AxiosResponse} from "axios";
import {Response} from "../models/response";
import http from "../models/http";
import {Department} from "../models/department.model";

export class DepartmentService extends BaseApiService {
    apiUrl = this.baseApiUrl + 'departments/';

    public getAll()
        : Promise<AxiosResponse<Response<Department[]>>> {
        return http.get<Response<Department[]>>(`${this.apiUrl}list`);
    }
}