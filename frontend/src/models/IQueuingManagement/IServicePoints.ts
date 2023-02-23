import { QueuingManagementsInterface } from "./IQueuingManagements";

export interface ServicePointsInterface {
    ID: number;
    Name: string;
    Deatail: string;

    QueuingManagements: QueuingManagementsInterface[];
}