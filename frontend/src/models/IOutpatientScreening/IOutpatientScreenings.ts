import { EmployeesInterface } from "../IEmployee/IEmployee";
import { HistorySheetsInterface } from "../IHistorySheet/IHistorySheet";
import { EmergencyLevelsInterface } from "./IEmergencyLevel";
import { HighBloodPressureLevelsInterface } from "./IHighBloodPressureLevel";
import { DiabetesLevelsInterface } from "./IDiabetesLevel";
import { ObesityLevelsInterface } from "./IObesityLevel";

/* Interface name ต้องเติม s ไปแก้
ex. DiabetesLevelsInterface  */


export interface OutpatientScreeningsInterface {
    ID: number;
    Date: Date;
    TimeStart: Date;
    TimeEnd: Date;

    EmployeeID: number;
    Employee: EmployeesInterface;

    HistorySheetID: number;
    HistorySheet: HistorySheetsInterface;

    EmergencyLevelID: number;
    EmergencyLevel: EmergencyLevelsInterface;

    HighBloodPressureLevelID: number;
    HighBloodPressureLevel: HighBloodPressureLevelsInterface;

    DiabetesLevelID: number;
    DiabetesLevel: DiabetesLevelsInterface;

    ObesityLevelID: number;
    ObesityLevel: ObesityLevelsInterface;

    Note: string;
}
