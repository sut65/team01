import { DiagnosisRecordsInterface } from "../IDiagnosisRecord/IDiagnosisRecord";
import {EmployeesInterface} from "../IEmployee/IEmployee"
//import { PatientRegisterInterface } from "./IPatientRegister";

export interface TreatmentRecordsInterface {
    ID?: number;

    // PatientRegisterID?: number;
    // PatientRegister?:   PatientRegisterInterface;

	DoctorID?: number;
	Doctor?: EmployeesInterface;

    DiagnosisRecordID?: number;
    DiagnosisRecord?:   DiagnosisRecordsInterface;

    MedicineID?: number;
    Medicine?:   MedicinesInterface;
    
    MedicineQuantity?: number;
    Treatment?: string;
    Note?: string;
    
    Appointment?: boolean | null;
    Date?: Date | null;
}

export interface MedicinesInterface {
    ID: number;

    Name: string;
    Description: string;
    Price: number;
}