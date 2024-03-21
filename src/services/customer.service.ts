import {BaseApiService} from "./baseApi.service";
import {AxiosResponse} from "axios";
import {PageResponse, Response} from "../models/response";
import http from "../models/http";
import {Customer} from "../models/customer.model";
import {Department} from "../models/department.model";

export class CustomerService extends BaseApiService {
    apiUrl = this.baseApiUrl + 'customers';

    public getPage(pageNumber: number, pageSize: number)
        : Promise<AxiosResponse<PageResponse<Customer[]>>> {
        return http.get<PageResponse<Customer[]>>(`${this.apiUrl}/list?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    public add(department: Customer): Promise<AxiosResponse<Response<Department>>> {
        return http.post<Response<Department>>(`${this.apiUrl}`, department);
    }

    public edit(department: Department): Promise<AxiosResponse<Response<Department>>> {
        return http.put<Response<Department>>(`${this.apiUrl}/${department.id}`, department);
    }

    public delete(id: number): Promise<AxiosResponse<Response<any>>> {
        return http.delete<Response<Department>>(`${this.apiUrl}/${id}`);
    }
}
