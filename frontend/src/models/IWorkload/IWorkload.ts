import { EmployeesInterface, AdminsInterface } from "../IEmployee/IEmployee";

export interface WorkloadsInterface {
    ID: number;
    AdminID: number;
    Admin: AdminsInterface;
    EmployeeID: number;
    Employee: EmployeesInterface;
    RoomID: number;
    Room: RoomsInterface;
    StatusID: number;
    Status: StatusesInterface;
    Date: Date;
    StartTime: Date;
    EndTime: Date;
}
export interface RoomsInterface {
    ID: number;
    Name: string;
}

export interface StatusesInterface {
    ID: number;
    Name: string;
}


