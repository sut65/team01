export interface EmployeesInterface {
    ID: number;
    AdminID: number;
    Admin: AdminsInterface; 
    IDCard: string;
    TitleID: number;
    Title: TitlesInterface;
    FirstName: string;
    LastName: string;
    RoleID: number;
    Role: RolesInterface;
    PhoneNumber: string;
    Email: string;
    Password: string;
    GenderID: number;
    Gender: GendersInterface;
    Salary: number;
    Birthday: Date | null;
   }

   export interface AdminsInterface {
    ID: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
   }

   export interface GendersInterface {
    ID: number;
    Name: string;
   }

   export interface RolesInterface {
    ID: number;
    Name: string;
   }

   export interface TitlesInterface {
    ID: number;
    Name: string;
}

