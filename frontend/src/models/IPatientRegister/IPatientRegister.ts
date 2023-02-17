import { EmployeesInterface } from "../IEmployee/IEmployee";

export interface PatientRegistersInterface {
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

    EmployeeID: number;
    Employee: EmployeesInterface;

    GenderID: number;
    Gender: GenderInterface;

    PrefixID: number;
    Prefix: PrefixInterface;

    NationalityID: number;
    Nationality: NationalityInterface;

    ReligionID: number;
    Religion: ReligionInterface;

    BloodTypeID: number;
    BloodType: BloodTypeInterface;

    MaritalStatusID: number;
    MaritalStatus: MaritalStatusInterface;

    SubDistrictID: number;
    SubDistrict: SubDistrictInterface;

    DistrictID: number;
    District: DistrictInterface;

    ProvinceID: number;
    Province: ProvinceInterface;
}
export interface GenderInterface {
    ID: string;
    Name: string;
}
export interface PrefixInterface {
    ID: string;
    Name: string;
}
export interface NationalityInterface {
    ID: string;
    Name: string;
}
export interface ReligionInterface {
    ID: string;
    Name: string;
}
export interface BloodTypeInterface {
    ID: string;
    Name: string;
}
export interface MaritalStatusInterface {
    ID: string;
    Name: string;
}
export interface SubDistrictInterface {
    ID: string;
    Name: string;
    PostCode: string;
    District: string;
}
export interface DistrictInterface {
    ID: string;
    Name: string;
    Province: string;
}
export interface ProvinceInterface {
    ID: string;
    Name: string;
}