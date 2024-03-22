import {BaseApiService} from "./baseApi.service";
import {AxiosResponse} from "axios";
import {PageResponse, Response} from "../models/response";
import http from "../models/http";
import {Customer, CustomerShortModel} from "../models/customer.model";

export class CustomerService extends BaseApiService {
    apiUrl = this.baseApiUrl + 'customers';

    public getPage(pageNumber: number, pageSize: number)
        : Promise<AxiosResponse<PageResponse<Customer[]>>> {
        return http.get<PageResponse<Customer[]>>(`${this.apiUrl}/list?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    public getShortModelsList()
        : Promise<AxiosResponse<Response<CustomerShortModel[]>>> {
        return http.get<Response<CustomerShortModel[]>>(`${this.apiUrl}/shortList`);
    }

    public add(customer: Customer): Promise<AxiosResponse<Response<Customer>>> {
        return http.post<Response<Customer>>(`${this.apiUrl}`, customer);
    }

    public edit(customer: Customer): Promise<AxiosResponse<Response<Customer>>> {
        return http.put<Response<Customer>>(`${this.apiUrl}/${customer.id}`, customer);
    }

    public delete(id: number): Promise<AxiosResponse<Response<any>>> {
        return http.delete<Response<any>>(`${this.apiUrl}/${id}`);
    }
}
