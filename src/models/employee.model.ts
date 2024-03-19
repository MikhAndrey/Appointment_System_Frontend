import {Department} from "./department.model";

export class Employee {
    id: number = 0;
    fullname: string = "";
    email: string = "";
    phone: string = "";
    address: string = "";
    department: Department = new Department();
}
