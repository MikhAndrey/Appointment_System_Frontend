import {BaseApiService} from "./baseApi.service";
import {AxiosResponse} from "axios";
import {Response} from "../models/response";
import http from "../models/http";
import {Department} from "../models/department.model";

export class DepartmentService extends BaseApiService {
    apiUrl = this.baseApiUrl + 'departments';

    public getAll()
        : Promise<AxiosResponse<Response<Department[]>>> {
        return http.get<Response<Department[]>>(`${this.apiUrl}/list`);
    }
    
    public add(department: Department): Promise<AxiosResponse<Response<Department>>> {
        return http.post<Response<Department>>(`${this.apiUrl}`, department);
    }

    public edit(department: Department): Promise<AxiosResponse<Response<Department>>> {
        return http.put<Response<Department>>(`${this.apiUrl}/${department.id}`, department);
    }

    public delete(id: number): Promise<AxiosResponse<Response<any>>> {
        return http.delete<Response<any>>(`${this.apiUrl}/${id}`);
    }
}