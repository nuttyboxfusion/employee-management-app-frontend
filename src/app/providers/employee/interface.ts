import { IEmployee } from "@/app/models";

export interface EmployeeAction {
  getAllEmployees: () => void;
  createEmployee: (employee: IEmployee) => void;
  updateEmployee: (employee: IEmployee) => void;
  deleteEmployee: (id: string) => void;
  searchEmployee: (searchTerm: string) => void;
  selectEmployee: (employee: IEmployee| undefined) => void;
  removeSelectedEmployee: () => void;
}
export interface ViewEmployeeState {
  employees: IEmployee[];
  loading: boolean;
  error: string;
}
export interface ViewEmployee {
  id: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
}
export interface EmployeeProviderProps {
  children: React.ReactNode;
}
//create enums for seniority level
export enum SeniorityLevel {
  Graduate = 1,
  Junior = 2,
  Mid = 3,
  Senior = 4,
  Lead = 5,
  
}
