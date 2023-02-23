import { EmployeesInterface } from "./IEmployees";
import { HistorySheetsInterface } from "./IHistorySheets";
import { ServicePointsInterface } from "./IServicePoints";
import { ServiceChannelsInterface } from "./IServiceChannels";
import { MedicalActionsInterface } from "./IMedicalActions";


/* Interface name ต้องเติม s ไปแก้
ex. DiabetesLevelsInterface  */

export interface QueuingManagementsInterface {
    ID: number;
    Time: Date;
    Note: string;

    EmployeeID: number;
    Employee: EmployeesInterface;

    HistorySheetID: number;
    HistorySheet: HistorySheetsInterface;

    ServicePointID: number;
    ServicePoint: ServicePointsInterface;

    ServiceChannelID: number;
    ServiceChannel: ServiceChannelsInterface;

    MedicalActionID: number;
    MedicalAction: MedicalActionsInterface;

}

