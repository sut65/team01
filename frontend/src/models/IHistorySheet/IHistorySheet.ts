import {EmployeesInterface} from "../IEmployee/IEmployee"
import { PatientRegistersInterface } from "../IPatientRegister/IPatientRegister";
export interface HistorySheetsInterface {
    ID: string;
    Weight: number;
    Height: number;
    BMI: number;
    Temperature: number;
    SystolicBloodPressure: number;
    DiastolicBloodPressure: number;
    HeartRate: number;
    RespiratoryRate: number;
    OxygenSaturation: number;
    DrugAllergySymtom: string;
    PatientSymtom: string;
    PatientRegisterID: number;
    PatientRegister: PatientRegistersInterface;
    NurseID: number;
    Nurse: EmployeesInterface;
    DrugAllergyID: number;
    DrugAllergy: DrugAllergysInterface;
}

export interface DrugAllergysInterface{
    ID: string;
    Name: string;
}