import { OutpatientScreeningsInterface } from "./IOutpatientScreenings";

export interface EmergencyLevelsInterface {
    ID: number;
    Level : string;
    AssessmentForms : string;
    HistoryTaking : string;

    OutpatientScreenings: OutpatientScreeningsInterface[];
}