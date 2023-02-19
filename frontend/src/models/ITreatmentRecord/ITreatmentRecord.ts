import { DiagnosisRecordsInterface } from "../IDiagnosisRecord/IDiagnosisRecord";
import {EmployeesInterface} from "../IEmployee/IEmployee"

export interface TreatmentRecordInterface {
    ID?: number;

    // PatientRegisterID?: number;
    // PatientRegister?:   PatientRegisterInterface;

	DoctorID?: number;
	Doctor?: EmployeesInterface;

    DiagnosisRecordID?: number;
    DiagnosisRecord?:   DiagnosisRecordsInterface;

    MedicineOrders?:   MedicineOrdersInterface[];
    
    Treatment?: string;
    Note?: string;
    
    Appointment?: boolean | null;
    Date?: Date | null;
}

export interface MedicineInterface {
    ID: number;

    Name: string;
    Description: string;
    Price: number;
}

export interface MedicineOrdersInterface {
    ID: number;

    TreatmentRecordID?: number;
    TreatmentRecord?:   TreatmentRecordInterface;

    MedicineID?:    number;
    Medicine?:      MedicineInterface;

    OrderAmount?:   number;

}