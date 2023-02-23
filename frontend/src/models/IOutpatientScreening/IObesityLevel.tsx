import { OutpatientScreeningsInterface } from "./IOutpatientScreenings";

export interface ObesityLevelsInterface {
    ID: number;
    Level: string;
    AssessmentForms: string;
    HistoryTakingForms: string;

    OutpatientScreenings: OutpatientScreeningsInterface[];
}