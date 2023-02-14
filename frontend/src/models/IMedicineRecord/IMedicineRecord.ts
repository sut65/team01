import { EmployeesInterface } from "./IEmployee";
import { TreatmentRecordsInterface } from "./ITreatmentRecord";

export interface MedicineRecordsInterface {
    ID: number,
    Advicetext: string,
    MedTime: Date | null | undefined,
    PharmacistID: number,
    Pharmacist: EmployeesInterface,
    TreatmentRecordID: number,
    TreatmentRecord: TreatmentRecordsInterface,
    StatusMedID: number,
    StatusMed: StatusMedsInterface,
    
  }


  export interface StatusMedsInterface {
    ID: number,
    Number: number,
    Status: string,
  }
 

	  //MedicineID เป็น FK
  	// MedicineID *uint
	  // Medicine   Medicine `gorm:"reference:MedicineID"`
	  // MedicineQuantity int

	//   Date: Date,
  // }
//   export interface PatientRightsInterface {
//     ID: number,
//     Name: string,
//     Email: string,
//     Password: string
//     RoleID: number,
//     // Role: RoleInterface,
// }
 