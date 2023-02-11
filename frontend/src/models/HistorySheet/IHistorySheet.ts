export interface HistorySheetInterface {
    ID: string;
    Weight: number;
    Height: number;
    BMI: number;
    Temperature: number;
    SystolicBloodPressure: number;
    DiastolicBloodPressure: number;
    HeartRate: number;
    RespiratoryRate: number;
    OxygenSaturation: number;
    DrugAllergySymtom: string;
    PatientSymtom: string;

    PatientRegisterID: number;
    PatientRegister: PatientRegisterInterface;

    NurseID: number;
    Nurse: NurseInterface;

    DrugAllergyID: number;
    DrugAllergy: DrugAllergyInterface;
}
export interface NurseInterface {
    ID: string;
    FirstName: string;
    LastName: string;
    IdentificationNumber: string;
    BirthDay: Date | null;
    Mobile: string;
    Email: string;
    Password: string;
    Salary: number;
}
export interface DrugAllergyInterface{
    ID: string;
    Name: string;
}
export interface PatientRegisterInterface {
    ID: string,
    FirstName: string;
    LastName: string;
    IdentificationNumber:   string;
    Age:    number;
    BirthDay: Date | null;
    Mobile: string;
    Email: string;
    Occupation: string;
    Address:    string;
    EmergencyPersonFirstName:           string;
	EmergencyPersonLastName :           string;
	EmergencyPersonMobile :             string;
	EmergencyPersonOccupation :         string;
	EmergencyPersonRelationWithPatient: string;

    Gender: string;
    Prefix: string;
    Nationality: string;
    Religion: string;
    BloodType: string;
    MaritalStatus: string;
    SubDistrict: string;
    District: string;
    Province: string;
}