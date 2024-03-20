import {IPaginationInfo} from "./pagination";

export interface Response<T> {
    model: T,
    message: string,
    errors: string[]
}

export interface PageResponse<T> extends IPaginationInfo, Response<T>{}
