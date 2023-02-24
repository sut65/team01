import {EmployeesInterface} from "../IEmployee/IEmployee"
import { HistorySheetsInterface } from "../IHistorySheet/IHistorySheet";

export interface DiagnosisRecordsInterface {
	ID?: number;

	DoctorID?: number;
	Doctor?: EmployeesInterface;

	HistorySheetID?: number;
	HistorySheet?: HistorySheetsInterface;

	DiseaseID?: number;
	Disease?: DiseasesInterface;

	Examination?: string;
	MedicalCertificate?: boolean | null;
	Date?: Date | null;
}

export interface DiseasesInterface {
	ID: number;
	Name: string;
}
