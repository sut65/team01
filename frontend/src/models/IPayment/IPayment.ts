import { EmployeesInterface } from "../IEmployee/IEmployee";
import { PatientRightsInterface } from "../IPatientRight/IPatientRight";
import { MedicineRecordsInterface } from "../IMedicineRecord/IMedicineRecord";

export interface PaymentsInterface {
    ID : number,

    PatientRightID : number,
    PatientRight : PatientRightsInterface,

    PaymentTypeID : number,
    Paymenttype : PaymentsInterface,

    PaymentTime : Date | null | undefined,

    Total : number,
    
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
