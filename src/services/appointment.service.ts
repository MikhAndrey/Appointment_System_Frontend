import {BaseApiService} from "./baseApi.service";
import {AxiosResponse} from "axios";
import {Appointment} from "../models/appointment.model";
import http from "../models/http";
import {Response} from "../models/response";

export class AppointmentService extends BaseApiService {
    apiUrl = this.baseApiUrl + 'appointments/';
    
    public getPage(pageNumber: number, pageSize: number = this.defaultPageSize)
        : Promise<AxiosResponse<Response<Appointment[]>>> {
        return http.get<Response<Appointment[]>>(`${this.apiUrl}list?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }
}
