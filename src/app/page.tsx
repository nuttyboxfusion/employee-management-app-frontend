"use client";
import { Input, Typography } from "antd";
import { EmployeeProvider } from "./providers/employee";
import Employee from "./pages/EmployeeManagement";

export default function Home() {
  return (
    <EmployeeProvider>
      <Employee />
    </EmployeeProvider>
  );
}
