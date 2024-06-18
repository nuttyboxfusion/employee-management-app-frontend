import { createContext } from "react";
import { EmployeeAction, ViewEmployee } from "./interface";
import { IEmployee } from "@/app/models";

export interface IEmployeeContext {
  employees: IEmployee[];
  loading: boolean;
  error: boolean;
  showForm: boolean;
  employee: IEmployee | undefined;
}

export const initialState: IEmployeeContext = {
  employees: [],
  loading: false,
  showForm: false,
  error: false,
  employee: undefined,
};

export const EmployeeStateContext =
  createContext<IEmployeeContext>(initialState);
export const EmployeeActionContext = createContext<EmployeeAction>({
  getAllEmployees: () => {},
  createEmployee: (employee: IEmployee) => {},
  deleteEmployee: (id: string) => {},
  updateEmployee: (employee: IEmployee) => {},
  searchEmployee: (searchTerm: string) => {},
  selectEmployee: (employee: IEmployee | undefined) => {},
  removeSelectedEmployee: () => {},
});
