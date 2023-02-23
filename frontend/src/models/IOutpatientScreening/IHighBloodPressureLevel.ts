import { OutpatientScreeningsInterface } from "./IOutpatientScreenings";

export interface HighBloodPressureLevelsInterface {
    ID: number;
    Level: string;
    AssessmentForms: string;

    OutpatientScreenings: OutpatientScreeningsInterface[];
}