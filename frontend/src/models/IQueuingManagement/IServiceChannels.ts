import { QueuingManagementsInterface } from "./IQueuingManagements";

export interface ServiceChannelsInterface {
    ID: number;
    Name: string;

    QueuingManagements: QueuingManagementsInterface[];
}