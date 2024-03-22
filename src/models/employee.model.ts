import {Department} from "./department.model";

export class Employee {
    id: number = 0;
    fullname: string = "";
    email: string = "";
    phone: string = "";
    address: string = "";
    roles: string[];
    department: Department = new Department();
}

export class EmployeeCreate {
    fullname: string = "";
    email: string = "";
    phone: string = "";
    address: string = "";
    roles: string[];
    departmentId: number;
}

export class EmployeeEdit {
    id: number;
    fullname: string = "";
    email: string = "";
    phone: string = "";
    address: string = "";
    roles: string[];
    departmentId: number;
}

export class EmployeeShortModel {
    id: number;
    fullname: string = "";
}
