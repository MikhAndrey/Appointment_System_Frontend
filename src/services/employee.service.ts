import {BaseApiService} from "./baseApi.service";
import {AxiosResponse} from "axios";
import {Response} from "../models/response";
import http from "../models/http";
import {Employee, EmployeeCreate, EmployeeEdit, EmployeeShortModel} from "../models/employee.model";

export class EmployeeService extends BaseApiService {
    apiUrl = this.baseApiUrl + 'employees';

    public getAll()
        : Promise<AxiosResponse<Response<Employee[]>>> {
        return http.get<Response<Employee[]>>(`${this.apiUrl}/list`);
    }

    public getShortModelsList()
        : Promise<AxiosResponse<Response<EmployeeShortModel[]>>> {
        return http.get<Response<EmployeeShortModel[]>>(`${this.apiUrl}/shortList`);
    }

    public add(employee: EmployeeCreate): Promise<AxiosResponse<Response<Employee>>> {
        return http.post<Response<Employee>>(`${this.apiUrl}`, employee);
    }

    public edit(employee: EmployeeEdit): Promise<AxiosResponse<Response<Employee>>> {
        return http.put<Response<Employee>>(`${this.apiUrl}/${employee.id}`, employee);
    }

    public delete(id: number): Promise<AxiosResponse<Response<any>>> {
        return http.delete<Response<any>>(`${this.apiUrl}/${id}`);
    }
}
