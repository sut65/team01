import { EmployeesInterface } from "./IEmployee";
import { PatientRightsInterface } from "./IPatientRight";
import { MedicineRecordsInterface } from "./IMedicineRecord";

export interface PaymentsInterface {
    ID : number,

    PatientRightID : number,
    PatientRight : PatientRightsInterface,

    PaymentTypeID : number,
    Paymenttype : PaymentsInterface,

    PaymentTime : Date | null | undefined,

    Total : number,

    Telephone : string,
    
    CashierID : number,
    Cashier : EmployeesInterface
    MedicineRecordID: number,
    MedicineRecord: MedicineRecordsInterface,

    

}


export interface PaymentTypesInterface {
    ID : number,
    Type: string,
    
    PaymentID : number,
    Payment : PaymentsInterface,
    
}
// export interface PatientRightsInterface {
//     ID : number,
    
//     PaymentID : number,
//     Payment : PaymentsInterface,
    
// }