import { DiagnosisRecordsInterface } from "../IDiagnosisRecord/IDiagnosisRecord";
import {EmployeesInterface} from "../IEmployee/IEmployee"

export interface TreatmentRecordsInterface {
    ID?: number;

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

export interface MedicinesInterface {
    ID: number;

    Name: string;
    Description: string;
    Price: number;
}

export interface MedicineOrdersInterface {
    ID: number;

    TreatmentRecordID?: number;
    TreatmentRecord?:   TreatmentRecordsInterface;

    MedicineID?:    number;
    Medicine?:      MedicinesInterface;

    OrderAmount?:   number;

}