import {EmployeesInterface} from "../IEmployee/IEmployee"
import { RightTypeInterface } from './IRighttype';
import { HospitalInterface } from './IHospital';
import { PatientRegistersInterface } from "../IHistorySheet/IHistorySheet";
export interface PatientRightInterface{
    ID: number,
    Name: string,

    PatientRegisterID: number,
    PatientRegister: PatientRegistersInterface,

    RightTypeID?: number,
    RightType: RightTypeInterface,

    HospitalID?: number,
    Hospital: HospitalInterface,
    
    EmployeeID?: number,
    Employee: EmployeesInterface,
    
    Discount: number,

    Note: string,
}