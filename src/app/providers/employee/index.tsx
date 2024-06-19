"use client";

import React, { useContext, useReducer } from "react";
import { message } from "antd";
import axios from "axios";
import {
  EmployeeActionContext,
  EmployeeStateContext,
  initialState,
} from "./context";
import { employeeReducer } from "./reducer";
import {
  getAllEmployeesAction,
  createEmployeeAction,
  selectEmployeeAction,
  updateEmployeeAction,
  deleteEmployeeAction,
  getAllEmployeesLoadingAction,
  getAllEmployeesFailedAction,
  searchEmployeeAction,
  removeSelectedEmployeeAction,
} from "./action";
import { EmployeeProviderProps } from "./interface";
import { IEmployee } from "@/app/models";
debugger;
const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:7049";

export const getEmployees = async () => {
  console.log("baseUrl", baseUrl);
  const response = await axios.get(`${baseUrl}/api/Employees`);
  return response.data;
};

const EmployeeProvider: React.FC<EmployeeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  const getAllEmployees = async () => {
    try {
      dispatch(getAllEmployeesLoadingAction());
      const response = await axios.get(`${baseUrl}/api/Employees`);
      dispatch(getAllEmployeesAction(response.data));
    } catch (error) {
      dispatch(getAllEmployeesFailedAction());
      message.error("Failed to fetch employees");
    } 
  };

  const createEmployee = async (employee: IEmployee) => {
    try {
      const response = await axios.post(`${baseUrl}/api/Employees`, employee);
      dispatch(createEmployeeAction(response.data));
      message.success("Employee successfully created!");
    } catch (error) {
      message.error("Failed to create employee");
    }
  };

  const selectEmployee = async (employee: IEmployee | undefined) => {
    try {
      dispatch(selectEmployeeAction(employee || undefined));
    } catch (error) {
      message.error("Failed to select employee");
    }
  };

  const updateEmployee = async (employee: IEmployee) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/Employees/${employee.id}`,
        employee
      );
      dispatch(updateEmployeeAction(response.data));
      message.success("Employee successfully updated!");
    } catch (error) {
      message.error("Failed to update employee");
    }
  };

  const searchEmployee = async (searchTerm: string) => {
    try {
      dispatch(searchEmployeeAction(searchTerm));
    } catch (error) {
      message.error("Failed to update employee");
    }
  };
  const removeSelectedEmployee = async () => {
    try {
      dispatch(removeSelectedEmployeeAction());
    } catch (error) {
      message.error("Failed to remove selected employee");
    }
  };
  const deleteEmployee = async (id: string) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/Employees/${id}`);
      dispatch(deleteEmployeeAction(id));
      message.success("Employee successfully deleted!");
    } catch (error) {
      message.error("Failed to delete employee");
    }
  };

  return (
    <EmployeeStateContext.Provider value={state}>
      <EmployeeActionContext.Provider
        value={{
          getAllEmployees,
          createEmployee,
          updateEmployee,
          deleteEmployee,
          searchEmployee,
          removeSelectedEmployee,
          selectEmployee,
        }}
      >
        {children}
      </EmployeeActionContext.Provider>
    </EmployeeStateContext.Provider>
  );
};

const useEmployeeState = () => {
  const context = useContext(EmployeeStateContext);
  if (!context) {
    throw new Error("useEmployeeState must be used within an EmployeeProvider");
  }
  return context;
};

const useEmployeeAction = () => {
  const context = useContext(EmployeeActionContext);
  if (!context) {
    throw new Error(
      "useEmployeeAction must be used within an EmployeeProvider"
    );
  }
  return context;
};

export { useEmployeeAction, useEmployeeState, EmployeeProvider };
