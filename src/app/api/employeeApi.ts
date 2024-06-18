import { IEmployee } from "../models";
//
const axios = require("axios");
const baseUrl = "https://localhost:7049";

export const getEmployees = async () => {
  const response = await axios.get(`${baseUrl}/api/Employees`);
  return response.data;
};

export const addEmployee = async (employee: IEmployee) => {
  const response = await axios.post(`${baseUrl}/api/Employees`, employee);
  return response.data;
};

export const updateEmployee = async (employee: IEmployee) => {
  const response = await axios.put(
    `${baseUrl}/api/Employees/${employee.id}`,
    employee
  );
  return response.data;
};

export const deleteEmployee = async (id: string | undefined) => {
  const response = await axios.delete(`${baseUrl}/api/Employees/${id}`);
  return response.data;
};

export const searchEmployees = async (
  searchTerm: string
): Promise<IEmployee[]> => {
  const response = await axios.get(`${baseUrl}/api/Employees/search`, {
    params: { searchTerm },
  });
  return response.data;
};
