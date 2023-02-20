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
    Gender: GendersInterface;

    PrefixID: number;
    Prefix: PrefixesInterface;

    NationalityID: number;
    Nationality: NationalitiesInterface;

    ReligionID: number;
    Religion: ReligionsInterface;

    BloodTypeID: number;
    BloodType: BloodTypesInterface;

    MaritalStatusID: number;
    MaritalStatus: MaritalStatusesInterface;

    SubDistrictID: number;
    SubDistrict: SubDistrictsInterface;

    DistrictID: number;
    District: DistrictsInterface;

    ProvinceID: number;
    Province: ProvincesInterface;
}
export interface GendersInterface {
    ID: string;
    Name: string;
}
export interface PrefixesInterface {
    ID: string;
    Name: string;
}
export interface NationalitiesInterface {
    ID: string;
    Name: string;
}
export interface ReligionsInterface {
    ID: string;
    Name: string;
}
export interface BloodTypesInterface {
    ID: string;
    Name: string;
}
export interface MaritalStatusesInterface {
    ID: string;
    Name: string;
}
export interface SubDistrictsInterface {
    ID: string;
    Name: string;
    PostCode: string;
    District: string;
}
export interface DistrictsInterface {
    ID: string;
    Name: string;
    Province: string;
}
export interface ProvincesInterface {
    ID: string;
    Name: string;
}