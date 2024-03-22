export interface IPaginationInfo {
    pageNumber: number;
    totalPages: number;
    totalItems: number;
    hasNext: number;
    hasPrevious: number;
}

export class PaginationInfo implements IPaginationInfo {
    pageNumber: number = 1;
    totalPages: number = 1;
    totalItems: number;
    hasNext: number;
    hasPrevious: number;
}
