import {EmployeesInterface} from "../IEmployee/IEmployee"
import { RightTypesInterface } from './IRighttype';
import { HospitalsInterface } from './IHospital';
import { PatientRegistersInterface } from "../IPatientRegister/IPatientRegister";
export interface PatientRightsInterface{
    ID: number,
    // Name: string,

    PatientRegisterID: number,
    PatientRegister: PatientRegistersInterface,

    RightTypeID?: number,
    RightType: RightTypesInterface,

    HospitalID?: number,
    Hospital: HospitalsInterface,
    
    EmployeeID?: number,
    Employee: EmployeesInterface,
    
    // Discount: number,

    Note: string,

    DateRecord: Date | null,
}