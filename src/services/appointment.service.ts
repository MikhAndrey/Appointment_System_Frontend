import {BaseApiService} from "./baseApi.service";
import {AxiosResponse} from "axios";
import {Appointment} from "../models/appointment.model";
import http from "../models/http";
import {PageResponse} from "../models/response";

export class AppointmentService extends BaseApiService {
    apiUrl = this.baseApiUrl + 'appointments/';
    
    public getPage(pageNumber: number, pageSize: number)
        : Promise<AxiosResponse<PageResponse<Appointment[]>>> {
        return http.get<PageResponse<Appointment[]>>(`${this.apiUrl}list?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }
}
