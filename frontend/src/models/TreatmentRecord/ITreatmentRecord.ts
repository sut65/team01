import { DiagnosisRecordInterface } from "./IDiagnosisRecord";
import { EmployeeInterface } from "./IEmployee";
//import { PatientRegisterInterface } from "./IPatientRegister";

export interface TreatmentRecordInterface {
    ID?: number;

    // PatientRegisterID?: number;
    // PatientRegister?:   PatientRegisterInterface;

	DoctorID?: number;
	Doctor?: EmployeeInterface;

    DiagnosisRecordID?: number;
    DiagnosisRecord?:   DiagnosisRecordInterface;

    MedicineID?: number;
    Medicine?:   MedicineInterface;
    
    MedicineQuantity?: number;
    Treatment?: string;
    Note?: string;
    
    Appointment?: boolean;//int;
    Date?: Date | null;
}

export interface MedicineInterface {
    ID: number;

    Name: string;
    Description: string;
    Price: number;
}