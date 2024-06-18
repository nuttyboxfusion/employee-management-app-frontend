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
