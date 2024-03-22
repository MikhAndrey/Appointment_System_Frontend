import {Employee} from "./employee.model";
import {Customer} from "./customer.model";

export class Appointment {
    id: number = 0;
    date: Date = new Date();
    start: string = "";
    end: string = "";
    employee: Employee = new Employee();
    customer: Customer = new Customer();
}

export class AppointmentCreate {
    date: string = "";
    start: string = "";
    end: string = "";
    employeeId: number;
    customerId: number;
}

export class AppointmentEdit {
    id: number = 0;
    date: string = "";
    start: string = "";
    end: string = "";
    employeeId: number;
    customerId: number;
}
