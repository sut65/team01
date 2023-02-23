import { QueuingManagementsInterface } from "./IQueuingManagements";

export interface MedicalActionsInterface {
    ID: number;
    Action: string;
    Deatail: string;

    QueuingManagements: QueuingManagementsInterface[];
}