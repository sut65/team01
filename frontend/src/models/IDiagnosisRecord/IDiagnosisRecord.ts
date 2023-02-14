import { EmployeeInterface } from "./IEmployee";
import { HistorySheetInterface } from "./IHistorySheet";
import { PatientRegisterInterface } from "./IPatientRegister";

export interface DiagnosisRecordInterface {
	ID?: number;

	// PatientRegisterID?: number;
	// PatientRegister?: PatientRegisterInterface;

	DoctorID?: number;
	Doctor?: EmployeeInterface;

	HistorySheetID?: number;
	HistorySheet?: HistorySheetInterface;

	DiseaseID?: number;
	Disease?: DiseaseInterface;

	Examination?: string;
	// MedicalCertificateID?: number;
	// MedicalCertificate?: MedicalCertificateInterface;
	MedicalCertificate?: boolean | null;
	Date?: Date | null;
}

export interface DiseaseInterface {
	ID: number;
	Name: string;
}

export interface MedicalCertificateInterface {
	ID: number;
	Label: string;
}