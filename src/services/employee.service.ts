import {BaseApiService} from "./baseApi.service";
import {AxiosResponse} from "axios";
import {Response} from "../models/response";
import http from "../models/http";
import {Employee} from "../models/employee.model";

export class EmployeeService extends BaseApiService {
    apiUrl = this.baseApiUrl + 'employees/';

    public getAll()
        : Promise<AxiosResponse<Response<Employee[]>>> {
        return http.get<Response<Employee[]>>(`${this.apiUrl}list`);
    }
}