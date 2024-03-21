import {BaseApiService} from "./baseApi.service";
import {AxiosResponse} from "axios";
import {PageResponse} from "../models/response";
import http from "../models/http";
import {Customer} from "../models/customer.model";

export class CustomerService extends BaseApiService {
    apiUrl = this.baseApiUrl + 'customers/';

    public getPage(pageNumber: number, pageSize: number)
        : Promise<AxiosResponse<PageResponse<Customer[]>>> {
        return http.get<PageResponse<Customer[]>>(`${this.apiUrl}list?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }
}
