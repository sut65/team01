import { OutpatientScreeningsInterface } from "./IOutpatientScreenings";

export interface DiabetesLevelsInterface {
    ID: number;
    Level: string;
    AssessmentForms: string;
    HistoryTakingForms: string;

    OutpatientScreenings: OutpatientScreeningsInterface[];
}