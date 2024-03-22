import {BaseApiService} from "./baseApi.service";
import {AxiosResponse} from "axios";
import {Appointment, AppointmentCreate, AppointmentEdit} from "../models/appointment.model";
import http from "../models/http";
import {PageResponse, Response} from "../models/response";

export class AppointmentService extends BaseApiService {
    apiUrl = this.baseApiUrl + 'appointments';
    
    public getPage(pageNumber: number, pageSize: number)
        : Promise<AxiosResponse<PageResponse<Appointment[]>>> {
        return http.get<PageResponse<Appointment[]>>(`${this.apiUrl}/list?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    public add(appointment: AppointmentCreate): Promise<AxiosResponse<Response<Appointment>>> {
        return http.post<Response<Appointment>>(`${this.apiUrl}`, appointment);
    }

    public edit(appointment: AppointmentEdit): Promise<AxiosResponse<Response<Appointment>>> {
        return http.put<Response<Appointment>>(`${this.apiUrl}/${appointment.id}`, appointment);
    }

    public delete(id: number): Promise<AxiosResponse<Response<any>>> {
        return http.delete<Response<any>>(`${this.apiUrl}/${id}`);
    }
}
