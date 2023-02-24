import { PatientRegistersInterface } from "../IPatientRegister/IPatientRegister";
import {EmployeesInterface} from "../IEmployee/IEmployee"
import {RoomsInterface} from "../IWorkload/IWorkload"

export interface AppointmentsInterface {
  ID: string,

  PatientRegisterID: number,
  PatientRegister: PatientRegistersInterface,

  EmployeeID: number,
  Employee: EmployeesInterface,

  RoomID: number,
  Room: RoomsInterface,
  
  RoomNumber: number,
  AppointmentTime: Date,
  Note: string,
}